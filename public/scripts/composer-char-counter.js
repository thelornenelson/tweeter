$(document).ready(function(){

  $("section.new-tweet form textarea").on("keyup", function(){
      let lengthRemaining = 140 - $(this).val().length;

      // Remove any error message as text has now changed. Will be re-added
      // if necessary during form submission
      $(this).siblings("span.error").remove();

      let counter = $(this).siblings(".counter");
      counter.text(lengthRemaining);
      if(lengthRemaining < 0){
        counter.addClass("over-length");
      } else {
        counter.removeClass("over-length");
      }
  });

});
