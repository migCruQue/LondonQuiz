// (function() {
  const myQuestions = [

      {
        question: '1-How many people died in the Great Fire of London in 1666?',
        answers: {
            a: 14.249,
            b: 320,
            c: 6
                },
        correctAnswer: 'c'



      },
      {
        question: "2-Pop culture time. What hotel is shown in the opening of Spice Girl's song 'Wannabe'?",
        answers: {
            a: 'The Ritz',
            b: 'The Wolseley',
            c: 'St Pancras Hotel'
                },
        correctAnswer: 'c'



      },

      {
        question: '3-Where did the Great Fire of London begin?',
        answers: {
            a: 'Drury Lane',
            b: 'Fishamble Street',
            c: 'Pudding Lane'
                },
        correctAnswer: 'c'



      },

      {
        question: "4-What's the quickest route between Leicester Square and Piccadilly Circus?'",
        answers: {
            a: 'Piccadilly Line',
            b: 'Walk',
            c: 'Taxi'
                },
        correctAnswer: 'b'



      },

      {
        question: '5-What is the correct stop for Abbey Road?',
        answers: {
            a: 	'Baker Street',
            b: "St John's Wood",
            c: 'Maida Vale'
                },
        correctAnswer: 'b'


      },

      {
        question: '6-London boasts the oldest public museum in the world, founded in 1753. Which is it?',
        answers: {
            a: 	'The British Museum',
            b: 'The Natural History museum',
            c: 'The Tate Modern'
                },
        correctAnswer: 'a'


      },

      {
        question: '7-What year were the Boris Bikes launched?',
        answers: {
            a: 	'2008',
            b: '2009',
            c: '2010'
                },
        correctAnswer: 'c'


      },


      {
        question: '8-When did the last execution in the Tower of London take place?',
        answers: {
            a: '1841',
            b: 	'1641',
            c: '1941'
                },
        correctAnswer: 'c'


      },

      {
        question: '9-How long did it take to build the Shard?',
        answers: {
            a: 	'2007-2012',
            b: '2009-2013',
            c: '2008-2012'
                },
        correctAnswer: 'a'


      },

      {
        question: '10-The London Underground consists of how many stations?',
        answers: {
            a: 	'390',
            b: '270',
            c: '130'
                },
        correctAnswer: 'b'


      }


  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
// })();