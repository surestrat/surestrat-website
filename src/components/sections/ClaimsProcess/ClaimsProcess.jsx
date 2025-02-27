import { Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { claimsSteps } from "@constants";
import Heading from "@components/ui/Heading";
import SubHeading from "@components/ui/SubHeading";
import PillHeader from "@components/ui/PillHeader";
import ClaimsSteps from "./ClaimsSteps";

const ClaimsProcess = () => {
	return (
		<section className="relative py-20" id="claims">
			<div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50 -z-10" />

			<div className="px-6 mx-auto max-w-7xl lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 text-center"
				>
					<PillHeader name="Claims Process" />
					<Heading
						whiteText="Expert Claims Assistance"
						blueText="From Leading SA Insurers"
					/>
					<SubHeading text="As your insurance broker, we handle claims with all major South African insurers. Our team provides personal support throughout your claim journey." />
				</motion.div>
				<ClaimsSteps />

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="p-8 mt-16 bg-blue-50/50 rounded-2xl backdrop-blur-sm ring-1 ring-blue-100"
				>
					<div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
						<div className="flex flex-col items-center gap-6 sm:flex-row">
							<div className="flex items-center gap-3">
								<CheckCircle2 className="w-5 h-5 text-blue-600" />
								<span className="text-sm font-medium text-gray-900">
									Authorized Financial Services Provider
								</span>
							</div>
							<div className="flex items-center gap-3">
								<Shield className="w-5 h-5 text-blue-600" />
								<span className="text-sm font-medium text-gray-900">
									FSCA Regulated
								</span>
							</div>
						</div>
						<div className="flex gap-4">
							<motion.a
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								href="https://wa.me/27871640095"
								className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-blue-600 transition-all duration-300 border border-blue-600 rounded-full hover:bg-blue-50"
							>
								WhatsApp Us
							</motion.a>
							<motion.a
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								href="/contact"
								className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-full shadow-md hover:bg-blue-700"
							>
								Report a Claim <ArrowRight className="w-4 h-4 ml-2" />
							</motion.a>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default ClaimsProcess;
