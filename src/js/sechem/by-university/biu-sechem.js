// ~~~~~~~~~~ \\
// BIU SECHEM \\
// ~~~~~~~~~~ \\

import getUniSechemTreshold from "../utils/handle-google-sheet.js";
import {
	checkGradesValidity,
	checkSechemTreshold,
} from "../utils/handle-grades-validity.js";
import { isFullInputs } from "../utils/sechem-general-rules.js";
import {
	displayFillAllInputs,
	displayInvalidInputs,
} from "../utils/update-sechem-results.js";
import {
	biuFinal,
	biuFirstSechemTreshold,
	biuMinBagrut,
	biuMinPsycho,
	undefinedUni,
	uniTresholdOption,
} from "../sechem-config.js";
import { BIU } from "../../utils/general-config.js";
import { maxUniversitiesBagrutAverage } from "../../bagrut/bagrut-config.js";

// Sechem Treshold
const biuFinalSechemTreshold = await getUniSechemTreshold(
	uniTresholdOption,
	biuFinal
);

// Checks if the bagrut & psycho grades are valid according to BIU minimum & maximums values
export const calculateBiuFirst = function (bagrut, psycho) {
	// Checks validity and displays results
	checkGradesValidity(
		biuMinPsycho,
		biuMinBagrut,
		maxUniversitiesBagrutAverage[BIU],
		psycho,
		bagrut,
		checkSechemTreshold,
		[undefinedUni, biuFirstSechemTreshold]
	);
};

// Calculates BIU SECHEM, checks if it's higher than current year's treshold
// Checks if the grade is valid
export const calculateBiuFinal = function (finalSechem) {
	// Checks validity and displays results
	if (isFullInputs(finalSechem)) {
		displayFillAllInputs();
	} else if (isNaN(finalSechem)) {
		displayInvalidInputs();
	} else {
		checkSechemTreshold(finalSechem, biuFinalSechemTreshold);
	}
};

// Checks if the given sechem belongs to BIU (as there's no first sechem treshold)
export const isBiuSechem = function (sechem) {
	return sechem == undefinedUni;
};
