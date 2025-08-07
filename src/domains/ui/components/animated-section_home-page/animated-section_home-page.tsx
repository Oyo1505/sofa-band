'use client'
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import React from "react";

const AnimatedSectionHomePage = ({ children, delay = 0.1, duration = 0.3, className, amount = 0.5 }: { children: React.ReactNode, delay?: number, duration?: number, className?: string, amount?: number, classNameChildren?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: amount });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      }
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: duration,
        ease: "easeOut" as const,
      }
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={childVariants} className={className}>
          {child}
        </motion.div>
      ))}
    </motion.section>
  )
}

export default AnimatedSectionHomePage