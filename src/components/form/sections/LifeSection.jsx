import { Heart } from "lucide-react";
import SectionHeader from "../SectionHeader";
import FormSection from "../FormSection";
import { InputField, SelectField } from "../FormField";

const LifeSection = ({ openSections, toggleSection, register, errors }) => {
  const smokingOptions = [
    { value: "non-smoker", label: "Non-Smoker" },
    { value: "smoker", label: "Smoker" },
  ];

  const coverageOptions = [
    { value: "100000", label: "R100,000" },
    { value: "250000", label: "R250,000" },
    { value: "500000", label: "R500,000" },
    { value: "1000000", label: "R1,000,000+" },
  ];

  const conditionOptions = [
    { value: "none", label: "None" },
    { value: "diabetes", label: "Diabetes" },
    { value: "hypertension", label: "Hypertension" },
    { value: "other", label: "Other" },
  ];

  return (
    <div>
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
            errors={errors}
          />
          <SelectField
            register={register}
            name="smokingStatus"
            placeholder="Smoking Status"
            options={smokingOptions}
            errors={errors}
          />
          <SelectField
            register={register}
            name="coverageAmount"
            placeholder="Coverage Amount"
            options={coverageOptions}
            errors={errors}
          />
          <SelectField
            register={register}
            name="existingConditions"
            placeholder="Existing Health Conditions"
            options={conditionOptions}
            errors={errors}
          />
        </div>
      </FormSection>
    </div>
  );
};

export default LifeSection;
