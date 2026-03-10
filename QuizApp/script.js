
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
const timerElement=document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft=10;
let timer;

function StartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next"; //until here when ever we call the this fuction everything will be reset to 0
  showQuestion();
  // console.log(answerButton.children)
}

function showQuestion() {
  resetState();
  startTimer();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    //adding event listener for clicking button
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  //here the event is directly passed from the browser from the add event listener
  clearInterval(timer);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButton.children).forEach(button=>{
    if(button.dataset.correct==='true'){
      button.classList.add("correct");
    }
    button.disabled=true;
  });
  nextButton.style.display='block';

}

//function to score

function showScore(){
  resetState();
  questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML="Play Again"
  nextButton.style.display='block';
}

//function for handling the next button
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

//function for nextbutton

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex<questions.length){
    handleNextButton();
  }else{
    StartQuiz();
  }
})

function startTimer(){
  timeLeft=10;
  timerElement.innerHTML="Time: "+timeLeft+"s";

  timer=setInterval(()=>{
    timeLeft--;
    timerElement.innerHTML="Time: "+timeLeft;

    if(timeLeft==0){
      clearInterval(timer);

      //reveal the correct answer and disable button
      Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==='true'){
          button.classList.add('correct');
        }
        button.disabled=true;
      });

      nextButton.style.display='block';
    }
  },1000)
}
StartQuiz();
