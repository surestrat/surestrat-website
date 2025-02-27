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
		<div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-blue-50">
			<div className="max-w-4xl p-8 mx-auto bg-white shadow-2xl rounded-xl">
				<div className="flex items-center justify-center gap-2 mb-8">
					<Shield className="w-8 h-8 text-blue-600" />
					<h1 className="text-4xl font-bold text-center text-gray-800">
						Comprehensive Insurance Quote
					</h1>
				</div>

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
							<div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3">
								{[
									{ label: "Vehicle Insurance", icon: Car },
									{ label: "Home Insurance", icon: Home },
									{ label: "Life Insurance", icon: Heart },
									{ label: "Medical Aid", icon: Stethoscope },
									{ label: "Business Insurance", icon: Building2 },
									{ label: "Travel Insurance", icon: Plane },
								].map(({ label, icon: Icon }) => (
									<label
										key={label}
										className="flex items-center p-4 space-x-2 border rounded-lg cursor-pointer hover:bg-blue-50 group"
									>
										<input
											type="checkbox"
											{...register("insuranceTypes")}
											value={label}
											className="w-4 h-4 text-blue-600"
										/>
										<div className="flex items-center gap-2">
											<Icon className="w-4 h-4 text-gray-500 group-hover:text-blue-500" />
											<span>{label}</span>
										</div>
									</label>
								))}
							</div>
						)}
					</div>

					{/* Vehicle Section */}
					<div>
						<SectionHeader
							title="Vehicle Details"
							section="vehicle"
							isOpen={openSections.vehicle}
							icon={Car}
						/>
						{openSections.vehicle && (
							<div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
								<select
									{...register("vehicleType")}
									className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
								>
									<option value="">Vehicle Type</option>
									<option value="sedan">Sedan</option>
									<option value="suv">SUV</option>
									<option value="bakkie">Bakkie</option>
									<option value="hatchback">Hatchback</option>
								</select>
								<input
									{...register("vehicleYear")}
									placeholder="Year Model"
									type="number"
									className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
								<input
									{...register("vehicleMake")}
									placeholder="Make (e.g., Toyota, VW)"
									className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
								<input
									{...register("vehicleModel")}
									placeholder="Model"
									className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
								<select
									{...register("vehicleUsage")}
									className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
								>
									<option value="">Vehicle Usage</option>
									<option value="personal">Personal Use</option>
									<option value="business">Business Use</option>
									<option value="uber">Uber/Taxi</option>
								</select>
								<input
									{...register("trackingDevice")}
									placeholder="Tracking Device (if any)"
									className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						)}
					</div>

					<button
						type="submit"
						className="flex items-center justify-center w-full gap-2 p-4 text-lg font-semibold text-white transition-all bg-green-600 rounded-lg hover:bg-green-700"
					>
						<Shield className="w-5 h-5" />
						Get Your Quote
					</button>
				</form>
			</div>
		</div>
	);
};

export default QuoteForm;
