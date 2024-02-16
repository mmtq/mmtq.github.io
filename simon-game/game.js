var gamePattern = [];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var gameLevel=0;

var highScore = 0;

var modal = document.getElementById("howToPlayModal");

// Get the button that opens the modal
var btn = document.getElementById("howToPlayBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function updateHighScore(score) {
    if (score > highScore) {
        highScore = score;
        $("#displayHighScore").text(highScore);
    }
}

function checkAnswer(currentLevel){
    var check=true;
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
