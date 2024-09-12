// ~~~~~~~~~~~~~~~~~~~~~~~~ \\
// Calculate Bagrut Average \\
// ~~~~~~~~~~~~~~~~~~~~~~~~ \\

import displayAvg from "./update-bagrut-avg.js";
import {
	extractTableRowsById,
	extractBagrutTableRowData,
	isRowFull,
} from "./bagrut-table-parser.js";
import getHujiBonus from "../by-university/huji-bagrut.js";
import getTauBonus from "../by-university/tau-bagrut.js";
import getTechBonus, {
	checkMizrafSubjects,
} from "../by-university/tech-bagrut.js";
import getBguBonus from "../by-university/bgu-bagrut.js";
import getBiuBonus from "../by-university/biu-bagrut.js";
import {
	isAdditionalCalcSubject,
	shouldIncludeInAvg,
	isInvalidBagrutUnitsNum,
	isFiveUnitsMath,
	isFourUnitsMath,
} from "./bagrut-general-rules.js";
import { getSelectedOption, roundDigits } from "../../utils/general-methods.js";
import {
	bagrutSelectID,
	extendedBagrutTableBodyID,
	bagrutRowBgColor,
	boldText,
	normalText,
} from "../bagrut-config.js";
import {
	BGU,
	BIU,
	HUJI,
	TAU,
	TECH,
	defaultUni,
} from "../../utils/general-config.js";

// Gets a bagrut-table-row and updates its bonus cell with an appropriate value
function updateBonus(row) {
	// Extracts data out of the given row (subject, units, grade, examType & bonus)
	let subject, units, grade, selectedExamType, bonus;
	[subject, units, grade, selectedExamType, bonus] =
		extractBagrutTableRowData(row);

	// Gets the selected university option
	let selectedOption = getSelectedOption(bagrutSelectID);

	// Resets the bonus variable to 0, as its original value is not necessary
	bonus = 0;

	// According to the values of the extracted cells & university above, updates the bonus respectively
	if (isRowFull(units, grade, subject)) {
		switch (selectedOption) {
			case TAU:
				bonus = getTauBonus(subject, units, grade, selectedExamType);
				break;
			case HUJI:
				bonus = getHujiBonus(subject, units, grade, selectedExamType);
				break;
			case TECH:
				bonus = getTechBonus(subject, units, grade, selectedExamType);
				if (bonus === undefined) {
					return; // Row was updated through the void CheckMizrafSubjects() function
				}
				break;
			case BGU:
				bonus = getBguBonus(subject, units, grade, selectedExamType);
				break;
			case BIU:
				bonus = getBiuBonus(subject, units, grade, selectedExamType);
				break;
		}
	}

	// When the selected university is Technion & a row cell was reset, so there might be changes related to MizrafSubjects
	else if (selectedOption == TECH) {
		checkMizrafSubjects();
	}

	// Updates the row's bonus cell with the appropriate value
	row.cells[4].textContent = bonus;
}

// Calculates & updates bagrut average
const updateAvg = function () {
	// Gets the selected university option
	let university = getSelectedOption(bagrutSelectID);

	// Collects all bagrut-table-rows
	const rows = extractTableRowsById(extendedBagrutTableBodyID);

	// Iterates over bagrut-table-rows & updates the bonus cell of each
	rows.forEach((row) => {
		updateBonus(row);
	});

	// Starts calculations of the bagrut-average out of the valid mandatory subjects in bagrut-table-rows
	let sum = 0,
		unitsNum = 0,
		totalUnitsNum = 0,
		deltaUnits = 0,
		noneMandatorySubjects = [];
	[sum, unitsNum, totalUnitsNum, deltaUnits, noneMandatorySubjects] =
		calculateMandatorySubjects(university, rows);

	// Sorts the noneMandatorySubjects by grade, descending
	let sortedNoneMandatorySubjects = [];
	noneMandatorySubjects.sort((a, b) => b.gradeWithBonus - a.gradeWithBonus);
	noneMandatorySubjects.forEach((item) => {
		sortedNoneMandatorySubjects.push(item.row);
	});

	// Finishes calculations of the bagrut-average out of the valid subjects in sortedNoneMandatorySubjects-rows
	let avg = 0;
	[unitsNum, avg] = calculateAdditionalSubjects(
		sum,
		unitsNum,
		university,
		sortedNoneMandatorySubjects
	);

	// Displays the appropriate calculated bagrut-average
	displayAvg(avg, unitsNum, totalUnitsNum, deltaUnits, university);
};

