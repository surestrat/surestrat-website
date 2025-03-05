import { logger } from "@utils/logger";

const API_URL = `${import.meta.env.VITE_API_URL}/submit-quote`;

export const submitQuoteForm = async (formData) => {
	try {
		logger.log("🚀 Submitting quote form data:", formData);
		logger.log("🔗 API URL:", API_URL);

		logger.log("📤 Sending API request...");
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
			credentials: "include",
			mode: "cors",
		});

		logger.log("📥 API response status:", response.status);

		// Store the response text first to debug it
		const responseText = await response.text();
		logger.log("📄 Raw API response:", responseText);

		let responseData;
		try {
			// Try to parse the response as JSON
			responseData = JSON.parse(responseText);
		} catch (parseError) {
			logger.error("❌ JSON parse error:", parseError);
			logger.error("❌ Invalid JSON response:", responseText);
			throw new Error("Server returned invalid JSON response");
		}

		if (!response.ok) {
			logger.error("❌ API error response:", responseData);
			throw new Error(
				responseData.error || `HTTP error! status: ${response.status}`
			);
		}

		logger.log("✅ API success response:", responseData);
		return responseData;
	} catch (error) {
		logger.error("❌ Form submission error:", error);
		throw error;
	}
};

export const handleQuoteSubmission = async (
	data,
	setIsSubmitting,
	setSubmitError,
	setSubmitSuccess,
	reset
) => {
	logger.info("🏁 Quote submission started with data:", data);
	try {
		setIsSubmitting(true);
		logger.debug("🔄 Formatted submission data:", data);

		// Check which API endpoint to use based on environment
		const useLocalApi =
			window.location.hostname === "localhost" ||
			window.location.hostname === "127.0.0.1";

		let apiUrl = useLocalApi
			? "/api/submit-quote.php"
			: `${import.meta.env.VITE_API_URL}/submit-quote`;
		logger.debug("🔗 Using API endpoint:", apiUrl);

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		logger.debug("📥 API response status:", response.status);

		// Get the raw text response first to debug if needed
		const responseText = await response.text();
		logger.debug("📄 Raw API response:", responseText);

		let result;
		try {
			// Try to parse as JSON, but handle non-JSON responses gracefully
			result = responseText ? JSON.parse(responseText) : {};
		} catch (parseError) {
			logger.error("❌ JSON parse error:", parseError);
			logger.error("❌ Invalid JSON response:", responseText);
			throw new Error("Server returned invalid JSON response");
		}

		if (!response.ok) {
			throw new Error(result.error || "Failed to submit quote");
		}

		logger.info("✅ Quote submitted successfully, ID:", result.quoteId);
		setSubmitSuccess(true);
		reset(); // Reset form on success

		// After 3 seconds, reset the success state
		setTimeout(() => {
			setSubmitSuccess(false);
			logger.debug("🔄 Reset submit success state");
		}, 3000);
	} catch (error) {
		logger.error("💔 Quote submission failed:", error);
		setSubmitError(error.message || "An unexpected error occurred");
	} finally {
		setIsSubmitting(false);
		logger.debug("🏷️ Quote submission process completed");
	}
};
