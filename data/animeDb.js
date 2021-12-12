const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const anime = mongoCollections.anime;
const reviewCollection = require('./reviews');
const animeApiCollection = require('./anime');


let exportedMethods = {

    async checkAnime(animeId) {
        if (arguments.length !== 1) {
            throw "Error! parameter missing";
        }
        if(!animeId){
            throw "please provide a anime ID";
        }
        if(animeId.trim()===""){
            throw "Please provide a valid id";
        }
        if(typeof animeId!== 'string'){
            throw "please Provide id of type string"
        } 
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
        if (arguments.length !== 1) {
            throw "Error! parameter missing";
        }
        if(!animeId){
            throw "please provide a anime ID";
        }
        if(animeId.trim()===""){
            throw "Please provide a valid id";
        }
        if(typeof animeId!== 'string'){
            throw "please Provide id of type string"
        } 
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
        if(!animeId || !reviewId){
            throw "please provide a anime ID";
        }
        if(animeId.trim()==="" || reviewId.trim()===""){
            throw "Please provide a valid id";
        }

        if(!ObjectId.isValid(reviewId)){
            throw "The id is not a valid ObjectId";
        }
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
        if(!animeId|| !userId){
            throw "please check all the fields";
        }
        if(animeId.trim()==="" || userId.trim()===""){
            throw "the id field is empty"
        }
        if(!ObjectId.isValid(userId)){
            throw "The id is not a valid ObjectId";
        }
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
        if(!animeId|| !userId || !rating){
            throw "please provide all the data";
        }
        if(animeId.trim()==="" || userId.trim()==="" || rating.trim()===""){
            throw "the field is empty";
        }
        if(typeof rating !=='string'){
            throw "rating is not of type string";
        }
        if(!ObjectId.isValid(userId)){
            throw "The id is not a valid ObjectId";
        }
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
        //console.log(ObjectId.isValid(userId));
        if(!animeId|| !userId){
            throw "please provide a proper ID"
        }
        if(animeId.trim()==="" || userId.trim()===""){
            throw "the id field is empty"
        }
        if(!ObjectId.isValid(userId)){
            throw "The id is not a valid ObjectId";
        }
        let animeCollection = await anime();
        await animeCollection.updateOne({ _id: animeId }, { $pull: { favUserArr: userId } });
        return `removed from favourite`
    }
};

module.exports = exportedMethods;