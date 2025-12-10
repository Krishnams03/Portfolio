"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EXIT_DELAY_MS = 280;
const ANIMATION_DURATION_MS = 1400;

export function InitialLoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const eased = Math.pow(Math.min(1, elapsed / ANIMATION_DURATION_MS), 0.85);
      const nextValue = Math.min(100, Math.round(eased * 100));
      setProgress(nextValue);

      if (nextValue < 100) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        window.setTimeout(() => setVisible(false), EXIT_DELAY_MS);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="initial-loader"
          aria-live="polite"
          aria-label={`Loading site content ${progress}% complete`}
          className="fixed inset-0 z-[998] flex items-center justify-center bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.92),_rgba(226,235,255,0.95))] text-slate-900 dark:bg-[radial-gradient(circle_at_top,_rgba(5,6,17,0.96),_rgba(4,4,12,0.92))] dark:text-slate-100"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-6 text-center"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-xs font-semibold tracking-[0.4em] uppercase text-slate-500 dark:text-slate-300">
              Initializing
            </div>
            <div className="text-6xl font-semibold tabular-nums">
              {progress.toString().padStart(2, "0")}
              <span className="text-3xl align-super">%</span>
            </div>
            <div className="h-1 w-64 overflow-hidden rounded-full bg-slate-200/70 dark:bg-white/10">
              <motion.div
                className="h-full rounded-full bg-slate-900 dark:bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
