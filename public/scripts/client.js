/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(data) {

  $('.tweets').empty();

  for (let tweet of data) {
    const $tweet = createTweetElement(tweet);
    $('.tweets').prepend($tweet);
  }

};


const createTweetElement = function(tweet) {

  let name = tweet.user.name;
  let avater = tweet.user.avatars;
  let handle = tweet.user.handle;
  let content = tweet.content.text;
  let postDate = tweet.createdAt;
  
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
        <img class="avatar" src=${(avater)}>
        <h2 class="name">${(name)}</h2>
        <h2 class="handle">${(handle)}</h2>
      </header>
      <p>
        ${escape(content)}
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

$('form').submit(function(event) {
  event.preventDefault();
  const self = this;
  const counter = 140 - $(".counter").val();
  const formData = $(this).serialize();

  console.log("counter is", counter);
 
  if (counter > 0 && counter <= 140) {
    $.post('/tweets/', formData)

    
      .then(() => {
        $(self)[0].reset();
        loadTweets(formData);
        $(".counter").text(140);
      })

      .catch(err => {
        console.log('err :>> ', err);
        alert(err.responseJSON.error);
      });

  }

  if (counter > 140) {
    $(".tooManyError").slideDown("slow");
    setTimeout(() => {
      $('.tooManyError').slideUp("slow");
    }, 2000);
  }

  if (counter === 0) {
    $(".noInputError").slideDown("slow");
    setTimeout(() => {
      $('.noInputError').slideUp("slow");
    }, 2000);
  }
  

});

const loadTweets = function() {
  $.getJSON('/tweets')
    .then((posts) => {
      console.log('posts :>> ', posts);
      renderTweets(posts);
    });
};

loadTweets();

