
var button = document.querySelector("#btn-clear");
var scoreList = document.querySelector("#scores");


function highScores(){
  
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    
  console.log(highscores[0].name);

     for(var i = 0; i < highscores.length; i++){
      
      var scoreName = document.createElement("li");
      scoreName.textContent = highscores[i].name + " " + highscores[i].correctCount;
      scoreName.classList.add("lialt")
      scoreList.appendChild(scoreName);
      
     }

  }
  
highScores();
  

function clearAll(){
  localStorage.clear();
  location.reload();
}  

button.addEventListener("click",clearAll);
  
  