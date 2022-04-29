//array for button colors
var buttonColours = ["red", "blue", "green", "yellow"];
//initialize game pattern array
var gamePattern = [];
//initialize user clicked pattern array
var userClickedPattern = [];
//level initialize
var level = 0;
//started initialize
var started = false;

//first keyboard key is being pressed
//game begins
$(document).keydown(function(){
    if(!started){
        //level h1 to show
        $("#level-title").text("Level "+level);
        //calling next sequence
        nextSequence();
        started = true;
    }
});


//on clicking any button - anonymous function
$(".btn").click(function() {
    //getting id of the clicked button 
    var userChosenColour  = $(this).attr("id");
 
    //push it onto the choosen color array
    userClickedPattern.push(userChosenColour);
 
    //printing it just for checking
    console.log(userClickedPattern);
 
    //playing the audio corresponding to the clicked button
    playSound(userChosenColour);
    //animate it when clicked
    animatePress(userChosenColour);
    //passing to check the answer of the logic if it is correct or not
    checkAnswer(userClickedPattern.length-1);
 });

 //Check Answer LOGIC!!
//if yes then only move forward otherwise game over
function checkAnswer(currentLevel){
    //check if most recent user answer is same as game pattern
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        //if correct then move to next level with delay of 1sec
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("failure");
        //playing sound for gameover
        playSound("wrong");
        //adding class of game-over and flash it
        $("body").addClass("game-over");
        //changing h1 text to restart!!
        $("#level-title").text("Game Over, Press Any Key to Restart");
        //remove the class after the delay of 200ms
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        //restart game
        startOver();
    }
}

function nextSequence(){
    //resetting userClickedPattern array after rach nextSequence
    userClickedPattern = [];
    //increasing level at each nextsequence()
    level++;
    //level h1 to show
    $("#level-title").text("Level "+level);
    //generating random number
    var randomNumber = Math.floor(Math.random()*4);

    //getting the random color from the array
    var randomChosenColour  = buttonColours[randomNumber];
    
    //push it into the gamePattern array
    gamePattern.push(randomChosenColour);

    //making flashing the random selected color
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    //playing the audio corresponding to the selected audio
    playSound(randomChosenColour);
}


//to animate when any button is pressed
function animatePress(currentColour){
    //adding class when its pressed
    $("#"+currentColour).addClass("pressed");

    //removing class after a delay of 100ms
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

//function to play sound
function playSound(name){
    //general way of playing any audio
    var audio = new Audio("sounds/"+name+".mp3");
   audio.play();
}

//startover function if user function gets sequence wrong
//then resetting allvalues
function startOver(){
    level =0;
    gamePattern = [];
    started = false;
}