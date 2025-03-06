import { CheckIcon } from "lucide-react";

const TermsSection = ({ register, errors }) => {
	return (
		<div className="space-y-2">
			<div className="flex items-start space-x-2">
				<div className="flex items-center h-5">
					<input
						id="termsAccepted"
						type="checkbox"
						className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
						{...register("termsAccepted", {
							required: "You must agree to the terms and conditions",
						})}
					/>
				</div>
				<div className="text-sm">
					<label
						htmlFor="termsAccepted"
						className={`font-medium ${
							errors.termsAccepted ? "text-red-700" : "text-gray-700"
						}`}
					>
						I agree to the terms and conditions
					</label>
					<p className="text-gray-500">
						By submitting this form, you agree to our privacy policy and terms
						of service.
					</p>
					{errors.termsAccepted && (
						<p className="mt-1 text-sm text-red-600">
							{errors.termsAccepted.message}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default TermsSection;
