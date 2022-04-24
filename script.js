//button elements
var startButton = document.querySelector("#start-button");
var highscoreButton = document.getElementById("highscore-button");
var backButton = document.getElementById("back-button");
var submitButton = document.getElementById("submit-button");
var clearButton = document.getElementById("clear-button");

//page elements
var homePage = document.getElementById("home-page");
var questionPage = document.getElementById("question-page");
var scorePage = document.getElementById("score-page");
var highscorePage = document.getElementById("highscore-page");

var questionEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var correctnessEl = document.getElementById("correctness");
var timerEL = document.getElementById("timer");
var scoreEl = document.getElementById("score");
var initialsEl = document.getElementById("initials");
var highscoresEL = document.getElementById("highscores");

var gameOver = false;
var score;
var highscoreArray = [];

// quiz questions and answers
var question1 = {
  question: "What does CSS stand for?",
  answer1: "<Computer style sheets>",
  answer2: "<Colourful style sheets>",
  answer3: "<Cascading style sheets>",
  rightAnswer: "<Cascading style sheets>"
};
var question2 = {
  question: "What does HTML stand for?",
  answer1: "Hyper text markup langauge",
  answer2: "Hyperlinks and text markup language",
  answer3: "Home tool markup",
  rightAnswer: "Home tool markup"
};
var question3 = {
  question: "Inside which HTML element do we put the Javascript code",
  answer1: "Script",
  answer2: "Javascript",
  answer3: "JS",
  rightAnswer: "Script"
};
var question4 = {
  question: "What special character are javascript arrays contained in?",
  answer1: "' '",
  answer2: "( )",
  answer3: "{ }",
  rightAnswer: "[ ]"
};
var questionArray = [question1, question2, question3, question4];
var questionIndex = 0;

function init() {
  if (localStorage.getItem("highscores") !== null) {
    highscoreArray = JSON.parse(localStorage.getItem("highscores"));
    console.log("block 1");
  }else{
    localStorage.setItem("highscores", JSON.stringify(highscoreArray));
    console.log("block 2");
  }
}

//button functions
function viewHighscores() {
  gameOver = true;
  homePage.classList.add("d-none");
  questionPage.classList.add("d-none");
  scorePage.classList.add("d-none");
  highscorePage.classList.remove("d-none");
  renderHighscores();
}

function startQuiz() {
  homePage.classList.add("d-none");
  questionPage.classList.remove("d-none");
  gameOver = false;
  questionIndex = 0;

  startClock();
  renderQuestion();
}

function startClock() {
  score = 75;
  timerEL.textContent = score;
  var timerInterval = setInterval(function() {
    if (gameOver) {
      clearInterval(timerInterval);
    }else if(score <= 0){
      gameOver = true;
      clearInterval(timerInterval);
      correctnessEl.textContent = "TIME UP!";
      scoreEl.textContent = score;
      setTimeout(function(){questionPage.classList.add("d-none");
      scorePage.classList.remove("d-none");},1002)
    } else {
      score--;
      timerEL.textContent = score;
    }
  }, 1000);
}

function renderQuestion() {
  answersEl.innerHTML = "";
  questionEl.textContent = questionArray[questionIndex].question;
  var answerArray = genererateAnswerArray(questionArray[questionIndex]);
  for (var i = 0; i < answerArray.length; i++) {
    var answerButton = document.createElement("button");
    answerButton.textContent = answerArray[i];
    answerButton.classList.add("btn", "btn-primary");
    answersEl.appendChild(answerButton);
  }
}

function genererateAnswerArray(question) {
  var answerArray = [];
  answerArray.push(
    question.answer1,
    question.answer2,
    question.answer3
  );
  shuffle(answerArray);
  return answerArray;
}
//Sourced from https://javascript.info/task/shuffle
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

//function to check if the answer macthes
function checkAnswer(event) {
  if (event.target.matches("button")) {
    if (event.target.textContent === questionArray[questionIndex].rightAnswer) {
      correctnessEl.textContent = "CORRECT";
      setTimeout(function() {
        correctnessEl.textContent = "";
      }, 1200);
    } else {
      if(score >= 15){
      score -= 15;
      }else{
        score = 0;
        setTimeout(function() {
          questionPage.classList.add("d-none");
          scorePage.classList.remove("d-none");
        }, 1002);
      }
      timerEL.textContent = score;
      correctnessEl.textContent = "WRONG";
      setTimeout(function() {
        correctnessEl.textContent = "";
      }, 1000);
    }
    if (questionIndex < questionArray.length - 1) {
      questionIndex++;
      renderQuestion();
    } else {
      gameOver = true;
      setTimeout(function() {
        questionPage.classList.add("d-none");
        scorePage.classList.remove("d-none");
      }, 1002);
      scoreEl.textContent = score;
    }
  }
}

function submitScore(event) {
  event.preventDefault();
  var newScore = {
    initials: "",
    yourScore: ""
  };
  newScore.initials = initialsEl.value.toUpperCase();
  newScore.yourScore = score;
  highscoreArray.push(newScore);
  localStorage.setItem("highscores", JSON.stringify(highscoreArray));
  viewHighscores();
  renderHighscores();
}

function renderHighscores() {
  highscoresEL.innerHTML = "";
  highscoreArray.sort(compare);
  for (var i = 0; i < highscoreArray.length; i++) {
    var insertedScore = document.createElement("li");
    insertedScore.classList.add("list-group-item", "list-group-item-primary");
    insertedScore.textContent =
      i +
      1 +
      ". " +
      highscoreArray[i].initials +
      ": " +
      highscoreArray[i].yourScore;
    highscoresEL.appendChild(insertedScore);
  }
  highscoreButton.disabled = true;
}

function compare(a, b) {
  return b.yourScore - a.yourScore;
}

function back(event) {
  highscorePage.classList.add("d-none");
  homePage.classList.remove("d-none");
  highscoreButton.disabled = false;
}

// function to clear the scores
function clearScores() {
  highscoreArray = [];
  localStorage.setItem("highscores", JSON.stringify(highscoreArray));
  highscoresEL.innerHTML = "";
}

function testFunciton(event) {
  console.log("test");
}

highscoreButton.addEventListener("click", viewHighscores);
startButton.addEventListener("click", startQuiz);
backButton.addEventListener("click", back);
answersEl.addEventListener("click", checkAnswer);
submitButton.addEventListener("click", submitScore);
clearButton.addEventListener("click", clearScores);
