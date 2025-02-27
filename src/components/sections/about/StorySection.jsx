import { motion } from "framer-motion";

const StorySection = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay: 0.3 }}
			className="relative max-w-4xl mx-auto mt-16 sm:mt-24"
		>
			<svg
				className="absolute w-16 h-16 text-blue-100 transform -top-8 -left-8 -rotate-12"
				fill="currentColor"
				viewBox="0 0 32 32"
				aria-hidden="true"
			>
				<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
			</svg>

			<div className="relative z-10 grid gap-8">
				<div className="space-y-6">
					<p className="text-lg leading-relaxed text-gray-600 sm:text-xl">
						Founded in 2016, SureStrat has grown from a small local brokerage to
						one of South Africa's most trusted insurance partners. Our journey
						began with a simple mission: making quality insurance accessible to
						every South African.
					</p>
					<p className="text-lg leading-relaxed text-gray-600 sm:text-xl">
						Today, we serve clients across all nine provinces, offering tailored
						insurance solutions that reflect the unique needs of our diverse
						nation. From protecting family homes in Cape Town to securing
						businesses in Johannesburg, we're proud to be part of South Africa's
						growth story.
					</p>
				</div>

				<div className="relative pl-4 border-l-4 border-blue-500 sm:pl-6">
					<p className="text-xl font-medium text-gray-900 sm:text-2xl">
						"Our success isn't measured in policies sold, but in the peace of
						mind we provide to every client. We're not just an insurance broker;
						we're a partner in our clients' journey towards a secure future."
					</p>
					<div className="flex items-center gap-4 mt-4">
						<div className="flex items-center justify-center w-12 h-12 text-xl font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-800">
							N
						</div>
						<div>
							<p className="text-base font-semibold text-gray-900">
								Nur Mohammed Sadar
							</p>
							<p className="text-sm text-gray-600">Founder & CEO, SureStrat</p>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default StorySection;
