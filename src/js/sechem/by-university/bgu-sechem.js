// ~~~~~~~~~~ \\
// BGU SECHEM \\
// ~~~~~~~~~~ \\

import getUniSechemTreshold from "../utils/handle-google-sheet.js";
import { checkGradesValidity } from "../utils/handle-grades-validity.js";
import {
	bguFirstSechemTreshold,
	bguMinBagrut,
	bguMinPsycho,
	httpBguData,
	httpBguHeaders,
	httpBguOnFinalSekem,
	httpBguUrl,
	yearOption,
} from "../sechem-config.js";
import { BGU } from "../../utils/general-config.js";
import { maxUniversitiesBagrutAverage } from "../../bagrut/bagrut-config.js";
import sendPostRequest from "../utils/send-post-request.js";

// Next Year
const nextYear = eval(await getUniSechemTreshold(yearOption)) + 1;

// Calculates BGU SECHEM, checks if it's higher than current year's treshold
// Checks if the bagrut & psycho grades are valid according to BGU minimum & maximums values
export const calculateBguFirst = function (bagrut, psycho) {
	// Forms data to send to BGU Calculator
	let data = httpBguData.format(nextYear, bagrut, psycho);

	// Checks validity and displays results
	checkGradesValidity(
		bguMinPsycho,
		bguMinBagrut,
		maxUniversitiesBagrutAverage[BGU],
		psycho,
		bagrut,
		sendPostRequest,
		[httpBguUrl, data, httpBguHeaders, bguFirstSechemTreshold]
	);
};

// Checks if the given HTTP Response was sent from BGU Calculator
export const isBguResponse = function (response) {
	return response.includes(httpBguOnFinalSekem);
};

// Parses a given HTTP Response sent from BGU Calculator
export const parseBguResponse = function (response) {
	return response.split(";")[0].match(/\d/g).join("");
};
