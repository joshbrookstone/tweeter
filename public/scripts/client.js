/* eslint-disable no-undef */


const renderTweets = function(data) {

  $('.tweets').empty();

  for (let tweet of data) {
    const $tweet = createTweetElement(tweet);
    $('.tweets').prepend($tweet);
  }

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

