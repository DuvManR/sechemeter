// ~~~~~~~~~~~ \\
// TECH SECHEM \\
// ~~~~~~~~~~~ \\

import getUniSechemTreshold from "../utils/handle-google-sheet.js";
import {
	checkGradesValidity,
	checkSechemTreshold,
} from "../utils/handle-grades-validity.js";
import {
	isFullInputs,
	isInvalidFinalSechemInputs,
} from "../utils/sechem-general-rules.js";
import {
	displayFillAllInputs,
	displayInvalidInputs,
} from "../utils/update-sechem-results.js";
import {
	techFinal,
	techFirst,
	techMinBagrut,
	techMinPsycho,
	uniTresholdOption,
} from "../sechem-config.js";
import { TECH } from "../../utils/general-config.js";
import { maxUniversitiesBagrutAverage } from "../../bagrut/bagrut-config.js";
import { roundDigits } from "../../utils/general-methods.js";

// Sechem Tresholds
const techFirstSechemTreshold = await getUniSechemTreshold(
	uniTresholdOption,
	techFirst
);
const techFinalSechemTreshold = await getUniSechemTreshold(
	uniTresholdOption,
	techFinal
);

// Calculates TECH SECHEM, checks if it's higher than current year's treshold
// Checks if the bagrut & psycho grades are valid according to TECH minimum & maximums values
export const calculateTechFirst = function (bagrut, psycho) {
	// TECH SECHEM Formula
	let firstSechem = roundDigits(0.5 * bagrut + 0.075 * psycho - 19, 3);

	// Checks validity and displays results
	checkGradesValidity(
		techMinPsycho,
		techMinBagrut,
		maxUniversitiesBagrutAverage[TECH],
		psycho,
		bagrut,
		techFirstSechemTreshold,
		firstSechem.toString()
	);
};

// Calculates TECH SECHEM, checks if it's higher than current year's treshold
// Checks if the MOR grade is valid according to TECH scheme
export const calculateTechFinal = function (NAN, mor) {
	// Checks validity and displays results
	if (isFullInputs(mor)) {
		displayFillAllInputs();
	} else if (isInvalidFinalSechemInputs(mor)) {
		displayInvalidInputs();
	} else {
		// Checks if SECHEM is above current year's SECHEM treshold
		checkSechemTreshold(mor, techFinalSechemTreshold);
	}
};
