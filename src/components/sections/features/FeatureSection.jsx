import { motion } from "framer-motion";
import {
	CirclePattern,
	BackgroundPattern,
	WavePattern,
} from "@components/ui/BgPattern";
import { insuranceProducts } from "@constants";
import PillHeader from "@components/ui/PillHeader";
import Heading from "@components/ui/Heading";
import SubHeading from "@components/ui/SubHeading";

const FeatureSection = () => {
	return (
		<section className="relative py-20 overflow-hidden" id="features">
			<BackgroundPattern />
			<CirclePattern />
			<WavePattern />
			<div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white -z-10" />

			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="relative text-center"
				>
					<PillHeader name="FSCA Registered Broker" />
					<Heading
						whiteText="Trusted South African"
						blueText="insurance Solutions"
					/>
					<SubHeading text="As an authorized financial services provider, we offer comprehensive insurance solutions from South Africa's leading insurers, backed by expert local support." />
				</motion.div>

				<div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
					{insuranceProducts.map((product, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							whileHover={{ scale: 1.02 }}
							className="relative overflow-hidden transition-all duration-300 bg-white shadow-sm group rounded-2xl ring-1 ring-gray-200/50 hover:shadow-lg"
						>
							{/* Image Container */}
							<div className="relative h-48 overflow-hidden">
								<div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 to-black/25" />
								<img
									src={product.image}
									alt={product.title}
									className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105"
								/>
								<div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
										<p className="mt-2 text-sm leading-relaxed text-gray-600">
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
						className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden text-base font-semibold text-white rounded-full shadow-lg group"
					>
						<span className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 group-hover:scale-105" />
						<span className="relative flex items-center gap-2">
							Get Your Free Quote Today
							<svg
								className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
