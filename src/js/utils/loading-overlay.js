// ~~~~~~~~~~~~~~~ \\
// Loading Overlay \\
// ~~~~~~~~~~~~~~~ \\

import {
	hiddenVisibility,
	loadingOverlayID,
	zeroOpacity,
} from "./general-config.js";

// Wait until the DOM is fully loaded
const handleLoadingOverlay = function () {
	// After all initializations are complete, remove the loading overlay
	const overlay = document.getElementById(loadingOverlayID);
	if (overlay) {
		// Option 1: Fade out the overlay for a smooth transition
		overlay.style.opacity = zeroOpacity;
		overlay.style.visibility = hiddenVisibility;
		// Optionally, remove the overlay from the DOM after the transition
		setTimeout(() => {
			if (overlay.parentNode) {
				overlay.parentNode.removeChild(overlay);
			}
		}, 300); // Match this timeout with the CSS transition duration

		// Option 2: Immediately remove the overlay without transition
		// overlay.parentNode.removeChild(overlay);
	}
};

export default handleLoadingOverlay;
