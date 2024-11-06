(function Calculator() {
  const numbers = document.querySelectorAll("button[data-number]");
  const options = document.querySelectorAll("button[data-option]");
  const operators = document.querySelectorAll("button[data-operator]");
  const currNumInput = document.querySelector(".curr-num");
  const prevNumInput = document.querySelector(".prev-num");

  let currentNumber = "";
  let operator = "";
  let previousNumber = "";

  // binds events
  numbers.forEach((n) => {
    n.addEventListener("click", () => {
      if (n.textContent === "." && currentNumber.length === 0) {
        setCurrNum(`0.`);
      } else {
        setCurrNum(n.textContent);
      }
    });
  });

  operators.forEach((o) => {
    o.addEventListener("click", () => {
      if (operator) {
        operate();
      } else {
        previousNumber = currentNumber;
      }
      setOperator(o.dataset.operator);
      setPrevNum(currentNumber);
      highlightActiveOperator();
    });
  });

  options.forEach((o) => {
    o.addEventListener("click", () => {
      switch (o.dataset.option) {
        case "clr":
          clearAll();
          break;
        case "del":
          deleteNum();
          break;
        case "eql":
          operate();
          break;
      }
    });
  });

  function setCurrNum(value) {
    currentNumber += value;
    currNumInput.textContent = currentNumber;
  }

  function setPrevNum(value) {
    previousNumber = value;
    prevNumInput.textContent = previousNumber;
    currNumInput.textContent = "";
    currentNumber = "";
  }

  function setOperator(value) {
    operator = value;
  }

  function clearAll() {
    currentNumber = "";
    previousNumber = "";
    currNumInput.textContent = "";
    prevNumInput.textContent = "";
    operator = "";
    highlightActiveOperator(); // remove highlight since we clear the operator variable's value
  }

  function deleteNum() {
    if (currentNumber == "0.") {
      currentNumber = "";
    } else {
      currentNumber = currentNumber.slice(0, -1);
    }
    currNumInput.textContent = currentNumber;
  }

  function highlightActiveOperator() {
    operators.forEach((o) => {
      if (operator === o.dataset.operator) {
        o.classList.add("active");
      } else {
        o.classList.remove("active");
      }
    });
  }

  function operate() {
    if (!previousNumber || !currentNumber) return;
    let res;
    const num1 = +previousNumber;
    const num2 = +currentNumber;
    switch (operator) {
      case "add":
        res = num1 + num2;
        break;
      case "sub":
        res = num1 - num2;
        break;
      case "mul":
        res = num1 * num2;
        break;
      case "div":
        res = num1 / num2;
        break;
    }

    clearAll();
    // after clearing all the input we set the current number value to the result of the operation
    // to be used for the next operation
    setCurrNum(res);
  }
})();
