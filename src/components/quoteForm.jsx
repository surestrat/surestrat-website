// QuoteForm.js
import React, { useState } from "react";
import FormField from "./FormField";
import SelectField from "./SelectField";

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    insuranceType: "",
    carModel: "",
    houseValue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <FormField
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your full name"
      />
      <FormField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <FormField
        label="Phone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter your phone number"
      />
      <FormField
        label="Address"
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Enter your address"
      />
      <SelectField
        label="Insurance Type"
        name="insuranceType"
        options={[
          { value: "health", label: "Health Insurance" },
          { value: "car", label: "Car Insurance" },
          { value: "home", label: "Home Insurance" },
        ]}
        value={formData.insuranceType}
        onChange={handleChange}
      />
      {formData.insuranceType === "car" && (
        <FormField
          label="Car Model"
          type="text"
          name="carModel"
          value={formData.carModel}
          onChange={handleChange}
          placeholder="Enter your car model"
        />
      )}
      {formData.insuranceType === "home" && (
        <FormField
          label="House Value"
          type="number"
          name="houseValue"
          value={formData.houseValue}
          onChange={handleChange}
          placeholder="Enter the value of your house"
        />
      )}
      <button
        type="submit"
        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
      >
        Get Quote
      </button>
    </form>
  );
};

export default QuoteForm;
