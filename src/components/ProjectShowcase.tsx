import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Project } from "../types";
import { Github, ExternalLink, Filter, Layers, X, Cpu, Server, Monitor, Bot } from "lucide-react";
import chatbotImg from "../assets/chatbot_project.png";
import ntalentImg from "../assets/ntalent_project.png";
import incidentImg from "../assets/incident_project.png";

interface ProjectShowcaseProps {
  isDarkMode: boolean;
}

const projects: Project[] = [
  {
    id: "ntalent-ats",
    title: "NTalent – AI-Powered ATS Resume Matcher",
    subtitle: "Automated Talent Screening with Gemini API",
    desc: "An AI-powered ATS resume matcher integrating the Gemini API to automate resume parsing, job-description analysis, skill matching, gap analysis, and candidate ranking.",
    longDesc: "Engineered an AI-powered ATS (Applicant Tracking System) resume matcher in Python, integrating the Gemini API and designing RESTful APIs to automate resume parsing and job-description analysis. Implemented AI-driven skill matching, gap analysis, and candidate ranking workflows, automating recruiter screening processes and improving workflow efficiency within an agile development environment at Natobotics Technologies.",
    tags: ["Python", "Gemini API", "Flask", "REST APIs", "NLP", "Agile"],
    category: "AI",
    image: ntalentImg,
    features: [
      "AI-driven resume parsing",
      "Skill gap analysis engine",
      "Candidate ranking & scoring",
      "Job-description keyword matching"
    ],
    metrics: ["Automated Screening", "Gemini API Integration", "Recruiter Efficiency"]
  },
  {
    id: "ai-incident-detection",
    title: "AI-Powered Incident Detection System",
    subtitle: "Intelligent Log Analysis & Anomaly Detection",
    desc: "An AI-assisted incident monitoring platform using Python and Flask to analyse application logs, detect anomalies, and classify potential system issues in real time.",
    longDesc: "Developed an AI-assisted incident monitoring platform using Python and Flask to analyse application logs, detect anomalies, and classify potential system issues. Implemented REST APIs and database workflows to store incident records, automate analysis, and provide real-time status insights through a React.js dashboard. Integrated the Gemini API for intelligent log classification and root-cause suggestions.",
    tags: ["Python", "Flask", "React.js", "MySQL", "Gemini API", "REST APIs"],
    category: "AI",
    image: incidentImg,
    features: [
      "Real-time log anomaly detection",
      "AI-driven incident classification",
      "REST API-driven incident storage",
      "React.js live status dashboard"
    ],
    metrics: ["Automated Analysis", "Real-time Alerts", "AI Classification"]
  },
  {
    id: "warehouse-chatbot",
    title: "Warehouse Management Chatbot",
    subtitle: "Conversational Inventory Control Interface",
    desc: "A full-stack warehouse management chatbot with a React.js frontend and Node.js backend, enabling inventory management, stock tracking, and warehouse queries through a conversational interface.",
    longDesc: "Built a full-stack warehouse management chatbot with a React.js frontend and Node.js backend, enabling inventory management, stock tracking, and warehouse queries through a conversational interface. Implemented REST API communication between frontend and backend to support real-time inventory operations and stock updates. The chatbot allows warehouse staff to query stock levels, update records, and receive alerts via natural language.",
    tags: ["React.js", "Node.js", "REST APIs", "JavaScript", "TypeScript"],
    category: "Web",
    image: chatbotImg,
    features: [
      "Conversational inventory queries",
      "Real-time stock tracking",
      "REST API frontend-backend bridge",
      "Automated stock update workflows"
    ],
    metrics: ["Real-time Inventory", "Conversational UI", "REST API Integration"]
  },
];

const categories = ["All", "AI", "Web"];

