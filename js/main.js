
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CONSTANTS & LETS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

// ARRAY OF OBJECTS: QUESTION, POSSIBLE ANSWERS AND CORRECT ANSWER

const myQuestions = [

    {
      question: '1-How many people died in the Great Fire of London in 1666?',
      answers: {
          a: 14.249,
          b: 320,
          c: 6
              },
      correctAnswer: 'c',
      picSrc: 'img/The-Great-Fire-of-London.jpg',



    },
    {
      question: "2-Pop culture time. What hotel is shown in the opening of Spice Girl's song 'Wannabe'?",
      answers: {
          a: 'The Ritz',
          b: 'The Wolseley',
          c: 'St Pancras Hotel'
              },
      correctAnswer: 'c',
      picSrc: 'img/spice-girls.jpg',



    },

    {
      question: '3-Where did the Great Fire of London begin?',
      answers: {
          a: 'Drury Lane',
          b: 'Fishamble Street',
          c: 'Pudding Lane'
              },
      correctAnswer: 'c',
      picSrc: 'img/greatfirestarting.jpg',



    },

    {
      question: "4-What's the quickest route between Leicester Square and Piccadilly Circus?'",
      answers: {
          a: 'Piccadilly Line',
          b: 'Walk',
          c: 'Taxi'
              },
      correctAnswer: 'b',
      picSrc: 'img/piccadilly.jpg',



    },

    {
      question: '5-What is the correct stop for Abbey Road?',
      answers: {
          a: 	'Baker Street',
          b: "St John's Wood",
          c: 'Maida Vale'
              },
      correctAnswer: 'b',
      picSrc: 'img/abbey-road.jpg',


    },

    {
      question: '6-London boasts the oldest public museum in the world, founded in 1753. Which is it?',
      answers: {
          a: 	'The British Museum',
          b: 'The Natural History museum',
          c: 'The Tate Modern'
              },
      correctAnswer: 'a',
      picSrc: 'img/muse_dorsay.jpg',


    },

    {
      question: '7-What year were the Boris Bikes launched?',
      answers: {
          a: 	'2008',
          b: '2009',
          c: '2010'
              },
      correctAnswer: 'c',
      picSrc: 'img/bikes.jpg',


    },


    {
      question: '8-When did the last execution in the Tower of London take place?',
      answers: {
          a: '1841',
          b: 	'1641',
          c: '1941'
              },
      correctAnswer: 'c',
      picSrc: 'img/execution.jpg',



    },

    {
      question: '9-How long did it take to build the Shard?',
      answers: {
          a: 	'2007-2012',
          b: '2009-2013',
          c: '2008-2012'
              },
      correctAnswer: 'a',
      picSrc: 'img/shard.jpg',


    },

    {
      question: '10-The London Underground consists of how many stations?',
      answers: {
          a: 	'390',
          b: '270',
          c: '130'
              },
      correctAnswer: 'b',
      picSrc: 'img/london-underground.jpg',


    }


];


const myResults = [

    {queenSays: `The queen is horrified about your lack of knowledge, she considers you a mere peasant and won't even look at you`,
    picSrc: `img/peasants.jpg`},

    {queenSays: `The queen is very impressed, so she will name you Member of the Order of the British Empire (MBE)`,
    picSrc: `img/obe-medal.png`},

    {queenSays: `The queen is in love with you, so she will name you Officer of the Order of the British Empire (OBE)`,
    picSrc: `img/obe-medal.png`},

    {queenSays: `The queen just adores you , so she will name you Commander of the Order of the British Empire (CBE)`,
    picSrc: `img/cbe-medal.jpg`},


];

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> /// CONSTANTS & LETS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/






/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/


////FUNCTION TO BUILD THE QUIZ
function buildQuiz(){

  //const output stores the HTML output.
  const output = [];

  //for each question loop
  myQuestions.forEach(

    (currentQuestion, questionNumber)  => {

      //const answers stores the list of answers choices
      const answers = [];

      //and for each available answer...
      for (letter in currentQuestion.answers) {

        //add an HTML radio button
        answers.push(

          `<label>

            <input type="radio" name="question${questionNumber}" value="${letter}">

            ${letter} :

            ${currentQuestion.answers[letter]}

          </label>`

                    );

              }


      //add this question and its answer to the output
      output.push(

          `<div class="slide">

           <div class="background-pic" style="background-image: url('${currentQuestion.picSrc}');"></div>

            <div class="question"> ${currentQuestion.question} </div>

            <div class="answers"> ${answers.join("")} </div>

          </div>`


                );

            }

      );

      //combine our output list into one string of HTML and put it on the page
      quiz.innerHTML = output.join('');



}
//\\FUNCTION TO BUILD THE QUIZ


