const connection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;
const reviews = data.reviews;
const comments = data.comments;
const animeData = require("../data/anime");

async function main() {
  const db = await connection.connectToDb();
  await db.dropDatabase();

  // create users for testing
    const user1 = await users.createUser('Vaibhav', 26, '123456', 'vaibhav@123.com', '/public/images/profile_pic.jpeg');
    const user2 = await users.createUser('aditya_parab', 23, '123456', 'aditya@123.com', '/public/images/profile_pic.jpeg');
    const user3 = await users.createUser('Seema', 25, '123456', 'seema@123.com', '/public/images/profile_pic.jpeg');
    const user4 = await users.createUser('adityaKotian', 25, '123456', 'adityak@123.com', '/public/images/profile_pic.jpeg');
    const admin = await users.createUser('admin', 25, '123456', 'admin@123.com', '/public/images/profile_pic.jpeg');
  await connection.closeConnection();
}

main();
