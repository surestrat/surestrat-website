import {
	User,
	Phone,
	Mail,
	MapPin,
	Briefcase,
	Users,
	CreditCard,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import FormSection from "../FormSection";
import { InputField, SelectField } from "../FormField";
import SectionDivider from "../SectionDivider";
import {
	provinceOptions,
	maritalOptions,
	employmentOptions,
} from "@constants/formOptions";

const PersonalSection = ({ openSections, toggleSection, register, errors }) => {
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
				{/* Contact Information */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<InputField
						register={register}
						name="firstName"
						placeholder="First Name"
						icon={User}
						required={true}
						validation={{
							minLength: {
								value: 2,
								message: "First name must be at least 2 characters",
							},
							maxLength: {
								value: 50,
								message: "First name cannot exceed 50 characters",
							},
							pattern: {
								value: /^[A-Za-z\s\-']+$/,
								message:
									"First name can only contain letters, spaces, hyphens and apostrophes",
							},
						}}
						errors={errors}
					/>
					<InputField
						register={register}
						name="lastName"
						placeholder="Last Name"
						icon={User}
						required={true}
						validation={{
							minLength: {
								value: 2,
								message: "Last name must be at least 2 characters",
							},
							maxLength: {
								value: 50,
								message: "Last name cannot exceed 50 characters",
							},
							pattern: {
								value: /^[A-Za-z\s\-']+$/,
								message:
									"Last name can only contain letters, spaces, hyphens and apostrophes",
							},
						}}
						errors={errors}
					/>
					<InputField
						register={register}
						name="idNumber"
						placeholder="SA ID Number"
						icon={CreditCard}
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
						icon={Phone}
						required={true}
						validation={{
							pattern: {
								value: /^(\+27|0)[6-8][0-9]{8}$/,
								message: "Please enter a valid South African phone number",
							},
						}}
						errors={errors}
					/>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<InputField
						register={register}
						name="email"
						placeholder="Email Address"
						type="email"
						icon={Mail}
						required={true}
						validation={{
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: "Please enter a valid email address",
							},
						}}
						errors={errors}
					/>
					<SelectField
						register={register}
						name="province"
						placeholder="Select Province"
						icon={MapPin}
						options={provinceOptions}
						required={true}
						errors={errors}
					/>
				</div>

				<SectionDivider text="Additional Information (Optional)" />

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<SelectField
						register={register}
						name="maritalStatus"
						placeholder="Marital Status"
						icon={Users}
						options={maritalOptions}
						errors={errors}
					/>
					<SelectField
						register={register}
						name="employmentStatus"
						placeholder="Employment Status"
						icon={Briefcase}
						options={employmentOptions}
						errors={errors}
					/>
					<InputField
						register={register}
						name="occupation"
						placeholder="Occupation"
						icon={Briefcase}
						errors={errors}
					/>
					<InputField
						register={register}
						name="monthlyIncome"
						placeholder="Monthly Income (Optional)"
						icon={CreditCard}
						type="number"
						errors={errors}
					/>
				</div>
			</FormSection>
		</div>
	);
};

export default PersonalSection;
