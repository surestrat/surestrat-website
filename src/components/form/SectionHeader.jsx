import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const SectionHeader = ({ title, section, isOpen, icon: Icon, toggleSection }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    onClick={() => toggleSection(section)}
    className="flex items-center justify-between p-4 mb-2 text-lg font-semibold text-white transition-all rounded-lg cursor-pointer bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
  >
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5" />
      <span>{title}</span>
    </div>
    {isOpen ? (
      <ChevronUp className="w-5 h-5" />
    ) : (
      <ChevronDown className="w-5 h-5" />
    )}
  </motion.div>
);

export default SectionHeader;
