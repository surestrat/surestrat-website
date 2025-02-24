import { motion } from "framer-motion";
import { Shield, CheckCircle2, Scale, BookOpen } from "lucide-react";

const complianceItems = [
	{
		icon: <Shield className="w-6 h-6" />,
		title: "FSCA Registered",
		description:
			"Licensed Financial Services Provider (FSP) regulated by the Financial Sector Conduct Authority",
	},
	{
		icon: <Scale className="w-6 h-6" />,
		title: "FAIS Compliant",
		description:
			"Fully compliant with the Financial Advisory and Intermediary Services Act",
	},
	{
		icon: <BookOpen className="w-6 h-6" />,
		title: "Professional Insurance",
		description:
			"Comprehensive professional indemnity and fidelity insurance coverage",
	},
	{
		icon: <CheckCircle2 className="w-6 h-6" />,
		title: "Industry Standards",
		description: "Adherence to industry best practices and ethical standards",
	},
];

const Compliance = () => {
	return (
		<section className="py-20 bg-gradient-to-b from-white to-blue-50">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<span className="bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium">
						Regulatory Compliance
					</span>
					<h2 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
						Licensed & Regulated <br />
						<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
							Insurance Broker
						</span>
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{complianceItems.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all duration-300"
						>
							<div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg text-blue-600 h-fit">
								{item.icon}
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									{item.title}
								</h3>
								<p className="mt-2 text-gray-600 text-sm">{item.description}</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Compliance;
