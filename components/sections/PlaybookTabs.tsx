"use client";

import { useEffect, useRef, useState } from "react";
import { siteContent, type PlaybookCard } from "../../lib/site-content";

type TabId = "focus" | "principles" | "process";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function GradientDot() {
  return (
    <span
      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ backgroundImage: "var(--brand-gradient)" }}
    />
  );
}

function CardTopRule({ inset }: { inset: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute h-[2px] rounded-full brand-gradient opacity-60 transition-opacity duration-200 group-hover:opacity-90",
        inset,
      )}
    />
  );
}

export default function PlaybookTabs() {
  const { playbook } = siteContent;
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

  const cards: readonly PlaybookCard[] =
    activeTab === "focus"
      ? playbook.focus
      : activeTab === "principles"
        ? playbook.principles
        : playbook.process;

  return (
    <section className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold tracking-widest text-blue-700">
            PLAYBOOK DETAILS
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Focus, principles, and process — broken out clearly.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-600">
            This is the detailed layer underneath the cinematic playbook intro.
            It keeps the PAL content readable while preserving the stronger
            section flow from the merged direction.
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

            {playbook.tabs.map((tab) => {
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
                  onClick={() => setActiveTab(tab.id as TabId)}
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
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="grid gap-4 md:grid-cols-2"
            >
              {cards.map((card) => (
                <div
                  key={card.title}
                  className={cn(
                    "group relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                    card.accent && "ring-1 ring-zinc-900/5",
                  )}
                >
                  {card.accent && (
                    <div className="pointer-events-none absolute -inset-1 rounded-2xl brand-gradient-soft blur-xl opacity-55" />
                  )}

                  <CardTopRule inset="inset-x-6 top-4" />

                  <div className="relative">
                    {card.step && (
                      <div className="text-xs font-semibold tracking-widest text-blue-700">
                        {card.step}
                      </div>
                    )}

                    <h3 className="mt-2 text-base font-semibold text-zinc-900">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {card.description}
                    </p>

                    {card.bullets && card.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                        {card.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2">
                            <GradientDot />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-xs text-zinc-500">
              The intro section sets the frame. This section carries the actual
              playbook content.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
