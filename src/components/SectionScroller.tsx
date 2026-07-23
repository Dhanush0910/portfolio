import React, { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface SectionItem {
  id: string;
  label?: string;
  content: ReactNode;
}

interface SectionScrollerProps {
  sections: SectionItem[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  isLoaded: boolean;
  isDarkMode: boolean;
}

export default function SectionScroller({
  sections,
  activeSection,
  setActiveSection,
  isLoaded,
}: SectionScrollerProps) {
  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeSection)
  );

  const [direction, setDirection] = useState(1);
  const [isSettled, setIsSettled] = useState(true);

  const prevIndexRef = useRef(activeIndex);
  const touchStartY = useRef<number | null>(null);
  const wheelLockRef = useRef(false);

  // Sync direction when activeSection changes externally (e.g. Header click)
  useEffect(() => {
    if (activeIndex !== prevIndexRef.current) {
      setDirection(activeIndex > prevIndexRef.current ? 1 : -1);
      setIsSettled(false); // Obscure content immediately on section change
      prevIndexRef.current = activeIndex;
    }
  }, [activeIndex]);

  const goToSection = useCallback(
    (newIndex: number) => {
      if (
        !isLoaded ||
        newIndex < 0 ||
        newIndex >= sections.length ||
        newIndex === activeIndex ||
        !isSettled ||
        wheelLockRef.current
      ) {
        return;
      }
      wheelLockRef.current = true;
      setDirection(newIndex > activeIndex ? 1 : -1);
      setIsSettled(false); // Obscure content immediately
      setActiveSection(sections[newIndex].id);
    },
    [activeIndex, isLoaded, isSettled, sections, setActiveSection]
  );

  // Helper: check if event is inside a scrollable element that has scroll room (zero reflow/layout flush)
  const isScrollableChild = (target: HTMLElement | null, deltaY: number): boolean => {
    let el = target;
    while (el && el !== document.body && el !== document.documentElement) {
      const tag = el.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return true;

      // Fast class-based scroll check without layout thrashing from getComputedStyle
      const isScrollContainer =
        el.classList.contains("overflow-y-auto") ||
        el.classList.contains("overflow-auto") ||
        el.classList.contains("overflow-y-scroll") ||
        el.classList.contains("smooth-scroll");

      if (isScrollContainer && el.scrollHeight > el.clientHeight + 2) {
        const atTop = el.scrollTop <= 0;
        const atBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) <= 4;
        if (deltaY > 0 && !atBottom) return true;
        if (deltaY < 0 && !atTop) return true;
      }
      el = el.parentElement;
    }
    return false;
  };

  // Intercept Wheel Navigation across the entire page
  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      if (!isLoaded || !isSettled || wheelLockRef.current) return;
      // Let inner scrollable containers consume the event first
      if (isScrollableChild(e.target as HTMLElement, e.deltaY)) return;

      if (Math.abs(e.deltaY) > 15) {
        e.preventDefault();
        const nextIndex = e.deltaY > 0 ? activeIndex + 1 : activeIndex - 1;
        if (nextIndex >= 0 && nextIndex < sections.length) {
          goToSection(nextIndex);
        }
      }

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        wheelLockRef.current = false;
      }, 500);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(debounceTimer);
    };
  }, [activeIndex, isLoaded, isSettled, sections.length, goToSection]);

  // Touch Swipe Handling for Mobile / Tablet (Passive for 60fps mobile scrolling)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || !isLoaded || !isSettled || wheelLockRef.current) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartY.current;
      const diffY = touchStartY.current - endY;
      touchStartY.current = null;

      if (isScrollableChild(e.target as HTMLElement, diffY)) return;

      if (Math.abs(diffY) > 45) {
        const nextIndex = diffY > 0 ? activeIndex + 1 : activeIndex - 1;
        if (nextIndex >= 0 && nextIndex < sections.length) {
          goToSection(nextIndex);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex, isLoaded, isSettled, sections.length, goToSection]);

  // Keyboard Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLoaded || !isSettled || wheelLockRef.current) return;

      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goToSection(activeIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToSection(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, isLoaded, isSettled, goToSection]);

  const currentSec = sections[activeIndex];

  return (
    <div className="relative w-full h-screen overflow-hidden select-none">
      {/* Main Section Transition Container */}
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.section
          key={currentSec.id}
          id={currentSec.id}
          custom={direction}
          initial={{
            y: direction * 100 + "%",
          }}
          animate={{
            y: "0%",
          }}
          exit={{
            y: direction * -45 + "%",
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
            ease: [0.77, 0, 0.175, 1],
          }}
          onAnimationComplete={() => {
            // 🛑 CRITICAL REVEAL CONDITION: Screen is 100% settled in position
            setIsSettled(true);
            wheelLockRef.current = false;
          }}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden gpu-layer"
        >
          {/* Inner Content Wrapper: Push-In & Obscured Hold -> Push-Out Reveal */}
          <motion.div
            initial={{
              scale: 0.94,
              opacity: 0.3,
            }}
            animate={
              isSettled
                ? { scale: 1, opacity: 1 } // Push-Out / Full sharpness reveal
                : { scale: 0.96, opacity: 0.65 } // Obscured hold in transit
            }
            transition={
              isSettled
                ? {
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                    mass: 0.5,
                  }
                : {
                    duration: 0.15,
                    ease: "easeOut",
                  }
            }
            style={{ willChange: "transform, opacity", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            className="w-full h-full flex flex-col justify-center items-center"
          >
            {currentSec.content}
          </motion.div>
        </motion.section>
      </AnimatePresence>

      {/* Side Section Nav Indicator Dots */}
      <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3">
        {sections.map((sec, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={sec.id}
              onClick={() => goToSection(idx)}
              className="group relative flex items-center justify-center p-1.5 cursor-pointer"
              title={sec.label ?? sec.id}
            >
              {/* Hover Tooltip label */}
              <span
                className="absolute right-7 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border"
                style={{
                  background: "rgba(2,13,10,0.95)",
                  color: "#ffffff",
                  borderColor: "rgba(16,185,129,0.3)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                }}
              >
                {sec.label ?? sec.id}
              </span>

              {/* Dot element */}
              <div
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  background: isActive
                    ? "#10B981"
                    : "rgba(16,185,129,0.30)",
                  transform: isActive ? "scale(1.35)" : "scale(1)",
                  boxShadow: isActive ? "0 0 10px rgba(16,185,129,0.85)" : "none",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
