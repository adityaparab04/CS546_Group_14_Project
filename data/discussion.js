const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const discussion = mongoCollections.discussion;

let exportedMethods = {
    async addDiscussion(animeId, epno, userId, text) {
        if(!animeId || typeof animeId !== 'string') throw `invalid anime id`;
        if(!epno || typeof epno !== 'string') throw `invalid ep no`;
        if(!userId || typeof userId !== 'string') throw `invalid user id`;
        if(!text || typeof text !== 'string') throw `invalid type of text`;
        if(!text.replace(/\s/g, "").length) throw `Input cannot be empty spaces`;
        let discussionCollection = await discussion();
        let insertInfo = await discussionCollection.insertOne({
            animeId,
            epno,
            userId,
            text,
            date: new Date().toLocaleDateString()
        });
        if (insertInfo.insertedCount === 0) {
            throw 'Something wrong when creating the discussion';
        }
        return `discussion inserted`;
    },
    async getAllDiscussionsOfAnAnimeEpisode(animeId, epno) {
        if(!animeId || typeof animeId !== 'string') throw `invalid anime id`;
        if(!epno || typeof epno !== 'string') throw `invalid ep no`;
        let discussionCollection = await discussion();
        let allDis = await discussionCollection.find({ animeId, epno }).toArray();
        return allDis;
    },
    async removeDiscussionByUserId(userId){
        if(!userId || typeof userId !== 'string') throw `invalid user id`;
        let discussionCollection = await discussion();
        let deletionInfo = await discussionCollection.deleteMany({ userId: userId });
        if (deletionInfo.deletedCount === 0) {
            //throw `Could not delete the band with id of ${userId}`;
            return `no discussion for ${userId}`
        }
        return `removed all discussion for ${userId}`;
    }
};

module.exports = exportedMethods;