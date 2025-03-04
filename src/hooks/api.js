import { toast } from "react-hot-toast";

const API_URL = `${import.meta.env.VITE_API_URL}/submit-quote`;

export const submitQuoteForm = async (formData) => {
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
			credentials: "include",
			mode: "cors",
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.error || `HTTP error! status: ${response.status}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error("Form submission error:", error);
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
	try {
		setIsSubmitting(true);
		setSubmitError(null);

		const formattedData = {
			...data,
			insuranceTypes: Array.isArray(data.insuranceTypes)
				? data.insuranceTypes
				: [],
		};

		await submitQuoteForm(formattedData);
		setSubmitSuccess(true);
		reset();
		toast.success("Quote submitted successfully!");
	} catch (error) {
		setSubmitError(error.message);
		toast.error(error.message || "Failed to submit quote");
	} finally {
		setIsSubmitting(false);
	}
};
