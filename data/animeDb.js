const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const anime = mongoCollections.anime;
const reviewCollection = require('./reviews');
const animeApiCollection = require('./anime')


let exportedMethods = {
    
    async checkAnime(animeId){
        let animeCollection = await anime();
        let animeDb = await animeCollection.findOne({_id: animeId})
        if(animeDb){
            return true;
        }
        else{
            return false;
        }
    },

    async createAnimeDb(animeId, reviewId){
        let characterCollection = await animeApiCollection.getcharacterbyId(animeId);
        let name = characterCollection.attributes.canonicalTitle;
        let animeCollection = await anime();
        let animeDb = await animeCollection.find({}).toArray()
        let reviewArr = [];

        let boolID = await this.checkAnime(animeId);

            if(boolID === true){
                const insertReview = await animeCollection.updateOne({_id: animeId},{$push:{reviewIdArr: reviewId}});
                // if (insertReview.modifiedCount === 0) throw `Could not add review ID`
                return `anime inserted`;
            }
            else{
                reviewArr.push(reviewId);
                let newAnime = {
                    _id: animeId,
                    reviewIdArr: reviewArr,
                    name: name
                     
                };
                let insertInfo = await animeCollection.insertOne(newAnime);
                if (insertInfo.insertedCount === 0){
                    throw 'Something wrong when creating the anime collection';
                }
            }
            
            return `anime inserted`;

    },

    // async getAnime(animeId){
    //     let animeCollection = await animeApiCollection.getcharacterbyId(animeId);
    //     let Id = animeCollection.Id;


    //     return Id;
    // }
}

module.exports = exportedMethods;