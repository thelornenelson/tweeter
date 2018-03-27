$(document).ready(function(){

  $("section.new-tweet form textarea").on("keyup", function(){
      let lengthRemaining = 140 - $(this).val().length;

      let counter = $(this).siblings(".counter");
      counter.text(lengthRemaining);
      if(lengthRemaining < 0){
        counter.addClass("over-length");
      } else {
        counter.removeClass("over-length");
      }
  });

});
