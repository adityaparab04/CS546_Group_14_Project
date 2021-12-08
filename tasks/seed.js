const connection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const reviews = data.reviews;
const comments = data.comments;
const animeData = require("../data/anime");

async function main() {
  // const db = await connection.connectToDb();
  // await db.dropDatabase();

  // await connection.closeConnection();

  try{
    const anime = await animeData.getOngoingAnime();
    console.log(anime);
  }catch(e){
    console.log(e);
  }
}

main();
