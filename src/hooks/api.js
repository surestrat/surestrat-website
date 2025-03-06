import { logger } from "@utils/logger";
import {
	personalSchema,
	insuranceTypesSchema,
	vehicleSchema,
	propertySchema,
	lifeSchema,
	businessSchema,
	termsSchema,
	apiResponseSchema,
} from "@schemas/quoteFormSchema";
import { z } from "zod";

// Combine all schemas
const quoteFormSchema = z
	.object({})
	.merge(personalSchema)
	.merge(insuranceTypesSchema)
	.merge(
		z.object({
			termsAccepted: termsSchema.shape.termsAccepted,
			// All other fields are optional and validated conditionally
			...vehicleSchema.partial().shape,
			...propertySchema.partial().shape,
			...lifeSchema.partial().shape,
			...businessSchema.partial().shape,
		})
	);

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

			// Get the first error message to display to user
			const firstError = validationResult.error.errors[0];
			throw new Error(firstError?.message || "Form validation failed");
		}

		setIsSubmitting(true);

		// Use validated and transformed data
		const validatedData = validationResult.data;
		logger.debug("🔄 Validated submission data:", validatedData);

		// Check which API endpoint to use based on environment
		const useLocalApi =
			window.location.hostname === "localhost" ||
			window.location.hostname === "127.0.0.1";

		let apiUrl = useLocalApi
			? "/api/submit-quote.php"
			: `${import.meta.env.VITE_API_URL}/api/submit-quote`;
		logger.debug("🔗 Using API endpoint:", apiUrl);

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(validatedData),
		});

		logger.debug("📥 API response status:", response.status);

		// First check if response is ok based on status code
		if (!response.ok) {
			// Try to get error message from response body
			try {
				const errorData = await response.json();
				throw new Error(
					errorData.error || `HTTP error! status: ${response.status}`
				);
			} catch (parseError) {
				// If can't parse JSON from error response
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
		}

		// Get the text response first to debug if needed
		const responseText = await response.text();
		logger.debug("📄 Raw API response:", responseText);

		// Handle empty response
		if (!responseText || responseText.trim() === "") {
			throw new Error("Server returned empty response");
		}

		let result;
		try {
			// Try to parse as JSON
			result = JSON.parse(responseText);

			// Validate the response against our schema
			const validatedResponse = apiResponseSchema.safeParse(result);
			if (!validatedResponse.success) {
				logger.error(
					"❌ API response validation error:",
					validatedResponse.error
				);
				throw new Error("Server returned unexpected response format");
			}

			result = validatedResponse.data;

			// Double check success flag from API
			if (!result.success) {
				throw new Error(result.error || "Failed to submit quote");
			}
		} catch (parseError) {
			logger.error("❌ JSON parse error:", parseError);
			logger.error("❌ Invalid JSON response:", responseText);
			throw new Error("Server returned invalid JSON response");
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
