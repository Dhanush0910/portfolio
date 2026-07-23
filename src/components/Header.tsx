import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Sun, Moon } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (val: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const menuItems = [
  { label: "Core",       id: "hero" },
  { label: "About",      id: "about" },
  { label: "Experience", id: "timeline" },
  { label: "Projects",   id: "projects" },
  { label: "Console",    id: "terminal" },
  { label: "Contact",    id: "contact" },
];

export default function Header({ activeSection, setActiveSection, isDarkMode, onToggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dm = isDarkMode;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 w-full px-6 transition-all duration-300 ${
        scrolled ? "pt-3.5 pb-7 sm:pb-8" : "py-3.5"
      }`}
      style={{
        background: scrolled
          ? (dm
              ? "linear-gradient(to bottom, rgba(2, 13, 10, 0.98) 0%, rgba(2, 13, 10, 0.90) 65%, rgba(2, 13, 10, 0) 100%)"
              : "linear-gradient(to bottom, rgba(248, 231, 201, 0.99) 0%, rgba(248, 231, 201, 0.90) 65%, rgba(248, 231, 201, 0) 100%)")
          : "transparent",
        WebkitMaskImage: scrolled
          ? "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)"
          : "none",
        maskImage: scrolled
          ? "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)"
          : "none",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

        {/* ── Logo — Dhanush. ── */}
        <div
          onClick={() => handleScrollTo("hero")}
          className="flex items-center gap-2.5 cursor-pointer flex-shrink-0"
        >
          <div className="relative w-7 h-7 flex items-center justify-center">
            <div
              className="absolute w-5 h-5 rounded-full"
              style={{
                background: "#064E3B",
                boxShadow: "0 0 12px rgba(16,185,129,0.55)",
              }}
            />
            <div
              className="absolute w-5 h-5 rounded-full translate-x-[7px]"
              style={{ background: dm ? "rgba(82,82,82,0.80)" : "rgba(180,155,120,0.55)" }}
            />
          </div>
          <span
            className="text-[15px] font-display font-bold tracking-tight"
            style={{ color: dm ? "#ffffff" : "#0D1F17" }}
          >
            Dhanush.
          </span>
        </div>

        {/* ── Central nav capsule ── */}
        <nav
          className="hidden md:flex items-center gap-0.5 px-3 py-1.5 rounded-full border"
          style={{
            borderColor: dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.12)",
            background: dm ? "rgba(0,0,0,0.55)" : "rgba(248,231,201,0.90)",
          }}
        >
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.label}
                onClick={() => handleScrollTo(item.id)}
                className="relative px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-tight transition-all duration-200 cursor-pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="navActiveGlow"
                    className="absolute inset-0 rounded-full border"
                    style={{
                      background: dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.08)",
                      borderColor: dm ? "rgba(255,255,255,0.08)" : "rgba(6,78,59,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span
                  className="relative z-10 transition-colors duration-200"
                  style={{
                    color: isActive
                      ? (dm ? "#ffffff" : "#0D1F17")
                      : (dm ? "rgba(255,255,255,0.50)" : "rgba(13,31,23,0.50)"),
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* ── Right: Theme toggle + Hire CTA + Mobile menu ── */}
        <div className="flex items-center gap-2">

          {/* ── Theme toggle pill ── */}
          <motion.button
            onClick={onToggleTheme}
            id="theme-toggle"
            className="flex items-center justify-center w-9 h-9 rounded-full border cursor-pointer transition-colors duration-300"
            style={{
              borderColor: dm ? "rgba(255,255,255,0.10)" : "rgba(6,78,59,0.18)",
              background: dm ? "rgba(255,255,255,0.10)" : "rgba(6,78,59,0.10)",
              color: dm ? "rgba(255,255,255,0.65)" : "#064E3B",
            }}
            whileHover={{ scale: 1.10 }}
            whileTap={{ scale: 0.93 }}
            title={dm ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {dm ? (
                <motion.span
                  key="moon"
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{ rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <Sun className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ rotate: 30,  opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{ rotate: -30, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <Moon className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* ── Hire Dhanush CTA ── */}
          <motion.button
            onClick={() => handleScrollTo("contact")}
            id="hire-cta"
            className="hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full font-semibold text-[13px] tracking-tight cursor-pointer shadow-lg"
            style={{
              background: dm ? "rgba(255,255,255,0.92)" : "#0D1F17",
              color:      dm ? "#020D0A" : "#F8E7C9",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Sparkles className="w-3 h-3" style={{ color: "#064E3B" }} />
            Hire Dhanush
          </motion.button>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border"
            style={{
              borderColor: dm ? "rgba(255,255,255,0.10)" : "rgba(6,78,59,0.15)",
              background:  dm ? "rgba(0,0,0,0.55)" : "rgba(248,231,201,0.85)",
              color:       dm ? "#ffffff" : "#0D1F17",
            }}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 z-50 p-4 rounded-2xl border shadow-2xl pointer-events-auto"
            style={{
              borderColor: dm ? "rgba(255,255,255,0.08)" : "rgba(6,78,59,0.12)",
              background:  dm ? "rgba(2,13,10,0.97)" : "rgba(248,231,201,0.98)",
            }}
          >
            <div className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleScrollTo(item.id)}
                    className="px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all"
                    style={{
                      color: isActive
                        ? "#10B981"
                        : (dm ? "rgba(255,255,255,0.60)" : "rgba(13,31,23,0.65)"),
                      background: isActive
                        ? "rgba(6,78,59,0.18)"
                        : "transparent",
                      border: isActive
                        ? "1px solid rgba(6,78,59,0.20)"
                        : "1px solid transparent",
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile theme row */}
              <div className="flex items-center gap-2 mt-2 pt-3"
                style={{ borderTop: `1px solid ${dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.10)"}` }}
              >
                <button
                  onClick={onToggleTheme}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border font-semibold text-sm"
                  style={{
                    borderColor: dm ? "rgba(255,255,255,0.10)" : "rgba(6,78,59,0.15)",
                    color:       dm ? "rgba(255,255,255,0.65)" : "#064E3B",
                  }}
                >
                  {dm ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {dm ? "Light Mode" : "Dark Mode"}
                </button>
                <button
                  onClick={() => handleScrollTo("contact")}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm"
                  style={{
                    background: dm ? "#ffffff" : "#0D1F17",
                    color:      dm ? "#020D0A" : "#F8E7C9",
                  }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: "#064E3B" }} />
                  Hire Dhanush
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