// Gets bagrut-table-rows & starts calculations of the bagrut-average out of the valid mandatory subjects in it
function calculateMandatorySubjects(university, bagrutTableRows) {
	// Iterates over bagrut-table-rows and performs bagrut-average calculations where needed.
	let sum = 0,
		unitsNum = 0,
		totalUnitsNum = 0,
		deltaUnits = 0,
		noneMandatorySubjects = [];
	bagrutTableRows.forEach((row) => {
		// Extracts data out of the given row (subject, units, grade, examType & bonus)
		let subject, units, grade, selectedExamType, bonus;
		[subject, units, grade, selectedExamType, bonus] =
			extractBagrutTableRowData(row);

		// Checks if this is a valid row where all of its content is filled
		if (isRowFull(units, grade, subject)) {
			// 5-units math in Technion grade cosidered as doubled weight (10-units)
			if (isFiveUnitsMath(subject, units) && university == TECH) {
				// Bolds row's style
				row.setRowStyle(boldText, bagrutRowBgColor);

				// Adds stats to average calculation
				sum += 10 * (grade + bonus);
				unitsNum += 10;
				deltaUnits += units; // to remove additional units in display later
			}

			// 4-units math in Technion grade cosidered as doubled weight (8-units)
			else if (isFourUnitsMath(subject, units) && university == TECH) {
				// Bolds row's style
				row.setRowStyle(boldText, bagrutRowBgColor);

				// Adds stats to average calculation
				sum += 8 * (grade + bonus);
				unitsNum += 8;
				deltaUnits += units; // to remove additional units in display later
			}

			// Checks if university is default-uni (which calculates everything) OR if current row includes a mandatory subject
			else if (
				university == defaultUni ||
				!isAdditionalCalcSubject(subject, university)
			) {
				// Bolds row's style
				row.setRowStyle(boldText, bagrutRowBgColor);

				// Adds stats to average calculation
				sum += units * (grade + bonus);
				unitsNum += units;
			} else {
				// Resets row's style
				row.setRowStyle(normalText, "");

				// Current subject is not a mandatory subject, so it's added to noneMandatorySubjects array, to be checked later
				noneMandatorySubjects.push({
					row: row,
					subject: subject,
					gradeWithBonus: parseInt(grade + bonus),
				});
			}

			// Sums up total units number
			totalUnitsNum += units;
		} else {
			// Resets row's style
			row.setRowStyle(normalText, "");
		}
	});

	return [sum, unitsNum, totalUnitsNum, deltaUnits, noneMandatorySubjects];
}

// Gets sortedNoneMandatorySubjects-rows & finishes calculations of the bagrut-average out of the valid subjects in it
function calculateAdditionalSubjects(
	sum,
	unitsNum,
	university,
	sortedNoneMandatorySubjects
) {
	// Calculates current bagrut-average as initialized value
	let avg = sum / unitsNum;

	// Iterates over sortedNoneMandatorySubjects-rows and adds to calculations only those which improve the average.
	sortedNoneMandatorySubjects.forEach((row) => {
		// Extracts data out of the given row (subject, units, grade, examType & bonus)
		let subject, units, grade, selectedExamType, bonus;
		[subject, units, grade, selectedExamType, bonus] =
			extractBagrutTableRowData(row);

		// Checks if this is a valid row where all of its content is filled
		if (isRowFull(units, grade, subject)) {
			// Checks if current subject should be included in average:
			// 1. Only one row is filled
			// 2. Improves current average
			// 3. Units Number is currently below 20
			if (
				isNaN(avg) ||
				shouldIncludeInAvg(subject, university, grade, bonus, avg) ||
				isInvalidBagrutUnitsNum(unitsNum, university)
			) {
				// Bolds row's style
				row.setRowStyle(boldText, bagrutRowBgColor);

				// Adds stats to average calculation
				sum += units * (grade + bonus);
				unitsNum += units;
				avg = sum / unitsNum;
			}

			// As it was found that current subject should not be included in average,
			// Checks if it's not a mandatory subject. If so, resets its row's style
			else if (isAdditionalCalcSubject(subject, university)) {
				// Resets row's style
				row.setRowStyle(normalText, "");
			}
		} else {
			// Resets row's style
			row.setRowStyle(normalText, "");
		}
	});

	return [unitsNum, roundDigits(avg, 2)];
}

export default updateAvg;
