const express = require("express");
const router = express.Router();
const data = require("../data");
const reviewData = data.reviews;

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

module.exports = router;