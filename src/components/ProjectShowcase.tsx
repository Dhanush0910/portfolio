import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Project } from "../types";
import { Github, ExternalLink, Filter, Layers, X, Cpu, Server, Monitor } from "lucide-react";

interface ProjectShowcaseProps {
  isDarkMode: boolean;
}

const projects: Project[] = [
  {
    id: "mobile-app-dev",
    title: "Mobile App Development",
    subtitle: "High-Performance Cross-Platform Clients",
    desc: "Building robust, native-speed iOS & Android systems using React Native, Kotlin, Swift, and real-time offline-first caching schemas.",
    longDesc: "Architecting zero-latency mobile solutions configured with local secure SQL databases, background synchronization routines, and biometric gatekeepers. Every interface is meticulously compiled for responsive performance, rendering complex state animations fluidly at a solid 120Hz.",
    tags: ["React Native", "Swift", "Kotlin", "SQLite", "Framer Motion", "Tailwind CSS"],
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    features: [
      "Offline-first data replication",
      "High-security local biometrics",
      "Dynamic thread offloading for animations",
      "Sub-20ms event bridge pipelines"
    ],
    metrics: ["120Hz Fluid Native Frames", "99.9% Crash-Free Session SLA", "4.8/5 Apple App Store Rating"]
  },
  {
    id: "web-app-dev",
    title: "Web Development",
    subtitle: "Low-Latency Distributed API & Frontends",
    desc: "Engineering scalable web apps, high-throughput microservice controllers, cluster databases, and custom rendering engines.",
    longDesc: "Specialized in microservice clusters distributing heavy concurrent load. By combining edge proxies with lazy-initialized database links and custom caching modules, web gateways deliver reliable, low-overhead operations under massive traffic spikes.",
    tags: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis", "GraphQL", "Docker"],
    category: "Web",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    features: [
      "High-concurrency cluster scheduling",
      "Sub-40ms server lookup latency",
      "Robust type-safe RPC controllers",
      "Horizontal auto-scaling pod orchestration"
    ],
    metrics: ["40M+ API Invocations/Day", "99.99% Core Service Uptime", "<35ms Edge Proxy Latency"]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design & Systems",
    subtitle: "Fluid Micro-Interactions & Modern Aesthetic Guidelines",
    desc: "Designing comprehensive design systems, interactive prototypes, dark/light modes, and intuitive user experiences.",
    longDesc: "Creating responsive design systems tailored for web3, fintech, and developer platforms. Focused on high visual impact, accessible color contrast ratios, spring physics motion specs, and modular UI component libraries.",
    tags: ["Figma", "Design Systems", "UI Animation", "Prototyping", "Design Tokens", "Accessibility"],
    category: "Design",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    features: [
      "Modular design token architecture",
      "Dark & light palette adaptation",
      "Physics-based spring motion guidelines",
      "WCAG 2.1 AA contrast compliance"
    ],
    metrics: ["100+ Reusable UI Components", "4x Faster Design-to-Dev Handoff", "Zero Component Regression"]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & Growth",
    subtitle: "Data-Driven Audience Acquisition & SEO",
    desc: "Optimizing Web Vitals, organic search indexing, social campaigns, and funnel analytics to drive high-converting traffic.",
    longDesc: "Deploying technical SEO setups, automated analytics telemetry, and campaign performance dashboards. Combining page speed optimization with viral messaging structures to amplify brand authority and acquisition pipelines.",
    tags: ["Technical SEO", "Core Web Vitals", "Analytics", "Conversion Funnels", "Growth Hacking"],
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    features: [
      "Core Web Vitals 99+ score tuning",
      "Automated conversion attribution telemetry",
      "Dynamic programmatic meta tag generator",
      "Real-time analytics event tracking"
    ],
    metrics: ["3.4x Organic Traffic Growth", "99+ Lighthouse Performance Score", "42% Boost in Conversion Rate"]
  }
];

const categories = ["All", "Mobile", "Web", "Design", "Marketing"];

export default function ProjectShowcase({ isDarkMode }: ProjectShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Mobile":
        return <Layers className="w-3.5 h-3.5" />;
      case "Web":
        return <Monitor className="w-3.5 h-3.5" />;
      case "Design":
        return <Cpu className="w-3.5 h-3.5" />;
      case "Marketing":
        return <Server className="w-3.5 h-3.5" />;
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
            Our Core{" "}
            <span
              className="italic font-serif font-normal text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(to right, #064E3B, #059669)" }}
            >
              Disciplines
            </span>
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: dm ? "rgba(255,255,255,0.40)" : "rgba(13,31,23,0.55)" }}
          >
            Architecting next-generation digital experiences across major design and development verticals.
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
                  backgroundColor: isActive
                    ? "#064E3B"
                    : "transparent",
                  color: isActive
                    ? "#ffffff"
                    : (dm ? "rgba(255,255,255,0.50)" : "rgba(13,31,23,0.65)"),
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
                          className="text-[9px] font-mono px-2 py-0.5 rounded border"
                          style={{
                            backgroundColor: dm ? "rgba(255,255,255,0.02)" : "rgba(6,78,59,0.04)",
                            borderColor: dm ? "rgba(255,255,255,0.04)" : "rgba(6,78,59,0.08)",
                            color: dm ? "rgba(255,255,255,0.45)" : "rgba(6,78,59,0.65)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span
                          className="text-[9px] font-mono px-1.5 py-0.5"
                          style={{ color: dm ? "rgba(255,255,255,0.3)" : "rgba(13,31,23,0.4)" }}
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
                    Inspect Stack
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
                    ARCHITECTURAL DETAILS
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: dm ? "rgba(255,255,255,0.75)" : "rgba(13,31,23,0.80)" }}>
                    {activeProject.longDesc}
                  </p>
                </div>

                {/* Features & Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <h4 className="text-xs font-mono tracking-widest font-bold uppercase mb-2" style={{ color: "#064E3B" }}>
                      CORE CAPABILITIES
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
                      ENGINEERING OUTCOMES
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
                    ASSEMBLY STACK:
                  </span>
                  {activeProject.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-md border"
                      style={{
                        backgroundColor: dm ? "rgba(255,255,255,0.03)" : "rgba(6,78,59,0.06)",
                        borderColor: dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.12)",
                        color: dm ? "rgba(255,255,255,0.7)" : "rgba(6,78,59,0.85)",
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
                  href="https://github.com/dhanush102003"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-lg transition-all"
                  style={{
                    backgroundColor: "#064E3B",
                    boxShadow: "0 4px 12px rgba(6,78,59,0.3)",
                  }}
                >
                  <Github className="w-4 h-4" />
                  Codebase
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
