import { motion } from "framer-motion";

const NavItem = ({ label, href, isNew, badge }) => {
	return (
		<motion.li
			whileHover={{ scale: 1.03 }}
			transition={{ type: "spring", stiffness: 400, damping: 10 }}
			className="relative flex items-center"
		>
			<a
				href={href}
				className="text-xs xl:text-sm text-gray-600 hover:text-blue-600 transition-colors relative group py-2"
			>
				<span className="relative inline-flex items-center gap-2">
					{label}
					{isNew && (
						<span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-medium">
							New
						</span>
					)}
					{badge && (
						<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-medium">
							{badge}
						</span>
					)}
				</span>
				<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
			</a>
		</motion.li>
	);
};

export default NavItem;
