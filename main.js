(() => {
  let container = document.querySelector(".container");

  let inputs = document.querySelector(".inputs");

  function beforeGames() {
    let inputForRow = document.querySelector(".input-1");
    let inputForColumn = document.querySelector(".input-2");

    function inputValue(inputValue) {
      console.log(inputValue);
      if (inputValue > 1 && inputValue < 11) {
        if (inputValue < 5) {
          return 4;
        } else if (inputValue % 2 !== 0) {
          return inputValue - 1;
        }
      } else {
        return 4;
      }
    }

    const rows = inputValue(inputForRow.value);
    const columns = inputValue(inputForColumn.value);
    let total = (rows * columns) / 2;

    return { rows, columns, total };
  }

  function createArr(number) {
    let arrNumbers = [];

    function arrGenered() {
      for (let i = 1; i <= number; i++) {
        arrNumbers.push(i);
        arrNumbers.push(i);
      }
    }

    arrGenered(arrNumbers);

    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    shuffle(arrNumbers);

    return arrNumbers;
  }

  function createElements(row, column, arr) {
    let cards = document.createElement("div");
    cards.classList.add("cards");
    container.append(cards);

    for (let i = 0; i < row; i++) {
      let row = document.createElement("div");
      row.classList.add("row");
      cards.append(row);
      for (let j = 0; j < column; j++) {
        let div = document.createElement("div");
        div.classList.add("div");
        row.append(div);
      }
    }

    let i = 0;

    for (let number of arr) {
      let divs = document.getElementsByClassName("div");
      let span = document.createElement("span");
      span.classList.add("span", "hidden");
      span.textContent = number;
      divs[i].append(span);
      i += 1;
    }
  }

  function startGame() {
    let count = 0;
    let newArr = [];
    let finishArr = [];

    let divs = document.querySelectorAll(".div");

    for (let div of divs) {
      let span = div.children[0];
      div.dataset.disabled = "false";

      div.addEventListener("click", () => {
        if (div.dataset.disabled === "false") {
          div.dataset.disabled = "true";
          div.style.backgroundImage = "none";
          span.classList.remove("hidden");
          count += 1;
          newArr.unshift(span.textContent);

          function comparingTwoNumbers() {
            if (count === 2) {
              count = 0;
              if (parseInt(newArr[0]) === parseInt(newArr[1])) {
                count = 0;
                finishArr.unshift(newArr[0]);
                finishArr.unshift(newArr[1]);
              } else {
                count = 0;
                for (let openDiv of divs) {
                  if (
                    openDiv.children[0].textContent === newArr[0] ||
                    openDiv.children[0].textContent === newArr[1]
                  ) {
                    let timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                      openDiv.style.backgroundImage = "url(card.jpg)";
                      openDiv.children[0].classList.add("hidden");
                      openDiv.dataset.disabled = "false";
                    }, 400);
                  }
                }
              }
            }
          }

          comparingTwoNumbers();

          function finishGame() {
            if (finishArr.length === divs.length) {
              finishArr.length = [];

              let cards = document.querySelector(".cards");
              cards.classList.add("hidden");
              cards.remove();

              let button = document.createElement("button");
              button.classList.add("button-finish");
              container.append(button);
              button.innerHTML = "Сыграть еще";

              button.addEventListener("click", () => {
                button.style.display = "none";
                inputs.classList.remove("hidden");
                let before = beforeGames();
                before.inputForRow.value = null;
                before.inputForColumn.value = null;
              });
            }
          }

          finishGame();
        }
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelector(".button");

    button.addEventListener("click", () => {
      inputs.classList.add("hidden");
      let values = beforeGames();
      let arr = createArr(values.total);
      createElements(values.rows, values.columns, arr);
      startGame();
    });
  });
})();
