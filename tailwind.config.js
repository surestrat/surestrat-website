/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "375px", // Small phones
				sm: "640px", // Larger phones
				md: "768px", // Tablets
				lg: "1024px", // Laptops/Desktops
				xl: "1280px", // Large screens
				"2xl": "1536px", // Extra large screens
			},
			container: {
				padding: {
					DEFAULT: "1rem",
					xs: "1rem",
					sm: "2rem",
					lg: "4rem",
					xl: "5rem",
					"2xl": "6rem",
				},
				center: true,
			},
		},
	},
	plugins: [],
};
