import { motion } from "motion/react";
import { Award, Zap, ShieldCheck, Cpu } from "lucide-react";

interface HUDNodesProps {
  isLoaded: boolean;
  isDarkMode?: boolean;
}

const EMERALD = {
  bright: "#064E3B",
  mid:    "rgba(6,78,59,0.85)",
  dim:    "rgba(6,78,59,0.50)",
};

const hudNodes = [
  {
    id: "architect",
    label: "ARCHITECT",
    value: "20+ Yrs Craft",
    x: 72, y: 20,
    dotColor: EMERALD.bright,
    icon: <Award className="w-3 h-3" style={{ color: EMERALD.bright }} />,
    arrowRight: true,
    delay: 1.4,
  },
  {
    id: "uptime",
    label: "SYS PERFORMANCE",
    value: "99.99% SLA",
    x: 62, y: 56,
    dotColor: EMERALD.mid,
    icon: <Zap className="w-3 h-3" style={{ color: EMERALD.mid }} />,
    arrowRight: true,
    delay: 1.6,
  },
  {
    id: "system",
    label: "RUNTIME",
    value: "Serverless",
    x: 56, y: 74,
    dotColor: "",
    icon: <Cpu className="w-3 h-3 text-emerald-600/40 dark:text-white/35" />,
    arrowRight: false,
    delay: 1.8,
  },
  {
    id: "security",
    label: "SECURITY ENGINE",
    value: "End-to-End",
    x: 23, y: 44,
    dotColor: "",
    icon: <ShieldCheck className="w-3 h-3 text-emerald-600/40 dark:text-white/35" />,
    arrowRight: false,
    delay: 1.5,
  },
  {
    id: "concurrency",
    label: "CONCURRENCY",
    value: "High-Volume",
    x: 21, y: 66,
    dotColor: "",
    icon: <Cpu className="w-3 h-3 text-emerald-600/40 dark:text-white/35" />,
    arrowRight: false,
    delay: 1.7,
  },
  {
    id: "scale",
    label: "ENTERPRISE SCALE",
    value: "40M+ DAU",
    x: 4, y: 72,
    dotColor: "",
    icon: <Award className="w-3 h-3 text-emerald-600/30 dark:text-white/25" />,
    arrowRight: false,
    delay: 1.9,
  },
];

const dotIndicators = [
  { x: 62, y: 27, delay: 2.1 },
  { x: 36, y: 56, delay: 2.2 },
  { x: 47, y: 71, delay: 2.3 },
  { x: 78, y: 40, delay: 2.0 },
  { x: 20, y: 36, delay: 2.15 },
];

const bracketIndicators = [
  { x: 30, y: 39, glyph: "…",  delay: 2.4 },
  { x: 44, y: 63, glyph: "⊕", delay: 2.5 },
  { x: 63, y: 35, glyph: "○",  delay: 2.6 },
];

export default function HUDNodes({ isLoaded, isDarkMode = true }: HUDNodesProps) {
  const dm = isDarkMode;
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">

      {hudNodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute hidden md:flex flex-col items-start"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ opacity: 0, y: 8 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: node.delay, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border backdrop-blur-md transition-all duration-300"
            style={{
              borderColor: dm ? "rgba(255, 255, 255, 0.07)" : "rgba(6, 78, 59, 0.12)",
              backgroundColor: dm ? "rgba(0, 0, 0, 0.35)" : "rgba(248, 231, 201, 0.65)",
            }}
            animate={{ y: [0, -5, 0, 4, 0] }}
            transition={{
              duration: 7 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay * 0.4,
            }}
          >
            {node.dotColor && (
              <div
                className="w-1.5 h-1.5 rounded-full animate-emerald-pulse"
                style={{ background: node.dotColor, boxShadow: `0 0 5px ${node.dotColor}` }}
              />
            )}
            <div className="flex flex-col leading-none">
              <span className="text-[8.5px] font-mono tracking-widest uppercase mb-0.5"
                style={{ color: dm ? "rgba(255, 255, 255, 0.3)" : "rgba(6, 78, 59, 0.45)" }}
              >
                {node.label}
              </span>
              <span className="text-[11px] font-semibold flex items-center gap-1"
                style={{ color: dm ? "rgba(255, 255, 255, 0.65)" : "rgba(13, 31, 23, 0.85)" }}
              >
                {node.icon}
                {node.value}
              </span>
            </div>
            {node.arrowRight && (
              <div className="ml-1 flex items-center">
                <div className="w-3 h-px" style={{ background: EMERALD.dim }} />
                <div
                  className="w-0 h-0"
                  style={{
                    borderTop: "2.5px solid transparent",
                    borderBottom: "2.5px solid transparent",
                    borderLeft: `4px solid ${EMERALD.dim}`,
                  }}
                />
              </div>
            )}
          </motion.div>

          {/* Connector line */}
          <motion.div
            className="w-px ml-4 transition-all duration-300"
            style={{ 
              height: "22px",
              background: dm 
                ? "linear-gradient(to bottom, rgba(255, 255, 255, 0.07), transparent)"
                : "linear-gradient(to bottom, rgba(6, 78, 59, 0.12), transparent)"
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isLoaded ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: node.delay + 0.2 }}
          />
        </motion.div>
      ))}

      {/* Scattered glow dots */}
      {dotIndicators.map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute hidden md:block"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.35, delay: dot.delay }}
        >
          <motion.div
            className="w-1 h-1 rounded-full"
            style={{ background: EMERALD.mid }}
            animate={{ scale: [1, 1.9, 1], opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ))}

      {/* Bracket indicators */}
      {bracketIndicators.map((b, i) => (
        <motion.div
          key={`bracket-${i}`}
          className="absolute hidden md:flex items-center justify-center w-5 h-5 border rounded-sm transition-all duration-300"
          style={{ 
            left: `${b.x}%`, 
            top: `${b.y}%`,
            borderColor: dm ? "rgba(255, 255, 255, 0.055)" : "rgba(6, 78, 59, 0.10)",
            backgroundColor: dm ? "transparent" : "rgba(248, 231, 201, 0.3)"
          }}
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: b.delay }}
        >
          <span className="text-[8px] transition-colors duration-300"
            style={{ color: dm ? "rgba(255, 255, 255, 0.18)" : "rgba(6, 78, 59, 0.35)" }}
          >
            {b.glyph}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
