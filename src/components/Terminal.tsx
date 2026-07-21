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
          <p className="font-bold" style={{ color: "#064E3B" }}>DHANUSH SHELL CORE [v4.2.0]</p>
          <p className="opacity-60">Initializing 20-year full-stack environment...</p>
          <p className="opacity-80">Type <span style={{ color: "#064E3B" }}>help</span> to explore console systems, or click the quick-run pills below.</p>
        </div>
      )
    }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    let output: ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="grid grid-cols-2 gap-2 text-xs py-1">
            <p><span className="font-semibold" style={{ color: "#064E3B" }}>about</span> — Bio summary &amp; craft details</p>
            <p><span className="font-semibold" style={{ color: "#064E3B" }}>skills</span> — Visual ratings on major stacks</p>
            <p><span className="font-semibold" style={{ color: "#064E3B" }}>projects</span> — Active micro-service listings</p>
            <p><span className="font-semibold" style={{ color: "#064E3B" }}>contact</span> — Coordinate access links</p>
            <p><span className="font-semibold" style={{ color: "#064E3B" }}>clear</span> — Wipe command prompt logs</p>
          </div>
        );
        break;

      case "about":
        output = (
          <p className="leading-relaxed">
            I am Dhanush, a Principal Architect &amp; Fullstack Craftsman with 20 years of real-world production experience. Specialized in structuring high-performance distributed microservices, rendering engines, and accessible design systems. My ethos lies in executing rigid architectural consistency with visually rich pixel control.
          </p>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 py-1">
            {[
              { name: "TypeScript / Fullstack Architecture", level: 98 },
              { name: "React Native & Mobile Systems", level: 94 },
              { name: "Distributed Microservices & Serverless", level: 96 },
              { name: "UI/UX & Modern Motion Specs", level: 92 },
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
            <p><span style={{ color: "#064E3B" }}>1. Mobile App Development</span> — Native iOS &amp; Android Apps</p>
            <p><span style={{ color: "#064E3B" }}>2. Web Development</span> — High-Throughput APIs &amp; Frontends</p>
            <p><span style={{ color: "#064E3B" }}>3. UI/UX Design</span> — Fluid Micro-Interactions &amp; Design Systems</p>
            <p><span style={{ color: "#064E3B" }}>4. Digital Marketing</span> — SEO &amp; Data Telemetry</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 py-1">
            <p>GitHub: <a href="https://github.com/dhanush102003" target="_blank" rel="noreferrer" className="underline" style={{ color: "#064E3B" }}>github.com/dhanush102003</a></p>
            <p>Email: <span style={{ color: "#064E3B" }}>dhanush@portfolio.dev</span></p>
            <p>Status: Available for Architecture &amp; Lead Roles</p>
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
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
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
        <div ref={bottomRef} />
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
        {["about", "skills", "projects", "contact", "clear"].map(cmd => (
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
