import { CheckCircle2 } from "lucide-react";
import { brokerageServices } from "@constants";
import Heading from "@components/ui/Heading";
import Subheading from "@components/ui/Subheading";
import PillHeader from "@components/ui/PillHeader";

const Pricing = () => {
	return (
		<section
			className="py-20 bg-gradient-to-b from-white to-blue-50"
			id="pricing"
		>
			<div className="px-6 mx-auto max-w-7xl lg:px-8">
				<div className="mb-16 text-center">
					<PillHeader name="Our Pricing" />
					<Heading
						whiteText="Expert Insurance Solutions"
						blueText="No Hidden Fees"
					/>
					<Subheading text="We work on a commission basis, meaning our services come at no direct cost to you. Our earnings are included in your premium by the insurance provider." />
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
