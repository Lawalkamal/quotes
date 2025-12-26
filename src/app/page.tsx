"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Navigation } from "@/components/aura/Navigation";
import { AnimatedText } from "@/components/aura/AnimatedText";
import { SectionHeader } from "@/components/aura/SectionHeader";
import { QuoteCard } from "@/components/aura/QuoteCard";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { getQuotes, getDailyQuote } from "@/lib/quotes";
import type { Quote } from "@/lib/supabase";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [allQuotes, featured] = await Promise.all([
          getQuotes(),
          getDailyQuote()
        ]);
        setQuotes(allQuotes);
        setDailyQuote(featured);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main ref={containerRef} className="relative bg-background selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-8 pt-20">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="flex max-w-6xl flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 flex items-center gap-4"
          >
            <div className="h-px w-8 bg-border" />
            <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-muted-foreground">
              Est. MMXXIV — Intentionality in Motion
            </span>
            <div className="h-px w-8 bg-border" />
          </motion.div>
          
          <h1 className="mb-12 text-7xl md:text-9xl lg:text-[10rem] font-serif leading-[0.85] tracking-tight text-balance">
            The Art of <br />
            <span className="italic font-light">Intentional</span> <br />
            Living
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-lg text-muted-foreground md:text-xl font-light leading-relaxed"
          >
            A curated sanctuary for the modern mind. We distill centuries of wisdom into singular moments of clarity. Resilience, refined.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border group cursor-pointer hover:border-foreground transition-colors duration-500">
              <ArrowDownRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-all duration-500 transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Background Element */}
        <div className="absolute -bottom-1/4 -right-1/4 h-[800px] w-[800px] rounded-full bg-zinc-100/50 dark:bg-zinc-900/20 blur-[120px] pointer-events-none -z-10" />
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-40 md:py-64 px-8 border-t border-border/40">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-4">
              <SectionHeader
                subtitle="Philosophy"
                title="The Core of Quiet Momentum."
                className="mb-8"
              />
            </div>
            <div className="lg:col-span-8 space-y-16">
              <AnimatedText
                text="In an era of relentless noise, clarity is the ultimate luxury. We believe that true motivation is not a fleeting emotion, but a deliberate architecture of the self. Every word we curate is a foundation stone."
                className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-serif tracking-tight"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                <p className="text-muted-foreground leading-relaxed text-lg font-light">
                  Success is the byproduct of discipline meeting desire. It is the cumulative effect of small, intentional choices made with unwavering consistency. 
                </p>
                <div className="flex flex-col gap-6">
                  <div className="h-px w-full bg-border" />
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">The Methodology</span>
                    <p className="font-serif italic text-2xl">Curate. Contemplate. Commit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Quotes Section */}
      <section id="quotes" className="py-40 md:py-64 bg-zinc-50/50 dark:bg-transparent">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-40 gap-12">
            <div className="max-w-2xl">
              <SectionHeader
                subtitle="The Archive"
                title="Resonance Over Frequency."
              />
            </div>
            <p className="max-w-sm text-muted-foreground text-sm font-light leading-relaxed border-l border-border pl-8">
              Handpicked wisdom from the archives of history. No filler, only the essential truths that have weathered the centuries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-16 lg:gap-y-32">
            {quotes.map((item, index) => {
              // Create asymmetric grid patterns
              const colSpan = index % 5 === 0 ? "lg:col-span-7" : index % 3 === 0 ? "lg:col-span-5" : "lg:col-span-6";
              const marginTop = (index % 2 === 1 && index % 3 !== 0) ? "lg:mt-32" : "";
              
              return (
                <div key={item.id} className={`${colSpan} ${marginTop}`}>
                  <QuoteCard
                    quote={item.text}
                    author={item.author}
                    category={item.category}
                    className="h-full"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Daily Highlight */}
      <section className="relative min-h-screen flex items-center bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.03),transparent)]" />
        </div>
        
        <div className="container mx-auto px-8 py-40 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="mb-16 flex items-center gap-4">
                <Sparkles className="h-4 w-4 text-zinc-500" />
                <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-zinc-500 block">
                  Quote of the Moment
                </span>
              </div>
              
              <AnimatePresence mode="wait">
                {dailyQuote ? (
                  <motion.div
                    key={dailyQuote.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif mb-20 leading-[1] tracking-tighter italic font-light">
                      "{dailyQuote.text}"
                    </h2>
                    <div className="flex items-center gap-8">
                      <div className="h-px w-24 bg-zinc-800" />
                      <span className="text-2xl md:text-3xl font-serif italic text-zinc-400">{dailyQuote.author}</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-96 w-full animate-pulse bg-zinc-900/50" />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Abstract Graphic Element */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />
      </section>

      {/* Manifesto / CTA Section */}
      <section id="manifesto" className="py-40 md:py-64 bg-background">
        <div className="container mx-auto px-8 max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <SectionHeader
              subtitle="The Vision"
              title="A Commitment to the Unseen."
              align="center"
              className="mb-24"
            />
            
            <div className="space-y-16 max-w-3xl">
              <p className="text-2xl md:text-4xl text-foreground font-serif leading-tight italic font-light">
                "We do not rise to the level of our expectations, we fall to the level of our training."
              </p>
              <div className="h-px w-12 bg-border mx-auto" />
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground uppercase tracking-[0.2em] max-w-xl mx-auto">
                Quotes is more than a collection of words. It is a mental training ground for those who refuse to settle for the noise of the average.
              </p>
            </div>

            <div className="mt-24">
          
              <p className="mt-8 text-[10px] text-muted-foreground uppercase tracking-widest opacity-60">
                Curated insights delivered twice monthly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-8 border-t border-border/40">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
            <div className="flex flex-col gap-6">
              <span className="text-3xl font-serif tracking-tighter">QUOTES.</span>
              <p className="max-w-xs text-xs text-muted-foreground leading-relaxed uppercase tracking-widest font-light">
                Distilling the essence of timeless wisdom for the modern observer.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-medium uppercase tracking-widest text-foreground">Explore</span>
                <div className="flex flex-col gap-4">
                  {["Philosophy", "Archive", "Manifesto"].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-medium uppercase tracking-widest text-foreground">Social</span>
                <div className="flex flex-col gap-4">
                  {["Instagram", "Twitter", "Journal"].map((item) => (
                    <a key={item} href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-medium uppercase tracking-widest text-foreground">Legal</span>
                <div className="flex flex-col gap-4">
                  {["Privacy", "Terms"].map((item) => (
                    <a key={item} href="#" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-24 pt-12 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">© 2025 Quotes. Made by Kamal — All Rights Reserved</p>
            <div className="flex gap-4">
               <div className="h-1 w-1 rounded-full bg-border" />
               <div className="h-1 w-1 rounded-full bg-border" />
               <div className="h-1 w-1 rounded-full bg-border" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
