const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// eslint-disable-next-line no-unused-vars
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