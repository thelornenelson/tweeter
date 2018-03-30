"use strict";
const assert = require("assert");
const ObjectId = require("mongodb").ObjectId;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback){
      db.collection("tweets").find().sort({ "created_at": -1 }).toArray(callback);
    },

    // toggles "like" property for tweet with given id
    toggleLike: function(tweetId, callback){
      // create an ObjectId, required to search by ID in mongodb
      let id = new ObjectId(tweetId);

      // find document in db and update to reverse "like" boolean.
      db.collection("tweets").findOne({"_id": id}, function(err, data){
        db.collection("tweets").updateOne({"_id": id}, { $set: {"like": !data.like} }, callback);
      });
    }
  };

}
