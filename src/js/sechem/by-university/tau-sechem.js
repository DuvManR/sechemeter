// ~~~~~~~~~~ \\
// TAU SECHEM \\
// ~~~~~~~~~~ \\

import getUniSechemTreshold from "../utils/handle-google-sheet.js";
import {
	checkGradesValidity,
	checkSechemTreshold,
} from "../utils/handle-grades-validity.js";
import sendPostRequest from "../utils/send-post-request.js";
import { roundDigits } from "../../utils/general-methods.js";
import {
	isFullInputs,
	isInvalidFinalSechemInputs,
} from "../utils/sechem-general-rules.js";
import {
	displayFillAllInputs,
	displayInvalidInputs,
} from "../utils/update-sechem-results.js";
import {
	httpTauBody,
	httpTauData,
	httpTauDataJSON,
	httpTauGetLastScore,
	httpTauHatama,
	httpTauHatamaRefua,
	httpTauHeaders,
	httpTauUrl,
	tauFinal,
	tauFirst,
	tauMinBagrut,
	tauMinPsycho,
	uniTresholdOption,
} from "../sechem-config.js";
import { TAU } from "../../utils/general-config.js";
import { maxUniversitiesBagrutAverage } from "../../bagrut/bagrut-config.js";

// Sechem Tresholds
const tauFirstSechemTreshold = await getUniSechemTreshold(
	uniTresholdOption,
	tauFirst
);
const tauFinalSechemTreshold = await getUniSechemTreshold(
	uniTresholdOption,
	tauFinal
);

// Calculates TAU SECHEM, checks if it's higher than current year's treshold
// Checks if the bagrut & psycho grades are valid according to TAU minimum & maximums values
export const calculateTauFirst = function (bagrut, psycho) {
	// Forms data to send to TAU Calculator
	let data = formTauHttpRequestData(bagrut, psycho);

	// Checks validity and displays results
	checkGradesValidity(
		tauMinPsycho,
		tauMinBagrut,
		maxUniversitiesBagrutAverage[TAU],
		psycho,
		bagrut,
		sendPostRequest,
		[httpTauUrl, data, httpTauHeaders, tauFirstSechemTreshold]
	);
};

// Calculates TAU FINAL SECHEM, checks if it's higher than current year's treshold
// Checks if the Base SECHEM & MOR grades are valid according to TAU scheme
export const calculateTauFinal = function (firstSechem, mor) {
	// Checks validity and displays results
	if (isFullInputs(mor, firstSechem)) {
		displayFillAllInputs();
	} else if (isInvalidFinalSechemInputs(mor, firstSechem)) {
		displayInvalidInputs();
	} else {
		let finalSechem = roundDigits(
			firstSechem * -217.5433682591282 +
				-58.42129621919461 * mor +
				0.27388137379660643 * firstSechem ** 2 +
				0.15398911079085498 * firstSechem * mor +
				0.008012119671922571 * mor ** 2 +
				-0.00011432216948037421 * firstSechem ** 3 +
				-0.0001021724775966959 * firstSechem ** 2 * mor +
				-5.663289087465273e-6 * firstSechem * mor ** 2 +
				-5.636375838946606e-6 * mor ** 3 +
				58044.38082450953,
			2
		);

		// Checks if SECHEM is above current year's SECHEM treshold
		checkSechemTreshold(finalSechem, tauFinalSechemTreshold);
	}
};

// Gets bagrut & psycho grades and combines them in the data dict willing to send to TAU Calculator
function formTauHttpRequestData(bagrut, psycho) {
	return JSON.stringify({
		...structuredClone(httpTauDataJSON),
		variables: {
			...structuredClone(httpTauDataJSON.variables),
			scoresData: {
				...structuredClone(httpTauDataJSON.variables.scoresData),
				psicho: psycho,
				bagrut: bagrut,
			},
		},
	});
}

// Checks if the given HTTP Response was sent from TAU Calculator
export const isTauResponse = function (response) {
	return response.includes(httpTauHatama);
};

// Parses a given HTTP Response sent from TAU Calculator
export const parseTauResponse = function (response) {
	return JSON.parse(response)[httpTauData][httpTauGetLastScore][httpTauBody][
		httpTauHatamaRefua
	];
};
