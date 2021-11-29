const axios = require("axios");

const baseUrl = "https://kitsu.io/api/edge";

//*Get all the chatarters from the anime page.
async function getAll() {
  const fullURl = baseUrl + "/anime?page[limit]=20&page[offset]=0";
  const { data } = await axios.get(fullURl);
  return data;
}

async function get() {
  const characterCollection = await getAll();
  let tempArr = [];
  //tempArr = characterCollection.data;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }

  return tempArr;
}

async function getFilerByName(name) {
  const url = baseUrl + "/anime?filter[text]=" + name+"&page[limit]=20";
  const { data } = await axios.get(url);
  return data;
}
//*get characters by name
async function getCharacterByName(animeName) {
  if (arguments.length !== 1) {
    throw "Arguments provided not satisfied";
  }
  if (!animeName) {
    throw "please provide a character";
  }
  if (animeName.trim() === "") {
    throw "character is empty";
  }

  if (typeof animeName !== "string") {
    throw "Character is not of type string";
  }

  const characterCollection = await getFilerByName(animeName.trim());
  let tempArr = [];
  //tempArr = characterCollection.data;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }

  return tempArr;
}

async function getID(id) {
  const mainUrl = baseUrl + "/anime/" + id;

  const { data } = await axios.get(mainUrl);
  return data;
}

async function getcharacterbyId(id) {
  if (arguments.length !== 1) {
    throw "Error! parameter missing";
  }
  if (!id) {
    throw "Please Provide a valid id";
  }
  if (typeof id === "undefined" || typeof id == "null" || id === "") {
    throw "No id passed, please paas an Id";
  }

  if (typeof id !== "string") {
    throw "id not of proper type";
  }

  if (id.trim() === "") {
    throw "Plese Provide valid data";
  }

  const animeInfo = await getID(id);

  let tempArr = [];
  for (let key in animeInfo) {
    if (key === "data") {
      tempArr = animeInfo[key];
    }
  }
  return tempArr;
}

//*Get Trending Anime list 
async function getTrend() {
  const mainUrl = baseUrl + "/trending/anime";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getTrendingAnimeList(){
  const trendCollection = await getTrend();
  //FIXME: //!Change variable type to undefined not array 
  let tempArr = undefined;
  for (let key in trendCollection) {
    if (key === "data") {
      tempArr = trendCollection[key];
    }
  }
  return tempArr;
}

//*Filter category comedy

async function getComedy() {
  const mainUrl = baseUrl + "/anime?filter[categories]=comedy&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getCategoryComedy(){
  const characterCollection = await getComedy();
  //FIXME: //!Change variable type to undefined not array 
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}

//*Filter category action
async function getAction() {
  const mainUrl = baseUrl + "/anime?filter[categories]=action&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getCategoryAction(){
  const characterCollection = await getAction();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}
//*Filter category Adventure
async function getAdventure() {
  const mainUrl = baseUrl + "/anime?filter[categories]=adventure&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getCategoryAdventure(){
  const characterCollection = await getAdventure();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}
//*Filter category Magic
async function getMagic() {
  const mainUrl = baseUrl + "/anime?filter[categories]=magic&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getCategoryMagic(){
  const characterCollection = await getMagic();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}
//*Filter category Sports
async function getSports() {
  const mainUrl = baseUrl + "/anime?filter[categories]=sports&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getCategorySports(){
  const characterCollection = await getSports();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}
//*Filter category Fantasy
async function getFantasy() {
  const mainUrl = baseUrl + "/anime?filter[categories]=fantasy&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getCategoryFantasy(){
  const characterCollection = await getFantasy();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}

//*Filter category Drama
async function getDrama() {
  const mainUrl = baseUrl + "/anime?filter[categories]=drama&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getCategoryDrama(){
  const characterCollection = await getDrama();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}

//*Filter category Horror
async function getHorror() {
  const mainUrl = baseUrl + "/anime?filter[categories]=horror&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getCategoryHorror(){
  const characterCollection = await getHorror();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}
//*Filter category Mystery 
async function getMystery() {
  const mainUrl = baseUrl + "/anime?filter[categories]=mystery&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getCategoryMystery(){
  const characterCollection = await getMystery();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}
//*Filter category Thriller
async function getThriller() {
  const mainUrl = baseUrl + "/anime?filter[categories]=thriller&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getCategoryThriller(){
  const characterCollection = await getThriller();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}






module.exports = {
  get,
  getCharacterByName,
  getcharacterbyId,
  getTrendingAnimeList,
  getCategoryComedy,
  getCategoryAction,
  getCategoryAdventure,
  getCategoryMagic,
  getCategorySports,
  getCategoryFantasy,
  getCategoryDrama,
  getCategoryHorror,
  getCategoryMystery,
  getCategoryThriller
};
