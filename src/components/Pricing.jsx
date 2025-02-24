import { CheckCircle2, Shield, Clock, Phone } from "lucide-react";

const brokerageServices = [
	{
		title: "Personal Insurance",
		description: "For individuals & families",
		features: [
			"Free consultation & needs analysis",
			"Access to multiple SA insurers",
			"Claims assistance & support",
			"Annual policy review",
			"No direct fees - commission based",
		],
		cta: "Get a Quote",
	},
	{
		title: "Business Insurance",
		description: "For companies & organizations",
		featured: true,
		features: [
			"Comprehensive risk assessment",
			"BEE compliant solutions",
			"Fleet & asset management",
			"24/7 claims support",
			"Dedicated account manager",
		],
		cta: "Book Consultation",
	},
	{
		title: "Specialized Cover",
		description: "For unique requirements",
		features: [
			"Custom insurance solutions",
			"High-value asset protection",
			"Professional liability cover",
			"Industry-specific packages",
			"Direct insurer negotiations",
		],
		cta: "Contact Us",
	},
];

const Pricing = () => {
	return (
		<section className="py-20 bg-gradient-to-b from-white to-blue-50">
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<div className="text-center mb-16">
					<span className="bg-blue-100 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium">
						Our Services
					</span>
					<h2 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
						Expert Insurance Solutions <br />
						<span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
							No Hidden Fees
						</span>
					</h2>
					<p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
						We work on a commission basis, meaning our services come at no
						direct cost to you. Our earnings are included in your premium by the
						insurance provider.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{brokerageServices.map((service, index) => (
						<div
							key={index}
							className={`relative p-8 bg-white rounded-2xl shadow-sm ring-1 
                ${
									service.featured
										? "ring-blue-200 shadow-lg scale-105"
										: "ring-gray-200/50"
								}`}
						>
							<div className="mb-8">
								<h3 className="text-xl font-bold text-gray-900">
									{service.title}
								</h3>
								<p className="mt-2 text-gray-500">{service.description}</p>
							</div>
							<ul className="space-y-4">
								{service.features.map((feature, idx) => (
									<li key={idx} className="flex items-center gap-3">
										<CheckCircle2 className="w-5 h-5 text-blue-600" />
										<span className="text-gray-600">{feature}</span>
									</li>
								))}
							</ul>
							<a
								href="#contact"
								className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300
                  ${
										service.featured
											? "bg-blue-600 text-white hover:bg-blue-700"
											: "text-blue-600 border border-blue-600 hover:bg-blue-50"
									}`}
							>
								{service.cta}
							</a>
						</div>
					))}
				</div>

				<div className="mt-16 text-center">
					<p className="text-sm text-gray-500">
						* Our services are commission-based as regulated by the FSCA. Terms
						and conditions apply.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Pricing;
