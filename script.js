document.addEventListener("DOMContentLoaded", function () {
	const inputField = document.getElementById("input");
	const buttons = document.querySelectorAll(".buttons button");
	let currentExpression = "";
	let prevResult = null;
  
	// Function to append values to the input field
	function appendValue(value) {
	  currentExpression += value;
	  inputField.value = currentExpression;
	}
  
	// Function to clear the input field
	function clearResult() {
	  currentExpression = "";
	  inputField.value = "";
	}
  
	// Function to delete the last character from the input field
	function deleteLast() {
	  currentExpression = currentExpression.slice(0, -1);
	  inputField.value = currentExpression;
	}
  
	// Function to calculate the result
	function calculateResult() {
	  try {
		let result = eval(currentExpression);
		if (Number.isInteger(result)) {
		  inputField.value = result;
		} else {
		  inputField.value = result.toFixed(2);
		}
		prevResult = result;
		currentExpression = result.toString();
	  } catch (err) {
		inputField.value = "Error";
	  }
	}
  
	// Attach event listeners to the buttons
	buttons.forEach(function (button) {
	  button.addEventListener("click", function () {
		const value = button.textContent;
		switch (value) {
		  case "AC":
			clearResult();
			break;
		  case "DEL":
			deleteLast();
			break;
		  case "=":
			calculateResult();
			break;
		  default:
			appendValue(value);
			break;
		}
	  });
	});
  
	// Additional logic to perform further calculations on previous result
	inputField.addEventListener("keydown", function (event) {
	  if (prevResult !== null) {
		if (event.key.match(/[0-9+\-*/.]/)) {
		  currentExpression = "";
		}
		if (event.key === "Enter") {
		  event.preventDefault();
		  calculateResult();
		}
	  }
	});
  });