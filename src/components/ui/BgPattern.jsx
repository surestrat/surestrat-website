export const BackgroundPattern = () => {
	return (
		<svg className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
			<defs>
				<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
					<path d="M0 .5H40M.5 0V40" fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth="0" fill="url(#grid)" />
		</svg>
	);
};

export const CirclePattern = () => {
	return (
		<svg
			className="absolute right-0 top-0 -z-10 h-72 w-72 opacity-20 stroke-blue-600"
			aria-hidden="true"
		>
			<defs>
				<pattern
					id="circles"
					width="50"
					height="50"
					patternUnits="userSpaceOnUse"
				>
					<circle cx="25" cy="25" r="12" fill="none" strokeWidth="2" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth="0" fill="url(#circles)" />
		</svg>
	);
};

export const WavePattern = () => {
	return (
		<svg
			className="absolute left-0 bottom-0 -z-10 h-72 w-full opacity-20"
			aria-hidden="true"
		>
			<defs>
				<pattern
					id="waves"
					width="100"
					height="20"
					patternUnits="userSpaceOnUse"
				>
					<path
						d="M0 10C25 0, 75 0, 100 10C125 20, 175 20, 200 10"
						fill="none"
						stroke="rgba(59, 130, 246, 0.2)"
						strokeWidth="2"
					/>
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#waves)" />
		</svg>
	);
};
