const express = require("express");
const router = express.Router();
const data = require("../data");
const reviewData = data.reviews;
const userData = data.users;
const commentData = data.comments;

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/", async (req, res) => {
    try {
      const getAllReviews = await reviewData.getAllReviews();
    //   const homePage = {
    //     title: "Otaku Hub",
    //     character:getAllAnime
    //   };
      //res.render("anime/home", homePage);
      res.json(getAllReviews)
    } catch (e) {
      const animelData = {
        error: "Could not load",
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
      if (!req.session.userId)
          throw "login first,then like it"
      if (!req.query)
          throw "need info to like it";
      if (!req.query.reviewId)
          throw "need reviewId to like it";
      let updatedReview = await reviewData.addLikeCount(req.query.reviewId, req.session.userId);
      res.send(updatedReview);
  } catch (error) {
      res.status(404).send(error);
  }
});

router.get('/dislike', async (req, res) => {
  try {
      if (!req.session)
          throw "you don't have the cookie"
      if (!req.session.userId)
          throw "login first,then dislike it"
      if (!req.query)
          throw "need info to dislike it";
      if (!req.query.reviewId)
          throw "need reviewId to dislike it";
      let updatedReview = await reviewData.addDislikeCount(req.query.reviewId, req.session.userId);
      res.send(updatedReview);
  } catch (error) {
      res.status(404).send(error);
  }
});

router.post('/deleteComment', async (req, res) => {
  try {
      
      if (!req.session)
          throw "you don't have the cookie to delete the comment"
      if (!req.session.userId)
          throw "login first,then delete commnet"
      if (!req.body)
          throw "need info to delete the comment";
      if (!req.body.reviewId)
          throw "need reviewId to delete the comment";
      if (!req.body.commentId)
          throw "need commentId to create the comment";
      await commentData.removeComment(req.body.reviewId,req.body.commentId);
      res.redirect("http://localhost:3000/posts/postInfo/"+req.body.reviewId);
  }catch (error) {
      res.status(404).send(error);
  }
});


module.exports = router;