/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
   // Test / driver code (temporary). Eventually will get this from the server.
   // Fake data taken from tweets.json
   // const data = [
   //   {
   //     "user": {
   //       "name": "Newton",
   //       "avatars": {
   //         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
   //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
   //         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
   //       },
   //       "handle": "@SirIsaac"
   //     },
   //     "content": {
   //       "text": "If I have seen further it is by standing on the shoulders of giants"
   //     },
   //     "created_at": 1461116232227
   //   },
   //   {
   //     "user": {
   //       "name": "Descartes",
   //       "avatars": {
   //         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
   //         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
   //         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
   //       },
   //       "handle": "@rd" },
   //     "content": {
   //       "text": "Je pense , donc je suis"
   //     },
   //     "created_at": 1461113959088
   //   },
   //   {
   //     "user": {
   //       "name": "Johann von Goethe",
   //       "avatars": {
   //         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
   //         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
   //         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
   //       },
   //       "handle": "@johann49"
   //     },
   //     "content": {
   //       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
   //     },
   //     "created_at": 1461113796368
   //   }
   // ];

  // Handle form submission
  $("form").on("submit", function(event){
    event.preventDefault();
    let data = $(this).serialize();
    $.post("/tweets", data).done(function(response){
      loadTweets();
    });
  });



  // creates and returns element tree for a single tweet
  function createTweetElement(tweetData){

    // create element nodes
    let $article = $("<article>").addClass("tweet");
    let $header = $("<header>");
    let $avatar = $("<img>").attr("src", tweetData.user.avatars.regular);
    let $username = $("<span>").addClass("username").text(tweetData.user.name);
    let $handle = $("<span>").addClass("handle").text(tweetData.user.handle);
    let $tweet = $("<div>").text(tweetData.content.text);
    let $footer = $("<footer>");

    // append nodes to create tree off article node
    $header.appendTo($article);
    $avatar.appendTo($header);
    $username.appendTo($header);
    $handle.appendTo($header);
    $tweet.appendTo($article);
    $footer.appendTo($article);

    // add footer data
    $("<span>" + Math.round(((Date.now() - tweetData.created_at) / 86400000)) + " days ago" + "</span>").appendTo($footer);
    $("<span>&#9873; &#11156; &#9829;</span>").addClass("actions").appendTo($footer);

    // returns complete tree of jQuery objects, ready for insertion into the DOM.
    return $article;
  }

  // generates and inserts DOM nodes for tweets
  function renderTweets(tweets) {
    tweets.forEach(function(tweetData){
      $('#tweets-container').append(createTweetElement(tweetData));
    });
  }

  // retrieve tweets from server
  function loadTweets(){
    $.getJSON("/tweets").done(function(tweets){
      renderTweets(tweets);
    })
  }

  loadTweets();

});
