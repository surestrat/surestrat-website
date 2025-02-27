import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="mt-16 text-center sm:mt-20"
		>
			<motion.a
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				href="#contact"
				className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden text-base font-semibold text-white rounded-full shadow-lg group"
			>
				<span className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:scale-105" />
				<span className="relative flex items-center gap-2">
					Talk to Our Team
					<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
				</span>
			</motion.a>
		</motion.div>
	);
};

export default CTASection;
