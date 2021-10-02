/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dbQuestions": () => (/* reexport safe */ _modules_retrievingData__WEBPACK_IMPORTED_MODULE_1__.dbQuestions),
/* harmony export */   "$startDiv": () => (/* binding */ $startDiv),
/* harmony export */   "$questionDiv": () => (/* binding */ $questionDiv),
/* harmony export */   "$checkAnswerDiv": () => (/* binding */ $checkAnswerDiv),
/* harmony export */   "$resultsDiv": () => (/* binding */ $resultsDiv),
/* harmony export */   "$imgQuestion": () => (/* binding */ $imgQuestion),
/* harmony export */   "currentQuestion": () => (/* binding */ currentQuestion),
/* harmony export */   "startTime": () => (/* binding */ startTime),
/* harmony export */   "getNewQuestion": () => (/* binding */ getNewQuestion)
/* harmony export */ });
/* harmony import */ var _modules_divResultFunctionality__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/divResultFunctionality */ "./src/js/modules/divResultFunctionality.js");
/* harmony import */ var _modules_retrievingData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/retrievingData */ "./src/js/modules/retrievingData.js");
/* harmony import */ var _modules_transitionsTabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/transitionsTabs */ "./src/js/modules/transitionsTabs.js");
/* harmony import */ var _modules_checkAnswersFunctionality__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/checkAnswersFunctionality */ "./src/js/modules/checkAnswersFunctionality.js");









 
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
document.addEventListener("DOMContentLoaded", (0,_modules_retrievingData__WEBPACK_IMPORTED_MODULE_1__.fetchAndStart)());


// ! to launch the game setting up inline style ==> display: none to all the container tabs except #startDiv.
$('.container').not('#startDiv').css('display', 'none');

 // * jQuery Event handler to the Start button to start the game
$('#startBTN').on('click', function(){
  (0,_modules_transitionsTabs__WEBPACK_IMPORTED_MODULE_2__.hideStartDiv_showQuestionDiv)();
});


// ! GETNEWQUESTION FUNCTION 
function getNewQuestion (){
  if(_modules_retrievingData__WEBPACK_IMPORTED_MODULE_1__.dbQuestions.length === 0 || questionCounter >= _modules_retrievingData__WEBPACK_IMPORTED_MODULE_1__.AMOUNT_QUESTIONS_QUIZ){	
      lastQuestionFlag = true;
      (0,_modules_divResultFunctionality__WEBPACK_IMPORTED_MODULE_0__.buildResultDiv)($resultsDiv, localStorage.getItem("score"));
  } else {
    questionCounter++;

    const questionIndex = Math.floor(Math.random() * _modules_retrievingData__WEBPACK_IMPORTED_MODULE_1__.dbQuestions.length);
    currentQuestion = _modules_retrievingData__WEBPACK_IMPORTED_MODULE_1__.dbQuestions[questionIndex];

    // * jQuery method to set up the text inside dd ORDINAL element and h1 question. 
    $question.html(`<dd>${questionCounter}/${_modules_retrievingData__WEBPACK_IMPORTED_MODULE_1__.AMOUNT_QUESTIONS_QUIZ}</dd><h1>${currentQuestion.question}</h1>`);
    
    $choices.each( function () {                             //* jQuery method each goes throught each .answerOption ($choices) element
      const number = this.dataset['number'];                 //* getting its data-number attr and with that gets the currentQuestion.
      $(this).text(currentQuestion["option" + number]);  
    });

    (0,_modules_retrievingData__WEBPACK_IMPORTED_MODULE_1__.getImageQuestion)(currentQuestion);

    _modules_retrievingData__WEBPACK_IMPORTED_MODULE_1__.dbQuestions.splice(questionIndex, 1);    
    localStorage.setItem("acceptingAnswers", true); 
  }

}

