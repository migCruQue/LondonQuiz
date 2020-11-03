

// * Retrieve n number of random questions from the total document questions in a Firebase collection called 'questions'

function codeNumberQuestionArray(numberOfQuestions, totalQuestions){
  let array = [];
  while(array.length < numberOfQuestions){
     let randomNumber = Math.floor(Math.random() * totalQuestions);
     if(!array.includes(randomNumber)){array.push(randomNumber)}
  }

  return array;
}

let dbQuestions = [];

document.addEventListener("DOMContentLoaded", event => {

  const app = firebase.app();

  const db = firebase.firestore();

  let array  = codeNumberQuestionArray(10, 50);
  console.log(array);
  array.forEach( element => {
      db.collection("questions").where("CodeNumber", "==", element)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data().question);
              dbQuestions.push(doc.data());
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  });

  console.log(dbQuestions);

});

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
  availableQuestions = [...dbQuestions];
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
  
  // * Get the picture from firebase storage project LondonQuiz and set up the pictureQuestion src attr to the url reference.

  var storage = firebase.storage();

  var gsReference = storage.refFromURL(`gs://londonquiz-f8499.appspot.com/${currentQuestion['pic']}`);

  gsReference.getDownloadURL()
  .then(function(url) {pictureQuestion.setAttribute('style', `background-image: url('${url}'`);})
  .catch(function(error) {
    // Handle any errors
  });

  // * ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
setTimeout(() => {
  startGame();
}, 1000);
