export const InputField = ({
	register,
	name,
	placeholder,
	type = "text",
	required = false,
	validation = {},
	errors = {},
}) => {
	const hasError = name in errors;

	const registerOptions = {
		required: required && `${placeholder} is required`,
		...validation,
	};

	// For number fields, ensure proper validation and conversion
	if (type === "number") {
		registerOptions.valueAsNumber = true; // Convert to number automatically
		registerOptions.setValueAs = (value) => {
			if (value === "" || value === null || value === undefined) return null;
			const num = Number(value);
			return isNaN(num) ? null : num;
		};
	}

	return (
		<div className="space-y-1">
			<input
				{...register(name, registerOptions)}
				placeholder={`${placeholder}${required ? " *" : ""}`}
				type={type}
				className={`w-full p-3 border rounded-lg ${
					hasError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
				}`}
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
			/>
			{hasError && (
				<p className="text-sm text-red-500">{errors[name].message}</p>
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
}) => {
	const hasError = name in errors;

	return (
		<div className="space-y-1">
			<select
				{...register(name, {
					required: required && `${placeholder} is required`,
				})}
				className={`w-full p-3 bg-white border rounded-lg ${
					hasError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
				}`}
			>
				<option value="">{placeholder}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{hasError && (
				<p className="text-sm text-red-500">{errors[name].message}</p>
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
			className={`relative flex items-center p-4 space-x-2 transition-all duration-300 border rounded-lg cursor-pointer group ring-1 ${
				fieldError ? "ring-red-200 border-red-300" : "ring-gray-200/50"
			} hover:shadow-lg`}
		>
			<input
				type="checkbox"
				{...register(name, { required: required && "This field is required" })}
				value={value}
				className={`w-4 h-4 ${fieldError ? "text-red-500" : "text-blue-600"}`}
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
