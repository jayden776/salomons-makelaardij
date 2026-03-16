import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      data-testid="cookie-banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 animate-in slide-in-from-bottom-4 duration-500"
    >
      <div className="bg-[#1B2A44] text-white rounded-xl shadow-2xl p-5 border border-white/10">
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="text-sm font-medium text-white leading-snug">
            Cookies
          </p>
          <button
            onClick={decline}
            data-testid="button-cookie-close"
            className="text-white/50 hover:text-white transition-colors flex-shrink-0 mt-0.5"
            aria-label="Sluiten"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-white/70 leading-relaxed mb-4">
          Wij gebruiken functionele cookies om de website goed te laten werken.
          Er worden geen tracking- of advertentiecookies geplaatst.
        </p>
        <div className="flex gap-2">
          <button
            onClick={accept}
            data-testid="button-cookie-accept"
            className="flex-1 bg-[#C0694A] hover:bg-[#C0694A]/90 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            Accepteren
          </button>
          <button
            onClick={decline}
            data-testid="button-cookie-decline"
            className="flex-1 border border-white/20 hover:border-white/40 text-white/70 hover:text-white text-xs font-semibold py-2 rounded-lg transition-colors"
          >
            Weigeren
          </button>
        </div>
      </div>
    </div>
  );
}
