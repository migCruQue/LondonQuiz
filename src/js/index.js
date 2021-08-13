


// ***************************************  buildResultDiv builds the final div **********************************************
import {buildResultDiv } from "./modules/divResultFunctionality";

// **  retrievingQuestion function fetch the firebase firestore questions databe, it retrieves a certain amount of questions **
// **  AMOUNT_QUESTIONS_QUIZ and storates in the dbQuestions variable  ********************* **********************************
import {retrievingQuestions, dbQuestions, AMOUNT_QUESTIONS_QUIZ, getImageQuestion} from "./modules/retrievingData";

// **  transition between tabs applying css property display: none and removing it respectively   *****************************
import {
  hideStartDiv_showQuestionDiv,
  hideQuestionDiv_showCheckAnswerDiv, 
  hideCheckAnswerDiv_showQuestionDiv, 
  hideAnswerDiv_showResultsDiv } from "./modules/transitionsTabs";

// * this function is call at the Event handler to check whether and answer is correct and to apply some features **************
// *  css to checkAnswerDiv and to calculate the score)       ******************************************************************
import {checkAnswerFunctionality} from "./modules/checkAnswersFunctionality";

 
// ***************************************  DECLARING GLOBAL VARIABLES AND CONSTANTS  ***********************************************************

//*  jQuery constants (HTML elements)
const $startDiv = $('#startDiv');
const $question = $('#question');                                              
const $choices = $('.answerOption');                                              
const $questionDiv = $('#questionDiv');                                        
const $resultsDiv = $('#resultsDiv');                                                 
const $checkAnswerDiv = $('#checkAnswerDiv'); 
const $imgQuestion = $('#imgQuestion'); 

// * INITIALING VARIABLES

let questionCounter = 0;
let availableQuestions = [];
let currentQuestion = {};
let lastQuestionFlag = false;

// * DECLARING VARIABLES IN LOCALSTORAGE
localStorage.setItem("acceptingAnswers", false);
localStorage.setItem("score", 0);

// * global variable to calculate the points based in the time the user takes to click the option button,
// *   I declare it globaly as it has to be accessed for more the one functions.
let startTime = new Date();  



// !(1) to launch the game setting up inline style ==> display: none to all the container tabs except #startDiv.

$('.container').not('#startDiv').css('display', 'none');

 // * jQuery Event handler to the Start button to start the game
$('#startBTN').on('click', function(){
  hideStartDiv_showQuestionDiv();
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
function getNewQuestion (){

  if(availableQuestions.length === 0 || questionCounter >= AMOUNT_QUESTIONS_QUIZ){	
      lastQuestionFlag = true;
      buildResultDiv($resultsDiv, localStorage.getItem("score"));
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
    localStorage.setItem("acceptingAnswers", true); 
  }

}


//! EVENT LISTENER ATTACH TO CHOICE (ARRAY OF OPTIONS)
  $choices.on("click", e => {

      checkAnswerFunctionality(e);
       
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




// * exporting jquery element variables to be used by transitionsTabs // and $imgQuestion by retrievingData.js 
export {$startDiv, $questionDiv, $checkAnswerDiv, $resultsDiv, $imgQuestion};

// * exporting variables to be used by checkAnswerFunctionality ***********************************************************
export {currentQuestion, startTime};
