$(document).ready(function(){
  $("section.new-tweet form textarea").on("keyup", function(event){
    $("section.new-tweet span.counter").text(this.value.length);
    console.dir(event);
    console.dir(this);
  });

});
