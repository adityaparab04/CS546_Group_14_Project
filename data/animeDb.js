const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const anime = mongoCollections.anime;
const reviewCollection = require('./reviews');
const animeApiCollection = require('./anime');


let exportedMethods = {

    async checkAnime(animeId) {
        let animeCollection = await anime();
        let animeDb = await animeCollection.findOne({ _id: animeId })
        if (animeDb) {
            return true;
        }
        else {
            return false;
        }
    },
    async getAmineFromDB(animeId) {
        let animeCollection = await anime();
        let animeDb = await animeCollection.findOne({ _id: animeId })
        if (animeDb) {
            return animeDb;
        }
        else {
            return null;
        }
    },
    async getAllAmineFromDB() {
        let animeCollection = await anime();
        return await animeCollection.find({}).toArray();
    },

    async createAnimeDb(animeId, reviewId) {
        let characterCollection = await animeApiCollection.getcharacterbyId(animeId);
        let name = characterCollection.attributes.canonicalTitle;
        let animeCollection = await anime();
        let animeDb = await animeCollection.find({}).toArray()
        let reviewArr = [];

        let boolID = await this.checkAnime(animeId);

        if (boolID === true) {
            const insertReview = await animeCollection.updateOne({ _id: animeId }, { $push: { reviewIdArr: reviewId } });
            // if (insertReview.modifiedCount === 0) throw `Could not add review ID`
            return `anime inserted`;
        }
        else {
            reviewArr.push(reviewId);
            let newAnime = {
                _id: animeId,
                reviewIdArr: reviewArr,
                favUserArr: [],
                userRatings: [],
                name: name
            };
            let insertInfo = await animeCollection.insertOne(newAnime);
            if (insertInfo.insertedCount === 0) {
                throw 'Something wrong when creating the anime collection';
            }
        }

        return `anime inserted`;

    },

    async SetAnimeAsFavorite(animeId, userId) {
        let characterCollection = await animeApiCollection.getcharacterbyId(animeId);
        let name = characterCollection.attributes.canonicalTitle;
        let animeCollection = await anime();
        let animeDb = await animeCollection.find({}).toArray();

        let boolID = await this.checkAnime(animeId);

        if (boolID === true) {
            const insertReview = await animeCollection.updateOne({ _id: animeId }, { $push: { favUserArr: userId } });
            return `anime inserted`;
        }
        else {
            let newAnime = {
                _id: animeId,
                reviewIdArr: [],
                favUserArr: [userId],
                userRatings: [],
                name: name
            };
            let insertInfo = await animeCollection.insertOne(newAnime);
            if (insertInfo.insertedCount === 0) {
                throw 'Something wrong when creating the anime collection';
            }
        }
        return `anime inserted`;
    },

    async addUserRatingIntoAnime(animeId, userId, rating) {
        let characterCollection = await animeApiCollection.getcharacterbyId(animeId);
        let name = characterCollection.attributes.canonicalTitle;
        let animeCollection = await anime();
        let animeDb = await animeCollection.find({}).toArray();

        let boolID = await this.checkAnime(animeId);

        if (boolID === true) {
            const insertReview = await animeCollection.updateOne({ _id: animeId }, { $push: { userRatings: { userId: userId, rating: rating } } });
            return `anime inserted`;
        }
        else {
            let newAnime = {
                _id: animeId,
                reviewIdArr: [],
                favUserArr: [userId],
                userRatings: [{ userId: userId, rating: rating }],
                name: name
            };
            let insertInfo = await animeCollection.insertOne(newAnime);
            if (insertInfo.insertedCount === 0) {
                throw 'Something wrong when creating the anime collection';
            }
        }
        return `anime inserted`;
    },

    async RemoveAnimeFromFavorites(animeId, userId) {
        let animeCollection = await anime();
        await animeCollection.updateOne({ _id: animeId }, { $pull: { favUserArr: userId } });
    }
};

module.exports = exportedMethods;