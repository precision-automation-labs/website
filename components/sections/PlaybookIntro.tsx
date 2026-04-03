"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "../../lib/site-content";

gsap.registerPlugin(ScrollTrigger);

export default function PlaybookIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;
    const body = bodyRef.current;
    const card = cardRef.current;
    const rows = rowRefs.current.filter(Boolean);

    if (!section || !label || !headline || !body || !card) return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.6,
        },
      });

      tl.fromTo(
        label,
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out" },
        0,
      );

      tl.fromTo(
        headline,
        { x: "-18vw", opacity: 0 },
        { x: 0, opacity: 1, ease: "power3.out" },
        0,
      );

      tl.fromTo(
        body,
        { x: "10vw", opacity: 0 },
        { x: 0, opacity: 1, ease: "power3.out" },
        0.06,
      );

      tl.fromTo(
        card,
        { x: "14vw", opacity: 0, scale: 0.985 },
        { x: 0, opacity: 1, scale: 1, ease: "power3.out" },
        0.04,
      );

      rows.forEach((row, index) => {
        tl.fromTo(
          row,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, ease: "power3.out" },
          0.12 + index * 0.04,
        );
      });

      tl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: "-8vw", opacity: 0, ease: "power2.in" },
        0.72,
      );

      tl.fromTo(
        [body, label],
        { opacity: 1 },
        { opacity: 0, ease: "power2.in" },
        0.76,
      );

      tl.fromTo(
        card,
        { x: 0, opacity: 1 },
        { x: "8vw", opacity: 0, ease: "power2.in" },
        0.72,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const { playbook } = siteContent;

  const rows = [
    {
      title: "Focus",
      description: "Reliable automation, API confidence, CI-first feedback, and maintainability.",
    },
    {
      title: "Principles",
      description: "Signals over vanity metrics, design for change, and obvious ownership.",
    },
    {
      title: "Process",
      description: "Define the signal, build deterministically, integrate into CI, and maintain over time.",
    },
  ];

  return (
    <section
      id="playbook"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[760px] overflow-hidden border-t border-zinc-200 bg-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(circle at 18% 46%, rgba(126,162,224,0.22), rgba(106,100,193,0.10) 35%, rgba(109,63,175,0.06) 50%, transparent 70%)",
          }}
        />
        <div className="absolute right-[10%] top-[18%] h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-[10%] right-[16%] h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 md:grid-cols-[1.05fr_.95fr] md:items-center">
          <div>
            <span
              ref={labelRef}
              className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold tracking-widest text-blue-700 shadow-sm"
            >
              {playbook.eyebrow}
            </span>

            <h2
              ref={headlineRef}
              className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl"
            >
              A stronger operating model for
              <span className="block text-zinc-700">high-signal automation.</span>
            </h2>

            <p
              ref={bodyRef}
              className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg"
            >
              {playbook.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {playbook.tabs.map((tab) => (
                <span
                  key={tab.id}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm"
                >
                  {tab.label}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={cardRef}
            className="relative rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="pointer-events-none absolute -inset-1 rounded-[30px] brand-gradient-soft blur-xl opacity-70" />
            <div className="pointer-events-none absolute inset-x-6 top-4 h-[2px] rounded-full brand-gradient opacity-70" />

            <div className="relative">
              <div className="text-xs font-semibold tracking-widest text-zinc-900">
                PLAYBOOK STRUCTURE
              </div>

              <div className="mt-3 text-sm text-zinc-600">
                Site 2’s cinematic section model, translated into PAL’s actual message.
              </div>

              <div className="mt-6 space-y-4">
                {rows.map((row, index) => (
                  <div
                    key={row.title}
                    ref={(el) => {
                      rowRefs.current[index] = el;
                    }}
                    className="rounded-2xl border border-zinc-200 bg-white p-5"
                  >
                    <div className="text-sm font-semibold text-zinc-900">
                      {row.title}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {row.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-xs text-zinc-500">
                This section is the first pinned transition layer in the new merged design.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}