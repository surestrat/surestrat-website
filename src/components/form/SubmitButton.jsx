import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { logger } from "@utils/logger";

const SubmitButton = ({
	isSubmitting,
	submitSuccess,
	text = "Get Your Free Quote",
	onClick,
}) => {
	logger.debug("🔘 Rendering SubmitButton component", {
		isSubmitting,
		submitSuccess,
	});

	const handleClick = (e) => {
		if (!isSubmitting) {
			logger.info("🖱️ Submit button clicked");
			if (onClick) onClick(e);
		} else {
			logger.debug(
				"🔄 Submit button clicked while already submitting - ignoring"
			);
		}
	};

	return (
		<div className="flex justify-center mt-6">
			<motion.button
				whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
				whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
				type="submit"
				disabled={isSubmitting}
				onClick={handleClick}
				className={`w-full md:w-auto px-8 py-4 rounded-xl font-semibold text-white shadow-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${
						submitSuccess
							? "bg-green-600 hover:bg-green-700"
							: "bg-blue-600 hover:bg-blue-700"
					}
          ${isSubmitting ? "opacity-80 cursor-not-allowed" : ""}
        `}
			>
				<span className="flex items-center justify-center gap-2">
					{isSubmitting ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
							<span>Submitting...</span>
						</>
					) : submitSuccess ? (
						<>
							<CheckCircle className="w-5 h-5" />
							<span>Quote Submitted!</span>
						</>
					) : (
						text
					)}
				</span>
			</motion.button>
		</div>
	);
};

export default SubmitButton;
