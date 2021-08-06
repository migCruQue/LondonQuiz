
 
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

// * constants for randomly choose the questions from firebase database.
const AMOUNT_QUESTIONS_QUIZ = 10;
const AMOUNT_QUESTIONS_COLLECTION = 50;

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

//* global variable to store the question from the Firebase database (it remains immutable).
let dbQuestions = [];


// !(1) to launch the game setting up inline style ==> display: none to all the container tabs except #startDiv.

$('.container').not('#startDiv').css('display', 'none');

 // * jQuery Event handler to the Start button to start the game
$('#startBTN').on('click', function() {         
    $('#startDiv').css('display', 'none');
    $('#questionDiv').removeAttr('style');
  });




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
// * I've turned it from an arrow function to a default function as it didn't work when I added type="module" to the index.js script in the embedded html  
function startGame(){
  questionCounter = 0;
  score = 0;
  availableQuestions = [...dbQuestions];
  getNewQuestion();
}

// ! GETNEWQUESTION FUNCTION
// * I've turned it from an arrow function to a default function as it didn't work when I added type="module" to the index.js script in the embedded html  
function getNewQuestion (){

  if(availableQuestions.length === 0 || questionCounter >= AMOUNT_QUESTIONS_QUIZ){	
      lastQuestionFlag = true;
      let level = calculateLevel(score);
      buildResultDiv($resultsDiv, level);
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
        console.log(calculateScore());
        score += calculateScore();
        $checkAnswerDiv.removeClass('wrong').addClass('correct');
        emoji.innerText = '💂'; 
      } else {
        $checkAnswerDiv.removeClass('correct').addClass('wrong');
        emoji.innerText =  '💩';
      }
      scoreText.innerText = `${score}`; 
       
      //* to hide questinDiv and show the checkAnswerDiv
      $questionDiv.css('display', 'none'); $checkAnswerDiv.removeAttr('style');
      
      getNewQuestion();

      setTimeout(() => { 
          if(!lastQuestionFlag){
            //* to hide questinDiv and show the checkAnswerDiv
            $checkAnswerDiv.css('display', 'none'); $questionDiv.removeAttr('style');
            startTime = new Date();
          } else {
            //* to hide questinDiv and show the checkAnswerDiv
            $checkAnswerDiv.css('display', 'none'); $resultsDiv.removeAttr('style');
            setTimeout(() => { window.location.reload()}, 8000); //* reload the web application to start
          }         
          
        } , 2000);

});


// * DISPLAY RESULTS DIV  ///////////////////////////////////////////////////////////////////////////////////////////////////////

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

function buildResultDiv(div, level){    
  div.find('.badge').find('h1').text(`${score}`);
  div.find('.badge').find('img#award').attr('src', myResults[level].picSrc);

  div.find('img#queen').attr('src', myResults[level].queenPic);
  div.find('#queenSentence').text(`${myResults[level].queenSays}`);
}


// * build the result div


// * Start the game.
setTimeout(() => {startGame()}, 500);




