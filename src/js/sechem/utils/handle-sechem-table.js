// ~~~~~~~~~~~~~~~~~~~ \\
// Handle Sechem Table \\
// ~~~~~~~~~~~~~~~~~~~ \\

import {
	hyphenSlicer,
	tableBodyElement,
	tableCellElement,
	tableRowElement,
} from "../../utils/general-config.js";
import { sechemTableBodyID, tresholdsOption } from "../sechem-config.js";
import getUniSechemTreshold from "./handle-google-sheet.js";

// When switching to a new university, removes the old sechem table and creates a new relevant one
var oldSechemTableBody = document.getElementById(sechemTableBodyID);
const removeOldTableAndCreateNew = function (selectedOption) {
	var newSechemTableBody = document.createElement(tableBodyElement);
	createSechemTable(selectedOption, newSechemTableBody);
	oldSechemTableBody.parentNode.replaceChild(
		newSechemTableBody,
		oldSechemTableBody
	);
	oldSechemTableBody = newSechemTableBody;
};

// Creates a new sechem table
async function createSechemTable(selectedOption, newSechemTableBody) {
	// Extracts current university and current sechem type
	let selectedUniversity, sechemType;
	[selectedUniversity, sechemType] = selectedOption.split(hyphenSlicer);

	let sechemTresholds = await getUniSechemTreshold(tresholdsOption);
	// Builds the new table according to the extracted values above
	sechemTresholds.forEach((item) => {
		let sechem = item.data[selectedUniversity][sechemType];
		if (sechem) {
			let year = item.YEAR;
			const row = createSechemRow(
				year,
				item.data[selectedUniversity][sechemType]
			);
			newSechemTableBody.appendChild(row);
		}
	});
}

// Creates a new sechemTable row
function createSechemRow(year, sechem) {
	const row = document.createElement(tableRowElement);

	// Year Cell
	const yearCell = document.createElement(tableCellElement);
	yearCell.textContent = year;
	row.appendChild(yearCell);

	// Sechem Cell
	const sechemCell = document.createElement(tableCellElement);
	sechemCell.textContent = sechem;
	row.appendChild(sechemCell);

	return row;
}

export default removeOldTableAndCreateNew;
