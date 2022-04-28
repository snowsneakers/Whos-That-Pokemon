// fetches pokeapi
getFetch();
// hides text and applys silhouette
hideInfo();
//submits users guess to see if they match or not
document.querySelector(".guess").addEventListener("click", checkWin);
//refreshes app to allow for more rounds of play
document.querySelector(".playAgain").addEventListener("click", playAgain);
//gets random pokemon from pokeAPI and adds sprite to dom
function getFetch() {
  let random = Math.floor(Math.random() * 151);
  const url = `https://pokeapi.co/api/v2/pokemon/${random}`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      document.querySelector("img").src = data.sprites.other["official-artwork"].front_default;
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
  guess.toLowerCase() === answer.toLowerCase() ? correct() : notCorrect()
}
//if correct changes input color, reveals pokemon, show play again button, hides submit button
function correct() {
  document.querySelector("input").style.backgroundColor = "#52b788";
  document.querySelector("img").style.filter = "brightness(1)";
  document.querySelector(".playAgain").style.display = "block";
  document.querySelector(".guess").style.display = "none";
}
//if correct changes input color, reveals pokemon, show play again button, hides submit button, fills the input with pokemons name
function notCorrect() {
  document.querySelector("input").style.backgroundColor = "#f07167";
  document.querySelector("img").style.filter = "brightness(1)";
  document.querySelector(".playAgain").style.display = "block";
  document.querySelector(".guess").style.display = "none";
  document.querySelector("input").value =
    document.querySelector("h1").innerText;
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
