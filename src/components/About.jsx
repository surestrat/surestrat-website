import { motion } from "framer-motion";
import { CirclePattern, BackgroundPattern, WavePattern } from "./ui/BgPattern";
import {
	Shield,
	Users,
	Trophy,
	MapPin,
	ArrowRight,
	CheckCircle2,
	Heart,
	Star,
} from "lucide-react";

const stats = [
	{
		number: "10+",
		label: "Years Experience",
		color: "from-blue-500 to-blue-700",
		bgColor: "bg-blue-50",
		icon: <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
	},
	{
		number: "50K+",
		label: "Satisfied Clients",
		color: "from-indigo-500 to-indigo-700",
		bgColor: "bg-indigo-50",
		icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />,
	},
	{
		number: "R500M+",
		label: "Claims Processed",
		color: "from-purple-500 to-purple-700",
		bgColor: "bg-purple-50",
		icon: <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />,
	},
	{
		number: "9",
		label: "SA Provinces Covered",
		color: "from-cyan-500 to-cyan-700",
		bgColor: "bg-cyan-50",
		icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500" />,
	},
];

const values = [
	{
		icon: <Shield className="w-6 h-6" />,
		title: "Trust & Integrity",
		description:
			"FSCA registered broker committed to ethical insurance practices.",
		color: "from-blue-500 to-blue-600",
		highlight: "FSCA Registered",
	},
	{
		icon: <Heart className="w-6 h-6" />,
		title: "Client-First Approach",
		description:
			"Dedicated to providing personalized insurance solutions for every client.",
		color: "from-indigo-500 to-indigo-600",
		highlight: "Personalized Care",
	},
	{
		icon: <Star className="w-6 h-6" />,
		title: "Excellence",
		description:
			"Committed to delivering the highest quality service and support.",
		color: "from-purple-500 to-purple-600",
		highlight: "Top Rated",
	},
	{
		icon: <CheckCircle2 className="w-6 h-6" />,
		title: "Reliability",
		description: "24/7 support and fast claims processing for peace of mind.",
		color: "from-cyan-500 to-cyan-600",
		highlight: "Always Available",
	},
];

const About = () => {
	return (
		<section className="py-20 lg:py-32 relative overflow-hidden">
			<BackgroundPattern />
			<CirclePattern />
			<WavePattern />

			<div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 -z-10" />

			{/* Rest of your component code remains the same */}
			<div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 -z-10" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center relative"
				>
					<span className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
						</span>
						About Us
					</span>

					<h2 className="mt-8 text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
						Your Trusted Partner in{" "}
						<span className="relative inline-block">
							<span className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
								South African Insurance
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

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
					>
						With over 10 years of experience, we've been helping South Africans
						protect what matters most through comprehensive insurance solutions.
					</motion.p>
				</motion.div>

				{/* Story Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 }}
					className="mt-16 sm:mt-24 relative max-w-4xl mx-auto"
				>
					<svg
						className="absolute -top-8 -left-8 h-16 w-16 text-blue-100 transform -rotate-12"
						fill="currentColor"
						viewBox="0 0 32 32"
						aria-hidden="true"
					>
						<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
					</svg>

					<div className="relative z-10 grid gap-8">
						<div className="space-y-6">
							<p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
								Founded in 2016, SureStrat has grown from a small local
								brokerage to one of South Africa's most trusted insurance
								partners. Our journey began with a simple mission: making
								quality insurance accessible to every South African.
							</p>
							<p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
								Today, we serve clients across all nine provinces, offering
								tailored insurance solutions that reflect the unique needs of
								our diverse nation. From protecting family homes in Cape Town to
								securing businesses in Johannesburg, we're proud to be part of
								South Africa's growth story.
							</p>
						</div>

						<div className="relative pl-4 sm:pl-6 border-l-4 border-blue-500">
							<p className="text-xl sm:text-2xl font-medium text-gray-900">
								"Our success isn't measured in policies sold, but in the peace
								of mind we provide to every client. We're not just an insurance
								broker; we're a partner in our clients' journey towards a secure
								future."
							</p>
							<div className="mt-4 flex items-center gap-4">
								<div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-xl">
									S
								</div>
								<div>
									<p className="text-base font-semibold text-gray-900">
										Nur darbns
									</p>
									<p className="text-sm text-gray-600">
										Founder & CEO, SureStrat
									</p>
								</div>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Stats Grid - Replace the existing stats section */}
				<div className="mt-16 sm:mt-20 flex flex-wrap gap-4 sm:gap-6 lg:gap-8">
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ scale: 1.02 }}
							className="relative group flex-1 min-w-[240px]"
						>
							<div className="relative p-4 sm:p-6 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all duration-300 h-full">
								<div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
								<div className="relative flex flex-col sm:flex-row items-center gap-3 h-full">
									{/* <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>{stat.icon}</div>; */}
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
										<div className="text-sm text-gray-600 text-center sm:text-left">
											{stat.label}
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Values Grid */}
				<div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
					{values.map((value, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ scale: 1.02 }}
							className="group relative"
						>
							<div className="relative p-6 sm:p-8 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50">
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
											<span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
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

				{/* CTA Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mt-16 sm:mt-20 text-center"
				>
					<motion.a
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						href="#contact"
						className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white overflow-hidden rounded-full shadow-lg"
					>
						<span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 group-hover:scale-105" />
						<span className="relative flex items-center gap-2">
							Talk to Our Team
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</span>
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
};

export default About;
