"use client";

import { motion } from "framer-motion";

interface QuoteCardProps {
  quote: string;
  author: string;
  category: string;
  className?: string;
}

export function QuoteCard({ quote, author, category, className }: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      className={`group relative flex flex-col justify-between border border-border/50 bg-transparent p-10 transition-all hover:border-foreground/20 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 ${className}`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            {category}
          </span>
          <div className="h-1 w-1 rounded-full bg-border group-hover:bg-primary transition-colors" />
        </div>
        <blockquote className="text-2xl leading-snug md:text-3xl font-serif tracking-tight">
          "{quote}"
        </blockquote>
      </div>
      <div className="mt-12 flex items-center gap-4">
        <div className="h-[1px] w-12 bg-border transition-all group-hover:w-16 group-hover:bg-foreground" />
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
          {author}
        </span>
      </div>
    </motion.div>
  );
}
