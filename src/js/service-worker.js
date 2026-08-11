// ~~~~~~~~~~~~~~ \\
// Service Worker \\
// ~~~~~~~~~~~~~~ \\

import { activateEvent, fetchEvent, installEvent } from "./general-config.js";

// Listen for the install event
self.addEventListener(installEvent, (event) => {
	// console.log("serviceWorkerInstalledLog");
});

// Listen for the activate event
self.addEventListener(activateEvent, (event) => {
	// console.log("serviceWorkerActivatedLog");
});

// Listen for fetch events
self.addEventListener(fetchEvent, (event) => {
	// console.log("serviceWorkerFetchingLog", event.request.url);
});
