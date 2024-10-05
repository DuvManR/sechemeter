// ~~~~~~~~~~~~~~~~~~~ \\
// Create Bagrut Table \\
// ~~~~~~~~~~~~~~~~~~~ \\

import {
	bagrutSelectID,
	bagrutTableBodyID,
	bonusName,
	defaultTableSubjects,
	deleteButtonClass,
	deleteButtonText,
	deleteButtonTitle,
	deleteName,
	examTypeExam,
	examTypeGemer,
	examTypeName,
	fiveUnits,
	funcKey,
	gradeMaxVal,
	gradeMinVal,
	gradeName,
	noBonus,
	subjectName,
	unitsMaxVal,
	unitsMinVal,
	unitsName,
} from "../bagrut-config.js";
import {
	TECH,
	buttonElement,
	inputElement,
	inputEvent,
	keyDownEvent,
	numberInputType,
	optionElement,
	selectElement,
	tableCellElement,
	tableInputClass,
	tableRowElement,
	tableSelectClass,
	textInputType,
} from "../../utils/general-config.js";
import {
	getSelectedOption,
	handleTableInput,
} from "../../utils/general-methods.js";
import updateAvg from "./bagrut-avg-calc.js";
import { checkMizrafSubjects } from "../by-university/tech-bagrut.js";

// Creates a new bagrut-table-row (subject-cell -> units-cell -> grade-cell -> examType-cell -> delete-cell)
export const createBagrutRow = function (
	subject = "",
	units = fiveUnits,
	bonus = noBonus,
	isNewRow = false
) {
	// Creates a new HTML TR element
	const row = document.createElement(tableRowElement);

	// Adds new cells to the row
	row.addTableCell(subjectName, subject, isNewRow);
	row.addTableCell(unitsName, units, isNewRow);
	row.addTableCell(gradeName, "", isNewRow);
	row.addTableCell(examTypeName, "", isNewRow);
	row.addTableCell(bonusName, bonus, isNewRow);
	row.addTableCell(deleteName, deleteButtonText, isNewRow);

	return row;
};

// Creates a new table-cell based on the given cellType
HTMLTableRowElement.prototype.addTableCell = function (
	cellType,
	cellText,
	isNewRow = false
) {
	// Creates a new HTML TD element
	const cell = document.createElement(tableCellElement);

	// Switch to cell creation defined by cellType
	switch (cellType) {
		case subjectName: //Subject Cell
			if (isNewRow) {
				let subjectInput = createTableInput(
					textInputType,
					cellType,
					cellText,
					[{ event: inputEvent, func: updateAvg }]
				);
				cell.appendChild(subjectInput);
			} else {
				cell.textContent = cellText;
			}
			break;

		case unitsName: //Units Cell
			let unitsInput = createTableInput(
				numberInputType,
				cellType,
				cellText,
				[
					{
						event: inputEvent,
						func: handleTableInputMinAndMax,
						vars: { minVal: unitsMinVal, maxVal: unitsMaxVal },
					},
					{ event: keyDownEvent, func: handleTableInput },
				]
			);
			cell.appendChild(unitsInput);
			break;

		case gradeName: //Grade Cell
			let gradeInput = createTableInput(
				numberInputType,
				cellType,
				cellText,
				[
					{
						event: inputEvent,
						func: handleTableInputMinAndMax,
						vars: { minVal: gradeMinVal, maxVal: gradeMaxVal },
					},
					{ event: keyDownEvent, func: handleTableInput },
				]
			);
			cell.appendChild(gradeInput);
			break;

		case examTypeName: //ExamType Cell
			let examTypeSelect = createTableSelect();
			cell.appendChild(examTypeSelect);
			break;

		case bonusName: // Bonus Cell
			cell.textContent = cellText;
			break;

		case deleteName: // DeleteRow Cell
			if (isNewRow) {
				let deleteButton = createTableButton(
					cellText,
					deleteButtonTitle,
					this
				);
				cell.appendChild(deleteButton);
			}
			break;
	}

	// Adds the newly created cell to the row
	this.appendChild(cell);
};

