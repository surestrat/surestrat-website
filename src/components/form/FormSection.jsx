import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const FormSection = ({ isOpen, children, className = "" }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={sectionVariants}
      className={`p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default FormSection;
