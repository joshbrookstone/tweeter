/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1587578589698
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(data) {

  for (let tweet of data) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }

};



const createTweetElement = function(tweet) {

  let name = tweet.user.name;
  let avater = tweet.user.avatars;
  let handle = tweet.user.handle;
  let content = tweet.content.text;
  let postDate = tweet.created_at;
  
  let timeDifference = (new Date()).getTime() - postDate;
  let dayDifference = Math.ceil((((timeDifference / 1000) / 60) / 60) / 24);

  let sentencetoLoad = function(dayDifference) {
    if (dayDifference > 365) {
      let years = Math.floor(dayDifference / 365);
      return `posted ${years} years ago`;
    }

    if (dayDifference <= 1) {
      return `posted today`;
    }

    return `posted ${dayDifference} days ago`;
  };

  const newTweet =
   `
    <article class="tweet">
      <header>
        <img class="avatar" src=${avater}>
        <h2 class="name">${name}</h2>
        <h2 class="handle">${handle}</h2>
      </header>
      <p>
        ${content}
      </p>
      <footer>
        <h3 class="postDate">${sentencetoLoad(dayDifference)}</h3>
        <img class="retweet" src="https://img.icons8.com/material-outlined/24/000000/retweet.png"/>
        <img class="like" src="https://img.icons8.com/material-outlined/24/000000/hearts.png"/>
        <img class="flag" src="https://img.icons8.com/material-rounded/24/000000/flag.png"/>
      </footer>
    </article>
  `;
    
 
  return newTweet;

};


renderTweets(data);