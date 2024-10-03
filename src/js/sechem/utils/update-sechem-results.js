// ~~~~~~~~~~~~~~~~~~~~~ \\
// Update Sechem Results \\
// ~~~~~~~~~~~~~~~~~~~~~ \\

import getUniSechemTreshold from "./handle-google-sheet.js";
import { displayResults } from "../../utils/general-methods.js";
import {
	chooseUniLog,
	defaultLog,
	fillAllInputs,
	happyLog,
	happyLogWithoutSechem,
	invalidInputs,
	noTresholdYet,
	sadLog,
	sechemResultsID,
	tooLowBagrut,
	tooLowPsycho,
	yearOption,
} from "../sechem-config.js";

// Current Year
var currentYear = await getUniSechemTreshold(yearOption);

// When not all the inputs are filled, displays "Fill-All-Inputs-Log"
export const displayFillAllInputs = function () {
	displayResults(sechemResultsID, fillAllInputs);
};

// When at least one of the given grades is invalid, displays "Invalid-Inputs-Log"
export const displayInvalidInputs = function () {
	displayResults(sechemResultsID, invalidInputs);
};

// When bagrut is too low, displays "Too-Low-Bagrut-Log"
export const displayTooLowBagrut = function () {
	displayResults(sechemResultsID, tooLowBagrut);
};

// When psycho grade is too low, displays "Too-Low-Psycho-Log"
export const displayTooLowPsycho = function () {
	displayResults(sechemResultsID, tooLowPsycho);
};

// When there is no defined treshold for current year, displays "No-Trehsold-Log"
export const displayNoTresholdYet = function (sechem) {
	displayResults(sechemResultsID, noTresholdYet.format(sechem));
};

// When sechem is above treshold, displays "Happy-Log"
export const displayHappyLog = function (sechem) {
	displayResults(sechemResultsID, happyLog.format(sechem, currentYear));
};

// When it is a no-sechem university and grades are good, displays "Happy-Log"
export const displayHappyLogWithoutSechem = function () {
	displayResults(sechemResultsID, happyLogWithoutSechem.format(currentYear));
};

// When sechem is too low, displays "Sad-Log"
export const displaySadLog = function (sechem) {
	displayResults(sechemResultsID, sadLog.format(sechem, currentYear));
};

// Sets default sechem results (0)
export const displayDefaultLog = function () {
	// Displays default results
	displayResults(sechemResultsID, defaultLog);
};

// Clears sechem results
export const displayNoResults = function () {
	// Clears results
	displayResults(sechemResultsID, "");
};

// When no university is selected, displays "Choose-Uni-Log"
export const displayChooseUniLog = function () {
	displayResults(sechemResultsID, chooseUniLog);
};
