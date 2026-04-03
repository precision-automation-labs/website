"use client";

import { useRef } from "react";
import Image from "next/image";
import { siteContent } from "../../lib/site-content";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const { hero } = siteContent;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current || !bgRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 1,
      },
    });

    tl.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      y: -50,
      filter: "blur(10px)",
      ease: "power2.inOut",
    }, 0)
    .to(bgRef.current, {
      scale: 1.1,
      opacity: 0.3,
      ease: "power1.inOut",
    }, 0);
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#050508]">
      {/* Background Cinematic Image */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/precision_core.png"
          alt="Precision Core architecture"
          fill
          className="object-cover object-center opacity-60 mix-blend-screen"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlays to blend into background */}
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Lighting Flairs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
        <div className="absolute w-[60vw] h-[30vh] bg-brand-indigo/10 blur-[100px] rounded-full transform -translate-y-1/2 mix-blend-screen" />
        <div className="absolute w-[40vw] h-[20vh] bg-brand-blue/10 blur-[100px] rounded-full transform translate-y-1/4 mix-blend-screen" />
      </div>

      <div className="relative z-10 h-full w-full flex flex-col justify-end pb-[15vh] px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={contentRef} className="max-w-4xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 text-xs text-zinc-300 shadow-xl mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue shadow-[0_0_8px_rgba(126,162,224,0.8)]" />
            <span className="uppercase tracking-widest font-medium">{hero.eyebrow}</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.1]">
            {hero.titleTop}
            <span className="block brand-gradient-text mt-2">{hero.titleBottom}</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-zinc-400 font-light">
            {hero.description}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href={hero.primaryCta.href}
              className="group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 brand-gradient opacity-0 transition-opacity group-hover:opacity-20" />
              <span className="relative flex items-center gap-2">
                {hero.primaryCta.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center text-sm font-semibold text-zinc-400 transition-colors hover:text-white uppercase tracking-widest"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-20">
        <div className="text-[10px] uppercase tracking-widest text-zinc-500">Initiate Sequence</div>
        <div className="w-px h-12 bg-gradient-to-b from-brand-blue to-transparent" />
      </div>
    </section>
  );
}