import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const submitContact = useSubmitContact();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      naam: "",
      email: "",
      telefoonnummer: "",
      plaatsWoning: "",
      bericht: "",
    },
  });

  // Handle active nav state and header transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "over-mij", "diensten", "contact"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          current = section;
        }
      }
      setActiveSection(current);

      const hero = document.getElementById("hero");
      if (hero) {
        setScrolled(window.scrollY > hero.offsetHeight - 80);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSubmit = (data: InsertContact) => {
    submitContact.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Aanvraag succesvol verstuurd",
          description: "Ik neem zo spoedig mogelijk contact met u op.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Er is een fout opgetreden",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const navItems = [
    { id: "over-mij", label: "OVER MIJ" },
    { id: "diensten", label: "DIENSTEN" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#122939] border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="cursor-pointer" 
            onClick={() => scrollTo("hero")}
          >
            <img
              src="/salomons-logo-dark.png"
              alt="Salomons Makelaardij"
              className="h-16 w-auto"
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                className={`text-base tracking-widest font-semibold transition-all duration-300 border-b-2 py-1 ${
                  activeSection === item.id 
                    ? "text-primary border-primary" 
                    : "text-white/80 border-transparent hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpg"
            alt="Den Helder Haven"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0F172A]/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-12 md:px-20 w-full mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-serif inline-block text-left" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}>
            <span className="block">onafhankelijke woningtaxaties</span>
            <span className="block">in den helder en de kop van noord-holland</span>
          </h1>

          <div className="mt-8 flex items-center justify-center gap-3 text-white font-semibold text-sm md:text-base tracking-widest uppercase" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
            <span>NRVT geregistreerd</span>
            <span className="text-primary text-lg">•</span>
            <span>Onafhankelijk</span>
            <span className="text-primary text-lg">•</span>
            <span>Persoonlijk</span>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => scrollTo("contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6 text-base rounded-full tracking-widest font-semibold uppercase shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Neem contact op
            </Button>
            <Button
              size="lg"
              onClick={() => setLocation("/taxatie")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6 text-base rounded-full tracking-widest font-semibold uppercase shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 whitespace-nowrap border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              Taxatierapport aanvragen
            </Button>
          </div>
        </div>
      </section>

      {/* OVER MIJ SECTION */}
      <section id="over-mij" className="min-h-screen overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
          <div className="order-2 md:order-1 flex justify-center">
            <div
              className="relative w-64 md:w-72 aspect-[3/4] overflow-hidden shadow-2xl"
              style={{ borderRadius: "50% 50% 0 0 / 40% 40% 0 0" }}
            >
              <img
                src="/romy-salomons-new.jpg"
                alt="Romy Salomons"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <div>
              <h2 className="text-4xl text-foreground font-serif">Over Romy Salomons</h2>
              <div className="w-16 h-1 bg-primary mt-4" />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Als Register Taxateur Wonen zorg ik voor taxaties die kloppen en duidelijkheid geven. Geen standaard aanpak, maar aandacht voor de woning én de situatie waarin u zich bevindt.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Het vak heb ik in de praktijk geleerd bij Beerse Makelaardij. Daarnaast ben ik actief als makelaar bij Coltof Makelaardij, waardoor ik dagelijks betrokken ben bij de woningmarkt in de regio.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mijn interesse in vastgoed ontstond tijdens mijn werk als property manager in Barcelona. Terug in Den Helder heb ik bewust gekozen om mij verder te specialiseren en heb ik mijn papieren behaald als Register Taxateur Wonen en KRMT-makelaar.
            </p>
            <Button
              onClick={() => scrollTo("contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base rounded-full tracking-wide shadow-md hover:shadow-lg transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Contact opnemen
            </Button>
          </div>
        </div>
      </section>

      {/* DIENSTEN SECTION */}
      <section id="diensten" className="min-h-screen flex overflow-hidden bg-white/50">
        <span id="werkgebied" />
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex-1 flex items-center py-24 px-10 lg:px-16">
            <div className="max-w-xl space-y-6">
              <div>
                <h2 className="text-4xl text-foreground font-serif">Diensten</h2>
                <div className="w-16 h-1 bg-primary mt-4" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Een taxatie vraagt om zorgvuldigheid en kennis van de lokale markt. Ik verzorg onafhankelijke woningtaxaties die helder en goed onderbouwd zijn, bijvoorbeeld bij aankoop, (her)financiering, verbouwing, scheiding of nalatenschap. Iedere situatie vraagt om maatwerk en een persoonlijke benadering.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na het maken van een afspraak kom ik bij u langs om de woning op te nemen en uw situatie te bespreken. Op basis daarvan werk ik de taxatie uit tot een inzichtelijk rapport, waarbij u kunt rekenen op een vlotte en zorgvuldige afhandeling.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Het rapport wordt gecontroleerd door het Nederlands Woning Waarde Instituut (NWWI) en voldoet aan de geldende richtlijnen. U ontvangt een gevalideerd taxatierapport dat door geldverstrekkers wordt geaccepteerd en helder inzicht geeft in de totstandkoming van de waarde.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Als NRVT-geregistreerde taxateur ben ik actief in de Kop van Noord-Holland, in een straal van circa 20 kilometer rondom Den Helder, waaronder Julianadorp, Schagen, Callantsoog, Anna Paulowna, Wieringerwaard, Breezand, Hippolytushoef en Wieringerwerf.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Heeft u een taxatie nodig of wilt u overleggen? U bent van harte welkom om contact op te nemen.
              </p>
              <Button
                onClick={() => scrollTo("contact")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base rounded-full tracking-wide shadow-md hover:shadow-lg transition-all hover:-translate-y-1 whitespace-nowrap"
              >
                Contact opnemen
              </Button>
            </div>
          </div>
          <div className="flex-1 min-h-[400px]">
            <img
              src="/noordzee.png"
              alt="Noordzee - Den Helder"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 bg-[#F5EFE6]">
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-2xl border-0 overflow-hidden bg-card">
            <div className="grid grid-cols-1 md:grid-cols-5">
              
              {/* Contact Info Left Panel */}
              <div className="md:col-span-2 bg-[#122939] text-white p-10 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="mb-10 -mx-10 lg:-mx-14 -mt-10 lg:-mt-14 bg-[#122939] overflow-hidden leading-none">
                    <img
                      src="/salomons-logo-dark.png"
                      alt="Salomons Makelaardij"
                      className="w-full h-auto block"
                      style={{ clipPath: "inset(0 0 3px 0)" }}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-white/80">
                      <Phone className="w-6 h-6 text-primary" />
                      <span className="text-lg">0223 – 23 40 40</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                      <Mail className="w-6 h-6 text-primary" />
                      <span className="text-lg">info@salomonsmakelaardij.nl</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80">
                      <MapPin className="w-6 h-6 text-primary" />
                      <span className="text-lg">Den Helder</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Right Panel */}
              <div className="md:col-span-3 p-10 lg:p-14 bg-card">
                <div className="mb-8">
                  <h2 className="text-3xl font-serif text-foreground">Neem contact op</h2>
                  <div className="w-12 h-1 bg-primary mt-3 mb-4" />
                  <p className="text-muted-foreground">Ik neem doorgaans binnen 24 uur contact met u op.</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="naam"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Naam</FormLabel>
                            <FormControl>
                              <Input placeholder="Uw volledige naam" className="bg-white !rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">E-mail</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="uw@email.nl" className="bg-white !rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="telefoonnummer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Telefoonnummer</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="06 12345678" className="bg-white !rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="plaatsWoning"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Plaats te taxeren woning</FormLabel>
                            <FormControl>
                              <Input placeholder="bijv. Den Helder" className="bg-white !rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="bericht"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Bericht</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Geef hier een korte omschrijving van uw situatie..." 
                              className="min-h-[120px] bg-white rounded-lg resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                      <p className="text-xs text-muted-foreground">
                        Uw gegevens worden vertrouwelijk behandeld.
                      </p>
                      <Button 
                        type="submit" 
                        size="lg" 
                        disabled={submitContact.isPending}
                        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
                      >
                        {submitContact.isPending ? "Verzenden..." : "Verstuur aanvraag"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#122939] py-10 text-center text-white/50 text-sm">
        <div className="max-w-5xl mx-auto px-6">

          {/* Three-column footer layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8 items-center">

            {/* LEFT – contact */}
            <div className="flex flex-col gap-3 items-center md:items-start">
              <p className="text-white font-serif text-lg tracking-wide">Contact</p>
              <a
                href="tel:0223234040"
                data-testid="link-footer-phone"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                0223 – 23 40 40
              </a>
              <a
                href="mailto:info@salomonsmakelaardij.nl"
                data-testid="link-footer-email"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                info@salomonsmakelaardij.nl
              </a>
            </div>

            {/* CENTER – taxatie link */}
            <div className="flex flex-col items-center gap-2 text-center">
              <Link
                href="/taxatie"
                className="text-white font-serif text-lg hover:text-primary transition-colors tracking-wide"
                data-testid="link-footer-taxatie"
              >
                Taxatierapport aanvragen
              </Link>
              <div className="w-8 h-0.5 bg-primary mx-auto" />
              <Link
                href="/privacyverklaring"
                className="text-white/40 text-xs hover:text-white/70 transition-colors"
                data-testid="link-footer-privacy"
              >
                Privacyverklaring
              </Link>
            </div>

            {/* RIGHT – certificates + LinkedIn */}
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-5">
              <a
                href="https://www.vastgoedcert.nl/makelaar/r-salomons/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-vastgoedcert"
                className="opacity-60 hover:opacity-100 transition-opacity"
                title="VastgoedCert"
              >
                <img src="/vastgoedcert-logo.png" alt="VastgoedCert" className="h-16 w-auto brightness-0 invert" />
              </a>
              <a
                href="https://www.nrvt.nl/voor-opdrachtgevers/zoek-een-register-taxateur/taxateur/10760"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-footer-nrvt"
                className="opacity-60 hover:opacity-100 transition-opacity"
                title="NRVT"
              >
                <img src="/nrvt-logo.svg" alt="NRVT" className="h-14 w-auto brightness-0 invert" />
              </a>
              <a
                href="https://www.linkedin.com/in/romysalomons?originalSubdomain=nl"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin"
                className="text-white/60 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5 text-center">
            <p>&copy; {new Date().getFullYear()} Salomons Makelaardij. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {whatsappOpen && (
          <div className="bg-white rounded-2xl shadow-2xl w-80 overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-[#075E54] px-4 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
                <img src="/romy-salomons-new.jpg" alt="Romy Salomons" className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Romy Salomons</p>
                <p className="text-white/70 text-xs">Salomons Makelaardij · Online</p>
              </div>
              <button
                onClick={() => setWhatsappOpen(false)}
                data-testid="button-whatsapp-close"
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#ECE5DD] px-4 py-5">
              <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm max-w-[90%]">
                <p className="text-gray-800 text-sm leading-relaxed">
                  Hallo! 👋 Heeft u vragen over een taxatie of wilt u een afspraak maken? Stuur mij gerust een berichtje.
                </p>
                <p className="text-gray-400 text-[10px] text-right mt-1">Salomons Makelaardij</p>
              </div>
            </div>

            <div className="bg-white px-4 py-4">
              <a
                href="https://wa.me/PLACEHOLDER"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-whatsapp-start"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Start gesprek op WhatsApp
              </a>
            </div>
          </div>
        )}

        <button
          onClick={() => setWhatsappOpen(!whatsappOpen)}
          data-testid="button-whatsapp-toggle"
          className="w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center"
        >
          {whatsappOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
