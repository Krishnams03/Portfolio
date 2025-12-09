"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

const PATHS = {
  vertical: "M9 3 L9 27",
  upper: "M9 15 L23 5",
  lower: "M9 15 L23 25",
} as const;

const ease: [number, number, number, number] = [0.42, 0, 0.2, 1];

const durations = {
  vertical: 0.9,
  slant: 0.65,
};

export function LogoMark() {
  const vertical = useAnimationControls();
  const upper = useAnimationControls();
  const lower = useAnimationControls();

  useEffect(() => {
    let mounted = true;

    const sequence = async () => {
      while (mounted) {
        await vertical.start({
          pathLength: 1,
          transition: { duration: durations.vertical, ease },
        });
        await Promise.all([
          upper.start({
            pathLength: 1,
            transition: { duration: durations.slant, ease },
          }),
          lower.start({
            pathLength: 1,
            transition: { duration: durations.slant, ease },
          }),
        ]);
        await Promise.all([
          upper.start({
            pathLength: 0,
            transition: { duration: durations.slant, ease },
          }),
          lower.start({
            pathLength: 0,
            transition: { duration: durations.slant, ease },
          }),
        ]);
        await vertical.start({
          pathLength: 0,
          transition: { duration: durations.vertical, ease },
        });
      }
    };

    sequence();

    return () => {
      mounted = false;
      vertical.stop();
      upper.stop();
      lower.stop();
    };
  }, [lower, upper, vertical]);

  return (
    <motion.div
      className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70"
      aria-label="Krishna personal mark"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-900/5 via-white/0 to-slate-900/10 dark:from-white/10 dark:via-slate-900/0 dark:to-white/5"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.svg
        width="28"
        height="30"
        viewBox="0 0 28 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative text-slate-900 dark:text-white"
        aria-hidden
      >
        <motion.path
          d={PATHS.vertical}
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={vertical}
        />
        <motion.path
          d={PATHS.upper}
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={upper}
        />
        <motion.path
          d={PATHS.lower}
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={lower}
        />
        {Object.values(PATHS).map((segment) => (
          <path
            key={`${segment}-ghost`}
            d={segment}
            stroke="rgba(148, 163, 184, 0.3)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </motion.svg>
    </motion.div>
  );
}
