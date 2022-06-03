
var button = document.querySelector("#btn-clear");
var scoreList = document.querySelector("#scores");


function highScores(){
  //Get the data from localstorage and transforms it to an object
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    
  console.log(highscores[0].name);

     for(var i = 0; i < highscores.length; i++){
      //Prints all the scores from highscores
      var scoreName = document.createElement("li");
      scoreName.textContent = highscores[i].name + " " + highscores[i].correctCount;
      //Add a class to the element for styling purposes
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
  
  