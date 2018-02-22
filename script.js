// Element Variables
let mainDisplay = document.getElementById("mainDisplay");
let operDisplay = document.getElementById("operationDisplay");

let calcButtons = document.getElementsByClassName("calcButton");
let numButtons = document.getElementsByClassName("numButton");

// Enumerations 
let operationEnum = {
	"divide": "/",
	"multiply": "*",
	"subtract": "-",
	"add": "+"
}

let numEnum = {
	"zero": 0,
	"one": 1,
	"two": 2,
	"three": 3,
	"four": 4,
	"five": 5,
	"six": 6,
	"seven": 7,
	"eight": 8,
	"nine": 9
}

let stateEnum = {
	"stateNum1": 0,
	"stateOper": 1, 
	"stateNum2": 2, 
	"stateEq": 3
}

// Storage Variables 
let value1 = 0;
let value2 = 0;
let currOper = "";
let state = stateEnum.stateNum1;
let pointEnabled = false; 
let decimalPointLoc = 1;

function resetGlobalVars() {
	value1 = 0;
	value2 = 0;
	currOper = "";
	state = stateEnum.stateNum1; 
	pointEnabled = false; 
	decimalPointLoc = 1;

	mainDisplay.innerHTML = "0";
	operDisplay.innerHTML = "";
}

function deleteDigit(num) {
	// num = Math.trunc(num / 10);
	// mainDisplay.innerHTML = num;
	// return num;
	num = Number(num.toString().slice(0, -1));

	if (pointEnabled) {
		--decimalPointLoc;
		if (decimalPointLoc === 1) {
			pointEnabled = false;
		}
	}

	mainDisplay.innerHTML = num;
	return num;
}

// function insertDecimal(num) {
// 	return +(num / 10).toPrecision(num.length - 1);
// }

function operate() {
	if (currOper === "/") {
		return value1 / value2;
	} else if (currOper === "*") {
		return value1 * value2;
	} else if (currOper === "-") {
		return value1 - value2;
	} else if (currOper === "+") {
		return value1 + value2;
	} else {
		// error handling
	}
}

// Enable Buttons //
function enableButtons() {
	for (let i = 0; i < calcButtons.length; ++i) {
		calcButtons[i].addEventListener("click", function() {
			generalHandler(calcButtons[i].id);
		});
	}
	for (let i = 0; i < numButtons.length; ++i) {
		numButtons[i].addEventListener("click", function() {
			generalHandler(numButtons[i].id);
		});
	} 
}

// Handlers  //
function generalHandler(id) {
	switch(state) {
		case 0:
			stateNum1(id);
			break;
		case 1:
			stateOperation(id);
			break;
		case 2:
			stateNum2(id);
			break;	
		case 3: 
			stateEquation(id);
			break;
	}	
}

function isNumber(id) {
	let numList = ["zero","one","two","three","four","five","six","seven","eight","nine"];
	return numList.includes(id);
}

function isOperator(id) {
	let operatorList = ["divide","multiply","subtract","add"];
	return operatorList.includes(id);
}

function isDot(id) {
	return (id === "point");
}

function isEquals(id) {
	return (id === "equals");
}

function isDelete(id) {
	return (id === "delete");
}

function isClear(id) {
	return (id === "clear");
}

// State Num1 //
function stateNum1(id) {
	console.log(state + ": state");
	if (isNumber(id)) {
		let num = numEnum[id];

		if (!pointEnabled) {
			value1 = Number(value1.toString() + num);
		} else {
			value1 = value1 + (num / 10**decimalPointLoc);
			++decimalPointLoc;
		}

		mainDisplay.innerHTML = value1;
		state = stateEnum.stateNum1;
	} else if (isOperator(id)) {
		decimalPointLoc = 1;
		pointEnabled = false; 
		state = stateEnum.stateOper;
		generalHandler(id);
	} else if (isDot(id)) {
		if (!pointEnabled) {
			//value1 = insertDecimal(value1);
			pointEnabled = true;
		}
	} else if (isEquals(id)) {
		// Do nothing
	} else if (isDelete(id)) {
		value1 = deleteDigit(value1);	
	} else if (isClear(id)) {
		resetGlobalVars();
	} else {

	}
}

// State Operation (Case 1) //
function stateOperation(id){
	console.log(state + ": state");
	pointEnabled = false;
	if (isNumber(id)) {
		state = stateEnum.stateNum2;
		generalHandler(id);
	} else if (isOperator(id)) {
		state = stateEnum.stateOper;
		currOper = operationEnum[id];
		operDisplay.innerHTML = value1 + " " + currOper;
		mainDisplay.innerHTML = 0;
	} else if (isDot(id)) {
		// Do nothing
	} else if (isEquals(id)) {
		// Do nothing
	} else if (isDelete(id)) {
		// Do nothing	
	} else if (isClear(id)) {
		resetGlobalVars();
	} else {

	}
}

// State Num2 //
function stateNum2(id){
	console.log(state + ": state");
	if (isNumber(id)) {
		let num = numEnum[id];

		if (!pointEnabled) {
			value2 = Number(value2.toString() + num);
		} else {
			value2 = value2 + (num / 10**decimalPointLoc);
			++decimalPointLoc;
		}

		mainDisplay.innerHTML = value2;
		state = stateEnum.stateNum2;
	} else if (isOperator(id)) {
		value1 = operate();
		value2 = 0;
		currOper = operationEnum[id];
		operDisplay.innerHTML = value1 + " " + currOper;
		mainDisplay.innerHTML = 0;
	} else if (isDot(id)) {
		if (!pointEnabled) {
			//value2 = insertDecimal(value2);
			pointEnabled = true;
		}
	} else if (isEquals(id)) {
		operDisplay.innerHTML = "";
		value1 = operate();
		mainDisplay.innerHTML = value1;
		value2 = 0;
		decimalPointLoc = 1;
		pointEnabled = false; 
		state = stateEnum.stateEq;
	} else if (isDelete(id)) {
		value2 = deleteDigit(value2);	
	} else if (isClear(id)) {
		resetGlobalVars();
	} else {

	}
}

//State Equation //
function stateEquation(id){
	console.log(state + ": state");
	if (isNumber(id)) {
		let num = numEnum[id];
		
		if (!pointEnabled) {
			value1 = Number(value1.toString() + num);
		} else {
			value1 = value1 + (num / 10**decimalPointLoc);
			++decimalPointLoc;
		}

		mainDisplay.innerHTML = value1;
		state = stateEnum.stateNum1;
	} else if (isOperator(id)) {
		state = stateEnum.stateOper;
		generalHandler(id);
	} else if (isDot(id)) {

	} else if (isEquals(id)) {

	} else if (isDelete(id)) {
		
	} else if (isClear(id)) {
		resetGlobalVars();
	} else {

	}
}

// Main
enableButtons();
//