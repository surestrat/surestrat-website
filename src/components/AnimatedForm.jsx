import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedForm = () => {
	return (
		<AnimatePresence mode="sync">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			>
				<form>
					<input type="text" placeholder="Name" />
					<input type="email" placeholder="Email" />
					<button type="submit">Submit</button>
				</form>
			</motion.div>
		</AnimatePresence>
	);
};

export default AnimatedForm;
