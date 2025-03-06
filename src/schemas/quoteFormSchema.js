import { z } from "zod";

// Personal Section Schema
export const personalSchema = z.object({
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
		.number()
		.optional()
		.nullable()
		.transform((val) => (val === "" ? null : Number(val))),
});

// Insurance Types Schema
export const insuranceTypesSchema = z.object({
	insuranceTypes: z
		.array(z.enum(["vehicle", "home", "life", "business"]))
		.min(1, "Select at least one insurance type"),
});

// Vehicle Section Schema
export const vehicleSchema = z
	.object({
		vehicleCount: z.string().optional(),
		vehicleType: z.string().optional(),
		vehicleYear: z
			.number()
			.optional()
			.nullable()
			.transform((val) => (val === "" ? null : Number(val))),
		vehicleMake: z.string().optional(),
		vehicleModel: z.string().optional(),
		vehicleUsage: z.string().optional(),
	})
	.optional();

// Property Section Schema
export const propertySchema = z
	.object({
		propertyType: z.string().optional(),
		propertyValue: z
			.number()
			.optional()
			.nullable()
			.transform((val) => (val === "" ? null : Number(val))),
		propertyAddress: z.string().optional(),
		securityMeasures: z.string().optional(),
	})
	.optional();

// Life Insurance Section Schema
export const lifeSchema = z
	.object({
		age: z
			.number()
			.optional()
			.nullable()
			.transform((val) => (val === "" ? null : Number(val))),
		smokingStatus: z.string().optional(),
		coverageAmount: z.string().optional(),
		existingConditions: z.string().optional(),
	})
	.optional();

// Business Section Schema
export const businessSchema = z
	.object({
		businessName: z.string().optional(),
		businessType: z.string().optional(),
		coverageTypes: z.string().optional(),
		employeeCount: z
			.number()
			.optional()
			.nullable()
			.transform((val) => (val === "" ? null : Number(val))),
	})
	.optional();

// Terms Agreement Schema
export const termsSchema = z.object({
	termsAgreed: z.literal(true, {
		errorMap: () => ({ message: "You must agree to the terms and conditions" }),
	}),
});

// Complete Quote Form Schema with conditional validation
export const quoteFormSchema = z
	.object({})
	.merge(personalSchema)
	.merge(insuranceTypesSchema)
	.merge(
		z.object({
			// Conditionally required sections based on insurance types
		})
	)
	.merge(termsSchema)
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
export const apiResponseSchema = z.object({
	success: z.boolean(),
	message: z.string().optional(),
	quoteId: z.number().optional(),
	timestamp: z.string().optional(),
	error: z.string().optional(),
});

export default quoteFormSchema;
