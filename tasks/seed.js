const connection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const reviews = data.reviews;
const comments = data.comments;
const animeData = require("../data/anime");

async function main() {
  const db = await connection.connectToDb();
  // await db.dropDatabase();

  //users.deleteUser('61b43fc1a49a119341eafe80')


  // try{
  //   const user1 = await users.createUser('Vaibhav1', 25, '123456', 'vaibhav1@123.com', '/public/images/profile_pic.jpeg');
  // }catch(e){
  //   console.log(e);
  // }

  // try{
  //   const user1 = await users.deleteUser('61b4d5be6d6915a5d488a3a4')
  //   console.log(user1);
  // }catch(e){
  //   console.log(e);
  // }

  await reviews.removeReview('61b4da49f454090324d6fada')

  await connection.closeConnection();
}

main();
