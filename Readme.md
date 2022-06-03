# Coding Quiz

For this project the main objective is the creation of a coding quiz game in wich a series of questions are going to be pressented to the user and he has to answer correctly, we have to keep in mind that he has also limited time (60 seconds) and everytime he answers wrong, time will be substracted, 10 seconds to be specific, the game will ends when the user aswers all the questions or when he has no time left, after that he has the oportunity to submit his score, he can also consult the highscores page everytime he wants

## Behind the Scenes

To solve this, we used HTML, CSS and Javascript, first the index.html has a welcome screen that tells the user what the game consist of, and when he clicks the button the function welcomeScreen() is executed, the main purpose of the section is change the screen and prepare it for the questions, to do that we hide all the actual elements using the class hide, that sets a display:none in CSS to the elements, after that the timer countdown begins and the function renderQuestion is executed, this function has the purpose of render all the questions using a predefined object with the questions, the possible choices and the answer, after that the program waits until the user clicks in one choice and the choice is evaluated through the checkAnswer() function that compares the actual choice (using event delegation) with the one defined in the object (answer variable), if it's correct the correct answers counter will be increased by one and if isn't correct ten seconds will be substracted from the timer variable, after that the program waits two seconds and the renderQuestion() function is executed again with the next question (using nextQuestion() function), after the user answers all the questions or the timer reaches 0, the function endQuiz() is excecuted and the screen shows the score and the possibility to put the initials of the user and save it to the localStorage through the function saveScore().

For the highscores page it uses the file scores.js as script to print all the saved scores, for that it access the localStorage and gets the information through the highscores variable, after that all the scores are generated dynamically, the user has the option of cleanning all the scores using the clear scores button too.

Here's a little snapshot of the welcome screen

![alt text](./snapshot.png "snapshot")