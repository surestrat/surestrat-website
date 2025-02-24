import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
	{
		text: "Their expertise in South African insurance market saved us thousands on our business coverage. Excellent service!",
		user: "David van der Merwe",
		role: "Business Owner",
		company: "Cape Town Logistics",
		rating: 5,
	},
	{
		text: "Quick response on my car insurance claim. They handled everything with the insurers professionally.",
		user: "Sarah Nkosi",
		role: "Client",
		company: "Personal Insurance",
		rating: 5,
	},
	{
		text: "The team helped us find the perfect medical aid for our employees. Their knowledge of SA healthcare is outstanding.",
		user: "Michael Patel",
		role: "HR Director",
		company: "Tech Solutions SA",
		rating: 5,
	},
];

const Testimonials = () => {
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
						Testimonials
					</span>
					<h2 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
						Trusted by South African <br />
						<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
							Businesses & Individuals
						</span>
					</h2>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="flex flex-col p-6 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200/50 hover:shadow-lg transition-all duration-300"
						>
							<div className="flex mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star
										key={i}
										className="w-4 h-4 text-yellow-400 fill-yellow-400"
									/>
								))}
							</div>
							<p className="flex-grow text-gray-600 text-sm leading-relaxed">
								"{testimonial.text}"
							</p>
							<div className="mt-6 pt-6 border-t border-gray-100">
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
