import { aboutValues } from "@constants";
import { motion } from "framer-motion";

const ValuesGrid = () => {
	return (
		<div className="grid grid-cols-1 gap-6 mt-20 sm:mt-24 md:grid-cols-2 sm:gap-8">
			{aboutValues.map((value, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: index * 0.1 }}
					whileHover={{ scale: 1.02 }}
					className="relative group"
				>
					<div className="relative p-6 bg-white shadow-sm sm:p-8 rounded-2xl ring-1 ring-gray-200/50">
						<div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
						<div className="relative flex gap-6">
							<div
								className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-r ${value.color} text-white`}
							>
								{value.icon}
							</div>
							<div>
								<div className="flex items-center gap-3">
									<h3 className="text-lg font-semibold text-gray-900">
										{value.title}
									</h3>
									<span className="px-2 py-1 text-xs font-medium text-blue-600 rounded-full bg-blue-50">
										{value.highlight}
									</span>
								</div>
								<p className="mt-2 text-gray-600">{value.description}</p>
							</div>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	);
};

export default ValuesGrid;
