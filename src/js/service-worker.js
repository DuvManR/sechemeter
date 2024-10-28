// ~~~~~~~~~~~~~~ \\
// Service Worker \\
// ~~~~~~~~~~~~~~ \\

// Listen for the install event
self.addEventListener("install", (event) => {
	// console.log("serviceWorkerInstalledLog");
});

// Listen for the activate event
self.addEventListener("activate", (event) => {
	// console.log("serviceWorkerActivatedLog");
});

// Listen for fetch events
self.addEventListener("fetch", (event) => {
	// console.log("serviceWorkerFetchingLog", event.request.url);
});
