import "./style.scss";

/* Query Selectors
 */
const app = document.querySelector<HTMLDivElement>("#app");
const button = document.querySelector<HTMLDivElement>("#apiCall");

if (!app || !button) {
  throw new Error("there is an error with the selector");
}

/* Global Variables
 */
let screenSelect = 0;

/* SCREEN SELECTION
 */

if (screenSelect === 0) {
  app.innerHTML = "SCREEN 0 WElCOME";
} else if (screenSelect === 1) {
  app.innerHTML = "SCREEN 1 GAME SELECT ";
} else if (screenSelect === 2) {
  app.innerHTML = "SCREEN 2 LOG IN ";
} else if (screenSelect === 3) {
  console.log("SCREEN 3 GAMEPLAY");
  app.innerHTML = 
}

/*
  API call to get questions 
*/

let questions: Object;

async function APICall() {
  // Define the API URL
  const apiUrl = "https://opentdb.com/api.php?amount=12&type=multiple";

  // Make a GET request
  console.log(
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
      })
  );
}

APICall();

/*
  Event Listeners 
*/

function checkAPICall() {
  console.log(questions);
}

button.addEventListener("click", checkAPICall);

const screenThreeRender: string = `      
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
</section>`;