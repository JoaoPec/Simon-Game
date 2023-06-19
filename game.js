var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = []

var userClickedPattern = []

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)

    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
    animatePress(userChosenColour)
})

// Checa se a desgraça já começou
var start = false
var level = 0;

$(document).on("keypress", function () {

    while (start === false) {
        $("h1").text("Level " + level)

        nextSequence()

        start = true

    }
})
//Level

function nextSequence() {

    userClickedPattern = [];

    level++;

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)

    $("h1").text("Level " + level)

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("sucess");


        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }

    } else {
        console.log("Wrong");

        playSound("wrong")

        $("body").addClass("game-over")

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart")

        startOver()
    }
}

function startOver() {

    Level = 0;

    gamePattern = [];

    start = false;

}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}