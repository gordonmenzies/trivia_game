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
  app.innerHTML = "Screen 3 GAMEPLAY ";
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
