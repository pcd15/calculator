function switchMode() {
    lightMode = !lightMode;
    lightMode ? toggle.innerHTML = `<img src="img/sun.svg" alt="sun icon" class="icon">` : toggle.innerHTML = `<img src="img/moon.svg" alt="moon icon" class="icon">`;
    document.body.classList.toggle("dark");
    display.classList.toggle("dark-display");
    for (let button of buttons) {
        button.classList.toggle('dark-button');
    }
}

let lightMode = true;
const toggle = document.querySelector('#toggle');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
toggle.addEventListener('click', switchMode);

function updateDisplay() {
    if (count == 0) {
        first += this.id;
        result.textContent = first;
    } else {
        second += this.id;
        result.textContent = second;
    }
}

function handleSign() {
    if (first === "" || (second === "" && count == 1)) {
        return;
    } else if (count == 1) {
        equals();
        sign = this.id;
    } else {
        sign = this.id;
        firstNum = Number(first);
        result.textContent = "";
        currExpression.push(firstNum);
        currExpression.push(sign);
        count++;
    }
}

// fix: 
// * operations are always undefined
// * change currExpression from array to string
// * change how currExpression is formatted (comes partly w/ changing from array to string)

// with delete, don't worry about removing signs (only ends of numbers)
// C just resets everything (hopefully this is easy to implement)
// maybe add check that prevents user from entering more than 10 digits per number (e.g., str.length === 10)?

function equals() {
    if (first === "" || second === "") {
        return;
    } else {
        secondNum = Number(second);
        currExpression.push(secondNum);
        expression.textContent = currExpression.toString();
        if (sign === "plus") {
            firstNum += secondNum;
        } else if (sign === "minus") {
            firstNum -= secondNum;
        } else if (sign === "multiply") {
            firstNum *= secondNum;
        } else {
            firstNum /= secondNum;
        }
        result.textContent = toString(firstNum);
        currExpression = [];
        currExpression.push(toString(firstNum));
        secondNum = -1;
        sign = "";
        count = 0;
    }
}

let count = 0;
let sign = "";
let currExpression = [];
let first = "";
let second = "";
let firstNum = -1;
let secondNum = -1;

const expression = document.querySelector('#expression');
const result = document.querySelector('#result');

const numBtns = document.querySelectorAll('.num');
numBtns.forEach(button => button.addEventListener('click', updateDisplay));

const signBtns = document.querySelectorAll('.sign');
signBtns.forEach(button => button.addEventListener('click', handleSign));

const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', equals);