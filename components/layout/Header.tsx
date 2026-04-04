"use client";

import Link from "next/link";
import Image from "next/image";
import { siteContent } from "../../lib/site-content";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

export default function Header() {
  const { brand, nav } = siteContent;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 pointer-events-none",
        scrolled ? "py-4 md:py-6" : "py-6 md:py-8",
      )}
    >
      <div className="mx-auto max-w-6xl px-6 pointer-events-auto">
        <div
          className={clsx(
            "flex items-center justify-between px-5 md:px-6 py-4 rounded-2xl border transition-all duration-300 shadow-2xl relative overflow-hidden",
            scrolled
              ? "border-white/10 bg-background/60 backdrop-blur-xl"
              : "border-transparent bg-transparent backdrop-blur-0 shadow-none",
          )}
        >
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute inset-x-0 bottom-0 h-px brand-gradient" />
          </div>

          <div className="relative z-10 flex items-center gap-3 min-w-0">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden flex items-center justify-center">
              <Image
                src={brand.logoSrc}
                alt={`${brand.name} logo`}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="leading-none select-none min-w-0">
              <div className="text-sm md:text-[15px] font-semibold tracking-wide text-zinc-100 truncate">
                {brand.name}
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-brand-blue/70 truncate mt-1">
                {brand.tagline}
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 relative z-10">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}

            <Link
              href="/legal"
              className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-white"
            >
              Legal
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
