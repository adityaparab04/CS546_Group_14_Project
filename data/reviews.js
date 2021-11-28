const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const reviews = mongoCollections.reviews;
const userCollections = require('./users');
const animeCollection = require('./animeDb');

let exportedMethods = {
    //create a new review
    async createReview(animeId, userId, content, rating){
        if(!animeId || typeof animeId !== "string") throw `you must provide an anime Id`;
        if(!userId || typeof userId !== "string") throw `you must provide an user Id`;
        if(!content || typeof content !== "string") throw `you should input a string as the content`;
        let reviewCollection = await reviews();
        let newReview = {
            animeId: animeId,
            userId: userId,
            content: content,
            rating: rating,
            commentIdArr: [],
            likeCount: [],
            dislikeCount: [],
            date: new Date().toLocaleDateString()
        };
        let insertInfo = await reviewCollection.insertOne(newReview);
        if (insertInfo.insertedCount === 0){
            throw 'Something wrong when creating the review';
        }
        let newId = insertInfo.insertedId;
        await animeCollection.createAnimeDb(animeId, newId.toString());
        let reviewCreated = await this.getReviewById(newId.toString());
        return reviewCreated;
    },
    
    //get all reviews
    async getAllReviews() {
        let reviewCollection = await reviews();
        let allReviews = await reviewCollection.find({}).toArray();
        return allReviews;
    },
    
    //get reviews by review Id
    async getReviewById(reviewId){
        if(!reviewId || typeof reviewId !== 'string') throw `provide a review Id`
        let reviewCollection = await reviews();
        let parseId = ObjectId(reviewId);
        let getReview = await reviewCollection.findOne({ _id: parseId })
        if (getReview === null){
            throw `No review with that id`;
        };
        return getReview;
    },

    //get review by anime Id
    async getReviewByAnimeId(animeId){
        if(!animeId || typeof animeId !== 'string') throw `provide a review Id`
        let reviewCollection = await reviews();
        let getAllReviews = await reviewCollection.find({ animeId: animeId }).toArray();
        if (getAllReviews === null){
            throw `No review with that Anime id`;
        };
        return getAllReviews;
    },
    
    //remove review by review Id
    async removeReview(reviewId){
        if(!reviewId || typeof reviewId !== 'string') throw `provide a review Id`
        let parseId = ObjectId(reviewId);
        let reviewCollection = await reviews();
        let reviewinfo = await this.getReviewById(reviewId);

        let deletionInfo = await reviewCollection.deleteOne({ _id: parseId });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete the band with id of ${reviewId}`;
        };
        
        //call the method in the user collection to remove the review id
        //await usersCollection.removePostFromUser(reviewinfo.userId, reviewId);

        return `removed review for ${reviewId}`;
    },

    //remove review by anime Id
    async removeReviewByaAnimeId(animeId){
        if(!animeId || typeof animeId !== 'string') throw `provide a review Id`
        //let parseId = ObjectId(reviewId);
        let reviewCollection = await reviews();
        //let reviewinfo = await this.getReviewById(reviewId);

        let deletionInfo = await reviewCollection.remove({ animeId: animeId });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete the band with id of ${animeId}`;
        };
        
        //call the method in the user collection to remove the review id
        //await usersCollection.removePostFromUser(reviewinfo.userId, reviewId);

        return `removed all reviews for ${animeId}`;
    },
    
    async addCommentIdToReview(reviewId, commentId) {
        if (!reviewId || typeof reviewId !== "string") throw `You must provide a review id`;
        if (!commentId || typeof commentId !== "string") throw `You must provide a comment id`;
        
        let parseId = ObjectId(reviewId);
        let reviewCollection = await reviews();
        let reviewInfo = await this.getReviewById(reviewId);
        
        reviewInfo.commentIdArr.push(commentId);
        let updatedInfo = await reviewCollection.updateOne({ _id: parseId }, { $set: { commentIdArr: reviewInfo.commentIdArr } });
        return true;
    },
    
    async removeCommentIdFromReview(reviewId, commentId) {
        if (!reviewId || typeof reviewId !== "string") throw `You must provide a review id`;
        if (!commentId || typeof commentId !== "string") throw `You must provide a comment id`;
        let parseId = ObjectId(reviewId);
        let reviewCollection = await reviews();
        let reviewInfo = await getPostById(reviewId);
        let temp = [];
        for (let i = 0; i < reviewInfo.commentIdArr.length; i++) {
            if (reviewInfo.commentIdArr[i] !== commentId)
                temp.push(reviewInfo.commentIdArr[i]);
        }
        reviewInfo.commentIdArr = temp;
        let updatedInfo = await reviewCollection.updateOne({ _id: parseId }, { $set: { commentIdArr: reviewInfo.commentIdArr } });
        // console.log(updatedInfo);
        return true;
    },
    

    async addLikeCount(reviewId, userId) {
        if (!reviewId || typeof reviewId !== "string") throw `You must provide a review id`;
        if (!userId || typeof userId !== "string") throw `You must provide an user id`;
        let parseId = ObjectId(reviewId);
        let reviewInfo = await this.getReviewById(reviewId);
        if (reviewInfo.dislikeCount.indexOf(userId) !== -1)
        throw "the user has already disliked it";
        if (reviewInfo.likeCount.indexOf(userId) !== -1) {
            let index = reviewInfo.likeCount.indexOf(userId);
            reviewInfo.likeCount.splice(index, 1);
            let reviewCollection = await reviews();
            let updatedInfo = await reviewCollection.updateOne({ _id: parseId }, { $set: { likeCount: reviewInfo.likeCount } });
            if (updatedInfo.modifiedCount === 0) {
                throw 'could not cancel the likeCount successfully';
            }
            return await getReviewById(reviewId);
        }
        else {
            reviewInfo.likeCount.push(userId);
            let reviewCollection = await reviews();
            let updatedInfo = await reviewCollection.updateOne({ _id: parseId }, { $set: { likeCount: reviewInfo.likeCount } });
            if (updatedInfo.modifiedCount === 0) {
                throw 'could not add the likeCount successfully';
            }
            return await getReviewById(reviewId);
        }
    },

    async addDislikeCount(reviewId, userId) {
        if (!reviewId || typeof reviewId !== "string") throw `You must provide a review id`;
        if (!userId || typeof userId !== "string") throw `You must provide an user id`;
        let parseId = ObjectId(reviewId);
        let reviewInfo = await this.getReviewById(reviewId);
        if (reviewInfo.likeCount.indexOf(userId) !== -1)
            throw "the user has already liked it";
        if (reviewInfo.dislikeCount.indexOf(userId) !== -1) {
            let index = reviewInfo.dislikeCount.indexOf(userId);
            reviewInfo.dislikeCount.splice(index, 1);
            let reviewCollection = await reviews();
            let updatedInfo = await reviewCollection.updateOne({ _id: parseId }, { $set: { dislikeCount: reviewInfo.dislikeCount } });
            if (updatedInfo.modifiedCount === 0) {
                throw 'could not cancel the dislikeCount successfully';
            }
            return await getPostById(reviewId);
        }
        else {
            reviewInfo.dislikeCount.push(userId);
            let reviewCollection = await reviews();
            let updatedInfo = await reviewCollection.updateOne({ _id: parseId }, { $set: { dislikeCount: reviewInfo.dislikeCount } });
            if (updatedInfo.modifiedCount === 0) {
                throw 'could not add the dislike successfully';
            }
            return await getPostById(reviewId);
        }
    }
}

module.exports = exportedMethods;