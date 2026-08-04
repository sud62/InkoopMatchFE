import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/rk/Shell";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our process — InkoopMatch" },
      {
        name: "description",
        content: "How InkoopMatch and Meester Inkoop match procurement, legal and contract professionals to real assignments.",
      },
    ],
  }),
  component: Process,
});

const content = {
  en: {
    kicker: "Our process",
    title: "Not every match starts the same way.",
    subtitle:
      "Some organisations need capacity fast. Others need specific expertise, or someone to take the lead on a project that's stalled. So before anything else, we take the time to understand the actual assignment and the organisation behind it — then work out which form of engagement genuinely fits: secondment, mediation, or project-based work. Sometimes it's a combination.",
    subtitle2:
      "We're not looking for whoever happens to be available. We're looking for someone who actually adds something.",
    features: [
      { title: "A transparent process", desc: "We're clear upfront about how a request is handled, who's involved, and what the next steps look like." },
      { title: "Clear terms", desc: "We pay close attention to agreements — form of engagement, rate, duration, and responsibilities." },
      { title: "Attention to Wet DBA", desc: "We look critically at the nature of the engagement and how the work is actually organised." },
      { title: "WTTA-ready", desc: "We factor in developments around admission, transparency, and responsible provision of labour." },
    ],
    stepsKicker: "How a match comes together",
    steps: [
      { title: "We understand the request", desc: "We start by discussing the assignment, the organisation, and the outcome they're after — so we can look beyond a job title alone." },
      { title: "We look for the right professional", desc: "We compare the request against the knowledge, experience, availability and preferences of professionals in our network." },
      { title: "We discuss the possible match", desc: "When we see a genuine fit, we reach out personally. A candidate is only put forward after alignment and consent." },
      { title: "We guide what comes next", desc: "We support the introduction and the terms of collaboration — and stay involved after the start, not just up to it." },
    ],
    colsTitle1: "For professionals",
    col1: [
      "A good assignment isn't just about the requirements on paper. The content, the working environment, the responsibilities, and room to grow all have to line up too.",
      "That's why we want to understand who you are, what you can do, and what step you're looking to take — before we look at which assignments actually fit.",
      "You don't just get a possible match. You get an explanation of why we think it's worth your time.",
      "Your details are never shared with an organisation without your explicit consent. You stay in control of every next step.",
    ],
    colsTitle2: "For organisations",
    col2Intro: "Filling a role quickly matters. But a match that lasts starts with a clear brief. That's why we look at:",
    col2List: [
      "the substance and goals of the assignment;",
      "the knowledge and experience required;",
      "the stage the organisation or project is at;",
      "the availability and form of engagement needed;",
      "how the team likes to work together;",
      "the environment the professional will step into.",
    ],
    col2Outro:
      "From there we search for and select professionals who fit both on substance and in person. You don't get a stack of CVs — you get a focused shortlist with a clear explanation for each.",
    rolesKicker: "Where we focus",
    rolesIntro: "We work on roles across public and private procurement, contract management, legal support, and project leadership.",
    roles: [
      { title: "Procurement Advisor", desc: "Tactical and strategic procurement questions." },
      { title: "Tender Advisor", desc: "Preparing and guiding tender procedures." },
      { title: "Tender Lawyer", desc: "Legal review, assessment, and procedural precision." },
      { title: "Contract Manager", desc: "Oversight of contracts, suppliers, and performance." },
      { title: "Project Leader", desc: "Direction across procurement and implementation tracks." },
      { title: "Procurement Support", desc: "Support with case files, planning, and contract administration." },
    ],
    toolTitle: "How InkoopMatch fits in",
    toolBody:
      "Matching runs through InkoopMatch, the digital tool behind Meester Inkoop's mediation. It helps us compare assignments and professionals carefully and consistently. It isn't a general job board that forwards CVs without context — technology supports the process, but the substantive judgement and the personal contact stay with our team.",
    ctaTitle: "Want to talk it through?",
    ctaSubtitle: "Looking for a professional for a temporary assignment, project work, or a direct hire? Or curious about your own next step? Get in touch — we'll start with a conversation about what you actually need.",
    ctaButton: "Contact us",
  },
  nl: {
    kicker: "Ons proces",
    title: "Niet elke match begint op dezelfde manier.",
    subtitle:
      "Sommige organisaties hebben snel capaciteit nodig. Andere hebben specifieke expertise nodig, of iemand die de regie neemt op een project dat is vastgelopen. Daarom nemen we eerst de tijd om de opdracht en de organisatie goed in beeld te brengen — en bepalen we welke vorm van inzet echt past: detachering, bemiddeling of projectmatige uitvoering. Soms is het een combinatie.",
    subtitle2:
      "We zoeken niet zomaar iemand die beschikbaar is. We zoeken iemand die daadwerkelijk iets toevoegt.",
    features: [
      { title: "Transparant proces", desc: "We maken vooraf duidelijk hoe de vraag wordt opgepakt, welke rol nodig is en welke vervolgstappen logisch zijn." },
      { title: "Heldere voorwaarden", desc: "We letten op afspraken, inzetvorm, tarief, looptijd en verantwoordelijkheden." },
      { title: "Aandacht voor Wet DBA", desc: "We kijken kritisch naar de aard van de inzet en de manier waarop de opdracht wordt georganiseerd." },
      { title: "Voorbereid op WTTA", desc: "We houden rekening met ontwikkelingen rondom toelating, transparantie en verantwoord ter beschikking stellen van arbeid." },
    ],
    stepsKicker: "Hoe een match tot stand komt",
    steps: [
      { title: "We brengen de vraag in beeld", desc: "Eerst bespreken we de opdracht, de organisatie en het gewenste resultaat. Zo kijken we verder dan alleen een functieprofiel." },
      { title: "We zoeken naar een passende professional", desc: "Daarna vergelijken we de vraag met de kennis, ervaring, beschikbaarheid en voorkeuren van professionals in ons netwerk." },
      { title: "We bespreken de mogelijke match", desc: "Wanneer we een passende combinatie zien, nemen we persoonlijk contact op. Pas na afstemming en toestemming stellen we een kandidaat voor." },
      { title: "We begeleiden de vervolgstappen", desc: "Vervolgens ondersteunen we bij de kennismaking en de afspraken over de samenwerking. Ook na de start blijven we betrokken." },
    ],
    colsTitle1: "Voor professionals",
    col1: [
      "Een passende opdracht gaat niet alleen over functie-eisen. Ook de inhoud, werkomgeving, verantwoordelijkheden en ontwikkelmogelijkheden moeten aansluiten.",
      "Daarom willen we eerst weten wie je bent, wat je kunt en welke stap je wilt zetten. Vervolgens kijken we welke opdrachten daarbij passen.",
      "Je ontvangt niet alleen een mogelijke match, maar ook uitleg waarom wij denken dat de opdracht interessant voor je kan zijn.",
      "Je gegevens worden nooit zonder jouw uitdrukkelijke toestemming met een opdrachtgever gedeeld. Zo houd je zelf de regie.",
    ],
    colsTitle2: "Voor opdrachtgevers",
    col2Intro: "Een openstaande opdracht snel invullen is belangrijk. Toch begint een duurzame match bij een heldere vraag. Daarom kijken we onder andere naar:",
    col2List: [
      "de inhoud en doelstellingen van de opdracht;",
      "de benodigde kennis en ervaring;",
      "de fase waarin de organisatie of het project zich bevindt;",
      "de gewenste beschikbaarheid en inzet;",
      "de manier van samenwerken;",
      "de omgeving waarin de professional terechtkomt.",
    ],
    col2Outro:
      "Op basis daarvan zoeken en selecteren we professionals die inhoudelijk én persoonlijk bij de opdracht passen. U ontvangt geen stapel cv's, maar een gerichte selectie met een duidelijke toelichting.",
    rolesKicker: "Waar we ons op richten",
    rolesIntro: "We richten ons op functies en rollen rondom publieke inkoop, contractmanagement, juridische ondersteuning en projectleiding.",
    roles: [
      { title: "Inkoopadviseur", desc: "Voor tactische en strategische inkoopvraagstukken." },
      { title: "Aanbestedingsadviseur", desc: "Voor het voorbereiden en begeleiden van aanbestedingen." },
      { title: "Aanbestedingsjurist", desc: "Voor juridische toetsing, beoordeling en procedurele scherpte." },
      { title: "Contractmanager", desc: "Voor grip op contracten, leveranciers en prestaties." },
      { title: "Projectleider", desc: "Voor regie op inkoop- en implementatietrajecten." },
      { title: "Inkoopondersteuner", desc: "Voor ondersteuning bij dossiers, planning en contractbeheer." },
    ],
    toolTitle: "Waar Inkoopmatch in past",
    toolBody:
      "De matching verloopt via Inkoopmatch, de digitale tool achter de bemiddeling van Meester Inkoop. Het helpt ons om opdrachten en professionals zorgvuldig en consistent met elkaar te vergelijken. Het is geen algemene vacaturebank waarin cv's zonder context worden doorgestuurd — technologie ondersteunt het proces, maar de inhoudelijke beoordeling en het persoonlijke contact blijven bij ons team.",
    ctaTitle: "Even sparren?",
    ctaSubtitle: "Zoekt u een professional voor een tijdelijke opdracht, projectmatige inzet of een rechtstreeks dienstverband? Of bent u zelf benieuwd naar een volgende stap? Neem contact op — we beginnen met een gesprek over wat u daadwerkelijk nodig heeft.",
    ctaButton: "Neem contact op",
  },
};

