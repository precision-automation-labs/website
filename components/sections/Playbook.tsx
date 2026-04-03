"use client";

import { useRef } from "react";
import { siteContent, type PlaybookCard } from "../../lib/site-content";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Playbook() {
  const { playbook } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);
  
  const introRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Total scroll distance will be h-[400vh], meaning 300% of scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
      },
    });

    // Intro Phase Out
    tl.to(introRef.current, {
      y: -100,
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut"
    });

    // Focus Phase In
    tl.fromTo(focusRef.current, 
      { y: "100vh", opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
    // Focus Phase holds, then pushes back
    tl.to(focusRef.current, {
      scale: 0.95,
      y: -20,
      opacity: 0.3,
      duration: 1, 
      ease: "power2.inOut"
    });

    // Principles Phase In
    tl.fromTo(principlesRef.current, 
      { y: "100vh", opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "<0.5" // Overlap with Focus Phase Out
    );
    // Principles Phase holds, then pushes back
    tl.to(principlesRef.current, {
      scale: 0.95,
      y: -20,
      opacity: 0.3,
      duration: 1, 
      ease: "power2.inOut"
    });

    // Process Phase In
    tl.fromTo(processRef.current, 
      { y: "100vh", opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "<0.5"
    );
    
    // Process Phase holds until end of pin
    tl.to({}, { duration: 1 });

  }, { scope: sectionRef });

  const renderCardGrid = (items: readonly PlaybookCard[], title: string) => (
    <div className="w-full max-w-5xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-32 left-1/2 w-96 h-96 -translate-x-1/2 rounded-full bg-brand-indigo/10 blur-[100px] pointer-events-none" />
      
      <h3 className="text-3xl font-bold text-white tracking-tight mb-8 relative z-10">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {items.map((card, i) => (
          <div key={i} className={clsx("p-6 rounded-2xl border transition-all", card.accent ? "bg-white/10 border-white/20" : "bg-white/5 border-white/5")}>
            {card.step && <div className="text-xs font-semibold text-brand-blue mb-2 tracking-widest">{card.step}</div>}
            <h4 className="text-lg font-semibold text-white mb-2">{card.title}</h4>
            <p className="text-sm text-zinc-400 mb-4">{card.description}</p>
            {card.bullets && (
              <ul className="space-y-2 mt-auto">
                {card.bullets.map((b: string) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-zinc-300">
                    <span className="w-1 h-1 rounded-full bg-brand-magenta" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {card.accent && <div className="absolute top-0 right-1/4 w-1/2 h-px brand-gradient opacity-50" />}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="playbook" ref={sectionRef} className="relative h-screen w-full bg-[#050508] overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px brand-gradient opacity-20" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-6">
        
        {/* Intro Scene */}
        <div ref={introRef} className="text-center max-w-4xl absolute w-full px-6">
           <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-widest text-brand-blue mb-8">
            {playbook.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            A stronger operating model for
            <span className="block brand-gradient-text mt-2">high-signal automation.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
            {playbook.description}
          </p>
        </div>

        {/* Focus Scene */}
        <div ref={focusRef} className="absolute w-full px-6 flex justify-center opacity-0 transform translate-y-full">
          {renderCardGrid(playbook.focus, "Focus")}
        </div>

        {/* Principles Scene */}
        <div ref={principlesRef} className="absolute w-full px-6 flex justify-center opacity-0 transform translate-y-full">
           {renderCardGrid(playbook.principles, "Principles")}
        </div>

        {/* Process Scene */}
        <div ref={processRef} className="absolute w-full px-6 flex justify-center opacity-0 transform translate-y-full">
           {renderCardGrid(playbook.process, "Process")}
        </div>

      </div>
    </section>
  );
}