//! EVENT LISTENER ATTACH TO CHOICE (ARRAY OF OPTIONS)
  $choices.on("click", e => {

      (0,_modules_checkAnswersFunctionality__WEBPACK_IMPORTED_MODULE_3__.checkAnswerFunctionality)(e);
       
      //* to hide questinDiv and show the checkAnswerDiv
      (0,_modules_transitionsTabs__WEBPACK_IMPORTED_MODULE_2__.hideQuestionDiv_showCheckAnswerDiv)();

      getNewQuestion();

      setTimeout(() => { 
          if(!lastQuestionFlag){
            //* to hide questinDiv and show the checkAnswerDiv
            (0,_modules_transitionsTabs__WEBPACK_IMPORTED_MODULE_2__.hideCheckAnswerDiv_showQuestionDiv)();
            startTime = new Date();
          } else {
            //* to hide questinDiv and show the checkAnswerDiv
            (0,_modules_transitionsTabs__WEBPACK_IMPORTED_MODULE_2__.hideAnswerDiv_showResultsDiv)();
            setTimeout(() => { window.location.reload()}, 8000); //* reload the web application to start
          }         
          
        } , 2000);

});



// * exporting jquery element variables to be used by transitionsTabs // and $imgQuestion by retrievingData.js 


// * exporting variables to be used by checkAnswerFunctionality ***********************************************************






/***/ }),

/***/ "./src/js/modules/checkAnswersFunctionality.js":
/*!*****************************************************!*\
  !*** ./src/js/modules/checkAnswersFunctionality.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkAnswerFunctionality": () => (/* binding */ checkAnswerFunctionality)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/js/index.js");

// * this function is call at the Event handler to check whether and answer is correct and to apply some features **************
// *  css to checkAnswerDiv and to calculate the score)       ******************************************************************



// * CALCULATESCORE FUNCTION subtracs the time that user takes to answers the question to 10000 ms if the answer is correct.
// * if the time passes over 10000 ms the number of points will be set up to 100.
function calculateScore(){
  const timeTakes = (new Date() - _index__WEBPACK_IMPORTED_MODULE_0__.startTime);
  return  (timeTakes > 10000) ? 100 : 10000 - timeTakes;
} 


function checkAnswerFunctionality(event)  {
    if(!(localStorage.getItem("acceptingAnswers"))) return;
    localStorage.setItem("acceptingAnswers", false);
    const selectedOption = event.target.innerText;
    if(selectedOption == _index__WEBPACK_IMPORTED_MODULE_0__.currentQuestion.correct){
        let newScore = Number(localStorage.getItem("score"));
        newScore += calculateScore();
        localStorage.setItem("score", newScore);
      _index__WEBPACK_IMPORTED_MODULE_0__.$checkAnswerDiv.removeClass('wrong').addClass('correct');
      _index__WEBPACK_IMPORTED_MODULE_0__.$checkAnswerDiv.find('#emoji').text ('💂');; 
    } else {
      _index__WEBPACK_IMPORTED_MODULE_0__.$checkAnswerDiv.removeClass('correct').addClass('wrong');
      _index__WEBPACK_IMPORTED_MODULE_0__.$checkAnswerDiv.find('#emoji').text ('💩');
    }
    _index__WEBPACK_IMPORTED_MODULE_0__.$checkAnswerDiv.find('#score').find('p').text(`${Number(localStorage.getItem("score"))}`) ; 
}

 

/***/ }),

/***/ "./src/js/modules/divResultFunctionality.js":
/*!**************************************************!*\
  !*** ./src/js/modules/divResultFunctionality.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "myResults": () => (/* binding */ myResults),
/* harmony export */   "calculateLevel": () => (/* binding */ calculateLevel),
/* harmony export */   "buildResultDiv": () => (/* binding */ buildResultDiv)
/* harmony export */ });

// ***************************************  buildResultDiv builds the final div **********************************************


