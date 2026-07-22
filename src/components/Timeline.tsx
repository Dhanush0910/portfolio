import { motion, AnimatePresence } from "motion/react";
import { useState, ReactNode } from "react";
import { Experience } from "../types";
import { Calendar, Briefcase, TrendingUp, Award, GraduationCap, Trophy } from "lucide-react";

interface TimelineProps {
  isDarkMode: boolean;
}

type TabType = "experience" | "education" | "accomplishments";

const experiences: Experience[] = [
  {
    year: "Dec 2025 — PRESENT",
    company: "Natobotics Technologies, Chennai",
    role: "Software Developer",
    desc: "Engineered an AI-powered ATS resume matcher (NTalent) in Python, integrating the Gemini API and designing RESTful APIs to automate resume parsing and job-description analysis. Implemented AI-driven skill matching, gap analysis, and candidate ranking workflows within an agile development environment.",
    tags: ["Python", "Gemini API", "REST APIs", "Flask", "AI/ML", "Agile"],
    duration: "Present",
    metrics: ["AI Resume Matching", "Automated Screening", "Gemini API Integration"]
  },
];

const education = [
  {
    year: "Oct 2021 — Jun 2025",
    institution: "Prathyusha Engineering College",
    degree: "B.E., Computer Science and Engineering",
    detail: "CGPA: 8.2",
    tags: ["Computer Science", "Engineering"],
  },
  {
    year: "Jun 2019 — May 2021",
    institution: "Shree Niketan Higher Secondary School",
    degree: "Higher Secondary Certificate",
    detail: "Percentage: 89%",
    tags: ["Mathematics", "Biology", "Physics"],
  },
];

const accomplishments = [
  {
    title: "Smart India Hackathon (SIH) — Top 10",
    desc: "Developed core modules for a queue management platform as part of a cross-functional team, helping the team secure a Top-10 position at the national level Smart India Hackathon.",
    tags: ["Hackathon", "Team Collaboration", "Queue Management", "Top-10"],
  },
  {
    title: "350+ Problems Solved on Skillrack",
    desc: "Solved 350+ coding problems in Python and MySQL on Skillrack, strengthening problem-solving efficiency, logical accuracy, and core software development fundamentals.",
    tags: ["Python", "MySQL", "Problem Solving", "Skillrack"],
  },
];

const certifications = [
  { name: "Certified Software Developer – Python (Associate Level)", issuer: "IOPPC", date: "Mar 2025" },
  { name: "The Full-Stack", issuer: "Coursera", date: "Jan 2025" },
  { name: "AWS Academy Cloud Foundations", issuer: "AWS", date: "Sep 2024" },
  { name: "JavaScript & React.js Essential Training", issuer: "LinkedIn Learning", date: "May 2024" },
];

