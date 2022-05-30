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


var questionsection = document.querySelector("#question-section")
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var button = document.querySelector("#button");
var body = document.body;
var header = document.querySelector("#welcome-text");

var questionIndex = 0;
var correctCount = 0;
var time = 20;
var intervalID;

function welcomeScreen(){
  
  header.remove();
  button.remove();
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
  timerEl.textContent = time;
  time--;
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
      time = time - 2 ;
    }

    setTimeout(nextQuestion, 2000);

  }
}


function endQuiz() {
  clearInterval(intervalID);
  body.innerHTML = "Game over, Your score is " + correctCount;
}

button.addEventListener("click", welcomeScreen);
optionListEl.addEventListener("click", checkAnswer);