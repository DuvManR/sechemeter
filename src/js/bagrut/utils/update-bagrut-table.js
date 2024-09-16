// ~~~~~~~~~~~~~~~~~~~ \\
// Update Bagrut Table \\
// ~~~~~~~~~~~~~~~~~~~ \\

import {
	addRowButtonID,
	bagrutLogoImageID,
	bagrutRefID,
	bagrutSelectID,
	bguBagrutRefURL,
	biuBagrutRefURL,
	fiveUnits,
	hujiBagrutRefURL,
	noBonus,
	tauBagrutRefURL,
	techBagrutRefURL,
} from "../bagrut-config.js";
import updateAvg from "./bagrut-avg-calc.js";
import { checkMizrafSubjects } from "../by-university/tech-bagrut.js";
import bagrutTableBody, { createBagrutRow } from "./create-bagrut-table.js";
import { isMobile, adjustTableForMobile } from "./handle-mobile-rotation.js";
import {
	updateImage,
	updateReferenceURL,
} from "../../utils/general-methods.js";
import {
	BGU,
	BIU,
	HUJI,
	TAU,
	TECH,
	defaultUniLogo,
	tauLogo,
	hujiLogo,
	techLogo,
	bguLogo,
	biuLogo,
	clickEvent,
	NONE,
	displayBlock,
} from "../../utils/general-config.js";

// Updates university logo when switching from one university to another
const bagrutUniSelector = (document.getElementById(bagrutSelectID).onchange =
	function () {
		// Gets the selected option value
		let selectedUniversity = this.value;

		// Updates university logo when switching from one university to another
		switch (selectedUniversity) {
			case TAU:
				updateBagrutVisualChanges(
					tauLogo,
					tauBagrutRefURL,
					displayBlock
				);
				break;
			case HUJI:
				updateBagrutVisualChanges(
					hujiLogo,
					hujiBagrutRefURL,
					displayBlock
				);
				break;
			case TECH:
				updateBagrutVisualChanges(
					techLogo,
					techBagrutRefURL,
					displayBlock
				);
				checkMizrafSubjects();
				break;
			case BGU:
				updateBagrutVisualChanges(
					bguLogo,
					bguBagrutRefURL,
					displayBlock
				);
				break;
			case BIU:
				updateBagrutVisualChanges(
					biuLogo,
					biuBagrutRefURL,
					displayBlock
				);
				break;
			default:
				updateBagrutVisualChanges(defaultUniLogo, "", NONE);
		}

		// On CHANGE EVENT of select-universities element, updates the bagrut-average accordingly
		updateAvg();
	});

// Gets a new UniversityImage.
// Gets new bagrut reference URL & Display values.
// Updates everything accordingly.
const updateBagrutVisualChanges = function (imageSrc, ref, refDisplay) {
	updateImage(bagrutLogoImageID, imageSrc);
	updateReferenceURL(bagrutRefID, ref, refDisplay);
};

// Sets bagrut-table-row's style based on whether it was calcaulated in average or not
HTMLTableRowElement.prototype.setRowStyle = function (
	fontWeight,
	backgroundColor
) {
	this.style.fontWeight = fontWeight; // Bolds\Unbolds Rows's Text
	this.style.backgroundColor = backgroundColor; // Row's Background Color
};

// Adds a CLICK event-listener to the add-row-button button
document.getElementById(addRowButtonID).addEventListener(clickEvent, () => {
	// Creates a new bagrut-table-row
	const newRow = createBagrutRow("", fiveUnits, noBonus, true);
	bagrutTableBody.appendChild(newRow);

	// Fixes a strange bug in mobiles, in which strange borders seem to appear between table rows,
	// that appear/disappear while zooming
	if (isMobile()) {
		adjustTableForMobile();
	}
});

export default bagrutUniSelector;
