import "./style.scss";

/* Query Selectors
 */
const app = document.querySelector<HTMLDivElement>("#app");

const button = document.querySelector<HTMLDivElement>("#apiCall");
const nextQuestionButton =
  document.querySelector<HTMLDivElement>("#nextQuestion");

const question = document.querySelector<HTMLHeadingElement>(".question__text");
const answers = document.querySelectorAll<HTMLHeadingElement>(".answer__text");

if (!app || !button || !nextQuestionButton) {
  throw new Error("there is an error with the selector");
}

if (!question || !answers) {
  throw new Error("there is an error with the questions or answers");
}

/* Global Variables
 */
let screenSelect = 0;
let questionIndex = 0;

/*
  API call to get questions 
*/

let questions: Object;

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
      console.log(data);
      questions = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return questions;
}

APICall(apiBuiltUrl);

/*
  Event Listeners 
*/

button.addEventListener("click", checkAPICall);
nextQuestionButton.addEventListener("click", nextQuestion);

const renderScreen = (screenSelect: number): void => {
  if (screenSelect === 0) {
    app.innerHTML = "SCREEN 0 WElCOME";
  } else if (screenSelect === 1) {
    app.innerHTML = "SCREEN 1 GAME SELECT ";
  } else if (screenSelect === 2) {
    app.innerHTML = "SCREEN 2 LOG IN ";
  } else if (screenSelect === 3) {
    console.log("SCREEN 3 GAMEPLAY");
    app.innerHTML = screenThreeRender;
  }
};

let screenThreeRender: string = `      
<section class="background__container">
<!-- LEFT HAND SIDE COLUMN TO GO HERE  -->
<section class="timerScore__container">
  <div class="userName"></div>
  <div class="timer"></div>
</section>
<!-- QUESTION AND ANSWER GROUP -->
<section class="questionAndAnswer__container">
  <div class="question__div">
    <h1>QUESTION TEXT</h1>
  </div>
  <div class="answer__divContainer">
    <div class="answer__div">
      <h1 class="answer__text">ANSWER 1</h1>
    </div>
    <div class="answer__div">
      <h1 class="answer__text">ANSWER 2</h1>
    </div>
    <div class="answer__div">
      <h1 class="answer__text">ANSWER 3</h1>
    </div>
    <div class="answer__div">
      <h1 class="answer__text">ANSWER 4</h1>
    </div>
  </div>
</section>
<!-- MONEY TREE  -->
<section class="moneyTree__container">
  <div class="lifeLine__Container">
    <div class="lineline"></div>
    <div class="lineline"></div>
    <div class="lineline"></div>
  </div>
  <div class="moneytree__textContainer">
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
    <h2 class="moneyTree__text"></h2>
  </div>
</section>
<section class="background__container">
<!-- LEFT HAND SIDE COLUMN TO GO HERE  -->
<!-- <section class="timerScore__container">
  <div class="userName">Username</div>
  <div class="timer">Timer</div>
</section> -->
<!-- QUESTION AND ANSWER GROUP -->
<section class="questionAndAnswer__container">
  <div class="question__container">
    <h1>QUESTION TEXT</h1>
  </div>
  <div class="answer__container">
    <h1 class="answer__text">ANSWER 1</h1>
    <h1 class="answer__text">ANSWER 2</h1>
    <h1 class="answer__text">ANSWER 3</h1>
    <h1 class="answer__text">ANSWER 4</h1>
  </div>
</section>
<!-- MONEY TREE  -->
<section class="moneyTree__container">
  <div class="lifeline__container">
    <img class="lifeline__img" src='./src/images/phoneafriendwebp.webp'></img>
    <img class="lifeline__img" src='./src/images/asktheaudience.webp'></img>
    <img class="lifeline__img" src='./src/images/5050.webp'></img>
  </div>
  <div class="moneytree__textContainer">
    <h2 class="moneyTree__text">15 1,000,000</h2>
    <h2 class="moneyTree__text">14 500,000</h2>
    <h2 class="moneyTree__text">13 250,000</h2>
    <h2 class="moneyTree__text">12 125,000</h2>
    <h2 class="moneyTree__text">11 64,000</h2>
    <h2 class="moneyTree__text">10 32,000</h2>
    <h2 class="moneyTree__text">9 16,000</h2>
    <h2 class="moneyTree__text">8 8000</h2>
    <h2 class="moneyTree__text">7 4000</h2>
    <h2 class="moneyTree__text">6 2000</h2>
    <h2 class="moneyTree__text">5 1000</h2>
    <h2 class="moneyTree__text">4 500</h2>
    <h2 class="moneyTree__text">3 300</h2>
    <h2 class="moneyTree__text">2 200</h2>
    <h2 class="moneyTree__text">1 100</h2>
  </div>
</section>
</section>`;

