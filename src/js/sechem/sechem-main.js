// ~~~~~~~~~~~ \\
// Sechem Main \\
// ~~~~~~~~~~~ \\

import getUniSechemTreshold from "./utils/handle-google-sheet.js";
import { displayResults } from "../utils/general-methods.js";
import initiateSechemCalc from "./utils/handle-sechem-calc.js";
import sechemTypeSwitchHandler from "../utils/frame-switch-handler.js";
import sechemUniSelector from "./utils/handle-visual-changes.js";

const initiateSechemFrame = () => {
	console.log("Sechem Frame Successfully Loaded!");
};

export default initiateSechemFrame;
