




function resizeElementHeight(element) {
  var height = 0;
  var body = window.document.body;
  if (window.innerHeight) {
      height = window.innerHeight;
  } else if (body.parentElement.clientHeight) {
      height = body.parentElement.clientHeight;
  } else if (body && body.clientHeight) {
      height = body.clientHeight;
  }
  element.style.height = ((height - element.offsetTop) + "px");
}




/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CONSTANTS & LETS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/


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

      <h1 class="mb-0 text-center mx-auto" id="queenSentence"><div id="score" class="mx-auto">0 correct answers out of 10</div><br>${myResults[i].queenSays}</h1>

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


/////////////////////////////////SETTING UP THE DIV HEIGHT/////EXPERIMENTAL///////////////////////////////////////////////////

// startDiv.style.minHeight =  `${window.innerHeight}px`;

/////////////////////////////////SETTING UP THE DIV HEIGHT/////EXPERIMENTAL///////////////////////////////////////////////////


//START THE QUIZ
startButton.addEventListener('click', start);
////BUILD THE QUIZ
buildQuiz();

/// DISPLAY THE CURRENT SLIDE
showSlide(0);
