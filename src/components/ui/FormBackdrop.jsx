import { motion } from "framer-motion";

const FormBackdrop = ({ children }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="relative min-h-screen py-20"
		>
			{/* Animated gradient background */}
			<motion.div
				className="absolute inset-0 overflow-hidden -z-10"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1 }}
			>
				<div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-blue-50" />
				<motion.div
					className="absolute inset-0 opacity-30"
					animate={{
						backgroundPosition: ["0% 0%", "100% 100%"],
						scale: [1, 1.1, 1],
					}}
					transition={{
						duration: 20,
						repeat: Infinity,
						repeatType: "reverse",
					}}
					style={{
						backgroundImage: "url('/noise.png')",
						backgroundSize: "400px 400px",
					}}
				/>
			</motion.div>
			{children}
		</motion.div>
	);
};

export default FormBackdrop;
