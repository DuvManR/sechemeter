//~~~~~~~~~~~~~~~~~~ \\
// Send Post Request \\
// ~~~~~~~~~~~~~~~~~ \\

import { displayResults } from "../../utils/general-methods.js";
import {
	isBguResponse,
	parseBguResponse,
} from "../by-university/bgu-sechem.js";
import {
	isTauResponse,
	parseTauResponse,
} from "../by-university/tau-sechem.js";
import {
	httpContentType,
	httpForbidden,
	httpOk,
	httpPost,
	httpReadyState,
	sechemHTTPError,
	sechemResultsID,
} from "../sechem-config.js";
import { checkSechemTreshold } from "./handle-grades-validity.js";

// Initiates http connection for SECHEM calculations purposes
const sendPostRequest = function (url, data, headers, currentYearTreshold) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {
		// The status is ok
		if (xmlHttp.readyState == httpReadyState && xmlHttp.status == httpOk) {
			let response = xmlHttp.responseText;
			// Ignores empty responses
			if (response != null && !response.includes(null)) {
				// TAU response
				if (isTauResponse(response)) {
					let sechem = parseTauResponse(response);
					checkSechemTreshold(sechem, currentYearTreshold);
				}
				//BGU response
				else if (isBguResponse(response)) {
					let sechem = parseBguResponse(response);
					checkSechemTreshold(sechem, currentYearTreshold);
				}
			}
		}
		// HTTP status 403 - probably because of browser CORS restrictions
		// Raises error and solution to the user
		else if (
			xmlHttp.readyState == httpReadyState &&
			xmlHttp.status == httpForbidden
		) {
			displayResults(sechemResultsID, sechemHTTPError, true);
		}
	};

	// Sends data
	xmlHttp.open(httpPost, url, true); // true for asynchronous
	xmlHttp.setRequestHeader(httpContentType, headers[httpContentType]);
	xmlHttp.send(data);
};

export default sendPostRequest;
