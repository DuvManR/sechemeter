// ~~~~~~~~~~~ \\
// HUJI SECHEM \\
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
	hujiFinal,
	hujiFirst,
	hujiMaxCognitive,
	hujiMinBagrut,
	hujiMinCognitive,
	hujiMinPsycho,
	uniTresholdOption,
} from "../sechem-config.js";
import { HUJI } from "../../utils/general-config.js";
import { maxUniversitiesBagrutAverage } from "../../bagrut/bagrut-config.js";

// Sechem Tresholds
const hujiFirstSechemTreshold = await getUniSechemTreshold(
	uniTresholdOption,
	hujiFirst
);
const hujiFinalSechemTreshold = await getUniSechemTreshold(
	uniTresholdOption,
	hujiFinal
);

// Calculates HUJI COGNITIVE SECHEM, checks if it's higher than current year's treshold
// Checks if the bagrut & psycho grades are valid according to HUJI minimum & maximums values
export const calculateHujiFirst = function (bagrut, psycho) {
	// Cognitive Meshuklal Formula -->
	let decBagrut = bagrut / 10;
	let normalizedBagrut = 3.963 * decBagrut - 20.0621;
	let normalizedPsycho = 0.032073 * psycho + 0.3672;
	let weightedCognitiveSechem =
		0.3 * normalizedBagrut + 0.7 * normalizedPsycho;
	let cognitiveSechem =
		Math.floor(
			(1.2235 * weightedCognitiveSechem - 4.4598 + 0.0005) * 1000
		) / 1000;

	// Checks validity and displays results
	checkGradesValidity(
		hujiMinPsycho,
		hujiMinBagrut / 10,
		maxUniversitiesBagrutAverage[HUJI] / 10,
		psycho,
		decBagrut,
		checkSechemTreshold,
		[cognitiveSechem.toString(), hujiFirstSechemTreshold]
	);
};

// Calculates HUJI FINAL SECHEM, checks if it's higher than current year's treshold
// Checks if the COGNITIVE SECHEM & MORKAM grades are valid according to HUJI scheme
export const calculateHujiFinal = function (cognitive, morkam) {
	// Checks validity and displays results
	if (isFullInputs(morkam, cognitive)) {
		displayFillAllInputs();
	} else if (isInvalidHujiFinalSechem(morkam, cognitive)) {
		displayInvalidInputs();
	} else {
		// Mor/Mirkam Standardization (Tiknun) -->
		let normalizedMorkam = 0.0261 * morkam + 20.6791;

		// Personal Grade (Tziun Ishiuty): -->
		let finalSechem =
			Math.floor(
				(0.75 * normalizedMorkam + 0.25 * cognitive + 0.0005) * 1000
			) / 1000;

		// Checks if SECHEM is above current year's SECHEM treshold
		checkSechemTreshold(finalSechem, hujiFinalSechemTreshold);
	}
};

// Checks if the given sechem & morkam grades are valid numbers and fits the MIN-MAX scale
function isInvalidHujiFinalSechem(morkam, cognitive) {
	return (
		isInvalidFinalSechemInputs(morkam, cognitive) ||
		cognitive < hujiMinCognitive ||
		cognitive > hujiMaxCognitive
	);
}
