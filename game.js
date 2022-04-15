
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
var clicks=0;
function nextSequence(){
    level=level+1;
  $("#level-title").html("Level "+level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];//we are choosing random color
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}

$(".btn").click(function(event){
  var userChosenColour=event.target.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  clicks++;
  if(!checkAnswer(clicks)){
      playSound("wrong");
      $("h1").html("Game Over,Press Any Key to Restart");

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();
  }
else if(clicks===level){
    clicks=0;

      userClickedPattern=[];
    setTimeout(function(){
        nextSequence();
    },1000);
  }

  });

function checkAnswer(clicks){
  if(userClickedPattern[clicks-1]!=gamePattern[clicks-1]){
    return false;
  }
  return true;
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){

$("#"+currentColour).addClass("pressed");
setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");
},100);
}

$(document).keydown(function(){
  if(!started){
    started=true;
    nextSequence();
  }
});

function startOver(){
  clicks=0;
 started=false;
 level=0;
 gamePattern=[];
 userClickedPattern=[];
}
