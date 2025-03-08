/**
 * Centralized form options for consistent use across components
 */

export const provinceOptions = [
	{ value: "gauteng", label: "Gauteng" },
	{ value: "western-cape", label: "Western Cape" },
	{ value: "kwazulu-natal", label: "KwaZulu-Natal" },
	{ value: "eastern-cape", label: "Eastern Cape" },
	{ value: "free-state", label: "Free State" },
	{ value: "limpopo", label: "Limpopo" },
	{ value: "mpumalanga", label: "Mpumalanga" },
	{ value: "north-west", label: "North West" },
	{ value: "northern-cape", label: "Northern Cape" },
];

export const maritalOptions = [
	{ value: "single", label: "Single" },
	{ value: "married", label: "Married" },
	{ value: "divorced", label: "Divorced" },
	{ value: "widowed", label: "Widowed" },
];

export const employmentOptions = [
	{ value: "employed", label: "Employed" },
	{ value: "self-employed", label: "Self-Employed" },
	{ value: "unemployed", label: "Unemployed" },
	{ value: "retired", label: "Retired" },
];

export const insuranceTypeOptions = [
	{
		value: "vehicle",
		label: "Vehicle Insurance",
		icon: "Car",
		description: "Cover your car, bakkie, SUV or other vehicles",
	},
	{
		value: "home",
		label: "Home Insurance",
		icon: "Home",
		description: "Protect your property and belongings",
	},
	{
		value: "life",
		label: "Life Insurance",
		icon: "Heart",
		description: "Financial security for you and your family",
	},
	{
		value: "business",
		label: "Business Insurance",
		icon: "Building2",
		description: "Coverage for your business operations",
	},
];

export const vehicleCountOptions = [
	{ value: "1", label: "1 Vehicle" },
	{ value: "2", label: "2 Vehicles" },
	{ value: "3", label: "3 Vehicles" },
	{ value: "more", label: "More than 3" },
];

export const vehicleTypeOptions = [
	{ value: "sedan", label: "Sedan" },
	{ value: "suv", label: "SUV" },
	{ value: "bakkie", label: "Bakkie" },
	{ value: "hatchback", label: "Hatchback" },
	{ value: "truck", label: "Truck" },
	{ value: "other", label: "Other" },
];

export const vehicleUsageOptions = [
	{ value: "personal", label: "Personal Use" },
	{ value: "business", label: "Business Use" },
	{ value: "uber", label: "Uber/Taxi" },
];

export const propertyTypeOptions = [
	{ value: "house", label: "House" },
	{ value: "apartment", label: "Apartment" },
	{ value: "townhouse", label: "Townhouse" },
	{ value: "estate", label: "Estate" },
];

export const securityOptions = [
	{ value: "alarm", label: "Alarm System" },
	{ value: "electric", label: "Electric Fence" },
	{ value: "guards", label: "Security Guards" },
	{ value: "multiple", label: "Multiple Measures" },
];

export const smokingOptions = [
	{ value: "non-smoker", label: "Non-Smoker" },
	{ value: "smoker", label: "Smoker" },
];

export const coverageOptions = [
	{ value: "100000", label: "R100,000" },
	{ value: "250000", label: "R250,000" },
	{ value: "500000", label: "R500,000" },
	{ value: "1000000", label: "R1,000,000+" },
];

export const healthConditionOptions = [
	{ value: "none", label: "None" },
	{ value: "diabetes", label: "Diabetes" },
	{ value: "hypertension", label: "Hypertension" },
	{ value: "cardiovascular", label: "Cardiovascular Disease" },
	{ value: "respiratory", label: "Respiratory Condition" },
	{ value: "cancer", label: "Cancer (Previous/Current)" },
	{ value: "other", label: "Other" },
];

export const businessTypeOptions = [
	{ value: "retail", label: "Retail" },
	{ value: "service", label: "Service" },
	{ value: "manufacturing", label: "Manufacturing" },
	{ value: "restaurant", label: "Restaurant/Food Service" },
	{ value: "tech", label: "Technology/IT" },
	{ value: "construction", label: "Construction" },
	{ value: "healthcare", label: "Healthcare" },
	{ value: "other", label: "Other" },
];

export const businessCoverageTypeOptions = [
	{ value: "liability", label: "Liability" },
	{ value: "property", label: "Property" },
	{ value: "workers", label: "Workers Compensation" },
	{ value: "all", label: "All of the above" },
];
