import {
	FileCheck,
	Clock,
	Phone,
	Shield,
	CheckCircle2,
	ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const claimsSteps = [
	{
		icon: <Phone className="w-6 h-6" />,
		title: "Contact Us",
		description:
			"Call our dedicated SA support line or WhatsApp us to report your claim.",
	},
	{
		icon: <FileCheck className="w-6 h-6" />,
		title: "Broker Assistance",
		description:
			"Your personal broker will guide you through the claims process with your insurer.",
	},
	{
		icon: <Clock className="w-6 h-6" />,
		title: "Claims Management",
		description:
			"We liaise with insurers on your behalf to expedite your claim.",
	},
	{
		icon: <Shield className="w-6 h-6" />,
		title: "Resolution",
		description:
			"We ensure fair settlement and keep you updated throughout the process.",
	},
];

const ClaimsProcess = () => {
	return (
		<section className="py-20 relative">
			<div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50 -z-10" />

			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<span className="bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium">
						Claims Support
					</span>
					<h2 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
						Expert Claims Assistance <br />
						<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
							From Leading SA Insurers
						</span>
					</h2>
					<p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
						As your insurance broker, we handle claims with all major South
						African insurers. Our team provides personal support throughout your
						claim journey.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{claimsSteps.map((step, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="relative"
						>
							<div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all duration-300">
								<div className="mb-4 p-3 bg-blue-50 rounded-full text-blue-600">
									{step.icon}
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{step.title}
								</h3>
								<p className="text-center text-gray-600 text-sm">
									{step.description}
								</p>
								{index < claimsSteps.length - 1 && (
									<div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-0.5 bg-gray-200" />
								)}
							</div>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mt-16 p-8 bg-blue-50/50 rounded-2xl backdrop-blur-sm ring-1 ring-blue-100"
				>
					<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
						<div className="flex flex-col sm:flex-row items-center gap-6">
							<div className="flex items-center gap-3">
								<CheckCircle2 className="w-5 h-5 text-blue-600" />
								<span className="text-sm font-medium text-gray-900">
									Authorized Financial Services Provider
								</span>
							</div>
							<div className="flex items-center gap-3">
								<Shield className="w-5 h-5 text-blue-600" />
								<span className="text-sm font-medium text-gray-900">
									FSCA Regulated
								</span>
							</div>
						</div>
						<div className="flex gap-4">
							<motion.a
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								href="https://wa.me/27000000000"
								className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300"
							>
								WhatsApp Us
							</motion.a>
							<motion.a
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								href="#contact"
								className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md"
							>
								Report a Claim <ArrowRight className="ml-2 w-4 h-4" />
							</motion.a>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default ClaimsProcess;
