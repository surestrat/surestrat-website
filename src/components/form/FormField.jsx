import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const InputField = ({
	register,
	name,
	placeholder,
	type = "text",
	required = false,
	validation = {},
	errors = {},
	icon: Icon = null,
	className = "",
}) => {
	const hasError = name in errors;
	const [showPassword, setShowPassword] = useState(false);

	// Determine actual type for password fields
	const actualType =
		type === "password" ? (showPassword ? "text" : "password") : type;

	// Add default validation for different input types
	const getDefaultValidation = () => {
		const defaultValidation = {};

		if (type === "email") {
			defaultValidation.pattern = {
				value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
				message: "Please enter a valid email address",
			};
		}

		if (type === "tel") {
			defaultValidation.pattern = {
				value: /^(\+27|0)[6-8][0-9]{8}$/,
				message: "Please enter a valid South African phone number",
			};
		}

		return defaultValidation;
	};

	const registerOptions = {
		required: required && `${placeholder} is required`,
		...getDefaultValidation(),
		...validation,
	};

	// Sanitize numeric inputs
	if (type === "number") {
		registerOptions.valueAsNumber = true;
		registerOptions.setValueAs = (value) => {
			if (value === "" || value === null || value === undefined) return null;
			const num = Number(value);
			return isNaN(num) ? null : num;
		};
	}

	return (
		<div className={`space-y-1 ${className}`}>
			<div className="relative">
				{Icon && (
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
						<Icon size={18} />
					</div>
				)}

				<input
					{...register(name, registerOptions)}
					placeholder={`${placeholder}${required ? " *" : ""}`}
					type={actualType}
					className={`w-full p-3 border rounded-lg transition-all duration-200 ${
						hasError
							? "border-red-500 focus:ring-red-400 bg-red-50"
							: "border-gray-200 focus:ring-blue-500 hover:border-blue-200 focus:border-blue-500"
					} ${
						Icon ? "pl-10" : ""
					} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
					min={
						type === "number" && validation?.min?.value !== undefined
							? validation.min.value
							: null
					}
					max={
						type === "number" && validation?.max?.value !== undefined
							? validation.max.value
							: null
					}
					step={type === "number" ? "any" : null} // Allow decimal inputs
					aria-invalid={hasError ? "true" : "false"}
				/>

				{type === "password" && (
					<button
						type="button"
						className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				)}
			</div>

			{hasError && (
				<p className="text-sm text-red-600" role="alert">
					{errors[name].message}
				</p>
			)}
		</div>
	);
};

export const SelectField = ({
	register,
	name,
	placeholder,
	options,
	required = false,
	errors = {},
	icon: Icon = null,
	className = "",
}) => {
	const hasError = name in errors;

	return (
		<div className={`space-y-1 ${className}`}>
			<div className="relative">
				{Icon && (
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
						<Icon size={18} />
					</div>
				)}

				<select
					{...register(name, {
						required: required && `${placeholder} is required`,
					})}
					className={`w-full p-3 bg-white border rounded-lg appearance-none transition-all duration-200 pr-10 ${
						hasError
							? "border-red-500 focus:ring-red-400 bg-red-50"
							: "border-gray-200 focus:ring-blue-500 hover:border-blue-200 focus:border-blue-500"
					} ${
						Icon ? "pl-10" : ""
					} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
					aria-invalid={hasError ? "true" : "false"}
				>
					<option value="">
						{placeholder}
						{required ? " *" : ""}
					</option>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>

				{/* Custom dropdown arrow */}
				<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
					<svg
						className="w-5 h-5 text-gray-400"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>

			{hasError && (
				<p className="text-sm text-red-600" role="alert">
					{errors[name].message}
				</p>
			)}
		</div>
	);
};

export const CheckboxField = ({
	register,
	name,
	label,
	icon: Icon,
	value,
	required = false,
	errors = {},
}) => {
	// Get error for the checkbox field group
	const fieldError = name in errors ? errors[name] : null;

	return (
		<label
			className={`relative flex items-center p-4 space-x-2 transition-all duration-300 border rounded-lg cursor-pointer shadow-sm group ${
				fieldError
					? "ring-red-200 border-red-300"
					: "ring-gray-200/50 border-gray-100"
			} hover:shadow-md hover:border-blue-200 hover:bg-blue-50/30`}
		>
			<input
				type="checkbox"
				{...register(name, { required: required && "This field is required" })}
				value={value}
				className={`w-4 h-4 rounded ${
					fieldError ? "text-red-500" : "text-blue-600"
				}`}
			/>
			<div className="flex items-center gap-2">
				{Icon && (
					<div
						className={`p-2 text-white rounded-lg bg-gradient-to-r ${
							fieldError
								? "from-red-500 to-red-600"
								: "from-blue-600 to-blue-500"
						}`}
					>
						<Icon className="w-4 h-4" />
					</div>
				)}
				<span className="font-medium">{label}</span>
			</div>
		</label>
	);
};

export const RadioField = ({
	register,
	name,
	options,
	required = false,
	errors = {},
	inline = false,
}) => {
	const hasError = name in errors;

	return (
		<div className="space-y-1">
			<div className={`space-y-2 ${inline ? "flex space-x-4 space-y-0" : ""}`}>
				{options.map((option) => (
					<label
						key={option.value}
						className={`flex items-center space-x-2 ${
							inline ? "" : "block"
						} cursor-pointer hover:text-blue-600`}
					>
						<input
							type="radio"
							value={option.value}
							{...register(name, {
								required: required && "Please select an option",
							})}
							className={`w-4 h-4 ${
								hasError ? "text-red-500" : "text-blue-600"
							}`}
						/>
						<span>{option.label}</span>
					</label>
				))}
			</div>

			{hasError && (
				<p className="text-sm text-red-600" role="alert">
					{errors[name].message}
				</p>
			)}
		</div>
	);
};
