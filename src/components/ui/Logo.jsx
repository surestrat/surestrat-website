import { motion } from "framer-motion";

const Logo = ({ src, alt, heading, subheading }) => {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			className="flex items-center gap-2 xs:gap-3"
		>
			<div className="relative w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 group">
				<img
					src={src}
					alt={alt}
					className="relative z-10 object-contain w-full h-full"
				/>
				<div className="absolute inset-0 transition-all duration-300 rounded-full bg-blue-500/10 blur-xl group-hover:blur-2xl" />
			</div>
			<div className="flex flex-col">
				<span className="text-sm font-semibold tracking-tight text-gray-900 xs:text-base sm:text-lg xl:text-xl">
					{heading}
				</span>
				<span className="text-[8px] xs:text-[10px] sm:text-xs text-gray-500">
					{subheading}
				</span>
			</div>
		</motion.div>
	);
};

export default Logo;
