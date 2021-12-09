const express = require("express");
const router = express.Router();
const data = require("../data");
const chatacterData = data.character;
const xss = require('xss');



router.post("/", async (req, res) => {
  const animeCharacter = xss(req.body["searchTerm"]);
  //let errors = [];

  if (!animeCharacter) {
    //errors.push("please provide a character");
    const animeData = {
      error: "please provide a character",
      isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
      isUserLoggedIn: req.session.user != null ? true : false
    };
    res.status(400);
    res.render("anime/error", animeData);
    return;
  }
  if (animeCharacter.trim() === "") {
    //errors.push("character is empty");
    const animeData = {
      error: "character is empty",
      isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
      isUserLoggedIn: req.session.user != null ? true : false
    };
    res.status(400);
    res.render("anime/error", animeData);
    return;
  }

  if (typeof animeCharacter !== "string") {
    //errors.push("Character is not of type string")
    const animeData = {
      error: "Character is not of type string",
      isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
      isUserLoggedIn: req.session.user != null ? true : false
    };
    res.status(400);
    res.render("anime/error", animeData);
    return;
  }

  try {
    //const { character } = characterRoutesData;
    const newCharacter = await chatacterData.getCharacterByName(
      animeCharacter
    );
    const animeData = {
      title: "Characters Found",
      newCharacter: newCharacter,
      character: animeCharacter,
      isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
      isUserLoggedIn: req.session.user != null ? true : false
    };
    res.render("anime/search", animeData);
  } catch (e) {

    const animeData = {
      error: e,
      isAdmin: req.session.user && req.session.user.username.includes("admin") ? true : false,
      isUserLoggedIn:req.session.user!=null?true:false
    };
    res.status(500);
    res.render("anime/error", animeData);

  }
});

module.exports = router;