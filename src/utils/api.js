import axios from "axios";
import { logger } from "@utils/logger";
import { quoteFormSchema } from "@schemas/quoteFormSchema";

// Create axios instance with default configurations
const api = axios.create({
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 30000, // 30 seconds
});

// Add a request interceptor for logging and validation
api.interceptors.request.use(
	(config) => {
		// Log the request details
		logger.debug(
			`🚀 Making ${config.method.toUpperCase()} request to: ${config.url}`
		);

		// Check for data size limits to prevent oversized payloads
		if (config.data && JSON.stringify(config.data).length > 1000000) {
			// ~1MB limit
			logger.error("❌ Request payload too large");
			throw new Error(
				"Request payload too large. Please reduce the size of your submission."
			);
		}

		// Add timestamp to the request for tracking
		config.headers["X-Request-Time"] = new Date().toISOString();

		return config;
	},
	(error) => {
		logger.error("❌ Request error:", error);
		return Promise.reject(error);
	}
);

// Add a response interceptor for logging
api.interceptors.response.use(
	(response) => {
		logger.debug(
			`✅ Response received from ${response.config.url}:`,
			response.status
		);
		return response;
	},
	(error) => {
		if (error.response) {
			// Server responded with non-2xx status
			logger.error(
				`🔴 Server response error ${error.response.status}:`,
				error.response.data
			);
		} else if (error.request) {
			// Request was made but no response received
			logger.error("🔴 No response received:", error.request);
		} else {
			// Error setting up the request
			logger.error("🔴 Request setup error:", error.message);
		}
		return Promise.reject(error);
	}
);

// Sanitize numeric fields
const sanitizeNumericFields = (data) => {
	// Create a copy to avoid mutating the original
	const sanitized = { ...data };

	// Fields that need to be sanitized
	const numericFields = [
		"propertyValue",
		"age",
		"employeeCount",
		"vehicleYear",
		"monthlyIncome",
	];

	// Sanitize each field
	for (const field of numericFields) {
		if (field in sanitized) {
			// Convert to number, if it's not a valid number set to null
			const value = sanitized[field];
			if (value === "" || value === undefined) {
				sanitized[field] = null;
			} else {
				const num = Number(value);
				sanitized[field] = isNaN(num) ? null : num;
			}
		}
	}

	return sanitized;
};

// Check if a response is valid JSON or PHP source code
const isValidResponse = (responseText) => {
	// Check if response starts with PHP opening tag
	if (responseText.trim().startsWith("<?php")) {
		return false;
	}

	// Try parsing as JSON
	try {
		JSON.parse(responseText);
		return true;
	} catch (e) {
		return false;
	}
};

/**
 * Handle quote form submission
 * @param {Object} data Form data to submit
 * @param {Function} setIsSubmitting State setter for submission status
 * @param {Function} setSubmitError State setter for error state
 * @param {Function} setSubmitSuccess State setter for success state
 * @param {Function} reset Form reset function from react-hook-form
 */
