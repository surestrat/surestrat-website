import { motion } from "framer-motion";
import { claimsSteps } from "@constants";

const ClaimsSteps = () => {
	return (
		<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{claimsSteps.map((step, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: index * 0.1 }}
					className="relative"
				>
					<div className="flex flex-col items-center p-6 transition-all duration-300 bg-white shadow-sm rounded-2xl ring-1 ring-gray-200/50 hover:shadow-lg">
						<div className="p-3 mb-4 text-blue-600 rounded-full bg-blue-50">
							{step.icon}
						</div>
						<h3 className="mb-2 text-lg font-semibold text-gray-900">
							{step.title}
						</h3>
						<p className="text-sm text-center text-gray-600">
							{step.description}
						</p>
						{index < claimsSteps.length - 1 && (
							<div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-0.5 bg-gray-200" />
						)}
					</div>
				</motion.div>
			))}
		</div>
	);
};

export default ClaimsSteps;
