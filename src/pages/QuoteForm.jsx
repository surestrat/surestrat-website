import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quoteFormSchema } from "@schemas/quoteFormSchema";
import { handleQuoteSubmission } from "@utils/api";
import { logger } from "@utils/logger";
import { useFormWithValidation } from "@hooks/useFormWithValidation";

// UI Components
import PillHeader from "@components/ui/PillHeader";
import Heading from "@components/ui/Heading";
import SubHeading from "@components/ui/SubHeading";
import FormBackdrop from "@components/ui/FormBackdrop";

// Import all form components from the index file
import {
	PersonalSection,
	InsuranceTypeSection,
	VehicleSection,
	PropertySection,
	LifeSection,
	BusinessSection,
	TermsSection,
	SubmitButton,
} from "@components/form";

const QuoteForm = () => {
	logger.log("📋 QuoteForm component rendered");

	const [openSections, setOpenSections] = useState({
		personal: true,
		insurance: true,
		vehicle: true,
		property: true,
		lifestyle: true,
		business: true,
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const {
		register,
		watch,
		reset,
		formState: { errors },
		handleSubmitSafe,
	} = useFormWithValidation(quoteFormSchema, {
		insuranceTypes: [],
	});

	// Log form errors whenever they change
	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			logger.warn("🚨 Form validation errors:", errors);
		}
	}, [errors]);

	const toggleSection = (section) => {
		logger.debug(`🔄 Toggling section: ${section}`);
		setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
	};

	const onSubmit = async (data) => {
		logger.info("📝 Form submission started with data:", data);

		try {
			// Let handleQuoteSubmission handle validation and submission
			await handleQuoteSubmission(
				data,
				setIsSubmitting,
				setSubmitError,
				setSubmitSuccess,
				reset
			);
			logger.info("✅ Form submission completed successfully");
		} catch (error) {
			logger.error("❌ Form submission error:", error);
			setSubmitError(error.message || "An unexpected error occurred");
			setIsSubmitting(false);
		}
	};

	// Watch insurance types to log changes
	const insuranceTypes = watch("insuranceTypes") || [];
	useEffect(() => {
		logger.debug("🔍 Selected insurance types changed:", insuranceTypes);
	}, [insuranceTypes]);

	const formVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	return (
		<FormBackdrop>
			<div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={formVariants}
					className="text-center"
				>
					<PillHeader name="Get Started Today" />
					<Heading whiteText="Quick & Easy" blueText="Insurance Quote" />
					<SubHeading text="Get a comprehensive insurance quote tailored to your needs in minutes. Our digital process makes it simple and hassle-free." />
				</motion.div>

				<motion.div
					initial="hidden"
					animate="visible"
					variants={formVariants}
					className="max-w-4xl p-8 mx-auto mt-16 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl ring-1 ring-gray-200/50"
				>
					<form onSubmit={handleSubmitSafe(onSubmit)} className="space-y-6">
						<AnimatePresence mode="sync">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{/* Personal Information Section */}
								<PersonalSection
									openSections={openSections}
									isOpen={openSections.personal}
									toggleSection={() => toggleSection("personal")}
									register={register}
									errors={errors}
								/>

								{/* Insurance Type Selection */}
								<InsuranceTypeSection
									openSections={openSections}
									isOpen={openSections.insurance}
									toggleSection={() => toggleSection("insurance")}
									register={register}
									errors={errors}
									insuranceTypes={insuranceTypes}
								/>

								{/* Conditional Sections */}
								{insuranceTypes?.includes("vehicle") && (
									<VehicleSection
										openSections={openSections}
										isOpen={openSections.vehicle}
										toggleSection={() => toggleSection("vehicle")}
										register={register}
										errors={errors}
										watch={watch}
									/>
								)}

								{insuranceTypes?.includes("home") && (
									<PropertySection
										openSections={openSections}
										isOpen={openSections.property}
										toggleSection={() => toggleSection("property")}
										register={register}
										errors={errors}
									/>
								)}

								{insuranceTypes?.includes("life") && (
									<LifeSection
										openSections={openSections}
										isOpen={openSections.lifestyle}
										toggleSection={() => toggleSection("lifestyle")}
										register={register}
										errors={errors}
									/>
								)}

								{insuranceTypes?.includes("business") && (
									<BusinessSection
										openSections={openSections}
										isOpen={openSections.business}
										toggleSection={() => toggleSection("business")}
										register={register}
										errors={errors}
									/>
								)}

								{/* Terms and Conditions */}
								<TermsSection register={register} errors={errors} />

								{/* Error Message */}
								{submitError && (
									<div className="p-4 mt-4 text-center text-white rounded-lg bg-red-500/90">
										<p>{submitError}</p>
									</div>
								)}

								{/* Success Message */}
								{submitSuccess && (
									<div className="p-4 mt-4 text-center text-white rounded-lg bg-green-500/90">
										<p>
											Your quote request has been submitted successfully! We'll
											be in touch soon.
										</p>
									</div>
								)}

								{/* Submit Button */}
								<SubmitButton
									isSubmitting={isSubmitting}
									submitSuccess={submitSuccess}
									onClick={() => logger.debug("🖱️ Submit button clicked")}
								/>
							</motion.div>
						</AnimatePresence>
					</form>
				</motion.div>
			</div>
		</FormBackdrop>
	);
};

export default QuoteForm;
