// ~~~~~~~~~~~~~~~ \\
// Mobile Handling \\
// ~~~~~~~~~~~~~~~ \\

import {
	NONE,
	clickEvent,
	closeButtonID,
	lottieAnimationID,
	lottieConfigPath,
	lottieRenderer,
	oneHunderdPrecent,
	rotateMessageID,
} from "../../utils/general-config.js";
import {
	bagrutTableBorderStyle,
	bagrutTableSelectorQuery,
} from "../bagrut-config.js";

// Checks if the application is running on a mobile device
export const isMobile = function () {
	return /Mobi|Android/i.test(navigator.userAgent);
};

// In some mobiles there seem to be strange borders between table rows, that appear/disappear while zooming
// This function solves the problem, by resetting the table's borders.
export const adjustTableForMobile = function () {
	const table = document.querySelector(bagrutTableSelectorQuery);
	if (table) {
		table.style.border = NONE; // Temporarily removes borders
		table.style.width = oneHunderdPrecent; // Resets width
		setTimeout(() => {
			table.style.border = bagrutTableBorderStyle; // Reapplies borders
		}, 0); // Applies immediately after removing borders
	}
};

// Initializes Lottie animation
var animation = lottie.loadAnimation({
	container: document.getElementById(lottieAnimationID), // The DOM element where the animation will be added
	renderer: lottieRenderer, // Renders the animation as SVG
	loop: true, // Loops the animation
	autoplay: true, // Autoplays the animation
	path: lottieConfigPath, // Lottie-animation .config file
});

// Rotate-Phone close button functionality
document
	.getElementById(closeButtonID)
	.addEventListener(clickEvent, function () {
		document.getElementById(rotateMessageID).style.display = NONE;
	});

export default animation;
