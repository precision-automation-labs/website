"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const NAV = [
  { id: "playbook", label: "Playbook" },
  { id: "toolbox", label: "Toolbox" },
  { id: "connect", label: "Updates" },
];

const TABS = [
  { id: "focus", label: "Focus" },
  { id: "principles", label: "Principles" },
  { id: "process", label: "Process" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!els.length) return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (reduced) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          const mode = el.getAttribute("data-reveal"); // "major" | "" | null

          if (e.isIntersecting) {
            el.classList.add("is-visible");
            if (mode !== "major") io.unobserve(e.target);
          } else {
            if (mode === "major") el.classList.remove("is-visible");
          }
        });
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: [0.12, 0.2, 0.35] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!nodes.length) return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        rootMargin: "-18% 0px -62% 0px",
        threshold: reduced ? 0.1 : [0.12, 0.2, 0.3, 0.4, 0.5],
      },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [sectionIds]);

  return active;
}

export default function HomePage() {
  useRevealOnScroll();

  const sectionIds = useMemo(() => NAV.map((n) => n.id), []);
  const observedSection = useActiveSection(sectionIds);

  // manual override for click-to-activate
  const [manualSection, setManualSection] = useState<string | null>(null);

  // release override only when observer catches up (no timer snap-back)
  useEffect(() => {
    if (manualSection && observedSection === manualSection) {
      setManualSection(null);
    }
  }, [observedSection, manualSection]);

  const activeSection = manualSection ?? observedSection;

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setManualSection(id);

    const el = document.getElementById(id);
    if (!el) return;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const headerOffset = 110;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  };

  function useUnderlineSlider(
    rootRef: React.RefObject<HTMLDivElement | null>,
    selectorAttr: string,
    activeId: string,
  ) {
    const [underline, setUnderline] = useState({
      left: 0,
      width: 0,
      ready: false,
    });

    useEffect(() => {
      const root = rootRef.current;
      if (!root) return;

      const update = () => {
        const btn = root.querySelector<HTMLElement>(
          `[${selectorAttr}="${activeId}"]`,
        );
        if (!btn) return;

        const rootRect = root.getBoundingClientRect();
        const rect = btn.getBoundingClientRect();
        setUnderline({
          left: rect.left - rootRect.left,
          width: rect.width,
          ready: true,
        });
      };

      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, [rootRef, selectorAttr, activeId]);

    return underline;
  }

  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  const desktopUnderline = useUnderlineSlider(
    desktopNavRef,
    "data-nav",
    activeSection,
  );
  const mobileUnderline = useUnderlineSlider(
    mobileNavRef,
    "data-mnav",
    activeSection,
  );

  // Tabs
  const [activeTab, setActiveTab] = useState<TabId>("focus");

  const tabBarRef = useRef<HTMLDivElement | null>(null);
  const [tabUnderline, setTabUnderline] = useState({
    left: 0,
    width: 0,
    ready: false,
  });

  useEffect(() => {
    const root = tabBarRef.current;
    if (!root) return;

    const update = () => {
      const el = root.querySelector<HTMLElement>(`[data-tab="${activeTab}"]`);
      if (!el) return;

      const rootRect = root.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setTabUnderline({
        left: rect.left - rootRect.left,
        width: rect.width,
        ready: true,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeTab]);

  const [tabAnimating, setTabAnimating] = useState(false);
  useEffect(() => {
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduced) return;

    setTabAnimating(true);
    const t = window.setTimeout(() => setTabAnimating(false), 240);
    return () => window.clearTimeout(t);
  }, [activeTab]);

  // Content
  const heroCards = [
    {
      k: "Reliability first",
      v: "Signals you can trust—less noise, fewer flaky failures.",
    },
    {
      k: "CI-integrated",
      v: "Fast feedback loops that keep quality close to code.",
    },
    {
      k: "Maintainable by design",
      v: "Clean structure, ownership, and documentation over time.",
    },
  ];

  const focusCards = [
    {
      t: "Test reliability",
      d: "Eliminate flaky noise so failures are meaningful and actionable.",
      b: ["Stable locators", "Deterministic data", "Consistent environments"],
      accent: true,
    },
    {
      t: "API confidence",
      d: "Protect critical workflows with contract-style thinking and edge case coverage.",
      b: ["Schema validation", "Auth patterns", "Critical path checks"],
    },
    {
      t: "CI-first feedback loops",
      d: "Automation should shorten time-to-signal, not extend it.",
      b: ["Smoke gates", "Parallelization", "Artifacts & reports"],
    },
    {
      t: "Maintainability",
      d: "Automation is software—structure it like software.",
      b: ["Clear ownership", "Documentation", "Simple abstractions"],
      accent: true,
    },
  ];

  const principlesCards = [
    {
      t: "Signals over vanity metrics",
      d: "A large test count means nothing if the failures aren’t trustworthy.",
      accent: true,
    },
    {
      t: "Design for change",
      d: "Apps evolve—automation should be resilient and easy to update.",
    },
    {
      t: "Keep the feedback loop short",
      d: "The best automation helps you decide quickly and confidently.",
    },
    {
      t: "Make ownership obvious",
      d: "Clear ownership keeps suites healthy over time.",
      accent: true,
    },
  ];

  const processCards = [
    {
      step: "STEP 1",
      t: "Define the signal",
      d: "What decision does this enable?",
      accent: true,
    },
    {
      step: "STEP 2",
      t: "Build deterministically",
      d: "Stable locators, data, and assertions.",
    },
    {
      step: "STEP 3",
      t: "Integrate into CI",
      d: "PR gates, nightly checks, releases.",
    },
    {
      step: "STEP 4",
      t: "Maintain over time",
      d: "Ownership + docs prevent decay.",
      accent: true,
    },
  ];

  const toolboxBlocks = [
    {
      title: "UI Automation",
      desc: "End-to-end flows designed to be stable under change.",
      tools: ["Robot Framework", "Playwright", "Selenium", "Appium"],
      accent: true,
    },
    {
      title: "API & Contract Testing",
      desc: "Confidence in critical services and integrations.",
      tools: ["Postman", "Newman", "Schema validation", "Auth patterns"],
    },
    {
      title: "CI & Pipelines",
      desc: "Automation where it matters: PRs, nightly checks, releases.",
      tools: [
        "Azure DevOps",
        "GitHub Actions",
        "Parallel execution",
        "Artifacts",
      ],
    },
    {
      title: "Reporting & Signals",
      desc: "Readable outputs that help teams act quickly.",
      tools: [
        "HTML reports",
        "Failure categorization",
        "Trend tracking",
        "Flake reduction",
      ],
      accent: true,
    },
  ];

  const GradientDot = () => (
    <span
      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ backgroundImage: "var(--brand-gradient)" }}
    />
  );

  const CardTopRule = ({ inset }: { inset: string }) => (
    <div
      className={cn(
        "pointer-events-none absolute h-[2px] rounded-full brand-gradient opacity-60 transition-opacity duration-200 group-hover:opacity-90",
        inset,
      )}
    />
  );

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }

        :root {
          --brand-blue: #7ea2e0;
          --brand-indigo: #6a64c1;
          --brand-purple: #6d3faf;
          --brand-magenta: #af0875;
          --brand-red: #f52531;
          --brand-orange: #fc9f1c;

          --brand-gradient: linear-gradient(
            90deg,
            var(--brand-blue),
            var(--brand-indigo),
            var(--brand-purple),
            var(--brand-magenta),
            var(--brand-red),
            var(--brand-orange)
          );
          --brand-gradient-soft: linear-gradient(
            135deg,
            rgba(126, 162, 224, 0.16),
            rgba(106, 100, 193, 0.14),
            rgba(109, 63, 175, 0.12),
            rgba(175, 8, 117, 0.1),
            rgba(245, 37, 49, 0.1),
            rgba(252, 159, 28, 0.12)
          );
        }

        .brand-gradient {
          background: var(--brand-gradient);
        }
        .brand-gradient-soft {
          background: var(--brand-gradient-soft);
        }

        [data-reveal] {
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 520ms ease,
            transform 520ms ease;
          will-change: opacity, transform;
        }
        [data-reveal].is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        [data-reveal][data-stagger="1"] {
          transition-delay: 40ms;
        }
        [data-reveal][data-stagger="2"] {
          transition-delay: 90ms;
        }
        [data-reveal][data-stagger="3"] {
          transition-delay: 140ms;
        }
        [data-reveal][data-stagger="4"] {
          transition-delay: 190ms;
        }
      `}</style>

      {/* Header */}
      <header
        className={cn(
          // ✅ added "relative" so the gradient overlay can sit behind content
          "sticky top-0 z-50 border-b border-zinc-200 backdrop-blur relative",
          // ✅ Option 2: glassy + lighter white
          scrolled
            ? "bg-white/60 backdrop-blur-xl"
            : "bg-white/50 backdrop-blur-lg",
        )}
      >
        {/* ✅ subtle brand tint over the glass */}
        <div className="pointer-events-none absolute inset-0 brand-gradient-soft opacity-60" />

        {/* ✅ ensure header contents sit above the overlay */}
        <div className="relative">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <Link href="/" className="group flex items-center gap-3">
              <span className="relative h-10 w-10 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/logo.png"
                  alt="Precision Automation Labs logo"
                  fill
                  className="object-contain p-1.5"
                  priority
                />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">
                  Precision Automation Labs
                </div>
                <div className="text-xs text-zinc-500">
                  QA Automation Philosophy &amp; Engineering
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <div
                ref={desktopNavRef}
                className="relative flex items-center gap-6"
              >
                {NAV.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={scrollToId(item.id)}
                      data-nav={item.id}
                      className={cn(
                        "text-sm transition-colors",
                        isActive
                          ? "text-zinc-900"
                          : "text-zinc-600 hover:text-zinc-900",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })}

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-2 h-[2px] rounded-full transition-[transform,width,opacity] duration-300",
                    desktopUnderline.ready ? "opacity-100" : "opacity-0",
                  )}
                  style={{
                    width: desktopUnderline.width,
                    transform: `translateX(${desktopUnderline.left}px)`,
                    background: "var(--brand-gradient)",
                  }}
                />
              </div>
            </div>

            {/* Mobile nav */}
            <div className="md:hidden">
              <div
                ref={mobileNavRef}
                className="relative flex items-center gap-6"
              >
                {NAV.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={scrollToId(item.id)}
                      data-mnav={item.id}
                      className={cn(
                        "text-sm transition-colors",
                        isActive
                          ? "text-zinc-900"
                          : "text-zinc-600 hover:text-zinc-900",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })}

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-2 h-[2px] rounded-full transition-[transform,width,opacity] duration-300",
                    mobileUnderline.ready ? "opacity-100" : "opacity-0",
                  )}
                  style={{
                    width: mobileUnderline.width,
                    transform: `translateX(${mobileUnderline.left}px)`,
                    background: "var(--brand-gradient)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-48 left-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute top-56 right-1/4 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr] md:items-start">
            <div>
              <div
                data-reveal="major"
                data-stagger="1"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 shadow-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Reliability • CI Signals • Maintainability
              </div>

              <h1
                data-reveal="major"
                data-stagger="2"
                className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl"
              >
                Automation that produces
                <span className="block text-zinc-700">
                  stable, actionable signals.
                </span>
              </h1>

              <p
                data-reveal="major"
                data-stagger="3"
                className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg"
              >
                Precision Automation Labs is building a brand around what we
                believe makes QA automation effective: fewer flaky tests, faster
                feedback loops, and clear ownership. We’re currently focused on
                R&amp;D, publishing learnings, and building internal tooling.
              </p>

              <div
                data-reveal="major"
                data-stagger="4"
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href="#playbook"
                  onClick={scrollToId("playbook")}
                  className="group inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Explore the playbook
                  <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="#connect"
                  onClick={scrollToId("connect")}
                  className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold transition hover:bg-zinc-50"
                >
                  Follow updates
                </a>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {heroCards.map((x) => (
                  <div
                    key={x.k}
                    data-reveal
                    className="group relative rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <CardTopRule inset="inset-x-4 top-3" />
                    <div className="text-sm font-semibold">{x.k}</div>
                    <div className="mt-1 text-sm text-zinc-600">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              data-reveal="major"
              className="group relative rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="pointer-events-none absolute -inset-1 rounded-3xl brand-gradient-soft blur-xl opacity-70" />
              <CardTopRule inset="inset-x-6 top-4" />

              <div className="relative">
                <div className="text-xs font-semibold tracking-widest text-zinc-900">
                  PRECISION AUTOMATION LABS
                </div>
                <div className="mt-3 text-sm text-zinc-600">
                  A clean, enterprise-friendly approach to automation quality.
                </div>

                <div className="relative mt-6 aspect-square w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                  <Image
                    src="/logo2.png"
                    alt="Precision Automation Labs"
                    fill
                    className="object-contain p-6 transition-transform duration-500 hover:scale-[1.03]"
                    priority
                  />
                </div>

                <ul className="mt-6 space-y-2 text-sm text-zinc-700">
                  {[
                    "Automation patterns and playbooks",
                    "Quality gates and reporting philosophy",
                    "Real-world learnings (sanitized + generalized)",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <GradientDot />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLAYBOOK */}
      <section id="playbook" className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div data-reveal="major" className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-blue-700">
              PLAYBOOK
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              A minimal, high-signal view of how we build QA automation
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              Use the tabs to switch between what we prioritize, what we
              believe, and how we execute.
            </p>
          </div>

          <div className="mt-8">
            <div
              ref={tabBarRef}
              className="relative inline-flex rounded-full border border-zinc-200 bg-white p-1 shadow-sm"
              role="tablist"
              aria-label="Playbook tabs"
            >
              <div className="pointer-events-none absolute inset-0 rounded-full brand-gradient-soft opacity-55" />

              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    id={`tab-${tab.id}`}
                    data-tab={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative z-10 rounded-full px-4 py-2 text-sm font-semibold transition-all",
                      isActive
                        ? "text-zinc-900 shadow-sm"
                        : "text-zinc-600 hover:text-zinc-900",
                    )}
                  >
                    {isActive && (
                      <span className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />
                    )}
                    {isActive && (
                      <span className="pointer-events-none absolute inset-0 rounded-full brand-gradient-soft opacity-65" />
                    )}
                    <span className="relative">{tab.label}</span>
                  </button>
                );
              })}

              <span
                aria-hidden="true"
                className={cn(
                  "absolute bottom-0 left-0 h-[2px] rounded-full transition-[transform,width,opacity] duration-300",
                  tabUnderline.ready ? "opacity-100" : "opacity-0",
                )}
                style={{
                  width: tabUnderline.width,
                  transform: `translateX(${tabUnderline.left}px) translateY(2px)`,
                  background: "var(--brand-gradient)",
                }}
              />
            </div>

            <div className="mt-8">
              <div
                className={cn(
                  "transition-[opacity,transform] duration-300",
                  tabAnimating
                    ? "opacity-0 translate-y-1"
                    : "opacity-100 translate-y-0",
                )}
              >
                {activeTab === "focus" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {focusCards.map((s) => (
                      <div
                        key={s.t}
                        className={cn(
                          "group relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                          s.accent && "ring-1 ring-zinc-900/5",
                        )}
                      >
                        {s.accent && (
                          <div className="pointer-events-none absolute -inset-1 rounded-2xl brand-gradient-soft blur-xl opacity-55" />
                        )}
                        <CardTopRule inset="inset-x-6 top-4" />
                        <div className="relative">
                          <h3 className="text-base font-semibold">{s.t}</h3>
                          <p className="mt-2 text-sm text-zinc-600">{s.d}</p>
                          <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                            {s.b.map((x) => (
                              <li key={x} className="flex gap-2">
                                <GradientDot />
                                <span>{x}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "principles" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {principlesCards.map((s) => (
                      <div
                        key={s.t}
                        className={cn(
                          "group relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                          (s as any).accent && "ring-1 ring-zinc-900/5",
                        )}
                      >
                        {(s as any).accent && (
                          <div className="pointer-events-none absolute -inset-1 rounded-2xl brand-gradient-soft blur-xl opacity-55" />
                        )}
                        <CardTopRule inset="inset-x-6 top-4" />
                        <div className="relative">
                          <h3 className="text-base font-semibold">{s.t}</h3>
                          <p className="mt-2 text-sm text-zinc-600">{s.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "process" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {processCards.map((s) => (
                      <div
                        key={s.t}
                        className={cn(
                          "group relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                          (s as any).accent && "ring-1 ring-zinc-900/5",
                        )}
                      >
                        {(s as any).accent && (
                          <div className="pointer-events-none absolute -inset-1 rounded-2xl brand-gradient-soft blur-xl opacity-55" />
                        )}
                        <CardTopRule inset="inset-x-6 top-4" />
                        <div className="relative">
                          <div className="text-xs font-semibold tracking-widest text-blue-700">
                            {s.step}
                          </div>
                          <h3 className="mt-2 text-base font-semibold">
                            {s.t}
                          </h3>
                          <p className="mt-2 text-sm text-zinc-600">{s.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 text-xs text-zinc-500">
                Tip: Clicking the nav updates immediately; scrolling keeps it
                accurate.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLBOX */}
      <section id="toolbox" className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div data-reveal="major" className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-blue-700">
              TOOLBOX
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Tools chosen for reliability and clarity
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              We select tools based on determinism, maintainability, and the
              quality of signal they produce — not trends.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {toolboxBlocks.map((b) => (
              <div
                key={b.title}
                data-reveal
                className={cn(
                  "group relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                  b.accent && "ring-1 ring-zinc-900/5",
                )}
              >
                {b.accent && (
                  <div className="pointer-events-none absolute -inset-1 rounded-2xl brand-gradient-soft blur-xl opacity-55" />
                )}
                <CardTopRule inset="inset-x-6 top-4" />
                <div className="relative">
                  <h3 className="mt-2 text-base font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600">{b.desc}</p>
                  <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                    {b.tools.map((t) => (
                      <li key={t} className="flex gap-2">
                        <GradientDot />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center text-sm text-zinc-500 italic">
            Tools change. Principles don’t.
          </div>
        </div>
      </section>

      {/* UPDATES */}
      <section id="connect" className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div data-reveal="major" className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-blue-700">
              UPDATES
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Building in public (within reason)
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              We’re currently focused on brand development, internal R&amp;D,
              and publishing generalized learnings around QA automation. We’ll
              share updates here as we publish articles, templates, and example
              patterns.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div
              data-reveal
              className="group relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardTopRule inset="inset-x-6 top-4" />
              <h3 className="text-base font-semibold">What we’ll publish</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {[
                  "Automation playbooks (reliability, CI gates, reporting)",
                  "Sample repo templates (sanitized + generic)",
                  "Checklists for reducing flakiness",
                  "Patterns for maintainable test suites",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <GradientDot />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-reveal
              className="group relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardTopRule inset="inset-x-6 top-4" />
              <h3 className="text-base font-semibold">Contact</h3>
              <p className="mt-2 text-sm text-zinc-600">
                Email will be available once your domain inbox is set up.
              </p>

              <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
                <div className="text-xs text-zinc-500">Email</div>
                <div className="mt-1">
                  info@precisionautomationlabs.com{" "}
                  <span className="text-zinc-500">(coming soon)</span>
                </div>
              </div>

              <div className="mt-4 text-xs text-zinc-500">
                Note: This site describes our philosophy and R&amp;D efforts. It
                does not include client-specific details.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-zinc-600">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Precision Automation Labs.</div>
            <div>Built with Next.js + Vercel.</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
