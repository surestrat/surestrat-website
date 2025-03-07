import { User } from "lucide-react";
import SectionHeader from "../SectionHeader";
import FormSection from "../FormSection";
import { InputField, SelectField } from "../FormField";

const PersonalSection = ({ openSections, toggleSection, register, errors }) => {
	const provinceOptions = [
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

	const maritalOptions = [
		{ value: "single", label: "Single" },
		{ value: "married", label: "Married" },
		{ value: "divorced", label: "Divorced" },
		{ value: "widowed", label: "Widowed" },
	];

	const employmentOptions = [
		{ value: "employed", label: "Employed" },
		{ value: "self-employed", label: "Self-Employed" },
		{ value: "unemployed", label: "Unemployed" },
		{ value: "retired", label: "Retired" },
	];

	return (
		<div>
			<SectionHeader
				title="Personal Information"
				section="personal"
				isOpen={openSections.personal}
				icon={User}
				toggleSection={toggleSection}
			/>
			<FormSection isOpen={openSections.personal}>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<InputField
						register={register}
						name="firstName"
						placeholder="First Name"
						required={true}
						validation={{
							minLength: {
								value: 2,
								message: "Minimum 2 characters",
							},
						}}
						errors={errors}
					/>
					<InputField
						register={register}
						name="lastName"
						placeholder="Last Name"
						required={true}
						errors={errors}
					/>
					<InputField
						register={register}
						name="idNumber"
						placeholder="SA ID Number"
						required={true}
						validation={{
							pattern: {
								value: /^\d{13}$/,
								message: "ID number must be 13 digits",
							},
						}}
						errors={errors}
					/>
					<InputField
						register={register}
						name="phone"
						placeholder="Phone Number"
						errors={errors}
					/>
					<InputField
						register={register}
						name="email"
						placeholder="Email Address"
						type="email"
						errors={errors}
					/>
					<SelectField
						register={register}
						name="province"
						placeholder="Select Province"
						options={provinceOptions}
						errors={errors}
					/>
					<SelectField
						register={register}
						name="maritalStatus"
						placeholder="Marital Status"
						options={maritalOptions}
						errors={errors}
					/>
					<SelectField
						register={register}
						name="employmentStatus"
						placeholder="Employment Status"
						options={employmentOptions}
						errors={errors}
					/>
					<InputField
						register={register}
						name="occupation"
						placeholder="Occupation"
						errors={errors}
					/>
					<InputField
						register={register}
						name="monthlyIncome"
						placeholder="Monthly Income (Optional)"
						type="number"
						errors={errors}
					/>
				</div>
			</FormSection>
		</div>
	);
};

export default PersonalSection;
