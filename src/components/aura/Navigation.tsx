"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Navigation() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 z-50 flex w-full items-center justify-between px-8 py-6 mix-blend-difference"
    >
      <Link href="/" className="text-xl font-serif tracking-tighter text-white">
        QUOTES.
      </Link>
        <div className="hidden items-center gap-8 md:flex">
          {["Philosophy", "Quotes", "Manifesto"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
          >
            {item}
          </Link>
        ))}
      </div>
      <button className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-white">
        Join the Intentional
      </button>
    </motion.nav>
  );
}
