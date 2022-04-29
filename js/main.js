// fetches pokeapi
getFetch();
// hides text and applys silhouette
hideInfo();
// resets score and puts high score in dom from local storage
window.addEventListener("DOMContentLoaded", resetScore);
//submits users guess to see if they match or not
document.querySelector(".guess").addEventListener("click", checkWin);
//refreshes app to allow for more rounds of play
document.querySelector(".playAgain").addEventListener("click", playAgain);
//gets random pokemon from pokeAPI and adds sprite to dom
function getFetch() {
  //different generation of pokemon depending on which radio button is checked
  if (document.querySelector("#kanto").checked) {
    random = Math.floor(Math.random() * 151);
  } else if (document.querySelector("#johto").checked) {
    random = Math.floor(Math.random() * (251 - 152 + 1)) + 152;
  } else if (document.querySelector("#hoenn").checked) {
    random = Math.floor(Math.random() * (386 - 252 + 1)) + 252;
  } else if (document.querySelector("#sinnoh").checked) {
    random = Math.floor(Math.random() * (493 - 387 + 1)) + 387;
  } else if (document.querySelector("#unova").checked) {
    random = Math.floor(Math.random() * (649 - 494 + 1)) + 494;
  } else if (document.querySelector("#kalos").checked) {
    random = Math.floor(Math.random() * (721 - 650 + 1)) + 650;
  } else if (document.querySelector("#alola").checked) {
    random = Math.floor(Math.random() * (807 - 722 + 1)) + 722;
  } else if (document.querySelector("#galar").checked) {
    random = Math.floor(Math.random() * (905 - 808 + 1)) + 808;
  } else if (document.querySelector("#all").checked) {
    random = Math.floor(Math.random() * 898);
  }

  let regions = document.querySelectorAll('input[name="region"]');
  regions.forEach((x) => {
    x.addEventListener("change", () => {
      document.querySelector(".toast").innerText =
        "Your changes will apply to the next pokemon";
      setTimeout(() => {
        document.querySelector(".toast").innerText = "";
      }, 3000);
    });
  });

  const url = `https://pokeapi.co/api/v2/pokemon/${random}`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      document.querySelector("img").src =
        data.sprites.other["official-artwork"].front_default;
      document.querySelector("h1").innerText = data.name;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

//hides h1 value, play again button and adds silhouette to image
function hideInfo() {
  document.querySelector("h1").style.display = "none";
  document.querySelector(".playAgain").style.display = "none";
  document.querySelector("img").style.filter = "brightness(0)";
}

//checks win by seeing if user input value = pokemon name. calls correct if true and notCorrect if false
function checkWin() {
  let answer = document.querySelector("h1").innerText;
  let guess = document.querySelector("input").value;
  guess.toLowerCase() === answer.toLowerCase() ? correct() : notCorrect();
}

//if correct changes input color, reveals pokemon, show play again button, hides submit button
function correct() {
  document.querySelector("input").style.backgroundColor = "#52b788";
  document.querySelector("img").style.filter = "brightness(1)";
  document.querySelector(".playAgain").style.display = "block";
  document.querySelector(".guess").style.display = "none";
  scoreUp();
}
//if correct changes input color, reveals pokemon, show play again button, hides submit button, fills the input with pokemons name
function notCorrect() {
  document.querySelector("input").style.backgroundColor = "#f07167";
  document.querySelector("img").style.filter = "brightness(1)";
  document.querySelector(".playAgain").style.display = "block";
  document.querySelector(".guess").style.display = "none";
  document.querySelector("input").value = document.querySelector("h1").innerText;
  resetScore();
}

//refreshes input
function refreshInput() {
  if (document.querySelector("input").value) {
    document.querySelector("input").value = "";
    document.querySelector("input").style.backgroundColor = "white";
  }
}

//refeshes game
function playAgain() {
  getFetch();
  hideInfo();
  refreshInput();
  document.querySelector(".guess").style.display = "block";
}

//score stuff
let score = 0;

function scoreUp() {
  score++;
  let highscore = localStorage.getItem("highscore");
  if (highscore !== null) {
    if (score > highscore) {
      localStorage.setItem("highscore", score);
    }
  } else {
    localStorage.setItem("highscore", score);
  }
  document.querySelector(".score").innerText = score;
}

function resetScore() {
  score = 0;
  let highscore = localStorage.getItem("highscore");
  highscore === null ? (document.querySelector(".highScore").innerText = 0) : (document.querySelector(".highScore").innerText = highscore);
  document.querySelector(".score").innerText = score;
}
