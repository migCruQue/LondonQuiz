
import {buildResultDiv } from "./modules/divResultFunctionality";

import {fetchAndStart, dbQuestions, AMOUNT_QUESTIONS_QUIZ, getImageQuestion} from "./modules/retrievingData";

import {
  hideStartDiv_showQuestionDiv,
  hideQuestionDiv_showCheckAnswerDiv, 
  hideCheckAnswerDiv_showQuestionDiv, 
  hideAnswerDiv_showResultsDiv } from "./modules/transitionsTabs";

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
let currentQuestion = {};
let lastQuestionFlag = false;

// * DECLARING VARIABLES IN LOCALSTORAGE
localStorage.setItem("acceptingAnswers", false);
localStorage.setItem("score", 0);

// * global variable to calculate the points based in the time the user takes to click the option button,
// *   I declare it globaly as it has to be accessed for more the one functions.
let startTime = new Date();  

//  ! Event fires when HTML's been loaded, fetch the data and assign that data to the HTML elements questions, images  ********************
document.addEventListener("DOMContentLoaded", fetchAndStart());


// ! to launch the game setting up inline style ==> display: none to all the container tabs except #startDiv.
$('.container').not('#startDiv').css('display', 'none');

 // * jQuery Event handler to the Start button to start the game
$('#startBTN').on('click', function(){
  hideStartDiv_showQuestionDiv();
});


// ! GETNEWQUESTION FUNCTION 
function getNewQuestion (){
  console.log(dbQuestions);
  if(dbQuestions.length === 0 || questionCounter >= AMOUNT_QUESTIONS_QUIZ){	
      lastQuestionFlag = true;
      buildResultDiv($resultsDiv, localStorage.getItem("score"));
  } else {
    questionCounter++;

    const questionIndex = Math.floor(Math.random() * dbQuestions.length);
    currentQuestion = dbQuestions[questionIndex];

    // * jQuery method to set up the text inside dd ORDINAL element and h1 question. 
    $question.html(`<dd>${questionCounter}/${AMOUNT_QUESTIONS_QUIZ}</dd><h1>${currentQuestion.question}</h1>`);
    
    $choices.each( function () {                             //* jQuery method each goes throught each .answerOption ($choices) element
      const number = this.dataset['number'];                 //* getting its data-number attr and with that gets the currentQuestion.
      $(this).text(currentQuestion["option" + number]);  
    });

    getImageQuestion(currentQuestion);

    dbQuestions.splice(questionIndex, 1);    
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



// * exporting jquery element variables to be used by transitionsTabs // and $imgQuestion by retrievingData.js 
export {dbQuestions, $startDiv, $questionDiv, $checkAnswerDiv, $resultsDiv, $imgQuestion};

// * exporting variables to be used by checkAnswerFunctionality ***********************************************************
export {currentQuestion, startTime, getNewQuestion};