// Creates a bagrut-table-input element, by the given type, name, value and assigned functions
function createTableInput(
	inputType,
	inputName,
	inputValue,
	eventListenerFuncArr
) {
	// Creates a new input element, defined by the given variables
	let tableInput = document.createElement(inputElement);
	tableInput.type = inputType;
	tableInput.name = inputName;
	tableInput.value = inputValue;
	tableInput.className = tableInputClass;

	// Iterates through the functions that need to be assigned to the input, and adds an EventListener for each
	eventListenerFuncArr.forEach((currentFuncDict) => {
		if (inputName == subjectName) {
			tableInput.addEventListener(currentFuncDict.event, () => {
				currentFuncDict[funcKey]();
			});
		} else {
			if (currentFuncDict.event == inputEvent) {
				tableInput.addEventListener(currentFuncDict.event, function () {
					currentFuncDict[funcKey](currentFuncDict.vars, this);
				});
			} else {
				tableInput.addEventListener(
					currentFuncDict.event,
					function (e) {
						currentFuncDict[funcKey](e);
					}
				);
			}
		}
	});

	return tableInput;
}

// Gets an Input Element required min & max values.
// This function is assigned to an INPUT EVENT
// It ensures no value can be written out of the given ragne
function handleTableInputMinAndMax(varsDict, tableInput) {
	// Gets min & max values
	let minVal = varsDict.minVal;
	let maxVal = varsDict.maxVal;

	// Removes any none digit char
	tableInput.value = tableInput.value.replace(/\D/g, "");
	let val = parseInt(tableInput.value, 10);

	// Ensures no  value can be written out of the given range
	if (isNaN(val)) {
		tableInput.value = "";
	} else if (val < minVal) {
		tableInput.value = minVal;
	}
	if (val > maxVal) {
		tableInput.value = maxVal;
	}

	// On INPUT EVENT, updates the bagrut-average
	updateAvg();
}

// Creates a bagrut-table-select element
function createTableSelect() {
	// Creates a new select element
	let examTypeSelect = document.createElement(selectElement);
	examTypeSelect.className = tableSelectClass;

	// Creates select options
	let testOption = createSelectOption(examTypeExam, true);
	let gemerOption = createSelectOption(examTypeGemer, false);
	examTypeSelect.appendChild(testOption);
	examTypeSelect.appendChild(gemerOption);

	// Assigns updateAvg() function on select change, for updating the bagrut-average
	examTypeSelect.onchange = () => {
		updateAvg();
	};

	return examTypeSelect;
}

// Creates a new Select Element option, by the value and selected-status
function createSelectOption(value, isSelected) {
	let option = document.createElement(optionElement);
	option.value = value;
	option.textContent = value;
	option.selected = isSelected; // true if selected

	return option;
}

// Create a new bagrut-table-button element, by the given text, title and assigned parent-row-deletion function
function createTableButton(buttonText, buttonTitle, row) {
	// Creates a new button element, based on the given variables
	let tableButton = document.createElement(buttonElement);
	tableButton.textContent = buttonText;
	tableButton.className = deleteButtonClass;
	tableButton.title = buttonTitle;

	// When buttin is clicked, removes the row it is based on
	tableButton.onclick = function () {
		row.remove();

		// If the current university is Technion, MizrafSubjects() must be checked
		let selectedOption = getSelectedOption(bagrutSelectID);
		if (selectedOption == TECH) {
			checkMizrafSubjects();
		}

		// Updates bagrut-average after the changes caused by current row removal
		updateAvg();
	};

	return tableButton;
}

// Reference to the bagrut-table-body
const bagrutTableBody = document.getElementById(bagrutTableBodyID);

// Populates bagrut-table with initial rows
defaultTableSubjects.forEach((item) => {
	const row = createBagrutRow(item.subject, item.units, item.bonus);
	bagrutTableBody.appendChild(row);
});

export default bagrutTableBody;
