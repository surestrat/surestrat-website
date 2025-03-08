import { Home, MapPin, DollarSign, Shield } from "lucide-react";
import SectionHeader from "../SectionHeader";
import FormSection from "../FormSection";
import { InputField, SelectField } from "../FormField";
import { propertyTypeOptions, securityOptions } from "@constants/formOptions";

const PropertySection = ({ openSections, toggleSection, register, errors }) => {
	return (
		<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
			<SectionHeader
				title="Property Details"
				section="property"
				isOpen={openSections.property}
				icon={Home}
				toggleSection={toggleSection}
			/>
			<FormSection isOpen={openSections.property}>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<SelectField
						register={register}
						name="propertyType"
						placeholder="Property Type"
						options={propertyTypeOptions}
						icon={Home}
						required={true}
						errors={errors}
					/>
					<InputField
						register={register}
						name="propertyValue"
						placeholder="Estimated Property Value"
						type="number"
						icon={DollarSign}
						validation={{
							min: {
								value: 1,
								message: "Value must be greater than 0",
							},
							max: {
								value: 100000000,
								message: "Value is too large",
							},
							valueAsNumber: true,
						}}
						errors={errors}
					/>
					<InputField
						register={register}
						name="propertyAddress"
						placeholder="Property Address"
						icon={MapPin}
						errors={errors}
					/>
					<SelectField
						register={register}
						name="securityMeasures"
						placeholder="Security Measures"
						options={securityOptions}
						icon={Shield}
						errors={errors}
					/>
				</div>
				<div className="mt-4 text-xs text-gray-500">
					<p>
						* Property value is used for estimation purposes only. A formal
						valuation may be required for final insurance coverage.
					</p>
				</div>
			</FormSection>
		</div>
	);
};

export default PropertySection;
