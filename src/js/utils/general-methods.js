// ~~~~~~~~~~~~~~~ \\
// General Methods \\
// ~~~~~~~~~~~~~~~ \\

import { allowedKeys, ctrlShortcuts } from "./general-config.js";

// Gets the SELECT-ELEMENT-ID and returns the selected value
export const getSelectedOption = function (selectElementId) {
	return document.getElementById(selectElementId).value;
};

// Updates Image Element
export const updateImage = function (imageElementId, imageSrc) {
	let imageElement = document.getElementById(imageElementId);
	imageElement.src = imageSrc;
};

// Updates University's Reference URL Element
export const updateReferenceURL = function (refElementId, reference, display) {
	let refElement = document.getElementById(refElementId);
	refElement.href = reference;
	refElement.style.display = display;
};

// Gets the RESULTS-DIV-ID and displays the results
export const displayResults = function (
	resultsElementId,
	results,
	innerHTML = false
) {
	if (innerHTML) {
		document.getElementById(resultsElementId).innerHTML = results;
	} else {
		document.getElementById(resultsElementId).innerText = results;
	}
};

// Creates a format function for String variables (using on string constants)
String.prototype.format = function () {
	var args = arguments;
	return this.replace(/{([0-9]+)}/g, function (match, index) {
		return typeof args[index] == "undefined" ? match : args[index];
	});
};

// Specified which keys are ok to be pressed on Input's Keydown Event
export const handleTableInput = function (e) {
	// Checks if the pressed key is included in the arrays above or if it is a digit
	if (
		allowedKeys.includes(e.key) ||
		(ctrlShortcuts.includes(e.code) && e.ctrlKey) ||
		/^[0-9]$/.test(e.key)
	) {
		return; // Allows these keys
	}
	e.preventDefault(); // Prevents any other keys
};

// Round function for decimal numbers (the built-in round() function is intended for Integers)
export const roundDigits = function (num, digits) {
	// Shouldn't be executed without the digits variable but just in case ;)
	if (digits === undefined) {
		digits = 0;
	}

	// Shouldn't be executed on negative num but just in case ;)
	let negative = false;
	if (num < 0) {
		negative = true;
		num = num * -1;
	}

	// Mathematical manipulations.
	// For example, fixes use case of:
	// Math.round(1.005 * 100) / 100 => 1 OR 1.005.toFixed(2) => 1.00)
	let multiplicator = Math.pow(10, digits);
	num = parseFloat((num * multiplicator).toFixed(11));
	num = (Math.round(num) / multiplicator).toFixed(digits);

	// Swtiches back to a negative number
	if (negative) {
		num = (num * -1).toFixed(digits);
	}

	return parseFloat(num);
};

// Returns if an array is empty
export const isEmpty = function (arr) {
	return arr.length == 0;
};
