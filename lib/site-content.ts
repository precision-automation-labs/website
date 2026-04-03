export type NavItem = {
  id: string;
  label: string;
};

export type HeroCard = {
  title: string;
  description: string;
};

export type PlaybookCard = {
  title: string;
  description: string;
  bullets?: string[];
  accent?: boolean;
  step?: string;
};

export type ToolboxCard = {
  title: string;
  description: string;
  tools: string[];
  accent?: boolean;
};

export type UpdateItem = {
  title: string;
  description: string;
};

export const siteContent = {
  brand: {
    name: "Precision Automation Labs",
    tagline: "QA Automation Philosophy & Engineering",
    logoSrc: "/logo.png",
    heroLogoSrc: "/logo2.png",
  },

  nav: [
    { id: "playbook", label: "Playbook" },
    { id: "toolbox", label: "Toolbox" },
    { id: "updates", label: "Updates" },
    { id: "contact", label: "Contact" },
  ] satisfies NavItem[],

  hero: {
    eyebrow: "Reliability • CI Signals • Maintainability",
    titleTop: "Automation that produces",
    titleBottom: "stable, actionable signals.",
    description:
      "Precision Automation Labs is building a brand around what we believe makes QA automation effective: fewer flaky tests, faster feedback loops, and clear ownership. We’re currently focused on R&D, publishing learnings, and building internal tooling.",
    primaryCta: {
      label: "Explore the playbook",
      href: "#playbook",
    },
    secondaryCta: {
      label: "Follow updates",
      href: "#updates",
    },
    cards: [
      {
        title: "Reliability first",
        description: "Signals you can trust—less noise, fewer flaky failures.",
      },
      {
        title: "CI-integrated",
        description: "Fast feedback loops that keep quality close to code.",
      },
      {
        title: "Maintainable by design",
        description: "Clean structure, ownership, and documentation over time.",
      },
    ] satisfies HeroCard[],
    sideCard: {
      label: "PRECISION AUTOMATION LABS",
      description:
        "A clean, enterprise-friendly approach to automation quality.",
      bullets: [
        "Automation patterns and playbooks",
        "Quality gates and reporting philosophy",
        "Real-world learnings (sanitized + generalized)",
      ],
    },
  },

  playbook: {
    eyebrow: "PLAYBOOK",
    title: "A minimal, high-signal view of how we build QA automation",
    description:
      "Use the tabs to switch between what we prioritize, what we believe, and how we execute.",
    tabs: [
      { id: "focus", label: "Focus" },
      { id: "principles", label: "Principles" },
      { id: "process", label: "Process" },
    ],
    focus: [
      {
        title: "Test reliability",
        description:
          "Eliminate flaky noise so failures are meaningful and actionable.",
        bullets: [
          "Stable locators",
          "Deterministic data",
          "Consistent environments",
        ],
        accent: true,
      },
      {
        title: "API confidence",
        description:
          "Protect critical workflows with contract-style thinking and edge case coverage.",
        bullets: ["Schema validation", "Auth patterns", "Critical path checks"],
      },
      {
        title: "CI-first feedback loops",
        description: "Automation should shorten time-to-signal, not extend it.",
        bullets: ["Smoke gates", "Parallelization", "Artifacts & reports"],
      },
      {
        title: "Maintainability",
        description: "Automation is software—structure it like software.",
        bullets: ["Clear ownership", "Documentation", "Simple abstractions"],
        accent: true,
      },
    ] satisfies PlaybookCard[],
    principles: [
      {
        title: "Signals over vanity metrics",
        description:
          "A large test count means nothing if the failures aren’t trustworthy.",
        accent: true,
      },
      {
        title: "Design for change",
        description:
          "Apps evolve—automation should be resilient and easy to update.",
      },
      {
        title: "Keep the feedback loop short",
        description:
          "The best automation helps you decide quickly and confidently.",
      },
      {
        title: "Make ownership obvious",
        description: "Clear ownership keeps suites healthy over time.",
        accent: true,
      },
    ] satisfies PlaybookCard[],
    process: [
      {
        step: "STEP 1",
        title: "Define the signal",
        description: "What decision does this enable?",
        accent: true,
      },
      {
        step: "STEP 2",
        title: "Build deterministically",
        description: "Stable locators, data, and assertions.",
      },
      {
        step: "STEP 3",
        title: "Integrate into CI",
        description: "PR gates, nightly checks, releases.",
      },
      {
        step: "STEP 4",
        title: "Maintain over time",
        description: "Ownership + docs prevent decay.",
        accent: true,
      },
    ] satisfies PlaybookCard[],
  },

  toolbox: {
    eyebrow: "TOOLBOX",
    title: "Tools chosen for reliability and clarity",
    description:
      "We select tools based on determinism, maintainability, and the quality of signal they produce — not trends.",
    items: [
      {
        title: "UI Automation",
        description: "End-to-end flows designed to be stable under change.",
        tools: ["Robot Framework", "Playwright", "Selenium", "Appium"],
        accent: true,
      },
      {
        title: "API & Contract Testing",
        description: "Confidence in critical services and integrations.",
        tools: ["Postman", "Newman", "Schema validation", "Auth patterns"],
      },
      {
        title: "CI & Pipelines",
        description:
          "Automation where it matters: PRs, nightly checks, releases.",
        tools: [
          "Azure DevOps",
          "GitHub Actions",
          "Parallel execution",
          "Artifacts",
        ],
      },
      {
        title: "Reporting & Signals",
        description: "Readable outputs that help teams act quickly.",
        tools: [
          "HTML reports",
          "Failure categorization",
          "Trend tracking",
          "Flake reduction",
        ],
        accent: true,
      },
    ] satisfies ToolboxCard[],
    footerNote: "Tools change. Principles don’t.",
  },

  updates: {
    eyebrow: "UPDATES",
    title: "Building in public (within reason)",
    description:
      "We’re currently focused on brand development, internal R&D, and publishing generalized learnings around QA automation. We’ll share updates here as we publish articles, templates, and example patterns.",
    items: [
      {
        title: "What we’ll publish",
        description:
          "Automation playbooks, reliability patterns, CI thinking, and maintainability guidance.",
      },
      {
        title: "What we’re building",
        description:
          "Internal tooling, reusable QA patterns, and cleaner signal-driven workflows.",
      },
    ] satisfies UpdateItem[],
  },

  contact: {
    eyebrow: "CONTACT",
    title: "Let’s build something sharper.",
    description:
      "Precision Automation Labs is focused on better automation signals, stronger CI feedback loops, and maintainable quality systems. If the direction resonates, reach out.",
    primaryCta: {
      label: "Start the conversation",
      href: "mailto:info@precisionautomationlabs.com",
    },
    secondaryCta: {
      label: "Review legal",
      href: "/legal",
    },
  },
} as const;
