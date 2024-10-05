// ~~~~~~~~~~~~ \\
// Porject Main \\
// ~~~~~~~~~~~~ \\

import initiateSechemFrame from "./sechem/sechem-main.js";
import initiateBagrutFrame from "./bagrut/bagrut-main.js";
import handleLoadingOverlay from "./utils/loading-overlay.js";

async function main() {
	await initiateSechemFrame();
	await initiateBagrutFrame();
	handleLoadingOverlay();
}

main();
