"use client";

import { motion } from "framer-motion";

const TextShadingView = ({ children }) => {
  const text = children.split("");

  const charVarient = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="reveal"
      transition={{ staggerChildren: 0.02, delay: 1 }}
    >
      {text.map((char, index) => (
        <motion.span
          key={index}
          transition={{ duration: 0.5 }}
          variants={charVarient}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TextShadingView;
