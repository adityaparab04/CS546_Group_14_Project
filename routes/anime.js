const express = require("express");
const router = express.Router();
const data = require("../data");
const chatacterData = data.character;
const reviewData = data.reviews;
const userData = data.users;
const commentData = data.comments;
const animeData = data.anime;
const discussionData = data.discussion;


router.get("/:id", async (req, res) => {
  //let errors =[];
  if (!req.params.id) {
    //errors.push("You must provide an id to search for" );
    const animeData = {
      error: "You must provide an id to search for",
      isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
      isUserLoggedIn: req.session.user != null ? true : false
    };
    res.status(400);
    res.render("anime/error", animeData);
    return;
  }
  if (req.params.id.trim() === "") {
    //errors.push("No id provided");
    const animeData = {
      error: "No id provided",
      isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
      isUserLoggedIn: req.session.user != null ? true : false
    };
    res.status(400);
    res.render("anime/error", animeData);
    return;
  }
  if (typeof req.params.id !== "string") {
    //errors.push("The ID provided is not of type string" );
    const animeData = {
      error: "The ID provided is not of type string",
      isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
      isUserLoggedIn: req.session.user != null ? true : false
    };
    res.status(400);
    res.render("anime/error", animeData);
    return;
  }

  try {
    const characterID = await chatacterData.getcharacterbyId(req.params.id);

    let markedAsFav = false;
    let showRatingForm = true;
    let userProvidedRating = 0;
    let avgRating = 0;

    const favs = await animeData.getAmineFromDB(req.params.id);
    if (favs && req.session.user) {
      if (favs.favUserArr.includes(req.session.user._id)) {
        markedAsFav = true;
      }
    }

    if (favs && favs.userRatings) {
      for (let f of favs.userRatings) {
        avgRating += Number(f.rating);
        if (req.session.user && f.userId == req.session.user._id.toString()) {
          showRatingForm = false;
          userProvidedRating = f.rating;
        }
      }
    }

    if (favs && favs.userRatings) {
      avgRating = avgRating / favs.userRatings.length;
    }
    let reviews = await reviewData.getReviewByAnimeId(req.params.id);
    if (reviews.length == 0) {
      reviews = null;
    }
    else {
      for (let review of reviews) {
        review.user = await userData.getUserById(review.userId);
        review.showCommentInput = req.session.user != null ? true : false;
        review.noOfLikes = review.likeCount.length;
        review.noOfDislikes = review.dislikeCount.length;
        let comments = await commentData.getAllCommentsOfAReview(review._id.toString());
        if (comments.length == 0) {
          review.comments = null;
        }
        else {
          for (let comment of comments) {
            comment.user = await userData.getUserById(comment.userId);
          }
          review.comments = comments;
        }
      }
    }
    const animeCharacter = {
      // title: characterID.name,
      character: characterID,
      reviews: reviews,
      title: characterID.attributes.canonicalTitle,
      isUserLoggedIn: req.session.user != null ? true : false,
      isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
      msg: req.query.msg,
      markedAsFav: markedAsFav,
      showRatingForm,
      userProvidedRating,
      avgRating,
      isReleased: characterID.attributes.status != "unreleased" && 
                  characterID.attributes.status != "upcoming"  &&
                  characterID.attributes.status != "tba" ? true : false
    };
    res.render('anime/avatar', animeCharacter);
  } catch (e) {
    // console.log(e)
    const animeData = {
      error: "character not found",
      isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
      isUserLoggedIn: req.session.user != null ? true : false
    };
    res.status(404);
    res.render("anime/error", animeData);
  }
});
router.get('/favorite/:id', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/users/login?msg=Please sign first.');
    }
    if (!req.params.id || typeof req.params.id !== 'string' || !req.params.id.replace(/\s/g, "").length)
        throw `Enter a valid Id`
    animeData.SetAnimeAsFavorite(req.params.id, req.session.user._id);
    res.redirect('/anime/' + req.params.id);
  }
  catch (error) {
    res.redirect('/anime/' + req.params.id + '?msg=' + error);
  }

});
router.get('/remove_favorite/:id', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/users/login?msg=Please sign first.');
    }
    if (!req.params.id || typeof req.params.id !== 'string' || !req.params.id.replace(/\s/g, "").length)
        throw `Enter a valid Id`
    animeData.RemoveAnimeFromFavorites(req.params.id, req.session.user._id);
    res.redirect('/anime/' + req.params.id);
  }
  catch (error) {
    res.redirect('/anime/' + req.params.id + '?msg=' + error);
  }

});
router.post('/rating', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/users/login?msg=Please sign first.');
    }
    await animeData.addUserRatingIntoAnime(req.body.animeId, req.session.user._id, req.body.rating);
    res.redirect('/anime/' + req.body.animeId);
  }
  catch (error) {
    res.redirect('/anime/' + req.body.animeId + '?msg=' + error);
  }
});
router.get('/discussion/:animeId/:epno', async (req, res) => {
  if(!req.params.animeId || typeof req.params.animeId !== 'string' ||!req.params.animeId.replace(/\s/g, "").length) throw `invalid anime id`;
  if(!req.params.epno || typeof req.params.epno !== 'string' || !req.params.epno.replace(/\s/g, "").length) throw `invalid ep no`;
  let discussions = await discussionData.getAllDiscussionsOfAnAnimeEpisode(req.params.animeId, req.params.epno);
  discussions = discussions.reverse();
  if (discussions && discussions.length > 0) {
    for (let d of discussions) {
      d.user = await userData.getUserById(d.userId);
      if (req.session.user && d.userId == req.session.user._id.toString()) {
        d.isMine = true;
      }
      else {
        d.isMine = false;
      }
    }
  }
  else {
    discussions = null;
  }
  res.render("anime/discussion", {
    epno: req.params.epno,
    title: `Episode ${req.params.epno} Discussions`,
    animeId: req.params.animeId,
    discussions,
    isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
    isUserLoggedIn: req.session.user != null ? true : false,
    msg: req.query.msg,
  });
});

router.post('/add_discussion', async (req, res) => {
  try{
    if(!req.body.animeId || typeof req.body.animeId !== 'string') throw `invalid anime id`;
    if(!req.body.epno || typeof req.body.epno !== 'string') throw `invalid ep no`;
    if(!req.session.user._id) throw `user Id not found`;
    if(!req.body.text || typeof req.body.text !== 'string') throw `invalid type of req.body.text`;
    if(!req.body.text.replace(/\s/g, "").length) throw `Input cannot be empty spaces`;
    await discussionData.addDiscussion(req.body.animeId, req.body.epno, req.session.user._id.toString(), req.body.text);
    return res.redirect(`/anime/discussion/${req.body.animeId}/${req.body.epno}`);
  }
  catch(e){
    res.redirect(`/anime/discussion/${req.body.animeId}/${req.body.epno}` + `?msg=` + e);
  }
  
});
module.exports = router;
