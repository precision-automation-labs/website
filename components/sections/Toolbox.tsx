"use client";

import { siteContent } from "../../lib/site-content";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";
import { Hexagon } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Toolbox() {
  const { toolbox } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const cards = gsap.utils.toArray(".toolbox-card", gridRef.current);
    
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="toolbox" ref={sectionRef} className="relative py-24 md:py-32 bg-[#050508] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-brand-indigo/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-brand-magenta/5 blur-[100px] rounded-full" />
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-widest text-brand-blue shadow-sm mb-6">
            <Hexagon className="w-3 h-3 text-brand-magenta" />
            {toolbox.eyebrow}
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            {toolbox.title}
          </h2>

          <p className="text-lg leading-relaxed text-zinc-400">
            {toolbox.description}
          </p>
        </div>

        <div ref={gridRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {toolbox.items.map((item, idx) => (
            <div
              key={item.title}
              className={clsx(
                "toolbox-card group relative rounded-2xl border bg-white/5 p-8 transition-all duration-500 hover:bg-white/10 flex flex-col",
                item.accent ? "border-brand-blue/30" : "border-white/10"
              )}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 brand-gradient-soft blur-xl rounded-2xl mix-blend-screen pointer-events-none" />
              
              {/* Dynamic top rule */}
              <div className={clsx(
                "absolute top-0 left-6 right-6 h-px transition-all duration-500",
                item.accent ? "brand-gradient" : "bg-white/20 group-hover:brand-gradient"
              )} />

              <h3 className="text-lg font-semibold text-white mb-3 tracking-wide">
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed text-zinc-400 mb-8 flex-grow">
                {item.description}
              </p>

              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3 block">
                  Included in layer
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tools.map((tool) => (
                    <span key={tool} className="inline-flex items-center rounded-md border border-white/10 bg-black/40 px-2 py-1 text-[11px] font-medium text-zinc-300 tracking-wide">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <div className="inline-block relative">
            <div className="absolute inset-x-0 -bottom-2 h-px brand-gradient opacity-50" />
            <h3 className="text-2xl md:text-3xl font-light tracking-widest text-white uppercase italic">
              {toolbox.footerNote}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}