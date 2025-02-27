import { aboutStats } from "@constants";
import { motion } from "framer-motion";
const StatsGrid = () => {
	return (
		<div className="flex flex-wrap gap-4 mt-16 sm:mt-20 sm:gap-6 lg:gap-8">
			{aboutStats.map((stat, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: index * 0.1 }}
					whileHover={{ scale: 1.02 }}
					className="relative group flex-1 min-w-[240px]"
				>
					<div className="relative h-full p-4 transition-all duration-300 bg-white shadow-sm sm:p-6 rounded-2xl ring-1 ring-gray-200/50 hover:shadow-lg">
						<div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
						<div className="relative flex flex-col items-center h-full gap-3 sm:flex-row">
							<div
								className={`p-2.5 rounded-xl ${
									stat.bgColor || `bg-${stat.color.split("-")[1]}-50`
								}`}
							>
								{stat.icon}
							</div>
							<div className="flex flex-col items-center sm:items-start">
								<div
									className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
								>
									{stat.number}
								</div>
								<div className="text-sm text-center text-gray-600 sm:text-left">
									{stat.label}
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	);
};

export default StatsGrid;