export default function Timeline({ isDarkMode }: TimelineProps) {
  const [activeExp, setActiveExp] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<TabType>("experience");
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
          Experience &{" "}
          <span
            className="italic font-serif font-normal text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(to right, #064E3B, #059669)" }}
          >
            Education
          </span>
        </h2>
        <p
          className="text-sm max-w-xl mx-auto leading-relaxed"
          style={{ color: dm ? "rgba(255,255,255,0.40)" : "rgba(13,31,23,0.55)" }}
        >
          Building AI-powered applications and full-stack systems, with a strong foundation in computer science and software engineering.
        </p>
      </div>

      {/* Tab Switcher with sliding indicator */}
      <div
        className="flex gap-1 p-1 rounded-xl border backdrop-blur-md mx-auto w-fit"
        style={{
          backgroundColor: dm ? "rgba(0,0,0,0.40)" : "rgba(248,231,201,0.50)",
          borderColor: dm ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.12)",
        }}
      >
        {([
          { id: "experience", label: "Experience", icon: <Briefcase className="w-3.5 h-3.5" /> },
          { id: "education", label: "Education", icon: <GraduationCap className="w-3.5 h-3.5" /> },
          { id: "accomplishments", label: "Achievements", icon: <Trophy className="w-3.5 h-3.5" /> },
        ] as { id: TabType; label: string; icon: ReactNode }[]).map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer"
              style={{
                color: isActive
                  ? "#ffffff"
                  : (dm ? "rgba(255,255,255,0.55)" : "rgba(13,31,23,0.65)"),
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="timelineActiveTabGlow"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    backgroundColor: "#064E3B",
                    boxShadow: "0 4px 12px rgba(6,78,59,0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content wrapper with top-to-down slide animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="relative pl-6 md:pl-8 space-y-8">
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
                    <motion.div
                      className="absolute -left-[19px] md:-left-[23px] top-6 w-3.5 h-3.5 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center"
                      style={{
                        borderColor: isActive ? "#064E3B" : (dm ? "rgba(6,78,59,0.4)" : "rgba(6,78,59,0.3)"),
                        backgroundColor: isActive ? "#064E3B" : (dm ? "#020D0A" : "#F8E7C9"),
                        boxShadow: isActive ? "0 0 12px rgba(6,78,59,0.5)" : "none",
                      }}
                      animate={{ scale: isActive ? 1.2 : 1 }}
                      onClick={() => setActiveExp(index)}
                    >
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#F8E7C9" }} />
                      )}
                    </motion.div>

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
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                        <div>
                          <span
                            className="text-[10px] font-mono tracking-widest uppercase font-semibold flex items-center gap-1.5"
                            style={{ color: dm ? "#34D399" : "#064E3B" }}
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.year}
                          </span>
                          <h3
                            className="text-xl font-display font-bold tracking-tight mt-1"
                            style={{ color: dm ? "#ffffff" : "#0D1F17" }}
                          >
                            {exp.role}
                          </h3>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: dm ? "rgba(255,255,255,0.70)" : "rgba(6,78,59,0.75)" }}
                          >
                            {exp.company}
                          </span>
                        </div>

                        <div
                          className="p-2.5 rounded-xl self-start md:self-center"
                          style={{
                            backgroundColor: isActive
                              ? (dm ? "rgba(6,78,59,0.3)" : "rgba(6,78,59,0.12)")
                              : (dm ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.08)"),
                            color: isActive ? (dm ? "#34D399" : "#064E3B") : (dm ? "rgba(255,255,255,0.4)" : "rgba(6,78,59,0.5)"),
                          }}
                        >
                          <Award className="w-5 h-5" />
                        </div>
                      </div>

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
                            style={{ color: dm ? "rgba(255,255,255,0.7)" : "rgba(6,78,59,0.7)" }}
                          >
                            <TrendingUp className="w-3 h-3" style={{ color: dm ? "#34D399" : "#064E3B" }} />
                            KEY HIGHLIGHTS
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {exp.metrics.map((metric, mIdx) => (
                              <div
                                key={mIdx}
                                className="p-3 rounded-xl border"
                                style={{
                                  backgroundColor: dm ? "rgba(6,40,28,0.6)" : "rgba(248,231,201,0.6)",
                                  borderColor: dm ? "rgba(52,211,153,0.2)" : "rgba(6,78,59,0.12)",
                                }}
                              >
                                <span
                                  className="text-xs font-display font-bold tracking-tight block"
                                  style={{ color: dm ? "#34D399" : "#064E3B" }}
                                >
                                  {metric}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {exp.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md border font-semibold"
                            style={{
                              backgroundColor: isActive
                                ? (dm ? "rgba(6,78,59,0.4)" : "rgba(6,78,59,0.10)")
                                : (dm ? "rgba(6,78,59,0.25)" : "rgba(6,78,59,0.05)"),
                              borderColor: isActive
                                ? (dm ? "rgba(52,211,153,0.4)" : "rgba(6,78,59,0.22)")
                                : (dm ? "rgba(52,211,153,0.25)" : "rgba(6,78,59,0.10)"),
                              color: isActive
                                ? (dm ? "#34D399" : "#064E3B")
                                : (dm ? "rgba(52,211,153,0.85)" : "rgba(6,78,59,0.65)"),
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
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="relative pl-6 md:pl-8 space-y-8">
              <div
                className="absolute left-2.5 md:left-3.5 top-3 bottom-3 w-px"
                style={{
                  background: dm
                    ? "linear-gradient(to bottom, rgba(6,78,59,0.5), rgba(6,78,59,0.2), transparent)"
                    : "linear-gradient(to bottom, rgba(6,78,59,0.4), rgba(6,78,59,0.15), transparent)"
                }}
              />

              {education.map((edu, index) => (
                <div key={index} className="relative group">
                  <div
                    className="absolute -left-[19px] md:-left-[23px] top-6 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: "#064E3B",
                      backgroundColor: "#064E3B",
                      boxShadow: "0 0 12px rgba(6,78,59,0.5)",
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#F8E7C9" }} />
                  </div>

                  <motion.div
                    className="p-6 rounded-2xl border backdrop-blur-md"
                    style={{
                      backgroundColor: dm ? "rgba(4,25,18,0.85)" : "rgba(255,250,240,0.95)",
                      borderColor: "rgba(6,78,59,0.35)",
                      boxShadow: dm ? "0 10px 30px -5px rgba(0,0,0,0.5)" : "0 10px 30px -5px rgba(6,78,59,0.10)",
                    }}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <span
                          className="text-[10px] font-mono tracking-widest uppercase font-semibold flex items-center gap-1.5"
                          style={{ color: dm ? "#34D399" : "#064E3B" }}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          {edu.year}
                        </span>
                        <h3
                          className="text-xl font-display font-bold tracking-tight mt-1"
                          style={{ color: dm ? "#ffffff" : "#0D1F17" }}
                        >
                          {edu.degree}
                        </h3>
                        <span
                          className="text-xs font-semibold"
                          style={{ color: dm ? "rgba(255,255,255,0.70)" : "rgba(6,78,59,0.75)" }}
                        >
                          {edu.institution}
                        </span>
                      </div>
                      <div
                        className="p-2.5 rounded-xl self-start md:self-center"
                        style={{
                          backgroundColor: dm ? "rgba(6,78,59,0.3)" : "rgba(6,78,59,0.12)",
                          color: dm ? "#34D399" : "#064E3B",
                        }}
                      >
                        <GraduationCap className="w-5 h-5" />
                      </div>
                    </div>

                    <div
                      className="inline-block px-4 py-2 rounded-xl border mb-4 font-semibold"
                      style={{
                        backgroundColor: dm ? "rgba(6,78,59,0.35)" : "rgba(6,78,59,0.10)",
                        borderColor: dm ? "rgba(52,211,153,0.35)" : "rgba(6,78,59,0.22)",
                        color: dm ? "#34D399" : "#064E3B",
                      }}
                    >
                      <span className="text-xs font-bold font-mono">{edu.detail}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {edu.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-md border font-semibold"
                          style={{
                            backgroundColor: dm ? "rgba(6,78,59,0.35)" : "rgba(6,78,59,0.10)",
                            borderColor: dm ? "rgba(52,211,153,0.35)" : "rgba(6,78,59,0.22)",
                            color: dm ? "#34D399" : "#064E3B",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}

              {/* Certifications */}
              <div className="relative">
                <div
                  className="absolute -left-[19px] md:-left-[23px] top-6 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: "#064E3B",
                    backgroundColor: "#064E3B",
                    boxShadow: "0 0 12px rgba(6,78,59,0.5)",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#F8E7C9" }} />
                </div>

                <motion.div
                  className="p-6 rounded-2xl border backdrop-blur-md"
                  style={{
                    backgroundColor: dm ? "rgba(4,25,18,0.85)" : "rgba(255,250,240,0.95)",
                    borderColor: "rgba(6,78,59,0.35)",
                    boxShadow: dm ? "0 10px 30px -5px rgba(0,0,0,0.5)" : "0 10px 30px -5px rgba(6,78,59,0.10)",
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <h3
                    className="text-xl font-display font-bold tracking-tight mb-4"
                    style={{ color: dm ? "#ffffff" : "#0D1F17" }}
                  >
                    Certifications
                  </h3>
                  <div className="space-y-3">
                    {certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl border"
                        style={{
                          backgroundColor: dm ? "rgba(6,40,28,0.3)" : "rgba(248,231,201,0.5)",
                          borderColor: dm ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.10)",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#064E3B" }} />
                        <div>
                          <p className="text-xs font-semibold" style={{ color: dm ? "#ffffff" : "#0D1F17" }}>{cert.name}</p>
                          <p className="text-[10px] font-mono mt-0.5" style={{ color: dm ? "rgba(255,255,255,0.45)" : "rgba(6,78,59,0.65)" }}>
                            {cert.issuer} · {cert.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Accomplishments Tab */}
          {activeTab === "accomplishments" && (
            <div className="space-y-6">
              {accomplishments.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl border backdrop-blur-md"
                  style={{
                    backgroundColor: dm ? "rgba(4,25,18,0.85)" : "rgba(255,250,240,0.95)",
                    borderColor: "rgba(6,78,59,0.35)",
                    boxShadow: dm ? "0 10px 30px -5px rgba(0,0,0,0.5)" : "0 10px 30px -5px rgba(6,78,59,0.10)",
                  }}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-2.5 rounded-xl flex-shrink-0"
                      style={{
                        backgroundColor: dm ? "rgba(6,78,59,0.3)" : "rgba(6,78,59,0.12)",
                        color: dm ? "#34D399" : "#064E3B",
                      }}
                    >
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div className="space-y-3">
                      <h3
                        className="text-xl font-display font-bold tracking-tight"
                        style={{ color: dm ? "#ffffff" : "#0D1F17" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: dm ? "rgba(255,255,255,0.75)" : "rgba(13,31,23,0.80)" }}
                      >
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md border font-semibold"
                            style={{
                              backgroundColor: dm ? "rgba(6,78,59,0.35)" : "rgba(6,78,59,0.10)",
                              borderColor: dm ? "rgba(52,211,153,0.35)" : "rgba(6,78,59,0.22)",
                              color: dm ? "#34D399" : "#064E3B",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
