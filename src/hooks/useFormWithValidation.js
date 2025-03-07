import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logger } from "@utils/logger";

export const useFormWithValidation = (
	schema,
	defaultValues = {},
	mode = "onBlur"
) => {
	const formMethods = useForm({
		defaultValues,
		resolver: zodResolver(schema),
		mode,
	});

	const { handleSubmit, formState } = formMethods;

	// Enhanced submit handler with safety checks for numeric fields
	const handleSubmitSafe = (onValid, onInvalid) => {
		return handleSubmit((data) => {
			// Sanitize common numeric fields that may cause issues
			const numericFields = [
				"propertyValue",
				"age",
				"employeeCount",
				"vehicleYear",
				"monthlyIncome",
			];

			// Create a sanitized copy
			const sanitizedData = { ...data };

			// Process each field
			numericFields.forEach((field) => {
				if (field in data) {
					const value = data[field];
					if (value === "" || value === undefined || value === null) {
						sanitizedData[field] = null;
					} else if (typeof value === "string") {
						const parsed = Number(value);
						sanitizedData[field] = isNaN(parsed) ? null : parsed;
					}
				}
			});

			logger.debug("🧹 Sanitized form data:", sanitizedData);

			// Call the original handler with sanitized data
			return onValid(sanitizedData);
		}, onInvalid);
	};

	return {
		...formMethods,
		handleSubmitSafe,
		errors: formState.errors,
	};
};