////FUNCTION TO CHECK THE ANSWERS
function checking() {
  //stores answer containers from our quiz
  const answerContainers = quiz.querySelectorAll('.answers');

  //keep tracks of user's answers
  let numberCorrect = 0;

  //for each question...
  myQuestions.forEach(

    (currentQuestion, questionNumber)  => {

      //find the selected answer
      const answerContainer = answerContainers[questionNumber];

      const selector = 'input[name=question' +questionNumber+ ']:checked';

      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      //if the answer is correct..
      if (userAnswer === currentQuestion.correctAnswer){

          //add the number of correct answers
          numberCorrect++;

          //color the answers green
          // answerContainers[questionNumber].style.color = 'lightgreen';

        }  else {

            //if the answer is wrong or blank
            //color the answer red
            // answerContainers[questionNumber].style.color = 'red';

        }

      });

      return numberCorrect;


}
//\\FUNCTION TO CHECK THE ANSWERS


////THIS FUNCTION DISPLAYS THE RESULT.
function showResults(){



      quizContainer.classList.add('display-none');// REMOVE THE QUIZ-CONTAINER DIV TO SHOW THE RESULT

      numberCorrect = checking();

      let i = 0;

      if (numberCorrect >= 9){i=3;}
        else if (numberCorrect >= 7){i=2;}
          else if (numberCorrect >= 5){i=1;}

      // SET THE SCORE TO THE NUMBER OF THE CORRECT ANSWERS.
      let score = document.getElementById('score');

      score.innerHTML = `${numberCorrect} OUT OF ${myQuestions.length}`;

      // DISPLAY THE APPROPRIATE MESSAGE FROM THE QUEEN.
      let queenSentence = document.getElementById('queenSentence');

      queenSentence.innerHTML = `${myResults[i].queenSays}`;

      //DISPLAY THE RELATED PIC.
      let medallion = document.getElementById('medallion');

      medallion.src = `${myResults[i].picSrc}`;



      let queenDiv = document.getElementById('queenDiv');

      let prize = document.getElementById('prize');

      queenDiv.classList.remove('display-none');

      //WAIT 5 SECONDS AND HIDE THE QUEENDIV AND SHOW THE PRIZE DIV
      setTimeout(() => {
        queenDiv.classList.add('display-none');
        prize.classList.remove('display-none');
        }, 5000);

      //WAIT 5 SECONDS AND HIDE THE PRIZE DIV AND GOES TO THE START DIV
      setTimeout(() => {
        prize.classList.add('display-none');
        startDiv.classList.remove('display-none');
      }, 10000);





}
//\\ THIS FUNCTION DISPLAYS THE RESULT.



//FUNCTION TO SHOW OR HIDE THE SLIDES

function showSlide(n){

  slides[currentSlide].classList.remove('active-slide');

  slides[n].classList.add('active-slide');


  slides[n].classList.add('active-slide');

  currentSlide = n;

  if (currentSlide === 0){

      previousButton.style.display = 'none';
  }

  else {

      previousButton.style.display = 'inline-block';


  }

  if (currentSlide===slides.length-1) {

    nextButton.style.display = 'none';

    submitButton.style.display = 'inline-block';

  }

  else {

    nextButton.style.display = 'inline-block';

    submitButton.style.display = 'none';

  }


}

//FUNCTION TO GO TO THE NEXT SLIDE OR TO GO BACK TO THE PREVIOUS ONE

function showNextSlide(){

  showSlide(currentSlide + 1);

}

function showPreviousSlide(){

  showSlide(currentSlide - 1);

}


//FUNCTIONS TO GO TO THE NEXT SLIDE OR TO GO BACK TO THE PREVIOUS ONE

// THIS FUNCTION MAKES DIV START DISSAPPEARS AND MAKE THE MAIN DIV WITH THE SLIDES APPEARS.
function start(){

  startDiv.classList.add('display-none');
  quizContainer.classList.remove('display-none');


}



/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> /// FUNCTIONS DECLARATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/




/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SELECTING HTML ELEMENTS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

const startDiv = document.getElementById('start');

const quizContainer = document.getElementById('quiz-container');

const quiz = document.getElementById('quiz');

const resultsContainer = document.getElementById('results');







////display quiz right away
buildQuiz();


//  pagination

const previousButton = document.getElementById("previous");

const nextButton = document.getElementById("next");

const slides = document.querySelectorAll(".slide");

const submitButton = document.getElementById('submit');

const startButton = document.getElementById('start-button');



//it points to the first slide
let currentSlide = 0;






/// Show the slide
showSlide(0);







/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> EVENTS LISTENER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
//on submit, show results
submitButton.addEventListener('click', showResults);

previousButton.addEventListener("click", showPreviousSlide);

nextButton.addEventListener("click", showNextSlide);

startButton.addEventListener('click', start);
