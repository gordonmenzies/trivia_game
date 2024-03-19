import "./styles/style.scss";
import { Question } from "./questionType";

/*
  Event Listeners
*/

//  WELCOME SELECTORS

const startGameButton = document.querySelector<HTMLDivElement>(".startGame");
const welcomeContainer = document.querySelector<HTMLDivElement>(
  ".welcome__container"
);

// ENDGAME SELECTORS

// const nextQuestionButton =
//   document.querySelector<HTMLDivElement>("#nextQuestion");
const modal = document.querySelector<HTMLDivElement>(
  ".endGame__modalContainer"
);
// const modalButton = document.querySelector<HTMLButtonElement>("#myBtn");
const endOfGameMessage =
  document.querySelector<HTMLHeadingElement>(".endGame__text");
const playAgain =
  document.querySelector<HTMLButtonElement>(".endGameStartAgain");

const invisible = document.querySelector<HTMLParagraphElement>("#invisible");

//  Questions and Answer Containers
const questionContainer = document.querySelector<HTMLDivElement>(
  ".question__container"
);
const question = document.querySelector<HTMLHeadingElement>(".question__text");
const answerArray =
  document.querySelectorAll<HTMLHeadingElement>(".answer__text");
const answerContainer =
  document.querySelector<HTMLDivElement>(".answer__container");

//  Lifelines & Moneytree
const lifeLineArray =
  document.querySelectorAll<HTMLImageElement>(".lifeline__img");
const moneyTreeArray =
  document.querySelectorAll<HTMLHeadingElement>(".moneyTree__text");

if (!startGameButton) {
  throw new Error("there is an error with the selector");
}

if (!question || !answerArray) {
  throw new Error("there is an error with the questions or answers");
}

if (!lifeLineArray || !moneyTreeArray) {
  throw new Error("there is an error with the lifelines or moneytree");
}

if (!invisible || !welcomeContainer) {
  throw new Error("there is an error with invisible or welcome container");
}

if (!modal || !questionContainer || !answerContainer) {
  throw new Error("there is something wrong with the modal");
}

if (!endOfGameMessage || !playAgain) {
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
      console.log("returned object", data);
      data.results.forEach((question: Question) => {
        questionArray.push(question);
      });
      console.log("question array", questionArray);
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
    unescapedArray.push(invisible.innerHTML);
  });
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
  return answerArray;
};

// increases question index by 1 and repopulates questions and answers
const nextQuestion = (): void => {
  questionIndex = questionIndex + 1;
  if (questionIndex === 15) {
    endGame();
  } else {
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
  questionArray = [];
  console.log("question array end game", questionArray);
  questionContainer.style.display = "none";
  answerContainer.style.display = "none";
  lifeLineArray.forEach((lifeline) => {
    lifeline.style.display = "none";
  });
  if (questionIndex === 15) {
    endOfGameMessage.innerHTML = "CONGRATULATIONS YOU HAVE WON";
  } else {
    endOfGameMessage.innerHTML = `Unfortunately that answer was incorrect, however you did win $${
      moneyTreeArray[14 - questionIndex].innerHTML
    }
                                  perhaps you can be satisfied with your performance`;
  }
  modal.style.display = "block";
  APICall(apiBuiltUrl);
  populateQuestionsAndAnswers(sortAnswers(questionArray[0]));
  console.log("questionArray", questionArray);
};

/*
  Moneytree features 
*/

const updateMoneyTree = () => {
  console.log("questionIndex", questionIndex);
  moneyTreeArray[
    moneyTreeArray.length - questionIndex - 1
  ].style.backgroundColor = "purple";
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

const skipQuestion = () => {
  questionIndex = questionIndex + 1;
  populateQuestionsAndAnswers(sortAnswers(questionArray[questionIndex]));
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
    case "skip":
      console.log("skip");
      skipQuestion();
      button.style.display = "none";
      break;
  }
};

/* 
  Testing Methods
/*/

const startGame = (): void => {
  questionIndex = 0;
  updateMoneyTree();
  welcomeContainer.style.display = "none";
  questionContainer.style.display = "block";
  answerContainer.style.display = "block";
  answerArray.forEach((answer) => {
    answer.style.display = "block";
  });
  lifeLineArray.forEach((lifeline) => {
    lifeline.style.display = "inline";
  });
  modal.style.display = "none";
  populateQuestionsAndAnswers(sortAnswers(questionArray[questionIndex]));
  moneyTreeArray.forEach((item) => {
    item.style.backgroundColor = "navy";
  });
  console.log(correctAnswer);
};

/*
  Event Listeners 
*/

startGameButton.addEventListener("click", startGame);
// nextQuestionButton.addEventListener("click", nextQuestionTestMethod);
// modalButton.addEventListener("click", endGameTestMethod);

answerArray.forEach((button) => {
  button.addEventListener("click", answerSelected);
});

lifeLineArray.forEach((lifeline) => {
  lifeline.addEventListener("click", lifelineSelected);
});

playAgain.addEventListener("click", startGame);

/* Timer
 */
let timeLeft = 30;
const timer = document.querySelector(".timer__text");

if (!timer) {
  throw new Error("there is something wrong with the timer");
}

const countdown = () => {
  if (timeLeft == 0) {
    clearTimeout(timerId);
  } else {
    timer.innerHTML = String(timeLeft);
    timeLeft--;
  }
};

let timerId = setInterval(countdown, 1000);
