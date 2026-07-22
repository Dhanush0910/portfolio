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

  // Helper: check if event is inside a scrollable element that has scroll room
  const isScrollableChild = (target: HTMLElement | null, deltaY: number): boolean => {
    let el = target;
    while (el && el !== document.body && el !== document.documentElement) {
      const tag = el.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return true;
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
        const atTop = el.scrollTop <= 0;
        const atBottom = Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) <= 2;
        // If child has scroll room in the intended direction, let it scroll naturally
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
      }, 150);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(debounceTimer);
    };
  }, [activeIndex, isLoaded, isSettled, sections.length, goToSection]);

  // Touch Swipe Handling for Mobile / Tablet
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null || !isLoaded || !isSettled || wheelLockRef.current) return;
      const diffY = touchStartY.current - (e.touches[0]?.clientY ?? 0);
      if (isScrollableChild(e.target as HTMLElement, diffY)) return;

      if (Math.abs(diffY) > 40) {
        e.preventDefault();
        touchStartY.current = null;
        const nextIndex = diffY > 0 ? activeIndex + 1 : activeIndex - 1;
        if (nextIndex >= 0 && nextIndex < sections.length) {
          goToSection(nextIndex);
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
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
      {/* Main Section Transition Container (Side dots removed) */}
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
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center overflow-hidden"
        >
          {/* Inner Content Wrapper: Push-In & Obscured Hold -> Push-Out Reveal */}
          <motion.div
            initial={{
              scale: 0.85,
              filter: "blur(22px)",
              opacity: 0.2,
            }}
            animate={
              isSettled
                ? { scale: 1, filter: "blur(0px)", opacity: 1 } // Push-Out / Full sharpness reveal
                : { scale: 0.88, filter: "blur(18px)", opacity: 0.55 } // Obscured hold in transit
            }
            transition={
              isSettled
                ? {
                    type: "spring",
                    stiffness: 280,
                    damping: 26,
                    mass: 0.6,
                  }
                : {
                    duration: 0.15,
                    ease: "easeOut",
                  }
            }
            style={{ willChange: "transform, filter, opacity" }}
            className="w-full h-full flex flex-col justify-center items-center"
          >
            {currentSec.content}
          </motion.div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
