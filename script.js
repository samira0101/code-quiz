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

let quizData = [
    {
     question:"What does CSS stand for?",
     multiplechoice: [
         "Computer style sheets", 
         "Colourful style sheets",
         "Cascading style sheets"
     ],
     answer: "Cascading style sheets"
    },
    {
        question:"What does HTML stand for?",
        multiplechoice: [
            "Hyper text markup langauge", 
            "Hyperlinks and text markup language",
            "Home tool markup"
        ],
        answer: "Home tool markup"
       },
    {
        question:"Inside which HTML element do we put the Javascript code",
        multiplechoice: [
            "Script", 
            "Javascript",
            "JS"
        ],
        answer: "Script"
       },
       {
        question:"Can you reassign a const variable",
        multiplechoice: [
            "Yes", 
            "No",
        ],
        answer: "No"
       }
   

];

let question = 0;
let userAnswer;
let currentQuestion = document.getElementById("question");
let startButton = document.getElementById('start-button');
let multiplechoice = document.getElementById("multipleChoices");
let choice = document.getElementsByClassName("choice");




startButton.addEventListener('click' , () => { 
    let interval = setInterval(updateCountdown, 1000);
    let list = ""

    currentQuestion.innerHTML = quizData[question].question;

    for(let i = 0; i < quizData[question].multiplechoice.length; i++){
        list += `<li class="choice">${quizData[question].multiplechoice[i]} </li>`
    }

    multiplechoice.innerHTML = list;

    for(let i = 0 ; i < choice.length ; i++){
        choice[i].addEventListener('click', () => {
            userAnswer = choice[i].innerText;
            console.log(`Your answer: ${userAnswer}`)
            console.log(`The correct answer is: ${quizData[question - 1].answer}`)
            console.log(`The answer is: ${userAnswer == quizData[question - 1].answer}`)
        })
    }

    question++;
    clearInterval(interval);


});

