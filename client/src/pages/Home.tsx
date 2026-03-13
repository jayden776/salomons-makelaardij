import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Mail, MapPin, Phone } from "lucide-react";
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
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => scrollTo("hero")}
          >
            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-primary-foreground font-serif text-2xl group-hover:bg-primary/90 transition-colors">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl leading-none text-white tracking-wide">Salomons</span>
              <span className="text-[10px] tracking-[0.2em] text-white/70 mt-1">MAKELAARDIJ</span>
            </div>
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
          {/* landing page hero dark harbor boats landscape */}
          <img
            src="https://images.unsplash.com/photo-1528127269322-539801943592?w=1600&q=80"
            alt="Den Helder Harbor"
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
              {/* Profile photo placeholder */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt="Romy Salomons"
                className="w-full h-full object-cover"
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
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
          
          <div className="hidden lg:flex items-center justify-center opacity-80 mix-blend-screen">
            {/* Generic map placeholder styling */}
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Nl-map-NordHolland.png/400px-Nl-map-NordHolland.png" 
              alt="Noord Holland Map" 
              className="max-w-md w-full drop-shadow-2xl grayscale invert"
            />
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
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded bg-primary flex items-center justify-center text-primary-foreground font-serif text-3xl">
                      S
                    </div>
                    <div className="flex flex-col">
                      <span className="font-serif text-2xl leading-none text-white tracking-wide">Salomons</span>
                      <span className="text-xs tracking-[0.2em] text-white/70 mt-1">MAKELAARDIJ</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-serif mb-2">Salomons Makelaardij</h3>
                  <p className="text-primary font-medium tracking-wide text-sm uppercase mb-12">NRVT taxateur wonen</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-white/80">
                      <Phone className="w-6 h-6 text-primary" />
                      <span className="text-lg">06 – 12 34 56 78</span>
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
      <footer className="bg-[#0F172A] py-8 text-center text-white/50 text-sm">
        <p>&copy; {new Date().getFullYear()} Salomons Makelaardij. Alle rechten voorbehouden.</p>
      </footer>
    </div>
  );
}
