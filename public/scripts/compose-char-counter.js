const maxCharacters = 140;

$("textarea").keyup(function() {
  const counter = $(this).siblings(".counter");
  
  let characters = $(this).val().length;

  if (characters > maxCharacters) {
    counter.addClass('over');
  } else {
    counter.removeClass('over');
  }

  counter.text(maxCharacters - characters);
});
