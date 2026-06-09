import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";

/**
 * Fixed bottom-right back-to-top button that fades in once the user has
 * scrolled past a threshold.
 *
 * The live chat widget is provided by Tawk.to (embedded in index.html), so
 * this component no longer renders a chat launcher.
 *
 * Mounted once at the router root so it appears on every route.
 */
export function FloatingActions() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 left-5 md:bottom-6 md:left-6 z-[60] flex flex-col items-start gap-3 pointer-events-none">
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
    </div>
  );
}
