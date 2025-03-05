import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { handleQuoteSubmission } from "@hooks/api";

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
	console && console.log("📋 QuoteForm component rendered");

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
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			insuranceTypes: [],
		},
		mode: "onBlur",
	});

	// Log form errors whenever they change
	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			console && console.log("🚨 Form validation errors:", errors);
		}
	}, [errors]);

	const toggleSection = (section) => {
		console && console.log(`🔄 Toggling section: ${section}`);
		setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
	};

	const onSubmit = async (data) => {
		console && console.log("📝 Form submitted with data:", data);
		await handleQuoteSubmission(
			data,
			setIsSubmitting,
			setSubmitError,
			setSubmitSuccess,
			reset
		);
	};

	// Watch insurance types to log changes
	const insuranceTypes = watch("insuranceTypes");
	useEffect(() => {
		console &&
			console.log("🔍 Selected insurance types changed:", insuranceTypes);
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
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<AnimatePresence mode="sync">
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{/* Personal Information Section */}
								<PersonalSection
									openSections={openSections}
									toggleSection={toggleSection}
									register={register}
									errors={errors}
								/>

								{/* Insurance Type Selection */}
								<InsuranceTypeSection
									openSections={openSections}
									toggleSection={toggleSection}
									register={register}
									errors={errors}
								/>

								{/* Conditional Sections */}
								{watch("insuranceTypes")?.includes("vehicle") && (
									<VehicleSection
										openSections={openSections}
										toggleSection={toggleSection}
										register={register}
										errors={errors}
										watch={watch}
									/>
								)}

								{watch("insuranceTypes")?.includes("home") && (
									<PropertySection
										openSections={openSections}
										toggleSection={toggleSection}
										register={register}
										errors={errors}
									/>
								)}

								{watch("insuranceTypes")?.includes("life") && (
									<LifeSection
										openSections={openSections}
										toggleSection={toggleSection}
										register={register}
										errors={errors}
									/>
								)}

								{watch("insuranceTypes")?.includes("business") && (
									<BusinessSection
										openSections={openSections}
										toggleSection={toggleSection}
										register={register}
										errors={errors}
									/>
								)}

								{/* Terms and Conditions using the TermsSection component */}
								<TermsSection register={register} errors={errors} />

								{/* Submit Button */}
								<SubmitButton
									isSubmitting={isSubmitting}
									submitSuccess={submitSuccess}
								/>

								{/* Error Message */}
								{submitError && (
									<div className="p-4 mt-4 text-center text-white rounded-lg bg-red-500/90">
										<p>{submitError}</p>
									</div>
								)}
							</motion.div>
						</AnimatePresence>
					</form>
				</motion.div>
			</div>
		</FormBackdrop>
	);
};

export default QuoteForm;
