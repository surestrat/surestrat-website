import { motion } from "framer-motion";
import styles from "@/styles/Partners.module.css";
import { cn } from "@/lib/utils";
import { partnerLogos } from "@constants";
import SubHeading from "../../ui/SubHeading";
import PillHeader from "../../ui/PillHeader";
import Heading from "../../ui/Heading";
// import DemoSlider from "./DemoSlider";

const LogoCard = ({ partner }) => (
	<motion.div
		whileHover={{ scale: 1.05 }}
		transition={{ type: "spring", stiffness: 400, damping: 10 }}
		className={cn(
			"w-44 h-36 rounded-2xl flex items-center justify-center p-4",
			"border border-gray-200 dark:border-gray-800",
			"bg-white/50 dark:bg-gray-900/50",
			"shadow-lg hover:shadow-xl",
			"backdrop-blur-sm",
			"transition-all duration-300 ease-in-out",
			"group"
		)}
	>
		<div className="relative flex items-center justify-center w-full h-full">
			<motion.img
				initial={{ opacity: 0.8 }}
				whileHover={{ opacity: 1 }}
				src={partner.logo}
				alt={partner.name}
				className={cn(
					"object-contain max-w-[85%] max-h-[85%]",
					"transition-all duration-300",
					"group-hover:scale-110",
					"filter dark:brightness-100"
				)}
			/>
			<div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-transparent to-white/10 dark:to-gray-800/10 rounded-xl group-hover:opacity-100" />
		</div>
	</motion.div>
);

const LogoRow = ({ reverse = false, logos, speed = 30 }) => {
	return (
		<div
			className={cn(styles.slider, reverse && styles.sliderReverse)}
			style={{
				"--width": "192px", // 176px (card) + 16px (gap)
				"--height": "144px",
				"--quantity": logos.length,
				"--duration": `${speed}s`,
			}}
		>
			<div
				className={cn(
					styles.list,
					"gap-6 py-4" // Increased gap between logos
				)}
			>
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
		<section
			className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
			id="partners"
		>
			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-20 text-center"
				>
					<PillHeader name="Our Partners" />
					<Heading whiteText="Trusted by" blueText=" Industry Leaders" />
					<SubHeading text="We partner with industry leaders to provide you with the best insurance solutions." />
				</motion.div>

				<div className="relative mt-16">
					<LogoRow logos={partnerLogos} speed={40} />
					<LogoRow reverse logos={[...partnerLogos].reverse()} speed={45} />

					{/* Enhanced Gradient Masks */}
					<div className="absolute inset-y-0 left-0 z-10 w-64 bg-gradient-to-r from-gray-50 via-gray-50/95 to-transparent dark:from-gray-950 dark:via-gray-950/95" />
					<div className="absolute inset-y-0 right-0 z-10 w-64 bg-gradient-to-l from-gray-50 via-gray-50/95 to-transparent dark:from-gray-950 dark:via-gray-950/95" />
				</div>
				{/* jhdsgfgf */}
			</div>
		</section>
	);
};

export default Partners;
