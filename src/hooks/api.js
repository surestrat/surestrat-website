import { logger } from "@utils/logger";
import { quoteFormSchema, apiResponseSchema } from "@schemas/quoteFormSchema";

export const handleQuoteSubmission = async (
	data,
	setIsSubmitting,
	setSubmitError,
	setSubmitSuccess,
	reset
) => {
	logger.info("🏁 Quote submission started with data:", data);
	try {
		// First, validate the form data with zod
		const validationResult = quoteFormSchema.safeParse(data);

		if (!validationResult.success) {
			const formattedErrors = validationResult.error.format();
			logger.error("❌ Validation errors:", formattedErrors);

			// Get all error messages
			const errorMessages = validationResult.error.errors.map((err) => {
				// Format the path for better readability
				const fieldName = err.path.join(".").replace(/\.(\d+)/g, "[$1]");
				return `${fieldName}: ${err.message}`;
			});

			throw new Error(errorMessages[0] || "Form validation failed");
		}

		setIsSubmitting(true);

		// Use validated and transformed data
		const validatedData = validationResult.data;
		logger.debug("🔄 Validated submission data:", validatedData);

		// Check which API endpoint to use based on environment
		const useLocalApi =
			window.location.hostname === "localhost" ||
			window.location.hostname === "127.0.0.1";

		// Fix the API URL - notice the double slash in your logs
		let apiUrl = useLocalApi
			? "/api/submit-quote.php"
			: `${import.meta.env.VITE_API_URL}/api/submit-quote.php`; // Add .php and fix double slash

		logger.debug("🔗 Using API endpoint:", apiUrl);

		try {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(validatedData),
			});

			logger.debug("📥 API response status:", response.status);

			// Get the text response first for debugging
			const responseText = await response.text();
			logger.debug("📄 Raw API response:", responseText);

			// Handle empty responses
			if (!responseText || responseText.trim() === "") {
				throw new Error("Server returned empty response");
			}

			// Log the raw text before attempting to parse
			console.log("Raw response text:", responseText);

			let result;
			try {
				// Try to parse as JSON
				result = JSON.parse(responseText);

				// Validate the response format
				const validatedResponse = apiResponseSchema.safeParse(result);
				if (!validatedResponse.success) {
					logger.error(
						"❌ API response validation error:",
						validatedResponse.error
					);
					throw new Error("Server returned unexpected response format");
				}

				result = validatedResponse.data;

				if (!result.success) {
					throw new Error(result.error || "Failed to submit quote");
				}
			} catch (parseError) {
				logger.error("❌ JSON parse error:", parseError);
				logger.error("❌ Invalid JSON response:", responseText);
				// If the response contains HTML tags, it's likely the server returned an HTML error page
				if (
					responseText.includes("<html") ||
					responseText.includes("<!DOCTYPE")
				) {
					throw new Error(
						"Server returned HTML instead of JSON. The server might be misconfigured."
					);
				} else {
					throw new Error(
						`Failed to parse server response: ${parseError.message}`
					);
				}
			}

			logger.info("✅ Quote submitted successfully, ID:", result.quoteId);
			setSubmitSuccess(true);
			reset(); // Reset form on success

			// After 3 seconds, reset the success state
			setTimeout(() => {
				setSubmitSuccess(false);
				logger.debug("🔄 Reset submit success state");
			}, 3000);
		} catch (fetchError) {
			logger.error("💔 API request failed:", fetchError);
			throw new Error(`Network error: ${fetchError.message}`);
		}
	} catch (error) {
		logger.error("💔 Quote submission failed:", error);
		setSubmitError(error.message || "An unexpected error occurred");
	} finally {
		setIsSubmitting(false);
		logger.debug("🏷️ Quote submission process completed");
	}
};
