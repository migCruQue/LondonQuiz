
//* object with the info needed to build result div
const myResults = [

  {queenPic: `img/queen pics/queen0.jpeg`,
   queenSays: `The Queen is horrified about your lack of knowledge, she considers you a mere peasant and won't even look at you!!`,
   picSrc: `img/awards pics/square/dunce.jpg`},

  {queenPic: `img/Queen pics/queen1.jpg`,
   queenSays: `The queen is very impressed, so she will name you Member of the Order of the British Empire (MBE)!!`,
   picSrc: `img/awards pics/square/mbe-medal.png`},

  {queenPic: `img/Queen pics/queen2.jpg`,
  queenSays: `The queen is in love with you, so she will name you Officer of the Order of the British Empire (OBE)!!`,
  picSrc: `img/awards pics/square/obe-medal.png`},

  {queenPic: `img/Queen pics/queen3.jpg`,
  queenSays: `The queen just adores you , so she will name you Commander of the Order of the British Empire (CBE)!!`,
  picSrc: `img/awards pics/square/cbe-medal.jpg`},


];

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
}, 3000);