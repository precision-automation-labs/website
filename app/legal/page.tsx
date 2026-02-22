"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const LEGAL_TABS = [
  { id: "tos", label: "Terms" },
  { id: "privacy", label: "Privacy" },
  { id: "cookies", label: "Cookies" },
  { id: "disclaimer", label: "Disclaimer" },
] as const;

type LegalTabId = (typeof LEGAL_TABS)[number]["id"];

export default function LegalPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Header underline (Legal participates like home page nav)
  const headerNavRef = useRef<HTMLDivElement | null>(null);
  const activeHeader = "legal"; // we're on /legal

  const [headerUnderline, setHeaderUnderline] = useState({
    left: 0,
    width: 0,
    ready: false,
  });

  useEffect(() => {
    const root = headerNavRef.current;
    if (!root) return;

    const update = () => {
      const el = root.querySelector<HTMLElement>(
        `[data-hnav="${activeHeader}"]`,
      );
      if (!el) return;

      const rootRect = root.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setHeaderUnderline({
        left: rect.left - rootRect.left,
        width: rect.width,
        ready: true,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeHeader]);

  // Tabs (same vibe as Playbook)
  const [activeTab, setActiveTab] = useState<LegalTabId>("tos");
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

  const lastUpdated = "February 21, 2026";

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
      `}</style>

      {/* Header (now with gradient underline under "Legal") */}
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-zinc-200 backdrop-blur relative",
          scrolled
            ? "bg-white/60 backdrop-blur-xl"
            : "bg-white/50 backdrop-blur-lg",
        )}
      >
        <div className="pointer-events-none absolute inset-0 brand-gradient-soft opacity-60" />
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

            {/* Header nav with underline slider */}
            <div className="flex items-center gap-8">
              <div
                ref={headerNavRef}
                className="relative flex items-center gap-6"
              >
                <Link
                  href="/"
                  data-hnav="home"
                  className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  Home
                </Link>

                <Link
                  href="/legal"
                  data-hnav="legal"
                  className="text-sm text-zinc-900 transition-colors"
                  aria-current="page"
                >
                  Legal
                </Link>

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-2 h-[2px] rounded-full transition-[transform,width,opacity] duration-300",
                    headerUnderline.ready ? "opacity-100" : "opacity-0",
                  )}
                  style={{
                    width: headerUnderline.width,
                    transform: `translateX(${headerUnderline.left}px)`,
                    background: "var(--brand-gradient)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Legal content */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-blue-700">
              LEGAL
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Policies &amp; terms
            </h1>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              These documents explain how we operate, what you can expect, and
              how we handle information. Last updated:{" "}
              <span className="text-zinc-800 font-medium">{lastUpdated}</span>.
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div
              ref={tabBarRef}
              className="relative inline-flex rounded-full border border-zinc-200 bg-white p-1 shadow-sm"
              role="tablist"
              aria-label="Legal tabs"
            >
              <div className="pointer-events-none absolute inset-0 rounded-full brand-gradient-soft opacity-55" />

              {LEGAL_TABS.map((tab) => {
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

            {/* Panels */}
            <div className="mt-8">
              <div
                className={cn(
                  "transition-[opacity,transform] duration-300",
                  tabAnimating
                    ? "opacity-0 translate-y-1"
                    : "opacity-100 translate-y-0",
                )}
              >
                {activeTab === "tos" && (
                  <article
                    id="panel-tos"
                    role="tabpanel"
                    aria-labelledby="tab-tos"
                    className="max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                  >
                    <h2 className="text-xl font-semibold">
                      Terms of Service (Summary Template)
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">
                      This is a starter template. For production use, you’ll
                      want to tailor it to your exact offerings.
                    </p>

                    <div className="mt-6 space-y-5 text-sm text-zinc-700 leading-relaxed">
                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          1) Acceptance of terms
                        </h3>
                        <p className="mt-1">
                          By accessing this website, you agree to these Terms of
                          Service and our Privacy Policy. If you do not agree,
                          do not use the site.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          2) Website purpose
                        </h3>
                        <p className="mt-1">
                          Precision Automation Labs provides educational content
                          and information about QA automation philosophy,
                          patterns, and internal R&amp;D learnings. Content is
                          provided “as-is” and may change without notice.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          3) Intellectual property
                        </h3>
                        <p className="mt-1">
                          Site content (text, visuals, branding) is owned by
                          Precision Automation Labs unless otherwise noted.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          4) Acceptable use
                        </h3>
                        <p className="mt-1">
                          You agree not to misuse the site, attempt to break
                          security, scrape in a way that harms availability, or
                          violate applicable laws.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          5) Third-party links
                        </h3>
                        <p className="mt-1">
                          We may link to third-party sites. We are not
                          responsible for their content or policies.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          6) Limitation of liability
                        </h3>
                        <p className="mt-1">
                          To the fullest extent permitted by law, Precision
                          Automation Labs will not be liable for any indirect,
                          incidental, or consequential damages arising from your
                          use of the site.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          7) Contact
                        </h3>
                        <p className="mt-1">
                          Questions:{" "}
                          <span className="text-zinc-900 font-medium">
                            info@precisionautomationlabs.com
                          </span>{" "}
                          <span className="text-zinc-500">(coming soon)</span>
                        </p>
                      </section>
                    </div>
                  </article>
                )}

                {activeTab === "privacy" && (
                  <article
                    id="panel-privacy"
                    role="tabpanel"
                    aria-labelledby="tab-privacy"
                    className="max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                  >
                    <h2 className="text-xl font-semibold">Privacy Policy</h2>
                    <p className="mt-2 text-sm text-zinc-600">
                      This outlines what information we collect (if any), how
                      it’s used, and your choices.
                    </p>

                    <div className="mt-6 space-y-5 text-sm text-zinc-700 leading-relaxed">
                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          1) What we collect
                        </h3>
                        <p className="mt-1">
                          We may collect basic analytics (e.g., page views,
                          approximate location, device type). If we add a
                          contact form or email signup in the future, we may
                          collect the information you submit.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          2) How we use information
                        </h3>
                        <p className="mt-1">
                          We use collected information to operate, maintain, and
                          improve the website and to respond to inquiries.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          3) Sharing
                        </h3>
                        <p className="mt-1">
                          We do not sell your personal information. We may share
                          limited data with service providers (hosting,
                          analytics) only as needed to run the site.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          4) Data retention
                        </h3>
                        <p className="mt-1">
                          We retain data only as long as needed for the purposes
                          described above or as required by law.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          5) Your choices
                        </h3>
                        <p className="mt-1">
                          You can limit tracking by adjusting browser settings
                          or blocking cookies.
                        </p>
                      </section>
                    </div>
                  </article>
                )}

                {activeTab === "cookies" && (
                  <article
                    id="panel-cookies"
                    role="tabpanel"
                    aria-labelledby="tab-cookies"
                    className="max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                  >
                    <h2 className="text-xl font-semibold">Cookie Policy</h2>
                    <p className="mt-2 text-sm text-zinc-600">
                      A simple policy that covers basic cookie usage.
                    </p>

                    <div className="mt-6 space-y-5 text-sm text-zinc-700 leading-relaxed">
                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          1) What cookies are
                        </h3>
                        <p className="mt-1">
                          Cookies are small files stored on your device that
                          help websites function and remember certain
                          information.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          2) How we use cookies
                        </h3>
                        <p className="mt-1">
                          We may use cookies for basic site functionality and
                          analytics (to understand traffic and improve
                          performance).
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          3) Managing cookies
                        </h3>
                        <p className="mt-1">
                          You can manage or block cookies through your browser
                          settings. Blocking cookies may affect certain site
                          features.
                        </p>
                      </section>
                    </div>
                  </article>
                )}

                {activeTab === "disclaimer" && (
                  <article
                    id="panel-disclaimer"
                    role="tabpanel"
                    aria-labelledby="tab-disclaimer"
                    className="max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                  >
                    <h2 className="text-xl font-semibold">Disclaimer</h2>
                    <p className="mt-2 text-sm text-zinc-600">
                      Keeps you protected as you share QA patterns and learnings.
                    </p>

                    <div className="mt-6 space-y-5 text-sm text-zinc-700 leading-relaxed">
                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          Educational content
                        </h3>
                        <p className="mt-1">
                          Content on this website is provided for general
                          informational and educational purposes only. It is not
                          professional, legal, or financial advice.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          No guarantees
                        </h3>
                        <p className="mt-1">
                          We do not guarantee outcomes from applying techniques
                          described on this site. Systems and requirements vary.
                        </p>
                      </section>

                      <section>
                        <h3 className="font-semibold text-zinc-900">
                          External resources
                        </h3>
                        <p className="mt-1">
                          References to third-party tools and services are for
                          convenience and do not constitute endorsements.
                        </p>
                      </section>
                    </div>
                  </article>
                )}
              </div>

              <div className="mt-6 text-xs text-zinc-500">
                Note: This page is intentionally separate from the home page and
                does not use section scrolling.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (same centered icons footer you already have) */}
      <footer className="relative border-t border-zinc-200">
        <div className="pointer-events-none absolute inset-0 brand-gradient-soft opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 py-10 text-sm text-zinc-600">
          <div className="flex flex-col items-center justify-center gap-5">
            <div>© {new Date().getFullYear()} Precision Automation Labs.</div>

            <div className="flex items-center justify-center gap-5">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.476-.9 1.637-1.852 3.37-1.852 3.6 0 4.266 2.369 4.266 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.814 20.452H3.86V9h2.954v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5z" />
                  <path d="M12 7.25A4.75 4.75 0 1 1 7.25 12 4.756 4.756 0 0 1 12 7.25zm0 1.5A3.25 3.25 0 1 0 15.25 12 3.254 3.254 0 0 0 12 8.75z" />
                  <path d="M17.25 6.5a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
                </svg>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.309c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                </svg>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.9 2H22l-6.77 7.73L23.3 22h-6.54l-5.12-6.67L5.8 22H2.7l7.24-8.27L1 2h6.7l4.64 6.06L18.9 2zm-1.15 18h1.71L6.88 3.9H5.05L17.75 20z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}