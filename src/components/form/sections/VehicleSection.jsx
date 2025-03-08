import { Car, Calendar, FileType, Truck, Activity } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import FormSection from "../FormSection";
import { InputField, SelectField } from "../FormField";
import SectionDivider from "../SectionDivider";
import {
	vehicleCountOptions,
	vehicleTypeOptions,
	vehicleUsageOptions,
} from "@constants/formOptions";

const VehicleSection = ({
	openSections,
	toggleSection,
	register,
	errors,
	watch,
}) => {
	// Get the current value for vehicleType
	const vehicleType = watch ? watch("vehicleType") : null;

	return (
		<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
			<SectionHeader
				title="Vehicle Details"
				section="vehicle"
				isOpen={openSections.vehicle}
				icon={Car}
				toggleSection={toggleSection}
			/>
			<FormSection isOpen={openSections.vehicle}>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<SelectField
						register={register}
						name="vehicleCount"
						placeholder="Number of Vehicles"
						options={vehicleCountOptions}
						icon={Car}
						errors={errors}
					/>
					<SelectField
						register={register}
						name="vehicleType"
						placeholder="Vehicle Type"
						options={vehicleTypeOptions}
						icon={Truck}
						required={true}
						errors={errors}
					/>
				</div>

				{vehicleType && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{
							opacity: 1,
							height: "auto",
							transition: { duration: 0.3 },
						}}
						className="overflow-hidden"
					>
						<SectionDivider text="Vehicle Specifications" />
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<InputField
								register={register}
								name="vehicleYear"
								placeholder="Year Model"
								type="number"
								icon={Calendar}
								errors={errors}
								validation={{
									min: {
										value: 1950,
										message: "Year must be after 1950",
									},
									max: {
										value: new Date().getFullYear() + 1,
										message: `Year cannot exceed ${
											new Date().getFullYear() + 1
										}`,
									},
								}}
							/>
							<InputField
								register={register}
								name="vehicleMake"
								placeholder="Make (e.g., Toyota, VW)"
								icon={FileType}
								errors={errors}
							/>
							<InputField
								register={register}
								name="vehicleModel"
								placeholder="Model"
								errors={errors}
							/>
							<SelectField
								register={register}
								name="vehicleUsage"
								placeholder="Vehicle Usage"
								options={vehicleUsageOptions}
								icon={Activity}
								errors={errors}
							/>
						</div>
						<div className="mt-4 text-xs text-gray-500">
							<p>
								* Providing accurate vehicle information helps us determine the
								most suitable coverage options.
							</p>
						</div>
					</motion.div>
				)}
			</FormSection>
		</div>
	);
};

export default VehicleSection;
