import "./style.scss";
import { Question } from "./questionType";

/*
  Event Listeners
*/

//  Testing Buttons

const button = document.querySelector<HTMLDivElement>("#apiCall");
const nextQuestionButton =
  document.querySelector<HTMLDivElement>("#nextQuestion");

//  Questions and Answer Contatiners

const question = document.querySelector<HTMLHeadingElement>(".question__text");
const answerArray =
  document.querySelectorAll<HTMLHeadingElement>(".answer__text");

//  Lifelines & Moneytree

const lifeLineArray =
  document.querySelectorAll<HTMLImageElement>(".lifeline__img");
const moneyTreeArray =
  document.querySelectorAll<HTMLHeadingElement>(".moneyTree__text");

if (!button || !nextQuestionButton) {
  throw new Error("there is an error with the selector");
}

if (!question || !answerArray) {
  throw new Error("there is an error with the questions or answers");
}

if (!lifeLineArray || !moneyTreeArray) {
  throw new Error("there is an error with the lifelines or moneytree");
}

/* Global Variables
 */
let questionIndex = 0;

let questionArray: Question[] = [];

let correctAnswer: string = "";

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

/* 
  Core Functionality Methods 
*/

const populateQuestionsAndAnswers = (sortedAnswers: string[]): void => {
  question.innerHTML = questionArray[questionIndex].question;

  for (let i: number = 0; i < sortedAnswers.length; i++) {
    answerArray[i].innerHTML = sortedAnswers[i];
  }
};

// shuffles answers so they don't appear in same position each time
const sortAnswers = (question: Question) => {
  let answerArray: string[] = [];
  answerArray.push(question.correct_answer);
  question.incorrect_answers.forEach((answer: string) => {
    answerArray.push(answer);
  });
  answerArray.sort();
  correctAnswer = question.correct_answer;
  return answerArray;
};

// increases question index by 1 and repopulates questions and answers
const nextQuestion = (): void => {
  questionIndex = questionIndex + 1;
  populateQuestionsAndAnswers(sortAnswers(questionArray[questionIndex]));
  updateMoneyTree();

  // check required for removed options due to use of Fiftyfifty
  answerArray.forEach((answer) => {
    answer.style.display = "block";
  });
  console.log(questionArray[questionIndex].correct_answer);
};

// checks button selected against correct answer
const answerSelected = (event: Event): void => {
  const button = event.currentTarget as HTMLDivElement;
  if (button.innerHTML === correctAnswer) {
    console.log("correct answer");
    nextQuestion();
  } else {
    console.log("incorrect answer ");
  }
};

/*
  Lifeline Features
*/

// Remove two answers
const fiftyFifty = () => {
  let i: number = 0;
  while (i < 4) {
    if (
      answerArray[i].innerHTML !== questionArray[questionIndex].correct_answer
    ) {
      answerArray[i].style.display = "none";
      i++;
    }
    i++;
  }
};

// control flow for selecting and removing lifelines
const lifelineSelected = (event: Event): void => {
  const button = event.currentTarget as HTMLImageElement;
  switch (button.id) {
    case "fiftyFifty":
      console.log("fiftyfifty");
      fiftyFifty();
      button.style.display = "none";
      break;
  }
};

/*
  Moneytree features 
*/

const updateMoneyTree = () => {
  moneyTreeArray[
    moneyTreeArray.length - questionIndex - 1
  ].style.backgroundColor = "purple";
};

/* 
  Testing Methods
/*/

const startGame = (): void => {
  populateQuestionsAndAnswers(sortAnswers(questionArray[questionIndex]));
  updateMoneyTree();
  console.log(questionArray[questionIndex].correct_answer);
};

const nextQuestionTestMethod = (): void => {
  nextQuestion();
  if (questionIndex === 16) {
    //endGame();
  }
};

/*
  Event Listeners 
*/

button.addEventListener("click", startGame);
nextQuestionButton.addEventListener("click", nextQuestionTestMethod);

answerArray.forEach((button) => {
  button.addEventListener("click", answerSelected);
});

lifeLineArray[2].addEventListener("click", lifelineSelected);

/*
  TEST CODE
*/
