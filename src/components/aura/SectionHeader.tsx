"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ title, subtitle, className, align = "left" }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : "items-start text-left"} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-2"
      >
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {subtitle}
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl">
          {title}
        </h2>
      </motion.div>
    </div>
  );
}
