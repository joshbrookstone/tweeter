
// blinking form exists. just not using it..find it annoying

// const blink = function(selector) {
//   $(selector).fadeOut(2000, function() {
//     $(this).fadeIn(3000, function() {
//       blink(this);
//     });
//   });
// };

$(document).ready(function() {
  // blink($('.form-toggle'));
  $(".form-toggle").click(function() {
    console.log("this is sliding!");
    $("#form").slideDown("slow");
    $("#tweet-text").focus();
  });
});

