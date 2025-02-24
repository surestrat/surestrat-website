import { motion } from "framer-motion";
import styles from "@/styles/Partners.module.css";
import { cn } from "@/lib/utils";

const partnerLogos = [
	{
		name: "Santam",
		logo: "https://placekitten.com/150/150?image=1",
		color: "bg-red-100/50",
		borderColor: "border-red-200",
	},
	{
		name: "Discovery",
		logo: "https://placekitten.com/150/150?image=2",
		color: "bg-blue-100/50",
		borderColor: "border-blue-200",
	},
	{
		name: "Old Mutual",
		logo: "https://placekitten.com/150/150?image=3",
		color: "bg-green-100/50",
		borderColor: "border-green-200",
	},
	{
		name: "Momentum",
		logo: "https://placekitten.com/150/150?image=4",
		color: "bg-purple-100/50",
		borderColor: "border-purple-200",
	},
	// Add more partners as needed
];

const LogoCard = ({ partner }) => (
	<div
		className={cn(
			"w-40 h-32 rounded-2xl flex items-center justify-center",
			"border-2 shadow-lg transition-all duration-300",
			"backdrop-blur-sm hover:shadow-2xl",
			partner.color,
			partner.borderColor
		)}
	>
		<img
			src={partner.logo}
			alt={partner.name}
			className="w-28 h-28 object-contain rounded-xl"
		/>
	</div>
);

const LogoRow = ({ reverse = false, logos, speed = 30 }) => {
	return (
		<div
			className={cn(styles.slider, reverse && styles.sliderReverse)}
			style={{
				"--width": "176px", // 160px (card) + 16px (gap)
				"--height": "128px",
				"--quantity": logos.length,
				"--duration": `${speed}s`,
			}}
		>
			<div className={styles.list}>
				{[...logos, ...logos].map((logo, index) => (
					<div
						key={`${logo.name}-${index}`}
						className={styles.item}
						style={{ "--position": index + 1 }}
					>
						<LogoCard partner={logo} />
					</div>
				))}
			</div>
		</div>
	);
};

const Partners = () => {
	return (
		<section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<span className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
						Our Partners
					</span>
					<h2 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
						Trusted by Industry Leaders
					</h2>
				</motion.div>

				<div className="relative mt-16">
					<LogoRow logos={partnerLogos} speed={35} />
					<LogoRow reverse logos={[...partnerLogos].reverse()} speed={40} />

					{/* Gradient Masks */}
					<div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white to-transparent dark:from-gray-950 z-10" />
					<div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white to-transparent dark:from-gray-950 z-10" />
				</div>
			</div>
		</section>
	);
};

export default Partners;
