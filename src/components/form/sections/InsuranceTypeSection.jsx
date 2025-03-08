import { Shield, CheckSquare, Car, Home, Heart, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import FormSection from "../FormSection";
import { insuranceTypeOptions } from "@constants/formOptions";

const InsuranceTypeSection = ({
	openSections,
	toggleSection,
	register,
	errors,
}) => {
	// Check if there's an error with the insuranceTypes field
	const hasError = errors.insuranceTypes !== undefined;

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		show: { opacity: 1, y: 0 },
	};

	// Map icon name to component
	const getIcon = (iconName) => {
		// Return the correct icon component based on name
		switch (iconName) {
			case "Car":
				return Car;
			case "Home":
				return Home;
			case "Heart":
				return Heart;
			case "Building2":
				return Building2;
			default:
				return Shield;
		}
	};

	return (
		<div>
			<SectionHeader
				title="Insurance Requirements"
				section="insurance"
				isOpen={openSections.insurance}
				icon={Shield}
				toggleSection={toggleSection}
			/>
			<FormSection isOpen={openSections.insurance}>
				<div className="mb-4">
					<p className="text-sm font-medium text-gray-700 mb-1">
						* Please select at least one insurance type
					</p>
					<p className="text-sm text-gray-500">
						Choose the insurance products you'd like to get quotes for.
					</p>
				</div>

				<motion.div
					className="grid grid-cols-1 gap-4 md:grid-cols-2"
					variants={containerVariants}
					initial="hidden"
					animate="show"
				>
					{insuranceTypeOptions.map((insurance) => {
						const IconComponent = getIcon(insurance.icon);

						return (
							<motion.div key={insurance.value} variants={itemVariants}>
								<label
									className={`relative flex flex-col h-full p-4 space-y-3 transition-all duration-300 border rounded-lg cursor-pointer shadow-sm ${
										hasError
											? "border-red-300 bg-red-50/30"
											: "border-gray-200 hover:border-blue-200 hover:bg-blue-50/30"
									}`}
								>
									<div className="flex items-start gap-3">
										<div
											className={`p-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white`}
										>
											<IconComponent className="w-5 h-5" />
										</div>
										<div className="flex-grow">
											<div className="flex items-center justify-between">
												<p className="font-medium text-gray-800">
													{insurance.label}
												</p>
												<input
													type="checkbox"
													{...register("insuranceTypes", {
														required:
															"Please select at least one insurance type",
													})}
													value={insurance.value}
													className="w-4 h-4 text-blue-600 rounded"
												/>
											</div>
											<p className="text-sm text-gray-600 mt-1">
												{insurance.description}
											</p>
										</div>
									</div>
								</label>
							</motion.div>
						);
					})}
				</motion.div>

				{/* Error message if no type selected */}
				{hasError && (
					<div className="mt-3 flex items-center text-sm text-red-600">
						<CheckSquare className="w-4 h-4 mr-1.5" />
						{errors.insuranceTypes.message ||
							"Please select at least one insurance type"}
					</div>
				)}
			</FormSection>
		</div>
	);
};

export default InsuranceTypeSection;
