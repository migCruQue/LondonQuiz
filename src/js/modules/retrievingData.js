
// **  retrievingQuestion function fetch the firebase firestore questions databe, it retrieves a certain amount of questions **
// **  AMOUNT_QUESTIONS_QUIZ and storates in the dbQuestionsImmutable variable  ********************* **********************************

import {$imgQuestion, getNewQuestion} from "../index";


// * constants for randomly choose the questions from firebase database.
const AMOUNT_QUESTIONS_QUIZ = 20; // * fetching 12 elements instead of 10 for having 2 more as a fall back on.
const AMOUNT_QUESTIONS_COLLECTION = 50;

//* global variable to store the question from the Firebase database (it remains immutable).
let dbQuestionsImmutable, dbQuestions; 


// * return an array with an amount(numberOfQuestion) of different random numbers from 0 to totalQuestions.
function codeNumberQuestionArray(numberOfQuestions, totalQuestions){
    let array = [];
    while(array.length < numberOfQuestions){
       let randomNumber = Math.floor(Math.random() * totalQuestions);
       if(!array.includes(randomNumber)){array.push(randomNumber)}
    }
    return array;
  }



function fetchAndStart(){

  async function fetchingQuestionsData (){

    firebase.app(); const db = firebase.firestore(); // set up the db (database).

    let array  = codeNumberQuestionArray(AMOUNT_QUESTIONS_QUIZ, AMOUNT_QUESTIONS_COLLECTION);

    let promisesArray = [];

    // * building the query promise for the promiseArray        //////////////////////////////////////////////////////////////
    for(let i = 0; i < array.length; i++){
      let questionNumber = array[i].toString().padStart(3, '0'); // turn the number in a string with 3 digit 0 pad;
      let docRef = db.collection("quizQuestions").doc(questionNumber)
      .get()
      .then((doc) => {
        if (doc.exists) {
            return doc.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        })
      .catch((error) => {
          console.log("Error getting document:", error);
      });
    // * ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
      promisesArray.push(docRef);
    }
     
    //  * wait fo Promise.all to return to assign the result to dbQuestionsImmutable
    return dbQuestionsImmutable = await Promise.all(promisesArray);

    }

  fetchingQuestionsData().then(() => {  
    
    if(dbQuestionsImmutable.length < AMOUNT_QUESTIONS_QUIZ){
      fetchAndStart(); // * call the fetchAndStart function again if the length of dbQuestionsImmutable is not the same than the AMOUNT_QUESTIONS_QUIZ
    } else {
      let dbQuestionsFiltered = dbQuestionsImmutable.filter(element => element !== undefined); // remove undefine elements from the dbQuestionsImmutable array;
      let startSlicing = dbQuestionsFiltered.length - 11;
      dbQuestions = dbQuestionsFiltered.slice(startSlicing); // *  removing excessed elements.

      getNewQuestion();// * After the response is assinged to dbQuestion the function getNewQuestion is call to start the game 
    }   
  });

}  





//* function helper to retrieve the image from the firebase database and set the background-image inline css property.
function getImageQuestion (currentQuestion) {
    let storage = firebase.storage();
  
    let gsReference = storage.refFromURL(`gs://londonquiz-f8499.appspot.com/${currentQuestion['pic']}`);
  
    gsReference.getDownloadURL()
    .then(function(url) {$imgQuestion.attr('src', `${url}`).attr('alt', `${currentQuestion['pic']}`)})
    .catch(function(error) {console.log(`an error happened when trying to access the image => ${error}`)});
  }


export {fetchAndStart, dbQuestions, AMOUNT_QUESTIONS_QUIZ, getImageQuestion};