var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started=false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    $("h1").text("Level "+ level);
    newSequence();
    started = true;
  }
});

$(".btn").click(function(){

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length -1);
});

function playSound(name){
  var audio = new Audio('sounds/' +name+ '.mp3');
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function newSequence(){
  
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+ level);

  var randomNumber = Math.floor((Math.random())*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        newSequence();
      }, 1000);
    }
  }

  else{
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver(){
  started = false; 
  level = 0;
  gamePattern = [];
}
