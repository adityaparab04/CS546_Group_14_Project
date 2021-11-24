const connection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const reviews = data.reviews;
const comments = data.comments;

async function main() {
    const db = await connection.connectToDb();
    await db.dropDatabase();

}

main();