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
const modal = document.querySelector<HTMLDivElement>(
  ".endGame__modalContainer"
);
const endOfGameMessage =
  document.querySelector<HTMLHeadingElement>(".endGame__text");
const playAgain =
  document.querySelector<HTMLButtonElement>(".endGameStartAgain");

const invisible = document.querySelector<HTMLParagraphElement>("#invisible");

//  QUESTION AND ANSWER SELECTORS
const questionContainer = document.querySelector<HTMLDivElement>(
  ".question__container"
);
const question = document.querySelector<HTMLHeadingElement>(".question__text");
const answerArray =
  document.querySelectorAll<HTMLHeadingElement>(".answer__text");
const answerContainer =
  document.querySelector<HTMLDivElement>(".answer__container");

// LIFELINE AND MONEYTREE SELECTORS
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

/*
  MOBILE ONLY SELECTORS
*/

const mobileMoneyIndicatorContainer = document.querySelector<HTMLDivElement>(
  ".moneyTree__container--mobile"
);

const mobileMoneyText = document.querySelector<HTMLHeadingElement>(
  ".moneyTree__text--mobile"
);

if (!mobileMoneyIndicatorContainer || !mobileMoneyText) {
  throw new Error(
    " there is something wrong with the mobile money tree indicator"
  );
}

/* GLOBAL VARIABLES
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
    });

  return questionArray;
}

APICall(apiBuiltUrl);

/* 
  CORE FUNCTIONALITY METHODS
*/

const populateQuestionsAndAnswers = (sortedAnswers: string[]): void => {
  question.innerHTML = questionArray[questionIndex].question;
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
  }
};

// checks button selected against correct answer
const answerSelected = (event: Event): void => {
  const button = event.currentTarget as HTMLDivElement;
  if (button.innerHTML === correctAnswer) {
    nextQuestion();
  } else {
    endGame();
  }
};

// the function that runs the process to the end the game
const endGame = () => {
  // remove questions from question array
  questionArray = [];

  // prepare screeen for end of game message
  setHTMLElementsToNone();

  // prepare message to show at end of game
  if (questionIndex === 14) {
    endOfGameMessage.innerHTML = "CONGRATULATIONS YOU HAVE WON";
  } else if (questionIndex === 0) {
    endOfGameMessage.innerHTML = `Unfortunately you failed to answer a single question correctly. you therfore go away with nothing`;
  } else if (questionIndex > 0 && questionIndex < 4) {
    endOfGameMessage.innerHTML = `You did not answer enough questions to get to the first safe point, therefore you win zero money`;
  } else if (questionIndex >= 4 && questionIndex < 8) {
    endOfGameMessage.innerHTML = `Congratulations you have won £1000`;
  } else if (questionIndex >= 9 && questionIndex < 14) {
    endOfGameMessage.innerHTML = `Unfortunately that answer was incorrect, however you did win quite a lot of money and will be taking home £32,000`;
  }

  // reveal end of game message
  modal.style.display = "block";

  // prepare questions and answers in case of starting again
  APICall(apiBuiltUrl);
  populateQuestionsAndAnswers(sortAnswers(questionArray[0]));
};

// prepare screeen for end of game message
const setHTMLElementsToNone = () => {
  questionContainer.style.display = "none";
  answerContainer.style.display = "none";
  lifeLineArray.forEach((lifeline) => {
    lifeline.style.display = "none";
  });
  mobileMoneyIndicatorContainer.style.display = "none";
};

/*
  Moneytree features 
*/

const updateMoneyTree = () => {
  moneyTreeArray[
    moneyTreeArray.length - questionIndex - 1
  ].style.backgroundColor = "purple";

  // for mobile
  mobileMoneyIndicatorContainer.style.display = "block";
  mobileMoneyText.innerHTML = moneyTreeArray[14 - questionIndex].innerHTML;
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
      fiftyFifty();
      button.style.display = "none";
      break;
    case "skip":
      skipQuestion();
      button.style.display = "none";
      break;
  }
};

/* 
  Testing Methods
/*/

const prepareHTMLForStartOfGame = () => {
  welcomeContainer.style.display = "none";
  questionContainer.style.display = "block";
  answerContainer.style.display = "block";
  answerArray.forEach((answer) => {
    answer.style.display = "block";
  });
  lifeLineArray.forEach((lifeline) => {
    lifeline.style.display = "block";
  });
  modal.style.display = "none";
};

const startGame = (): void => {
  questionIndex = 0;
  prepareHTMLForStartOfGame();

  updateMoneyTree();

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

answerArray.forEach((button) => {
  button.addEventListener("click", answerSelected);
});

lifeLineArray.forEach((lifeline) => {
  lifeline.addEventListener("click", lifelineSelected);
});

playAgain.addEventListener("click", startGame);
