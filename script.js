const buffer = document.getElementById('output');
let baseValue, operatorValue, operation;

//waiting on user input... buffer will be cleared upon number press
let clearBuffer;

let equalPressedLast = false;

//operate on the buffer (the number display)
function operate(nextOperation){
	//load starting value
	if(!baseValue){
		baseValue = Number(buffer.textContent);
		if(nextOperation){
			operation = nextOperation;
		}
		clearBuffer = true;
		return;
	}

	//if we aren't waiting on user input - i.e., the user has pressed at least one number since last evaluation
	if(!clearBuffer){
		operatorValue = Number(buffer.textContent);

		baseValue = evaluate();
		buffer.textContent = baseValue;

		if(nextOperation){
			operation = nextOperation;
		}
	} 
	//user hasn't pressed a number key since last evaluation
	else {
		// user has pressed enter; repeat the last evaluation
		if(!nextOperation && operatorValue && operation){
			baseValue = evaluate();
			buffer.textContent = baseValue;
			equalPressedLast = true;
			return;
		}

		//user pressed a different operation key before pressing a number; switch operation
		operation = nextOperation;
	}

	//after the user has pressed any operation key, the buffer needs to be cleared
	clearBuffer = true;
}

/*
/**
 * Perform calculation based on operation
 */
function evaluate(){
	switch(operation){
		case "add":
			return baseValue + operatorValue;
		case "subtract":
			return baseValue - operatorValue;
		case "multiply":
			return baseValue * operatorValue;
		case "divide":
			if(operatorValue === 0){
				alert('divide by zero is illegal. go to jail.');
				return 0;
			}
			return baseValue / operatorValue;
	}
}

addEventListener('click', (event) => {
	if(event.target.classList.contains('number') && buffer.textContent.length < 8){
		if(clearBuffer){
			buffer.textContent = '';
			clearBuffer = false;
		}
		//if equal was last press, clear value memory
		if(equalPressedLast){
			clear();
		}
		buffer.textContent += event.target.textContent;
		return
	}

	switch(event.target.id){
		case "add":
		case "subtract":
		case "multiply":
		case "divide":
			operate(event.target.id);
			equalPressedLast = false;
			break;
		case "equal":
			operate();
			equalPressedLast = true;
			break;
		case "c":
			clear();
			buffer.textContent = "";
			break;
		case "decimal":
			if(!buffer.textContent.includes('.')){
				if(clearBuffer || buffer.textContent == ''){
					buffer.textContent = '0.';
					clearBuffer = false;
				} else{
					buffer.textContent += '.';
				}
			}
			break;
	}
});

addEventListener('keydown', (event) => {
	console.log(event.key);
	switch(event.key){
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
		case "0":
			document.getElementById(event.key).click();
			break;
		case "Backspace":
			buffer.textContent = buffer.textContent.substring(0, buffer.textContent.length -1);
			break;
		case "Enter":
			document.getElementById('equal').click();
			break;
		case "+":
			document.getElementById('add').click();
			break;
		case "-":
			document.getElementById('subtract').click();
			break;
		case "*":
			document.getElementById('multiply').click();
			break;
		case "/":
			event.preventDefault();
			document.getElementById('divide').click();
			break;
		case "Escape":
			event.preventDefault();
			clear();
			buffer.textContent = "";
			break;
		case ".":
			document.getElementById('decimal').click();
			break;
	}
});

function clear(){
	baseValue = '';
	operatorValue = '';
	operation = '';
	equalPressedLast = false;
}