/*
  TEST CODE
*/

const sortQuestions = (APIResults: Object) => {
  const questionArray: Object[] = [];
  const easyQuestions: String[] = APIResults.results.filter(
    (question: Object) => {
      return question.difficulty === "easy";
    }
  );
  const mediumQuestions: String[] = APIResults.results.filter(
    (question: Object) => {
      return question.difficulty === "medium";
    }
  );
  const hardQuestions: String[] = APIResults.results.filter(
    (question: Object) => {
      return question.difficulty === "easy";
    }
  );
  easyQuestions.forEach((question) => {
    questionArray.push(question);
  });
  mediumQuestions.forEach((question) => {
    questionArray.push(question);
  });
  hardQuestions.forEach((question) => {
    questionArray.push(question);
  });
  return questionArray;
};

// sort answers
const sortAnswers = (arrayOfQuestions: Object[]) => {
  arrayOfQuestions.forEach((question) => {});
};

const nextQuestion = (arrayOfQuestions: Object[], questionIndex: number) => {
  screenThreeRender = `<section class="background__container">
  <!-- LEFT HAND SIDE COLUMN TO GO HERE  -->
  <section class="timerScore__container">
    <div class="userName"></div>
    <div class="timer"></div>
  </section>
  <!-- QUESTION AND ANSWER GROUP -->
  <section class="questionAndAnswer__container">
    <div class="question__div">
      <h1>${arrayOfQuestions[questionIndex].question}</h1>
    </div>
    <div class="answer__divContainer">
      <div class="answer__div">
        <h1 class="answer__text">ANSWER 1</h1>
      </div>
      <div class="answer__div">
        <h1 class="answer__text">ANSWER 2</h1>
      </div>
      <div class="answer__div">
        <h1 class="answer__text">ANSWER 3</h1>
      </div>
      <div class="answer__div">
        <h1 class="answer__text">ANSWER 4</h1>
      </div>
    </div>
  </section>
  <!-- MONEY TREE  -->
  <section class="moneyTree__container">
    <div class="lifeLine__Container">
      <div class="lineline"></div>
      <div class="lineline"></div>
      <div class="lineline"></div>
    </div>
    <div class="moneytree__textContainer">
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
      <h2 class="moneyTree__text"></h2>
    </div>
  </section>
  <section class="background__container">
  <!-- LEFT HAND SIDE COLUMN TO GO HERE  -->
  <!-- <section class="timerScore__container">
    <div class="userName">Username</div>
    <div class="timer">Timer</div>
  </section> -->
  <!-- QUESTION AND ANSWER GROUP -->
  <section class="questionAndAnswer__container">
    <div class="question__container">
      <h1>QUESTION TEXT</h1>
    </div>
    <div class="answer__container">
      <h1 class="answer__text">ANSWER 1</h1>
      <h1 class="answer__text">ANSWER 2</h1>
      <h1 class="answer__text">ANSWER 3</h1>
      <h1 class="answer__text">ANSWER 4</h1>
    </div>
  </section>
  <!-- MONEY TREE  -->
  <section class="moneyTree__container">
    <div class="lifeline__container">
      <img class="lifeline__img" src='./src/images/phoneafriendwebp.webp'></img>
      <img class="lifeline__img" src='./src/images/asktheaudience.webp'></img>
      <img class="lifeline__img" src='./src/images/5050.webp'></img>
    </div>
    <div class="moneytree__textContainer">
      <h2 class="moneyTree__text">15 1,000,000</h2>
      <h2 class="moneyTree__text">14 500,000</h2>
      <h2 class="moneyTree__text">13 250,000</h2>
      <h2 class="moneyTree__text">12 125,000</h2>
      <h2 class="moneyTree__text">11 64,000</h2>
      <h2 class="moneyTree__text">10 32,000</h2>
      <h2 class="moneyTree__text">9 16,000</h2>
      <h2 class="moneyTree__text">8 8000</h2>
      <h2 class="moneyTree__text">7 4000</h2>
      <h2 class="moneyTree__text">6 2000</h2>
      <h2 class="moneyTree__text">5 1000</h2>
      <h2 class="moneyTree__text">4 500</h2>
      <h2 class="moneyTree__text">3 300</h2>
      <h2 class="moneyTree__text">2 200</h2>
      <h2 class="moneyTree__text">1 100</h2>
    </div>
  </section>
  </section>`;
};

function checkAPICall() {
  let arrayOfQuestions: Object = sortQuestions(questions);
  console.log(questions.results);
  sortQuestions(arrayOfQuestions);
  sortAnswers(arrayOfQuestions);
  nextQuestion(arrayOfQuestions);
}
