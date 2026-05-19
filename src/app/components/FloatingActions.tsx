import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, MessageCircle, Send, Sparkles, X } from "lucide-react";

/**
 * Fixed bottom-right floating action stack:
 *   1. Modern chatbot launcher with an expandable preview panel.
 *   2. Back-to-top button that fades in once the user has scrolled past
 *      a threshold.
 *
 * Mounted once at the router root so it appears on every route.
 */
export function FloatingActions() {
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[60] flex flex-col items-end gap-3 pointer-events-none">
      {/* Back-to-top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            key="back-to-top"
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Back to top"
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.85 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.10)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)] flex items-center justify-center text-gray-700 hover:text-amber-600 transition-colors"
          >
            <ArrowUp className="w-5 h-5 md:w-[22px] md:h-[22px]" strokeWidth={2.4} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
      </AnimatePresence>

      {/* Chat launcher */}
      <motion.button
        type="button"
        onClick={() => setChatOpen((o) => !o)}
        aria-label={chatOpen ? "Close chat" : "Open chat"}
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto relative w-14 h-14 md:w-[60px] md:h-[60px] rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 shadow-[0_12px_28px_rgba(245,158,11,0.45)] hover:shadow-[0_16px_36px_rgba(245,158,11,0.55)] transition-shadow flex items-center justify-center text-white"
      >
        {/* Animated ring */}
        <span className="absolute inset-0 rounded-full bg-yellow-400/50 animate-ping pointer-events-none" />
        <span className="absolute inset-0 rounded-full ring-2 ring-white/30 pointer-events-none" />

        <AnimatePresence mode="wait" initial={false}>
          {chatOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              <X className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.4} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Online dot */}
        {!chatOpen && (
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />
        )}
      </motion.button>
    </div>
  );
}

/* ─────────────────────────────  Chat panel  ──────────────────────────── */

type ChatMsg = { from: "bot" | "user"; text: string };

function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      from: "bot",
      text: "Hi! I'm the Beyond Traffic assistant. Ask me about coverage, pricing, or book a quick demo.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { from: "user", text: clean }]);
    setDraft("");
    // Canned response — wire up to a real backend later.
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text:
            "Thanks! A real-time chat assistant is coming soon. Meanwhile, the fastest path is the Book Demo button — our team gets back within a business day.",
        },
      ]);
    }, 700);
  };

  return (
    <motion.div
      key="chat-panel"
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto w-[min(360px,calc(100vw-2.5rem))] max-h-[68vh] rounded-2xl bg-white border border-gray-200 shadow-[0_24px_60px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="relative bg-gradient-to-br from-yellow-500 to-amber-600 px-4 py-3.5 text-white flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner ring-1 ring-white/30">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-sm tracking-tight leading-tight">Beyond Traffic Assistant</p>
          <p className="text-[11px] font-semibold opacity-90 inline-flex items-center gap-1.5">
            <span className="relative inline-flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-300 animate-ping opacity-70" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-300" />
            </span>
            Online · typically replies in 1 min
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 bg-gradient-to-b from-yellow-50/40 to-white"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[85%] text-[13px] leading-relaxed px-3.5 py-2 rounded-2xl ${
                m.from === "bot"
                  ? "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
                  : "bg-gradient-to-br from-yellow-500 to-amber-600 text-white rounded-br-md shadow-sm"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick replies */}
      <div className="px-3 pt-1 pb-2 flex flex-wrap gap-1.5 border-t border-gray-100 bg-white">
        {["See pricing", "Book a demo", "How accurate?"].map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => send(q)}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-amber-700 hover:bg-yellow-100 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 bg-white"
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message…"
          className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!draft.trim()}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 text-white flex items-center justify-center shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
        >
          <Send className="w-4 h-4" strokeWidth={2.3} />
        </button>
      </form>
    </motion.div>
  );
}
