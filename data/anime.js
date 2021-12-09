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

//*get characters by name
async function getFilerByName(name) {
  const url = baseUrl + "/anime?filter[text]=" + name+"&page[limit]=20";
  const { data } = await axios.get(url);
  return data;
}

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


//*get character by id 
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

//TODO:Anime Rating by age 

//! anime age rating PG
async function getPG() {
  const mainUrl = baseUrl + "/anime?filter[ageRating]=PG&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getAgePG(){
  const characterCollection = await getPG();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}

//! anime age reating R
async function getR() {
  const mainUrl = baseUrl + "/anime?filter[ageRating]=R&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getAgeR(){
  const characterCollection = await getR();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}
//! anime age rating G

async function getG() {
  const mainUrl = baseUrl + "/anime?filter[ageRating]=G&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getAgeG(){
  const characterCollection = await getG();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}
//TODO: Top Anime by critic rating
async function getAnimeRating() {
  const mainUrl = baseUrl + "/anime?filter[averageRating]=83..100&page[limit]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getAnimeByRating(){
  const characterCollection = await getAnimeRating();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}

//* Get anime by demographic
//?get anime Josei
async function getJosei() {
  const mainUrl = baseUrl + "/anime?filter[categories]=josei&page[limit]=20&page[offset]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getDemographicJosei(){
  const characterCollection = await getJosei();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}
//?get anime Kids 
async function getKids() {
  const mainUrl = baseUrl + "/anime?filter[categories]=kids&page[limit]=20&page[offset]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getDemographicKids(){
  const characterCollection = await getKids();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}
//?get anime Seinen
async function getSeinen() {
  const mainUrl = baseUrl + "/anime?filter[categories]=seinen&page[limit]=20&page[offset]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getDemographicSeinen(){
  const characterCollection = await getSeinen();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}
//?get anime Shoujo
async function getShoujo() {
  const mainUrl = baseUrl + "/anime?filter[categories]=shoujo&page[limit]=20&page[offset]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getDemographicShoujo(){
  const characterCollection = await getShoujo();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}
//? get anime Shounen

async function getShounen() {
  const mainUrl = baseUrl + "/anime?filter[categories]=shounen&page[limit]=20&page[offset]=20";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getDemographicShounen(){
  const characterCollection = await getShounen();
  let tempArr = undefined;
  for (let key in characterCollection) {
    if (key === "data") {
      tempArr = characterCollection[key];
    }
  }
  return tempArr;
}

//?The landing page displays the list of ongoing anime series.
async function getOngoing() {
  const mainUrl = baseUrl + "/anime?filter[status]=current&page[limit]=16&page[offset]=40";
  const { data } = await axios.get(mainUrl);
  return data;
}

async function  getOngoingAnime(){
  const characterCollection = await getOngoing();
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
  getCategoryThriller,
  getAgePG,
  getAgeR,
  getAgeG,
  getAnimeByRating,
  getDemographicJosei,
  getDemographicKids,
  getDemographicSeinen,
  getDemographicShoujo,
  getDemographicShounen,
  getOngoingAnime
};
