$(document).ready(function(){

  $("section.new-tweet form textarea").on("keyup", function(){

    // Remove any error message as text has now changed. Text will be re-validated and
    // new error message added if required during form submission
    $(this).siblings("span.error").remove();

    // this powers the counter to indicate max # characters remaining. Updates every keyup event on text box.
    let lengthRemaining = 140 - $(this).val().length;
    let counter = $(this).siblings(".counter");
    counter.text(lengthRemaining);

    // toggle highlighting if overlength
    if(lengthRemaining < 0){
      counter.addClass("over-length");
    } else {
      counter.removeClass("over-length");
    }
  });

});
