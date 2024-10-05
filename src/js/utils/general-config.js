// ~~~~~~~~~~~~~~ \\
// General Config \\
// ~~~~~~~~~~~~~~ \\

// Allowed specific control keys, shortcuts, and page navigation keys
export const allowedKeys = [
	"Backspace",
	"Delete",
	"ArrowLeft",
	"ArrowRight",
	"ArrowUp",
	"ArrowDown",
	"Tab",
	"Enter",
	"Escape",
	"F5",
	"F6",
	"F7",
	"F8",
	"F9",
	"F10",
	"F11",
	"F12",
];
export const ctrlShortcuts = [
	"KeyA",
	"KeyC",
	"KeyV",
	"KeyX",
	"KeyR",
	"Minus",
	"Equal",
];

// Univesity Logo Images
export const defaultImg = new Image("200", "200");
defaultImg.src = "./src/img/default-uni.png";
export const tauImg = new Image("200", "200");
tauImg.src = "./src/img/tau.png";
export const hujiImg = new Image("200", "200");
hujiImg.src = "./src/img/huji.png";
export const techImg = new Image("200", "200");
techImg.src = "./src/img/tech.png";
export const bguImg = new Image("200", "200");
bguImg.src = "./src/img/bgu.png";
export const biuImg = new Image("200", "200");
biuImg.src = "./src/img/biu.png";

// Universities
export const defaultUni = "default-uni";
export const TAU = "TAU";
export const HUJI = "HUJI";
export const TECH = "TECH";
export const BGU = "BGU";
export const BIU = "BIU";
export const hyphenSlicer = "-";

// Elements IDs, Classes & names
export const tableSelectClass = "table-select";
export const tableInputClass = "table-input";
export const deleteName = "delete";
export const selectElement = "select";
export const buttonElement = "button";
export const optionElement = "option";
export const inputElement = "input";
export const tableCellElement = "td";
export const tableRowElement = "tr";
export const tableBodyElement = "tbody";
export const numberInputType = "number";
export const textInputType = "text";
export const inputSelectorQuery = 'input[name="{0}"]';
export const bagrutRowSelectorQuery = "{0} tr";

// Event Listeners
export const inputEvent = "input";
export const keyDownEvent = "keydown";
export const clickEvent = "click";
export const changeEvent = "change";
export const enterKey = "Enter";

// Mobile Handling Constants
export const lottieConfigPath = "./src/json/rotate-phone.json";
export const lottieAnimationID = "lottie-animation";
export const closeButtonID = "close-button";
export const rotateMessageID = "rotate-message";
export const lottieRenderer = "svg";

// Elements IDs, Classes, Names & Selector Queries
export const loadingOverlayID = "loading-overlay";
export const imgSelectorQuery = "img";

// General Style Constants
export const NONE = "none";
export const zeroOpacity = "0";
export const oneHunderdPrecent = "100%";
export const displayBlock = "block";
export const displayRevert = "revert";
export const activeForm = "active";
export const hiddenVisibility = "hidden";
export const primaryColor = "--primary-color";
export const secondaryColor = "--secondary-color";
export const tableBorderColor = "--table-border-color";
export const tableTextColor = "--table-text-color";
export const tableThColor = "--table-th-color";
export const tableLinesColor = "--table-lines-color";
