"use client";

import Header from "../components/layout/Header";
import Hero from "../components/sections/Hero";
import Playbook from "../components/sections/Playbook";
import Toolbox from "../components/sections/Toolbox";
import Updates from "../components/sections/Updates";
import Contact from "../components/sections/Contact";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-x-hidden pt-0 selection:bg-brand-indigo/30 selection:text-white">
      <Header />
      <Hero />
      <Playbook />
      <Toolbox />
      <Updates />
      <Contact />
    </main>
  );
}