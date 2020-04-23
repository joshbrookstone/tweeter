
$(document).ready(function() {
  $(".form-toggle").click(function() {
    if ($("#form").is(":visible")) {
      $("#form").slideUp("slow");
    } else {
      $("#form").slideDown("slow");
      $("#tweet-text").focus();
    }
  });
});


