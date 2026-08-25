"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import FluidBackground from "./components/FluidBackground";
import Navbar from "./components/Navbar";

export default function Home() {
  const [currentBg, setCurrentBg] = useState<[number, number, number]>([
    1.0, 1.0, 1.0,
  ]);
  const [currentBlob, setCurrentBlob] = useState<[number, number, number]>([
    0.7055, 0.8076, 1.45,
  ]);
  const [dayStatus, setDayStatus] = useState<boolean>(true);

  return (
    <main className="min-h-screen text-[#ededed] selection:bg-accentblue selection:text-black">
      <FluidBackground bgColor={currentBg} blobColor={currentBlob} />

      <Navbar
        onColorChange={setCurrentBg}
        currentBg={currentBg}
        onColorBlob={setCurrentBlob}
        currentBlob={currentBlob}
        currentDay={dayStatus}
        onDayChange={setDayStatus}
      />

      <section className="px-8 py-24 md:py-40">
        <h1 className="text-6xl md:text-[12vw] font-black uppercase leading-[0.8] tracking-tighter">
          Sandro <br /> Saran
          <span className={dayStatus ? "text-accentblue" : "text-green-500"}>
            .
          </span>
        </h1>
        <p className="mt-8 max-w-md text-gray-400 font-mono text-sm">Development and Design</p>
      </section>

      <section id="work" className="px-8 py-12 border-t border-white/10">
      <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-12 bg-zinc-400"></span>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
            Work
          </p>
        </div>
        {/* Rango */}
        <div
          className={
            dayStatus
              ? "grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-neutral-100/70 p-10"
              : "grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-gray-950/70 p-10"
          }
        >
          {/* LEFT COLUMN: The Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[50vh] w-full overflow-hidden bg-neutral-900 group hover:grayscale-0 transition-all duration-700"
          >
            <a href="https://www.rango.com.au/" target="_blank">
              <Image
                src="/assets/Rango_hero.png"
                alt="Rango Project Detail"
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105 relative"
              />
              {/* Decorative Label for the image */}
              <div className="absolute bottom-4 left-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-black">
                  Fig. 01 — Platform Overview
                </p>
              </div>
            </a>
          </motion.div>

          {/* RIGHT COLUMN: The Intel */}
          <div className="flex flex-col justify-between h-full lg:sticky lg:top-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <p
                  className={
                    dayStatus
                      ? "text-xs uppercase tracking-[0.3em] text-black font-bold"
                      : "text-xs uppercase tracking-[0.3em] text-white font-bold"
                  }
                >
                  Project Showcase
                </p>
              </div>

              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.8] text-rango-yellow">
                RANGO
              </h2>

              <div className="space-y-6 max-w-lg">
                <p
                  className={
                    dayStatus
                      ? "text-xl text-black leading-tight uppercase font-semibold"
                      : "text-xl text-white leading-tight uppercase font-semibold"
                  }
                >
                  Making your references work for you
                </p>
                <p
                  className={
                    dayStatus
                      ? "text-sm font-mono text-gray-500 leading-relaxed"
                      : "text-sm font-mono text-gray-300 leading-relaxed"
                  }
                >
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
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-8 bg-blend-difference">
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
                  className="inline-block w-full text-center py-4 border border-white/20 hover:bg-rango-yellow hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-xs bg-black/20 text-white"
                >
                  Live Site ↗
                </a>
              </div>
            </div>
          </div>
        </div>
        <br/>
        {/* Overtime Calculator */}
        <div
          className={
            dayStatus
              ? "grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-neutral-100/70 p-10"
              : "grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-gray-950/70 p-10"
          }
        >
          <div className="flex flex-col justify-between h-full lg:sticky lg:top-24">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <p
                  className={
                    dayStatus
                      ? "text-xs uppercase tracking-[0.3em] text-black font-bold"
                      : "text-xs uppercase tracking-[0.3em] text-white font-bold"
                  }
                >
                  Project Showcase
                </p>
              </div>

              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.8] text-[#db0718]">
                Teacher Workload Tracker
              </h2>

              <div className="space-y-6 max-w-lg">
                <p
                  className={
                    dayStatus
                      ? "text-xl text-black leading-tight uppercase font-semibold"
                      : "text-xl text-white leading-tight uppercase font-semibold"
                  }
                >
                  Tracking and making teacher workload visible
                </p>
                <p
                  className={
                    dayStatus
                      ? "text-sm font-mono text-gray-500 leading-relaxed"
                      : "text-sm font-mono text-gray-300 leading-relaxed"
                  }
                >
                  Designed to help educators track daily task allocations, lesson planning, grading time, and administrative duties. The Teacher Workload Tracker provides a clear breakdown of professional workloads, helping to monitor out-of-hours commitments and deprioritised duties efficiently.
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
                  <li>Next.js</li>
                  <li>Supabase</li>
                  <li>TypeScript</li>
                </ul>
              </div>
              <div>
                <p className="text-[10px] text-gray-600 uppercase mb-2 font-bold tracking-widest">
                  Services
                </p>
                <ul className="text-xs font-mono text-gray-400 space-y-1">
                  <li>Frontend Dev</li>
                  <li>UI/UX Design</li>
                  <li>Data Analytics</li>
                </ul>
              </div>
              <div className="col-span-2 pt-4">
                <a
                  href="https://overtime-calculator-henna.vercel.app/"
                  target="_blank"
                  className="inline-block w-full text-center py-4 border border-white/20 hover:bg-[#db0718] hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-xs bg-black/20 text-white"
                >
                  Live Site ↗
                </a>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[50vh] w-full overflow-hidden bg-neutral-900 group hover:grayscale-0 transition-all duration-700"
          >
            <a href="https://overtime-calculator-henna.vercel.app/" target="_blank">
              <Image
                src="/assets/overtime_hero.png"
                alt="Overtime Calculator Project Detail"
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105 relative"
              />
              {/* Decorative Label for the image */}
              <div className="absolute bottom-4 left-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white">
                  Fig. 02 — Workload Tracker
                </p>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* <section id="about" className="px-8 py-12 border-t border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-12 bg-zinc-400"></span>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
            About
          </p>
        </div>
      </section> */}
    </main>
  );
}
