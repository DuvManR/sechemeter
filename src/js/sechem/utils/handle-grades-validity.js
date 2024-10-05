// ~~~~~~~~~~~~~~~~~~~~~~ \\
// Handle Grades Validity \\
// ~~~~~~~~~~~~~~~~~~~~~~ \\

import {
	displayFillAllInputs,
	displayHappyLog,
	displayHappyLogWithoutSechem,
	displayInvalidInputs,
	displayNoTresholdYet,
	displaySadLog,
	displayTooLowBagrut,
	displayTooLowPsycho,
} from "./update-sechem-results.js";
import {
	isFullInputs,
	isInvalidFirstSechemInputs,
	isTooLowBagrut,
	isTooLowPsycho,
	isNoTresholdYet,
	isSechemBelowTreshold,
} from "./sechem-general-rules.js";
import { isBiuSechem } from "../by-university/biu-sechem.js";

// Checks bagrut & psycho grades validity, displays results accordingly
export const checkGradesValidity = function (
	uniMinPsycho,
	uniMinBagrut,
	uniMaxBagrut,
	psycho,
	bagrut,
	func2execute,
	funcArgs
) {
	if (isFullInputs(psycho, bagrut)) {
		displayFillAllInputs();
	} else if (isInvalidFirstSechemInputs(psycho, bagrut, uniMaxBagrut)) {
		displayInvalidInputs();
	} else if (isTooLowBagrut(bagrut, uniMinBagrut)) {
		displayTooLowBagrut();
	} else if (isTooLowPsycho(psycho, uniMinPsycho)) {
		displayTooLowPsycho();
	} else {
		// The grades are valid so only SECHEM treshold is left to check
		func2execute.apply(this, funcArgs);
	}
};

// Checks if SECHEM is above current year's SECHEM treshold, and displays results accordingly
export const checkSechemTreshold = function (sechem, currentYearTreshold) {
	// Define logs based on whether there's an yearly treshold or not
	if (isBiuSechem(sechem)) {
		// BIU output (no SECHEM)
		displayHappyLogWithoutSechem();
	} else {
		let evalSechem = Number(sechem);
		if (isNoTresholdYet(currentYearTreshold)) {
			displayNoTresholdYet(evalSechem);
		} else {
			// Displays the results with the appropriate log
			if (isSechemBelowTreshold(evalSechem, currentYearTreshold)) {
				displaySadLog(evalSechem);
			} else {
				displayHappyLog(evalSechem);
			}
		}
	}
};
