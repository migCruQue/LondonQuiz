
//* ASSIGNING ELEMENTS TO VARIABLES 
const question = document.getElementById('question');
const ordinal = document.getElementById('ordinal');
const pictureQuestion = document.getElementById('pictureQuestion')
const choices = Array.from(document.getElementsByClassName('answerOption'));
const quizContainer = document.getElementById('quizContainer');
const checkAnswer = document.getElementById('checkAnswer');
const scoreText = document.getElementById('score');
const emoji = document.getElementById('emoji');

//* JQUERY VARIABLES
const $quizContainer = $('#quizContainer');
const $checkAnswer = $('#checkAnswer');

// * VARIABLES
let questionCounter = 0;
let score = 0;
let availableQuestions = [];
let currentQuestion = {};
let acceptingAnswers = false;
let startTime = new Date();  // *   global variable to calculate the points based in the time the user takes to click the option button,
                             // *   I declare it globaly as it has to be accessed for more the one functions.


// * CONSTANTS
const MAX_QUESTIONS = 10;

// * STARTGAME FUNCTION
startGame = () => {
  questionCounter = 0;
  score = 0;
availableQuestions = [...myQuestions];
  getNewQuestion();
  $quizContainer.removeClass('d-none');
};

// * GETNEWQUESTION FUNCTION
getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
      localStorage.setItem('totalPoints', score);
      //* go to the end page
      return window.location.assign("/results.html")
  }
  startTime = new Date();
  questionCounter++;
  // Update the progress bar
  // progressBarFull.style.width = `${(questionCounter/ MAX_QUESTIONS) * 100}%`;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = `<span id="ordinal">${questionCounter}/${MAX_QUESTIONS}</span> &nbsp${currentQuestion.question}`;
  pictureQuestion.setAttribute('style', `background-image: url('${currentQuestion.picLap}'`);
  choices.forEach( choice => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion["option" + number];  
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
}

//* EVENT LISTENER ATTACH TO CHOICE (ARRAY OF OPTIONS)
choices.forEach(choice => {
  choice.addEventListener("click", e => {
      if(!acceptingAnswers) return;
      acceptingAnswers = false;
      const selectedOption = e.target.innerText;
      if(selectedOption == currentQuestion.correct){
        score += calculateScore();
        $checkAnswer.removeClass('wrong').addClass('correct');
        emoji.innerText = '💂'; 
      } else {
        $checkAnswer.removeClass('correct').addClass('wrong'); 
        emoji.innerText =  '💩';
      }
      scoreText.innerText = `${score} points`; 
      $checkAnswer.removeClass('hidden'); 
      $quizContainer.addClass('hidden');   

      setTimeout(() => {
        getNewQuestion();
        $checkAnswer.addClass('hidden'); 
        $quizContainer.removeClass('hidden');  
      }, 2000);
  });
});


// * CALCULATESCORE FUNCTION subtracs the time that user takes to answers the question to 10000 ms if the answer is correct.
// * if the time passes over 10000 ms the number of points will be set up to 100.
function calculateScore(){
    const timeTakes = (new Date() - startTime);
    return  (timeTakes > 10000) ? 100 : 10000 - timeTakes;
}

startGame();