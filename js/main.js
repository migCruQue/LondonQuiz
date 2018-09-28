

const quizContainer = document.getElementById('quiz');

const resultsContainer = document.getElementById('results');

const submitButton = document.getElementById('submit');


function buildQuiz(){}

function showResults(){}

buildQuiz();

submitButton.addEventListener('click', showResults);

myQuestions = [

    {
      question: 'How many people died in the Great Fire of London in 1666?',
      answer: {
          a: 14,249,
          b: 320,
          c: 58
              }


    },

    {
      question: 'London boasts the oldest public museum in the world, founded in 1753. Which is it?',
      answer: {
          a: 	'The British Museum',
          b: 'The Natural History museum',
          c: 'The Tate Modern'
              }


    },

    {
      question: 'If all the track of the London Underground were laid end to end, how far would it reach?',
      answer: {
          a: '35 miles',
          b: 	'411 miles',
          c: '253 miles'
              }


    }








];
