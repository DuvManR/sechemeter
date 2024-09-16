// ~~~~~~~~~~~~~~~~~~~ \\
// Bagrut Table Parser \\
// ~~~~~~~~~~~~~~~~~~~ \\

import { gradeName, subjectName, unitsName } from "../bagrut-config.js";
import {
	bagrutRowSelectorQuery,
	inputSelectorQuery,
	selectElement,
} from "../../utils/general-config.js";

// Gets a bagurt-table-row and extracts its content (subject, units, grade, examType & bonus)
export function extractBagrutTableRowData(row) {
	let subject = extractSubjectFromRow(row);
	let units = extractTableInputByName(row, unitsName).value;
	let grade = extractTableInputByName(row, gradeName).value;
	let selectedExamType = row.querySelector(selectElement).value;
	let bonus = row.cells[4].textContent;

	return [
		subject,
		parseInt(units),
		parseInt(grade),
		selectedExamType,
		parseInt(bonus),
	];
}

// Gets a bagurt-table-row and extracts its subject
function extractSubjectFromRow(row) {
	let subjectInput = extractTableInputByName(row, subjectName); // Gets SubjectInput for new rows
	let subjectCell = row.cells[0]; // Gets SubjectCell for default rows

	// If its a new row (subjectInput is not nullish), returns its value.
	// Otherwise, returns the cell's textContent
	return subjectInput ? subjectInput.value : subjectCell.textContent;
}

// Gets a bagurt-table-row and extract an input from it by a given name
function extractTableInputByName(row, name) {
	return row.querySelector(inputSelectorQuery.format(name));
}

// Gets a table-id and extracts its rows
export function extractTableRowsById(tableId) {
	return document.querySelectorAll(bagrutRowSelectorQuery.format(tableId));
}

// Checks if a given bagrut-table-row is full of data (units, grade & subject)
export function isRowFull(units, grade, subject) {
	return units && subject && (grade || grade === 0);
}
