/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
   // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }


  // <article class="tweet">
  //   <header>
  //     <img src="https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png" />
  //     <span class="username">Mr Popular</span>
  //     <span class="handle">@MrPop</span>
  //   </header>
  //   <div>I have so many important things to say!</div>
  //   <footer>10 Days Ago<span>&#9873; &#11156; &#9829;</span></footer>
  // </article>
  function createTweetElement(tweetData){

    let $article = $("<article>").addClass("tweet");
    let $header = $("<header>");
    let $avatar = $("<img>").attr("src", tweetData.user.avatars.regular);
    let $username = $("<span>").addClass("username").text(tweetData.user.name);
    let $handle = $("<span>").addClass("handle").text(tweetData.user.handle);
    let $tweet = $("<div>").text(tweetData.content.text);
    let $footer = $("<footer>").text(tweetData.created_at)

    $header.appendTo($article);
    $avatar.appendTo($header);
    $username.appendTo($header);
    $handle.appendTo($header);

    $tweet.appendTo($article);
    $footer.appendTo($article);
    $("<span>&#9873; &#11156; &#9829;</span>").appendTo($footer);
    debugger;
    return $article;
  }

  let $tweet = createTweetElement(tweetData);


  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});
