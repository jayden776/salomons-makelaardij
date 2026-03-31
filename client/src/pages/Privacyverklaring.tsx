import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Privacyverklaring() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="bg-[#122939] px-6 py-4 flex items-center gap-4">
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
        <div className="max-w-3xl mx-auto font-sans">
          <h1 className="text-4xl font-serif text-foreground mb-2">Privacyverklaring</h1>
          <div className="w-12 h-1 bg-primary mb-10" />

          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-serif text-foreground mb-3">1. Verantwoordelijke</h2>
              <p>
                Salomons Makelaardij, gevestigd te Den Helder, is verantwoordelijk voor de verwerking van
                persoonsgegevens zoals omschreven in deze privacyverklaring.
              </p>
              <p className="mt-2">
                <strong>Contactgegevens:</strong><br />
                Salomons Makelaardij<br />
                Den Helder, Nederland<br />
                Telefoon: 0223 – 23 40 40<br />
                E-mail: info@salomonsmakelaardij.nl
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-foreground mb-3">2. Persoonsgegevens die wij verwerken</h2>
              <p>
                Salomons Makelaardij verwerkt persoonsgegevens die u zelf aan ons verstrekt via het contactformulier
                of anderszins. Het gaat om de volgende gegevens:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Voor- en achternaam</li>
                <li>E-mailadres</li>
                <li>Telefoonnummer</li>
                <li>Bericht / toelichting</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-serif text-foreground mb-3">3. Doel en grondslag van verwerking</h2>
              <p>
                Wij verwerken uw persoonsgegevens uitsluitend voor de volgende doeleinden:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Het beantwoorden van uw vragen en verzoeken via het contactformulier</li>
                <li>Het uitvoeren van taxatieopdrachten waarvoor u een aanvraag heeft ingediend</li>
                <li>Het voldoen aan wettelijke verplichtingen</li>
              </ul>
              <p className="mt-3">
                De grondslag voor verwerking is uw toestemming dan wel de uitvoering van een overeenkomst waarbij
                u partij bent (artikel 6 lid 1 sub a en b AVG).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-foreground mb-3">4. Bewaartermijn</h2>
              <p>
                Salomons Makelaardij bewaart uw persoonsgegevens niet langer dan strikt noodzakelijk is voor de
                doeleinden waarvoor ze zijn verzameld. Gegevens uit het contactformulier worden uiterlijk na twee
                jaar verwijderd, tenzij een lopende opdracht een langere bewaring vereist.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-foreground mb-3">5. Delen met derden</h2>
              <p>
                Salomons Makelaardij verkoopt uw gegevens niet aan derden en verstrekt deze uitsluitend indien dit
                nodig is voor de uitvoering van onze dienstverlening of om te voldoen aan een wettelijke verplichting.
                Met bedrijven die uw gegevens verwerken in opdracht van ons, sluiten wij een verwerkersovereenkomst.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-foreground mb-3">6. Cookies</h2>
              <p>
                Deze website maakt gebruik van functionele cookies die noodzakelijk zijn voor de werking van de
                website. Er worden geen analytische of marketingcookies geplaatst zonder uw toestemming.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-foreground mb-3">7. Uw rechten</h2>
              <p>U heeft het recht om:</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Inzage te vragen in de persoonsgegevens die wij van u verwerken</li>
                <li>Onjuiste gegevens te laten corrigeren</li>
                <li>Uw gegevens te laten verwijderen ("recht op vergetelheid")</li>
                <li>Bezwaar te maken tegen de verwerking</li>
                <li>Uw toestemming in te trekken</li>
              </ul>
              <p className="mt-3">
                Stuur uw verzoek naar info@salomonsmakelaardij.nl. Wij reageren binnen vier weken.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-foreground mb-3">8. Klachten</h2>
              <p>
                Heeft u een klacht over de verwerking van uw persoonsgegevens? Neem dan contact met ons op. U heeft
                ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens via{" "}
                <a
                  href="https://www.autoriteitpersoonsgegevens.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  www.autoriteitpersoonsgegevens.nl
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-serif text-foreground mb-3">9. Wijzigingen</h2>
              <p>
                Salomons Makelaardij behoudt zich het recht voor deze privacyverklaring aan te passen. Wijzigingen
                worden op deze pagina gepubliceerd. Wij adviseren u deze pagina regelmatig te raadplegen.
              </p>
              <p className="mt-2 text-sm text-foreground/50">Laatste update: maart 2026</p>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-[#122939] py-6 text-center text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Salomons Makelaardij. Alle rechten voorbehouden.</p>
      </footer>
    </div>
  );
}
