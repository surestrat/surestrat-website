import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	ChevronDown,
	ChevronUp,
	User,
	Car,
	Home,
	Heart,
	Building2,
	Plane,
	Stethoscope,
	Shield,
} from "lucide-react";
import PillHeader from "@components/ui/PillHeader";
import Heading from "@components/ui/Heading";
import SubHeading from "@components/ui/SubHeading";

const QuoteForm = () => {
	const [openSections, setOpenSections] = useState({
		personal: true,
		insurance: false,
		vehicle: false,
		property: false,
		lifestyle: false,
		medical: false,
	});

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const insuranceType = watch("insuranceType");

	const toggleSection = (section) => {
		setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
	};

	const onSubmit = (data) => {
		console.log(data);
	};

	const SectionHeader = ({ title, section, isOpen, icon: Icon }) => (
		<div
			onClick={() => toggleSection(section)}
			className="flex items-center justify-between p-4 mb-2 text-lg font-semibold text-white transition-all rounded-lg cursor-pointer bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
		>
			<div className="flex items-center gap-2">
				<Icon className="w-5 h-5" />
				<span>{title}</span>
			</div>
			{isOpen ? (
				<ChevronUp className="w-5 h-5" />
			) : (
				<ChevronDown className="w-5 h-5" />
			)}
		</div>
	);

	return (
		<div className="min-h-screen py-20 bg-gradient-to-b from-white via-blue-50/30 to-white">
			<div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="text-center">
					<PillHeader name="Get Started Today" />
					<Heading whiteText="Quick & Easy" blueText="Insurance Quote" />
					<SubHeading text="Get a comprehensive insurance quote tailored to your needs in minutes. Our digital process makes it simple and hassle-free." />
				</div>

				<div className="max-w-4xl p-8 mx-auto mt-16 bg-white shadow-lg rounded-2xl ring-1 ring-gray-200/50">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* Personal Information Section */}
						<div>
							<SectionHeader
								title="Personal Information"
								section="personal"
								isOpen={openSections.personal}
								icon={User}
							/>
							{openSections.personal && (
								<div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
									<input
										{...register("firstName", { required: true })}
										placeholder="First Name"
										className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
									/>
									<input
										{...register("lastName", { required: true })}
										placeholder="Last Name"
										className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
									/>
									<input
										{...register("idNumber", {
											required: true,
											pattern: /^\d{13}$/,
										})}
										placeholder="SA ID Number"
										className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
									/>
									<input
										{...register("phone")}
										placeholder="Phone Number"
										className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
									/>
									<input
										{...register("email")}
										type="email"
										placeholder="Email Address"
										className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
									/>
									<select
										{...register("province")}
										className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
									>
										<option value="">Select Province</option>
										<option value="gauteng">Gauteng</option>
										<option value="western-cape">Western Cape</option>
										<option value="kwazulu-natal">KwaZulu-Natal</option>
										<option value="eastern-cape">Eastern Cape</option>
										<option value="free-state">Free State</option>
										<option value="limpopo">Limpopo</option>
										<option value="mpumalanga">Mpumalanga</option>
										<option value="north-west">North West</option>
										<option value="northern-cape">Northern Cape</option>
									</select>
								</div>
							)}
						</div>

						{/* Insurance Type Section */}
						<div>
							<SectionHeader
								title="Insurance Requirements"
								section="insurance"
								isOpen={openSections.insurance}
								icon={Shield}
							/>
							{openSections.insurance && (
								<div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
									{[
										{ label: "Vehicle Insurance", icon: Car, value: "vehicle" },
										{ label: "Home Insurance", icon: Home, value: "home" },
										{ label: "Life Insurance", icon: Heart, value: "life" },
										{
											label: "Medical Aid",
											icon: Stethoscope,
											value: "medical",
										},
										{
											label: "Business Insurance",
											icon: Building2,
											value: "business",
										},
										{ label: "Travel Insurance", icon: Plane, value: "travel" },
									].map(({ label, icon: Icon, value }) => (
										<label
											key={value}
											className="relative flex items-center p-4 space-x-2 transition-all duration-300 border rounded-lg cursor-pointer group ring-1 ring-gray-200/50 hover:shadow-lg"
										>
											<input
												type="checkbox"
												{...register("insuranceTypes")}
												value={value}
												className="w-4 h-4 text-blue-600"
											/>
											<div className="flex items-center gap-2">
												<div className="p-2 text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-500">
													<Icon className="w-4 h-4" />
												</div>
												<span className="font-medium">{label}</span>
											</div>
										</label>
									))}
								</div>
							)}
						</div>

						{/* Conditional Vehicle Section */}
						{watch("insuranceTypes")?.includes("vehicle") && (
							<div>
								<SectionHeader
									title="Vehicle Details"
									section="vehicle"
									isOpen={openSections.vehicle}
									icon={Car}
								/>
								{openSections.vehicle && (
									<div className="p-4 space-y-6">
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<select
												{...register("vehicleCount")}
												className="w-full p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Number of Vehicles</option>
												<option value="1">1 Vehicle</option>
												<option value="2">2 Vehicles</option>
												<option value="3">3 Vehicles</option>
												<option value="more">More than 3</option>
											</select>

											{/* Vehicle Type Selection */}
											<select
												{...register("vehicleType")}
												className="w-full p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Vehicle Type</option>
												<option value="sedan">Sedan</option>
												<option value="suv">SUV</option>
												<option value="bakkie">Bakkie</option>
												<option value="hatchback">Hatchback</option>
											</select>
										</div>

										{/* Show additional fields based on vehicle type */}
										{watch("vehicleType") && (
											<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
												<input
													{...register("vehicleYear")}
													placeholder="Year Model"
													type="number"
													className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
												/>
												<input
													{...register("vehicleMake")}
													placeholder="Make (e.g., Toyota, VW)"
													className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
												/>
												<input
													{...register("vehicleModel")}
													placeholder="Model"
													className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
												/>
												<select
													{...register("vehicleUsage")}
													className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
												>
													<option value="">Vehicle Usage</option>
													<option value="personal">Personal Use</option>
													<option value="business">Business Use</option>
													<option value="uber">Uber/Taxi</option>
												</select>
											</div>
										)}
									</div>
								)}
							</div>
						)}

						{/* Conditional Home Insurance Section */}
						{watch("insuranceTypes")?.includes("home") && (
							<div>
								<SectionHeader
									title="Property Details"
									section="property"
									isOpen={openSections.property}
									icon={Home}
								/>
								{openSections.property && (
									<div className="p-4 space-y-6">
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<select
												{...register("propertyType")}
												className="w-full p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Property Type</option>
												<option value="house">House</option>
												<option value="apartment">Apartment</option>
												<option value="townhouse">Townhouse</option>
												<option value="estate">Estate</option>
											</select>
											<input
												{...register("propertyValue")}
												placeholder="Estimated Property Value"
												type="number"
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
											<input
												{...register("propertyAddress")}
												placeholder="Property Address"
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
											<select
												{...register("securityMeasures")}
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Security Measures</option>
												<option value="alarm">Alarm System</option>
												<option value="electric">Electric Fence</option>
												<option value="guards">Security Guards</option>
												<option value="multiple">Multiple Measures</option>
											</select>
										</div>
									</div>
								)}
							</div>
						)}

						{/* Conditional Life Insurance Section */}
						{watch("insuranceTypes")?.includes("life") && (
							<div>
								<SectionHeader
									title="Life Insurance Details"
									section="lifestyle"
									isOpen={openSections.lifestyle}
									icon={Heart}
								/>
								{openSections.lifestyle && (
									<div className="p-4 space-y-6">
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<input
												{...register("age")}
												placeholder="Age"
												type="number"
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
											<select
												{...register("smokingStatus")}
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Smoking Status</option>
												<option value="non-smoker">Non-Smoker</option>
												<option value="smoker">Smoker</option>
											</select>
											<select
												{...register("coverageAmount")}
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Coverage Amount</option>
												<option value="100000">R100,000</option>
												<option value="250000">R250,000</option>
												<option value="500000">R500,000</option>
												<option value="1000000">R1,000,000+</option>
											</select>
											<select
												{...register("existingConditions")}
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Existing Health Conditions</option>
												<option value="none">None</option>
												<option value="diabetes">Diabetes</option>
												<option value="hypertension">Hypertension</option>
												<option value="other">Other</option>
											</select>
										</div>
									</div>
								)}
							</div>
						)}

						{/* Conditional Medical Aid Section */}
						{watch("insuranceTypes")?.includes("medical") && (
							<div>
								<SectionHeader
									title="Medical Aid Details"
									section="medical"
									isOpen={openSections.medical}
									icon={Stethoscope}
								/>
								{openSections.medical && (
									<div className="p-4 space-y-6">
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<select
												{...register("dependents")}
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Number of Dependents</option>
												<option value="0">No dependents</option>
												<option value="1">1 dependent</option>
												<option value="2">2 dependents</option>
												<option value="3+">3+ dependents</option>
											</select>
											<select
												{...register("medicalPlan")}
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Preferred Plan Type</option>
												<option value="basic">Basic Coverage</option>
												<option value="standard">Standard Coverage</option>
												<option value="comprehensive">Comprehensive</option>
											</select>
											<select
												{...register("chronicConditions")}
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Chronic Conditions</option>
												<option value="none">None</option>
												<option value="diabetes">Diabetes</option>
												<option value="hypertension">Hypertension</option>
												<option value="other">Other</option>
											</select>
											<input
												{...register("currentProvider")}
												placeholder="Current Medical Aid (if any)"
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
										</div>
									</div>
								)}
							</div>
						)}

						{/* Conditional Business Insurance Section */}
						{watch("insuranceTypes")?.includes("business") && (
							<div>
								<SectionHeader
									title="Business Insurance Details"
									section="business"
									isOpen={openSections.business}
									icon={Building2}
								/>
								{openSections.business && (
									<div className="p-4 space-y-6">
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<input
												{...register("businessName")}
												placeholder="Business Name"
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
											<select
												{...register("businessType")}
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Business Type</option>
												<option value="retail">Retail</option>
												<option value="service">Service</option>
												<option value="manufacturing">Manufacturing</option>
												<option value="other">Other</option>
											</select>
											<select
												{...register("coverageTypes")}
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Coverage Types Needed</option>
												<option value="liability">Liability</option>
												<option value="property">Property</option>
												<option value="workers">Workers Compensation</option>
												<option value="all">All of the above</option>
											</select>
											<input
												{...register("employeeCount")}
												placeholder="Number of Employees"
												type="number"
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
										</div>
									</div>
								)}
							</div>
						)}

						{/* Conditional Travel Insurance Section */}
						{watch("insuranceTypes")?.includes("travel") && (
							<div>
								<SectionHeader
									title="Travel Insurance Details"
									section="travel"
									isOpen={openSections.travel}
									icon={Plane}
								/>
								{openSections.travel && (
									<div className="p-4 space-y-6">
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<input
												{...register("travelDates")}
												type="date"
												placeholder="Travel Date"
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											/>
											<select
												{...register("destination")}
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Destination</option>
												<option value="europe">Europe</option>
												<option value="americas">Americas</option>
												<option value="asia">Asia</option>
												<option value="africa">Africa</option>
												<option value="australia">Australia</option>
											</select>
											<select
												{...register("travelPurpose")}
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Purpose of Travel</option>
												<option value="business">Business</option>
												<option value="leisure">Leisure</option>
												<option value="study">Study</option>
											</select>
											<select
												{...register("travelDuration")}
												className="p-3 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Duration of Travel</option>
												<option value="short">1-7 days</option>
												<option value="medium">8-14 days</option>
												<option value="long">15-30 days</option>
												<option value="extended">30+ days</option>
											</select>
										</div>
									</div>
								)}
							</div>
						)}

						<button
							type="submit"
							className="relative w-full p-4 text-lg font-semibold text-white transition-all duration-300 rounded-full group"
						>
							<span className="absolute inset-0 transition-all duration-300 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 group-hover:scale-105" />
							<span className="relative flex items-center justify-center gap-2">
								Get Your Free Quote
								<Shield className="w-5 h-5" />
							</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default QuoteForm;
