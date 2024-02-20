// Basic calculator functions
function add(num1, num2){
    return num1 + num2;
}

function substract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if(num2 === 0) return 'Err';
    return num1 / num2;
}

const  calculator = {
    "+": add,
    "-" : substract,
    "*" : multiply,
    "/" : divide
}


let firstNumber = null;
let operator = null;
let secondNumber = null;
let decimalEntered = false;

function operate(operator, num1, num2){
    return calculator[operator](parseFloat(num1), parseFloat(num2));
}

// console.log(operate("+", 2, 4));


const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.result');
const reset = document.querySelector('.reset-btn');
const operators = document.querySelectorAll('.operator');
const negativeOperator = document.querySelector('.negative');


reset.addEventListener('click', clear);
numbers.forEach(number => {
    number.addEventListener('click', addNumber);
});

operators.forEach(operand => {
    operand.addEventListener('click', addOperator)
});

// IF there is no first number, assign the number to first
//if first number exist, but there no operator concatenate the first number
// but if first number exist and operator also exit, assign the number to the second number
function addNumber(event) {
    const input = event.target.innerText;
    if(input === '.'){
        if(!firstNumber && !decimalEntered){
            // If there is no first number, assign the number to first
            firstNumber = '0'+input;
            result.innerText = firstNumber;
        } else if ((firstNumber && !operator) && !decimalEntered) {
            firstNumber = firstNumber.toString() + input;
            result.innerText = firstNumber;
        } else if ((firstNumber && operator) && !decimalEntered) {
            secondNumber = secondNumber? secondNumber.toString() + input : '0' + input;
            result.innerText = secondNumber;
        }
        decimalEntered = true;
    } else {
        if(!firstNumber){
            // If there is no first number, assign the number to first
            firstNumber = input;
            result.innerText = firstNumber;
        } else if (firstNumber && !operator) {
            firstNumber = firstNumber.toString() + input;
            result.innerText = firstNumber;
        } else if (firstNumber && operator) {
            secondNumber = secondNumber? secondNumber.toString() + input : input;
            result.innerText = secondNumber;
        }
    }
    
};

function addOperator(event){
    const input = event.target.innerText;
    if(input == '='){
        if (firstNumber && secondNumber && operator){
            result.innerText = operate(operator, firstNumber, secondNumber);
            firstNumber = null;
            secondNumber = null;
            operator = null;
        }
    } else if(input === '+/-'){
        if(secondNumber){
            secondNumber = -1*secondNumber;
            result.innerText = secondNumber;
        } else if (firstNumber){
            firstNumber = -1*firstNumber;
            result.innerHTML = firstNumber;
        }

    } else if (input === '%'){
        if(secondNumber) {
            secondNumber = operate('/', parseFloat(secondNumber), 100);
            result.innerText = secondNumber;
        } else if(firstNumber){
            firstNumber = operate('/', parseFloat(firstNumber), 100);
            result.innerText = firstNumber;
        }
    } else {
        if(firstNumber && secondNumber) {
            firstNumber = operate(operator, firstNumber, secondNumber);
            operator = input;
            secondNumber = null;
        } else if( firstNumber && !secondNumber) {
            operator = input;
        }
    }
    
    decimalEntered = false;
};

// Reset or Clear function
function clear(){
    result.innerText = '';
    decimalEntered = false;
    firstNumber = null;
    secondNumber = null;
    operator = null;
}