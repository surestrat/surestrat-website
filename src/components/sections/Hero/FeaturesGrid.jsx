import { motion } from "framer-motion";
import { heroFeatures } from "@constants";

const FeaturesGrid = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
			className="relative mt-16 sm:mt-24"
		>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
				{heroFeatures.map((feature, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.1 }}
						className="relative p-6 transition-all duration-300 shadow-sm group bg-white/50 backdrop-blur-sm rounded-2xl ring-1 ring-gray-200/50 hover:shadow-lg"
					>
						<div className="flex items-start gap-4">
							<div
								className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white`}
							>
								{feature.icon}
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									{feature.title}
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									{feature.description}
								</p>
							</div>
						</div>
						<div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};

export default FeaturesGrid;