export const handleQuoteSubmission = async (
	data,
	setIsSubmitting,
	setSubmitError,
	setSubmitSuccess,
	reset
) => {
	// Sanitize the data before submission
	const sanitizedData = sanitizeNumericFields(data);

	logger.info("🏁 Quote submission started");
	logger.debug("📝 Form data:", data);

	try {
		// First, validate the form data with zod
		const validationResult = quoteFormSchema.safeParse(sanitizedData);

		if (!validationResult.success) {
			const formattedErrors = validationResult.error.format();
			logger.error("❌ Form validation errors:", formattedErrors);

			// Format error messages for display
			const errorMessages = validationResult.error.errors.map((err) => {
				// Format the path for better readability
				const fieldName = err.path.join(".").replace(/\.(\d+)/g, "[$1]");
				return `${fieldName}: ${err.message}`;
			});

			throw new Error(errorMessages[0] || "Form validation failed");
		}

		// Start submission process
		setIsSubmitting(true);
		setSubmitError(null);

		// Use validated data
		const validatedData = validationResult.data;

		// Check for network connection before attempting submission
		if (!navigator.onLine) {
			throw new Error(
				"You appear to be offline. Please check your internet connection and try again."
			);
		}

		// For development mode, we'll simulate a successful API response
		const isLocalhost =
			window.location.hostname === "localhost" ||
			window.location.hostname === "127.0.0.1";

		if (isLocalhost) {
			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Log for debugging
			logger.debug("🔄 Using development mode API simulation");

			// Create a mock successful response
			const mockResponse = {
				success: true,
				message: "Quote submitted successfully (Development Mode)",
				quoteId: Math.floor(10000 + Math.random() * 90000),
				reference: `QT${new Date()
					.toISOString()
					.slice(0, 10)
					.replace(/-/g, "")}${Math.floor(1000 + Math.random() * 9000)}`,
				timestamp: new Date().toISOString(),
			};

			logger.debug("📤 Development mode response:", mockResponse);

			// Handle success
			logger.info("✅ Quote submitted successfully!");
			logger.debug("🆔 Quote ID:", mockResponse.quoteId);
			logger.debug("📝 Reference:", mockResponse.reference);

			// Update UI state
			setSubmitSuccess(true);
			reset(); // Reset form fields

			// Reset success state after delay
			setTimeout(() => {
				setSubmitSuccess(false);
			}, 5000);

			return;
		}

		// For production mode
		const apiUrl = `/submit-quote.php`;

		logger.debug("🔗 Using API endpoint:", apiUrl);

		try {
			// Add timeout handling with a Promise race
			const timeoutPromise = new Promise((_, reject) => {
				setTimeout(
					() => reject(new Error("Request timed out. Please try again later.")),
					30000
				);
			});

			// Make API request with timeout race
			const response = await Promise.race([
				api.post(apiUrl, validatedData),
				timeoutPromise,
			]);

			// Check if we got a valid response or PHP source code
			const responseData = response.data;

			if (typeof responseData === "string" && !isValidResponse(responseData)) {
				throw new Error("Invalid server response. Please contact support.");
			}

			logger.debug("📥 API response:", responseData);

			// Check for success
			if (!responseData.success) {
				throw new Error(responseData.error || "Failed to submit quote");
			}

			// Handle success
			logger.info("✅ Quote submitted successfully!");
			logger.debug("🆔 Quote ID:", responseData.quoteId);
			logger.debug("📝 Reference:", responseData.reference);

			// Update UI state
			setSubmitSuccess(true);
			reset(); // Reset form fields

			// Reset success state after delay
			setTimeout(() => {
				setSubmitSuccess(false);
			}, 5000);
		} catch (axiosError) {
			logger.error("💔 API request failed:", axiosError);

			let errorMessage = "Failed to submit quote";

			// Extract meaningful error messages from axios error
			if (axiosError.response) {
				// If we got PHP source code instead of JSON
				if (
					typeof axiosError.response.data === "string" &&
					axiosError.response.data.includes("<?php")
				) {
					errorMessage = "Server configuration error. Please try again later.";
				} else if (axiosError.response.status === 429) {
					errorMessage =
						"Too many requests. Please try again in a few minutes.";
				} else if (axiosError.response.status >= 500) {
					errorMessage =
						"Server error. Our team has been notified. Please try again later.";
				} else {
					// Server responded with error
					const serverError =
						axiosError.response.data?.error ||
						`Server error: ${axiosError.response.status}`;
					errorMessage = serverError;
				}
			} else if (axiosError.request) {
				// No response received
				if (axiosError.code === "ECONNABORTED") {
					errorMessage = "Request timed out. Please try again later.";
				} else {
					errorMessage =
						"No response received from server. Please check your internet connection.";
				}
			} else {
				// Error setting up request
				errorMessage =
					axiosError.message || "Something went wrong with the request";
			}

			throw new Error(errorMessage);
		}
	} catch (error) {
		logger.error("💔 Quote submission failed:", error);
		setSubmitError(error.message || "An unexpected error occurred");

		// Clear error after delay
		setTimeout(() => {
			setSubmitError(null);
		}, 5000);
	} finally {
		setIsSubmitting(false);
		logger.debug("🏷️ Quote submission process completed");
	}
};

export default api;
