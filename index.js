const buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;


$(".play-button").click(function(){
  $(".menu").addClass("hide");
  $(".game").removeClass("hide");
  $("body").addClass("image");
  play();
  $(".back-button").removeClass("hide").click(function(){
    $(".back-button").addClass("hide");
    $(".game").addClass("hide");
      $(".menu").removeClass("hide");
      $("body").removeClass("image");
      $("#level-title").text("simon");
      startOver();
  });
});

$(".replay-button").click(function (){
  startOver();
  play();
})

function play() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}


$(".btn").click(function(){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $(".replay-button").removeClass("hide");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    }
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
