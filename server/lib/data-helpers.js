"use strict";
const assert = require("assert");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  function getTweets(callback){
    db.collection("tweets").find().toArray(callback);
  }

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback){
      db.collection("tweets").find().sort({ "created_at": -1 }).toArray(callback);
    }

  };

}
