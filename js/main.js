
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
      picMob: 'img/questions pics/mobile/The-Great-Fire-of-London_golden_mobile.jpg',
      picTab: 'img/questions pics/tablet/The-Great-Fire-of-London_golden.jpg',
      picLap: 'img/questions pics/laptop L/The-Great-Fire-of-London_golden.jpg',
    },
    {
      question: "2-Pop culture time. What hotel is shown in the opening of Spice Girl's song 'Wannabe'?",
      answers: {
          a: 'The Ritz',
          b: 'The Wolseley',
          c: 'St Pancras Hotel'
              },
      correctAnswer: 'c',
      picMob: 'img/questions pics/mobile/spice-girls_mobile.jpg',
      picTab: 'img/questions pics/tablet/spice-girls_golden.jpg',
      picLap: 'img/questions pics/laptop L/spice-girls_golden.jpg',

    },

    {
      question: '3-Where did the Great Fire of London begin?',
      answers: {
          a: 'Drury Lane',
          b: 'Fishamble Street',
          c: 'Pudding Lane'
              },
      correctAnswer: 'c',
      picMob: 'img/questions pics/mobile/greatfirestarting_mobile.jpg',
      picTab: 'img/questions pics/tablet/greatfirestarting_golden.jpg',
      picLap: 'img/questions pics/laptop L/greatfirestarting_golden.jpg',

    },

    {
      question: "4-What's the quickest route between Leicester Square and Piccadilly Circus?'",
      answers: {
          a: 'Piccadilly Line',
          b: 'Walk',
          c: 'Taxi'
              },
      correctAnswer: 'b',
      picMob: 'img/questions pics/mobile/piccadilly_mobile.jpg',
      picTab: 'img/questions pics/tablet/piccadilly_golden.jpg',
      picLap: 'img/questions pics/laptop L/shard_golden.jpg',

    },

    {
      question: '5-What is the correct stop for Abbey Road?',
      answers: {
          a: 	'Baker Street',
          b: "St John's Wood",
          c: 'Maida Vale'
              },
      correctAnswer: 'b',
      picMob: 'img/questions pics/mobile/abbey-road_golden_mobile.jpg',
      picTab: 'img/questions pics/tablet/abbey-road_golden.jpg',
      picLap: 'img/questions pics/laptop L/abbey-road_golden.jpg',
    },

    {
      question: '6-London boasts the oldest public museum in the world, founded in 1753. Which is it?',
      answers: {
          a: 	'The British Museum',
          b: 'The Natural History museum',
          c: 'The Tate Modern'
              },
      correctAnswer: 'a',
      picMob: 'img/questions pics/mobile/muse_dorsay_mobile.jpg',
      picTab: 'img/questions pics/laptop L/abbey-road_golden.jpg',
      picLap: 'img/questions pics/laptop L/muse_dorsay_golden.jpg',
    },

    {
      question: '7-What year were the Boris Bikes launched?',
      answers: {
          a: 	'2008',
          b: '2009',
          c: '2010'
              },
      correctAnswer: 'c',
      picMob: 'img/questions pics/mobile/bikes_golden_mobile.jpg',
      picTab: 'img/questions pics/tablet/bikes_golden.jpg',
      picLap: 'img/questions pics/laptop L/bikes_golden.jpg',
    },


    {
      question: '8-When did the last execution in the Tower of London take place?',
      answers: {
          a: '1841',
          b: 	'1641',
          c: '1941'
              },
      correctAnswer: 'c',
      picMob: 'img/questions pics/mobile/execution_mobile.jpg',
      picTab: 'img/questions pics/tablet/execution_golden.jpg',
      picLap: 'img/questions pics/laptop L/execution_golden.jpg',

    },

    {
      question: '9-How long did it take to build the Shard?',
      answers: {
          a: 	'2007-2012',
          b: '2009-2013',
          c: '2008-2012'
              },
      correctAnswer: 'a',
      picMob: 'img/questions pics/mobile/shard_mobile.jpg',
      picTab:'img/questions pics/tablet/shard_golden.jpg',
      picLap: 'img/questions pics/laptop L/shard_golden.jpg',
    },

    {
      question: '10-The London Underground consists of how many stations?',
      answers: {
          a: 	'390',
          b: '270',
          c: '130'
              },
      correctAnswer: 'b',
      picMob: 'img/questions pics/mobile/london-underground_mobile.jpg',
      picTab: 'img/questions pics/tablet/london-underground_golden.jpg',
      picLap: 'img/questions pics/laptop L/london-underground_golden.jpg',
    }


];


