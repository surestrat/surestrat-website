import { toast } from "react-hot-toast";

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
	console && console.log("🏁 Quote submission started with data:", data);
	try {
		setIsSubmitting(true);
		setSubmitError(null);

		const formattedData = {
			...data,
			insuranceTypes: Array.isArray(data.insuranceTypes)
				? data.insuranceTypes
				: [],
		};

		console && console.log("🔄 Formatted submission data:", formattedData);

		const result = await submitQuoteForm(formattedData);
		console && console.log("🎉 Quote submission successful:", result);
		setSubmitSuccess(true);
		reset();
		toast.success("Quote submitted successfully!");
	} catch (error) {
		console && console.error("💔 Quote submission failed:", error);
		setSubmitError(error.message);
		toast.error(error.message || "Failed to submit quote");
	} finally {
		console && console.log("🏷️ Quote submission process completed");
		setIsSubmitting(false);
	}
};
