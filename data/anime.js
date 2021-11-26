const axios = require("axios");

const baseUrl = "https://kitsu.io/api/edge";

//*Get all the chatarters from the anime page.
async function getAll() {
  const fullURl = baseUrl + "/anime?page[limit]=18&page[offset]=0";
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
  const url = baseUrl + "/anime?filter[text]=" + name;
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

async function getID(id){
  const mainUrl = baseUrl+"/anime/"+id;

  const {data} = await axios.get(mainUrl);
  return data
}

async function getcharacterbyId(id){
  if (arguments.length !== 1) {
    throw "Error! parameter missing";
  }
  if(!id){
    throw "Please Provide a valid id";
  }
  if (typeof id === "undefined" || typeof id == "null" || id === "") {
    throw "No id passed, please paas an Id";
  }
  
  if(typeof id !== 'string'){
    throw 'id not of proper type';
  }

  if(id.trim()===""){
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

module.exports = {
  get,
  getCharacterByName,
  getcharacterbyId
};
