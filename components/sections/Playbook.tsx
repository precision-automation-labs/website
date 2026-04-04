"use client";

import { siteContent, type PlaybookCard } from "../../lib/site-content";
import { useRef } from "react";
import Image from "next/image";
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
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
      },
    });

    tl.to(
      introRef.current,
      {
        y: -100,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "power2.inOut",
      },
      0
    );

    tl.to(
      bgRef.current,
      {
        scale: 1.08,
        opacity: 0.42,
        ease: "power1.inOut",
        duration: 4,
      },
      0
    );

    tl.fromTo(
      focusRef.current,
      { y: "100vh", opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    tl.to(focusRef.current, {
      scale: 0.95,
      y: -20,
      opacity: 0.25,
      duration: 1,
      ease: "power2.inOut",
    });

    tl.fromTo(
      principlesRef.current,
      { y: "100vh", opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "<0.5"
    );

    tl.to(principlesRef.current, {
      scale: 0.95,
      y: -20,
      opacity: 0.25,
      duration: 1,
      ease: "power2.inOut",
    });

    tl.fromTo(
      processRef.current,
      { y: "100vh", opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "<0.5"
    );

    tl.to({}, { duration: 1 });
  }, { scope: sectionRef });

  const renderCardGrid = (items: readonly PlaybookCard[], title: string) => (
    <div className="w-full max-w-5xl mx-auto relative overflow-hidden rounded-[30px] border border-white/10 bg-black/35 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
      <div className="absolute inset-0 brand-gradient-soft opacity-20 pointer-events-none" />
      <div className="absolute inset-x-8 top-0 h-px brand-gradient opacity-60" />
      <div className="absolute -top-32 left-1/2 w-96 h-96 -translate-x-1/2 rounded-full bg-brand-indigo/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-8">
          {title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((card, i) => (
            <div
              key={i}
              className={clsx(
                "relative overflow-hidden rounded-2xl border p-6 transition-all backdrop-blur-md",
                card.accent
                  ? "bg-white/10 border-white/20"
                  : "bg-white/5 border-white/10"
              )}
            >
              {card.accent && (
                <div className="absolute inset-x-6 top-0 h-px brand-gradient opacity-60" />
              )}

              {card.step && (
                <div className="text-xs font-semibold text-brand-blue mb-2 tracking-widest uppercase">
                  {card.step}
                </div>
              )}

              <h4 className="text-lg font-semibold text-white mb-2">
                {card.title}
              </h4>

              <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                {card.description}
              </p>

              {card.bullets && (
                <ul className="space-y-2 mt-auto">
                  {card.bullets.map((b: string) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-xs text-zinc-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-magenta" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="playbook"
      ref={sectionRef}
      className="relative h-screen w-full bg-[#050508] overflow-hidden flex flex-col justify-center"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/systems_architecture.png"
          alt="Systems architecture background"
          fill
          className="object-cover object-center opacity-28 mix-blend-screen"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#050508]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/65 via-[#050508]/35 to-[#050508]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/75 via-transparent to-[#050508]/55" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <div className="absolute top-0 left-0 w-full h-px brand-gradient opacity-20" />
        <div className="absolute top-1/4 left-[12%] w-[26rem] h-[26rem] rounded-full bg-brand-blue/8 blur-[140px]" />
        <div className="absolute bottom-0 right-[10%] w-[24rem] h-[24rem] rounded-full bg-brand-magenta/8 blur-[140px]" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
        <div
          ref={introRef}
          className="text-center max-w-4xl absolute w-full px-6"
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-widest text-brand-blue mb-8 backdrop-blur-md">
            {playbook.eyebrow}
          </span>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            A stronger operating model for
            <span className="block brand-gradient-text mt-2">
              high-signal automation.
            </span>
          </h2>

          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
            {playbook.description}
          </p>
        </div>

        <div
          ref={focusRef}
          className="absolute w-full px-6 flex justify-center opacity-0 transform translate-y-full"
        >
          {renderCardGrid(playbook.focus, "Focus")}
        </div>

        <div
          ref={principlesRef}
          className="absolute w-full px-6 flex justify-center opacity-0 transform translate-y-full"
        >
          {renderCardGrid(playbook.principles, "Principles")}
        </div>

        <div
          ref={processRef}
          className="absolute w-full px-6 flex justify-center opacity-0 transform translate-y-full"
        >
          {renderCardGrid(playbook.process, "Process")}
        </div>
      </div>
    </section>
  );
}