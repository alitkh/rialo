const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const quizContainer = document.querySelector('.quiz-container');
const scoreContainer = document.getElementById('score-container');
const scoreText = document.getElementById('score-text');
const restartButton = document.getElementById('restart-btn');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

// Updated questions about the Rialo.io blockchain project
const questions = [
    {
        question: "What type of project is Rialo.io?",
        answers: [
            { text: "A social media platform", correct: false },
            { text: "A Layer-1 Blockchain", correct: true },
            { text: "A cryptocurrency exchange", correct: false },
            { text: "A portfolio builder website", correct: false }
        ]
    },
    {
        question: "What is the main goal of the Rialo.io blockchain?",
        answers: [
            { text: "To create digital art (NFTs)", correct: false },
            { text: "To trade stocks", correct: false },
            { text: "To connect dApps with real-world data and systems", correct: true },
            { text: "To be a faster version of Bitcoin", correct: false }
        ]
    },
    {
        question: "Rialo.io is often described as 'The _______ Blockchain'.",
        answers: [
            { text: "Real-world", correct: true },
            { text: "Gaming", correct: false },
            { text: "Private", correct: false },
            { text: "Financial", correct: false }
        ]
    },
    {
        question: "Which lab is responsible for developing the Rialo.io project?",
        answers: [
            { text: "Google AI", correct: false },
            { text: "Solana Labs", correct: false },
            { text: "Ethereum Foundation", correct: false },
            { text: "Subzero Labs", correct: true }
        ]
    },
    {
        question: "Rialo.io aims to make the Web3 development experience as easy as which of the following?",
        answers: [
            { text: "Web1", correct: false },
            { text: "Web2 (Traditional Web)", correct: true },
            { text: "Game Development", correct: false },
            { text: "Mobile App Development", correct: false }
        ]
    },
    {
        question: "Which virtual machine (VM) is Rialo.io compatible with, making it easier for developers to migrate programs?",
        answers: [
            { text: "Ethereum Virtual Machine (EVM)", correct: false },
            { text: "Java Virtual Machine (JVM)", correct: false },
            { text: "Solana VM", correct: true },
            { text: "WASM (WebAssembly)", correct: false }
        ]
    },
    {
        question: "What does 'Layer-1' mean in the context of a blockchain like Rialo.io?",
        answers: [
            { text: "It's an application built on another blockchain", correct: false },
            { text: "It's the fundamental, base blockchain protocol", correct: true },
            { text: "It's a secondary, faster network", correct: false },
            { text: "It's a user interface for a blockchain", correct: false }
        ]
    },
    {
        question: "What are applications built on a blockchain like Rialo.io called?",
        answers: [
            { text: "Websites", correct: false },
            { text: "Software", correct: false },
            { text: "dApps (decentralized applications)", correct: true },
            { text: "Platforms", correct: false }
        ]
    },
    {
        question: "The architecture of Rialo.io is primarily built for what purpose?",
        answers: [
            { text: "Data storage only", correct: false },
            { text: "Scalability, speed, and ease of use for developers", correct: true },
            { text: "Anonymous transactions", correct: false },
            { text: "Running artificial intelligence models", correct: false }
        ]
    },
    {
        question: "What is a key feature of Rialo.io regarding real-world interaction?",
        answers: [
            { text: "It uses real-world currency directly", correct: false },
            { text: "It has a built-in identity verification system", correct: false },
            { text: "It can interact with real-world systems natively from its protocol", correct: true },
            { text: "It partners with physical stores", correct: false }
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