import "./styles/style.scss";
import { Question } from "./questionType";

/*
  Event Listeners
*/

//  Testing Buttons

const button = document.querySelector<HTMLDivElement>("#apiCall");
const nextQuestionButton =
  document.querySelector<HTMLDivElement>("#nextQuestion");

const modal = document.querySelector<HTMLDivElement>(
  ".endGame__modalContainer"
);
const modalButton = document.querySelector<HTMLButtonElement>("#myBtn");
const endOfGameMessage =
  document.querySelector<HTMLHeadingElement>(".endGameText");

const questionContainer = document.querySelector<HTMLDivElement>(
  ".question__container"
);
const answerContainer =
  document.querySelector<HTMLDivElement>(".answer__container");

//  Questions and Answer Containers

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

const invisible = document.querySelector<HTMLParagraphElement>("#invisible");

if (!invisible) {
  throw new Error("there is an error with invisible");
}

if (
  !modal ||
  !modalButton ||
  !questionContainer ||
  !answerContainer
  // !endOfGameMessage
) {
  throw new Error("there is something wrong with the modal");
}

/* Global Variables
 */
let questionIndex = 0;
let questionArray: Question[] = [];
let correctAnswer: string = "";

// Define the API URL
let apiBuiltUrl = "https://opentdb.com/api.php?amount=15&type=multiple";

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
  console.log("sorted Answers", sortedAnswers);
  for (let i: number = 0; i < sortedAnswers.length; i++) {
    answerArray[i].innerHTML = sortedAnswers[i];
  }
};

// handle special characters being encoded when selecting the correct answer
const handleHTMLEncoding = (needEncoding: string[]): string[] => {
  const unescapedArray: string[] = [];
  needEncoding.forEach((string) => {
    invisible.innerHTML = string;
    // console.log(string);
    unescapedArray.push(invisible.innerHTML);
  });
  // console.log(unescapedArray);
  return unescapedArray;
};

// shuffles answers so they don't appear in same position each time
const sortAnswers = (question: Question) => {
  let answerArray: string[] = [];
  answerArray.push(question.correct_answer);
  correctAnswer = handleHTMLEncoding(answerArray)[0];
  console.log("correct answer in answer Array", answerArray[0]);
  question.incorrect_answers.forEach((answer: string) => {
    answerArray.push(answer);
  });
  answerArray.sort();
  answerArray = handleHTMLEncoding(answerArray);
  console.log("escaped correct answer", correctAnswer);
  console.log("escaped Answer array", answerArray);
  return answerArray;
};

// increases question index by 1 and repopulates questions and answers
const nextQuestion = (): void => {
  if (questionIndex === 15) {
    endGame();
  } else {
    questionIndex = questionIndex + 1;
    populateQuestionsAndAnswers(sortAnswers(questionArray[questionIndex]));
    updateMoneyTree();

    // check required for removed options due to use of Fiftyfifty
    answerArray.forEach((answer) => {
      answer.style.display = "block";
    });
    console.log(questionIndex);
    console.log(correctAnswer);
  }
};

// checks button selected against correct answer
const answerSelected = (event: Event): void => {
  const button = event.currentTarget as HTMLDivElement;
  if (button.innerHTML === correctAnswer) {
    console.log("correct answer");
    nextQuestion();
  } else {
    endGame();
    console.log("incorrect answer ");
  }
};

const endGame = () => {
  questionContainer.style.display = "none";
  answerContainer.style.display = "none";
  lifeLineArray.forEach((lifeline) => {
    lifeline.style.display = "none";
  });
  if (questionIndex > 15) {
    endOfGameMessage.innerHTML = "CONGRATULATIONS YOU HAVE WON";
  } else {
    endOfGameMessage.innerHTML = `Unfortunately that answer was incorrect, however you did win $${
      moneyTreeArray[15 - questionIndex].innerHTML
    }
                                  perhaps you can be satisfied with your performance`;
  }

  modal.style.display = "block";
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

  console.log(questionArray);
  console.log(correctAnswer);
};

const nextQuestionTestMethod = (): void => {
  nextQuestion();
  if (questionIndex === 16) {
    endGame();
  }
};

const endGameTestMethod = (): void => {
  questionContainer.style.display = "none";
  answerContainer.style.display = "none";
  lifeLineArray.forEach((lifeline) => {
    lifeline.style.display = "none";
  });
  modal.style.display = "block";
};

/*
  Event Listeners 
*/

button.addEventListener("click", startGame);
nextQuestionButton.addEventListener("click", nextQuestionTestMethod);
modalButton.addEventListener("click", endGameTestMethod);

answerArray.forEach((button) => {
  button.addEventListener("click", answerSelected);
});

lifeLineArray[2].addEventListener("click", lifelineSelected);
