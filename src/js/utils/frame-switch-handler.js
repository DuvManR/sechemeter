// ~~~~~~~~~~~~~~~~~~~~ \\
// Frame Switch Handler \\
// ~~~~~~~~~~~~~~~~~~~~ \\

import {
	NONE,
	activeForm,
	changeEvent,
	clickEvent,
	defaultUniLogo,
	displayBlock,
	optionElement,
	primaryColor,
	secondaryColor,
	tableBorderColor,
	tableLinesColor,
	tableTextColor,
	tableThColor,
} from "../utils/general-config.js";
import {
	finalSechemOptions,
	finalSechemPrimaryColor,
	finalSechemSecondaryColor,
	finalSechemTableBorderColor,
	finalSechemTableLinesColor,
	finalSechemTableTextColor,
	finalSechemTableThColor,
	firstSechemOptions,
	firstSechemPrimaryColor,
	firstSechemSecondaryColor,
	firstSechemTableBorderColor,
	firstSechemTableLinesColor,
	firstSechemTableTextColor,
	firstSechemTableThColor,
	labelDefaultText,
	sechemFormID,
	sechemSelectID,
	sechemSwitchID,
	toBagrutButtonID,
} from "../sechem/sechem-config.js";
import { displayDefaultLog } from "../sechem/utils/update-sechem-results.js";
import {
	bagrutFormID,
	bagrutPrimaryColor,
	bagrutSecondaryColor,
	toSechemButtonID,
} from "../bagrut/bagrut-config.js";
import updateVisualChanges from "../sechem/utils/handle-visual-changes.js";

// Default frame colors (green theme)
var lastSechemPrimaryColor = firstSechemPrimaryColor,
	lastSechemSecondaryColor = firstSechemSecondaryColor,
	lastSechemTableBorderColor = firstSechemTableBorderColor,
	lastSechemTableTextColor = firstSechemTableTextColor,
	lastSechemTableThColor = firstSechemTableThColor,
	lastSechemTableLinesColor = firstSechemTableLinesColor;

const sechemTypeSwitchHandler = document
	.getElementById(sechemSwitchID)
	.addEventListener(changeEvent, function () {
		// When checked, switches to Final Sechem frame. Otherwise, swiches to First Sechem frame.
		// Changing theme color (First - green, Final - red) as well as the Select Element options.
		if (this.checked) {
			[
				lastSechemPrimaryColor,
				lastSechemSecondaryColor,
				lastSechemTableBorderColor,
				lastSechemTableTextColor,
				lastSechemTableThColor,
				lastSechemTableLinesColor,
			] = changeFormColors(
				finalSechemPrimaryColor,
				finalSechemSecondaryColor,
				finalSechemTableBorderColor,
				finalSechemTableTextColor,
				finalSechemTableThColor,
				finalSechemTableLinesColor
			);
			changeSechemSelectOptions(finalSechemOptions);
		} else {
			[
				lastSechemPrimaryColor,
				lastSechemSecondaryColor,
				lastSechemTableBorderColor,
				lastSechemTableTextColor,
				lastSechemTableThColor,
				lastSechemTableLinesColor,
			] = changeFormColors(
				firstSechemPrimaryColor,
				firstSechemSecondaryColor,
				firstSechemTableBorderColor,
				firstSechemTableTextColor,
				firstSechemTableThColor,
				firstSechemTableLinesColor
			);
			changeSechemSelectOptions(firstSechemOptions);
		}

		// Clears results
		displayDefaultLog();

		// Updates the labels, inputs and sechemTable display values
		updateVisualChanges(
			labelDefaultText,
			labelDefaultText,
			displayBlock,
			displayBlock,
			NONE,
			true,
			defaultUniLogo
		);
	});

// Gets a new Options Array and updates the Select Element accordingly
function changeSechemSelectOptions(optionsArray) {
	// Clears the current options
	const selectElement = document.getElementById(sechemSelectID);
	selectElement.innerHTML = "";

	// Adds the new options
	optionsArray.forEach(function (option) {
		const newOption = document.createElement(optionElement);
		newOption.value = option.value;
		newOption.textContent = option.text;

		// Sets the option as selected if specified
		if (option.selected) {
			newOption.selected = true;
		}

		selectElement.appendChild(newOption);
	});
}

// Gets the new frame theme colors, and updates the root style variables accordingly.
// Returns the new colors for definition when switching back from bagrut-frame back to sechem-frame.
function changeFormColors(
	lastSechemPrimaryColor,
	lastSechemSecondaryColor,
	lastSechemTableBorderColor = "",
	lastSechemTableTextColor = "",
	lastSechemTableThColor = "",
	lastSechemTableLinesColor = ""
) {
	const root = document.documentElement;
	root.style.setProperty(primaryColor, lastSechemPrimaryColor);
	root.style.setProperty(secondaryColor, lastSechemSecondaryColor);
	root.style.setProperty(tableBorderColor, lastSechemTableBorderColor);
	root.style.setProperty(tableTextColor, lastSechemTableTextColor);
	root.style.setProperty(tableThColor, lastSechemTableThColor);
	root.style.setProperty(tableLinesColor, lastSechemTableLinesColor);

	return [
		lastSechemPrimaryColor,
		lastSechemSecondaryColor,
		lastSechemTableBorderColor,
		lastSechemTableTextColor,
		lastSechemTableThColor,
		lastSechemTableLinesColor,
	];
}

// Switches to bagrut-form when to-bagrut-button is clicked.
document
	.getElementById(toBagrutButtonID)
	.addEventListener(clickEvent, function () {
		// Revealing bagrut-form and hiding sechem-form
		switchForm(sechemFormID, bagrutFormID);

		// Changes theme color to blue
		changeFormColors(bagrutPrimaryColor, bagrutSecondaryColor);
	});

// Switches to sechem-form when to-sechem-button is clicked.
document
	.getElementById(toSechemButtonID)
	.addEventListener(clickEvent, function () {
		// Revealing sechem-form and hiding bagrut-form
		switchForm(bagrutFormID, sechemFormID);

		// Changes theme color back to the one of the last active sechem-form (green or red)
		changeFormColors(
			lastSechemPrimaryColor,
			lastSechemSecondaryColor,
			lastSechemTableBorderColor,
			lastSechemTableTextColor,
			lastSechemTableThColor,
			lastSechemTableLinesColor
		);
	});

// Switches from one form to another (sechem-form <-> bagrut-form)
function switchForm(oldFormId, newFormId) {
	const oldForm = document.getElementById(oldFormId);
	const newForm = document.getElementById(newFormId);
	oldForm.classList.remove(activeForm);
	newForm.classList.add(activeForm);
}

export default sechemTypeSwitchHandler;
