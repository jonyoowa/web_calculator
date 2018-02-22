// Element Variables
let mainDisplay = document.getElementById("mainDisplay");
let oppDisplay = document.getElementById("opperationDisplay");

let calcButtons = document.getElementsByClassName("calcButton");
let numButtons = document.getElementsByClassName("numButton");

// Storage Variables 
let mainNum = 0;
let value1 = 0;
let value2 = 0;
let currOperation = "";


// Main 			//

addNumButtonEventHandling();
addCalcButtonEventHandling();

//					//


// Activate Buttons 
function addCalcButtonEventHandling() {
	for (let i = 0; i < calcButtons.length; ++i) {
		calcButtons[i].addEventListener("click", function() {
			enableCalcButtons(calcButtons[i].id);
		});
	}

	function enableCalcButtons(id) {
		switch(id) {
			case "clear":
				clear();
				break;
			case "delete":
				backspace();
				break;
			case "divide":
			case "multiply":
			case "subtract":
			case "add":
				operate(id);
				break;
			case "equals":
				equals();
				break;
		}
	}
}

// Clicking on a number button appends the value to the number on the main display (mainNum)
function addNumButtonEventHandling() {
	let numMap = {
		zero: 0, 
		one: 1,
		two: 2,
		three: 3, 
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9
	}

	for (let i = 0; i < numButtons.length; ++i) {
		numButtons[i].addEventListener("click", function() {
			let numValue = getNumValue(numButtons[i].id);
			value1 = (mainNum * 10) + numValue;
			updateMainNum(value1);
		});
	}

	function getNumValue(num) {
		return numMap[num];
	}
}


// Calculations


function updateMainNum(num) {
	mainNum = num;
	mainDisplay.innerHTML = mainNum;
}

function operate(operator) {
	console.log(operator + " operator");



	let sign = "";

	switch(operator) {
		case "divide":
			sign = "/";
			break;
		case "multiply":
			sign = "*"; 
			break;
		case "subtract":
			sign = "-";
			break;
		case "add":
			sign = "+"; 
			break;
	}

}

function equals() {

}

// Button Functions 
function clear() {
	console.log("clear!");
	updateMainNum(0);
	value1 = 0;
	value2 = 0;
	currOperation = "";
}

function backspace() {
	console.log("delete!");
	num = mainNum;
	num = Math.trunc(num / 10);
	updateMainNum(num);
}

function divide() {
	console.log("divide!");
}

function multiply() {
	console.log("multiply!");
}

function subtract() {
	console.log("subtract!");
}

function add() {
	console.log("add!");
}

function addDecimal() {

}
