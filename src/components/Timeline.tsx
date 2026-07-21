import { motion } from "motion/react";
import { useState } from "react";
import { Experience } from "../types";
import { Calendar, Briefcase, TrendingUp, Award } from "lucide-react";

interface TimelineProps {
  isDarkMode: boolean;
}

const experiences: Experience[] = [
  {
    year: "2021 — PRESENT",
    company: "ScaleGlobal Labs",
    role: "Principal Systems Architect",
    desc: "Spearheaded migration of decentralized micro-frontends and core high-throughput APIs serving 40M+ daily active sessions. Architected next-gen serverless rendering engine reducing cold starts by 82% and cloud operational spend by $1.4M annually.",
    tags: ["Distributed Systems", "WebAssembly", "TypeScript", "Next.js", "Serverless", "AWS/GCP"],
    duration: "5 Yrs",
    metrics: ["40M+ Daily Active Sessions", "82% Reduction in Cold Starts", "$1.4M Cloud Cost Saved"]
  },
  {
    year: "2016 — 2021",
    company: "CloudNest Inc",
    role: "Lead Fullstack Engineer",
    desc: "Led a remote engineering taskforce of 14 senior developers building enterprise workflow automation software. Introduced rigid type systems, CI/CD visual pipelines, and high-performance React canvases for complex node diagrams.",
    tags: ["React/Redux", "Node.js/Express", "Docker", "GraphQL", "Kubernetes", "Redis"],
    duration: "5 Yrs",
    metrics: ["14 Engineers Managed", "99.99% Pipeline Uptime", "3.2x Faster Builds"]
  },
  {
    year: "2012 — 2016",
    company: "Apex Dynamics",
    role: "Senior Frontend Engineer",
    desc: "Engineered real-time stock trading interfaces using WebSockets and canvas rendering. Optimized data serialization protocols, cutting memory overhead by 65% across high-frequency dashboard views.",
    tags: ["JavaScript (ES6+)", "WebSockets", "HTML5 Canvas", "Performance", "CSS Architecture"],
    duration: "4 Yrs",
    metrics: ["65% Less Memory Usage", "60 FPS Render Rate", "100k+ Active Traders"]
  },
  {
    year: "2006 — 2012",
    company: "Vanguard Tech Solutions",
    role: "Software Engineer",
    desc: "Developed custom CMS platforms, relational database schemas, and e-commerce integrations for Fortune 500 clients. Foundation period laying core mastery in OOP, algorithm optimization, and cross-browser resilience.",
    tags: ["Java/Spring", "MySQL", "JavaScript", "HTML/CSS", "REST APIs"],
    duration: "6 Yrs",
    metrics: ["30+ Client Launches", "Zero Critical Exploits", "Core Architecture"]
  }
];

