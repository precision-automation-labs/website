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
                Automation Services for B2B Teams
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link className="text-sm text-zinc-600 hover:text-zinc-900" href="#services">
              Services
            </Link>
            <Link className="text-sm text-zinc-600 hover:text-zinc-900" href="#process">
              Process
            </Link>
            <Link className="text-sm text-zinc-600 hover:text-zinc-900" href="#contact">
              Contact
            </Link>
            <Link
              href="#contact"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Request a quote
            </Link>
          </nav>

          <Link
            href="#contact"
            className="md:hidden rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Quote
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
                Automation Services • QA • Workflows
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
                Automation that removes manual work
                <span className="block text-zinc-700">
                  and makes quality measurable.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
                Precision Automation Labs builds and maintains automation systems:
                QA automation suites, API checks, CI quality gates, and workflow automation
                so your team moves faster with fewer surprises.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Request a quote
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold hover:bg-zinc-50"
                >
                  View services
                </Link>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {[
                  {
                    k: "QA automation",
                    v: "Reliable suites that catch real defects without flaky noise.",
                  },
                  {
                    k: "API testing",
                    v: "Protect critical flows and catch breaking changes early.",
                  },
                  {
                    k: "Workflow automation",
                    v: "Automate reporting, routing, and repetitive ops tasks.",
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
                Built for teams that want dependable automation with clear outcomes.
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
                  "Local B2B contracts",
                  "Automation delivered + maintainable",
                  "Clear signals in CI",
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

      <section id="services" className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-blue-700">
              SERVICES
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Automation services with clear deliverables
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              We don’t sell advice. We deliver working automation—implemented, documented,
              and maintainable.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              {
                t: "QA Automation",
                d: "Automated suites that reduce manual regression and increase release confidence.",
                b: ["Playwright / Selenium", "Flake reduction", "Regression strategy"],
              },
              {
                t: "API & Integration Testing",
                d: "Automated checks that protect core workflows and catch breaking changes early.",
                b: ["Auth + edge cases", "Schema validation", "Critical flow coverage"],
              },
              {
                t: "CI Quality Gates",
                d: "Automation that runs in pull requests, nightly builds, and release pipelines.",
                b: ["Smoke gates", "Parallel runs", "Artifacts + reports"],
              },
              {
                t: "Workflow Automation",
                d: "Automate reporting, routing, syncing, and repetitive operational tasks.",
                b: ["Dashboards + alerts", "Data sync", "Ops automation"],
              },
            ].map((s) => (
              <div key={s.t} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
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

      <section id="process" className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-blue-700">
              PROCESS
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              How we deliver
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              Clear scope. Practical implementation. Automation that runs and stays maintainable.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              { t: "Scope", d: "Identify highest-ROI automation targets and define acceptance criteria." },
              { t: "Build", d: "Implement automation with maintainability standards and reporting." },
              { t: "Integrate", d: "Wire into CI so automation runs automatically and produces reliable signals." },
              { t: "Handoff", d: "Document usage and ownership. Optional ongoing support later." },
            ].map((s, idx) => (
              <div key={s.t} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
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

      <section id="contact" className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-blue-700">
              CONTACT
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Request a quote
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600">
              Tell us what you want automated. We’ll reply with a short plan, timeline, and price range.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold">What to include</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {[
                  "Your stack (web/app/API) and environments",
                  "What’s manual today (regression, checks, reporting, workflows)",
                  "Where failures happen (prod, staging, CI)",
                  "Timeline and priority workflows",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-sm text-zinc-700">
                <div className="text-xs text-zinc-500">Email</div>
                <div className="mt-1">info@precisionautomationlabs.com (coming soon)</div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold">Contact form (placeholder)</h3>
              <p className="mt-2 text-sm text-zinc-600">
                We’ll wire this to email/CRM when you’re ready. For now it’s UI-only.
              </p>

              <form className="mt-5 space-y-4">
                <div>
                  <label className="text-xs text-zinc-600">Name</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-blue-400"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-600">Email</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-blue-400"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-600">What do you want automated?</label>
                  <textarea
                    className="mt-1 h-28 w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-blue-400"
                    placeholder="We need QA automation for critical flows and CI gates for releases..."
                  />
                </div>
                <button
                  type="button"
                  className="w-full rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  Send (disabled)
                </button>
              </form>
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