export default function ProjectShowcase({ isDarkMode }: ProjectShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "AI":
        return <Bot className="w-3.5 h-3.5" />;
      case "Web":
        return <Monitor className="w-3.5 h-3.5" />;
      case "Mobile":
        return <Layers className="w-3.5 h-3.5" />;
      case "Backend":
        return <Server className="w-3.5 h-3.5" />;
      case "Design":
        return <Cpu className="w-3.5 h-3.5" />;
      default:
        return <Filter className="w-3.5 h-3.5" />;
    }
  };

  const dm = isDarkMode;

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2
            className="text-3xl md:text-4xl font-display font-extrabold tracking-tight"
            style={{ color: dm ? "#ffffff" : "#0D1F17" }}
          >
            Featured{" "}
            <span
              className="italic font-serif font-normal text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(to right, #064E3B, #059669)" }}
            >
              Projects
            </span>
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: dm ? "rgba(255,255,255,0.40)" : "rgba(13,31,23,0.55)" }}
          >
            AI-powered applications and full-stack systems built to solve real-world problems.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          className="flex flex-wrap gap-1.5 p-1 rounded-xl border backdrop-blur-md"
          style={{
            backgroundColor: dm ? "rgba(0,0,0,0.40)" : "rgba(248,231,201,0.50)",
            borderColor: dm ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.12)",
          }}
        >
          {categories.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive ? "#064E3B" : "transparent",
                  color: isActive ? "#ffffff" : (dm ? "rgba(255,255,255,0.50)" : "rgba(13,31,23,0.65)"),
                  boxShadow: isActive ? "0 4px 12px rgba(6,78,59,0.3)" : "none",
                }}
              >
                {getCategoryIcon(cat)}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stacking Cards */}
      <div className="flex flex-col gap-12 sm:gap-16 max-w-4xl mx-auto py-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="sticky w-full origin-top"
              style={{
                top: `${110 + index * 24}px`,
                zIndex: (index + 1) * 10,
              }}
            >
              <div
                onClick={() => setActiveProject(project)}
                className="group relative rounded-3xl border p-6 sm:p-8 cursor-pointer flex flex-col md:flex-row gap-6 items-stretch shadow-2xl transition-all duration-500 overflow-hidden backdrop-blur-md"
                style={{
                  backgroundColor: dm
                    ? "rgba(4,25,18,0.92)"
                    : "rgba(255,250,240,0.95)",
                  borderColor: dm
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(6,78,59,0.14)",
                  boxShadow: dm
                    ? "0 20px 40px -15px rgba(0,0,0,0.8)"
                    : "0 20px 40px -15px rgba(6,78,59,0.12)",
                }}
              >
                {/* Glowing emerald backdrop inside card */}
                <div
                  className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-700"
                  style={{ background: "#064E3B" }}
                />

                {/* Card Left: Content Details */}
                <div className="flex-1 flex flex-col justify-between space-y-6 relative z-10">
                  <div className="space-y-4">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono font-bold tracking-wider" style={{ color: "#064E3B" }}>
                        0{index + 1}
                      </span>
                      <span
                        className="text-[9px] font-mono tracking-widest font-extrabold uppercase px-2.5 py-1 rounded-full border"
                        style={{
                          backgroundColor: "rgba(6,78,59,0.10)",
                          color: "#064E3B",
                          borderColor: "rgba(6,78,59,0.25)",
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-1">
                      <h3
                        className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight group-hover:text-[#064E3B] transition-colors"
                        style={{ color: dm ? "#ffffff" : "#0D1F17" }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-xs font-bold tracking-wide"
                        style={{ color: dm ? "rgba(255,255,255,0.40)" : "rgba(6,78,59,0.70)" }}
                      >
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p
                      className="text-xs sm:text-sm leading-relaxed line-clamp-3"
                      style={{ color: dm ? "rgba(255,255,255,0.50)" : "rgba(13,31,23,0.65)" }}
                    >
                      {project.desc}
                    </p>
                  </div>

                  {/* Tags & Metric Highlights */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {project.metrics.slice(0, 1).map((met, mIdx) => (
                        <div
                          key={mIdx}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border"
                          style={{
                            backgroundColor: dm ? "rgba(255,255,255,0.03)" : "rgba(6,78,59,0.06)",
                            borderColor: dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.12)",
                            color: dm ? "rgba(255,255,255,0.8)" : "rgba(13,31,23,0.85)",
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#064E3B" }} />
                          {met}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9px] font-mono px-2 py-0.5 rounded border font-semibold"
                          style={{
                            backgroundColor: dm ? "rgba(6,78,59,0.35)" : "rgba(6,78,59,0.06)",
                            borderColor: dm ? "rgba(52,211,153,0.35)" : "rgba(6,78,59,0.12)",
                            color: dm ? "#34D399" : "#064E3B",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span
                          className="text-[9px] font-mono px-1.5 py-0.5 font-semibold"
                          style={{ color: dm ? "rgba(52,211,153,0.7)" : "rgba(13,31,23,0.5)" }}
                        >
                          +{project.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Right: Image */}
                <div className="w-full md:w-[320px] lg:w-[360px] h-[200px] md:h-auto min-h-[180px] relative rounded-2xl overflow-hidden shadow-inner flex-shrink-0 z-10 self-stretch">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-[10px] font-bold tracking-wider uppercase border border-white/10 backdrop-blur-sm transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    View Details
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="relative w-full max-w-2xl rounded-2xl border overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
              style={{
                backgroundColor: dm ? "#020D0A" : "#F8E7C9",
                borderColor: dm ? "rgba(255,255,255,0.1)" : "rgba(6,78,59,0.2)",
                color: dm ? "#ffffff" : "#0D1F17",
              }}
            >
              {/* Header Image banner */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all border border-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 left-5 z-20">
                  <span className="text-[9px] font-mono tracking-widest font-extrabold uppercase bg-[#064E3B] text-white px-2 py-0.5 rounded">
                    {activeProject.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white mt-1.5">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-300 mt-0.5">
                    {activeProject.subtitle}
                  </p>
                </div>
              </div>

              {/* Scrollable details */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs font-mono tracking-widest font-bold uppercase mb-2" style={{ color: "#064E3B" }}>
                    PROJECT OVERVIEW
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: dm ? "rgba(255,255,255,0.75)" : "rgba(13,31,23,0.80)" }}>
                    {activeProject.longDesc}
                  </p>
                </div>

                {/* Features & Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <h4 className="text-xs font-mono tracking-widest font-bold uppercase mb-2" style={{ color: "#064E3B" }}>
                      KEY FEATURES
                    </h4>
                    <ul className="space-y-1.5">
                      {activeProject.features.map((feature, fIdx) => (
                        <li key={fIdx} className="text-xs flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#064E3B" }} />
                          <span style={{ color: dm ? "rgba(255,255,255,0.6)" : "rgba(13,31,23,0.75)" }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono tracking-widest font-bold uppercase mb-2" style={{ color: "#064E3B" }}>
                      HIGHLIGHTS
                    </h4>
                    <ul className="space-y-1.5">
                      {activeProject.metrics.map((metric, mIdx) => (
                        <li key={mIdx} className="text-xs flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#064E3B" }} />
                          <span style={{ color: dm ? "rgba(255,255,255,0.6)" : "rgba(13,31,23,0.75)" }}>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags assembly */}
                <div className="border-t border-dashed pt-5 flex flex-wrap items-center gap-1.5" style={{ borderColor: "rgba(6,78,59,0.2)" }}>
                  <span className="text-[10px] font-mono tracking-widest font-bold uppercase mr-1" style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}>
                    TECH STACK:
                  </span>
                  {activeProject.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-md border font-semibold"
                      style={{
                        backgroundColor: dm ? "rgba(6,78,59,0.35)" : "rgba(6,78,59,0.06)",
                        borderColor: dm ? "rgba(52,211,153,0.35)" : "rgba(6,78,59,0.12)",
                        color: dm ? "#34D399" : "#064E3B",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sticky bottom CTA actions */}
              <div
                className="p-4 border-t flex items-center justify-end gap-3"
                style={{
                  borderColor: dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.12)",
                  backgroundColor: dm ? "rgba(0,0,0,0.30)" : "rgba(248,231,201,0.50)",
                }}
              >
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                  style={{ color: dm ? "rgba(255,255,255,0.5)" : "rgba(13,31,23,0.6)" }}
                >
                  Close
                </button>
                <a
                  href="https://github.com/Dhanush0910"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-lg transition-all"
                  style={{
                    backgroundColor: "#064E3B",
                    boxShadow: "0 4px 12px rgba(6,78,59,0.3)",
                  }}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
