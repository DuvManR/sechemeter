// ~~~~~~~~~~~~~~~~~~~~ \\
// Sechem General Rules \\
// ~~~~~~~~~~~~~~~~~~~~ \\

import {
	maxMorkam,
	maxPsycho,
	minBagrut,
	minMorkam,
	minPsycho,
	yearOption,
} from "../sechem-config.js";
import getUniSechemTreshold from "./handle-google-sheet.js";

// Current Year
var currentYearBySheet = await getUniSechemTreshold(yearOption);
var currentYearByComp = new Date().getFullYear();

// Checks if sechem inputs are full of data (bagrut & psycho OR cognitive & morkam)
export const isFullInputs = function (topInputData, bottomInputData = 123456) {
	return !topInputData || !bottomInputData;
};

// Checks if the given psycho & bagrut grades are valid numbers and fits the MIN-MAX scale
export const isInvalidFirstSechemInputs = function (
	psycho,
	bagrut,
	uniMaxBagrut
) {
	return (
		psycho > maxPsycho ||
		psycho < minPsycho ||
		!Number.isInteger(eval(psycho)) ||
		bagrut < minBagrut ||
		bagrut > uniMaxBagrut
	);
};

// Checks if the given bagrut grade is below the minimum bagrut grade
export const isTooLowBagrut = function (bagrut, uniMinBagrut) {
	return bagrut < uniMinBagrut;
};

// Checks if the given psycho grade is below the minimum psycho grade
export const isTooLowPsycho = function (psycho, uniMinPsycho) {
	return psycho < uniMinPsycho;
};

// Checks if the given treshold actually exists, if it is not defined yet
export const isNoTresholdYet = function (treshold) {
	return !treshold || currentYearBySheet != currentYearByComp;
};

// Checks if the given sechem grade is below the minimum sechem treshold
export const isSechemBelowTreshold = function (sechem, treshold) {
	return sechem < treshold;
};

// Checks if the given sechem & morkam grades are valid numbers and fits the MIN-MAX scale
export const isInvalidFinalSechemInputs = function (morkam, sechem = 0) {
	return (
		isNaN(sechem) ||
		morkam < minMorkam ||
		morkam > maxMorkam ||
		!Number.isInteger(eval(morkam))
	);
};
