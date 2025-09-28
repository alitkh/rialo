const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const quizContainer = document.querySelector('.quiz-container');
const scoreContainer = document.getElementById('score-container');
const scoreText = document.getElementById('score-text');
const restartButton = document.getElementById('restart-btn');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

const questions = [
    {
        question: "What is the primary purpose of Rialo.io?",
        answers: [
            { text: "A social media platform", correct: false },
            { text: "An online portfolio and resume builder", correct: true },
            { text: "A video streaming service", correct: false },
            { text: "An e-commerce marketplace", correct: false }
        ]
    },
    {
        question: "Which feature allows you to showcase your professional experience on Rialo.io?",
        answers: [
            { text: "Blog", correct: false },
            { text: "Gallery", correct: false },
            { text: "Timeline", correct: true },
            { text: "Shop", correct: false }
        ]
    },
    {
        question: "Rialo.io helps users create a professional _______ to share with recruiters.",
        answers: [
            { text: "online presence", correct: true },
            { text: "music album", correct: false },
            { text: "cooking recipe", correct: false },
            { text: "video game", correct: false }
        ]
    },
    {
        question: "Can you add your skills to your Rialo.io profile?",
        answers: [
            { text: "No, it's not supported", correct: false },
            { text: "Only five skills are allowed", correct: false },
            { text: "Yes, in a dedicated 'Skills' section", correct: true },
            { text: "Only if you have a premium account", correct: false }
        ]
    },
    {
        question: "What kind of media can you typically add to a Rialo.io portfolio?",
        answers: [
            { text: "Only text", correct: false },
            { text: "Images, videos, and documents", correct: true },
            { text: "Only audio files", correct: false },
            { text: "Only 3D models", correct: false }
        ]
    },
    {
        question: "The 'Timeline' feature on Rialo.io is best used for showcasing what?",
        answers: [
            { text: "Your favorite movies", correct: false },
            { text: "Your daily schedule", correct: false },
            { text: "Your education and work history", correct: true },
            { text: "Your vacation photos", correct: false }
        ]
    },
    {
        question: "Is Rialo.io designed for a specific profession?",
        answers: [
            { text: "Yes, only for software developers", correct: false },
            { text: "Yes, only for graphic designers", correct: false },
            { text: "No, it's versatile for many professions", correct: true },
            { text: "Yes, only for writers", correct: false }
        ]
    },
    {
        question: "What is a key benefit of having an online portfolio like one from Rialo.io?",
        answers: [
            { text: "It replaces the need for a LinkedIn profile", correct: false },
            { text: "It provides a dynamic and visual way to showcase your work", correct: true },
            { text: "It automatically finds a job for you", correct: false },
            { text: "It guarantees a higher salary", correct: false }
        ]
    },
    {
        question: "Rialo.io aims to make resume and portfolio building...",
        answers: [
            { text: "Complicated and technical", correct: false },
            { text: "Exclusive for experts", correct: false },
            { text: "Simple, fast, and elegant", correct: true },
            { text: "Expensive and time-consuming", correct: false }
        ]
    },
    {
        question: "Can you customize the look of your Rialo.io profile?",
        answers: [
            { text: "No, all profiles look identical", correct: false },
            { text: "Yes, with various themes and layout options", correct: true },
            { text: "Only the font color can be changed", correct: false },
            { text: "Customization is a paid feature only", correct: false }
        ]
    }
];

function startQuiz() {
    score = 0;
    scoreContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    nextButton.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true; // Disable all buttons after an answer is chosen
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showScore();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function showScore() {
    quizContainer.classList.add('hide');
    nextButton.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreText.innerText = `You scored ${score} out of ${questions.length}!`;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

restartButton.addEventListener('click', startQuiz);

// Start the quiz when the page loads
startQuiz();