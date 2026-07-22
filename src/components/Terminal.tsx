import { useState, useRef, useEffect, ReactNode } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Play } from "lucide-react";

interface TerminalProps {
  isDarkMode: boolean;
}

interface LogEntry {
  command: string;
  output: string | ReactNode;
}

export default function Terminal({ isDarkMode }: TerminalProps) {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      command: "system-init",
      output: (
        <div className="space-y-1">
          <p className="font-bold" style={{ color: "#064E3B" }}>DHANUSH SHELL CORE [v2.0.0]</p>
          <p className="opacity-60">Initializing full-stack developer environment...</p>
          <p className="opacity-80">Type <span style={{ color: "#064E3B" }}>help</span> to explore console systems, or click the quick-run pills below.</p>
        </div>
      )
    }
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    let output: ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="grid grid-cols-2 gap-2 text-xs py-1">
            <p><span className="font-semibold" style={{ color: "#064E3B" }}>about</span> — Bio summary &amp; skills</p>
            <p><span className="font-semibold" style={{ color: "#064E3B" }}>skills</span> — Tech stack proficiency</p>
            <p><span className="font-semibold" style={{ color: "#064E3B" }}>projects</span> — Featured project listings</p>
            <p><span className="font-semibold" style={{ color: "#064E3B" }}>contact</span> — Contact &amp; social links</p>
            <p><span className="font-semibold" style={{ color: "#064E3B" }}>certs</span> — Certifications earned</p>
            <p><span className="font-semibold" style={{ color: "#064E3B" }}>clear</span> — Wipe command prompt logs</p>
          </div>
        );
        break;

      case "about":
        output = (
          <p className="leading-relaxed">
            I'm Dhanush T, a Software Developer from Chennai, India. I specialize in building AI-powered applications and full-stack web systems using Python, React.js, Flask, and Node.js. Skilled in REST API-driven apps, database-integrated solutions, and AI-assisted workflows with the Gemini API. Currently seeking full-stack, software or Python developer roles.
          </p>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 py-1">
            {[
              { name: "Python / Flask / REST APIs", level: 90 },
              { name: "React.js / JavaScript / TypeScript", level: 88 },
              { name: "AI Integration (Gemini API)", level: 85 },
              { name: "MySQL / PostgreSQL", level: 82 },
              { name: "Node.js / Backend Systems", level: 80 },
              { name: "Git / Docker / CI-CD", level: 78 },
            ].map((s, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex justify-between text-[11px]">
                  <span>{s.name}</span>
                  <span style={{ color: "#064E3B" }}>{s.level}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(6,78,59,0.15)" }}>
                  <div className="h-full rounded-full" style={{ width: `${s.level}%`, background: "#064E3B" }} />
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1 py-1">
            <p><span style={{ color: "#064E3B" }}>1. NTalent – ATS Resume Matcher</span> — Python, Gemini API, Flask</p>
            <p><span style={{ color: "#064E3B" }}>2. AI Incident Detection System</span> — Python, Flask, React.js, MySQL</p>
            <p><span style={{ color: "#064E3B" }}>3. Warehouse Management Chatbot</span> — React.js, Node.js, REST APIs</p>
          </div>
        );
        break;

      case "certs":
        output = (
          <div className="space-y-1 py-1">
            <p><span style={{ color: "#064E3B" }}>✓</span> Certified Software Developer – Python, IOPPC (Mar 2025)</p>
            <p><span style={{ color: "#064E3B" }}>✓</span> Full-Stack Web Development, Coursera (Jan 2025)</p>
            <p><span style={{ color: "#064E3B" }}>✓</span> AWS Academy Cloud Foundations, AWS (Sep 2024)</p>
            <p><span style={{ color: "#064E3B" }}>✓</span> JavaScript &amp; React.js Essential Training, LinkedIn (May 2024)</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 py-1">
            <p>GitHub: <a href="https://github.com/Dhanush0910" target="_blank" rel="noreferrer" className="underline" style={{ color: "#064E3B" }}>github.com/Dhanush0910</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/dhanush-t" target="_blank" rel="noreferrer" className="underline" style={{ color: "#064E3B" }}>linkedin.com/in/dhanush-t</a></p>
            <p>Email: <span style={{ color: "#064E3B" }}>dhanush102003@gmail.com</span></p>
            <p>Phone: <span style={{ color: "#064E3B" }}>+91 6385457021</span></p>
            <p>Status: <span style={{ color: "#064E3B" }}>Open to Full-Stack, Software &amp; Python Developer roles</span></p>
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        setInput("");
        return;

      default:
        output = (
          <p className="text-red-400">
            Command not recognized: &quot;{cmd}&quot;. Type <span style={{ color: "#064E3B" }}>help</span> for available options.
          </p>
        );
    }

    setLogs(prev => [...prev, { command: cmd, output }]);
    setInput("");
  };

  const handleQuickRun = (cmd: string) => {
    handleCommand(cmd);
  };

  const dm = isDarkMode;

  return (
    <div
      className="rounded-2xl border font-mono text-xs overflow-hidden shadow-2xl flex flex-col h-[400px] backdrop-blur-md transition-all duration-500"
      style={{
        backgroundColor: dm ? "rgba(2,13,10,0.92)" : "rgba(255,250,240,0.95)",
        borderColor: dm ? "rgba(255,255,255,0.08)" : "rgba(6,78,59,0.15)",
        color: dm ? "#ffffff" : "#0D1F17",
        boxShadow: dm ? "0 20px 50px -10px rgba(0,0,0,0.8)" : "0 20px 40px -10px rgba(6,78,59,0.12)",
      }}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{
          borderColor: dm ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.10)",
          backgroundColor: dm ? "rgba(0,0,0,0.40)" : "rgba(248,231,201,0.60)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#064E3B" }} />
          <span className="text-[10px] ml-2 uppercase font-semibold flex items-center gap-1.5" style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}>
            <TerminalIcon className="w-3.5 h-3.5" style={{ color: "#064E3B" }} />
            dhanush@developer-node: ~
          </span>
        </div>
        <div className="text-[9px] font-bold tracking-widest uppercase" style={{ color: dm ? "rgba(255,255,255,0.25)" : "rgba(13,31,23,0.35)" }}>
          STABLE SHELL
        </div>
      </div>

      {/* Screen logs area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-5 overflow-y-auto space-y-4 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {logs.map((log, idx) => (
          <div key={idx} className="space-y-1">
            {log.command !== "system-init" && (
              <div className="flex items-center gap-1 font-semibold" style={{ color: "#064E3B" }}>
                <span>&gt;</span>
                <span>{log.command}</span>
              </div>
            )}
            <div className="leading-relaxed font-normal" style={{ color: dm ? "rgba(255,255,255,0.85)" : "rgba(13,31,23,0.85)" }}>
              {log.output}
            </div>
          </div>
        ))}
      </div>

      {/* Quick click command pills */}
      <div
        className="px-5 py-2.5 border-t flex flex-wrap gap-1.5 items-center"
        style={{
          borderColor: dm ? "rgba(255,255,255,0.04)" : "rgba(6,78,59,0.08)",
          backgroundColor: dm ? "rgba(0,0,0,0.20)" : "rgba(248,231,201,0.40)",
        }}
      >
        <span className="text-[10px] font-semibold uppercase mr-1 flex items-center gap-1" style={{ color: dm ? "rgba(255,255,255,0.35)" : "rgba(13,31,23,0.45)" }}>
          <Play className="w-2.5 h-2.5" /> Quick Execute:
        </span>
        {["about", "skills", "projects", "certs", "contact", "clear"].map(cmd => (
          <button
            key={cmd}
            onClick={() => handleQuickRun(cmd)}
            className="px-2 py-0.5 rounded border text-[10px] font-semibold transition-all cursor-pointer"
            style={{
              backgroundColor: dm ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.06)",
              borderColor: dm ? "rgba(255,255,255,0.08)" : "rgba(6,78,59,0.12)",
              color: dm ? "rgba(255,255,255,0.6)" : "rgba(6,78,59,0.8)",
            }}
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Prompt input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(input);
        }}
        className="flex items-center px-5 py-3 border-t"
        style={{
          borderColor: dm ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.10)",
          backgroundColor: dm ? "rgba(0,0,0,0.35)" : "rgba(248,231,201,0.60)",
        }}
      >
        <span className="font-bold mr-2" style={{ color: "#064E3B" }}>&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command (e.g. skills)..."
          className="flex-1 bg-transparent border-none outline-none focus:ring-0 font-mono text-xs"
          style={{ color: dm ? "#ffffff" : "#0D1F17" }}
        />
        <button
          type="submit"
          className="p-1 transition-colors cursor-pointer"
          style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(6,78,59,0.5)" }}
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
