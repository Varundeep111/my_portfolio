import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/styles/Container.module.css";

const words = [
  "Hello", "नमस्ते", "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", 
  "Bonjour", "Ciao", "Guten Tag"
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const hasRunRef = useRef(true);

  // Safely get window dimensions and prevent multiple runs
  useEffect(() => {
    const getDimensions = () => {
      if (typeof window !== 'undefined') {
        return { 
          width: window.innerWidth, 
          height: window.innerHeight 
        };
      }
      return { width: 0, height: 0 };
    };

    // Set dimensions
    const dims = getDimensions();
    setDimension(dims);

    // Prevent resize listener from causing re-render
    return () => {
      hasRunRef.current = false;
    };
  }, []);

  // Word cycling logic
  useEffect(() => {
    if (!hasRunRef.current) return;

    const timer = setTimeout(() => {
      if (index < words.length - 1) {
        setIndex(prev => prev + 1);
      } else {
        // When words complete, start exit animation
        setIsVisible(false);
      }
    }, index === 0 ? 1000 : 150);

    return () => clearTimeout(timer);
  }, [index]);

  // Prevent render if dimensions not set
  if (dimension.width === 0) return null;

  // Path calculations for SVG animation
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  // Animation variants
  const opacity = {
    initial: { opacity: 0 },
    enter: { 
      opacity: 0.75, 
      transition: { duration: 1, delay: 0.2 } 
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const slideUp = {
    initial: { top: 0 },
    exit: { 
      top: "-100vh", 
      transition: { 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1], 
        delay: 0.2 
      } 
    },
  };

  const curve = {
    initial: { 
      d: initialPath, 
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } 
    },
    exit: { 
      d: targetPath, 
      transition: { 
        duration: 0.7, 
        ease: [0.76, 0, 0.24, 1], 
        delay: 0.3 
      } 
    },
  };

  return (
    <AnimatePresence 
      onExitComplete={() => {
        hasRunRef.current = false;
      }}
    >
      {isVisible && (
        <motion.div 
          variants={slideUp} 
          initial="initial" 
          exit="exit" 
          className={styles.introduction}
        >
          <motion.p 
            variants={opacity} 
            initial="initial" 
            animate="enter"
            exit="exit"
          >
            <span></span> 
            {words[index]}
          </motion.p>
          <svg>
            <motion.path 
              variants={curve} 
              initial="initial" 
              exit="exit"
            ></motion.path>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}