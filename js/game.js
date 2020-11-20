
//* ASSIGNING ELEMENTS TO VARIABLES 
const question = document.getElementById('question');
const ordinal = document.getElementById('ordinal');
const pictureQuestion = document.getElementById('pictureQuestion')
const choices = Array.from(document.getElementsByClassName('answerOption'));
const quizContainer = document.getElementById('quizContainer');
const checkAnswer = document.getElementById('checkAnswer');
const scoreText = document.getElementById('score');
const emoji = document.getElementById('emoji');


// * VARIABLES
let questionCounter = 0;
let score = 0;
let availableQuestions = [];
let currentQuestion = {};
let acceptingAnswers = false;
let goToResultFlag = false;
let startTime = new Date();  // *   global variable to calculate the points based in the time the user takes to click the option button,
                             // *   I declare it globaly as it has to be accessed for more the one functions.


// * CONSTANTS
const AMOUNT_QUESTIONS_QUIZ = 10;
const AMOUNT_QUESTIONS_COLLECTION = 50;


// * return an array with an amount(numberOfQuestion) of different random numbers from 0 to totalQuestions.
function codeNumberQuestionArray(numberOfQuestions, totalQuestions){
  let array = [];
  while(array.length < numberOfQuestions){
     let randomNumber = Math.floor(Math.random() * totalQuestions);
     if(!array.includes(randomNumber)){array.push(randomNumber)}
  }

  return array;
}

let dbQuestions = [];

// * Retrieve n number of random questions from the total document questions in a Firebase collection called 'questions'.
document.addEventListener("DOMContentLoaded", event => {

  const app = firebase.app();

  const db = firebase.firestore();

  let array  = codeNumberQuestionArray(AMOUNT_QUESTIONS_QUIZ, AMOUNT_QUESTIONS_COLLECTION);

  array.forEach( element => {
      db.collection("questions").where("CodeNumber", "==", element)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              dbQuestions.push(doc.data());
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  });

});



// ! STARTGAME FUNCTION
startGame = () => {
  clearInterval(nIntervId);       // * this stops the setInterval that start the game
  questionCounter = 0;
  score = 0;
  availableQuestions = [...dbQuestions];
  getNewQuestion();
  quizContainer.classList.remove("d-none");
};

// ! GETNEWQUESTION FUNCTION
getNewQuestion = () => {

  if(availableQuestions.length === 0 || questionCounter >= AMOUNT_QUESTIONS_QUIZ){	
    localStorage.setItem('totalPoints', score);
    goToResultFlag = true;	
    //* go to the end page	
    setTimeout(() => {window.location.assign("/results.html")}, 2000);	
  } else {
    startTime = new Date();
    questionCounter++;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    // * Get the picture from firebase storage project LondonQuiz and set up the pictureQuestion src attr to the url reference.

    let storage = firebase.storage();

    let gsReference = storage.refFromURL(`gs://londonquiz-f8499.appspot.com/${currentQuestion['pic']}`);

    gsReference.getDownloadURL()
    .then(function(url) {pictureQuestion.setAttribute('style', `background-image: url('${url}'`);})
    .catch(function(error) {
    });

    // * ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    question.innerHTML = `<span id="ordinal">${questionCounter}/${AMOUNT_QUESTIONS_QUIZ}</span> &nbsp${currentQuestion.question}`;
    
    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["option" + number];  
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
    }
}

// * CALCULATESCORE FUNCTION subtracs the time that user takes to answers the question to 10000 ms if the answer is correct.
// * if the time passes over 10000 ms the number of points will be set up to 100.
function calculateScore(){
  const timeTakes = (new Date() - startTime);
  return  (timeTakes > 10000) ? 100 : 10000 - timeTakes;
}

//! EVENT LISTENER ATTACH TO CHOICE (ARRAY OF OPTIONS)
choices.forEach(choice => {
  choice.addEventListener("click", e => {
      if(!acceptingAnswers) return;
      acceptingAnswers = false;
      const selectedOption = e.target.innerText;
      if(selectedOption == currentQuestion.correct){
        score += calculateScore();
        checkAnswer.classList.remove('wrong');
        checkAnswer.classList.add('correct');
        emoji.innerText = '💂'; 
      } else {
        checkAnswer.classList.remove('correct');
        checkAnswer.classList.add('wrong');
        emoji.innerText =  '💩';
      }
      scoreText.innerText = `${score} points`; 
      checkAnswer.classList.remove('hidden'); 
      quizContainer.classList.add('hidden'); 
      getNewQuestion();
      
      setTimeout(() => {
        if(!goToResultFlag){
          checkAnswer.classList.add('hidden'); 
          quizContainer.classList.remove('hidden');
        }
      }
        , 2000);
  });
});





  //* check if dbQuestions has been fully populated every 500ms. When it has been fully populated it launchs startGame(). 
  let nIntervId = setInterval(() => {
    if(dbQuestions.length === AMOUNT_QUESTIONS_QUIZ){startGame()}
  },
  500);