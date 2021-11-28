const reviewData = require('./reviews');
const commentData = require('./comments');
const characterData = require("./anime");
const animeData = require('./animeDb');

module.exports = {
    reviews: reviewData,
    comments: commentData,
    character : characterData,
    anime: animeData
};