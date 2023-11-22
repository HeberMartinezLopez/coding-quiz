const startBtn = document.getElementById('startBtn');
const submitBtn = document.getElementById('submitBtn');
const quiz = document.getElementById('quiz');
const timer = document.getElementById('timer');
const questions = document.getElementById('questions');
const answers = document.getElementById('options');
const notifications = document.getElementById('notification');
const end = document.getElementById('end');
const input = document.getElementById('input');
const scoreboard = document.getElementById('score');
const pic = document.getElementById('pic');
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
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "A. <link>",
            "B. <a>",
            "C. <url>",
            "D. <href>"
        ],
        answer: "B. <a>"
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
