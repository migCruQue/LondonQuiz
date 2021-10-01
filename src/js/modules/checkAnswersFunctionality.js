
// * this function is call at the Event handler to check whether and answer is correct and to apply some features **************
// *  css to checkAnswerDiv and to calculate the score)       ******************************************************************

import {currentQuestion, 
        $checkAnswerDiv,
        emoji,
        startTime} from "../index";

// * CALCULATESCORE FUNCTION subtracs the time that user takes to answers the question to 10000 ms if the answer is correct.
// * if the time passes over 10000 ms the number of points will be set up to 100.
function calculateScore(){
  const timeTakes = (new Date() - startTime);
  return  (timeTakes > 10000) ? 100 : 10000 - timeTakes;
} 


function checkAnswerFunctionality(event)  {
    if(!(localStorage.getItem("acceptingAnswers"))) return;
    localStorage.setItem("acceptingAnswers", false);
    const selectedOption = event.target.innerText;
    if(selectedOption == currentQuestion.correct){
        let newScore = Number(localStorage.getItem("score"));
        newScore += calculateScore();
        localStorage.setItem("score", newScore);
      $checkAnswerDiv.removeClass('wrong').addClass('correct');
      $checkAnswerDiv.find('#emoji').text ('💂');; 
    } else {
      $checkAnswerDiv.removeClass('correct').addClass('wrong');
      $checkAnswerDiv.find('#emoji').text ('💩');
    }
    $checkAnswerDiv.find('#score').find('p').text(`${Number(localStorage.getItem("score"))}`) ; 
}

export {checkAnswerFunctionality} 