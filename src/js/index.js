


// ***************************************  buildResultDiv builds the final div **********************************************
import {buildResultDiv } from "./modules/divResultFunctionality";
// **  retrievingQuestion function fetch the firebase firestore questions databe, it retrieves a certain amount of questions **
// **  AMOUNT_QUESTIONS_QUIZ and storates in the dbQuestions variable  ********************* **********************************
import {retrievingQuestions, dbQuestions, AMOUNT_QUESTIONS_QUIZ} from "./modules/retrievingData";

// **  transition between tabs applying css property display: none and removing it respectively   *****************************
import {
  hideQuestionDiv_showCheckAnswerDiv, 
  hideCheckAnswerDiv_showQuestionDiv, 
  hideAnswerDiv_showResultsDiv } from "./modules/transitionsTabs";

  // import { checkAnswerFunctionality } from "./modules/checkAnswersFunctionality";






 
// ***************************************  DECLARING GLOBAL VARIABLES AND CONSTANTS  ***********************************************************

//*  jQuery constants (HTML elements)
const $question = $('#question');                                              
const $choices = $('.answerOption');                                              
const $questionDiv = $('#questionDiv');                                        
const $resultsDiv = $('#resultsDiv');                                                 
const $checkAnswerDiv = $('#checkAnswerDiv'); 
const $imgQuestion = $('#imgQuestion'); 

//* plain JS constants(HTML elements)
const scoreText = document.querySelector('#score p');
const emoji = document.getElementById('emoji');


// * INITIALING VARIABLE
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let currentQuestion = {};
let lastQuestionFlag = false;
let acceptingAnswers = false;

// * global variable to calculate the points based in the time the user takes to click the option button,
// *   I declare it globaly as it has to be accessed for more the one functions.
let startTime = new Date();  



// !(1) to launch the game setting up inline style ==> display: none to all the container tabs except #startDiv.

$('.container').not('#startDiv').css('display', 'none');

 // * jQuery Event handler to the Start button to start the game
$('#startBTN').on('click', function() {         
    $('#startDiv').css('display', 'none');
    $('#questionDiv').removeAttr('style');
  });




// * Retrieve n number of random questions from the total document questions in a Firebase collection called 'questions'.
document.addEventListener("DOMContentLoaded", retrievingQuestions());



// ! STARTGAME FUNCTION
// * I've turned it from an arrow function to a default function as it didn't work when I added type="module" to the index.js script in the embedded html  
function startGame(){
  availableQuestions = [...dbQuestions];
  getNewQuestion();
}

// ! GETNEWQUESTION FUNCTION
// * I've turned it from an arrow function to a default function as it didn't work when I added type="module" to the index.js script in the embedded html  
function getNewQuestion (){

  if(availableQuestions.length === 0 || questionCounter >= AMOUNT_QUESTIONS_QUIZ){	
      lastQuestionFlag = true;
      buildResultDiv($resultsDiv, score);
  } else {
    questionCounter++;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    // * jQuery method to set up the text inside dd ORDINAL element and h1 question. 
    $question.html(`<dd>${questionCounter}/${AMOUNT_QUESTIONS_QUIZ}</dd><h1>${currentQuestion.question}</h1>`);
    
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
        $checkAnswerDiv.removeClass('wrong').addClass('correct');
        emoji.innerText = '💂'; 
      } else {
        $checkAnswerDiv.removeClass('correct').addClass('wrong');
        emoji.innerText =  '💩';
      }
      scoreText.innerText = `${score}`; 
      // checkAnswerFunctionality(e);
       
      //* to hide questinDiv and show the checkAnswerDiv
      hideQuestionDiv_showCheckAnswerDiv();

      getNewQuestion();

      setTimeout(() => { 
          if(!lastQuestionFlag){
            //* to hide questinDiv and show the checkAnswerDiv
            hideCheckAnswerDiv_showQuestionDiv();
            startTime = new Date();
          } else {
            //* to hide questinDiv and show the checkAnswerDiv
            hideAnswerDiv_showResultsDiv();
            setTimeout(() => { window.location.reload()}, 8000); //* reload the web application to start
          }         
          
        } , 2000);

});




// * Start the game.
setTimeout(() => {startGame()}, 500);




// * exporting jquery element variables to be used by transitionsTabs
export {$questionDiv, $checkAnswerDiv, $resultsDiv};

// * exporting variables to be used by checkAnswerFunctionality
// export {acceptingAnswers,
//         currentQuestion, 
//         score, 
//         emoji,
//         scoreText};
