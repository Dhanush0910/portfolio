import { motion } from "motion/react";

interface OrbitalCoreProps {
  isLoaded: boolean;
  isDarkMode?: boolean;
}

export default function OrbitalCore({ isLoaded, isDarkMode = true }: OrbitalCoreProps) {
  const dm = isDarkMode;

  return (
    <motion.div
      className="relative flex items-center justify-center w-36 h-36 mx-auto z-10"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
      transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Outer ambient emerald halo */}
      <motion.div
        className="absolute w-40 h-40 rounded-full pointer-events-none transition-all duration-500"
        style={{
          background: dm
            ? "radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(6,78,59,0.10) 40%, rgba(6,78,59,0.02) 65%, transparent 80%)"
            : "radial-gradient(circle, rgba(6,78,59,0.28) 0%, rgba(5,150,105,0.12) 40%, rgba(5,150,105,0.02) 65%, transparent 80%)",
          willChange: "transform, opacity",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.55, 0.88, 0.55] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main sphere */}
      <motion.div
        className="relative w-28 h-28 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 shadow-xl"
        style={{
          background: dm
            ? "radial-gradient(circle at 35% 30%, rgba(6,40,28,0.95) 0%, rgba(1,10,6,0.99) 55%, rgba(0,4,2,1) 100%)"
            : "radial-gradient(circle at 35% 30%, rgba(6,78,59,0.95) 0%, rgba(2,30,22,0.99) 55%, rgba(1,15,11,1) 100%)",
          border: dm
            ? "1px solid rgba(16,185,129,0.10)"
            : "1px solid rgba(6,78,59,0.30)",
          boxShadow: dm ? "none" : "0 10px 30px -5px rgba(6,78,59,0.30)",
        }}
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        {/* Emerald crescent highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 28% 22%, rgba(6,78,59,0.55) 0%, transparent 60%)",
          }}
        />

        {/* Inner dark fill */}
        <div
          className="absolute inset-[3px] rounded-full"
          style={{
            background: dm
              ? "radial-gradient(circle at 50% 60%, rgba(1,8,5,0.96) 0%, rgba(0,3,1,1) 100%)"
              : "radial-gradient(circle at 50% 60%, rgba(3,35,26,0.96) 0%, rgba(1,18,13,1) 100%)",
          }}
        />

        {/* Inner ring */}
        <div
          className="absolute inset-[6px] rounded-full border pointer-events-none"
          style={{ borderColor: dm ? "rgba(6,78,59,0.18)" : "rgba(6,78,59,0.30)" }}
        />

        {/* Center label */}
        <div className="relative z-10 flex flex-col items-center">
          <span
            className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase"
            style={{ color: dm ? "rgba(255,255,255,0.7)" : "#F8E7C9" }}
          >
            DEV
          </span>
        </div>
      </motion.div>

      {/* Rotating thin orbit ring */}
      <motion.div
        className="absolute w-[132px] h-[132px] rounded-full border border-dashed transition-all duration-500 gpu-layer"
        style={{ borderColor: dm ? "rgba(6,78,59,0.22)" : "rgba(6,78,59,0.35)", willChange: "transform" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            background: "#064E3B",
            boxShadow: "0 0 6px rgba(6,78,59,0.6)"
          }}
        />
      </motion.div>

      {/* Small secondary orbit */}
      <motion.div
        className="absolute w-[158px] h-[158px] rounded-full border transition-all duration-500 gpu-layer"
        style={{ borderColor: dm ? "rgba(255,255,255,0.02)" : "rgba(6,78,59,0.12)", willChange: "transform" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute bottom-3 right-3 w-1 h-1 rounded-full"
          style={{ background: "rgba(6,78,59,0.6)" }}
        />
      </motion.div>
    </motion.div>
  );
}
