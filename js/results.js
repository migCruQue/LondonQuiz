

// * get the totalPoints value passed to localStorage
const totalPoints = Number(window.localStorage.getItem('totalPoints'));

//* return a value depending on the totalPoint variable.
function calculateCategory(){   
    if (totalPoints >= 90000){return 3;}
      else if (totalPoints >= 60000){return 2;}
        else if (totalPoints >= 30000){return 1;}
        return 0;
  } 
  
// * build the result div
function buildResultDiv(){    
    $queenDiv.find('img#queen').attr('src', myResults[calculateCategory()].queenPic);
    $queenDiv.find('#finalScore').find('h1').text(`Total:${totalPoints} Pt`);
    $queenDiv.find('#finalScore').find('img#award').attr('src', myResults[calculateCategory()].picSrc);
    $queenDiv.find('#queenSentence').text(`${myResults[calculateCategory()].queenSays}`);
}

const queenDiv = document.getElementById('queenDiv');

// DIV id="queenDiv"
const $queenDiv = $('#queenDiv');

buildResultDiv();

setTimeout(() => {
    window.location.assign('index.html')
}, 5000);