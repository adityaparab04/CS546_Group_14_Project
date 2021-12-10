const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const comments = mongoCollections.comments;
const reviewCollection = require('./reviews');
const userCollection = require('./users');

let exportedMethods = {
    async addComment(reviewId, userId, content){

        if (!reviewId || typeof reviewId !== "string")
            throw `you should input a string as the reviewId`;
        if (!userId || typeof userId !== "string")
            throw `you should input a string as the userId`;
        if (!content || typeof content !== "string")
            throw `you should input a string as the comment`;
        if(!content.replace(/\s/g, "").length)
            throw `you should not enter empty spaces in comment`;
        let commentCollection = await comments();
        let newComment = {
            reviewId: reviewId,
            userId: userId,
            content: content,
            date: new Date().toLocaleDateString()
        };
        let insertInfo = await commentCollection.insertOne(newComment);
        if (insertInfo === null)
            throw `Something wrong when adding the comment`;
        let newCommentId = insertInfo.insertedId;
        let commentCreated = await this.getCommentById(newCommentId.toString());
        
        await reviewCollection.addCommentIdToReview(reviewId, newCommentId.toString());


        return commentCreated;
    },
    async getCommentById(commentId){
        if (!commentId || typeof commentId !== "string")
        throw `You must provide an id to search for`;
        let commentCollection = await comments();
        let parseId = ObjectId(commentId);
        let commentInfo = await commentCollection.findOne({ _id: parseId });
        if (commentInfo === null)
            throw `No comment with that id`;
        return commentInfo;
    },

    async getAllComments(){
        let commentCollection = await comments();
        let allComments = await commentCollection.find({}).toArray();
        return allComments;
    },
    async getAllCommentsOfAReview(reviewId){
        let commentCollection = await comments();
        let allComments = await commentCollection.find({reviewId:reviewId}).toArray();
        return allComments;
    },
    async getAllCommentsOfAUser(userId){
        let commentCollection = await comments();
        let allComments = await commentCollection.find({userId}).toArray();
        return allComments;
    },
    async removeComments(reviewId, commentId){
        if (!reviewId || typeof reviewId !== "string")
            throw `you should input a string as the reviewId`;
        if (!commentId || typeof commentId !== "string")
            throw `you should input a string as the commentId`;

        await reviewCollection.removeCommentIdFromReview(reviewId, commentId);
        let parseId = ObjectId(commentId);
        let commentCollection = await comments();
        let deletionInfo = await commentCollection.deleteOne({ "_id": ObjectId(commentId) });
        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete the comment`;
        }
        // userCollection.removeCommentFromUser(userId,commentId);
        return true;
    }

}

module.exports = exportedMethods;