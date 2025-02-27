import { motion } from "framer-motion";
import { CheckCircle2, Heart, Shield } from "lucide-react";

const TrustIndicators = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.4 }}
			className="mt-12 sm:mt-16"
		>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
				{[
					{
						text: "FSCA Registered",
						icon: <Shield className="w-5 h-5" />,
					},
					{
						text: "24/7 Support",
						icon: <CheckCircle2 className="w-5 h-5" />,
					},
					{
						text: "Top Insurers",
						icon: <Heart className="w-5 h-5" />,
					},
				].map((item, index) => (
					<motion.div
						key={index}
						whileHover={{ scale: 1.05 }}
						className="flex items-center gap-3 px-4 py-3 border shadow-sm rounded-xl bg-white/50 backdrop-blur-sm border-gray-200/50"
					>
						<div className="p-2 text-blue-600 bg-blue-100 rounded-lg">
							{item.icon}
						</div>
						<span className="text-sm font-medium text-gray-900">
							{item.text}
						</span>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};

export default TrustIndicators;
