import { motion } from "framer-motion";
import { complianceItems } from "@constants";
import Heading from "@components/ui/Heading";
import SubHeading from "@components/ui/SubHeading";
import PillHeader from "@components/ui/PillHeader";

const Compliance = () => {
	return (
		<section
			className="py-20 bg-gradient-to-b from-white to-blue-50"
			id="compliance"
		>
			<div className="px-6 mx-auto max-w-7xl lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 text-center"
				>
					<PillHeader name="Regulatory Compliance" />
					<Heading
						whiteText="Licensed & Regulated"
						blueText="Insurance Broker"
					/>
					<SubHeading text="As an authorized financial services provider, we offer comprehensive insurance solutions from South Africa's leading insurers, backed by expert local support." />
				</motion.div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{complianceItems.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="flex gap-6 p-6 transition-all duration-300 bg-white shadow-sm rounded-2xl ring-1 ring-gray-200/50 hover:shadow-lg"
						>
							<div className="flex-shrink-0 p-3 text-blue-600 rounded-lg bg-blue-50 h-fit">
								{item.icon}
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									{item.title}
								</h3>
								<p className="mt-2 text-sm text-gray-600">{item.description}</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Compliance;
