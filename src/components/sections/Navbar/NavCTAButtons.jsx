import { motion } from "framer-motion";
import { PhoneCall, Shield, ExternalLink } from "lucide-react";

const CTAButtons = ({ isMobile = false }) => {
	const baseClasses = isMobile ? "text-base" : "text-sm xl:text-base";

	return (
		<div
			className={`flex ${
				isMobile ? "flex-col gap-2" : "items-center gap-3 xl:gap-4"
			}`}
		>
			<motion.a
				whileHover={{ scale: 1.05 }}
				href="tel:0871640095"
				className={`flex items-center ${baseClasses} text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap ${
					isMobile ? "justify-center py-2 group" : ""
				}`}
			>
				<PhoneCall
					className={`${
						isMobile ? "w-5 h-5" : "w-4 h-4"
					} mr-2 text-blue-600 flex-shrink-0 ${
						isMobile ? "group-hover:rotate-12 transition-transform" : ""
					}`}
				/>
				<span className={isMobile ? "" : "hidden xl:inline"}>0871640095</span>
				{!isMobile && <span className="xl:hidden">Call</span>}
			</motion.a>

			<motion.a
				whileHover={{ scale: 1.05 }}
				href="#portal"
				className={`flex items-center gap-2 ${
					isMobile ? "justify-center py-2.5" : "py-2"
				} px-3 xl:px-4 ${baseClasses} text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap group`}
			>
				<span>Claims Portal</span>
				<ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
			</motion.a>

			<motion.a
				whileHover={{ scale: 1.05 }}
				href="#quote"
				className={`relative ${
					isMobile ? "py-2.5" : "py-2"
				} px-3 xl:px-4 ${baseClasses} text-white rounded-full transition-all duration-300 whitespace-nowrap overflow-hidden shadow-lg group ${
					isMobile ? "text-center" : ""
				}`}
			>
				<span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 group-hover:scale-105" />
				<span className="relative flex items-center gap-2 justify-center">
					<span>{isMobile ? "Get Insurance Quote" : "Get Quote"}</span>
					<Shield className="w-4 h-4 flex-shrink-0" />
				</span>
			</motion.a>
		</div>
	);
};

export default CTAButtons;
