
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




//IN POINTS THE FIRST SLIDE
let currentSlide = 0;

//IT SET THE CORRECT ANSWERS TO 0
let correctAnswers = 0;

//SCOREBAR TO KEEP COUNTING CORRECT AND WRONG ANSWERS
let scoreBar = '';

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> /// CONSTANTS & LETS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/






/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/



// THIS FUNCTION MAKES DIV START DISSAPPEARS AND MAKE THE MAIN DIV WITH THE SLIDES APPEARS.
function start(){

  startDiv.classList.add('d-none');
  quizContainer.classList.remove('d-none')

}

//\\ THIS FUNCTION START

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

            <button type="button" id="ton" name="question${questionNumber}" value="${letter}">${currentQuestion.answers[letter]}</button>

          </label>`

                    );

              }


      //add this question and its answer to the output
      output.push(
          //I THINK THE ERROR IS IN THE ANSWERS DIV// TRY TO SELECT SOMETHING ELSE
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




////FUNCTION TO CHECK THE ANSWERS IN THE EVENT LISENER

function correct(){

  if(myQuestions[currentSlide].correctAnswer == event.target.value){return true} else {return false}

}

//\\FUNCTION TO CHECK THE ANSWERS IN THE EVENT LISENER



////THIS FUNCTION DISPLAYS THE RESULT.
function showResults(){



      quizContainer.classList.add('d-none');// REMOVE THE QUIZ-CONTAINER DIV TO SHOW THE RESULT

      // CHECK THE NUMBER OF CORRECT ANSWERS AND SET UP A CATEGORY DEPENDS ON THE NUMBER.
      let i = 0;

      if (correctAnswers >= 9){i=3;}
        else if (correctAnswers >= 7){i=2;}
          else if (correctAnswers >= 5){i=1;}

      // SELECT THE DIV SCORE AND DISPLAY A SCORE WITH THE NUMBER OF ANSWER OUT OF 10
      let score = document.getElementById('score');

      score.innerHTML = `${correctAnswers} OUT OF ${myQuestions.length}`;

      // DISPLAY THE APPROPRIATE MESSAGE FROM THE QUEEN.
      let queenSentence = document.getElementById('queenSentence');

      queenSentence.innerHTML = `${myResults[i].queenSays}`;

      //DISPLAY THE RELATED PIC.
      let medallion = document.getElementById('medallion');

      medallion.src = `${myResults[i].picSrc}`;



      let queenDiv = document.getElementById('queenDiv');

      let prize = document.getElementById('prize');

      queenDiv.classList.remove('d-none');

      //WAIT 5 SECONDS AND HIDE THE QUEENDIV AND SHOW THE PRIZE DIV
      setTimeout(() => {
        queenDiv.classList.add('d-none');
        prize.classList.remove('d-none');
        }, 5000);

      //WAIT 5 SECONDS AND HIDE THE PRIZE DIV AND GOES TO THE START DIV
      setTimeout(() => {
        prize.classList.add('d-none');
        startDiv.classList.remove('d-none');
        buildQuiz();
        showSlide(0);
      }, 10000);





}
//\\ THIS FUNCTION DISPLAYS THE RESULT.



//FUNCTION TO SHOW OR HIDE THE SLIDES

function showSlide(n){

  const slides = document.querySelectorAll(".slide");

  slides[currentSlide].classList.remove('active-slide');

  slides[n].classList.add('active-slide');

  currentSlide = n;


}

//FUNCTION TO GO TO THE NEXT SLIDE OR TO GO BACK TO THE PREVIOUS ONE

function showNextSlide(){

  showSlide(currentSlide + 1);

}



//FUNCTIONS TO GO TO THE NEXT SLIDE OR TO GO BACK TO THE PREVIOUS ONE





/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> /// FUNCTIONS DECLARATION <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/




/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SELECTING HTML ELEMENTS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

const startDiv = document.getElementById('start');

const quizContainer = document.getElementById('quiz-container');

const quiz = document.getElementById('quiz');

const startButton = document.getElementById('start-button');

const scoreDiv = document.getElementById('scoreBar');






/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> EVENTS LISTENER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

//START THE QUIZ
startButton.addEventListener('click', start);






//SELECT THE ANSWER DIV AFTER THE BUILDQUIZ FUNCTION IS CALLED.
document.body.addEventListener("click", event => {

    if (event.target.id =='ton') {

        if(correct()){ correctAnswers++;
                        scoreBar += '💂'} else { scoreBar += "💩"}
        scoreDiv.innerHTML = scoreBar;

    //CHECK IF THE SLIDE IS NOT THE LAST ONE// IF NOT CALL THE FUNCTION TO PASS THE NEXT SLIDE// IF IT IS THEN CALLS SHOWRESULTS.
        if (currentSlide < 9){showNextSlide();}

        else {
          showResults();
          scoreBar = '';}

    }


});


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//////      EVENTS LISTENER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

////BUILD THE QUIZ
buildQuiz();

/// DISPLAY THE CURRENT SLIDE
showSlide(0);
