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
    };
    res.status(400);
    res.render("anime/error", animeData);
    return;
  }
  if (animeCharacter.trim() === "") {
    //errors.push("character is empty");
    const animeData = {
      error: "character is empty",
    };
    res.status(400);
    res.render("anime/error", animeData);
    return;
  }

  if (typeof animeCharacter !== "string") {
    //errors.push("Character is not of type string")
    const animeData = {
      error: "Character is not of type string",
    };
    res.status(400);
    res.render("anime/error",animeData);
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
    };
    res.render("anime/search", animeData);
  } catch (e) {

    const animeData = {
      error: e,
    };
    res.status(500);
    res.render("anime/error", animeData);

  }
});

module.exports = router;
