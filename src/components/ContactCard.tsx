import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, Mail, User, ShieldCheck, RefreshCw } from "lucide-react";

interface ContactCardProps {
  isDarkMode: boolean;
}

export default function ContactCard({ isDarkMode }: ContactCardProps) {
  const [formData, setFormData] = useState({ name: "", email: "", msg: "", budget: "Enterprise ($10k-$50k)" });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: "", email: "", msg: "", budget: "Enterprise ($10k-$50k)" });
    }, 1800);
  };

  const budgets = ["Startup (<$10k)", "Enterprise ($10k-$50k)", "Platform ($50k+)"];
  const dm = isDarkMode;

  return (
    <div
      className="w-full rounded-2xl border p-6 md:p-8 relative overflow-hidden transition-all duration-700 backdrop-blur-md shadow-2xl"
      style={{
        backgroundColor: dm ? "rgba(4,25,18,0.92)" : "rgba(255,250,240,0.95)",
        borderColor: dm ? "rgba(255,255,255,0.08)" : "rgba(6,78,59,0.15)",
        color: dm ? "#ffffff" : "#0D1F17",
        boxShadow: dm ? "0 20px 50px -10px rgba(0,0,0,0.8)" : "0 20px 40px -10px rgba(6,78,59,0.12)",
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-20 blur-2xl" style={{ background: "#064E3B" }} />

      <div className="relative z-10">
        <div className="mb-6">
          <span className="text-[10px] font-mono tracking-widest font-bold uppercase block mb-1" style={{ color: "#064E3B" }}>
            NETWORK PROTOCOL
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight" style={{ color: dm ? "#ffffff" : "#0D1F17" }}>
            Initiate{" "}
            <span
              className="italic font-serif font-normal text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(to right, #064E3B, #059669)" }}
            >
              Transmission
            </span>
          </h2>
          <p className="text-xs mt-1" style={{ color: dm ? "rgba(255,255,255,0.45)" : "rgba(13,31,23,0.60)" }}>
            Secure socket contact interface for technical consulting, software auditing, or architectural leadership.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="py-12 flex flex-col items-center justify-center text-center"
            >
              <motion.div
                initial={{ rotate: -45, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border"
                style={{
                  backgroundColor: "rgba(6,78,59,0.15)",
                  borderColor: "rgba(6,78,59,0.35)",
                  color: "#064E3B",
                  boxShadow: "0 0 20px rgba(6,78,59,0.3)",
                }}
              >
                <CheckCircle className="w-8 h-8" />
              </motion.div>
              <h3 className="text-lg font-display font-bold">Transmission Complete</h3>
              <p className="text-xs mt-2 max-w-sm mx-auto leading-relaxed" style={{ color: dm ? "rgba(255,255,255,0.5)" : "rgba(13,31,23,0.65)" }}>
                Your payload was successfully signed and routed. I will initiate response contact within 12 standard business cycles.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-lg transition-all cursor-pointer"
                style={{
                  backgroundColor: "#064E3B",
                  boxShadow: "0 4px 12px rgba(6,78,59,0.3)",
                }}
              >
                New Session
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest block" style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}>
                    IDENTITY NODE
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Satoshi"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none transition-all"
                      style={{
                        backgroundColor: dm ? "rgba(0,0,0,0.40)" : "rgba(248,231,201,0.60)",
                        borderColor: dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.12)",
                        color: dm ? "#ffffff" : "#0D1F17",
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest block" style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}>
                    ROUTING EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                    <input
                      required
                      type="email"
                      placeholder="e.g. name@network.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none transition-all"
                      style={{
                        backgroundColor: dm ? "rgba(0,0,0,0.40)" : "rgba(248,231,201,0.60)",
                        borderColor: dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.12)",
                        color: dm ? "#ffffff" : "#0D1F17",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Budget selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest block" style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}>
                  BUDGET PROJECTION
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map(b => {
                    const isSelected = formData.budget === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, budget: b }))}
                        className="px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex-1 text-center"
                        style={{
                          backgroundColor: isSelected
                            ? "rgba(6,78,59,0.15)"
                            : (dm ? "rgba(0,0,0,0.30)" : "rgba(248,231,201,0.40)"),
                          borderColor: isSelected
                            ? "rgba(6,78,59,0.35)"
                            : (dm ? "rgba(255,255,255,0.05)" : "rgba(6,78,59,0.10)"),
                          color: isSelected
                            ? "#064E3B"
                            : (dm ? "rgba(255,255,255,0.5)" : "rgba(13,31,23,0.65)"),
                        }}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest block" style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}>
                  PAYLOAD / BRIEF DESCRIPTION
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline your systems target, technology challenges, or project scale details..."
                  value={formData.msg}
                  onChange={(e) => setFormData(prev => ({ ...prev, msg: e.target.value }))}
                  className="w-full text-xs px-4 py-2.5 rounded-xl border focus:outline-none transition-all resize-none"
                  style={{
                    backgroundColor: dm ? "rgba(0,0,0,0.40)" : "rgba(248,231,201,0.60)",
                    borderColor: dm ? "rgba(255,255,255,0.06)" : "rgba(6,78,59,0.12)",
                    color: dm ? "#ffffff" : "#0D1F17",
                  }}
                />
              </div>

              {/* Secure verification foot & CTA button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-dashed" style={{ borderColor: "rgba(6,78,59,0.2)" }}>
                <span className="text-[9px] font-mono flex items-center gap-1.5 font-bold tracking-widest uppercase" style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}>
                  <ShieldCheck className="w-4 h-4" style={{ color: "#064E3B" }} />
                  SSL ENCRYPTED SECURE LINK
                </span>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-xs tracking-wide shadow-lg transition-all cursor-pointer ${
                    status === 'sending' ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  style={{
                    backgroundColor: "#064E3B",
                    boxShadow: "0 4px 12px rgba(6,78,59,0.3)",
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Signing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Dispatch Payload
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
