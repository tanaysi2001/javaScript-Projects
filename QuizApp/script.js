const questions = [
  {
    question: "Which is the largest Animal in the world? ",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },

  {
    question: "Which is the smallest country in the world? ",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanka", correct: false },
    ],
  },

  {
    question: "Which is the largest Dessert in the world? ",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Antartica", correct: true },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
    ],
  },

  {
    question: "Which is the smallest continent in the world? ",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answerButtons");
const nextButton = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML="Next";//until here when ever we call the this fuction everything will be reset to 0
  showQuestion();
}
