var buttonColours = ["red", "blue", "green", "yellow"]; //El array
var gamePattern = []; //El array vacío
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function() { //Le quite el keypress y le puse click //Lo regresé
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }


})



$(".btn").click(function() { //Le agrega el escucha a body
  var userChosenColour = $(this).attr("id"); //Creamos esta varaible para almacenar el id del buton que se selecciono
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 100);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); //Genera un numero aleatorio entre 0 y 3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //Con jquery seleccionamos el color usando el # para obtener el id

  playSound(randomChosenColour);


}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); //Agrega el audio al botón
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
