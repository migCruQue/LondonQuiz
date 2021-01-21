
//* SET THE BODY HEIGHT TO THE Window.HEIGHT
// const body = document.querySelector('body');
// body.style.height = `${window.innerHeight}px`;

//* START DIV ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$('#startBTN').on('click', function() {          // * jQuery Event handler to the Start button to start the game
    $('#startDiv').addClass('hidden');
    $('#quizContainer').removeClass('hidden');
  });

//* START DIV ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ! MAIN FUNCTIONAL GAME || DIV QUIZCONTAINER & DIV CHECKANSWER ////////////////////////////////////////////////////////////////
//* Assigning HTML element to variables 
const $question = $('#question');                                                  //*  jQuery variable
const $imgQuestion = $('#imgQuestion');                                            //*  jQuery variable
const $choices = $('.answerOption');                                               //*  jQuery variable
const $quizContainer = $('#quizContainer');                                        //*  jQuery variable
const $queenDiv = $('#queenDiv');                                                  //*  jQuery variable
const $checkAnswer = $('#checkAnswer');                                            //*  jQuery variable
const scoreText = document.getElementById('score');
const emoji = document.getElementById('emoji');



// * variables
let questionCounter = 0;
let score = 0;
let totalPoints = 0;
let availableQuestions = [];
let currentQuestion = {};
let lastQuestionFlag = false;
let acceptingAnswers = false;

// * global variable to calculate the points based in the time the user takes to click the option button,
// *   I declare it globaly as it has to be accessed for more the one functions.
let startTime = new Date();  

//* global variable to store the question from the Firebase database (it remains immutable).
let dbQuestions = [];


// * constants
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
  questionCounter = 0;
  score = 0;
  availableQuestions = [...dbQuestions];
  getNewQuestion();
};

// ! GETNEWQUESTION FUNCTION
getNewQuestion = () => {

  if(availableQuestions.length === 0 || questionCounter >= AMOUNT_QUESTIONS_QUIZ){	
      lastQuestionFlag = true; 
      buildResultDiv();
  } else {
    questionCounter++;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    // * jQuery method to set up the html element div question and a span for the number of question inside it. 
    $question.html(`<span id="ordinal">${questionCounter}/${AMOUNT_QUESTIONS_QUIZ}</span> &nbsp${currentQuestion.question}`);
    
    $choices.each( function () {                             //* jQuery method each goes throught each .answerOption ($choices) element
      const number = this.dataset['number'];                 //* getting its data-number attr and with that gets the currentQuestion.
      $(this).text(currentQuestion["option" + number]);  
    });


    getImageQuestion(currentQuestion);

    availableQuestions.splice(questionIndex, 1);    
    acceptingAnswers = true;  
  }

}


//* function helper to retrieve the image from the firebase database and set the background-image inline css property.
function getImageQuestion (currentQuestion) {
  let storage = firebase.storage();

  let gsReference = storage.refFromURL(`gs://londonquiz-f8499.appspot.com/${currentQuestion['pic']}`);

  gsReference.getDownloadURL()
  .then(function(url) {$imgQuestion.attr('src', `${url}`).attr('alt', `${currentQuestion['pic']}`)})
  .catch(function(error) {console.log(`an error happened when trying to access the image => ${error}`)});
}

// * CALCULATESCORE FUNCTION subtracs the time that user takes to answers the question to 10000 ms if the answer is correct.
// * if the time passes over 10000 ms the number of points will be set up to 100.
function calculateScore(){
  const timeTakes = (new Date() - startTime);
  return  (timeTakes > 10000) ? 100 : 10000 - timeTakes;
}

//! EVENT LISTENER ATTACH TO CHOICE (ARRAY OF OPTIONS)
  $choices.on("click", e => {
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
      
      hideQuizdisplayCheck();
      
      getNewQuestion();

      setTimeout(() => { 
          if(!lastQuestionFlag){
            hideCheckdisplayQuiz();
            startTime = new Date();
          } else {
            hideCheckdisplayQueen();
            setTimeout(() => { window.location.reload()}, 8000); //* reload the web application to start
          }         
          
        } , 2000);

});


//* to hide the quizDiv and show the checkAnswer div using the HIDDEN class
function hideQuizdisplayCheck() {
  $checkAnswer.removeClass('hidden'); 
  $quizContainer.addClass('hidden'); 
}

//* to hide the checkAnswer and show the quizDiv div using the HIDDEN class
function hideCheckdisplayQuiz() {
  $quizContainer.removeClass('hidden'); 
  $checkAnswer.addClass('hidden'); 
}

//* to hide the checkAnswer and show the queenDiv div using the HIDDEN class
function hideCheckdisplayQueen() {
  $queenDiv.removeClass('hidden'); 
  $checkAnswer.addClass('hidden'); 
}

//* to hide the queenDiv and go back to the begginning showing the startDiv div using the HIDDEN class
function hideQueendisplayStart() {
  $queenDiv.addClass('hidden'); 
  startDiv.classList.remove('hidden'); 
}

// ! MAIN FUNCTIONAL GAME || DIV QUIZCONTAINER & DIV CHECKANSWER ////////////////////////////////////////////////////////////////

// * DISPLAY RESULTS DIV  ///////////////////////////////////////////////////////////////////////////////////////////////////////


//* object with the info needed to build result div
const myResults = [

  {queenPic: `img/queen pics/queen0.jpeg`,
   queenSays: `The Queen is horrified about your lack of knowledge, she considers you a mere peasant and won't even look at you!!`,
   picSrc: `img/awards pics/square/dunce.jpg`},

  {queenPic: `img/Queen pics/queen1.jpg`,
   queenSays: `The queen is very impressed, so she will name you Member of the Order of the British Empire (MBE)!!`,
   picSrc: `img/awards pics/square/mbe-medal.png`},

  {queenPic: `img/Queen pics/queen2.jpg`,
  queenSays: `The queen is in love with you, so she will name you Officer of the Order of the British Empire (OBE)!!`,
  picSrc: `img/awards pics/square/obe-medal.png`},

  {queenPic: `img/Queen pics/queen3.jpg`,
  queenSays: `The queen just adores you , so she will name you Commander of the Order of the British Empire (CBE)!!`,
  picSrc: `img/awards pics/square/cbe-medal.jpg`},


];


//* return a value depending on the totalPoint variable.
function calculateCategory(){   
    if (totalPoints >= 90000){return 3;}
      else if (totalPoints >= 60000){return 2;}
        else if (totalPoints >= 30000){return 1;}
        return 0;
  } 
  
// * build the result div
function buildResultDiv(){    
    $queenDiv.find('img#queen').attr('src', myResults[calculateCategory()].queenPic);
    
    // * get the totalPoints value passed to localStorage
    totalPoints = Number(score);
    
    $queenDiv.find('#finalScore').find('h1').text(`Total:${totalPoints} Pt`);
    $queenDiv.find('#finalScore').find('img#award').attr('src', myResults[calculateCategory()].picSrc);
    $queenDiv.find('#queenSentence').text(`${myResults[calculateCategory()].queenSays}`);
}


// * Start the game.
setTimeout(() => {startGame()}, 500);



