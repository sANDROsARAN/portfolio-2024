"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] selection:bg-green-500 selection:text-black">
      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <nav className="p-8 flex justify-between items-center uppercase tracking-widest text-xs border-b border-white/10">
        <span className="font-bold">Sandro Saran / 2026</span>
        <div className="space-x-8">
          <a href="#work" className="hover:text-green-500 transition-colors">
            Work
          </a>
          <a href="#about" className="hover:text-green-500 transition-colors">
            About
          </a>
        </div>
      </nav>

      <section className="px-8 py-24 md:py-40">
        <h1 className="text-6xl md:text-[12vw] font-black uppercase leading-[0.8] tracking-tighter">
          Sandro <br /> Saran<span className="text-green-600">.</span>
        </h1>
        <p className="mt-8 max-w-md text-gray-400 font-mono text-sm">
          Trying to develop. Based in Melbourne.
        </p>
      </section>

      <section id="work" className="px-8 py-12 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT COLUMN: The Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[50vh] w-full overflow-hidden bg-neutral-900 group grayscale hover:grayscale-0 transition-all duration-700"
          >
            <a href="https://www.rango.com.au/" target="_blank">
              <Image
                src="/assets/Rango_hero.png"
                alt="Rango Project Detail"
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105 relative"
              />
              {/* Decorative Label for the image */}
              <div className="absolute bottom-4 left-4 mix-blend-difference">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white">
                  Fig. 01 — Platform Overview
                </p>
              </div>
            </a>
          </motion.div>

          {/* RIGHT COLUMN: The Intel */}
          <div className="flex flex-col justify-between h-full lg:sticky lg:top-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-green-600"></span>
                <p className="text-xs uppercase tracking-[0.3em] text-green-600 font-bold">
                  Project Showcase
                </p>
              </div>

              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.8]">
                RANGO
              </h2>

              <div className="space-y-6 max-w-lg">
                <p className="text-xl text-gray-200 leading-tight uppercase font-semibold">
                  Making your references work for you
                </p>
                <p className="text-sm font-mono text-gray-500 leading-relaxed italic">
                  A dedicated platform for centralizing and showcasing
                  professional peer references. Rango bridges the gap between
                  static resumes and real-world credibility by allowing
                  coworkers to provide verified testimonials in a accessible,
                  shareable format. Built with a focus on ease of use,
                  discoverability, and data integrity.
                </p>
              </div>
            </div>

            {/* Metadata Table */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] text-gray-600 uppercase mb-2 font-bold tracking-widest">
                  Stack
                </p>
                <ul className="text-xs font-mono text-gray-400 space-y-1">
                  <li>Next.js 14</li>
                  <li>Tailwind CSS</li>
                  <li>AWS</li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] text-gray-600 uppercase mb-2 font-bold tracking-widest">
                  Services
                </p>
                <ul className="text-xs font-mono text-gray-400 space-y-1">
                  <li>Full Stack Dev</li>
                  <li>UI/UX Design</li>
                  <li>System Architecture</li>
                </ul>
              </div>
              <div className="col-span-2 pt-4">
                <a
                  href="https://www.rango.com.au/"
                  target="_blank"
                  className="inline-block w-full text-center py-4 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-xs"
                >
                  Live Site ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
