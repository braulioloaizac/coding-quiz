//Object with the questions
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

//Global variables and selectors
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

//First screen when code starts and when the button is clicked
//it hides the header and the button
function welcomeScreen(){
  
  header.setAttribute("class","hide");
  button.setAttribute("class","hide");
  //callback to renderQuestion
  renderQuestion();
}

function renderQuestion() {
  //Checks when the time is 0 and if the statement is true finishes the function
  if(time == 0){
    updateTime();
    return;
  }

  //Set the execution of the updateTime function every 1000 miliseconds
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
  //Every 1000ms the time counter substracts 1 to the actual counter
  // and prints it
  time--;
  timerEl.textContent = time;
  //Finishes the quiz when the time is 0
  if(time <= 0){
    endQuiz();
  }
}

//Increase the questions counter to render all the questions
function nextQuestion(){
  questionIndex++;
  //Checks the length of the questions object to prevent an error
  if(questionIndex < questions.length){
    renderQuestion();
  }
  
  else{
    time = 0;
    endQuiz();
  }

}

//Event delegation
//When the user clicks on a generated "li" the function checks if 
//the clicked element corresponds to the answer of the actual question
function checkAnswer(event){
  //Checks if the clicked element is a "li"
  if(event.target.matches("li")){
    //Pauses the timer
    clearInterval(intervalID);

    //Checks if the element clicked corresponds to the answer of that question
    if(event.target.textContent === questions[questionIndex].answer){
      correctCount++;
      //Displays the correct text as feedback
      questionResultEl.textContent = "Correct";
      questionResultEl.style.backgroundColor = "green";
    }

    else{
      questionResultEl.textContent = "Incorrect";
      questionResultEl.style.backgroundColor = "red";
      //If the user answers a question wrong it substracts 10 seconds of the time
      time = time - 10;
      timerEl.textContent = time;
    }
    //2 Seconds delay between each question
    setTimeout(nextQuestion, 2000);
  }
}


function endQuiz() {

  clearInterval(intervalID);
  //Hides the previously layout 
  counter.setAttribute("class", "hide");
  highscores.setAttribute("class", "hide");
  questionEl.setAttribute("class", "hide");
  optionListEl.setAttribute("class", "hide");
  questionResultEl.setAttribute("class", "hide");

  //Shows the endgame screen
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

    window.location.href = "highscores.html";
    
  }
  
}

//Events that works as functions callbacks
button.addEventListener("click", welcomeScreen);
optionListEl.addEventListener("click", checkAnswer);
submit.addEventListener("click", saveScore);