var questionsList = [
    {
        question: "question 1",
        answerOptions: ["1.", "2.", "3.", "4."],
        answer: "3"
    },
    {
        question: "question 2",
        answerOptions: ["1.", "2.", "3.", "4."],
        answer: "3"
    },
    {
        question: "question 3",
        answerOptions: ["1.", "2.", "3.", "4."],
        answer: "3"
    },
    {
        question: "question 4",
        answerOptions: ["1.", "2.", "3.", "4."],
        answer: "3"
    }
]

var questionIndex = 0;
var score = 0;
var time = 100;
var startButton = document.getElementById("start-button");
var timerInt;
var timeEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var answerContainer = document.querySelector("#options");
var initialsInput = document.querySelector("#initials");

function start(){
    timer();
    displayQuestion();

}

function timer(){
    timerInt = setInterval(function(){
        time --;
        timeEl.textContent = time;
        if(time <= 0){
            clearInterval(timerInt);
            endQuiz();
        }
    },1000)
}

function displayQuestion(){
    answerContainer.innerHTML = "";
    var currentQuestion = questionsList[questionIndex];
    questionEl.textContent = currentQuestion.question;
    var answerChoices = currentQuestion.answerOptions;
    for(var i = 0;i < answerChoices.length; i++){
        var answerEl = document.createElement("li");
        answerEl.textContent = answerChoices[i];
        answerContainer.appendChild(answerEl);
    }
}
answerContainer.addEventListener("click",function(e){
    e.preventDefault();
    const element = e.target;
    if(element.matches("li")){
        checkAnswer(element.textContent);
    }
})

function checkAnswer(element){
    var correctAnswer = questionsList[questionIndex].answer;
    if(element === correctAnswer){
        score++;
    }
    else{
        score--;
        time-=5;
    }
    
    questionIndex++;
    if(questionsList.length > questionIndex){
        displayQuestion();
    }
    else{
        endQuiz();
    }
}

function endQuiz(){
    console.log("end");
}

function saveScore(){
    var initials = initialsInput.value.trim();
    var storedScores = JSON.parse(localStorage.getItem("storedScores")) || [];
    var newScore = {
        initials:initials,
        score:score,
    }
    storedScores.push(newScore);
    localStorage.setItem("storedScores", JSON.stringify(storedScores));
}

startButton.addEventListener("click",start);

