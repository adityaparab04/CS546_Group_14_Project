const express = require("express");
const router = express.Router();
const data = require("../data");
const animeData = data.character;

router.get("/", async (req, res) => {
  try {
    const getAllAnime = await animeData.get();
    const homePage = {
      title: "Otaku Hub",
      character:getAllAnime
    };
    res.render("anime/home", homePage);
  } catch (e) {
    const animelData = {
      error: "Could not load",
    };
    res.status(400);
    res.render("anime/error", animelData);

  }
});

module.exports = router;
