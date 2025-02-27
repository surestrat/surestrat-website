import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@constants";
import Heading from "@components/ui/Heading";
import PillHeader from "@components/ui/PillHeader";
import Subheading from "@components/ui/Subheading";

const Testimonials = () => {
	return (
		<section
			className="py-20 bg-gradient-to-b from-white to-blue-50"
			id="testimonials"
		>
			<div className="px-6 mx-auto max-w-7xl lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 text-center"
				>
					<PillHeader name="Testimonials" />
					<Heading
						whiteText="Trusted by South African"
						blueText="Businesses & Individuals"
					/>
					<Subheading text="Read what our clients have to say about our services." />
				</motion.div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="flex flex-col p-6 transition-all duration-300 bg-white shadow-sm rounded-2xl ring-1 ring-gray-200/50 hover:shadow-lg"
						>
							<div className="flex mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star
										key={i}
										className="w-4 h-4 text-yellow-400 fill-yellow-400"
									/>
								))}
							</div>
							<p className="flex-grow text-sm leading-relaxed text-gray-600">
								"{testimonial.text}"
							</p>
							<div className="pt-6 mt-6 border-t border-gray-100">
								<h4 className="font-semibold text-gray-900">
									{testimonial.user}
								</h4>
								<p className="text-sm text-gray-500">
									{testimonial.role} • {testimonial.company}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