export default function Timeline({ isDarkMode }: TimelineProps) {
  const [activeExp, setActiveExp] = useState<number>(0);
  const dm = isDarkMode;

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <span
          className="text-[10px] font-mono tracking-widest font-bold uppercase block"
          style={{ color: "#064E3B" }}
        >
          CAREER TRAJECTORY
        </span>
        <h2
          className="text-3xl md:text-4xl font-display font-extrabold tracking-tight"
          style={{ color: dm ? "#ffffff" : "#0D1F17" }}
        >
          Engineering{" "}
          <span
            className="italic font-serif font-normal text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(to right, #064E3B, #059669)" }}
          >
            Milestones
          </span>
        </h2>
        <p
          className="text-sm max-w-xl mx-auto leading-relaxed"
          style={{ color: dm ? "rgba(255,255,255,0.40)" : "rgba(13,31,23,0.55)" }}
        >
          Two decades of continuous technical mastery, system design leadership, and high-impact shipping across high-growth startups and scale-ups.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 md:pl-8 space-y-8">
        {/* Vertical Line */}
        <div
          className="absolute left-2.5 md:left-3.5 top-3 bottom-3 w-px"
          style={{
            background: dm
              ? "linear-gradient(to bottom, rgba(6,78,59,0.5), rgba(6,78,59,0.2), transparent)"
              : "linear-gradient(to bottom, rgba(6,78,59,0.4), rgba(6,78,59,0.15), transparent)"
          }}
        />

        {experiences.map((exp, index) => {
          const isActive = activeExp === index;

          return (
            <div key={index} className="relative group">
              {/* Dot indicator */}
              <motion.div
                className="absolute -left-[19px] md:-left-[23px] top-6 w-3.5 h-3.5 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center"
                style={{
                  borderColor: isActive
                    ? "#064E3B"
                    : (dm ? "rgba(6,78,59,0.4)" : "rgba(6,78,59,0.3)"),
                  backgroundColor: isActive
                    ? "#064E3B"
                    : (dm ? "#020D0A" : "#F8E7C9"),
                  boxShadow: isActive ? "0 0 12px rgba(6,78,59,0.5)" : "none",
                }}
                animate={{ scale: isActive ? 1.2 : 1 }}
                onClick={() => setActiveExp(index)}
              >
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#F8E7C9" }} />
                )}
              </motion.div>

              {/* Card Container */}
              <motion.div
                className="p-6 rounded-2xl border transition-all duration-500 cursor-pointer backdrop-blur-md"
                style={{
                  backgroundColor: isActive
                    ? (dm ? "rgba(4,25,18,0.85)" : "rgba(255,250,240,0.95)")
                    : (dm ? "rgba(2,13,10,0.45)" : "rgba(248,231,201,0.40)"),
                  borderColor: isActive
                    ? "rgba(6,78,59,0.35)"
                    : (dm ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.12)"),
                  boxShadow: isActive
                    ? (dm ? "0 10px 30px -5px rgba(0,0,0,0.5)" : "0 10px 30px -5px rgba(6,78,59,0.10)")
                    : "none",
                }}
                onClick={() => setActiveExp(index)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <span
                      className="text-[10px] font-mono tracking-widest uppercase font-semibold flex items-center gap-1.5"
                      style={{ color: "#064E3B" }}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.year} ({exp.duration})
                    </span>
                    <h3
                      className="text-xl font-display font-bold tracking-tight mt-1"
                      style={{ color: dm ? "#ffffff" : "#0D1F17" }}
                    >
                      {exp.role}
                    </h3>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: dm ? "rgba(255,255,255,0.50)" : "rgba(6,78,59,0.75)" }}
                    >
                      {exp.company}
                    </span>
                  </div>

                  {/* Icon Indicator */}
                  <div
                    className="p-2.5 rounded-xl self-start md:self-center"
                    style={{
                      backgroundColor: isActive
                        ? "rgba(6,78,59,0.12)"
                        : (dm ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.08)"),
                      color: isActive ? "#064E3B" : (dm ? "rgba(255,255,255,0.4)" : "rgba(6,78,59,0.5)"),
                    }}
                  >
                    {index === 0 ? (
                      <Award className="w-5 h-5" />
                    ) : (
                      <Briefcase className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {/* Body details */}
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{
                    color: isActive
                      ? (dm ? "rgba(255,255,255,0.85)" : "rgba(13,31,23,0.85)")
                      : (dm ? "rgba(255,255,255,0.45)" : "rgba(13,31,23,0.60)"),
                  }}
                >
                  {exp.desc}
                </p>

                {/* Collapsible Impact Metrics Container */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-dashed pt-4 mt-4"
                    style={{ borderColor: "rgba(6,78,59,0.20)" }}
                  >
                    <span
                      className="text-[10px] font-mono tracking-widest uppercase font-bold flex items-center gap-1.5 mb-3"
                      style={{ color: dm ? "rgba(255,255,255,0.5)" : "rgba(6,78,59,0.7)" }}
                    >
                      <TrendingUp className="w-3 h-3" style={{ color: "#064E3B" }} />
                      KEY IMPACT METRICS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {exp.metrics.map((metric, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3 rounded-xl border"
                          style={{
                            backgroundColor: dm ? "rgba(6,40,28,0.4)" : "rgba(248,231,201,0.6)",
                            borderColor: dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.12)",
                          }}
                        >
                          <span
                            className="text-xs font-display font-bold tracking-tight block"
                            style={{ color: "#064E3B" }}
                          >
                            {metric.split(" ")[0]}
                          </span>
                          <span
                            className="text-[10px] leading-tight block mt-0.5"
                            style={{ color: dm ? "rgba(255,255,255,0.5)" : "rgba(13,31,23,0.65)" }}
                          >
                            {metric.split(" ").slice(1).join(" ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md border"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(6,78,59,0.10)"
                          : (dm ? "rgba(255,255,255,0.03)" : "rgba(6,78,59,0.05)"),
                        borderColor: isActive
                          ? "rgba(6,78,59,0.22)"
                          : (dm ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.10)"),
                        color: isActive
                          ? "#064E3B"
                          : (dm ? "rgba(255,255,255,0.45)" : "rgba(6,78,59,0.65)"),
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
