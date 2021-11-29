const connection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const reviews = data.reviews;
const comments = data.comments;
const animeData = require("../data/anime");

async function main() {
  const db = await connection.connectToDb();
  await db.dropDatabase();
  try {
    const marvel = await animeData.get();
    console.log(marvel);
  } catch (e) {
    console.log(e);
  }
  try {
    const animeByName = await animeData.getCharacterByName("one piece");
    console.log(animeByName);
  } catch (e) {
    console.log(e);
  }
  await connection.closeConnection();
}

main();
