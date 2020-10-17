                            
                                                    
                                                    
                                                    //  XXXXXXXXXXXXX
                                                    //*  XX MAIN.JS XX
                                                    //  XXXXXXXXXXXXX



/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
//* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ASSIGNING DIVS TO VARIABLES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
let questions = [];


fetch('../js/questions.json', {
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   }

})
.then(res => {return res.json()})
.then(response => {
      questions = [...response];
      console.log(questions);
    });

let quizQuestions;

// DIV id="quiz-container"
const $quizContainer = $('#quiz-container');


// DIV CHECK ANSWER div
const $checkAnswerDiv = $('#checkAnswer');

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
//* >>>>>>>>>>>>>>>>>>>>>>>>>>>> FUNCTION buildQuiz: IT BUILDS THE QUIZ SLIDES STRUCTURE AS QUESTIONS, PICS, ANSWERS OPTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
function buildQuiz(){
    //   let myQuestions = [
    //     {
    //        "question": "How many people died in the Great Fire of London in 1666?",
    //        "option1": ["14.249", false],
    //        "option2": ["320", false],
    //        "option3": ["6", true],
    //        "picLap": "img/questions pics/laptop L/The-Great-Fire-of-London_golden.jpg",
    //        "num": "1"
    //    },
     
    //    {
    //      "question": "Pop culture time. What hotel is shown in the opening of Spice Girl's song 'Wannabe'?",
    //      "option1": ["The Ritz", false],
    //      "option2": ["The Wolseley", false],
    //      "option3": ["St Pancras Hotel", true],
    //      "picLap": "img/questions pics/laptop L/spice-girls_golden.jpg",
    //      "num": "2"
    //    },
    //    {
    //      "question": "Where did the Great Fire of London begin?",
    //      "option1": ["Drury Lane", false],
    //      "option2": ["Fishamble Street", false],
    //      "option3": ["Pudding Lane", true],
    //      "picLap": "img/questions pics/laptop L/greatfirestarting_golden.jpg",
    //      "num": "3"
    //    }
     
    //  ];
        const output = []; //OUTPUT WILL STORE THE HTML FOR EACH DIV SLIDE

    questions.forEach(element => {
      
      output.push(
        `<div class="slide">

            <div class="background-pic" style="background-image: url('${element.picLap}');"></div>
            
            <div id="score-bar"></div>

            <div id="question" class="mx-auto">

                <div id="questionChild">${element.question}</div>

            </div>

            <div class="answers">
          
            <label>
              <button type="button" class="answerOption" data-id="a"  value="${element.option1[1]}">${element.option1[0]}</button>
            </label>
            
            <label>
              <button type="button" class="answerOption" data-id="b"  value="${element.option2[1]}">${element.option2[0]}</button>
            </label>
            
            <label>
              <button type="button" class="answerOption" data-id="c"  value="${element.option3[1]}">${element.option3[0]}</button>
            </label>
          
            </div>

        </div>`
      );
    });

  $('#quiz').html(output.join('')); //ASSIGN THE OUTPUT HTML TO THE DIV QUIZ
}
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
//* >>>>>>>>>>>>>>>>>>>>>>>>>>>> / FUNCTION buildQuiz <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
//* >>>>>>>>>>>>>>>>>>>>>>>>>>>>  FUNCTION showSlide <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>*/
//* This fuction display the first slide at the beginning, then it displays the subsequents slides.    
//* When currentSlide value is 9, it calls showResult function.                                                     
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

let currentSlide = 0; //* IN POINTS THE FIRST SLIDE

let startTime = new Date();  // global variable to calculate the point, I declare it globaly as it has to be access for more the one functions.

function showSlide(){

  startTime = new Date();
 
  if(currentSlide <= (questions.length - 1)){
        $('.slide').eq(currentSlide - 1).removeClass('active-slide');
        $('.slide').eq(currentSlide).addClass('active-slide');
    } else {
      $('.slide').eq(currentSlide).removeClass('active-slide');
      $('div#score-bar').removeClass('score-bar-paused'); 
      window.localStorage.setItem('totalPoints', totalPoints);
      setTimeout(() => {
        window.location.assign('results.html');
      }, 2000)
    }
}



/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
//* >>>>>>>>>>>>>>>>>>>>>>>>>>>> / FUNCTION showSlide  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

/* EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*/
//* this event listener targets the answers option buttons, it will 
//* trigger a series of actions depending whether it is correct or wrong.
/* EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*/



let totalPoints = 0; //DECLARING countCorrectAnswer AND SET IT

$(document).on('click', (e) => {

  if(e.target.className === 'answerOption'){

    $('div.active-slide').find('div#score-bar').addClass('score-bar-paused');    //*this statement pauses the bar div animation.

    if(e.target.value === 'true'){
      totalPoints += calculatePoints();
      checkAnswer(true);
    }

    else if(e.target.value === 'false'){
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
//* EEEEEEEEEEEEE         / EVENTS LISTENER                         EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*/
/* EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*/

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
//* >>>>>>>>>>>>>>>>>>>>>>>>>>>>  FUNCTION calculatePoints <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

function calculatePoints(){
  const timeMili = (new Date() - startTime);
  return  (timeMili > 10000) ? 100 : 10000 - timeMili;
}

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
//* >>>>>>>>>>>>>>>>>>>>>>>>>>>> / FUNCTION calculatePoints <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
//* >>>>>>>>>>>>>>>>>>>>>>>>>>>>  FUNCTION checkAnswer <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

function checkAnswer(correct){
  $checkAnswerDiv.find('#score').text(`${totalPoints} POINTS`);
  
  if(correct){
    $checkAnswerDiv.css('background-color', 'mediumseagreen'); 
    $checkAnswerDiv.find('#emojiPara').text('💂');
  } else {
    $checkAnswerDiv.css('background-color', 'burlywood'); 
    $checkAnswerDiv.find('#emojiPara').text('💩');
  }
}

/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
//* >>>>>>>>>>>>>>>>>>>>>>>>>>>> / FUNCTION checkAnswer <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/


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


                           ///*BUILD THE QUIZ

setTimeout( () => {
  buildQuiz();
  showSlide();}
 , 500
);



                              ///* DISPLAY THE CURRENT SLIDE


