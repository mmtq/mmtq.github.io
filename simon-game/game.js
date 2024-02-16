var gamePattern = [];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var gameLevel=0;

var highScore = 0;

function updateHighScore(score) {
    if (score > highScore) {
        highScore = score;
        $("#displayHighScore").text(highScore);
    }
}

function checkAnswer(currentLevel){
    var check=true;
    console.log(gamePattern);
    console.log(userClickedPattern);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

    } else{
        check = false;
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        started=false;
        updateHighScore(gameLevel-1);
    }
    if(check==true && currentLevel=== gamePattern.length-1){
        setTimeout(() => {
            nextSequence();
        userClickedPattern=[];
        }, 1000);
    }

}

function playSound(color) {
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

function animatePress(buttonID){
    $("#" + buttonID).addClass("pressed");
    setTimeout(() => {
        $("#" + buttonID).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    gameLevel++;
    $("h1").text("Level "+gameLevel);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // nextSequence();
}

$(".btn").click(function(event) {
    if (started) {
        var userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
});



$(document).keypress(function () {
    if (!started) {
        gamePattern=[];
        userClickedPattern=[];
        gameLevel=0;
        started = true;
        setTimeout(() => {
            nextSequence();
        }, 500);
    }
});
