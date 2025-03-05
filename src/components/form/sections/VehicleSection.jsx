import { Car } from "lucide-react";
import SectionHeader from "../SectionHeader";
import FormSection from "../FormSection";
import { InputField, SelectField } from "../FormField";

const VehicleSection = ({ openSections, toggleSection, register, errors, watch }) => {
  const vehicleCountOptions = [
    { value: "1", label: "1 Vehicle" },
    { value: "2", label: "2 Vehicles" },
    { value: "3", label: "3 Vehicles" },
    { value: "more", label: "More than 3" },
  ];

  const vehicleTypeOptions = [
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "bakkie", label: "Bakkie" },
    { value: "hatchback", label: "Hatchback" },
  ];

  const vehicleUsageOptions = [
    { value: "personal", label: "Personal Use" },
    { value: "business", label: "Business Use" },
    { value: "uber", label: "Uber/Taxi" },
  ];

  return (
    <div>
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
            errors={errors}
          />
          <SelectField
            register={register}
            name="vehicleType"
            placeholder="Vehicle Type"
            options={vehicleTypeOptions}
            errors={errors}
          />
        </div>

        {watch("vehicleType") && (
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
            <InputField
              register={register}
              name="vehicleYear"
              placeholder="Year Model"
              type="number"
              errors={errors}
            />
            <InputField
              register={register}
              name="vehicleMake"
              placeholder="Make (e.g., Toyota, VW)"
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
              errors={errors}
            />
          </div>
        )}
      </FormSection>
    </div>
  );
};

export default VehicleSection;
