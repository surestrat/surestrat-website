import { Building2, Car, Heart, Shield, Briefcase, Users } from "lucide-react";
import { motion } from "framer-motion";
import { CirclePattern, BackgroundPattern, WavePattern } from "./ui/BgPattern";
import {
	HoverEffect,
	Card,
	CardTitle,
	CardDescription,
} from "./ui/card-hover-effect"; // Adjust path

const insuranceProducts = [
	{
		icon: <Car className="w-6 h-6" />,
		title: "Motor Vehicle Cover",
		description:
			"Comprehensive & third party cover from top SA insurers like Santam, Discovery Insure & OUTsurance.",
		image: "/car-ins.jpg",
		color: "from-blue-500 to-blue-600",
		link: "/car-insurance",
	},
	{
		icon: <Building2 className="w-6 h-6" />,
		title: "Buildings & Contents",
		description:
			"Complete home protection including thatch risk, security & natural disasters for SA homeowners.",
		image: "/home-ins.jpg",
		color: "from-indigo-500 to-indigo-600",
		link: "/home-insurance",
	},
	{
		icon: <Heart className="w-6 h-6" />,
		title: "Life & Funeral Plans",
		description:
			"Affordable funeral plans and life coverage from Old Mutual, Sanlam and other trusted SA providers.",
		image: "/life-ins4.jpg",
		color: "from-purple-500 to-purple-600",
		link: "/life-insurance",
	},
	{
		icon: <Shield className="w-6 h-6" />,
		title: "Medical Aid Schemes",
		description:
			"Leading medical schemes including Discovery Health, Momentum & Bonitas with gap cover options.",
		image: "/medical-aid-ins.jpg",
		color: "from-cyan-500 to-cyan-600",
		link: "/medical-aid",
	},
	{
		icon: <Briefcase className="w-6 h-6" />,
		title: "Business Protection",
		description:
			"BEE-compliant business insurance solutions including asset, fleet & liability coverage.",
		image: "/business-protection-ins.jpg",
		color: "from-teal-500 to-teal-600",
		link: "/business-insurance",
	},
	{
		icon: <Users className="w-6 h-6" />,
		title: "Group Benefits",
		description:
			"Employee benefits, group life & pension schemes for South African businesses.",
		image: "/group-benefits-ins.jpg",
		color: "from-sky-500 to-sky-600",
	},
];

const FeatureSection = () => {
	return (
		<section className="relative py-20 overflow-hidden">
			<BackgroundPattern />
			<CirclePattern />
			<WavePattern />
			<div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white -z-10" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center relative"
				>
					<span className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
						</span>
						FSCA Registered Broker
					</span>

					<h2 className="mt-8 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
						Trusted South African{" "}
						<span className="relative inline-block">
							<span className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
								Insurance Solutions
							</span>
							<svg
								className="absolute -bottom-2 left-0 w-full"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 800 200"
								fill="none"
								preserveAspectRatio="none"
								style={{ height: "12px" }}
							>
								<path
									d="M 0 100 Q 400 150 800 100 L 800 200 L 0 200 Z"
									fill="#dbeafe"
								/>
							</svg>
						</span>
					</h2>

					<p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
						As an authorized financial services provider, we offer comprehensive
						insurance solutions from South Africa's leading insurers, backed by
						expert local support.
					</p>
				</motion.div>

				<div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{insuranceProducts.map((product, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ scale: 1.02 }}
							className="group relative bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
						>
							{/* Image Container */}
							<div className="relative h-48 overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/25 z-10" />
								<img
									src={product.image}
									alt={product.title}
									className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20" />
							</div>

							{/* Content Container */}
							<div className="relative p-6">
								<div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
								<div className="relative flex items-start gap-4">
									<div
										className={`p-3 rounded-xl bg-gradient-to-r ${product.color} text-white shadow-lg`}
									>
										{product.icon}
									</div>
									<div>
										<h3 className="text-lg font-semibold text-gray-900">
											{product.title}
										</h3>
										<p className="mt-2 text-gray-600 text-sm leading-relaxed">
											{product.description}
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mt-16 text-center"
				>
					<motion.a
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						href="#quote"
						className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white overflow-hidden rounded-full shadow-lg"
					>
						<span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 group-hover:scale-105" />
						<span className="relative flex items-center gap-2">
							Get Your Free Quote Today
							<svg
								className="w-5 h-5 group-hover:translate-x-1 transition-transform"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
						</span>
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
};

export default FeatureSection;
