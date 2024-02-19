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
   

    if(!firstNumber){
        // If there is no first number, assign the number to first
        firstNumber = event.target.innerText;
        result.innerText = firstNumber;
        console.log(`first Number is: ${firstNumber}`);
        console.log(`Operator is: ${operator}`);
    } else if (firstNumber && !operator) {
        firstNumber = firstNumber.toString() + event.target.innerText;
        result.innerText = firstNumber;
        console.log(`first Number is: ${firstNumber}`);
        console.log(`Operator is: ${operator}`);
    } else if (firstNumber && operator) {
        secondNumber = secondNumber? secondNumber.toString() + event.target.innerText : event.target.innerText;
        result.innerText = secondNumber
        console.log(`first Number is: ${firstNumber}`);
        console.log(`second Number is: ${secondNumber}`);
        console.log(`Operator is: ${operator}`);
    }

    
    
};

function addOperator(event){
    const functionOperand = event.target.innerText;
    if (functionOperand !== '='){
        if(firstNumber && secondNumber) {
            firstNumber = operate(operator, firstNumber, secondNumber);
            operator = functionOperand;
            secondNumber = null;
        } else if( firstNumber && !secondNumber) {
            operator = functionOperand;
        }
    } else {
        if (firstNumber && secondNumber && operator){
            result.innerText = operate(operator, firstNumber, secondNumber);
            firstNumber = null;
            secondNumber = null;
            operator = null;

            console.log(`first Number is: ${firstNumber}`);
            console.log(`second Number is: ${secondNumber}`);
            console.log(`Operator is: ${operator}`);
        }
    }
};

// Reset or Clear function
function clear(){
    result.innerText = '';
}