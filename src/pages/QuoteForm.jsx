import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quoteFormSchema } from "@schemas/quoteFormSchema";
import { handleQuoteSubmission } from "@utils/api";
import { logger } from "@utils/logger";
import { useFormWithValidation } from "@hooks/useFormWithValidation";
import {
	ArrowRight,
	CheckSquare,
	ArrowLeft,
	Shield,
	Calendar,
	FileText,
	AlertCircle,
	User,
	Phone,
	Mail,
	MapPin,
	RefreshCw,
	Lock,
	Clock,
	Sparkles,
} from "lucide-react";
import { provinceOptions } from "@constants/formOptions";

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
	ProgressIndicator,
	ErrorReporter,
	SuccessAlert,
	SectionDivider,
} from "@components/form";

const QuoteForm = () => {
	logger.log("📋 QuoteForm component rendered");

	// State management
	const [currentStep, setCurrentStep] = useState(0);
	const [openSections, setOpenSections] = useState({
		personal: true,
		insurance: false,
		vehicle: false,
		property: false,
		lifestyle: false,
		business: false,
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const [quoteReference, setQuoteReference] = useState(null);

	// Form handling with our custom hook
	const {
		register,
		watch,
		reset,
		trigger,
		getValues,
		formState: { errors, isValid, dirtyFields },
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

	// Define steps for the form wizard
	const steps = [
		{
			id: "personal",
			title: "Personal Information",
			description: "Tell us about yourself",
			fields: [
				"firstName",
				"lastName",
				"idNumber",
				"phone",
				"email",
				"province",
			],
			icon: User,
		},
		{
			id: "insurance",
			title: "Insurance Types",
			description: "Select what you need",
			fields: ["insuranceTypes"],
			icon: Shield,
		},
		{
			id: "details",
			title: "Insurance Details",
			description: "Specific information",
			// Dynamic fields based on selection
			icon: FileText,
		},
		{
			id: "review",
			title: "Review & Submit",
			description: "Finalize your request",
			fields: ["termsAccepted"],
			icon: CheckSquare,
		},
	];

	const toggleSection = (section) => {
		logger.debug(`🔄 Toggling section: ${section}`);
		setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
	};

	// Watch insurance types to handle conditional sections
	const insuranceTypes = watch("insuranceTypes") || [];

	// Track when insurance types change
	useEffect(() => {
		logger.debug("🔍 Selected insurance types changed:", insuranceTypes);
	}, [insuranceTypes]);

	// Handle next step
	const goToNextStep = async () => {
		// Validate current step fields
		if (currentStep === 0) {
			const isPersonalValid = await trigger([
				"firstName",
				"lastName",
				"idNumber",
				"phone",
				"email",
				"province",
			]);

			if (!isPersonalValid) return;
		}

		if (currentStep === 1) {
			const isInsuranceTypesValid = await trigger("insuranceTypes");
			if (!isInsuranceTypesValid) return;
		}

		// Special case for details step with conditional fields
		if (currentStep === 2) {
			let fieldsToValidate = [];

			if (insuranceTypes.includes("vehicle")) {
				fieldsToValidate.push("vehicleType");
			}

			if (insuranceTypes.includes("home")) {
				fieldsToValidate.push("propertyType");
			}

			if (insuranceTypes.includes("life")) {
				fieldsToValidate.push("age", "smokingStatus", "coverageAmount");
			}

			if (insuranceTypes.includes("business")) {
				fieldsToValidate.push("businessName", "businessType");
			}

			if (fieldsToValidate.length > 0) {
				const isDetailsValid = await trigger(fieldsToValidate);
				if (!isDetailsValid) return;
			}
		}

		// Move to next step and update section visibility
		if (currentStep < steps.length - 1) {
			window.scrollTo({ top: 0, behavior: "smooth" });
			setCurrentStep(currentStep + 1);

			// Update visible sections based on step
			if (currentStep === 0) {
				setOpenSections({
					personal: false,
					insurance: true,
					vehicle: false,
					property: false,
					lifestyle: false,
					business: false,
				});
			} else if (currentStep === 1) {
				setOpenSections({
					personal: false,
					insurance: false,
					vehicle: insuranceTypes.includes("vehicle"),
					property: insuranceTypes.includes("home"),
					lifestyle: insuranceTypes.includes("life"),
					business: insuranceTypes.includes("business"),
				});
			}
		}
	};

	// Handle previous step
	const goToPrevStep = () => {
		if (currentStep > 0) {
			window.scrollTo({ top: 0, behavior: "smooth" });
			setCurrentStep(currentStep - 1);

			// Update visible sections based on step
			if (currentStep === 1) {
				setOpenSections({
					personal: true,
					insurance: false,
					vehicle: false,
					property: false,
					lifestyle: false,
					business: false,
				});
			} else if (currentStep === 2) {
				setOpenSections({
					personal: false,
					insurance: true,
					vehicle: false,
					property: false,
					lifestyle: false,
					business: false,
				});
			} else if (currentStep === 3) {
				setOpenSections({
					personal: false,
					insurance: false,
					vehicle: insuranceTypes.includes("vehicle"),
					property: insuranceTypes.includes("home"),
					lifestyle: insuranceTypes.includes("life"),
					business: insuranceTypes.includes("business"),
				});
			}
		}
	};

	const onSubmit = async (data) => {
		logger.info("📝 Form submission started with data:", data);

		try {
			// Let handleQuoteSubmission handle validation and submission
			const result = await handleQuoteSubmission(
				data,
				setIsSubmitting,
				setSubmitError,
				setSubmitSuccess,
				reset
			);

			// If we're running in development mode, it's simulated with a mock reference
			if (result?.reference) {
				setQuoteReference(result.reference);
			}

			logger.info("✅ Form submission completed successfully");
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch (error) {
			logger.error("❌ Form submission error:", error);
			setSubmitError(error.message || "An unexpected error occurred");
			setIsSubmitting(false);
		}
	};

	const formVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	const stepVariants = {
		hidden: { opacity: 0, x: 20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.4, ease: "easeOut" },
		},
		exit: {
			opacity: 0,
			x: -20,
			transition: { duration: 0.3 },
		},
	};

	// Show a responsive step title
	const getStepTitle = () => {
		const step = steps[currentStep];
		return (
			<div className="flex flex-col items-start">
				<div className="flex items-center text-blue-100 text-sm mb-1">
					<span>
						Step {currentStep + 1} of {steps.length}:{" "}
					</span>
					<span className="ml-1 font-medium">{step.description}</span>
				</div>
				<h2 className="text-xl font-semibold flex items-center">
					{step.icon && <step.icon className="w-5 h-5 mr-2" />}
					{step.title}
				</h2>
			</div>
		);
	};

	// If form is successfully submitted, show success screen
	if (submitSuccess) {
		return (
			<FormBackdrop>
				<div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={formVariants}
						className="text-center max-w-3xl mx-auto"
					>
						<PillHeader name="Get Started Today" />
						<Heading whiteText="Thank You" blueText="For Your Request" />
						<SubHeading text="Your insurance quote request has been submitted successfully. Our team will be in touch with you shortly." />
					</motion.div>

					<motion.div
						initial="hidden"
						animate="visible"
						variants={formVariants}
						className="max-w-xl mx-auto mt-8"
					>
						<SuccessAlert
							message="Your quote has been submitted successfully!"
							reference={quoteReference}
						/>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.6 }}
							className="mt-8 text-center"
						>
							<a
								href="/"
								className="inline-flex items-center px-4 py-2 text-blue-600 border border-blue-200 rounded-lg shadow-sm hover:bg-blue-50"
							>
								Return to Home
							</a>
						</motion.div>
					</motion.div>
				</div>
			</FormBackdrop>
		);
	}

	return (
		<FormBackdrop>
			<div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={formVariants}
					className="text-center max-w-3xl mx-auto"
				>
					<PillHeader name="Get Started Today" />
					<Heading whiteText="Quick & Easy" blueText="Insurance Quote" />
					<SubHeading text="Get a comprehensive insurance quote tailored to your needs in minutes. Our digital process makes it simple and hassle-free." />
				</motion.div>

				{/* Progress Bar */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="max-w-3xl mx-auto mt-8"
				>
					<ProgressIndicator
						steps={steps}
						currentStep={currentStep}
						setCurrentStep={setCurrentStep}
					/>
				</motion.div>

				<motion.div
					initial="hidden"
					animate="visible"
					variants={formVariants}
					className="max-w-3xl mx-auto mt-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-200/60"
				>
					<form onSubmit={handleSubmitSafe(onSubmit)} className="relative">
						{/* Form Header */}
						<div className="bg-gradient-to-r from-blue-600 to-blue-500 py-6 px-8 text-white">
							{getStepTitle()}
						</div>

						{/* Error display at top */}
						{submitError && (
							<div className="px-8 pt-6">
								<ErrorReporter
									error={submitError}
									onDismiss={() => setSubmitError(null)}
								/>
							</div>
						)}

						{/* Form Content */}
						<div className="p-8 pt-4">
							<AnimatePresence mode="wait">
								<motion.div
									key={`step-${currentStep}`}
									initial="hidden"
									animate="visible"
									exit="exit"
									variants={stepVariants}
									className="space-y-6"
								>
									{/* Step 1: Personal Information */}
									{currentStep === 0 && (
										<PersonalSection
											openSections={{ personal: true }}
											toggleSection={() => {}}
											register={register}
											errors={errors}
										/>
									)}

									{/* Step 2: Insurance Types */}
									{currentStep === 1 && (
										<InsuranceTypeSection
											openSections={{ insurance: true }}
											toggleSection={() => {}}
											register={register}
											errors={errors}
										/>
									)}

									{/* Step 3: Insurance Details (Conditional) */}
									{currentStep === 2 && (
										<>
											{insuranceTypes.length === 0 ? (
												<div className="text-center p-8">
													<AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
													<p className="text-lg text-gray-700">
														Please go back and select insurance types
													</p>
												</div>
											) : (
												<div className="space-y-6">
													{insuranceTypes?.includes("vehicle") && (
														<VehicleSection
															openSections={{ vehicle: true }}
															toggleSection={() => {}}
															register={register}
															errors={errors}
															watch={watch}
														/>
													)}

													{insuranceTypes?.includes("home") && (
														<PropertySection
															openSections={{ property: true }}
															toggleSection={() => {}}
															register={register}
															errors={errors}
														/>
													)}

													{insuranceTypes?.includes("life") && (
														<LifeSection
															openSections={{ lifestyle: true }}
															toggleSection={() => {}}
															register={register}
															errors={errors}
														/>
													)}

													{insuranceTypes?.includes("business") && (
														<BusinessSection
															openSections={{ business: true }}
															toggleSection={() => {}}
															register={register}
															errors={errors}
														/>
													)}
												</div>
											)}
										</>
									)}

									{/* Step 4: Terms & Submit */}
									{currentStep === 3 && (
										<>
											<div className="bg-blue-50/50 p-6 rounded-xl mb-6">
												<h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
													<FileText className="w-5 h-5 mr-2 text-blue-600" />
													Quote Summary
												</h3>
												<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
													<div className="bg-white p-3 rounded-md border border-gray-100">
														<p className="text-sm font-medium text-gray-600 mb-1 flex items-center">
															<User className="w-4 h-4 mr-1 text-blue-500" />
															Name
														</p>
														<p className="text-gray-900">
															{getValues("firstName")} {getValues("lastName")}
														</p>
													</div>
													<div className="bg-white p-3 rounded-md border border-gray-100">
														<p className="text-sm font-medium text-gray-600 mb-1 flex items-center">
															<Mail className="w-4 h-4 mr-1 text-blue-500" />
															Email
														</p>
														<p className="text-gray-900">
															{getValues("email")}
														</p>
													</div>
													<div className="bg-white p-3 rounded-md border border-gray-100">
														<p className="text-sm font-medium text-gray-600 mb-1 flex items-center">
															<Phone className="w-4 h-4 mr-1 text-blue-500" />
															Phone
														</p>
														<p className="text-gray-900">
															{getValues("phone")}
														</p>
													</div>
													<div className="bg-white p-3 rounded-md border border-gray-100">
														<p className="text-sm font-medium text-gray-600 mb-1 flex items-center">
															<MapPin className="w-4 h-4 mr-1 text-blue-500" />
															Province
														</p>
														<p className="text-gray-900">
															{
																// Convert province value to label
																provinceOptions.find(
																	(option) =>
																		option.value === getValues("province")
																)?.label || getValues("province")
															}
														</p>
													</div>
													<div className="bg-white p-3 rounded-md border border-gray-100 md:col-span-2">
														<p className="text-sm font-medium text-gray-600 mb-1 flex items-center">
															<Shield className="w-4 h-4 mr-1 text-blue-500" />
															Insurance Types
														</p>
														<div className="flex flex-wrap gap-1">
															{insuranceTypes.map((type) => (
																<span
																	key={type}
																	className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
																>
																	<CheckSquare className="w-3 h-3 mr-1" />
																	{type.charAt(0).toUpperCase() + type.slice(1)}
																</span>
															))}
														</div>
													</div>
												</div>
											</div>

											<TermsSection register={register} errors={errors} />
										</>
									)}
								</motion.div>
							</AnimatePresence>

							{/* Navigation Buttons */}
							<div className="flex justify-between mt-8">
								{currentStep > 0 ? (
									<button
										type="button"
										className="flex items-center px-4 py-2 text-blue-600 border border-blue-200 rounded-lg shadow-sm hover:bg-blue-50"
										onClick={goToPrevStep}
										disabled={isSubmitting}
									>
										<ArrowLeft className="w-4 h-4 mr-2" />
										Back
									</button>
								) : (
									<div></div>
								)}

								{currentStep < steps.length - 1 ? (
									<button
										type="button"
										className="flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
										onClick={goToNextStep}
									>
										Continue
										<ArrowRight className="w-4 h-4 ml-2" />
									</button>
								) : (
									<SubmitButton
										isSubmitting={isSubmitting}
										submitSuccess={submitSuccess}
										onClick={() => logger.debug("🖱️ Submit button clicked")}
									/>
								)}
							</div>
						</div>
					</form>
				</motion.div>

				{/* Trust indicators */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className="max-w-3xl mx-auto mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600"
				>
					<div className="flex items-center">
						<Clock className="w-4 h-4 mr-2 text-blue-600" />
						<span>2 minute process</span>
					</div>
					<div className="flex items-center">
						<RefreshCw className="w-4 h-4 mr-2 text-blue-600" />
						<span>No obligation</span>
					</div>
					<div className="flex items-center">
						<Lock className="w-4 h-4 mr-2 text-blue-600" />
						<span>256-bit encryption</span>
					</div>
					<div className="flex items-center">
						<Shield className="w-4 h-4 mr-2 text-blue-600" />
						<span>POPI Act Compliant</span>
					</div>
					<div className="flex items-center">
						<Sparkles className="w-4 h-4 mr-2 text-blue-600" />
						<span>Free service</span>
					</div>
				</motion.div>
			</div>
		</FormBackdrop>
	);
};

export default QuoteForm;
