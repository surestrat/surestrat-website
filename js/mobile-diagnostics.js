// Mobile browser diagnostics tool
(function () {
	// Function to log diagnostic information
	function logDiagnostics() {
		console.log("--- Browser Diagnostics ---");
		console.log("User Agent:", navigator.userAgent);
		console.log("Window Size:", window.innerWidth, "x", window.innerHeight);
		console.log("Popup Blocker:", testPopupBlocker());
		console.log("3rd Party Cookies:", testThirdPartyCookies());

		// Test if common ad-related elements are loaded
		document.addEventListener("DOMContentLoaded", function () {
			checkBlockedElements();
		});
	}

	// Test popup blocker
	function testPopupBlocker() {
		try {
			const popup = window.open("about:blank", "_blank");
			if (!popup || popup.closed) {
				return "Enabled (Blocking popups)";
			}
			popup.close();
			return "Disabled (Popups allowed)";
		} catch (e) {
			return "Error testing: " + e.message;
		}
	}

	// Test third-party cookies
	function testThirdPartyCookies() {
		return "Test requires implementation specific to your site";
	}

	// Check for blocked elements
	function checkBlockedElements() {
		// Common ad-related class names and IDs
		const adRelatedSelectors = [
			".ad",
			".ads",
			".advertisement",
			"#ad",
			"#ads",
			'[class*="ad-"]',
			'[id*="ad-"]',
			".popup",
			".modal",
			"iframe",
			".banner",
			'[class*="banner"]',
		];

		adRelatedSelectors.forEach((selector) => {
			const elements = document.querySelectorAll(selector);
			if (elements.length > 0) {
				console.log(`Found ${elements.length} elements matching "${selector}"`);
				elements.forEach((el) => {
					console.log(`- Element:`, el);
					console.log(`  Visible:`, isVisible(el));
				});
			}
		});
	}

	// Check if element is visible
	function isVisible(el) {
		if (!el) return false;
		const style = window.getComputedStyle(el);
		return (
			style.display !== "none" &&
			style.visibility !== "hidden" &&
			style.opacity !== "0"
		);
	}

	// Execute diagnostics
	logDiagnostics();

	// Create a visible notification for mobile users
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
	) {
		const diagnosticDiv = document.createElement("div");
		diagnosticDiv.style.position = "fixed";
		diagnosticDiv.style.bottom = "0";
		diagnosticDiv.style.left = "0";
		diagnosticDiv.style.right = "0";
		diagnosticDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
		diagnosticDiv.style.color = "white";
		diagnosticDiv.style.padding = "10px";
		diagnosticDiv.style.zIndex = "9999";
		diagnosticDiv.innerHTML =
			"Diagnostics running. Check console for results or tap here to show basic info.";

		diagnosticDiv.addEventListener("click", function () {
			alert(
				"User Agent: " +
					navigator.userAgent +
					"\nScreen: " +
					window.innerWidth +
					"x" +
					window.innerHeight +
					"\nCheck the issues tab in browser dev tools for more detailed information."
			);
		});

		document.body.appendChild(diagnosticDiv);
	}
})();
