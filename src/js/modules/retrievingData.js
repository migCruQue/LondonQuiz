// * constants for randomly choose the questions from firebase database.
const AMOUNT_QUESTIONS_QUIZ = 10;
const AMOUNT_QUESTIONS_COLLECTION = 50;

//* global variable to store the question from the Firebase database (it remains immutable).
let dbQuestions = [];


// * return an array with an amount(numberOfQuestion) of different random numbers from 0 to totalQuestions.
function codeNumberQuestionArray(numberOfQuestions, totalQuestions){
    let array = [];
    while(array.length < numberOfQuestions){
       let randomNumber = Math.floor(Math.random() * totalQuestions);
       if(!array.includes(randomNumber)){array.push(randomNumber)}
    }
    return array;
  }



function retrievingQuestions( ){
 
  firebase.app();

  const db = firebase.firestore();

  let array  = codeNumberQuestionArray(AMOUNT_QUESTIONS_QUIZ, AMOUNT_QUESTIONS_COLLECTION);

  array.forEach( element => {
      db.collection("questions").where("CodeNumber", "==", element)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              dbQuestions.push(doc.data());
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  });
}


export {retrievingQuestions, dbQuestions, AMOUNT_QUESTIONS_QUIZ};