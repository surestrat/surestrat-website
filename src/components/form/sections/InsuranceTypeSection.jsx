import { Shield, Car, Home, Heart, Building2 } from "lucide-react";
import SectionHeader from "../SectionHeader";
import FormSection from "../FormSection";
import { CheckboxField } from "../FormField";

const InsuranceTypeSection = ({ openSections, toggleSection, register, errors }) => {
  const insuranceTypes = [
    { label: "Vehicle Insurance", icon: Car, value: "vehicle" },
    { label: "Home Insurance", icon: Home, value: "home" },
    { label: "Life Insurance", icon: Heart, value: "life" },
    { label: "Business Insurance", icon: Building2, value: "business" },
  ];

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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insuranceTypes.map((insurance) => (
            <CheckboxField
              key={insurance.value}
              register={register}
              name="insuranceTypes"
              label={insurance.label}
              icon={insurance.icon}
              value={insurance.value}
              errors={errors}
            />
          ))}
        </div>
      </FormSection>
    </div>
  );
};

export default InsuranceTypeSection;
