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
    if (afterEquals || (count == 0 && first.length == 10) || (count == 1 && second.length == 10)) {
        return;
    } else if (count == 0) {
        first += this.id;
        result.textContent = first;
    } else {
        second += this.id;
        result.textContent = second;
    }
}

function getSign() {
    if (sign === "plus") {
        return " + ";
    } else if (sign === "minus") {
        return " - ";
    } else if (sign === "multiply") {
        return " x ";
    } else {
        return " / ";
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
        result.textContent = "";
        currExpression += first;
        currExpression += getSign();
        count++;
        if (afterEquals) {
            expression.textContent = "";
            afterEquals = false;
            afterSign = false;
        }
        if (afterSign) {
            afterSign = false;
        }
    }
}

function equals() {
    if (first === "" || second === "") {
        return;
    } else {
        currExpression += second;
        expression.textContent = currExpression;
        if (sign === "plus") {
            num = Number(first) + Number(second);
        } else if (sign === "minus") {
            num = Number(first) - Number(second);
        } else if (sign === "multiply") {
            num = Number(first) * Number(second);
        } else {
            num = Number(first) / Number(second);
        }
        num = Math.round(num * 100) / 100;
        first = num.toString();
        result.textContent = first;
        currExpression = "";
        sign = "";
        second = "";
        count = 0;
        afterEquals = true;
        afterSign = true;
    }
}

function deletePrev() {
    if (afterSign || first === "" || (second === "" && count == 1)) {
        return;
    } else if (count == 0) {
        first = first.substring(0, first.length - 1);
        result.textContent = first;
        currExpression = currExpression.substring(0, currExpression.length - 1);
    } else {
        second = second.substring(0, second.length - 1);
        result.textContent = second;
        currExpression = currExpression.substring(0, currExpression.length - 1);
    }
}

function reset() {
    result.textContent = "";
    expression.textContent = "";
    afterEquals = false;
    afterSign = false;
    count = 0;
    num = 0;
    first = "";
    sign = "";
    second = "";
    currExpression = "";
}

let afterEquals = false;
let afterSign = false;
let count = 0;
let num = 0;
let first = "";
let sign = "";
let second = "";
let currExpression = "";

const expression = document.querySelector('#expression');
const result = document.querySelector('#result');

const numBtns = document.querySelectorAll('.num');
numBtns.forEach(button => button.addEventListener('click', updateDisplay));

const signBtns = document.querySelectorAll('.sign');
signBtns.forEach(button => button.addEventListener('click', handleSign));

const equalsBtn = document.querySelector('#equals');
equalsBtn.addEventListener('click', equals);

const clear = document.querySelector('#clear');
clear.addEventListener('click', reset);

const deleteBtn = document.querySelector('#delete');
deleteBtn.addEventListener('click', deletePrev);