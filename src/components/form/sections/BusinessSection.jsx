import { Building2 } from "lucide-react";
import SectionHeader from "../SectionHeader";
import FormSection from "../FormSection";
import { InputField, SelectField } from "../FormField";

const BusinessSection = ({ openSections, toggleSection, register, errors }) => {
  const businessTypeOptions = [
    { value: "retail", label: "Retail" },
    { value: "service", label: "Service" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "other", label: "Other" },
  ];

  const coverageTypeOptions = [
    { value: "liability", label: "Liability" },
    { value: "property", label: "Property" },
    { value: "workers", label: "Workers Compensation" },
    { value: "all", label: "All of the above" },
  ];

  return (
    <div>
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
            errors={errors}
          />
          <SelectField
            register={register}
            name="businessType"
            placeholder="Business Type"
            options={businessTypeOptions}
            errors={errors}
          />
          <SelectField
            register={register}
            name="coverageTypes"
            placeholder="Coverage Types Needed"
            options={coverageTypeOptions}
            errors={errors}
          />
          <InputField
            register={register}
            name="employeeCount"
            placeholder="Number of Employees"
            type="number"
            errors={errors}
          />
        </div>
      </FormSection>
    </div>
  );
};

export default BusinessSection;
