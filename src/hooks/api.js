const API_URL = import.meta.env.VITE_API_URL;

export const submitQuoteForm = async (formData) => {
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
			credentials: "include", // Include credentials
			mode: "cors", // Enable CORS
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({
				error: `HTTP error! status: ${response.status}`,
			}));
			throw new Error(errorData.error || "Failed to submit form");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Form submission error:", error);
		throw new Error(error.message);
	}
};
