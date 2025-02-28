const API_URL = import.meta.env.VITE_API_URL;

export const submitQuoteForm = async (formData) => {
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || "Failed to submit form");
		}

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};
