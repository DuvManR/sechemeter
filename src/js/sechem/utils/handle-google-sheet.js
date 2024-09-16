// ~~~~~~~~~~~~~~~~~~~~~~~~ \\
// Handle Google Sheet Data \\
// ~~~~~~~~~~~~~~~~~~~~~~~~ \\

import {
	BIU,
	HUJI,
	TAU,
	TECH,
	hyphenSlicer,
} from "../../utils/general-config.js";
import {
	firstCol,
	googleSheetUrl,
	iterByUniNum,
	noDataSheetCell,
	sheetYearlyDictTemplate,
	techYearColIndex,
	tresholdsOption,
	uniCellNum,
	uniTresholdOption,
	yearOption,
} from "../sechem-config.js";
import { isEmpty } from "../../utils/general-methods.js";

// Initiates an HTTP request that extracts Google Sheet's SCHAMIM's content
async function carveSechemTresholds() {
	try {
		// HTTP Request & Response
		const response = await fetch(googleSheetUrl);
		const data = await response.json();

		if (data.values) {
			// Extracts data in an organized JSON format
			return extractTables(data.values);
		} else {
			// No data found - error
			throw ErrorEvent;
		}
	} catch (error) {
		// An error occurred
		console.log(error);
	}
}

// Gets raw rows of SCHAMIM, then with some manipulations returns an organized Dictionary of them
function extractTables(rows) {
	// Each row represents a year
	const yearlyTables = [];
	let filteredRow = [];
	rows.forEach((row) => {
		filteredRow = filterSheetRow(row);
		if (!isEmpty(filteredRow)) {
			let currentYearTable = extractCurrentYearTable(row);
			yearlyTables.push(currentYearTable);
		}
	});
	return yearlyTables;
}

// Extracts a specific year's SCHAMIM
function extractCurrentYearTable(rawCurrentYearRow) {
	let currentUni = HUJI; // huji -> tau -> tech -> biu
	let currentYearTable = {
		...structuredClone(sheetYearlyDictTemplate),
		YEAR: rawCurrentYearRow[techYearColIndex],
	};

	// Every year's SCHAMIM is represented by 3-4 following columns (therefore i+=4 as well as slice definitions)
	let filteredCurrentUniTable = [];
	for (let i = firstCol; i < iterByUniNum; i += uniCellNum) {
		let beginSlice = i;
		let endSlice = i + uniCellNum;
		let currentUniTable = sliceSheetRow(
			beginSlice,
			endSlice,
			rawCurrentYearRow
		); // Sliced Current University
		filteredCurrentUniTable = filterSheetRow(currentUniTable);
		if (!isEmpty(filteredCurrentUniTable)) {
			currentYearTable = updateCurrentYearTable(
				currentUni,
				filteredCurrentUniTable,
				currentYearTable
			);
		}

		// Switches to the next university (huji -> tau -> tech -> biu)
		currentUni = switchCurrentUni(currentUni);
	}

	return currentYearTable;
}

// Gets a row and filters off unnecessary cells.
function filterSheetRow(row) {
	return row.filter(
		(cell) => cell && (cell == noDataSheetCell || !isNaN(cell))
	);
}

// Gets a row and slices it as demanded.
function sliceSheetRow(beginSlice, endSlice, row) {
	return row.slice(beginSlice, endSlice); // Take only the first 4 columns
}

// Switches to the next university (huji -> tau -> tech -> biu)
function switchCurrentUni(currentUni) {
	if (currentUni == HUJI) {
		return TAU;
	}
	if (currentUni == TAU) {
		return TECH;
	} else {
		return BIU;
	}
}

// Updates currentYearTable with currentUniversity new data
function updateCurrentYearTable(currentUni, currentUniTabel, currentYearTable) {
	// Gets the requests first & final sechem
	const firstSechem = currentUniTabel[1];
	const finalSechem = currentUniTabel[currentUniTabel.length - 1];

	// Checks if there are valid values in the sechem variables. If so, updates currentYearTable
	if (
		((finalSechem == noDataSheetCell || !isNaN(finalSechem)) &&
			currentUniTabel.length > 2) ||
		currentUni == BIU
	) {
		currentYearTable.data[currentUni].FINAL = finalSechem;
	}
	if (
		(firstSechem == noDataSheetCell || !isNaN(firstSechem)) &&
		currentUni != BIU
	) {
		currentYearTable.data[currentUni].FIRST = firstSechem;
	}

	return currentYearTable;
}

// Extracts the requested google sheet value
let sechemTresholds = {};
let cachedTresholdsData = null;
const getUniSechemTreshold = async function (dataType, data = null) {
	// Checks if is there already some data carved from Google Sheet
	if (!cachedTresholdsData) {
		sechemTresholds = await carveSechemTresholds();
	}

	// Prevents carving sechem tresholds more than once
	cachedTresholdsData = sechemTresholds;

	// Extracts the requested google sheet value:
	// yearOption => year,
	// uniTresholdOption => sechemTreshold,
	// tresholdsOption => cachedTresholdsData
	switch (dataType) {
		case yearOption:
			return sechemTresholds[0].YEAR;
		case uniTresholdOption:
			let university = null,
				sechemType = null;
			[university, sechemType] = data.split(hyphenSlicer);
			return sechemTresholds[0].data[university][sechemType];
		case tresholdsOption:
			return cachedTresholdsData;
	}
};

export default getUniSechemTreshold;
