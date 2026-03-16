import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Mail, MapPin, Phone, X } from "lucide-react";
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
  const [whatsappOpen, setWhatsappOpen] = useState(false);
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

  // Handle active nav state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "over-mij", "diensten", "werkgebied", "contact"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          current = section;
        }
      }
      setActiveSection(current);
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
    { id: "werkgebied", label: "WERKGEBIED" },
    { id: "contact", label: "CONTACT" },
  ];

  const services = [
    "Aankoop woning",
    "Hypotheekaanvraag",
    "Oversluiten hypotheek",
    "Waardebepaling",
    "Echtscheiding",
    "Nalatenschap",
  ];

  const reasons = [
    "NRVT geregistreerd",
    "Onafhankelijk",
    "Lokale marktkennis",
    "Snel beschikbaar",
    "Persoonlijk contact",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1B2A44]/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="cursor-pointer" 
            onClick={() => scrollTo("hero")}
          >
            <img
              src="/salomons-logo-transparent.png"
              alt="Salomons Makelaardij"
              className="h-14 w-auto"
              style={{ mixBlendMode: "screen" }}
            />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm tracking-wider font-medium transition-all duration-300 border-b-2 py-1 ${
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
          <div className="absolute inset-0 bg-[#0F172A]/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight drop-shadow-lg font-serif">
            Onafhankelijke woningtaxaties
            <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl text-white/90">
              in Den Helder en de Kop van Noord-Holland
            </span>
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.vastgoedcert.nl/makelaar/r-salomons/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-vastgoedcert"
              className="inline-flex items-center gap-2 border border-white/40 text-white/90 hover:bg-white/10 hover:border-white/70 transition-all px-5 py-2 text-sm tracking-widest uppercase rounded-none backdrop-blur-sm"
            >
              ✓ Gecertificeerd via VastgoedCert
            </a>
            <a
              href="https://www.nrvt.nl/voor-opdrachtgevers/zoek-een-register-taxateur/taxateur/10760"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-nrvt"
              className="inline-flex items-center gap-2 border border-white/40 text-white/90 hover:bg-white/10 hover:border-white/70 transition-all px-5 py-2 text-sm tracking-widest uppercase rounded-none backdrop-blur-sm"
            >
              ✓ Register Taxateur NRVT
            </a>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-white/80 text-sm md:text-base tracking-widest uppercase">
            {navItems.map((item, i) => (
              <span key={item.id} className="flex items-center gap-2">
                <button 
                  onClick={() => scrollTo(item.id)}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
                {i < navItems.length - 1 && <span className="text-primary">•</span>}
              </span>
            ))}
          </div>

          <div className="mt-12">
            <Button 
              size="lg" 
              onClick={() => scrollTo("contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-none tracking-wide shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              Taxatie aanvragen
            </Button>
          </div>
        </div>
      </section>

      {/* OVER MIJ SECTION */}
      <section id="over-mij" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <img
                src="/romy-salomons.jpg"
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
              Als erkend NRVT taxateur wonen verzorg ik <strong className="text-foreground font-semibold">onafhankelijke</strong> en zorgvuldig onderbouwde taxaties in Den Helder en de Kop van Noord-Holland. <strong className="text-foreground font-semibold">Persoonlijk contact en duidelijke communicatie</strong> staan centraal in mijn werkwijze.
            </p>
          </div>
        </div>
      </section>

      {/* DIENSTEN SECTION */}
      <section id="diensten" className="py-24 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-foreground font-serif">Woningtaxaties voor</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-shadow bg-card">
                <CardContent className="p-8 flex items-center gap-4">
                  <div className="w-3 h-3 rotate-45 bg-primary shrink-0" />
                  <span className="text-lg font-medium text-card-foreground">{service}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section id="waarom-kiezen" className="py-24 px-6 bg-[#1B2A44] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          <div className="space-y-12">
            <h2 className="text-4xl font-serif leading-tight">
              Waarom kiezen voor<br />
              <span className="text-primary">Salomons Makelaardij?</span>
            </h2>
            <ul className="space-y-6">
              {reasons.map((reason, i) => (
                <li key={i} className="flex items-center gap-4 text-xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-white/90">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full max-w-md">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=4.4,52.5,5.3,53.1&layer=mapnik&marker=52.9563,4.7601"
                width="100%"
                height="420"
                style={{ border: 0, display: "block" }}
                title="Kaart Noord-Holland – Den Helder"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#1B2A44]/80 backdrop-blur-sm px-4 py-3 text-center">
                <p className="text-white text-sm font-medium tracking-wide">Werkgebied: Den Helder & Kop van Noord-Holland</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WERKGEBIED SECTION */}
      <section id="werkgebied" className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl text-foreground font-serif">Werkgebied</h2>
        <div className="w-16 h-1 bg-primary mx-auto mt-4 mb-8" />
        <p className="text-xl text-muted-foreground leading-relaxed">
          Actief in Den Helder en omliggende plaatsen binnen een straal van circa 20 km, waaronder Julianadorp, Schagen, Anna Paulowna en Hollands Kroon.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-2xl border-0 overflow-hidden bg-card">
            <div className="grid grid-cols-1 md:grid-cols-5">
              
              {/* Contact Info Left Panel */}
              <div className="md:col-span-2 bg-[#1B2A44] text-white p-10 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="mb-8">
                    <img
                      src="/salomons-logo-transparent.png"
                      alt="Salomons Makelaardij"
                      className="h-16 w-auto"
                      style={{ mixBlendMode: "screen" }}
                    />
                  </div>
                  
                  <h3 className="text-2xl font-serif mb-2">Salomons Makelaardij</h3>
                  <p className="text-primary font-medium tracking-wide text-sm uppercase mb-12">NRVT taxateur wonen</p>
                  
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
                              <Input placeholder="Uw volledige naam" className="bg-background" {...field} />
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
                              <Input type="email" placeholder="uw@email.nl" className="bg-background" {...field} />
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
                              <Input type="tel" placeholder="06 12345678" className="bg-background" {...field} />
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
                              <Input placeholder="bijv. Den Helder" className="bg-background" {...field} />
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
                              className="min-h-[120px] bg-background resize-none" 
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
                        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 shadow-lg hover:shadow-xl transition-all"
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
      <footer className="bg-[#0F172A] py-10 text-center text-white/50 text-sm">
        <div className="max-w-4xl mx-auto px-6">

          {/* Logos & phone row */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">

            {/* Phone */}
            <a href="tel:0223234040" data-testid="link-footer-phone" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-base font-medium">
              <Phone className="w-4 h-4 text-primary" />
              0223 – 23 40 40
            </a>

            {/* VastgoedCert logo link */}
            <a
              href="https://www.vastgoedcert.nl/makelaar/r-salomons/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-vastgoedcert"
              className="opacity-70 hover:opacity-100 transition-opacity"
              title="VastgoedCert – gecertificeerd taxateur"
            >
              <img
                src="/vastgoedcert-logo.png"
                alt="VastgoedCert"
                className="h-14 w-auto brightness-0 invert"
              />
            </a>

            {/* NRVT logo link */}
            <a
              href="https://www.nrvt.nl/voor-opdrachtgevers/zoek-een-register-taxateur/taxateur/10760"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-nrvt"
              className="opacity-70 hover:opacity-100 transition-opacity"
              title="NRVT – Register Taxateur Wonen"
            >
              <img
                src="/nrvt-logo.svg"
                alt="NRVT"
                className="h-10 w-auto brightness-0 invert"
              />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/romysalomons?originalSubdomain=nl"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-linkedin"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              title="LinkedIn profiel Romy Salomons"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-6 text-white/40 text-xs">
              <Link href="/taxatie" className="hover:text-white/70 transition-colors">
                Taxatierapport aanvragen
              </Link>
              <Link href="/privacyverklaring" className="hover:text-white/70 transition-colors">
                Privacyverklaring
              </Link>
            </div>
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
                <img src="/romy-salomons.jpg" alt="Romy Salomons" className="w-full h-full object-cover object-top" />
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
