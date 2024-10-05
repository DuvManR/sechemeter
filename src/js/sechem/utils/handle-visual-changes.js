// ~~~~~~~~~~~~~~~~~~~~~ \\
// Handle Visual Changes \\
// ~~~~~~~~~~~~~~~~~~~~~ \\

import {
	bguFirst,
	biuFinal,
	biuFirst,
	bottomInputID,
	bottomLabelID,
	hujiFinal,
	hujiFirst,
	labelBguBagrutText,
	labelBguPsychoText,
	labelBiuBagrutText,
	labelBiuFinalText,
	labelBiuPsychoText,
	labelDefaultText,
	labelHujiBagrutText,
	labelHujiCognitiveText,
	labelHujiMorText,
	labelHujiPsychoText,
	labelTauBagrutText,
	labelTauCognitiveText,
	labelTauMorText,
	labelTauPsychoText,
	labelTechBagrutText,
	labelTechMorText,
	labelTechPsychoText,
	sechemLogoImageID,
	sechemSelectID,
	sechemTableID,
	sechemTableLabelID,
	tauFinal,
	tauFirst,
	techFinal,
	techFirst,
	topInputID,
	topLabelID,
} from "../sechem-config.js";
import { updateImage } from "../../utils/general-methods.js";
import {
	NONE,
	bguImg,
	biuImg,
	defaultImg,
	defaultUni,
	displayBlock,
	displayRevert,
	hujiImg,
	tauImg,
	techImg,
} from "../../utils/general-config.js";
import { displayDefaultLog } from "./update-sechem-results.js";
import removeOldTableAndCreateNew from "./handle-sechem-table.js";

let lastSelectedOptionValue = defaultUni;
// Updates university logo and label when switching from one university to another
export const sechemUniSelector = (document.getElementById(
	sechemSelectID
).onchange = function () {
	// Gets the selected option value & makes updates accordingly
	let selectedUniversity = this.value;

	// In case a user has entered values before choosing a university
	if (lastSelectedOptionValue == defaultUni) {
		clearInputs();
	}
	lastSelectedOptionValue = selectedUniversity;

	// updateSechemVisualChanges() updates the labels, inputs and sechemTable display values
	switch (selectedUniversity) {
		case tauFirst:
			updateSechemVisualChanges(
				labelTauBagrutText,
				labelTauPsychoText,
				displayBlock,
				displayBlock,
				displayRevert,
				false,
				tauImg
			);
			removeOldTableAndCreateNew(selectedUniversity);
			break;
		case tauFinal:
			updateSechemVisualChanges(
				labelTauCognitiveText,
				labelTauMorText,
				displayBlock,
				displayBlock,
				displayRevert,
				false,
				tauImg
			);
			removeOldTableAndCreateNew(selectedUniversity);
			break;
		case hujiFirst:
			updateSechemVisualChanges(
				labelHujiBagrutText,
				labelHujiPsychoText,
				displayBlock,
				displayBlock,
				displayRevert,
				false,
				hujiImg
			);
			removeOldTableAndCreateNew(selectedUniversity);
			break;
		case hujiFinal:
			updateSechemVisualChanges(
				labelHujiCognitiveText,
				labelHujiMorText,
				displayBlock,
				displayBlock,
				displayRevert,
				false,
				hujiImg
			);
			removeOldTableAndCreateNew(selectedUniversity);
			break;
		case techFirst:
			updateSechemVisualChanges(
				labelTechBagrutText,
				labelTechPsychoText,
				displayBlock,
				displayBlock,
				displayRevert,
				false,
				techImg
			);
			removeOldTableAndCreateNew(selectedUniversity);
			break;
		case techFinal:
			updateSechemVisualChanges(
				labelDefaultText,
				labelTechMorText,
				NONE,
				displayBlock,
				displayRevert,
				false,
				techImg
			);
			removeOldTableAndCreateNew(selectedUniversity);
			break;
		case bguFirst:
			updateSechemVisualChanges(
				labelBguBagrutText,
				labelBguPsychoText,
				displayBlock,
				displayBlock,
				NONE,
				false,
				bguImg
			);
			break;
		case biuFirst:
			updateSechemVisualChanges(
				labelBiuBagrutText,
				labelBiuPsychoText,
				displayBlock,
				displayBlock,
				NONE,
				false,
				biuImg
			);
			break;
		case biuFinal:
			updateSechemVisualChanges(
				labelBiuFinalText,
				labelDefaultText,
				displayBlock,
				NONE,
				displayRevert,
				true,
				biuImg
			);
			removeOldTableAndCreateNew(selectedUniversity);
			break;
		default:
			updateSechemVisualChanges(
				labelDefaultText,
				labelDefaultText,
				displayBlock,
				displayBlock,
				NONE,
				true,
				defaultImg
			);
	}

	// Clears results
	displayDefaultLog();
});

// Gets new texts for the Input Labels & Display values.
// Gets Display values of the sechemTable.
// Gets a new UniversityImage.
// Updates everything accordingly.
const updateSechemVisualChanges = function (
	topLabelText,
	bottomLabelText,
	topInputDisplay,
	bottomInputDisplay,
	sechemTableDisplay,
	clearBothInputs,
	newImg
) {
	updateLabels(
		topLabelText,
		bottomLabelText,
		topInputDisplay,
		bottomInputDisplay
	);
	updateInputs(topInputDisplay, bottomInputDisplay, clearBothInputs);
	updateSechemTable(sechemTableDisplay);
	updateImage(sechemLogoImageID, newImg);
};

// Updates Labels' text content & Display values
function updateLabels(
	topLabelText,
	bottomLabelText,
	topLabelDisplay = displayBlock,
	bottomLabelDisplay = displayBlock
) {
	let topLabelElement = document.getElementById(topLabelID);
	topLabelElement.textContent = topLabelText;
	topLabelElement.style.display = topLabelDisplay;

	let bottomLabelElement = document.getElementById(bottomLabelID);
	bottomLabelElement.textContent = bottomLabelText;
	bottomLabelElement.style.display = bottomLabelDisplay;
}

// Updates Inputs' Display values & clears one / both
function updateInputs(topInputDisplay, bottomInputDisplay, clearBothInputs) {
	let topInputElement = document.getElementById(topInputID);
	topInputElement.style.display = topInputDisplay;

	let bottomInputElement = document.getElementById(bottomInputID);
	bottomInputElement.style.display = bottomInputDisplay;

	clearInputs(clearBothInputs);
}

// Updates sechemTable Display value
function updateSechemTable(sechemTableDisplay) {
	let sechemTableElement = document.getElementById(sechemTableID);
	sechemTableElement.style.display = sechemTableDisplay;

	let sechemTableLabelElement = document.getElementById(sechemTableLabelID);
	if (sechemTableDisplay == displayRevert) {
		sechemTableLabelElement.style.display = displayBlock;
	} else {
		sechemTableLabelElement.style.display = NONE;
	}
}

// Clears both Input Elements (top & bottom) if both=true. Otherwise clears only the top one.
function clearInputs(both = true) {
	document.getElementById(topInputID).value = "";
	if (both) {
		document.getElementById(bottomInputID).value = "";
	}
}

export default updateSechemVisualChanges;
