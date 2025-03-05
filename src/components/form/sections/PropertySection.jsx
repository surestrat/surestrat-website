import { Home } from "lucide-react";
import SectionHeader from "../SectionHeader";
import FormSection from "../FormSection";
import { InputField, SelectField } from "../FormField";

const PropertySection = ({ openSections, toggleSection, register, errors }) => {
  const propertyTypeOptions = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "townhouse", label: "Townhouse" },
    { value: "estate", label: "Estate" },
  ];

  const securityOptions = [
    { value: "alarm", label: "Alarm System" },
    { value: "electric", label: "Electric Fence" },
    { value: "guards", label: "Security Guards" },
    { value: "multiple", label: "Multiple Measures" },
  ];

  return (
    <div>
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
            errors={errors}
          />
          <InputField
            register={register}
            name="propertyValue"
            placeholder="Estimated Property Value"
            type="number"
            errors={errors}
          />
          <InputField
            register={register}
            name="propertyAddress"
            placeholder="Property Address"
            errors={errors}
          />
          <SelectField
            register={register}
            name="securityMeasures"
            placeholder="Security Measures"
            options={securityOptions}
            errors={errors}
          />
        </div>
      </FormSection>
    </div>
  );
};

export default PropertySection;
