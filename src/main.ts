import "./style.scss";
import { Question } from "./questionType";

/* Testing Buttons
 */

const button = document.querySelector<HTMLDivElement>("#apiCall");
const nextQuestionButton =
  document.querySelector<HTMLDivElement>("#nextQuestion");

/*
  Questions and Answer Contatiners
*/

const question = document.querySelector<HTMLHeadingElement>(".question__text");
const answerArray =
  document.querySelectorAll<HTMLHeadingElement>(".answer__text");

/*
  Answer Buttons
*/

if (!button || !nextQuestionButton) {
  throw new Error("there is an error with the selector");
}

if (!question || !answerArray) {
  throw new Error("there is an error with the questions or answers");
}

/* Global Variables
 */
let questionIndex = 0;

let questionArray: Question[] = [];

// Define the API URL
let apiBuiltUrl = "https://opentdb.com/api.php?amount=12&type=multiple";

// Make a GET request

async function APICall(apiUrl: string) {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("data", data);
      data.results.forEach((question: Question) => {
        questionArray.push(question);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return questionArray;
}

APICall(apiBuiltUrl);

const populateQuestionsAndAnswers = (sortedAnswers: string[]): void => {
  question.innerHTML = questionArray[questionIndex].question;

  for (let i: number = 0; i < sortedAnswers.length; i++) {
    answerArray[i].innerHTML = sortedAnswers[i];
  }
  console.log("populateQuestionsAndAnswers");
};

const sortAnswers = (question: Question) => {
  let answerArray: string[] = [];
  answerArray.push(question.correct_answer);
  question.incorrect_answers.forEach((answer: string) => {
    answerArray.push(answer);
  });
  answerArray.sort();
  return answerArray;
};

const startGame = () => {
  populateQuestionsAndAnswers(sortAnswers(questionArray[questionIndex]));
  questionIndex = questionIndex + 1;
};

const nextQuestion = () => {
  populateQuestionsAndAnswers();
  questionIndex = questionIndex + 1;
};

const answerSelected = (event: Event) => {
  const button = event.currentTarget as HTMLDivElement;
  if (button.innerHTML === questionArray[questionIndex].correct_answer) {
    console.log("correct answer");
    questionIndex = questionIndex + 1;
  } else {
    console.log("incorrect answer ");
  }
};

/*
  Event Listeners 
*/

button.addEventListener("click", startGame);
nextQuestionButton.addEventListener("click", nextQuestion);

answerArray.forEach((button) => {
  button.addEventListener("click", answerSelected);
});

/*
  TEST CODE
*/
