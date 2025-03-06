import { z } from "zod";

// Personal Section Schema
const personalSchema = z.object({
	firstName: z.string().min(2, "First name must be at least 2 characters"),
	lastName: z.string().min(1, "Last name is required"),
	idNumber: z.string().regex(/^\d{13}$/, "ID number must be 13 digits"),
	phone: z
		.string()
		.regex(/^(\+27|0)[6-8][0-9]{8}$/, "Invalid phone number format"),
	email: z.string().email("Invalid email address"),
	province: z.string().min(1, "Province is required"),
	maritalStatus: z.string().optional(),
	employmentStatus: z.string().optional(),
	occupation: z.string().optional(),
	monthlyIncome: z
		.union([z.string(), z.number()])
		.optional()
		.transform((val) => {
			if (val === "" || val === null || val === undefined) return null;
			return Number(val);
		}),
});

// Insurance Types Schema
const insuranceTypesSchema = z.object({
	insuranceTypes: z
		.array(z.enum(["vehicle", "home", "life", "business"]))
		.min(1, "Select at least one insurance type"),
});

// Vehicle Section Schema
const vehicleSchema = z.object({
	vehicleCount: z.string().optional(),
	vehicleType: z.string().optional(),
	vehicleYear: z
		.union([z.string(), z.number()])
		.optional()
		.transform((val) => {
			if (val === "" || val === null || val === undefined) return null;
			return Number(val);
		}),
	vehicleMake: z.string().optional(),
	vehicleModel: z.string().optional(),
	vehicleUsage: z.string().optional(),
});

// Property Section Schema
const propertySchema = z.object({
	propertyType: z.string().optional(),
	propertyValue: z
		.union([z.string(), z.number()])
		.optional()
		.transform((val) => {
			if (val === "" || val === null || val === undefined) return null;
			return Number(val);
		}),
	propertyAddress: z.string().optional(),
	securityMeasures: z.string().optional(),
});

// Life Insurance Section Schema
const lifeSchema = z.object({
	age: z
		.union([z.string(), z.number()])
		.optional()
		.transform((val) => {
			if (val === "" || val === null || val === undefined) return null;
			return Number(val);
		}),
	smokingStatus: z.string().optional(),
	coverageAmount: z.string().optional(),
	existingConditions: z.string().optional(),
});

// Business Section Schema
const businessSchema = z.object({
	businessName: z.string().optional(),
	businessType: z.string().optional(),
	coverageTypes: z.string().optional(),
	employeeCount: z
		.union([z.string(), z.number()])
		.optional()
		.transform((val) => {
			if (val === "" || val === null || val === undefined) return null;
			return Number(val);
		}),
});

// Terms Agreement Schema
const termsSchema = z.object({
	termsAccepted: z.literal(true, {
		errorMap: () => ({ message: "You must agree to the terms and conditions" }),
	}),
});

// Complete Quote Form Schema with conditional validation
const quoteFormSchema = z
	.object({})
	.merge(personalSchema)
	.merge(insuranceTypesSchema)
	.merge(
		z.object({
			termsAccepted: termsSchema.shape.termsAccepted,
			// Add all the optional fields from other schemas directly
			vehicleCount: vehicleSchema.shape.vehicleCount,
			vehicleType: vehicleSchema.shape.vehicleType,
			vehicleYear: vehicleSchema.shape.vehicleYear,
			vehicleMake: vehicleSchema.shape.vehicleMake,
			vehicleModel: vehicleSchema.shape.vehicleModel,
			vehicleUsage: vehicleSchema.shape.vehicleUsage,

			propertyType: propertySchema.shape.propertyType,
			propertyValue: propertySchema.shape.propertyValue,
			propertyAddress: propertySchema.shape.propertyAddress,
			securityMeasures: propertySchema.shape.securityMeasures,

			age: lifeSchema.shape.age,
			smokingStatus: lifeSchema.shape.smokingStatus,
			coverageAmount: lifeSchema.shape.coverageAmount,
			existingConditions: lifeSchema.shape.existingConditions,

			businessName: businessSchema.shape.businessName,
			businessType: businessSchema.shape.businessType,
			coverageTypes: businessSchema.shape.coverageTypes,
			employeeCount: businessSchema.shape.employeeCount,
		})
	)
	.refine(
		(data) => {
			// If vehicle insurance is selected, validate vehicle fields
			if (data.insuranceTypes.includes("vehicle")) {
				return data.vehicleType != null;
			}
			return true;
		},
		{
			message: "Vehicle information is required for vehicle insurance",
			path: ["vehicleType"],
		}
	);

// API response schema
const apiResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().optional(),
	quoteId: z.number().optional(),
	reference: z.string().optional(),
	timestamp: z.string().optional(),
	error: z.string().optional(),
	code: z.number().optional(),
});

// Export all schemas
export {
	personalSchema,
	insuranceTypesSchema,
	vehicleSchema,
	propertySchema,
	lifeSchema,
	businessSchema,
	termsSchema,
	apiResponseSchema,
	quoteFormSchema,
};
