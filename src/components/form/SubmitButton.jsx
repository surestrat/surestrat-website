import { motion } from "framer-motion";
import { CheckCircle2, Shield } from "lucide-react";

const SubmitButton = ({ isSubmitting, submitSuccess, text = "Get Your Free Quote" }) => {
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full p-4 text-lg font-semibold text-white transition-all duration-300 rounded-full group disabled:opacity-50"
    >
      <span className="absolute inset-0 transition-all duration-300 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 group-hover:scale-105" />
      <span className="relative flex items-center justify-center gap-2">
        {isSubmitting ? "Submitting..." : text}
        {submitSuccess ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <Shield className="w-5 h-5" />
        )}
      </span>
    </motion.button>
  );
};

export default SubmitButton;