function Process() {
  const { language } = useLanguage();
  const c = language === "nl" ? content.nl : content.en;

  return (
    <PageShell>
      <section className="shell" style={{ paddingTop: 36, textAlign: "center" }}>
        <p className="section-kicker">{c.kicker}</p>
        <h1 style={{ marginTop: 12 }}>{c.title}</h1>
        <p style={{ margin: "16px auto 0", maxWidth: 680, color: "var(--muted)" }}>{c.subtitle}</p>
        <p style={{ margin: "10px auto 0", maxWidth: 680, fontWeight: 700 }}>{c.subtitle2}</p>
      </section>

      <section className="proof" style={{ marginTop: 40 }}>
        <div className="shell proof-grid">
          {c.features.map((f) => (
            <article key={f.title}>
              <span className="proof-icon">✓</span>
              <div>
                <strong>{f.title}</strong>
                <p>{f.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="how shell" style={{ marginTop: 24 }}>
        <p className="section-kicker">{c.stepsKicker}</p>
        <div className="steps">
          {c.steps.map((s, i) => (
            <article key={s.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell" style={{ marginTop: 56 }}>
        <style>{"@media(min-width:860px){.process-cols{grid-template-columns:1fr 1fr}}"}</style>
        <div className="process-cols" style={{ display: "grid", gap: 40 }}>
          <div>
            <h2 style={{ fontSize: 22 }}>{c.colsTitle1}</h2>
            {c.col1.map((p, i) => (
              <p key={i} style={{ marginTop: 12, color: "var(--muted)" }}>
                {p}
              </p>
            ))}
          </div>
          <div>
            <h2 style={{ fontSize: 22 }}>{c.colsTitle2}</h2>
            <p style={{ marginTop: 12, color: "var(--muted)" }}>{c.col2Intro}</p>
            <ul style={{ marginTop: 8, paddingLeft: 20, color: "var(--muted)" }}>
              {c.col2List.map((item, i) => (
                <li key={i} style={{ marginBottom: 4 }}>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 12, color: "var(--muted)" }}>{c.col2Outro}</p>
          </div>
        </div>
      </section>

      <section className="shell" style={{ marginTop: 56 }}>
        <p className="section-kicker">{c.rolesKicker}</p>
        <p style={{ marginTop: 8, maxWidth: 620, color: "var(--muted)" }}>{c.rolesIntro}</p>
        <div
          style={{
            marginTop: 20,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {c.roles.map((r) => (
            <div
              key={r.title}
              style={{
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: "20px 22px",
                background: "var(--paper)",
              }}
            >
              <h3 style={{ fontSize: 16 }}>{r.title}</h3>
              <p style={{ marginTop: 6, fontSize: 13, color: "var(--muted)" }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell" style={{ marginTop: 56 }}>
        <div
          style={{
            borderRadius: 20,
            border: "1px solid var(--line)",
            background: "var(--paper)",
            boxShadow: "var(--shadow)",
            padding: "32px 36px",
          }}
        >
          <h2 style={{ fontSize: 20 }}>{c.toolTitle}</h2>
          <p style={{ marginTop: 10, maxWidth: 680, color: "var(--muted)" }}>{c.toolBody}</p>
        </div>
      </section>

      <section className="organisation" style={{ marginTop: 56 }}>
        <div className="shell organisation-inner">
          <div>
            <h2>{c.ctaTitle}</h2>
            <p>{c.ctaSubtitle}</p>
          </div>
          <Link className="button button-light" to="/contact">
            {c.ctaButton}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
