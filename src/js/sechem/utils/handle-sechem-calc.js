// ~~~~~~~~~~~~~~~~~~~~~~~~~~ \\
// Handle Sechem Calculations \\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~ \\

import {
	calculateTauFirst,
	calculateTauFinal,
} from "../by-university/tau-sechem.js";
import {
	calculateHujiFirst,
	calculateHujiFinal,
} from "../by-university/huji-sechem.js";
import {
	calculateTechFirst,
	calculateTechFinal,
} from "../by-university/tech-sechem.js";
import { calculateBguFirst } from "../by-university/bgu-sechem.js";
import {
	calculateBiuFirst,
	calculateBiuFinal,
} from "../by-university/biu-sechem.js";
import {
	clickEvent,
	enterKey,
	keyDownEvent,
} from "../../utils/general-config.js";
import {
	bguFirst,
	biuFinal,
	biuFirst,
	bottomInputID,
	hujiFinal,
	hujiFirst,
	sechemButtonDefaultText,
	sechemButtonID,
	sechemButtonOnClickText,
	sechemButtonTimeout,
	sechemSelectID,
	tauFinal,
	tauFirst,
	techFinal,
	techFirst,
	topInputID,
} from "../sechem-config.js";
import {
	displayChooseUniLog,
	displayNoResults,
} from "./update-sechem-results.js";
import { getSelectedOption } from "../../utils/general-methods.js";

// Calculates SECHEM when button is clicked
const initiateSechemCalc = document
	.getElementById(sechemButtonID)
	.addEventListener(clickEvent, function () {
		// Spinner effect
		this.innerHTML = sechemButtonOnClickText;
		this.disabled = true;

		// Clears result box
		displayNoResults();

		// Gets the values from the input boxes
		let topInput = parseFloat(document.getElementById(topInputID).value);
		let bottomInput = parseFloat(
			document.getElementById(bottomInputID).value
		);

		// Gets the selected option and executes the relevant function
		let selectedOption = getSelectedOption(sechemSelectID);
		switch (selectedOption) {
			case tauFirst:
				calculateTauFirst(topInput, bottomInput);
				break;
			case tauFinal:
				calculateTauFinal(topInput, bottomInput);
				break;
			case hujiFirst:
				calculateHujiFirst(topInput, bottomInput);
				break;
			case hujiFinal:
				calculateHujiFinal(topInput, bottomInput);
				break;
			case techFirst:
				calculateTechFirst(topInput, bottomInput);
				break;
			case techFinal:
				calculateTechFinal(topInput, bottomInput);
				break;
			case bguFirst:
				calculateBguFirst(topInput, bottomInput);
				break;
			case biuFirst:
				calculateBiuFirst(topInput, bottomInput);
				break;
			case biuFinal:
				calculateBiuFinal(topInput, bottomInput);
				break;
			default:
				displayChooseUniLog();
		}

		// Spinner effect timeout
		setTimeout(() => {
			this.innerHTML = sechemButtonDefaultText;
			this.disabled = false;
		}, sechemButtonTimeout);
	});

// Calculates SECHEM when ENTER key is clicked
function handleEnterPressed(event) {
	if (event.key == enterKey) {
		document.getElementById(sechemButtonID).click();
	}
}
document.addEventListener(keyDownEvent, handleEnterPressed);

export default initiateSechemCalc;
