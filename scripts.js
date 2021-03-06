// set game global variables
var userGuess = document.querySelector(".guess-input");
var functionOutput = document.querySelector(".function-output");
var minRange = document.querySelector(".input-min");
var maxRange = document.querySelector(".input-max");
var ranNum;

// generate a random number when the page is loaded or re-loaded
window.onload = function() {
  genRanNum();
};

// generates a random number between 0-100 for gameplay
function genRanNum() {
    ranNum = Math.floor(Math.random() * 100) + 1;
}

function genRanUserNum(min, max) {
  ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
}

// event listeners with passed functions following
$(".users-choice").on("click", function() {
  var min = parseInt(minRange.value);
  var max = parseInt(maxRange.value);
  genRanUserNum(min, max);
});

userGuess.addEventListener("keyup", checkState);

$(".reset-button").on("click", reset);

$(".clear-button").on("click", eraseText);

$(".guess-button").on("click", function() {
  showGuess();
  compare(userGuess);
  $("#clear").val("");
});

// keyup event - check the state of the text input field
function checkState(event) {
  userGuess.value === "" ? disableButtons() : enableButtons();
  if(event.keyCode === 13) {
    showGuess();
    compare();
  }
}

// click event - reset the game with new random number
function reset() {
  location.reload();
}

// click-event - erase whatever from the text input field and disable the buttons
function eraseText() {
  userGuess.value = "";
  $(".your-last-guess").text("");
  $(".last-guess").text("#");
  functionOutput.innerText = "";
  disableButtons();
}

// click event - display interactive text when a guess is made
function showGuess() {
  $("your-last-guess-was").text("Your last guess was");
  var userGuessValue = parseInt(userGuess.value);
  $(".last-guess").text(userGuessValue);
  dataType(userGuessValue);
  minMax(userGuessValue);
}

// check the data type of the users last guess
function dataType(userGuessValue) {
  if(typeof userGuessValue !== "number" || isNaN(userGuessValue))  {
    $(".last-guess").text("...");
    alert("you are outside of the required data type. please input a number as the title of this game is 'number guesser'");
  }
}

// compare the users guess/datatype to random number with a dash of sarcasm
function compare() {
  var userGuessValue = userGuess.value;
  userGuessValue = parseInt(userGuessValue);
  if(userGuessValue < ranNum) {
    functionOutput.innerText = "That is too low";
  }
  else if(userGuessValue   > ranNum) {
      functionOutput.innerText = "That is too high";
  }
  else if(userGuessValue  === ranNum) {
      document.getElementById("your-last-guess-was").innerText = " Your guessing range will now decrease and increase by 10";
      $(".last-guess").text("Boom");
      functionOutput.innerText = "You guessed it!";
      genRanNum();
      minRange.value = parseInt(minRange.value)- 10;
      maxRange.value = parseInt(maxRange.value)+ 10;
  } if(typeof userGuessValue !== "number" || isNaN(userGuessValue)) {
    document.getElementById("your-last-guess-was").innerText = "Umm...";
    functionOutput.innerText = "You know, that was not a number, right?";
  }
}
// check to see if the guess is out of min/max range
function minMax(userGuessValue) {
  if(userGuessValue < minRange.value) {
    alert("that is waaaay too low. please guess again");
}
else if(userGuessValue > maxRange.value) {
    alert("that is waaaay too high. please guess again");
  }
}

// remove disabled state from butons
function enableButtons() {
  document.getElementById("button1").removeAttribute("disabled");
  document.getElementById("button2").removeAttribute("disabled");
  document.getElementById("button3").removeAttribute("disabled");
}

// apply disabled state to buttons with exception of reset
function disableButtons() {
  document.getElementById("button1").setAttribute("disabled", true);
  document.getElementById("button2").setAttribute("disabled", true);
  // document.getElementById("button3").setAttribute("disabled", true);
}
