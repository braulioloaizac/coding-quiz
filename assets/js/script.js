var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    answer: "all of the above"
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log"
  }
];

var counter = document.querySelector("#counter");
var highscores = document.querySelector("#high-scores")
var questionsection = document.querySelector("#question-section")
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var button = document.querySelector("#button1");
var submit = document.querySelector("#submit")
var body = document.body;
var header = document.querySelector("#welcome-text");
var correctasanswers = document.querySelector("#correct-answers");

var questionIndex = 0;
var correctCount = 0;
var time = 60;
var intervalID;

function welcomeScreen(){
  
  header.setAttribute("class","hide");
  button.setAttribute("class","hide");
  renderQuestion();
}

function renderQuestion() {
  
  if(time == 0){
    updateTime();
    return;
  }


  intervalID = setInterval(updateTime,1000);

    //Selects the question
    questionEl.textContent = questions[questionIndex].title;
    //Creates an empty string into the HTML
    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    //Choices
    choices = questions[questionIndex].choices;
  
    //forEach loops over the object
    choices.forEach(choice => {
      var questionChoices = document.createElement("li");
      questionChoices.textContent = choice;
      optionListEl.appendChild(questionChoices);
    });
  
  
}

function updateTime() {

  time--;
  timerEl.textContent = time;
  if(time <= 0){
    endQuiz();
  }
}

function nextQuestion(){
  questionIndex++;
  if(questionIndex < questions.length){
    renderQuestion();
  }
  
  else{
    time = 0;
    endQuiz();
  }

}

function checkAnswer(event){
  if(event.target.matches("li")){

    clearInterval(intervalID);

    if(event.target.textContent === questions[questionIndex].answer){
      correctCount++;
      questionResultEl.textContent = "Correct";
    }

    else{
      questionResultEl.textContent = "Incorrect";
      time = time - 10;
      timerEl.textContent = time;
    }

    setTimeout(nextQuestion, 2000);
  }
}


function endQuiz() {
  clearInterval(intervalID);
  
  counter.setAttribute("class", "hide");
  highscores.setAttribute("class", "hide");
  questionEl.setAttribute("class", "hide");
  optionListEl.setAttribute("class", "hide");
  questionResultEl.setAttribute("class", "hide");

  var endscreen = document.getElementById("endgame");
  endscreen.classList.remove("hide");
  correctasanswers.textContent = correctCount;
}


function saveScore(){

  var name = document.getElementById("name").value;
  //Gets the highscores from the localStorage and transforms them to an array
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  //Check if the name isn't empty
  if(name != ""){
    //Creates an array with the initials and the score
    var score = {name, correctCount};
    //adds the new score to the previously scores
    highscores.push(score);
    //Adds the new "list" to the local storage
    localStorage.setItem("highscores",JSON.stringify(highscores));
    
  }
  
}

// localStorage.clear()

button.addEventListener("click", welcomeScreen);
optionListEl.addEventListener("click", checkAnswer);
submit.addEventListener("click", saveScore);