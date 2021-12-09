const express = require("express");
const router = express.Router();
const data = require("../data");
const chatacterData = data.character;

router.get("/:id", async (req, res) => {
  //let errors =[];
  if (!req.params.id) {
    //errors.push("You must provide an id to search for" );
    const animeData = {
      error: "You must provide an id to search for",
      isUserLoggedIn:req.session.user!=null?true:false
    };
    res.status(400);
    res.render("anime/error", animeData);
    return;
  }
  if (req.params.id.trim() === "") {
    //errors.push("No id provided");
    const animeData = {
      error: "No id provided",
      isUserLoggedIn:req.session.user!=null?true:false
    };
    res.status(400);
    res.render("anime/error", animeData);
    return;
  }
  if (typeof req.params.id !== "string") {
    //errors.push("The ID provided is not of type string" );
    const animeData = {
      error: "The ID provided is not of type string",
      isUserLoggedIn:req.session.user!=null?true:false
    };
    res.status(400);
    res.render("anime/error", animeData);
    return;
  }

  try {
    const characterID = await chatacterData.getcharacterbyId(req.params.id);
    const animeCharacter = {
      // title: characterID.name,
      character: characterID,
      title: characterID.attributes.canonicalTitle,
      isUserLoggedIn:req.session.user!=null?true:false
  };
    res.render('anime/avatar',animeCharacter);
  } catch (e) {
    const animeData = {
      error: "character not found",
      isUserLoggedIn:req.session.user!=null?true:false
    };
    res.status(404);
    res.render("anime/error", animeData);
    // res.status(404).json({ error: "character not found" });
  }
});


module.exports = router;
