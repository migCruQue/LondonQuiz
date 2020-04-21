                            
                                                    
                                                    
                                                    //  XXXXXXXXXXXXX
                                                    //  XX MAIN.JS XX
                                                    //  XXXXXXXXXXXXX



/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ASSIGNING DIVS TO VARIABLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
// DIV id="start"

const $startDiv = $('#start');

// DIV id="quiz-container"
const $quizContainer = $('#quiz-container');

// DIV id="queenDiv"
const $queenDiv = $('#queenDiv');

// DIV CHECK ANSWER div
const $checkAnswerDiv = $('#checkAnswer');


// results div
const queenDiv = document.getElementById('queenDiv');

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>> FUNCTION buildQuiz: IT BUILDS THE QUIZ SLIDES STRUCTURE AS QUESTIONS, PICS, ANSWERS OPTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
function buildQuiz(){

    const output = []; //OUTPUT WILL STORE THE HTML FOR EACH DIV SLIDE

    for (const element of myQuestions){    // FOR LOOP FOR EACH QUESTION OF myQuestion.

        const answersHTML = [];   // answersHTML WILL STORE THE HTML FOR THE DIV class="answers" INSIDE THE DIV SLIDE

        for (const answerOption of element.answers) {  // FOR LOOP TO BUILD THE 3 OPTIONS BUTTONS

          answersHTML.push(

            `<label>

              <button type="button" class="answerOption" data-id="${answerOption[0]}"  value="${answerOption[2]}">${answerOption[1]}</button>

            </label>`
           );

        }

        output.push(

            `<div class="slide">

            <div class="background-pic" style="background-image: url('${element.picLap}');"></div>
            <div style="background: orange; width: 60px; height: 20px"> </div>

              <div id="question" class="mx-auto">

                  <div id="questionChild">${element.question}</div>

              </div>

              <div class="answers"> ${answersHTML.join("")} </div>

            </div>`
        );

    }

   $('#quiz').html(output.join('')); //ASSIGN THE OUTPUT HTML TO THE DIV QUIZ
}
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>> / FUNCTION buildQuiz <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>  FUNCTION build check answer div <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

function checkAnswer(correct){
  $checkAnswerDiv.find('#score').text(`${countCorrectAnswers}  out of  ${currentSlide + 1}`);
  
  if(correct){
    $checkAnswerDiv.css('background-color', 'mediumseagreen'); 
    $checkAnswerDiv.find('#emojiPara').text('💂');
  } else {
    $checkAnswerDiv.css('background-color', 'burlywood'); 
    $checkAnswerDiv.find('#emojiPara').text('💩');
  }
}




/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>> / FUNCTION build check answer div <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>> FUNCTION showResults: THIS FUNCTION DISPLAYS THE FINAL PRESENTATION DEPENDING ON THE SCORE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

function calculateCategory(){   // CHECK THE NUMBER OF CORRECT ANSWERS AND SET UP A CATEGORY DEPENDS ON THE NUMBER
  if (countCorrectAnswers >= 9){return 3;}
    else if (countCorrectAnswers >= 7){return 2;}
      else if (countCorrectAnswers >= 5){return 1;}
      return 0;
}


function buildResultDiv(){    //BUILD THE RESULT DIV
  $queenDiv.find('img#queen').attr('src', myResults[calculateCategory()].queenPic);
  $queenDiv.find('#finalScore').text(`${countCorrectAnswers} OUT OF 10`); 
  $queenDiv.find('h1').text(`${myResults[calculateCategory()].queenSays}`);
  $queenDiv.find('img#award').attr('src', myResults[calculateCategory()].picSrc);
}





function showResults(){
    buildResultDiv();

    $quizContainer.addClass('d-none');// REMOVE THE QUIZ-CONTAINER DIV TO SHOW THE RESULT

    $queenDiv.removeClass('d-none');

    //WAIT 5 SECONDS AND HIDE THE QUEENDIV AND SHOW THE PRIZE DIV
    setTimeout(() => {
      $queenDiv.addClass('d-none');
      $startDiv.removeClass('d-none');
      countCorrectAnswers = 0;
      currentSlide = 0;
      showSlide();
    }, 5000);

}

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>> / FUNCTION showResults <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/



/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>  FUNCTIONS showSlide <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>*/
/* <<<<<<<<<<<THIS FUNCTION DISPLAY THE FIRST SLIDE AT THE BEGINNNING, MOVE THE TO THE NEXT SLIDE AND CALL THE showResult() <<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<*/
/* >>>>>>>>>>>>                                               WHEN THERE ARE NOT MORE SLIDES ( currentSlide <= 9)       >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

let currentSlide = 0; //IN POINTS THE FIRST SLIDE

function showSlide(){
if(currentSlide <= 9){
      $('.slide').eq(currentSlide - 1).removeClass('active-slide');
      $('.slide').eq(currentSlide).addClass('active-slide');
  } else {
    $('.slide').eq(currentSlide).removeClass('active-slide');
    showResults();
  }
}



/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>> / FUNCTIONS showSlide and showNextSlide <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/


/* EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*/
/* EEEEEEEEEEEEE          EVENTS LISTENER THAT CHECK WETHER THE CORRECT OPTION/BUTTON IS CLICKED AND TRIGGER A SERIES OF ACTIONS       EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*/
/* EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*/



let countCorrectAnswers = 0; //DECLARING countCorrectAnswer AND SET IT

$(document).on('click', (e) => {

  if(e.target.className === 'answerOption'){

    if(e.target.value === 'correct'){
      countCorrectAnswers++;
      checkAnswer(true);
    }

    else if(e.target.value === 'incorrect'){
      checkAnswer(false);
      }

    setTimeout(() => {
      $checkAnswerDiv.removeClass('d-none');
        $quizContainer.addClass('d-none');
      }, 750);

    setTimeout(() => {
      $checkAnswerDiv.addClass('d-none');
      $quizContainer.removeClass('d-none');
      currentSlide++;
      showSlide()
      }, 2000);

  }
    
});


/* EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*/
/* EEEEEEEEEEEEE         / EVENTS LISTENER                         EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*/
/* EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*/

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



//SETTING THE BODY TO THE WINDOWHEIGHT 

$('div.fixed-height').css('height', `${$(window).height()}px`);


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// trying to decrease the font size of answerOption when the text content is too long

$(function(){
  $('button.answerOption').each(function(){
    let length = $(this).text().length;
    if(length > 22){$(this).css({fontSize: '-=5'});
    }
  });
});




// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



                              //STARTING THE QUIZ

$('#start-button').on('click', () => {
  $('#start').addClass('d-none');
  $quizContainer.removeClass('d-none')
  
});


/                             ///BUILD THE QUIZ

buildQuiz();

                              /// DISPLAY THE CURRENT SLIDE

showSlide(0);
