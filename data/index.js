const reviewData = require('./reviews');
const commentData = require('./comments');
const characterData = require("./anime");
const animeData = require('./animeDb');
const userData = require('./users');
const discussionData = require('./discussion');

module.exports = {
    reviews: reviewData,
    comments: commentData,
    character: characterData,
    anime: animeData,
    users: userData,
    discussion: discussionData
};