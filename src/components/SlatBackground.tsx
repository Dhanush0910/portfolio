import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface SlatBackgroundProps {
  isLoaded: boolean;
  isDarkMode: boolean;
}

const waveOffsets   = [38, 50, 63, 76, 84, 79, 66, 53, 43, 35];
const glowIntensity = [0.50, 0.65, 0.82, 0.94, 1.0, 0.91, 0.76, 0.62, 0.50, 0.43];
const glowDelay     = [0.05, 0.18, 0.32, 0.48, 0.62, 0.75, 0.88, 1.00, 1.12, 1.22];

const getGlowDark = (i: number, alpha: number) => {
  if (i <= 1) return `rgba(4, 60, 42, ${alpha * 0.55})`;
  if (i <= 3) return `rgba(6, 78, 59, ${alpha * 0.75})`;
  if (i <= 5) return `rgba(6, 78, 59, ${alpha * 0.85})`;
  if (i <= 7) return `rgba(5, 70, 52, ${alpha * 0.68})`;
  return              `rgba(4, 60, 42, ${alpha * 0.48})`;
};

const getGlowLight = (i: number, alpha: number) => {
  // Pure Emerald Ink (#064E3B) on cream background
  if (i <= 1) return `rgba(6, 78, 59, ${alpha * 0.45})`;
  if (i <= 3) return `rgba(6, 78, 59, ${alpha * 0.65})`;
  if (i <= 5) return `rgba(6, 78, 59, ${alpha * 0.75})`;
  if (i <= 7) return `rgba(6, 78, 59, ${alpha * 0.55})`;
  return              `rgba(4, 60, 42, ${alpha * 0.40})`;
};

export default function SlatBackground({ isLoaded, isDarkMode }: SlatBackgroundProps) {
  const [reveal, setReveal] = useState(false);
  const dm = isDarkMode;

  useEffect(() => {
    if (isLoaded) {
      const t = setTimeout(() => setReveal(true), 80);
      return () => clearTimeout(t);
    }
  }, [isLoaded]);

  return (
    <div
      className="fixed inset-0 overflow-hidden z-0 pointer-events-none"
      style={{ transition: "background 0.55s cubic-bezier(0.4,0,0.2,1)", contain: "paint" }}
    >
      {/* ── Base fill — transitions with theme ── */}
      <div
        className="absolute inset-0"
        style={{
          background: dm ? "#020D0A" : "#F8E7C9",
          transition: "background 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* ── 10 vertical column slats ── */}
      <div className="absolute inset-0 grid grid-cols-5 md:grid-cols-10 h-full w-full">
        {Array.from({ length: 10 }).map((_, i) => {
          const topPct = waveOffsets[i]   ?? 55;
          const alpha  = glowIntensity[i] ?? 0.6;
          const delay  = glowDelay[i]     ?? 0.1;
          const glowFn = dm ? getGlowDark : getGlowLight;

          return (
            <div
              key={i}
              className={`h-full w-full relative ${i >= 5 ? "hidden md:block" : ""}`}
              style={{
                borderRight: `1px solid ${dm ? "rgba(255,255,255,0.018)" : "rgba(6,78,59,0.10)"}`,
                transition: "border-color 0.55s",
              }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={reveal ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(0% 0% 100% 0%)" }}
                transition={{ duration: 1.05, delay, ease: [0.76, 0, 0.24, 1] }}
              >
                {/* Primary glow blob — flows up and down with GPU CSS keyframes */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-[220px] h-[360px] gpu-layer"
                  style={{
                    top: `${topPct - 12}%`,
                    animation: reveal ? `slatFloatPrimary ${8 + (i % 3) * 2}s ease-in-out infinite` : "none",
                    animationDelay: `${delay * 1.2}s`,
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: `radial-gradient(ellipse 65% 85% at 50% 38%, ${glowFn(i, alpha)} 0%, ${glowFn(i, alpha * 0.3)} 45%, transparent 75%)`,
                    }}
                  />
                </div>

                {/* Secondary counter-phase glow (Desktop only) */}
                {i >= 2 && i <= 7 && (
                  <div
                    className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[160px] h-[200px] gpu-layer"
                    style={{
                      top: `${topPct - 24}%`,
                      animation: reveal ? `slatFloatSecondary ${10 + (i % 2) * 2.5}s ease-in-out infinite` : "none",
                      animationDelay: `${delay + 1.0}s`,
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        background: dm
                          ? `radial-gradient(ellipse 55% 75% at 50% 50%, rgba(6,78,59,0.28) 0%, rgba(6,78,59,0.08) 50%, transparent 80%)`
                          : `radial-gradient(ellipse 55% 75% at 50% 50%, rgba(6,78,59,0.32) 0%, rgba(6,78,59,0.10) 50%, transparent 80%)`,
                      }}
                    />
                  </div>
                )}

                {/* Column edge highlight */}
                <div
                  className="absolute top-0 right-0 h-full w-px"
                  style={{
                    background: dm
                      ? "linear-gradient(to bottom, transparent 0%, rgba(6,78,59,0.10) 32%, rgba(6,78,59,0.18) 62%, transparent 100%)"
                      : "linear-gradient(to bottom, transparent 0%, rgba(6,78,59,0.10) 32%, rgba(6,78,59,0.18) 62%, transparent 100%)",
                  }}
                />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── Central ambient emerald glow ── */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[68vw] h-[82vh]"
        initial={{ opacity: 0 }}
        animate={reveal ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.6, delay: 1.0 }}
        style={{
          background: dm
            ? "radial-gradient(ellipse 80% 65% at 50% 54%, rgba(6,78,59,0.22) 0%, rgba(4,50,35,0.06) 45%, transparent 75%)"
            : "radial-gradient(ellipse 80% 65% at 50% 54%, rgba(6,78,59,0.20) 0%, rgba(4,50,35,0.05) 45%, transparent 75%)",
        }}
      />

      {/* ── Scanlines ── */}
      <div
        className="absolute inset-0"
        style={{
          opacity: dm ? 0.010 : 0.012,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, transparent 1px, transparent 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0"
        style={{
          opacity: dm ? 0.018 : 0.028,
          backgroundImage: "radial-gradient(rgba(6,78,59,0.40) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
