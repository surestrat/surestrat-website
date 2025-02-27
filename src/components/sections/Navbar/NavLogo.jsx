import { motion } from "framer-motion";
import Logo from "@/assets/images/surestrat-logo.png";

const NavLogo = () => {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			transition={{ type: "spring", stiffness: 400, damping: 10 }}
			className="flex items-center gap-2 xs:gap-3"
		>
			{/* Logo Icon */}
			<div className="relative group">
				<div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 relative">
					<img
						src={Logo}
						alt="SureStrat Insurance Brokers"
						className="w-full h-full object-contain relative z-10"
						onError={(e) => {
							console.error("Image failed to load:", e);
							e.target.style.display = "none";
						}}
					/>
					{/* Glow effect matching other hover states */}
					<div
						className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl 
            group-hover:blur-2xl transition-all duration-300"
					/>
				</div>
			</div>

			{/* Text Content */}
			<div className="flex flex-col">
				<span
					className="text-sm xs:text-base sm:text-lg xl:text-xl 
          font-semibold tracking-tight text-gray-900 transition-colors
          group-hover:text-blue-600"
				>
					SureStrat
				</span>
				<span
					className="text-[8px] xs:text-[10px] sm:text-xs 
          text-gray-500 transition-colors group-hover:text-blue-500/80"
				>
					Insurance Brokers
				</span>
			</div>
		</motion.div>
	);
};

export default NavLogo;