//* object with the info needed to build result div
const myResults = [

    {queenPic: `img/queen_faces/queen0.png`,
     queenSays: `I'm shocked about your lack of knowledge, you are rubish!!`,
     picSrc: `img/awards pics/square/dunce.jpg`},
  
    {queenPic: `img/queen_faces/queen1.png`,
     queenSays: `Not bad, I'll name you Member of the Order of the British Empire!`,
     picSrc: `img/awards pics/square/mbe-medal.png`},
  
    {queenPic: `img/queen_faces/queen2.png`,
    queenSays: `I'm impressed with you, I'll name you Officer of the Order of the British Empire!`,
    picSrc: `img/awards pics/square/obe-medal.png`},
  
    {queenPic: `img/queen_faces/queen3.png`,
    queenSays: `you are brilliant, I'll name you Commander of the Order of the British Empire!`,
    picSrc: `img/awards pics/square/cbe-medal.jpg`},
  ];

//* return a value depending on the totalPoint variable.
function calculateLevel(score){   
  if (score >= 90000){return 3;}
    else if (score >= 60000){return 2;}
      else if (score >= 30000){return 1;}
      return 0;
} 

function buildResultDiv(div, score){  
  let level = calculateLevel(score);
  
  div.find('.badge').find('h1').text(`${score}`);
  div.find('.badge').find('img#award').attr('src', myResults[level].picSrc);

  div.find('img#queen').attr('src', myResults[level].queenPic);
  div.find('#queenSentence').text(`${myResults[level].queenSays}`);
}



  

/***/ }),

/***/ "./src/js/modules/retrievingData.js":
/*!******************************************!*\
  !*** ./src/js/modules/retrievingData.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAndStart": () => (/* binding */ fetchAndStart),
/* harmony export */   "dbQuestions": () => (/* binding */ dbQuestions),
/* harmony export */   "AMOUNT_QUESTIONS_QUIZ": () => (/* binding */ AMOUNT_QUESTIONS_QUIZ),
/* harmony export */   "getImageQuestion": () => (/* binding */ getImageQuestion)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/js/index.js");

// **  retrievingQuestion function fetch the firebase firestore questions databe, it retrieves a certain amount of questions **
// **  AMOUNT_QUESTIONS_QUIZ and storates in the dbQuestionsImmutable variable  ********************* **********************************




// * constants for randomly choose the questions from firebase database.
const AMOUNT_QUESTIONS_QUIZ = 10;
const AMOUNT_QUESTIONS_QUIZ_FALLBACK = 20; // * fetching 20 elements instead of 10 for having 2 more as a fall back on.
const AMOUNT_QUESTIONS_COLLECTION = 50;

//* global variable to store the question from the Firebase database (it remains immutable).
let dbQuestionsImmutable, dbQuestions; 


// * return an array with an amount(numberOfQuestion) of different random numbers from 0 to totalQuestions.
function codeNumberQuestionArray(numberOfQuestions, totalQuestions){
    let array = [];
    while(array.length < numberOfQuestions){
       let randomNumber = Math.floor(Math.random() * totalQuestions);
       if(!array.includes(randomNumber)){array.push(randomNumber)}
    }
    return array;
  }



