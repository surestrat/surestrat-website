import { motion } from "framer-motion";
import CTAButtons from "./NavCTAButtons";

const MobileMenu = ({ isOpen, navItems, onClose }) => {
	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.2 }}
			className="lg:hidden fixed left-0 right-0 top-[56px] xs:top-[64px] sm:top-[80px] bg-white/80 backdrop-blur-lg border-b border-neutral-200 shadow-lg"
		>
			<div className="container mx-auto py-4">
				<ul className="space-y-2">
					{navItems.map((item, index) => (
						<motion.li
							key={index}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<a
								href={item.href}
								className="flex items-center justify-between py-2.5 px-4 text-base text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
								onClick={onClose}
							>
								<span>{item.label}</span>
								{(item.isNew || item.badge) && (
									<span
										className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
											item.isNew
												? "bg-red-500 text-white"
												: "bg-blue-100 text-blue-600"
										}`}
									>
										{item.isNew ? "New" : item.badge}
									</span>
								)}
							</a>
						</motion.li>
					))}
				</ul>
				<div className="mt-4 px-4">
					<CTAButtons isMobile />
				</div>
			</div>
		</motion.div>
	);
};

export default MobileMenu;
