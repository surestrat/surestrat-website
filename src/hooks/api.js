import { toast } from "react-hot-toast";
import { logger } from "@utils/logger";

const API_URL = `${import.meta.env.VITE_API_URL}/submit-quote`;

export const submitQuoteForm = async (formData) => {
	try {
		console && console.log("🚀 Submitting quote form data:", formData);
		console && console.log("🔗 API URL:", API_URL);

		console && console.log("📤 Sending API request...");
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
			credentials: "include",
			mode: "cors",
		});

		console && console.log("📥 API response status:", response.status);

		if (!response.ok) {
			const errorData = await response.json();
			console && console.error("❌ API error response:", errorData);
			throw new Error(
				errorData.error || `HTTP error! status: ${response.status}`
			);
		}

		const responseData = await response.json();
		console && console.log("✅ API success response:", responseData);
		return responseData;
	} catch (error) {
		console && console.error("❌ Form submission error:", error);
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
	logger.info("Starting quote submission process");
	try {
		setIsSubmitting(true);
		logger.debug("Form data to be submitted:", data);

		const response = await fetch("/api/submit-quote.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const result = await response.json();
		logger.debug("API response received:", result);

		if (!response.ok) {
			throw new Error(result.error || "Failed to submit quote");
		}

		logger.info("Quote submitted successfully, ID:", result.quoteId);
		setSubmitSuccess(true);
		reset(); // Reset form on success

		// After 3 seconds, reset the success state
		setTimeout(() => {
			setSubmitSuccess(false);
			logger.debug("Reset submit success state");
		}, 3000);
	} catch (error) {
		logger.error("Error submitting quote:", error);
		setSubmitError(error.message || "An unexpected error occurred");
	} finally {
		setIsSubmitting(false);
		logger.debug("Quote submission process completed");
	}
};
