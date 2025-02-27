import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
	return (
		<motion.div
			className="flex flex-col items-start gap-4 mt-8 sm:mt-12 sm:flex-row sm:items-center"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<motion.a
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				href="/get-quote"
				className="relative inline-flex items-center justify-center w-full px-8 py-4 overflow-hidden text-base font-semibold text-white transition-all duration-300 rounded-full group sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
			>
				<span className="absolute inset-0 transition-transform duration-500 bg-white/20 group-hover:translate-x-full" />
				Get Free Quote
				<ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
			</motion.a>

			<motion.a
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				href="/contact"
				className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-semibold text-gray-900 transition-all duration-300 rounded-full group sm:w-auto ring-1 ring-gray-300 hover:ring-gray-400 hover:shadow-lg"
			>
				Contact Us
				<ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
			</motion.a>
		</motion.div>
	);
};

export default CTASection;
