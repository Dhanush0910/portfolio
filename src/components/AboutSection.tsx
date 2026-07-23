import { motion } from "motion/react";
import { User, MapPin, Code2, Sparkles, GraduationCap, Briefcase, Terminal } from "lucide-react";

interface AboutSectionProps {
  isDarkMode: boolean;
}

export default function AboutSection({ isDarkMode }: AboutSectionProps) {
  const dm = isDarkMode;

  const highlights = [
    {
      icon: <Briefcase className="w-4 h-4 text-[#064E3B]" />,
      title: "Current Role",
      value: "Software Developer",
      sub: "Natobotics Technologies, Chennai",
    },
    {
      icon: <GraduationCap className="w-4 h-4 text-[#064E3B]" />,
      title: "Education",
      value: "B.E. Computer Science",
      sub: "Prathyusha Engineering College (CGPA: 8.2)",
    },
    {
      icon: <Code2 className="w-4 h-4 text-[#064E3B]" />,
      title: "Core Stack",
      value: "Python & JavaScript",
      sub: "React.js, Flask, Node.js, REST APIs, MySQL",
    },
    {
      icon: <Sparkles className="w-4 h-4 text-[#064E3B]" />,
      title: "AI Integration",
      value: "Gemini API & ATS Workflows",
      sub: "Log Parsing, Gap Analysis & Automation",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Section Title */}
      <div className="text-center space-y-3">
        <span
          className="text-[10px] font-mono tracking-widest font-bold uppercase block"
          style={{ color: "#064E3B" }}
        >
          PROFILE SUMMARY
        </span>
        <h2
          className="text-3xl md:text-4xl font-display font-extrabold tracking-tight"
          style={{ color: dm ? "#ffffff" : "#0D1F17" }}
        >
          About{" "}
          <span
            className="italic font-serif font-normal text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(to right, #064E3B, #059669)" }}
          >
            Me
          </span>
        </h2>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
        {/* Left: Bio card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 rounded-2xl border p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden"
          style={{
            backgroundColor: dm ? "rgba(4,25,18,0.92)" : "rgba(255,250,240,0.95)",
            borderColor: dm ? "rgba(255,255,255,0.08)" : "rgba(6,78,59,0.15)",
            color: dm ? "#ffffff" : "#0D1F17",
          }}
        >
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl" style={{ background: "rgba(6,78,59,0.12)" }}>
                <User className="w-5 h-5" style={{ color: "#064E3B" }} />
              </span>
              <div>
                <h3 className="text-xl font-display font-bold">Dhanush T</h3>
                <p className="text-xs font-mono flex items-center gap-1 opacity-60">
                  <MapPin className="w-3 h-3" /> Chennai, India
                </p>
              </div>
            </div>

            <div className="h-px w-full" style={{ background: dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.12)" }} />

            <p className="text-sm leading-relaxed" style={{ color: dm ? "rgba(255,255,255,0.85)" : "rgba(13,31,23,0.85)" }}>
              I'm Dhanush T, a Software Developer from Chennai, India. I specialize in building AI-powered applications and full-stack web systems using Python, React.js, Flask, and Node.js. Skilled in REST API-driven apps, database-integrated solutions, and AI-assisted workflows with the Gemini API. Currently seeking full-stack, software developer or Python developer roles.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t flex flex-wrap gap-2 items-center" style={{ borderColor: dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.12)" }}>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-60">Tech Skills:</span>
            {["Python", "React.js", "Flask", "Node.js", "JavaScript", "TypeScript", "REST APIs", "MySQL", "PostgreSQL", "Docker", "Gemini API"].map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[10px] font-mono px-2.5 py-1 rounded-md border font-semibold"
                style={{
                  backgroundColor: dm ? "rgba(6,78,59,0.35)" : "rgba(6,78,59,0.08)",
                  borderColor: dm ? "rgba(52,211,153,0.35)" : "rgba(6,78,59,0.18)",
                  color: dm ? "#34D399" : "#064E3B",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right: Quick Highlight Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-4 rounded-2xl border flex items-start gap-3.5 transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: dm ? "rgba(4,25,18,0.92)" : "rgba(255,250,240,0.95)",
                borderColor: dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.12)",
              }}
            >
              <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: "rgba(6,78,59,0.12)" }}>
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono tracking-widest font-bold uppercase opacity-50 block">
                  {item.title}
                </span>
                <p className="text-xs font-bold font-display" style={{ color: dm ? "#ffffff" : "#0D1F17" }}>
                  {item.value}
                </p>
                <p className="text-[10.5px]" style={{ color: dm ? "rgba(255,255,255,0.55)" : "rgba(13,31,23,0.65)" }}>
                  {item.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
