import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative h-10 w-10 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
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

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              className="text-sm text-zinc-600 hover:text-zinc-900"
              href="#focus"
            >
              Focus
            </Link>
            <Link
              className="text-sm text-zinc-600 hover:text-zinc-900"
              href="#principles"
            >
              Principles
            </Link>
            <Link
              className="text-sm text-zinc-600 hover:text-zinc-900"
              href="#process"
            >
              Process
            </Link>
            <Link
              className="text-sm text-zinc-600 hover:text-zinc-900"
              href="#connect"
            >
              Updates
            </Link>
          </nav>

          <Link
            href="#connect"
            className="md:hidden rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
          >
            Updates
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute top-48 left-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute top-56 right-1/4 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr] md:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Reliability • CI Signals • Maintainability
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
                Automation that produces
                <span className="block text-zinc-700">stable, actionable signals.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
                Precision Automation Labs is building a brand around what we believe makes QA
                automation effective: fewer flaky tests, faster feedback loops, and clear
                ownership. We’re currently focused on R&amp;D, publishing learnings, and building
                internal tooling.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#principles"
                  className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Our approach
                </Link>
                <Link
                  href="#connect"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold hover:bg-zinc-50"
                >
                  Follow updates
                </Link>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {[
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
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
                  >
                    <div className="text-sm font-semibold">{x.k}</div>
                    <div className="mt-1 text-sm text-zinc-600">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold tracking-widest text-zinc-900">
                PRECISION AUTOMATION LABS
              </div>
              <div className="mt-3 text-sm text-zinc-600">
                A clean, enterprise-friendly approach to automation quality.
              </div>

              <div className="relative mt-6 aspect-square w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <Image
                  src="/logo.png"
                  alt="Precision Automation Labs"
                  fill
                  className="object-contain p-6"
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
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="focus" className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-blue-700">
              FOCUS
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              What we care about in QA automation
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              We’re building a knowledge base around automation that is reliable, measurable,
              and maintainable.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              {
                t: "Test reliability",
                d: "Eliminate flaky noise so failures are meaningful and actionable.",
                b: ["Stable locators", "Deterministic data", "Consistent environments"],
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
              },
            ].map((s) => (
              <div
                key={s.t}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-zinc-600">{s.d}</p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                  {s.b.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="principles" className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-blue-700">
              PRINCIPLES
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Our philosophy
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              We focus on outcomes: faster releases, fewer regressions, and signals teams can
              act on immediately.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              {
                t: "Signals over vanity metrics",
                d: "A large test count means nothing if the failures aren’t trustworthy.",
              },
              {
                t: "Design for change",
                d: "Apps evolve—automation should be resilient and easy to update.",
              },
              {
                t: "Keep the feedback loop short",
                d: "The best automation helps you make decisions quickly and confidently.",
              },
              {
                t: "Make ownership obvious",
                d: "If nobody owns it, it will decay. Clear ownership keeps it healthy.",
              },
            ].map((s) => (
              <div
                key={s.t}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-zinc-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-blue-700">
              PROCESS
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              How we think about building automation
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              A practical loop: clarify the signal, implement reliably, integrate into CI, and
              keep it maintainable.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              {
                t: "Define the signal",
                d: "What should this automation tell us? What decision does it enable?",
              },
              {
                t: "Build deterministically",
                d: "Use stable locators, controlled data, and clear assertions.",
              },
              {
                t: "Integrate into CI",
                d: "Run automation where it matters: PRs, nightly checks, and releases.",
              },
              {
                t: "Maintain over time",
                d: "Documentation, ownership, and simple structure prevent decay.",
              },
            ].map((s, idx) => (
              <div
                key={s.t}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="text-xs font-semibold tracking-widest text-blue-700">
                  STEP {idx + 1}
                </div>
                <h3 className="mt-2 text-base font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-zinc-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="connect" className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-blue-700">
              UPDATES
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Building in public (within reason)
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              We’re currently focused on brand development, internal R&amp;D, and publishing
              generalized learnings around QA automation. We’ll share updates here as we
              publish articles, templates, and example patterns.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold">What we’ll publish</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {[
                  "Automation playbooks (reliability, CI gates, reporting)",
                  "Sample repo templates (sanitized + generic)",
                  "Checklists for reducing flakiness",
                  "Patterns for maintainable test suites",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
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
                Note: This site describes our philosophy and R&amp;D efforts. It does not
                include client-specific details.
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