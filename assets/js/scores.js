
var button = document.querySelector("#btn-clear");
var scoreList = document.querySelector("#scores");
var scoreName = document.createElement("li");

function highScores(){
  
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    

    for(var i = 0; i < highscores.length; i++){
      
      scoreName.textContent = highscores[i].name + " " + highscores[i].correctCount;
      scoreList.appendChild(scoreName);
      
    }

  }
  
highScores();
  

function clearAll(){
  localStorage.clear();
  location.reload();
}  

button.addEventListener("click",clearAll);
  
  