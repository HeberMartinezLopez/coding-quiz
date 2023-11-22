const startBtn = document.getElementById('startBtn');
const submitBtn = document.getElementById('submitBtn');
const quiz = document.getElementById('quiz');
const timer = document.getElementById('timer');
const questions = document.getElementById('questions');
const options = document.getElementById('options');
const notifications = document.getElementById('notification');
const end = document.getElementById('end');
const input = document.getElementById('input');
const form = document.getElementById('input-form');
const scoreboard = document.getElementById('score');
const pic = document.getElementById('pic');
const sign = document.getElementById('sign');
const highscore = document.getElementById('highscores');

const questionsList = [
    {
        question: "What is the purpose of the addEventListener method in JavaScript?",
        options: [
            "A. To create a new HTML element.", 
            "B. To remove an event listener.", 
            "C. To attach a function to be executed when an event occurs.", 
            "D. To modify the CSS styles of an element."
        ],
        answer: "C. To attach a function to be executed when an event occurs."
    },
    {
        question: "What does HTML stand for?",
        options: [
            "A. Hyperlink and Text Markup Language",
            "B. Hypertext Markup Language",
            "C. High-Level Textual Markup Language",
            "D. Home Tool Markup Language"
        ],
        answer: "B. Hypertext Markup Language"
    },
    {
        question: "How can you select all paragraphs within a <div> with the class 'content' using CSS?",
        options: [
            "A. .content p",
            "B. div.p",
            "C. div + p",
            "D. p.content",
        ],
        answer: "A. .content p"
    },
    {
        question: "In Markdown, how do you create a level 2 heading?",
        options: [
            "A. # Heading 2",
            "B. -- Heading 2 --",
            "C. === Heading 2 ===",
            "D. ## Heading 2"
        ],
        answer: "D. ## Heading 2"
    }
]

let highScore = 0;
let score = 0;
let questionIndex = 0;
let time = 100;
let note;

const init = () => {
    window.timerInterval = setInterval(() => {
        timer.textContent = time;
        time--;
        if (time <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
};

const beginQuiz = () => {
    quiz.classList.remove('hide');
    init();
    display();
};

const display = () => {
    questions.textContent = questionsList[questionIndex].question;

    let userAnswer = questionsList[questionIndex].options;
    let answerList = '';
    for(var i = 0; i < userAnswer.length; i++){
        answerList += `
        <li>${userAnswer[i]}</li>
        `;
        options.innerHTML = answerList;
    }
};

const checkAns = (element) => {
    const correctAns = questionsList[questionIndex].answer;

    if(element === correctAns){
        clearTimeout(note);
        score++;
        note = setTimeout(() => {
            notifications.textContent = 'Correct! ✅'
        }, 1000);
    } else{
        clearTimeout(note);
        score--;
        time -= 10;
        note = setTimeout(() => {
            notifications.textContent = 'Incorrect! ❌'
        })
    }

    questionIndex++;

    if (questionsList.length > questionIndex) {
        display();
    } else {
        clearInterval(window.timerInterval);
        endQuiz();
    }
};

const endQuiz = () => {
    end.classList.remove('hide');
    quiz.classList.add('hide');
};

const storeScore = (event) => {
    event.preventDefault();
    const initials = input.value.trim();
    let scores = JSON.parse(localStorage.getItem('scores')) || [];

    let newScore = {
        initials: initials,
        score: score
    };

    scores.push(newScore);

    localStorage.setItem('scores', JSON.stringify(scores));
    highscore.classList.remove('hide');
    pic.classList.remove('hide');
    input.value = '';
};

const showScore = (event) => {
    event.preventDefault();
    scoreboard.classList.remove('hide');
    
    let showAllScores = JSON.parse(localStorage.getItem('scores')) || [];
    let listScores = '';
    for(var i = 0; i < showAllScores.length; i++){
        listScores += `
        <li>${showAllScores[i].initials} : ${showAllScores[i].score}</li>
        `;
        scoreboard.innerHTML = listScores;
    }
};

pic.addEventListener('mouseover', showScore);
submitBtn.addEventListener('click', storeScore);
startBtn.addEventListener('click', beginQuiz)
options.addEventListener('click', (event) => {
    event.preventDefault();

    if (event.target.matches('li')) {
        checkAns(event.target.textContent);
    }
});