const myResults = [

    {queenPic: `img/queen pics/golden/queen0.jpeg`,
     queenSays: `The queen is horrified about your lack of knowledge, she considers you a mere peasant and won't even look at you`,
     picSrc: `img/awards pics/square/dunce.jpg`},

    {queenPic: `img/queen pics/golden/queen1.jpg.jpg`,
     queenSays: `The queen is very impressed, so she will name you Member of the Order of the British Empire (MBE)`,
     picSrc: `img/awards pics/square/mbe-medal.png`},

    {queenPic: `img/queen pics/golden/queen2.jpg`,
    queenSays: `The queen is in love with you, so she will name you Officer of the Order of the British Empire (OBE)`,
    picSrc: `img/awards pics/square/obe-medal.png`},

    {queenPic: `img/queen pics/golden/queen3.jpg.jpg`,
    queenSays: `The queen just adores you , so she will name you Commander of the Order of the British Empire (CBE)`,
    picSrc: `img/awards pics/square/cbe-medal.jpg`},


];




//IN POINTS THE FIRST SLIDE
let currentSlide = 0;

//IT SET THE CORRECT ANSWERS TO 0
let correctAnswers = 0;

//SCOREBAR TO KEEP COUNTING CORRECT AND WRONG ANSWERS
let scoreBar = '';


// let wrongAnswer = document.get

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

           <div class="background-pic" style="background-image: url('${currentQuestion.picLap}');"></div>

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

  if(event.target.value == myQuestions[currentSlide].correctAnswer){return true} else {return false}

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



      //BUILD THE RESULT DIV
      let queenDiv = document.getElementById('queenDiv');

      queenDiv.innerHTML =

      `<img class="mx-auto d-block container" src="${myResults[i].queenPic}" alt="queen" id="queen">

      <h1 class="mb-0 text-center mx-auto" id="queenSentence"><div id="score">0 correct answers out of 10</div><br>${myResults[i].queenSays}</h1>

      <img  src="${myResults[i].picSrc}"class="mx-auto d-block" id="award">`;

      queenDiv.classList.remove('d-none');

      //WAIT 5 SECONDS AND HIDE THE QUEENDIV AND SHOW THE PRIZE DIV
      setTimeout(() => {
        queenDiv.classList.add('d-none');
      }, 6500);

      //WAIT 5 SECONDS AND HIDE THE PRIZE DIV AND GOES TO THE START DIV
      setTimeout(() => {
        startDiv.classList.remove('d-none');
        buildQuiz();
        showSlide(0);
      }, 6500);





}
//\\ THIS FUNCTION DISPLAYS THE RESULT.



//FUNCTION TO SHOW OR HIDE THE SLIDES

function showSlide(n){

  const slides = document.querySelectorAll(".slide");

  slides[currentSlide].classList.remove('active-slide');

  slides[n].classList.add('active-slide');

  currentSlide = n;


}


//\\FUNCTION TO SHOW OR HIDE THE SLIDES


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

const emojiPara = document.getElementById('emojiPara');

const divEmoji = document.getElementById('emoji');

const queenDiv = document.getElementById('queenDiv');




/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> EVENTS LISTENER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/


//SELECT THE ANSWER DIV AFTER THE BUILDQUIZ FUNCTION IS CALLED.
document.body.addEventListener("click", event => {

    if (event.target.id =='ton') {

        if(correct()){
          correctAnswers++;
          emoji.style.backgroundColor = 'mediumseagreen';
          emojiPara.innerHTML = '💂';}

        else {
          emoji.style.backgroundColor = 'burlywood';
          emojiPara.innerHTML = '💩';}

        setTimeout(() => {
            divEmoji.classList.remove('d-none');
            quizContainer.classList.add('d-none');
          }, 750);

    //CHECK IF THE SLIDE IS NOT THE LAST ONE// IF NOT CALL THE FUNCTION TO PASS THE NEXT SLIDE// IF IT IS THEN CALLS SHOWRESULTS.
        setTimeout(() => {
          divEmoji.classList.add('d-none');
          quizContainer.classList.remove('d-none');
          if (currentSlide < 9){showNextSlide();}
          else {showResults();}
        }, 2000);


    }


});


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//////      EVENTS LISTENER <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/


//START THE QUIZ
startButton.addEventListener('click', start);
////BUILD THE QUIZ
buildQuiz();

/// DISPLAY THE CURRENT SLIDE
showSlide(0);
