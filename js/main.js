

const quizContainer = document.getElementById('quiz');

const resultsContainer = document.getElementById('results');

const submitButton = document.getElementById('submit');

myQuestions = [

    {
      question: 'How many people died in the Great Fire of London in 1666?',
      answer: {
          a: 14,249,
          b: 320,
          c: 6
              },
      correctAnswer: 'c'



    },

    {
      question: 'London boasts the oldest public museum in the world, founded in 1753. Which is it?',
      answer: {
          a: 	'The British Museum',
          b: 'The Natural History museum',
          c: 'The Tate Modern'
              },
      correctAnswer: 'c'


    },

    {
      question: '	When did the last execution in the Tower of London take place?',
      answer: {
          a: '1841',
          b: 	'1641',
          c: '1941'
              },
      correctAnswer: 'c'


    }

];


function buildQuiz(){

  //const output stores the HTML output.
  const output = [];

  //for each question loop
  myQuestions.forEach(

    (currentQuestion, questionNumber)  => {

      //const answers stores the list of answers choices
      const answers = [];

      //and for each available answer...
      for (letter in currentQuestion.answers) {

        //add an HTML radio button
        answer.push(

          `<label>

            <input type="radio" name="question${questionNumber}" value="${letter}">

            ${letter} :

            ${currentQuestion.answers[letter]}

          </label>`

                    );

              }


      //add this question and its answer to the output
      output.push(

          `<div class"question">${currentQuestion.question} </div>

          <div class="answers">${answers.join('')} </div>`


                );

            }

      );

      //combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');



}





function showResults(){


  //stores answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  //keep tracks of user's answers
  let numberCorrect = 0;

  //for each question...
  myQuestions.forEach(

    (currentQuestion, questionNumber)  => {

      //find the selected answer
      const answerContainers = answerContainers[questionNumber];

      const selector = `input[name=question' +questionNumber+ ']:checked`;

      const userAnswer = (answerContainers.querySelectorAll(selector)) || {}).value;

      //if the answer is correct..
      if (userAnswer === currentQuestion.correctAnswer){

          //add the number of correct answers
          numberCorrect++;

          //color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';

        }  else {

            //if the answer is wrong or blank
            //color the answer red
            answerContainers[questionNumber].style.color = 'red';

        }

      });

      //show number of correct answers out of total
      resultsContainer.innerHTML = numberCorrect + ' out of ' + myQuestions.length;

}

//display quiz right away
buildQuiz();


//on submit, show results
submitButton.addEventListener('click', showResults);
