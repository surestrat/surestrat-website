import { Info } from "lucide-react";

const TermsSection = ({ register, errors }) => {
	return (
		<div className="p-4 space-y-4 border rounded-lg bg-gray-50">
			<div className="flex items-center gap-2 mb-2 text-gray-700">
				<Info className="w-5 h-5 text-blue-500" />
				<h3 className="text-sm font-medium">Consent and Privacy</h3>
			</div>

			<label className="flex items-start gap-2 cursor-pointer">
				<input
					type="checkbox"
					{...register("termsAccepted", {
						required: "You must accept the terms and conditions",
					})}
					className="mt-1 w-4 h-4 text-blue-600"
				/>
				<span className="text-sm text-gray-600">
					I agree to the{" "}
					<a href="/terms" className="text-blue-600 hover:underline">
						Terms and Conditions
					</a>{" "}
					and{" "}
					<a href="/privacy" className="text-blue-600 hover:underline">
						Privacy Policy
					</a>
				</span>
			</label>

			{errors.termsAccepted && (
				<p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
			)}
		</div>
	);
};

export default TermsSection;
