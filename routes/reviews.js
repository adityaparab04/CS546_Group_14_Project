const express = require("express");
const router = express.Router();
const xss = require('xss');
const data = require("../data");
const reviewData = data.reviews;
const userData = data.users;
const commentData = data.comments;

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const getAllReviews = await reviewData.getAllReviews();
    res.json(getAllReviews);
  } catch (e) {
    const animelData = {
      error: "Could not load",
      isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
      isUserLoggedIn:req.session.user!=null?true:false
    };
    res.status(400);
    res.render("anime/error", animelData);

  }
});

router.get('/like', async (req, res) => {
  try {
    // console.log(req.query)
    if (!req.session)
      throw "you don't have the cookie"
    if (!req.session.user)
      throw "login first,then like it"
    if (!req.query)
      throw "need info to like it";
    if (!req.query.reviewId)
      throw "need reviewId to like it";
    await reviewData.addLikeCount(req.query.reviewId, req.session.user._id.toString());
    res.redirect('/anime/' + req.query.anime_id);

  } catch (e) {
    res.redirect('/anime/' + req.query.anime_id + '?msg=' + e);

  }
});

router.get('/dislike', async (req, res) => {
  try {
    if (!req.session)
      throw "you don't have the cookie"
    if (!req.session.user)
      throw "login first,then dislike it"
    if (!req.query)
      throw "need info to dislike it";
    if (!req.query.reviewId)
      throw "need reviewId to dislike it";
    await reviewData.addDislikeCount(req.query.reviewId, req.session.user._id.toString());
    res.redirect('/anime/' + req.query.anime_id);
  } catch (e) {
    res.redirect('/anime/' + req.query.anime_id + '?msg=' + e);
  }
});

router.post('/deleteComment', async (req, res) => {
  try {

    if (!req.session)
      throw "you don't have the cookie to delete the comment";
    if (!req.session.userId)
      throw "login first,then delete comment";
    if (!req.body)
      throw "need info to delete the comment";
    if (!req.body.reviewId)
      throw "need reviewId to delete the comment";
    if (!req.body.commentId)
      throw "need commentId to create the comment";
    await commentData.removeComment(req.body.reviewId, req.body.commentId);
    res.redirect("http://localhost:3000/posts/postInfo/" + req.body.reviewId);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post('/create', async function (req, res) {
  try {
    if (!req.session)
      throw "you don't have the cookie to write the review";
    if (!req.session.user)
      throw "login first,then write a review";
    if (!req.body)
      throw "need info to write the review";
    if(!req.body.anime_id || typeof req.body.anime_id !== 'string')
      throw "Invalid animeId"
    if(!req.body.review.replace(/\s/g, "").length) 
      throw `Review cannot be empty spaces`;
    const anime_id = xss(req.body.anime_id);
    const content = xss(req.body.review);
    await reviewData.createReview(anime_id, req.session.user._id, content);
    return res.redirect('/anime/' + anime_id);
  } catch (e) {
    res.redirect('/anime/' + req.body.anime_id + '?msg=' + e);
  }
});


module.exports = router;