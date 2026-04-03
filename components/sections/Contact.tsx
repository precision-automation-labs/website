"use client";

import Image from "next/image";
import Link from "next/link";
import { siteContent } from "../../lib/site-content";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Contact() {
  const { brand, contact } = siteContent;

  const focusAreas = [
    "Automation reliability and flake reduction",
    "CI-integrated quality signals",
    "Maintainable test architecture",
  ];

  const nextSteps = [
    "Clarify where automation is producing noise instead of signal",
    "Identify the fastest place to improve feedback loops",
    "Establish a cleaner long-term structure for ownership",
  ];

  return (
    <section id="contact" className="relative pt-24 md:pt-40 pb-12 bg-[#050508] border-t border-white/5 overflow-hidden flex flex-col justify-between min-h-screen">
      {/* Spotlight and Architecture Background */}
      <div className="absolute inset-0 pointer-events-none top-0">
         <Image 
          src="/systems_architecture.png" 
          alt="Systems Architecture" 
          fill 
          className="object-cover opacity-20 object-top mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/80 via-[#050508]/90 to-[#050508]" />
        
        {/* Spotlight source */}
        <div className="absolute -top-[40vh] left-1/2 -translate-x-1/2 w-[100vw] h-[100vh] bg-brand-blue/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 w-full z-10 flex-grow flex flex-col justify-center">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-brand-blue shadow-sm mb-8">
            {contact.eyebrow}
          </div>

          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-8">
            {contact.title}
          </h2>

          <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-zinc-400">
            {contact.description}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={contact.primaryCta.href}
              className="group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:scale-105 overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 brand-gradient opacity-0 transition-opacity group-hover:opacity-20" />
              <span className="relative flex items-center gap-2">
                {contact.primaryCta.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <Link
              href={contact.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/5 w-full sm:w-auto uppercase tracking-widest"
            >
              {contact.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-12 max-w-4xl mx-auto w-full">
          {/* Card 1 */}
          <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 relative overflow-hidden group hover:border-brand-indigo/30 transition-colors">
            <div className="absolute top-0 right-1/4 w-1/2 h-px brand-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase mb-6">
              Precision Automation Labs
            </div>
            <p className="text-sm leading-relaxed text-zinc-300 mb-6">
               A focused approach to automation quality: fewer flaky outcomes,
               clearer ownership, and stronger signals for teams making real decisions.
            </p>
            <ul className="space-y-3 text-xs text-zinc-400">
              {focusAreas.map((item) => (
                <li key={item} className="flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 relative overflow-hidden group hover:border-brand-magenta/30 transition-colors">
            <div className="absolute top-0 right-1/4 w-1/2 h-px brand-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-[10px] font-semibold tracking-widest text-brand-magenta uppercase mb-6">
              Next Step: Start with the signal
            </div>
            <ul className="space-y-4 text-sm text-zinc-300">
              {nextSteps.map((item) => (
                <li key={item} className="flex gap-3 items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer minimal area */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-white/10 pt-8">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10 overflow-hidden bg-white/5 rounded-lg border border-white/10 flex items-center justify-center p-1">
              {/* Keeping the Next Image but assuming it might be a white logo now or we just use text */}
               <Image
                src={brand.logoSrc}
                alt={`${brand.name} logo`}
                fill
                className="object-contain p-2 invert mix-blend-screen"
              />
            </div>
            <div>
              <div className="text-sm h-full font-semibold text-white tracking-widest uppercase">
                {brand.name}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">
                 {brand.tagline}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
             <a href={contact.primaryCta.href} className="hover:text-white transition-colors">
              Contact
            </a>
            <a href="#updates" className="hover:text-white transition-colors">
              Updates
            </a>
            <Link href="/legal" className="hover:text-white transition-colors">
              Legal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}