function fetchAndStart(){

  async function fetchingQuestionsData (){

    firebase.app(); const db = firebase.firestore(); // set up the db (database).

    let array  = codeNumberQuestionArray(AMOUNT_QUESTIONS_QUIZ_FALLBACK, AMOUNT_QUESTIONS_COLLECTION);

    let promisesArray = [];

    // * building the query promise for the promiseArray        //////////////////////////////////////////////////////////////
    for(let i = 0; i < array.length; i++){
      let questionNumber = array[i].toString().padStart(3, '0'); // turn the number in a string with 3 digit 0 pad;
      let docRef = db.collection("quizQuestions").doc(questionNumber)
      .get()
      .then((doc) => {
        if (doc.exists) {
            return doc.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        })
      .catch((error) => {
          console.log("Error getting document:", error);
      });
    // * ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
      promisesArray.push(docRef);
    }
     
    //  * wait fo Promise.all to return to assign the result to dbQuestionsImmutable
    return dbQuestionsImmutable = await Promise.all(promisesArray);

    }

  fetchingQuestionsData().then(() => {  
    
    if(dbQuestionsImmutable.length < AMOUNT_QUESTIONS_QUIZ){
      fetchAndStart(); // * call the fetchAndStart function again if the length of dbQuestionsImmutable is not the same than the AMOUNT_QUESTIONS_QUIZ
    } else {
      let dbQuestionsFiltered = dbQuestionsImmutable.filter(element => element !== undefined); // remove undefine elements from the dbQuestionsImmutable array;
      let startSlicing = dbQuestionsFiltered.length - 11;
      dbQuestions = dbQuestionsFiltered.slice(startSlicing); // *  removing excessed elements.

      (0,_index__WEBPACK_IMPORTED_MODULE_0__.getNewQuestion)();// * After the response is assinged to dbQuestion the function getNewQuestion is call to start the game 
    }   
  });

}  





//* function helper to retrieve the image from the firebase database and set the background-image inline css property.
function getImageQuestion (currentQuestion) {
    let storage = firebase.storage();
  
    let gsReference = storage.refFromURL(`gs://londonquiz-f8499.appspot.com/${currentQuestion['pic']}`);
  
    gsReference.getDownloadURL()
    .then(function(url) {_index__WEBPACK_IMPORTED_MODULE_0__.$imgQuestion.attr('src', `${url}`).attr('alt', `${currentQuestion['pic']}`)})
    .catch(function(error) {console.log(`an error happened when trying to access the image => ${error}`)});
  }




/***/ }),

/***/ "./src/js/modules/transitionsTabs.js":
/*!*******************************************!*\
  !*** ./src/js/modules/transitionsTabs.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hideStartDiv_showQuestionDiv": () => (/* binding */ hideStartDiv_showQuestionDiv),
/* harmony export */   "hideQuestionDiv_showCheckAnswerDiv": () => (/* binding */ hideQuestionDiv_showCheckAnswerDiv),
/* harmony export */   "hideCheckAnswerDiv_showQuestionDiv": () => (/* binding */ hideCheckAnswerDiv_showQuestionDiv),
/* harmony export */   "hideAnswerDiv_showResultsDiv": () => (/* binding */ hideAnswerDiv_showResultsDiv)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/js/index.js");

// **  transition between tabs applying css property display: none and removing it respectively   *****************************



 //* to hide questinDiv and show the checkAnswerDiv
 function hideStartDiv_showQuestionDiv () {
    _index__WEBPACK_IMPORTED_MODULE_0__.$startDiv.css('display', 'none'); 
    _index__WEBPACK_IMPORTED_MODULE_0__.$questionDiv.removeAttr('style');
}
//* to hide questinDiv and show the checkAnswerDiv
function hideQuestionDiv_showCheckAnswerDiv () {
    _index__WEBPACK_IMPORTED_MODULE_0__.$questionDiv.css('display', 'none'); 
    _index__WEBPACK_IMPORTED_MODULE_0__.$checkAnswerDiv.removeAttr('style');
}

//* to hide questinDiv and show the checkAnswerDiv
function hideCheckAnswerDiv_showQuestionDiv () {
    _index__WEBPACK_IMPORTED_MODULE_0__.$checkAnswerDiv.css('display', 'none'); 
    _index__WEBPACK_IMPORTED_MODULE_0__.$questionDiv.removeAttr('style');
}


//* to hide questinDiv and show the checkAnswerDiv
function hideAnswerDiv_showResultsDiv () {
    _index__WEBPACK_IMPORTED_MODULE_0__.$checkAnswerDiv.css('display', 'none'); 
    _index__WEBPACK_IMPORTED_MODULE_0__.$resultsDiv.removeAttr('style');
}





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map