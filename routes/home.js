const express = require("express");
const router = express.Router();
const data = require("../data");
const animeData = data.character;

router.get("/", async (req, res) => {
  try {
    const getAllAnime = await animeData.getTrendingAnimeList();
    const homePage = {
      title: "Otaku Hub",
      character: getAllAnime,
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

router.get("/comedy", async (req, res) => {
  try {
    const getComedy = await animeData.getCategoryComedy();
    const comedyPage = {
      title: "Comedy",
      detail:"Anime whose central struggle causes hilarious results. These stories are built upon funny characters, situations and events. A comedy anime is laced with humour and sets out to provoke laughter from the audience. Japanese humour can be a bit strange to westerners, so if you're new to this type of humour, just bear with it; it'll most likely grow on you if you're a fan of other kinds of comedy.",
      category: getComedy,
    };
    res.render("anime/categories", comedyPage);
  } catch (e) {
    const animelData = {
      error: "Could not load",
    };
    res.status(400);
    res.render("anime/error", animelData);
  }
});

router.get("/action", async (req, res) => {
  try {
    const getAction = await animeData.getCategoryAction();
    const actionPage = {
      title: "Action Anime",
      detail:"Action anime usually involve a fairly straightforward story of good guys versus bad guys, where most disputes are resolved by using physical force. It often contains a lot of shooting, explosions and fighting.",
      category: getAction,
    };
    res.render("anime/categories", actionPage);
  } catch (e) {
    const animelData = {
      error: "Could not load",
    };
    res.status(400);
    res.render("anime/error", animelData);
  }
});

router.get("/adventure", async (req, res) => {
  try {
    const getAdventure = await animeData.getCategoryAdventure();
    const adventurePage = {
      title: "Adventure Anime",
      detail:"Adventures are exciting stories, with new experiences or exotic locales. Adventures are designed to provide an action-filled, energetic experience for the viewer. Rather than the predominant emphasis on violence and fighting that is found in pure action anime, however, the viewer of adventures can live vicariously through the travels, conquests, explorations, creation of empires, struggles and situations that confront the main characters, actual historical figures or protagonists. Under the category of adventures, we can include traditional swashbucklers, serialized films, and historical spectacles, searches or expeditions for lost continents, jungle and desert epics, treasure hunts and quests, disaster films, and heroic journeys or searches for the unknown. Adventure films are often, but not always, set in an historical period, and may include adapted stories of historical or literary adventure heroes, kings, battles, rebellion, or piracy.",
      category: getAdventure,
    };
    res.render("anime/categories", adventurePage);
  } catch (e) {
    const animelData = {
      error: "Could not load",
    };
    res.status(400);
    res.render("anime/error", animelData);
  }
});

router.get("/adventure", async (req, res) => {
  try {
    const getAdventure = await animeData.getCategoryAdventure();
    const adventurePage = {
      title: "Adventure Anime",
      detail:"Adventures are exciting stories, with new experiences or exotic locales. Adventures are designed to provide an action-filled, energetic experience for the viewer. Rather than the predominant emphasis on violence and fighting that is found in pure action anime, however, the viewer of adventures can live vicariously through the travels, conquests, explorations, creation of empires, struggles and situations that confront the main characters, actual historical figures or protagonists. Under the category of adventures, we can include traditional swashbucklers, serialized films, and historical spectacles, searches or expeditions for lost continents, jungle and desert epics, treasure hunts and quests, disaster films, and heroic journeys or searches for the unknown. Adventure films are often, but not always, set in an historical period, and may include adapted stories of historical or literary adventure heroes, kings, battles, rebellion, or piracy.",
      category: getAdventure,
    };
    res.render("anime/categories", adventurePage);
  } catch (e) {
    const animelData = {
      error: "Could not load",
    };
    res.status(400);
    res.render("anime/error", animelData);
  }
});

router.get("/magic", async (req, res) => {
  try {
    const getMagic = await animeData.getCategoryMagic();
    const magicPage = {
      title: "Magic Anime",
      detail:"Magic is the art of purportedly manipulating aspects of reality either by supernatural means or through knowledge of unknown occult laws.",
      category: getMagic,
    };
    res.render("anime/categories", magicPage);
  } catch (e) {
    const animelData = {
      error: "Could not load",
    };
    res.status(400);
    res.render("anime/error", animelData);
  }
});

router.get("/sports", async (req, res) => {
  try {
    const getSports = await animeData.getCategorySports();
    const sportsPage = {
      title: "Sports Anime",
      detail:"Sports anime revolves around a recreational physical activity or skill. In addition they often adhere to certain genre conventions, the emphasis on training and practice in preparation for competition, characters desire for self improvement, and pursuit of a specific goal.",
      category: getSports,
    };
    res.render("anime/categories", sportsPage);
  } catch (e) {
    const animelData = {
      error: "Could not load",
    };
    res.status(400);
    res.render("anime/error", animelData);
  }
});

router.get("/fantasy", async (req, res) => {
  try {
    const getFantasy = await animeData.getCategoryFantasy();
    const fantasyPage = {
      title: "Fantasy Anime",
      detail:"Fantasy is a genre of fiction that uses magic and other supernatural phenomena as a primary element of plot, theme, or setting. Many works within the genre take place in fictional worlds where magic is common. Fantasy is generally distinguished from science fiction and horror by the expectation that it steers clear of (pseudo-)scientific and macabre themes, respectively, though there is a great deal of overlap between the three (which are subgenres of speculative fiction).",
      category: getFantasy,
    };
    res.render("anime/categories", fantasyPage);
  } catch (e) {
    const animelData = {
      error: "Could not load",
    };
    res.status(400);
    res.render("anime/error", animelData);
  }
});

router.get("/drama", async (req, res) => {
  try {
    const getDrama = await animeData.getCategoryDrama();
    const dramaPage = {
      title: "Drama Anime",
      detail:"Drama is a form of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
      category: getDrama,
    };
    res.render("anime/categories", dramaPage);
  } catch (e) {
    const animelData = {
      error: "Could not load",
    };
    res.status(400);
    res.render("anime/error", animelData);
  }
});

router.get("/horror", async (req, res) => {
  try {
    const getHorror = await animeData.getCategoryHorror();
    const horrorPage = {
      title: "Horror Anime",
      detail:"The horror cinematic genre is characterized by the attempt to make the viewer experience dread, fear, terror, or horror. Often their plots involve the intrusion of an evil force, event or personage, sometimes of supernatural origin, on the mundane world and the consequences thereof.",
      category: getHorror,
    };
    res.render("anime/categories", horrorPage);
  } catch (e) {
    const animelData = {
      error: "Could not load",
    };
    res.status(400);
    res.render("anime/error", animelData);
  }
});

router.get("/mystery", async (req, res) => {
  try {
    const getMystery = await animeData.getCategoryMystery();
    const mystryPage = {
      title: "Mystery Anime",
      detail:"Focuses on unresolved questions, and the efforts of characters to discover the answers to them. Whether curious and deadly events are afoot, or some part of the world itself is strange or inexplicable, or someone's past or identity seems strangely shrouded, these characters are set on learning the truth.",
      category: getMystery,
    };
    res.render("anime/categories", mystryPage);
  } catch (e) {
    const animelData = {
      error: "Could not load",
    };
    res.status(400);
    res.render("anime/error", animelData);
  }
});

router.get("/thriller", async (req, res) => {
  try {
    const getThriller = await animeData.getCategoryThriller();
    const thrillerPage = {
      title: "Thriller Anime",
      detail:"The thriller is a genre of fiction in which tough, resourceful, but essentially ordinary heroes are pitted against villains determined to destroy them, their country, or the stability of the free world. The hero of a typical thriller faces danger alone or in the company of a small band of companions. The protagonist may be a law enforcement agent, a journalist, or a soldier, but typically he or she is cut off from the resources of their organization. More often the hero is an ordinary citizen drawn into danger and intrigue by circumstances beyond their control",
      category: getThriller,
    };
    res.render("anime/categories", thrillerPage);
  } catch (e) {
    const animelData = {
      error: "Could not load",
    };
    res.status(400);
    res.render("anime/error", animelData);
  }
});

module.exports = router;
