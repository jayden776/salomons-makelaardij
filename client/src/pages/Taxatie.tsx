import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Taxatie() {
  const nwwiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nwwiRef.current || nwwiRef.current.childElementCount > 0) return;
    const widget = document.createElement("nwwi-widget");
    widget.setAttribute("data-color", "#f0f2f600");
    widget.setAttribute("data-font", "Montserrat,sans-serif");
    widget.setAttribute("data-company", "179435");
    const script = document.createElement("script");
    script.src = "https://aanvraag.nwwi.nl/_next/static/widgets/nwwi-widget/index.js";
    widget.appendChild(script);
    nwwiRef.current.appendChild(widget);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="bg-[#1B2A44] px-6 py-4 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          Terug naar home
        </Link>
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <img
              src="/salomons-logo-transparent.png"
              alt="Salomons Makelaardij"
              className="h-12 w-auto"
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif text-foreground text-center mb-2">Taxatierapport aanvragen</h1>
          <div className="w-12 h-1 bg-primary mx-auto mb-4" />
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Vraag eenvoudig een gecertificeerd taxatierapport aan via het onderstaande formulier van NWWI.
          </p>
          <div ref={nwwiRef} className="w-full min-h-[300px]" />
        </div>
      </main>

      <footer className="bg-[#0F172A] py-6 text-center text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Salomons Makelaardij. Alle rechten voorbehouden.</p>
      </footer>
    </div>
  );
}
