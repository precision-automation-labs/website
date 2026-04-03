"use client";

import { siteContent } from "../../lib/site-content";
import Image from "next/image";
import { Activity } from "lucide-react";

export default function Updates() {
  const { updates } = siteContent;

  const publishingTracks = [
    "Automation playbooks and reusable patterns",
    "Reliability and flake-reduction guidance",
    "CI signal design and reporting philosophy",
    "Generalized learnings from internal tooling",
  ];

  return (
    <section id="updates" className="relative py-24 md:py-32 bg-[#050508] border-t border-white/5 overflow-hidden">
      {/* Background Signal Visual */}
      <div className="absolute inset-y-0 right-0 w-1/2 opacity-30 pointer-events-none mix-blend-screen overflow-hidden">
        <Image 
          src="/signal_network.png" 
          alt="Signal network" 
          fill 
          className="object-cover object-left mask-image:linear-gradient(to_left,black,transparent)"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/80 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <div className="grid gap-16 md:grid-cols-[1fr_1fr] md:items-start">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-widest text-brand-blue shadow-sm mb-6">
              <Activity className="w-3 h-3 text-brand-indigo" />
              {updates.eyebrow}
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              {updates.title}
            </h2>

            <p className="text-lg leading-relaxed text-zinc-400 mb-10">
              {updates.description}
            </p>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-1/4 w-1/2 h-px brand-gradient opacity-30" />
              <div className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase mb-6">
                Current Direction
              </div>

              <ul className="space-y-4 text-sm text-zinc-300">
                {publishingTracks.map((item, i) => (
                  <li key={item} className="flex gap-3 items-start">
                    <span className="w-4 h-4 rounded-sm bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="block w-1.5 h-1.5 rounded-full bg-brand-indigo" />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="text-[10px] font-semibold tracking-widest text-brand-blue uppercase mb-2 pl-2 border-l border-brand-indigo">
              Signal Stream Output
            </div>
            
            {updates.items.map((item, index) => (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10"
              >
                {index === 0 && (
                   <div className="absolute inset-0 opacity-20 pointer-events-none rounded-2xl brand-gradient-soft blur-md" />
                )}
                
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-px bg-white/20 group-hover:bg-brand-magenta transition-colors" />

                <div className="relative z-10">
                  <div className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full border border-zinc-600 group-hover:border-brand-magenta transition-colors" />
                    Update Stream {index + 1}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center group hover:border-white/10 transition-colors">
                <div className="text-[10px] tracking-widest text-zinc-500 mb-2">BRAND</div>
                <div className="text-sm font-medium text-white group-hover:text-brand-blue transition-colors">In progress</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center group hover:border-white/10 transition-colors">
                <div className="text-[10px] tracking-widest text-zinc-500 mb-2">R&D</div>
                <div className="text-sm font-medium text-white group-hover:text-brand-magenta transition-colors">Active</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-center group hover:border-white/10 transition-colors">
                <div className="text-[10px] tracking-widest text-zinc-500 mb-2">PUBLISHING</div>
                <div className="text-sm font-medium text-white group-hover:text-brand-orange transition-colors">Growing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}