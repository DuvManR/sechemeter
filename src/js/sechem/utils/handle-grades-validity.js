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
	currentYearTreshold,
	sechem
) {
	if (isFullInputs(psycho, bagrut)) {
		displayFillAllInputs();
		return false;
	} else if (isInvalidFirstSechemInputs(psycho, bagrut, uniMaxBagrut)) {
		displayInvalidInputs();
		return false;
	} else if (isTooLowBagrut(bagrut, uniMinBagrut)) {
		displayTooLowBagrut();
		return false;
	} else if (isTooLowPsycho(psycho, uniMinPsycho)) {
		displayTooLowPsycho();
		return false;
	} else if (sechem != null && !sechem.includes(null)) {
		// The grades are valid so only SECHEM treshold is left to check
		// Results contain data - Only local calculation was made (HUJI, TECH & BIU)
		// Returns false, to prevent double results display, where HTTP connection is also made (TAU & BGU)
		checkSechemTreshold(sechem, currentYearTreshold);
		return false;
	} else {
		// Returns True, in order to display results, where HTTP connection is also made (TAU & BGU)
		return true;
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
