const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const discussion = mongoCollections.discussion;

let exportedMethods = {
    async addDiscussion(animeId, epno, userId, text) {
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
        let discussionCollection = await discussion();
        let allDis = await discussionCollection.find({ animeId, epno }).toArray();
        return allDis;
    },
};

module.exports = exportedMethods;