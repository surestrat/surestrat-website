import { motion } from "framer-motion";

const ContentColumn = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="relative"
		>
			<div className="absolute -top-8 left-0 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
				Trusted by 10,000+ South Africans
			</div>

			<h1 className="text-4xl font-bold tracking-tight xs:text-5xl sm:text-6xl lg:text-7xl">
				<span className="inline-block pb-2 text-transparent bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text">
					Protecting What
				</span>
				<br />
				<span className="relative inline-block">
					Matters Most
					<svg
						className="absolute top-0 w-10 h-10 text-blue-600 -right-12"
						viewBox="0 0 24 24"
						fill="none"
					>
						<path d="M12 22l10-10-10-10v20z" fill="currentColor" />
					</svg>
				</span>
			</h1>

			<p className="max-w-xl mt-6 text-lg text-gray-600 sm:text-xl">
				Expert insurance solutions tailored for South Africans. Get
				comprehensive coverage from trusted local providers.
			</p>
		</motion.div>
	);
};

export default ContentColumn;
