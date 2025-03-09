function detectAdBlocker() {
	// Create a "bait" element that might be hidden by ad blockers
	const testAd = document.createElement("div");
	testAd.className = "ads ad adsbox doubleclick ad-placement carbon-ads";
	testAd.innerHTML = "&nbsp;";
	testAd.style.position = "absolute";
	testAd.style.opacity = "0";
	document.body.appendChild(testAd);

	// Check if the element is hidden
	setTimeout(function () {
		const isBlocked =
			testAd.offsetParent === null ||
			testAd.offsetHeight === 0 ||
			testAd.offsetWidth === 0;

		if (isBlocked) {
			console.warn("Ad blocker detected");

			// Create a user-friendly message
			const message = document.createElement("div");
			message.style.padding = "15px";
			message.style.backgroundColor = "#f8d7da";
			message.style.color = "#721c24";
			message.style.borderRadius = "4px";
			message.style.margin = "10px 0";
			message.style.textAlign = "center";
			message.innerHTML =
				"We've detected that you're using an ad blocker. Some features of our site may not work correctly. If you're experiencing issues, please try disabling your ad blocker for this site.";

			// Insert at the top of the body
			document.body.insertBefore(message, document.body.firstChild);
		}

		// Clean up the test element
		document.body.removeChild(testAd);
	}, 100);
}

// Run the detection when the page loads
window.addEventListener("load", detectAdBlocker);
