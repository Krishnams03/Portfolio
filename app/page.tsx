"use client";

import Link from "next/link";
import { AnimatePresence, motion, type Variants, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import { Aurora } from "@/components/aurora";
import { RollingList } from "@/components/rolling-list";
import { SpotlightCard } from "@/components/spotlight-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoMark } from "@/components/logo-mark";
import {
  achievements,
  certifications,
  contact,
  experience,
  hero,
  highlights,
  interests,
  projects,
  research,
  stacks,
} from "@/data/profile";

const navLinks = [
  { label: "Stacks", href: "#stacks" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Interests", href: "#interests" },
  { label: "Contact", href: "#contact" },
];

const capabilityPills = [
  "Systems thinking",
  "Product strategy",
  "Creative prototyping",
  "Design leadership",
  "Inclusive craft",
  "Calm ops",
];

const signalStats = [
  { value: "48+", label: "Interfaces launched" },
  { value: "6", label: "Design systems led" },
  { value: "11", label: "Years building" },
];

const processNotes = [
  "Listen deeply before sketching",
  "Prototype in production to stay honest",
  "Design rituals that scale with the team",
  "Let data and craft co-author the solution",
];

const labIdeas = [
  {
    title: "Atmos Signals",
    status: "Realtime",
    description:
      "Pulse monitor that reconciles product health, user stories, and ops alerts into one atmospheric dashboard.",
  },
  {
    title: "Paper Trail",
    status: "Concept",
    description:
      "Narrative changelog where every release pairs metrics with the story, helping stakeholders feel the impact.",
  },
  {
    title: "Room Tone",
    status: "Prototype",
    description:
      "Soundboard for distributed teams to sync focus modes and break rituals with playful ambient cues.",
  },
];

const overviewCards = [
  {
    label: "Home base",
    value: hero.location,
    hint: "Remote-friendly collaborations",
  },
  {
    label: "Availability",
    value: hero.availability,
    hint: hero.secondaryAction.label,
  },
  {
    label: "Craft",
    value: hero.role,
    hint: "Product, security, systems",
  },
];

const heroSignals = [
  {
    label: "Current mode",
    value: "Systems + trust",
    progress: 86,
  },
  {
    label: "Design energy",
    value: "Measured bold",
    progress: 72,
  },
  {
    label: "Studio bandwidth",
    value: hero.availability,
    progress: 48,
  },
];

const heroMoodboard = [
  {
    label: "Palette",
    value: "Clay × midnight",
  },
  {
    label: "Mantra",
    value: "Rituals over rush",
  },
  {
    label: "Tempo",
    value: "Slow intent, fast ship",
  },
  {
    label: "Focus",
    value: "Trust-first AI surfaces",
  },
];

const floatingNotes = [
  {
    id: "lab",
    badge: "Lab drop",
    title: "Atmos Signals v2.1",
    body: "Telemetry ritual linking PM, Eng, and Ops.",
    position: "top-6 right-6",
    accent: "from-[#fff4d6]/90 via-[#ffe7ba]/70 to-[#ffd89f]/60",
    icon: "✨",
  },
  {
    id: "partners",
    badge: "Partnering with",
    title: "Fintech + health crews",
    body: "Design ops + AI honesty reviews.",
    position: "bottom-6 left-6",
    accent: "from-[#e0f3ff]/90 via-[#cde8ff]/70 to-[#b6dcff]/60",
    icon: "↺",
  },
];

const craftMantras = [
  "fast",
  "beautiful",
  "consistent",
  "carefully",
  "timeless",
  "soulful",
  "calm",
];

const editorialBursts = [
  {
    label: "Current study",
    detail: "Trust-first AI ops",
  },
  {
    label: "Working tempo",
    detail: "Slow intent, fast ship",
  },
  {
    label: "Teams",
    detail: "Fintech × health",
  },
];

const studioBroadcast = [
  "Next availability: Q2",
  "Currently remixing trust-led AI",
  "Shaping calm ops for hyper-growth",
  "Designing rituals for distributed teams",
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const viewportOptions = { once: true, amount: 0.2 };

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [navHighlight, setNavHighlight] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement | null>(null);
  const heroPanelRef = useRef<HTMLElement | null>(null);
  const heroTiltX = useMotionValue(0);
  const heroTiltY = useMotionValue(0);
  const heroTiltXSpring = useSpring(heroTiltX, { stiffness: 120, damping: 20, mass: 0.4 });
  const heroTiltYSpring = useSpring(heroTiltY, { stiffness: 120, damping: 20, mass: 0.4 });
  const [mantraIndex, setMantraIndex] = useState(0);

  const closeMobileNav = () => setMobileNavOpen(false);
  const handleNavHover = (target: HTMLAnchorElement) => {
    if (!navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = target.getBoundingClientRect();
    setNavHighlight({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  };

  const clearNavHighlight = () => {
    setNavHighlight((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleHeroPointer = (event: ReactPointerEvent<HTMLElement>) => {
    if (!heroPanelRef.current) return;
    const bounds = heroPanelRef.current.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroTiltY.set(offsetX * 10);
    heroTiltX.set(offsetY * -10);
  };

  const resetHeroPointer = () => {
    heroTiltX.set(0);
    heroTiltY.set(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setMantraIndex((prev) => (prev + 1) % craftMantras.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pb-16">
      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-8 sm:gap-16 sm:px-6 sm:py-10 lg:gap-20 lg:px-0">
        <motion.div
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="flex w-full flex-1 items-center justify-between gap-3 sm:w-auto sm:justify-start">
            <LogoMark />
            <span className="sr-only">Krishna portfolio logo</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <nav
              ref={navRef}
              onMouseLeave={clearNavHighlight}
              className="relative hidden items-center gap-6 rounded-full border border-white/70 bg-white/85 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-700 shadow-[0_25px_80px_-60px_rgba(15,23,42,0.65)] backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-slate-200 lg:flex"
            >
              <motion.span
                aria-hidden
                className="pointer-events-none absolute bottom-0 h-[2px] rounded-full bg-gradient-to-r from-slate-900 via-slate-600 to-transparent dark:from-white dark:via-white/40"
                animate={{
                  x: navHighlight.left,
                  width: navHighlight.width,
                  opacity: navHighlight.opacity,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
              <ul className="relative z-10 flex items-center gap-6">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="pb-1 transition hover:text-slate-900 dark:hover:text-white"
                      onMouseEnter={(event) => handleNavHover(event.currentTarget)}
                      onFocus={(event) => handleNavHover(event.currentTarget)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-900 dark:border-white/15 dark:bg-transparent dark:text-white lg:hidden"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
            >
              {mobileNavOpen ? "Close" : "Menu"}
              <span aria-hidden>☰</span>
            </button>
            <ThemeToggle />
          </div>
        </motion.div>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              id="mobile-nav"
              className="lg:hidden"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative mt-2 rounded-3xl border border-white/50 bg-white/95 p-4 shadow-xl backdrop-blur dark:border-white/15 dark:bg-slate-900/80">
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/40" aria-hidden />
                <ul className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-slate-900 dark:text-slate-100">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="flex items-center justify-between rounded-2xl border border-transparent px-3 py-2 transition hover:border-slate-300 hover:text-slate-500 dark:hover:border-white/20"
                        onClick={closeMobileNav}
                      >
                        {link.label}
                        <span aria-hidden>→</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.section
          ref={heroPanelRef}
          className="panel relative overflow-hidden p-6 sm:p-8 lg:p-10"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          onPointerMove={handleHeroPointer}
          onPointerLeave={resetHeroPointer}
          style={{ rotateX: heroTiltXSpring, rotateY: heroTiltYSpring }}
        >
          <Aurora />
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            aria-hidden
            style={{
              background:
                "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.75), transparent 55%), radial-gradient(circle at 85% 10%, rgba(186,210,255,0.35), transparent 60%)",
            }}
          />
          {floatingNotes.map((note, index) => (
            <motion.div
              key={note.id}
              className={`pointer-events-none absolute ${note.position} hidden max-w-[220px] lg:flex`}
              animate={{ y: [0, -8, 0], opacity: [0.85, 1, 0.85] }}
              transition={{
                duration: 6 + index,
                delay: index * 0.3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: [0.6, 0, 0.4, 1],
              }}
              aria-hidden
            >
              <div className="panel-muted flex flex-col gap-2 p-4">
                <span className="section-heading text-[11px]">{note.badge}</span>
                <p className="text-base font-semibold text-slate-900">
                  {note.icon} {note.title}
                </p>
                <p className="text-sm text-slate-600">{note.body}</p>
              </div>
            </motion.div>
          ))}
          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="space-y-5 sm:space-y-6">
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-500 dark:text-slate-300">
                    {hero.role}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.5em] text-slate-400 dark:text-slate-500">
                    Portfolio ©2025
                  </p>
                  <h1 className="text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[1.05] text-slate-900 dark:text-white">
                    {hero.name}
                    <span className="gradient-text block text-[clamp(2.2rem,4.4vw,3.8rem)]">
                      designs trust-first systems.
                    </span>
                  </h1>
                </div>
                <p className="max-w-3xl text-base leading-relaxed text-slate-900 dark:text-slate-200 sm:text-lg">
                  {hero.summary}
                </p>
                <div className="mantra-loop">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.55em] text-slate-500 dark:text-slate-300">
                    Studio mantra
                  </span>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-base uppercase tracking-[0.45em] text-slate-600 dark:text-slate-400">
                      Make it
                    </span>
                    <div className="relative h-9 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={craftMantras[mantraIndex]}
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "-100%" }}
                          transition={{ duration: 0.6, ease: [0.6, 0, 0.4, 1] }}
                          className="gradient-text block text-3xl font-semibold"
                        >
                          {craftMantras[mantraIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                  {editorialBursts.map((burst) => (
                    <div key={burst.label} className="glass-tile p-3 sm:p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-slate-500 dark:text-slate-400">
                        {burst.label}
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                        {burst.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Link
                  href={hero.primaryAction.href}
                  className="pill-link bg-slate-900 text-white border-transparent hover:bg-slate-800 dark:bg-white dark:text-slate-950"
                >
                  {hero.primaryAction.label}
                </Link>
                <Link
                  href={hero.secondaryAction.href}
                  className="pill-link text-slate-900 dark:border-white/25 dark:text-white"
                >
                  {hero.secondaryAction.label}
                </Link>
              </div>
              <RollingList items={capabilityPills} speed="slow" />
              <div className="grid gap-3 md:grid-cols-3 md:gap-4">
                {overviewCards.map((card) => (
                  <div key={card.label} className="glass-tile p-3 sm:p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-600 dark:text-slate-300">
                      {card.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      {card.value}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{card.hint}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 sm:space-y-5">
              <div className="glass-tile p-5 sm:p-6">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-600 dark:text-slate-300">
                  <span>Live signals</span>
                  <span>Studio board</span>
                </div>
                <div className="mt-4 space-y-4">
                  {heroSignals.map((signal) => (
                    <div key={signal.label} className="space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{signal.label}</p>
                        <span className="text-xs uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">
                          {signal.value}
                        </span>
                      </div>
                      <div className="relative h-2 overflow-hidden rounded-full bg-white/60 dark:bg-slate-800">
                        <motion.span
                          className="absolute inset-y-0 rounded-full bg-slate-900 dark:bg-white"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${signal.progress}%` }}
                          viewport={viewportOptions}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-tile p-5 sm:p-6">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-600 dark:text-slate-300">
                  <span>Designer moodboard</span>
                  <span>Signals</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
                  {heroMoodboard.map((item) => (
                    <div key={item.label} className="glass-tile p-3 sm:p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-600 dark:text-slate-300">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="gradient-divider" aria-hidden />

        <motion.div
          className="panel relative overflow-hidden p-4 sm:p-5"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/60 via-white/10 to-transparent blur-3xl dark:from-white/10"
            initial={{ x: "-30%" }}
            animate={{ x: ["-30%", "120%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-700 dark:text-slate-300 sm:text-[11px] sm:gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-slate-900 dark:bg-white" />
              <span>Studio broadcast</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex min-w-max items-center gap-4 whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-slate-900 animate-marquee-fast dark:text-white sm:gap-6 sm:text-xs">
                {[...studioBroadcast, ...studioBroadcast].map((item, index) => (
                  <span key={`${item}-${index}`} className="flex items-center gap-2">
                    {item}
                    <span aria-hidden>✦</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.section
          className="grid gap-4 sm:gap-5 lg:grid-cols-[1.1fr_0.9fr]"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <SpotlightCard className="p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-700 dark:text-slate-300">
                Practice pulse
              </p>
              <span className="text-xs uppercase tracking-[0.4em] text-slate-600 dark:text-slate-400">Based on highlights</span>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {signalStats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-3xl font-semibold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-700 dark:text-slate-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-600 dark:text-slate-400">
                    {item.title}
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{item.detail}</p>
                </div>
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-700 dark:text-slate-300">
              Working notes
            </p>
            <div className="mt-6 space-y-4">
              {processNotes.map((note) => (
                <div key={note} className="flex gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <span aria-hidden className="pt-1 text-slate-500">●</span>
                  <p>{note}</p>
                </div>
              ))}
            </div>
            <div className="panel-muted mt-8 p-3 text-xs uppercase tracking-[0.4em] text-slate-600 dark:text-slate-300 sm:p-4">
              Current focus - Calm products that balance precision with soul
            </div>
          </SpotlightCard>
        </motion.section>

        <div className="gradient-divider" aria-hidden />

        <motion.section
          id="stacks"
          className="space-y-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-heading dark:text-slate-300">Stacks I know</p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Every layer from pixels to packets
              </h2>
            </div>
            <p className="max-w-xl text-sm text-slate-700 dark:text-slate-300">
              Grouped toolsets with placeholder entries so you can highlight the disciplines that feel most natural.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {stacks.map((stack, index) => (
              <motion.div
                key={stack.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                viewport={viewportOptions}
              >
                <SpotlightCard className="flex h-full flex-col gap-4 p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {stack.title}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">
                      {stack.items.length} tools
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={`${stack.title}-${item}`}
                        className="glow-chip px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-700 dark:text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="gradient-divider" aria-hidden />

        <motion.section
          id="projects"
          className="space-y-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-heading dark:text-slate-300">Projects I have built</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Selected work shaping teams
              </h2>
            </div>
            <p className="max-w-xl text-sm text-slate-700 dark:text-slate-300">
              Swap titles, descriptions, stacks, and links with your own launches or deep dives.
            </p>
          </div>
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                viewport={viewportOptions}
              >
                <SpotlightCard className="flex h-full flex-col gap-4 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-600 dark:text-slate-400">
                    <span>{project.status}</span>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="glow-chip px-3 py-1 text-[10px] tracking-[0.3em] text-slate-600 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>
                  <div className="pt-2">
                    <a
                      href={project.link.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-600 dark:text-white dark:hover:text-slate-300"
                    >
                      {project.link.label}
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="gradient-divider" aria-hidden />

        <motion.section
          id="research"
          className="space-y-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-700 dark:text-slate-300">
                Research works
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Experiments that inform the craft
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Replace these entries with your own studies, whitepapers, or internal investigations.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {research.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                viewport={viewportOptions}
              >
                <SpotlightCard className="flex h-full flex-col gap-3 p-5 sm:p-6">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">
                    <span>{study.year}</span>
                    <span>Research</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    {study.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{study.focus}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{study.description}</p>
                  {study.link && (
                    <a
                      href={study.link}
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-600 dark:text-white dark:hover:text-slate-300"
                    >
                      View notes
                      <span aria-hidden>→</span>
                    </a>
                  )}
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="gradient-divider" aria-hidden />

        <motion.section
          id="experience"
          className="space-y-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-700 dark:text-slate-300">
              Experience
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Teams I have partnered with
            </h2>
          </div>
          <div className="space-y-5">
            {experience.map((item, index) => (
              <motion.div
                key={`${item.company}-${item.timeframe}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                viewport={viewportOptions}
              >
                <SpotlightCard className="p-5 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-700 dark:text-slate-300">
                        {item.role}
                      </p>
                      <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                        {item.company}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 dark:text-slate-200">
                      {item.timeframe}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{item.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span aria-hidden className="text-slate-500">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="gradient-divider" aria-hidden />

        <motion.section
          id="achievements"
          className="space-y-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-700 dark:text-slate-300">
                Certifications and achievements
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Receipts that back the craft
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Replace everything here with your own credentials, awards, or milestones.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            <SpotlightCard className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-700 dark:text-slate-300">
                Certifications
              </p>
              <ul className="mt-4 space-y-4 text-sm text-slate-700 dark:text-slate-200">
                {certifications.map((cert) => (
                  <li key={cert.title} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{cert.title}</p>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-600 dark:text-slate-300">
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">
                      {cert.year}
                    </span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
            <SpotlightCard className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-700 dark:text-slate-300">
                Achievements
              </p>
              <div className="mt-4 space-y-4">
                {achievements.map((item) => (
                  <div key={item.title} className="space-y-1 text-sm text-slate-700 dark:text-slate-200">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </p>
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">
                        {item.metric}
                      </span>
                    </div>
                    <p>{item.detail}</p>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </motion.section>

        <div className="gradient-divider" aria-hidden />

        <motion.section
          id="lab"
          className="space-y-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-700 dark:text-slate-300">
                Lab
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Experiments in progress
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Use this space to share prototypes, open-source drops, or curiosities.
            </p>
          </div>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {labIdeas.map((concept) => (
              <SpotlightCard key={concept.title} className="p-4 sm:p-5">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-600 dark:text-slate-400">
                  <span>{concept.status}</span>
                  <span>Lab</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                  {concept.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {concept.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </motion.section>

        <div className="gradient-divider" aria-hidden />

        <motion.section
          id="interests"
          className="space-y-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-700 dark:text-slate-300">
                Other interests
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Work-life overlap energy
              </h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Use this area to mention hobbies, collectives, or communities that inspire your craft.
            </p>
          </div>
          <SpotlightCard className="p-5 sm:p-6">
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="glow-chip px-4 py-2 text-sm font-medium text-slate-900 dark:text-slate-100"
                >
                  {interest}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </motion.section>

        <div className="gradient-divider" aria-hidden />

        <motion.section
          id="contact"
          className="space-y-6"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <SpotlightCard className="relative overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-700 dark:text-slate-300">
                  Collaborations
                </p>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
                  Let&apos;s build something considerate
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">{contact.note}</p>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="pill-link justify-center text-slate-900 dark:border-white/20 dark:text-white"
                >
                  {contact.email}
                </a>
                <div className="flex flex-wrap gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                  {contact.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="glow-chip inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 dark:text-white"
                    >
                      {social.label}
                      <span aria-hidden>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <RollingList items={capabilityPills} speed="fast" />
            </div>
          </SpotlightCard>
        </motion.section>

        <footer className="text-xs text-slate-700 dark:text-slate-400">
          Placeholder portfolio - Replace copy, assets, and links to make it yours.
        </footer>
      </main>
    </div>
  );
}
