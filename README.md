# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

Built as part of the Lighthouse Labs program to learn and practice  HTML, CSS, JS, jQuery and AJAX front-end skills, and Node, Express and MongoDB back-end skills. My implementation also uses SASS for styling, although at this level that is more for exposure and practice than much actual benefit.

## Features

- User can post tweets, which are assigned a randomly generated user, avatar, and handle, and stored in mongoDB database
- User can view previously posted tweets, and can toggle "like" for each tweet.
- Compose form validates tweet and will not allow tweets that are over-length or empty.
- Compose form can be shown or hidden using the "compose" button
- Tweets fade in/out in an aesthetically pleasing manner when mouse overs over them
- Dates are displayed in a simple human readable manner which varies depending on the age of the tweet.

## Final Product

!["Displaying Tweets"](https://github.com/thelornenelson/tweeter/blob/master/docs/tweet-display.png)
!["Composing a new Tweet"](https://github.com/thelornenelson/tweeter/blob/master/docs/tweet-compose.png)
!["Trying to submit an invalid Tweet"](https://github.com/thelornenelson/tweeter/blob/master/docs/tweet-compose-error.png)

## Getting Started

1. Clone this repository.
2. Install dependencies using the `npm install` command.
3. Compile stylesheets using the `npm run sass-build` command.
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Node 5.10.x or above
- Express 4.13.4 or above
- Chance 1.0.2 or above
- md5 2.1.0 or above
- mongodb 3.0.5 or above
- node-sass 4.8.3 or above
