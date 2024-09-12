// ~~~~~~~~~~~~~~~~~~~~~ \\
// Update Bagrut Average \\
// ~~~~~~~~~~~~~~~~~~~~~ \\

import {
	bagrutResultText,
	bagrutResultsID,
	maxUniversitiesBagrutAverage,
	noAverage,
} from "../bagrut-config.js";
import { isInvalidBagrutUnitsNum } from "./bagrut-general-rules.js";
import { roundDigits, displayResults } from "../../utils/general-methods.js";
import { HUJI, TECH, defaultUni } from "../../utils/general-config.js";
import {
	defaultColor,
	invalidUnitsNumColor,
	validUnitsNumColor,
} from "../bagrut-config.js";

// Gets the calculated bagrut-average, number of calculated units, total number of units and current university & displays the appropriate bagrut-average
const displayAvg = function (
	avg,
	unitsNum,
	totalUnitsNum,
	deltaUnits,
	university
) {
	// Gets current university's max bagrut-average
	let maxUniAvg = maxUniversitiesBagrutAverage[university];

	// Removes units added only for calculation purposes (etc. TECH's 5/4-units math)
	let realUnitsNum = unitsNum - deltaUnits;

	// No row was filled - bagrut-average = 0
	let resultsDiv = document.getElementById(bagrutResultsID);
	if (!avg || isNaN(avg)) {
		displayResults(
			bagrutResultsID,
			bagrutResultText.format(realUnitsNum, totalUnitsNum, noAverage)
		);
	}

	// Checks if current bagrut-average is bigger than university's max bagrut-average
	// If so, sets it as the max allowed value
	else if (avg > maxUniAvg) {
		displayResults(
			bagrutResultsID,
			bagrutResultText.format(realUnitsNum, totalUnitsNum, maxUniAvg)
		);
	} else {
		// HUJI & TECH represent the average as ONE digit after the decimal point
		// TAU, BGU & BIU represent the average as TWO digits after the decimal point
		if (university == HUJI || university == TECH) {
			avg = roundDigits(avg, 1);
		}
		displayResults(
			bagrutResultsID,
			bagrutResultText.format(realUnitsNum, totalUnitsNum, avg)
		);
	}

	// Sets the background color of bagrut-results-div
	setBagrutResultsDivColor(totalUnitsNum, resultsDiv, university);
};

// Sets the background color of bagrut-results-div (empty => default gray color, 20- => red theme, 20+ => green theme)
function setBagrutResultsDivColor(totalUnitsNum, resultsDiv, university) {
	if (!totalUnitsNum || university == defaultUni) {
		resultsDiv.style.backgroundColor = defaultColor; // default gray color
	} else if (isInvalidBagrutUnitsNum(totalUnitsNum, university)) {
		resultsDiv.style.backgroundColor = invalidUnitsNumColor; // red theme
	} else {
		resultsDiv.style.backgroundColor = validUnitsNumColor; // green theme
	}
}

export default displayAvg;
