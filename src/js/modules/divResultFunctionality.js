
// ***************************************  buildResultDiv builds the final div **********************************************


//* object with the info needed to build result div
const myResults = [

    {queenPic: `img/queen_faces/queen0.png`,
     queenSays: `I'm shocked about your lack of knowledge, you are rubish!!`,
     picSrc: `img/awards pics/square/dunce.jpg`},
  
    {queenPic: `img/queen_faces/queen1.png`,
     queenSays: `Not bad, I'll name you Member of the Order of the British Empire!`,
     picSrc: `img/awards pics/square/mbe-medal.png`},
  
    {queenPic: `img/queen_faces/queen2.png`,
    queenSays: `I'm impressed with you, I'll name you Officer of the Order of the British Empire!`,
    picSrc: `img/awards pics/square/obe-medal.png`},
  
    {queenPic: `img/queen_faces/queen3.png`,
    queenSays: `you are brilliant, I'll name you Commander of the Order of the British Empire!`,
    picSrc: `img/awards pics/square/cbe-medal.jpg`},
  ];

//* return a value depending on the totalPoint variable.
function calculateLevel(score){   
  if (score >= 90000){return 3;}
    else if (score >= 60000){return 2;}
      else if (score >= 30000){return 1;}
      return 0;
} 

function buildResultDiv(div, score){  
  let level = calculateLevel(score);
  
  div.find('.badge').find('h1').text(`${score}`);
  div.find('.badge').find('img#award').attr('src', myResults[level].picSrc);

  div.find('img#queen').attr('src', myResults[level].queenPic);
  div.find('#queenSentence').text(`${myResults[level].queenSays}`);
}



  export { myResults, calculateLevel, buildResultDiv };