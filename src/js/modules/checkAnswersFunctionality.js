
import {acceptingAnswers,
        currentQuestion, 
        score, 
        $checkAnswerDiv,
        emoji,
        scoreText,
        startTime} from "../index";

// * CALCULATESCORE FUNCTION subtracs the time that user takes to answers the question to 10000 ms if the answer is correct.
// * if the time passes over 10000 ms the number of points will be set up to 100.
function calculateScore(){
  const timeTakes = (new Date() - startTime);
  return  (timeTakes > 10000) ? 100 : 10000 - timeTakes;
} 


function checkAnswerFunctionality(event)  {
    if(!acceptingAnswers) return;
    acceptingAnswers = false;
    console.log(acceptingAnswers);
    const selectedOption = event.target.innerText;
    if(selectedOption == currentQuestion.correct){
      score += calculateScore();
      $checkAnswerDiv.removeClass('wrong').addClass('correct');
      emoji.innerText = '💂'; 
    } else {
      $checkAnswerDiv.removeClass('correct').addClass('wrong');
      emoji.innerText =  '💩';
    }
    scoreText.innerText = `${score}`; 
}

export {checkAnswerFunctionality} 