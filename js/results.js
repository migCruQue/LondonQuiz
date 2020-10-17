
// * set the window's height
$('div.fixed-height').css('height', `${$(window).height()}px`);

// * get the totalPoints value passed to localStorage
const totalPoints = Number(window.localStorage.getItem('totalPoints'));

//* return a value depending on the totalPoint variable.
function calculateCategory(){   
    if (totalPoints >= 9){return 3;}
      else if (totalPoints >= 7){return 2;}
        else if (totalPoints >= 5){return 1;}
        return 0;
  } 
  
// * build the result div
function buildResultDiv(){    
    $queenDiv.find('img#queen').attr('src', myResults[calculateCategory()].queenPic);
    $queenDiv.find('#finalScore').text(`TOTAL POINTS ${totalPoints}`); 
    $queenDiv.find('h1').text(`${myResults[calculateCategory()].queenSays}`);
    $queenDiv.find('img#award').attr('src', myResults[calculateCategory()].picSrc);
}

const queenDiv = document.getElementById('queenDiv');

// DIV id="queenDiv"
const $queenDiv = $('#queenDiv');

buildResultDiv();

setTimeout(() => {
    window.location.assign('/start.html')
}, 5000);