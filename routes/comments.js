const express = require('express');
const router = express.Router();
const data = require("../data");
const commentData = data.comments;
const reviewData = data.reviews;

router.get("/:id", async function (req, res) {
  try {
    if(!req.params.id || typeof req.params.id !== 'string' || !req.params.id.replace(/\s/g, "").length) throw `invalid id`;
    const commentInfo = await commentData.getCommentById(req.params.id); // title, user(id), post(id), content, time
    // console.log(req.params.id)
    res.json(commentInfo);
  }
  catch (e) {
    res.status(404).json({ message: "'Comment' item not found!" });
  }
});

router.get("/", async function (req, res) {
  try {
    const commentList = await commentData.getAll();
    res.json(commentList);
  }
  catch (e) {
    res.status(500).send();
  }
});

router.post("/create", async (req, res) => { // add
  let commentInfo = req.body;
  if (!commentInfo) {
    res.status(400).json({ error: 'You must provide data to create a comment' });
    return;
  }

  const { reviewId, content } = commentInfo;
  if (!reviewId) {
    res.redirect('/anime/' + req.body.animeId + '?msg=' + 'You must provide post id for the comment');
    return;
  }
  if (!content || typeof content !== 'string') {
    res.redirect('/anime/' + req.body.animeId + '?msg=' + 'Comment content can not be empty.');
    return;
  }
  if (!content.replace(/\s/g, "").length){
    res.redirect('/anime/' + req.body.animeId + '?msg=' + 'Comment content can not be empty spaces.');
    return;
  }
  try {
    await commentData.addComment(reviewId, req.session.user._id, content);
    res.redirect('/anime/' + req.body.animeId);

  } catch (e) {
    res.redirect('/anime/' + req.body.animeId + '?msg=' + e);
  }
});


router.delete("/:id", async (req, res) => {
  if(!req.params.id || typeof req.params.id !== 'string' || !req.params.id.replace(/\s/g, "").length) throw `invalid id`;
  try {
    await commentData.getCommentById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "No Comment found" });
  }
  try {
    const msg = await commentData.remove(req.params.id);
    res.status(200).send(msg)
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// this function should be added into "data/posts.js"
async function getListOfCommentsInReview(postId) {
  const thisReview = await post.getReview(postId);
  const listOfComments = thisPost.comments; // an array of IDs
  return listOfComments;
}


module.exports = router;
