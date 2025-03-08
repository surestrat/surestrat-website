import { Heart, Cigarette, Coins, Stethoscope } from "lucide-react";
import SectionHeader from "../SectionHeader";
import FormSection from "../FormSection";
import { InputField, SelectField } from "../FormField";
import {
	smokingOptions,
	coverageOptions,
	healthConditionOptions,
} from "@constants/formOptions";

const LifeSection = ({ openSections, toggleSection, register, errors }) => {
	return (
		<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
			<SectionHeader
				title="Life Insurance Details"
				section="lifestyle"
				isOpen={openSections.lifestyle}
				icon={Heart}
				toggleSection={toggleSection}
			/>
			<FormSection isOpen={openSections.lifestyle}>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<InputField
						register={register}
						name="age"
						placeholder="Age"
						type="number"
						icon={Heart}
						validation={{
							min: {
								value: 18,
								message: "Age must be at least 18 for life insurance",
							},
							max: {
								value: 120,
								message: "Age cannot exceed 120",
							},
							valueAsNumber: true,
							required: "Age is required for life insurance",
						}}
						required={true}
						errors={errors}
					/>
					<SelectField
						register={register}
						name="smokingStatus"
						placeholder="Smoking Status"
						options={smokingOptions}
						icon={Cigarette}
						required={true}
						errors={errors}
					/>
					<SelectField
						register={register}
						name="coverageAmount"
						placeholder="Coverage Amount"
						options={coverageOptions}
						icon={Coins}
						required={true}
						errors={errors}
					/>
					<SelectField
						register={register}
						name="existingConditions"
						placeholder="Existing Health Conditions"
						options={healthConditionOptions}
						icon={Stethoscope}
						required={true}
						errors={errors}
					/>
				</div>
				<div className="mt-4 text-xs text-gray-500">
					<p>
						* Health information is used solely for quote estimation purposes.
						Full underwriting may be required.
					</p>
				</div>
			</FormSection>
		</div>
	);
};

export default LifeSection;
