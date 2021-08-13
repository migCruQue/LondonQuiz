
import {$startDiv, $questionDiv, $checkAnswerDiv, $resultsDiv} from "../index";

 //* to hide questinDiv and show the checkAnswerDiv
 function hideStartDiv_showQuestionDiv () {
    $startDiv.css('display', 'none'); 
    $questionDiv.removeAttr('style');
}
//* to hide questinDiv and show the checkAnswerDiv
function hideQuestionDiv_showCheckAnswerDiv () {
    $questionDiv.css('display', 'none'); 
    $checkAnswerDiv.removeAttr('style');
}

//* to hide questinDiv and show the checkAnswerDiv
function hideCheckAnswerDiv_showQuestionDiv () {
    $checkAnswerDiv.css('display', 'none'); 
    $questionDiv.removeAttr('style');
}


//* to hide questinDiv and show the checkAnswerDiv
function hideAnswerDiv_showResultsDiv () {
    $checkAnswerDiv.css('display', 'none'); 
    $resultsDiv.removeAttr('style');
}



export {hideStartDiv_showQuestionDiv, hideQuestionDiv_showCheckAnswerDiv, hideCheckAnswerDiv_showQuestionDiv, hideAnswerDiv_showResultsDiv }