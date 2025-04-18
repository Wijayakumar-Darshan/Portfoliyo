"use client";

import { motion } from "framer-motion";

const TextShadingView = ({ children, as: Tag = "div" }) => {
  const text = typeof children === "string" ? children.split("") : [];
  
  const charVarient = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };

  // Create the motion component dynamically
  const MotionComponent = motion[Tag];

  return (
    <MotionComponent
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
    </MotionComponent>
  );
};

export default TextShadingView;