////////////////////// Functions //////////////////////


// Starting next round
function nextRound() {
    clicksCounter = 0;
    $("h2").text("Round " + (roundCounter));

    // Drawing next button
    var nextButton = Math.floor(Math.random() * 4);
    

    switch(nextButton) {
        case 0:
            nextButton = "green";
            break;
        case 1:
            nextButton = "red";
            break;
        case 2:
            nextButton = "yellow";
            break;
        case 3:
            nextButton = "blue";
            break;
        default:
            alert(nextButton);
            break;
    }

    // Adding next button to the correct order
    correctOrder.push(nextButton);
    
    buttonAnimation(nextButton);
    buttonSound(nextButton);
}


// Checking if users input is correct
function isCorrect(activeButton) {

    if(activeButton === correctOrder[clicksCounter]) {
        buttonSound(activeButton);
        clicksCounter++;
    }
    else {
        theEnd();
    }
    if(clicksCounter === roundCounter) {
        roundCounter++;

        // Timeout before next round
        setTimeout(function() {
            nextRound();
        }, 500);
    }
}


// Ending game on wrong answer
function theEnd() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h2").text("Press any key to try again.")

    // Animations 
    $("body").toggleClass("wrong");
    setTimeout(function() {
        $("body").toggleClass("wrong");
    }, 200);


    // Reseting variables
    gameStatus = 3;
    clicksCounter = 0;
    roundCounter = 1;
    correctOrder = [];
}


// Button Animation Function
function buttonAnimation(activeButton) {
    $("." + activeButton).toggleClass("pressed");
    setTimeout(function() {
        $("." + activeButton).toggleClass("pressed");
    }, 200);
}


// Button Sound Function
function buttonSound(activeButton) {
    var audio = new Audio("sounds/" + activeButton + ".mp3");
    audio.play();
}


////////////////////// Variables //////////////////////

var gameStatus = 1; // 1 = First Game, 2 = Currently Playing, 3 = Lost
var roundCounter = 1; // Round counter
var correctOrder = []; // Correct order
var clicksCounter = 0; // Clicks counter


//////////////////// Event Listeners ////////////////////

// Starting Game
$(document).on("keypress", function(event) {
    console.log(event.key);
    if(gameStatus === 1) {
        if(event.key === "a") {
            gameStatus = 2;
            nextRound();
        }
    }

    else if(gameStatus === 3) {
        gameStatus = 2;
        nextRound();
    }

});


// Buttons Animation
$("button").on("click", function() {
    if(gameStatus === 2) {
        var activeButton = $(this).attr("class");
        buttonAnimation(activeButton);
        isCorrect(activeButton);
    }

});

