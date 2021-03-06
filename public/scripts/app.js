/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

  // show/hide new tweet form
  $("#button-compose").on("click", function(){
    // slide form down/up
    $("section.new-tweet").slideToggle("fast", function(){
      // set focus to form once slide is done.
      $("section.new-tweet textarea").focus();
    });

  });

  // Handle form submission
  $("form").on("submit", function(event){

    // stop form from submitting
    event.preventDefault();

    // capture entered text
    let $text = $(this).children("textarea").val();

    if($text && $text.length <= 140){
      //check if text is valid.

      // store form data for submission in urlencoded format
      let data = $(this).serialize();

      // clear text input
      $(this).children("textarea").val("");

      // submit data and when done, reload tweets.
      $.post("/tweets", data).done(function(response){
        loadTweets();
      });

    }  else if ($text.length > 140){
      submissionError("That's too long!");
    } else {
      submissionError("Please enter some text");
    }
  });

  // add error message to tweet form. Removed on keyup in composer-char-counter.js
  function submissionError(message){
    //remove previous error, if any
    $("form span.error").remove();

    //create error message and insert into DOM
    $("<span>").addClass("error").text(message).insertAfter("form input[type=submit]");
  }

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

    let likeActive = tweetData.like ? " like-active" : "";

    // append nodes to create tree off article node
    $avatar.appendTo($header);
    $username.appendTo($header);
    $handle.appendTo($header);

    $header.appendTo($article);
    $tweet.appendTo($article);
    $footer.appendTo($article);

    // add footer data
    $("<span>" + daysAgo(tweetData.created_at) + "</span>").appendTo($footer);
    $(`<span class="like${likeActive} fas fa-heart"></span>`).data("mongo-id", tweetData._id).appendTo($(`<span class="actions"><span class="fas fa-flag"></span><span class="fas fa-retweet"></span></span>`).appendTo($footer));

    // returns complete tree of jQuery objects, ready for insertion into the DOM.
    return $article;
  }

  // returns the number of days between now and the day passed as parameter (millisecond time stamp)
  // returns "Today", "Yesterday", or 2, 3, 4...
  function daysAgo(date){
    let s = "s";
    let difference = Date.now() - date;
    if(difference < 3600000) {

      // less than 60 minutes ago
      let rounded = Math.round(difference / 60000);
      rounded == 1 ? s = "" : null ;
      return rounded + ` minute${s} ago`;

    } else if(difference < 84600000){

      // less than 23.5 hours ago
      let rounded = Math.round(difference / 3600000);
      rounded == 1 ? s = "" : null ;
      return rounded + ` hour${s} ago`;

    } else if(difference < 2 * 86400000){

      return "Yesterday";

    } else if(difference < 31449600000){

      // less than 364 days ago
      let rounded = Math.round(difference / 86400000);
      rounded == 1 ? s = "" : null ;
      return rounded + ` day${s} ago`;

    } else {

      let rounded = Math.round(difference / 31536000000);
      rounded == 1 ? s = "" : null ;
      return rounded + ` year${s} ago`;

    }

  }

  // generates and inserts DOM nodes for tweets
  function renderTweets(tweets) {

    // create new container
    let $newTweets = $(`<div id="tweets-container">`);

    // fill container with new tweets
    tweets.forEach(function(tweetData){
      $newTweets.append(createTweetElement(tweetData));
    });

    // replace existing container with new, updated, full container.
    $('#tweets-container').replaceWith($newTweets);
  }

  // toggles the "like" heart immediately in the DOM, and also updates database in background
  function toggleLike($like){
    $like.toggleClass("like-active");
    let id = $like.data("mongo-id");
    $.post(`/tweets/${id}/like`, "");
  }

  // retrieve tweets from server
  function loadTweets(){
    // load tweets from server
    $.getJSON("/tweets").done(function(tweets){
      // generate and insert tweets into DOM
      renderTweets(tweets);

      // add click handler for "like" buttons. Needs to be in here to ensure tweet elements have been added to DOM.
      $(".like").on("click", function(){
        toggleLike($(this));
      });
    });
  }

  // fetches tweet on initial page load. Reloaded subsequently when new tweet is added.
  loadTweets();

});
