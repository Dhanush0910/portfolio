import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, Mail, User, ShieldCheck, RefreshCw, Github, Linkedin, Phone, MapPin, ExternalLink } from "lucide-react";

interface ContactCardProps {
  isDarkMode: boolean;
}

export default function ContactCard({ isDarkMode }: ContactCardProps) {
  const [formData, setFormData] = useState({ name: "", email: "", msg: "", opportunity: "Full-Time Role" });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: "", email: "", msg: "", opportunity: "Full-Time Role" });
    }, 1800);
  };

  const opportunities = ["Full-Time Role", "Internship", "Freelance / Contract"];
  const dm = isDarkMode;

  const contactLinks = [
    {
      label: "GitHub",
      value: "github.com/Dhanush0910",
      href: "https://github.com/Dhanush0910",
      icon: <Github className="w-4 h-4 text-[#064E3B]" />,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/dhanush-t",
      href: "https://www.linkedin.com/in/dhanush-t/",
      icon: <Linkedin className="w-4 h-4 text-[#064E3B]" />,
    },
    {
      label: "Email",
      value: "dhanush102003@gmail.com",
      href: "mailto:dhanush102003@gmail.com",
      icon: <Mail className="w-4 h-4 text-[#064E3B]" />,
    },
    {
      label: "Phone",
      value: "+91 6385457021",
      href: "tel:+916385457021",
      icon: <Phone className="w-4 h-4 text-[#064E3B]" />,
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-3">
        <span
          className="text-[10px] font-mono tracking-widest font-bold uppercase block"
          style={{ color: "#064E3B" }}
        >
          CONTACT & CONNECT
        </span>
        <h2
          className="text-3xl md:text-4xl font-display font-extrabold tracking-tight"
          style={{ color: dm ? "#ffffff" : "#0D1F17" }}
        >
          Let's{" "}
          <span
            className="italic font-serif font-normal text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(to right, #064E3B, #059669)" }}
          >
            Connect
          </span>
        </h2>
        <p
          className="text-sm max-w-xl mx-auto leading-relaxed"
          style={{ color: dm ? "rgba(255,255,255,0.40)" : "rgba(13,31,23,0.55)" }}
        >
          Open to full-time roles, internships, and freelance opportunities. Feel free to reach out directly or send a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Direct Contact Info Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3 sm:gap-4">
          {contactLinks.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-4 sm:py-4.5 rounded-2xl border flex items-center justify-between group transition-all duration-300 backdrop-blur-md cursor-pointer hover:-translate-y-1 shadow-lg flex-1"
              style={{
                backgroundColor: dm ? "rgba(4,25,18,0.92)" : "rgba(255,250,240,0.95)",
                borderColor: dm ? "rgba(255,255,255,0.08)" : "rgba(6,78,59,0.15)",
                color: dm ? "#ffffff" : "#0D1F17",
              }}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className="p-2.5 rounded-xl transition-colors group-hover:scale-110"
                  style={{ backgroundColor: "rgba(6,78,59,0.12)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <span
                    className="text-[9px] font-mono tracking-widest uppercase font-bold block"
                    style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}
                  >
                    {item.label}
                  </span>
                  <span className="text-xs font-semibold font-mono tracking-wide group-hover:text-[#064E3B] transition-colors">
                    {item.value}
                  </span>
                </div>
              </div>
              <ExternalLink
                className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                style={{ color: "#064E3B" }}
              />
            </motion.a>
          ))}
        </div>

        {/* Right Column: Transmission Form */}
        <div
          className="lg:col-span-7 rounded-2xl border p-6 md:p-8 relative overflow-hidden transition-all duration-700 backdrop-blur-md shadow-2xl"
          style={{
            backgroundColor: dm ? "rgba(4,25,18,0.92)" : "rgba(255,250,240,0.95)",
            borderColor: dm ? "rgba(255,255,255,0.08)" : "rgba(6,78,59,0.15)",
            color: dm ? "#ffffff" : "#0D1F17",
          }}
        >
          {/* Background ambient lighting */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-20 blur-2xl"
            style={{ background: "#064E3B" }}
          />

          <div className="relative z-10">
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
                  <h3 className="text-lg font-display font-bold">Message Sent!</h3>
                  <p className="text-xs mt-2 max-w-sm mx-auto leading-relaxed" style={{ color: dm ? "rgba(255,255,255,0.5)" : "rgba(13,31,23,0.65)" }}>
                    Thanks for reaching out! I'll get back to you as soon as possible — typically within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-lg transition-all cursor-pointer"
                    style={{
                      backgroundColor: "#064E3B",
                      boxShadow: "0 4px 12px rgba(6,78,59,0.3)",
                    }}
                  >
                    Go Back
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
                      <label
                        className="text-[10px] font-mono font-bold uppercase tracking-widest block"
                        style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}
                      >
                        YOUR NAME
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                        <input
                          required
                          type="text"
                          placeholder="e.g. Alex Smith"
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
                      <label
                        className="text-[10px] font-mono font-bold uppercase tracking-widest block"
                        style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}
                      >
                        YOUR EMAIL
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                        <input
                          required
                          type="email"
                          placeholder="e.g. alex@company.com"
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

                  {/* Opportunity selector */}
                  <div className="space-y-1">
                    <label
                      className="text-[10px] font-mono font-bold uppercase tracking-widest block"
                      style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}
                    >
                      OPPORTUNITY TYPE
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {opportunities.map(o => {
                        const isSelected = formData.opportunity === o;
                        return (
                          <button
                            key={o}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, opportunity: o }))}
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
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label
                      className="text-[10px] font-mono font-bold uppercase tracking-widest block"
                      style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}
                    >
                      MESSAGE
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about the opportunity, your company, or how I can help..."
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

                  {/* Footer & Submit button */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-dashed"
                    style={{ borderColor: "rgba(6,78,59,0.2)" }}
                  >
                    <span
                      className="text-[9px] font-mono flex items-center gap-1.5 font-bold tracking-widest uppercase"
                      style={{ color: dm ? "rgba(255,255,255,0.4)" : "rgba(13,31,23,0.5)" }}
                    >
                      <ShieldCheck className="w-4 h-4" style={{ color: "#064E3B" }} />
                      dhanush102003@gmail.com
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
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
