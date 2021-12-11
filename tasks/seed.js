const connection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const reviews = data.reviews;
const comments = data.comments;
const animeData = require("../data/anime");

async function main() {
  const db = await connection.connectToDb();
  await db.dropDatabase();

  try{
    const user1 = await users.createUser('Vaibhav1', 25, '123456', 'vaibhav1@123.com', '/public/images/profile_pic.jpeg');
  }catch(e){
    console.log(e);
  }
  try{
    const user1 = await users.createUser('aditya', 22, '123456', 'aditya@123.com', '/public/images/profile_pic.jpeg');
  }catch(e){
    console.log(e);
  }

  // try{
  //   const user1 = await users.deleteUser('61b4ecb22038c40e84035172')
  //   console.log(user1);
  // }catch(e){
  //   console.log(e);
  // }

  //console.log(await users.removeReviewByaUserId('61b4f3cb36794daa0c2cbc4f'))

  await connection.closeConnection();
}

main();
