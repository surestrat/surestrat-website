import { Building2, Briefcase, Shield, Users } from "lucide-react";
import SectionHeader from "../SectionHeader";
import FormSection from "../FormSection";
import { InputField, SelectField } from "../FormField";
import {
	businessTypeOptions,
	businessCoverageTypeOptions,
} from "@constants/formOptions";

const BusinessSection = ({ openSections, toggleSection, register, errors }) => {
	return (
		<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
			<SectionHeader
				title="Business Insurance Details"
				section="business"
				isOpen={openSections.business}
				icon={Building2}
				toggleSection={toggleSection}
			/>
			<FormSection isOpen={openSections.business}>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<InputField
						register={register}
						name="businessName"
						placeholder="Business Name"
						icon={Building2}
						required={true}
						errors={errors}
					/>
					<SelectField
						register={register}
						name="businessType"
						placeholder="Business Type"
						options={businessTypeOptions}
						icon={Briefcase}
						required={true}
						errors={errors}
					/>
					<SelectField
						register={register}
						name="coverageTypes"
						placeholder="Coverage Types Needed"
						options={businessCoverageTypeOptions}
						icon={Shield}
						errors={errors}
					/>
					<InputField
						register={register}
						name="employeeCount"
						placeholder="Number of Employees"
						type="number"
						icon={Users}
						validation={{
							min: {
								value: 0,
								message: "Cannot be negative",
							},
							max: {
								value: 100000,
								message: "Value is too large",
							},
							valueAsNumber: true,
						}}
						errors={errors}
					/>
				</div>
				<div className="mt-4 text-xs text-gray-500">
					<p>
						* Business insurance quotes are preliminary. A detailed risk
						assessment may be required for final coverage.
					</p>
				</div>
			</FormSection>
		</div>
	);
};

export default BusinessSection;
