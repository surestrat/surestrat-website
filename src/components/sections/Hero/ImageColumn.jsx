import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const ImageColumn = () => {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: 0.3 }}
			className="relative mt-12 lg:mt-0"
		>
			<div className="relative">
				<div className="absolute -inset-4">
					<div
						className="w-full h-full mx-auto opacity-30 blur-lg filter"
						style={{
							background:
								"linear-gradient(90deg, #60A5FA -0.55%, #A78BFA 22.86%, #6366F1 48.36%, #60A5FA 73.33%, #A78BFA 99.34%)",
						}}
					/>
				</div>

				<img
					src="/hero3.png"
					alt="Insurance Advisor"
					width={600}
					height={600}
					className="relative object-cover shadow-2xl rounded-2xl"
				/>

				{/* Floating Elements */}
				<div className="absolute p-4 border shadow-lg -right-8 top-1/4 bg-white/90 backdrop-blur-sm rounded-2xl border-gray-200/50">
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center w-12 h-12 text-green-600 bg-green-100 rounded-full">
							<CheckCircle2 className="w-6 h-6" />
						</div>
						<div>
							<div className="text-sm font-semibold text-gray-900">
								Instant Coverage
							</div>
							<div className="text-xs text-gray-500">Protected in minutes</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ImageColumn;
