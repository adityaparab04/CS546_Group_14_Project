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
    let user1_Id = user1._id;
    let r1 = await reviews.createReview('11', user1_Id, 'I really love this anime..');
    let r2 = await reviews.createReview('12', user1_Id, 'This is the best anime ever');
    let r3 = await reviews.createReview('42765', user1_Id, 'I really love this anime..');
    
    const user2 = await users.createUser('aditya_parab', 23, '123456', 'aditya@123.com', '/public/images/profile_pic.jpeg');
    let user2_Id = user2._id;
    let r4 = await reviews.createReview('42765', user2_Id, 'I wont recommend this anime to others');
    let r5 = await reviews.createReview('41370', user2_Id, 'This is the best anime ever');
    let r6 = await reviews.createReview('11469', user2_Id, 'I really love this anime..');
    
    const user3 = await users.createUser('Seema', 25, '123456', 'seema@123.com', '/public/images/profile_pic.jpeg');
    let user3_Id = user3._id;
    let r7 = await reviews.createReview('42765', user3_Id, 'This is the best anime ever');
    let r8 = await reviews.createReview('11469', user3_Id, 'I really love this anime..');
    let r9 = await reviews.createReview('7442', user3_Id, 'I dont like the story of this anime');
    
    const user4 = await users.createUser('adityaKotian', 25, '123456', 'adityak@123.com', '/public/images/profile_pic.jpeg');
    let user4_Id = user4._id;
    let r10 = await reviews.createReview('42765', user4_Id, 'I love this anime..what an ending');
    let r11 = await reviews.createReview('1376', user4_Id, 'I really love this anime..');
    let r12 = await reviews.createReview('12', user4_Id, 'I really love this anime..');
    let r13 = await reviews.createReview('1555', user4_Id, 'Best storyline, one of my favourite anime');
    
    const admin = await users.createUser('admin', 30, '123456', 'admin@123.com', '/public/images/profile_pic.jpeg');

  //comments
    let c1 = await comments.addComment(r4._id.toString(), user1._id, 'I love it too');
    let c2 = await comments.addComment(r2._id.toString(), user2._id, 'I dont agree with you');
    let c3 = await comments.addComment(r4._id.toString(), user3._id, 'I think I would disagree');
    let c4 = await comments.addComment(r8._id.toString(), user4._id, 'I think this review is misleading');
    let c5 = await comments.addComment(r11._id.toString(), user1._id, 'I hate this anime');
    let c6 = await comments.addComment(r9._id.toString(), user2._id, 'I agree');
    let c7 = await comments.addComment(r6._id.toString(), user3._id, 'I think they should be more creative');
    let c8 = await comments.addComment(r7._id.toString(), user4._id, 'I think was the best anime ever');

    //likes
    let l1 = await reviews.addLikeCount(r1._id.toString(), user2_Id);
    let l2 = await reviews.addLikeCount(r2._id.toString(), user2_Id);
    let l3 = await reviews.addLikeCount(r3._id.toString(), user3_Id);
    let l4 = await reviews.addLikeCount(r4._id.toString(), user4_Id);
    let l5 = await reviews.addLikeCount(r5._id.toString(), user1_Id);
    let l6 = await reviews.addLikeCount(r6._id.toString(), user1_Id);
    let l7 = await reviews.addLikeCount(r8._id.toString(), user2_Id);

    let dl1 = await reviews.addDislikeCount(r1._id.toString(), user4_Id);
    let dl2 = await reviews.addDislikeCount(r2._id.toString(), user4_Id);
    let dl3 = await reviews.addLikeCount(r3._id.toString(), user4_Id);
    let dl4 = await reviews.addDislikeCount(r4._id.toString(), user1_Id);
    let dl5 = await reviews.addLikeCount(r5._id.toString(), user3_Id);
    let dl6 = await reviews.addDislikeCount(r6._id.toString(), user3_Id);
    let dl7 = await reviews.addLikeCount(r8._id.toString(), user2_Id);


  console.log("Db seeded successfully")
  await connection.closeConnection();
}

main();
