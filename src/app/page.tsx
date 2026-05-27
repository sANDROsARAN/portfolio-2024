"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const PROJECTS = [
  { id: 1, title: "Project Alpha", tags: "React / Three.js", year: "2024" },
  { id: 2, title: "Deep Space", tags: "Next.js / GLSL", year: "2023" },
  { id: 3, title: "Void Engine", tags: "TypeScript", year: "2024" },
];

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
          Building digital experiences with a focus on high-end motion and
          gritty aesthetics. Based in Melbourne.
        </p>
      </section>

      <section id="work" className="px-8 py-20 border-t border-white/10">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-12">
          Selected Works
        </p>

        <div className="flex flex-col">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ x: 20 }}
              className="group py-12 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer transition-colors hover:border-green-500"
            >
              <div>
                <span className="text-xs font-mono text-green-600 mb-2 block">
                  {project.year}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold uppercase group-hover:italic">
                  {project.title}
                </h2>
              </div>
              <p className="text-sm font-mono text-gray-500 uppercase mt-4 md:mt-0">
                {project.tags}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
