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
  back();
});

$(".replay-button").click(function (){
  startOver();
  play();
  $(this).addClass("hide");
  $("body").removeClass("game-over");

})

$(".howToPlay-button").click(function (){
  $("#level-title").text("How to Play");
  $(".menu").addClass("hide");
  $(".htp-text").removeClass("hide");
  back();
})

$(".about-button").click(function (){
  $("#level-title").text("About");
  $(".menu").addClass("hide");
  $(".about-text").removeClass("hide");
  back();
})

$(".btn").click(function(){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function back(){
  $(".back-button").removeClass("hide").click(function(){
    $(".back-button").addClass("hide");
    $(".game").addClass("hide");
    $(".menu").removeClass("hide");
    $(".htp-text").addClass("hide");
    $(".about-text").addClass("hide");
    $("body").removeClass("image");
    $("#level-title").text("simon");
    $(".replay-button").addClass("hide");
    startOver();
  });
}

function play() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}



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

$(window).on('resize', function(){
  var conwidth = $('.container').width()/2 - 30;
  $(".red").css('right','calc(30% + '+conwidth+'px)');
});
$(window).on('resize', function(){
  var conwidth = $('.container').width()/2 - 30;
  $(".green").css('left','calc(30% + '+conwidth+'px)');
});
$(window).on('resize', function(){
  var conwidth = $('.container').width()/2 - 30;
  $(".blue").css('right','calc(30% + '+conwidth+'px)');
});
$(window).on('resize', function(){
  var conwidth = $('.container').width()/2 - 30;
  $(".yellow").css('left','calc(30% + '+conwidth+'px)');
});