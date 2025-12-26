"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={className}>
      <div className="flex flex-wrap">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
          
          return (
            <motion.span
              key={i}
              style={{ opacity }}
              transition={{ duration: 0.5, delay: delay + i * 0.05 }}
              className="mr-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
