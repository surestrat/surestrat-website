import {
	Shield,
	Building,
	Car,
	Heart,
	Umbrella,
	CheckCircle2,
	ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
	{
		icon: <Building className="w-6 h-6" />,
		title: "Property Insurance",
		description: "Protect your assets with comprehensive building coverage",
		color: "from-blue-500 to-blue-600",
	},
	{
		icon: <Car className="w-6 h-6" />,
		title: "Auto Insurance",
		description: "Full vehicle protection from trusted SA insurers",
		color: "from-indigo-500 to-indigo-600",
	},
	{
		icon: <Heart className="w-6 h-6" />,
		title: "Life Insurance",
		description: "Secure your family's financial future",
		color: "from-purple-500 to-purple-600",
	},
	{
		icon: <Umbrella className="w-6 h-6" />,
		title: "Liability Cover",
		description: "Professional and personal liability protection",
		color: "from-cyan-500 to-cyan-600",
	},
];

const HeroSection = () => {
	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 -z-10" />
			<div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10" />

			<div className="container mx-auto px-4 sm:px-6 pt-10 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
				<div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
					{/* Content Column */}
					<div className="max-w-2xl lg:max-w-none relative z-10">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="relative"
						>
							<div className="absolute -top-8 left-0 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
								Trusted by 10,000+ South Africans
							</div>

							<h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
        <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent pb-2">
         Protecting What
        </span>
								<br />
								<span className="inline-block relative">
         				Matters Most
					 <svg
						 className="absolute -right-12 top-0 w-10 h-10 text-blue-600"
						 viewBox="0 0 24 24"
						 fill="none"
					 >
					  <path d="M12 22l10-10-10-10v20z" fill="currentColor" />
					 </svg>
					</span>
							</h1>

							<p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl">
								Expert insurance solutions tailored for South Africans. Get
								comprehensive coverage from trusted local providers.
							</p>
						</motion.div>

						{/* CTA Section */}
						<motion.div
							className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							<motion.a
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								href="#quote"
								className="group relative w-full sm:w-auto inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
							>
								<span className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500" />
								Get Free Quote
								<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</motion.a>

							<motion.a
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								href="#contact"
								className="group w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-gray-900 ring-1 ring-gray-300 hover:ring-gray-400 transition-all duration-300 hover:shadow-lg"
							>
								Contact Us
								<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</motion.a>
						</motion.div>

						{/* Trust Indicators */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
							className="mt-12 sm:mt-16"
						>
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
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
										className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200/50 shadow-sm"
									>
										<div className="p-2 rounded-lg bg-blue-100 text-blue-600">
											{item.icon}
										</div>
										<span className="text-sm font-medium text-gray-900">
           {item.text}
          </span>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>

					{/* Image Column */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3 }}
						className="relative mt-12 lg:mt-0"
					>
						<div className="relative">
							<div className="absolute -inset-4">
								<div
									className="w-full h-full mx-auto opacity-30 blur-lg filter"
									style={{
										background:
											"linear-gradient(90deg, #60A5FA -0.55%, #A78BFA 22.86%, #6366F1 48.36%, #60A5FA 73.33%, #A78BFA 99.34%)",
									}}
								/>
							</div>

							<img
								src="/hero3.png"
								alt="Insurance Advisor"
								width={600}
								height={600}
								className="relative rounded-2xl shadow-2xl object-cover"
							/>

							{/* Floating Elements */}
							<div className="absolute -right-8 top-1/4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
										<CheckCircle2 className="w-6 h-6" />
									</div>
									<div>
										<div className="text-sm font-semibold text-gray-900">
											Instant Coverage
										</div>
										<div className="text-xs text-gray-500">
											Protected in minutes
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Features Grid */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="mt-16 sm:mt-24 relative"
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
						{features.map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}
								className="group relative bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all duration-300"
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
										<p className="mt-2 text-gray-600 text-sm">
											{feature.description}
										</p>
									</div>
								</div>
								<div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default HeroSection;