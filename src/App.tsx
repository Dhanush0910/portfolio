import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ChevronDown, ArrowRight, Cpu, ShieldCheck, Terminal as TerminalIcon } from "lucide-react";

// Components
import Header from "./components/Header";
import SlatBackground from "./components/SlatBackground";
import HUDNodes from "./components/HUDNodes";
import OrbitalCore from "./components/OrbitalCore";
import Ferrofluid from "./components/Ferrofluid";
import Timeline from "./components/Timeline";
import ProjectShowcase from "./components/ProjectShowcase";
import Terminal from "./components/Terminal";
import ContactCard from "./components/ContactCard";

// ── Emerald palette constants ──
const E = {
  ink:    "#064E3B",
  mid:    "#043C2A",
  bright: "#064E3B",
  glow:   "#055A44",
};

export default function App() {
  const [activeSection, setActiveSection]     = useState("hero");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded]               = useState(false);
  const [isDarkMode, setIsDarkMode]           = useState(true);

  const heroRef = useRef<HTMLElement>(null);

  /* ─── Preloader ─── */
  useEffect(() => {
    const startTime = Date.now();
    const duration  = 1800;
    const interval = setInterval(() => {
      const elapsed  = Date.now() - startTime;
      const eased    = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 3);
      const progress = Math.min(Math.floor(eased * 100), 100);
      setLoadingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsLoaded(true), 380);
      }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  /* ─── Active section tracking ─── */
  useEffect(() => {
    const onScroll = () => {
      const sections = ["hero", "timeline", "projects", "terminal", "contact"];
      const sp = window.scrollY + window.innerHeight / 3;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const { offsetTop: top, offsetHeight: h } = el;
          if (sp >= top && sp < top + h) { setActiveSection(s); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ─── Scroll transforms ─── */
  const { scrollY } = useScroll();
  const heroY        = useTransform(scrollY, [0, 600], [0, -70]);
  const heroOpacity  = useTransform(scrollY, [0, 380], [1, 0]);
  const ferroOpacity = useTransform(
    scrollY,
    [0, typeof window !== "undefined" ? window.innerHeight * 0.75 : 700],
    [isDarkMode ? 0.45 : 0.70, 0]
  );

  /* ─── Hero headline ─── */
  const line1 = "Meet! Dhanush";
  const line2 = "Fullstack Engineer.";

  const getStatus = (p: number) => {
    if (p < 25) return "INITIALIZING SECURE NODES...";
    if (p < 50) return "MOUNTING CORE MATRICES...";
    if (p < 75) return "SYNCHRONIZING SCHEMAS...";
    if (p < 95) return "DEPLOYING INTERFACE...";
    return "SYSTEM READY.";
  };

  /* ─── Theme helpers ─── */
  const dm = isDarkMode;
  const bg       = dm ? "#020D0A" : "#F8E7C9";
  const textMain = dm ? "text-white" : "text-[#0D1F17]";
  const textMid  = dm ? "text-white/50" : "text-[#0D1F17]/55";
  const textDim  = dm ? "text-white/38" : "text-[#0D1F17]/45";

  return (
    <div
      className="min-h-screen relative font-sans overflow-x-hidden"
      style={{
        background: bg,
        color: dm ? "#fff" : "#0D1F17",
        transition: "background 0.55s cubic-bezier(0.4,0,0.2,1), color 0.55s",
      }}
    >

      {/* ══════════════════════════════════════════════════════ */}
      {/*  PRELOADER                                            */}
      {/* ══════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: dm ? "#010806" : "#F8E7C9" }}
            exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          >
            <div
              className="absolute pointer-events-none"
              style={{
                width: 380, height: 380,
                background: `radial-gradient(circle, rgba(6,78,59,0.18) 0%, transparent 70%)`,
                filter: "blur(55px)",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            />
            <div className="relative space-y-5 text-center max-w-xs px-6">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[9px] font-mono tracking-[0.32em] uppercase font-semibold"
                style={{ color: "rgba(52,211,153,0.75)" }}
              >
                DHANUSH · PORTFOLIO BOOT
              </motion.div>

              <div
                className="text-8xl font-display font-bold tracking-tighter select-none"
                style={{ color: dm ? "rgba(255,255,255,0.90)" : "#0D1F17" }}
              >
                {loadingProgress.toString().padStart(2, "0")}
                <span className="text-5xl" style={{ color: "rgba(16,185,129,0.65)" }}>%</span>
              </div>

              <div className="w-44 h-[1px] mx-auto relative overflow-hidden rounded-full"
                style={{ background: dm ? "rgba(255,255,255,0.04)" : "rgba(6,78,59,0.12)" }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: `${loadingProgress}%`,
                    background: `linear-gradient(to right, ${E.ink}, ${E.bright})`,
                    boxShadow: `0 0 10px rgba(16,185,129,0.5)`,
                  }}
                />
              </div>

              <p className="text-[9px] font-mono tracking-[0.2em] uppercase h-4"
                style={{ color: dm ? "rgba(255,255,255,0.20)" : "rgba(6,78,59,0.45)" }}
              >
                {getStatus(loadingProgress)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  FERROFLUID — hero only, fades on scroll             */}
      {/* ══════════════════════════════════════════════════════ */}
      {isLoaded && (
        <motion.div
          className="fixed inset-0 z-[1] pointer-events-auto"
          style={{
            opacity: ferroOpacity,
            mixBlendMode: dm ? "screen" : "darken",
          }}
        >
          <Ferrofluid
            colors={["#064E3B", "#043C2A", "#064E3B", "#022C21"]}
            speed={0.35}
            scale={1.3}
            turbulence={1.0}
            fluidity={0.15}
            rimWidth={0.25}
            sharpness={2.5}
            shimmer={0.6}
            glow={dm ? 2.0 : 1.8}
            flowDirection="down"
            opacity={1.0}
            mouseInteraction={true}
            mouseStrength={1.2}
            mouseRadius={0.4}
          />
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════ */}
      {/*  SLAT BACKGROUND                                      */}
      {/* ══════════════════════════════════════════════════════ */}
      <SlatBackground isLoaded={isLoaded} isDarkMode={dm} />

      {/* ══════════════════════════════════════════════════════ */}
      {/*  FLOATING HUD NODES                                   */}
      {/* ══════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <HUDNodes isLoaded={isLoaded} isDarkMode={dm} />
      </div>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  HEADER                                               */}
      {/* ══════════════════════════════════════════════════════ */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isDarkMode={dm}
        onToggleTheme={() => setIsDarkMode((v) => !v)}
      />

      {/* ══════════════════════════════════════════════════════ */}
      {/*  HERO SECTION                                         */}
      {/* ══════════════════════════════════════════════════════ */}
      <motion.section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="max-w-3xl mx-auto text-center space-y-7 relative z-20 flex flex-col items-center pt-20">

          {/* ── Badge pills ── */}
          <motion.div
            className="flex items-center gap-2 flex-wrap justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 1.35, ease: "easeOut" }}
          >
            <span
              className="text-[11px] font-semibold px-3 py-1 rounded-full text-white"
              style={{
                background: `#064E3B`,
                boxShadow: `0 0 12px rgba(6,78,59,0.35)`,
              }}
            >
              20+ Years of Industry Craft
            </span>
            <span
              className="text-[11px] font-mono px-2.5 py-1 rounded-full border"
              style={{
                borderColor: dm ? "rgba(255,255,255,0.09)" : "rgba(6,78,59,0.18)",
                color: dm ? "rgba(255,255,255,0.45)" : "rgba(6,78,59,0.65)",
                background: dm ? "rgba(255,255,255,0.025)" : "rgba(6,78,59,0.05)",
              }}
            >
              Principal Architect
            </span>
          </motion.div>

          {/* ── Hero headline: letter-by-letter staggered reveal ── */}
          <div className="space-y-0.5 text-center">
            {[line1, line2].map((line, lineIdx) => {
              const prevLength = [line1, line2].slice(0, lineIdx).join("").length;
              const baseDelay  = [1.5, 1.8][lineIdx];
              const charDelay  = [0.028, 0.022][lineIdx];
              return (
                <div key={lineIdx} className="overflow-hidden py-1">
                  <div
                    className="flex flex-wrap justify-center gap-x-[0.25em] text-4xl sm:text-5xl md:text-[62px] lg:text-[72px] font-display font-bold tracking-tight leading-[1.06]"
                    style={{ color: dm ? "#ffffff" : "#0D1F17" }}
                  >
                    {line.split(" ").map((word, wIdx) => (
                      <span key={`${lineIdx}-w-${wIdx}`} className="inline-block whitespace-nowrap">
                        {word.split("").map((char, charIdx) => {
                          const prevChars = line.split(" ").slice(0, wIdx).join(" ").length + (wIdx > 0 ? 1 : 0);
                          const i = prevChars + charIdx;
                          return (
                            <motion.span
                              key={`${lineIdx}-c-${charIdx}`}
                              className="inline-block"
                              initial={{ y: "110%", opacity: 0 }}
                              animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                              transition={{
                                duration: 0.72,
                                delay: baseDelay + (prevLength + i) * charDelay,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              {char}
                            </motion.span>
                          );
                        })}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Subheading ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 2.5, ease: "easeOut" }}
            className={`text-[14px] sm:text-[15px] font-light max-w-md mx-auto leading-relaxed tracking-wide ${textDim}`}
          >
            Building secure, high-concurrency enterprise ecosystems with distributed
            systems, serverless architectures, and web-scale APIs.
          </motion.p>

          {/* ── CTA Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 2.75 }}
            className="flex items-center gap-3 pt-1 flex-wrap justify-center"
          >
            <motion.button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-[13px] tracking-tight cursor-pointer"
              style={{
                background: dm ? "rgba(255,255,255,0.92)" : "#0D1F17",
                color: dm ? "#020D0A" : "#F8E7C9",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Inspect Creations
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            <motion.button
              onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth", block: "center" })}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-[13px] tracking-tight cursor-pointer border backdrop-blur-sm"
              style={{
                color: dm ? "rgba(255,255,255,0.65)" : "rgba(6,78,59,0.80)",
                borderColor: dm ? "rgba(255,255,255,0.11)" : "rgba(6,78,59,0.18)",
                background: dm ? "rgba(255,255,255,0.04)" : "rgba(6,78,59,0.06)",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              Interactive Shell
            </motion.button>
          </motion.div>

          {/* ── Orbital Sphere ── */}
          <motion.div
            className="pt-5 pb-2"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.0, delay: 3.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <OrbitalCore isLoaded={isLoaded} isDarkMode={dm} />
          </motion.div>

          {/* ── Scroll hint ── */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer opacity-25 hover:opacity-55 transition-opacity"
            onClick={() => document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" })}
          >
            <ChevronDown className={`w-5 h-5 ${textMid}`} />
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  CONTENT SECTIONS                                     */}
      {/* ══════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 py-20 space-y-36 relative z-10">

        <section id="timeline" className="scroll-mt-24">
          <div className="max-w-4xl mx-auto">
            <Timeline isDarkMode={dm} />
          </div>
        </section>

        <section id="projects" className="scroll-mt-24">
          <ProjectShowcase isDarkMode={dm} />
        </section>

        <section id="terminal" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
              <span
                className="text-[10px] font-mono tracking-widest font-bold uppercase block"
                style={{ color: "#064E3B" }}
              >
                DEVELOPER SHELL CONTROL
              </span>
              <h2
                className="text-3xl md:text-4xl font-display font-extrabold tracking-tight"
                style={{ color: dm ? "#ffffff" : "#0D1F17" }}
              >
                Developer{" "}
                <span
                  className="italic font-serif font-normal text-transparent bg-clip-text"
                  style={{ backgroundImage: `linear-gradient(to right, ${E.glow}, ${E.mid})` }}
                >
                  Playground
                </span>
              </h2>
              <p className={`text-sm leading-relaxed ${textDim}`}>
                Interact directly with my stack records, microservices catalog, or query routing
                coordinates. Fully coded client-side using responsive state machine controllers.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4" style={{ color: E.bright }} />
                  <span className={`text-xs font-semibold ${textMid}`}>Fast Telemetries</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" style={{ color: E.bright }} />
                  <span className={`text-xs font-semibold ${textMid}`}>Input Sanitized</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <Terminal isDarkMode={dm} />
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <ContactCard isDarkMode={dm} />
          </div>
        </section>
      </main>

      {/* ══════════════════════════════════════════════════════ */}
      {/*  FOOTER                                               */}
      {/* ══════════════════════════════════════════════════════ */}
      <footer
        className="py-12 px-4 backdrop-blur-sm"
        style={{
          borderTop: `1px solid ${dm ? "rgba(255,255,255,0.04)" : "rgba(6,78,59,0.12)"}`,
          background: dm ? "rgba(0,0,0,0.25)" : "rgba(248,231,201,0.60)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="relative w-5 h-5">
              <div
                className="absolute w-4 h-4 rounded-full"
                style={{ background: E.ink, boxShadow: `0 0 8px rgba(16,185,129,0.40)` }}
              />
              <div
                className="absolute w-4 h-4 rounded-full translate-x-[5px]"
                style={{ background: dm ? "rgba(82,82,82,0.70)" : "rgba(180,155,120,0.60)" }}
              />
            </div>
            <span
              className="text-xs font-display font-bold tracking-widest uppercase ml-2"
              style={{ color: dm ? "rgba(255,255,255,0.25)" : "rgba(13,31,23,0.35)" }}
            >
              DHANUSH
            </span>
          </div>
          <div className="text-center sm:text-right">
            <p
              className="text-[10px] font-mono uppercase tracking-widest font-bold"
              style={{ color: dm ? "rgba(255,255,255,0.18)" : "rgba(13,31,23,0.28)" }}
            >
              © 2026 DHANUSH CODES. ALL RIGHTS RESERVED.
            </p>
            <p
              className="text-[9px] font-mono mt-1 uppercase tracking-wider"
              style={{ color: dm ? "rgba(255,255,255,0.10)" : "rgba(13,31,23,0.18)" }}
            >
              CRAFTED WITH REACT, TAILWIND CSS &amp; MOTION
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
