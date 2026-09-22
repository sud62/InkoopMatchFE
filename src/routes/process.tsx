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

// ─────────────────────────────────────────────────────────────────
// Copy — unchanged from the previous version. The content was good;
// the layout wasn't. Kept as a local object rather than the global
// dictionary because this page's copy is long-form and versioned
// independently of UI strings.
// ─────────────────────────────────────────────────────────────────
const content = {
  en: {
    kicker: "Our process",
    title: "Not every match starts",
    titleAccent: "the same way.",
    subtitle:
      "Some organisations need capacity fast. Others need specific expertise, or someone to take the lead on a project that's stalled. So before anything else, we take the time to understand the actual assignment and the organisation behind it — then work out which form of engagement genuinely fits: secondment, mediation, or project-based work. Sometimes it's a combination.",
    subtitle2:
      "We're not looking for whoever happens to be available. We're looking for someone who actually adds something.",
    credentialsLabel: "How we work",
    features: [
      { title: "A transparent process", desc: "We're clear upfront about how a request is handled, who's involved, and what the next steps look like." },
      { title: "Clear terms", desc: "We pay close attention to agreements — form of engagement, rate, duration, and responsibilities." },
      { title: "Attention to Wet DBA", desc: "We look critically at the nature of the engagement and how the work is actually organised." },
      { title: "WTTA-ready", desc: "We factor in developments around admission, transparency, and responsible provision of labour." },
    ],
    stepsKicker: "How a match comes together",
    stepsTitle: "Four steps, none of them rushed.",
    steps: [
      { title: "We understand the request", desc: "We start by discussing the assignment, the organisation, and the outcome they're after — so we can look beyond a job title alone." },
      { title: "We look for the right professional", desc: "We compare the request against the knowledge, experience, availability and preferences of professionals in our network." },
      { title: "We discuss the possible match", desc: "When we see a genuine fit, we reach out personally. A candidate is only put forward after alignment and consent." },
      { title: "We guide what comes next", desc: "We support the introduction and the terms of collaboration — and stay involved after the start, not just up to it." },
    ],
    audiencesKicker: "Two sides, one process",
    colsTitle1: "For professionals",
    col1: [
      "A good assignment isn't just about the requirements on paper. The content, the working environment, the responsibilities, and room to grow all have to line up too.",
      "That's why we want to understand who you are, what you can do, and what step you're looking to take — before we look at which assignments actually fit.",
    ],
    col1Promise: "You don't just get a possible match. You get an explanation of why we think it's worth your time.",
    col1Consent: "Your details are never shared with an organisation without your explicit consent. You stay in control of every next step.",
    colsTitle2: "For organisations",
    col2Intro: "Filling a role quickly matters. But a match that lasts starts with a clear brief. That's why we look at:",
    col2List: [
      "the substance and goals of the assignment",
      "the knowledge and experience required",
      "the stage the organisation or project is at",
      "the availability and form of engagement needed",
      "how the team likes to work together",
      "the environment the professional will step into",
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
    toolKicker: "The tool behind it",
    toolTitle: "How InkoopMatch fits in",
    toolBody:
      "Matching runs through InkoopMatch, the digital tool behind Meester Inkoop's mediation. It helps us compare assignments and professionals carefully and consistently. It isn't a general job board that forwards CVs without context — technology supports the process, but the substantive judgement and the personal contact stay with our team.",
    ctaTitle: "Want to talk it through?",
    ctaSubtitle: "Looking for a professional for a temporary assignment, project work, or a direct hire? Or curious about your own next step? We'll start with a conversation about what you actually need.",
    ctaButton: "Contact us",
  },
  nl: {
    kicker: "Ons proces",
    title: "Niet elke match begint",
    titleAccent: "op dezelfde manier.",
    subtitle:
      "Sommige organisaties hebben snel capaciteit nodig. Andere hebben specifieke expertise nodig, of iemand die de regie neemt op een project dat is vastgelopen. Daarom nemen we eerst de tijd om de opdracht en de organisatie goed in beeld te brengen — en bepalen we welke vorm van inzet echt past: detachering, bemiddeling of projectmatige uitvoering. Soms is het een combinatie.",
    subtitle2:
      "We zoeken niet zomaar iemand die beschikbaar is. We zoeken iemand die daadwerkelijk iets toevoegt.",
    credentialsLabel: "Hoe wij werken",
    features: [
      { title: "Transparant proces", desc: "We maken vooraf duidelijk hoe de vraag wordt opgepakt, welke rol nodig is en welke vervolgstappen logisch zijn." },
      { title: "Heldere voorwaarden", desc: "We letten op afspraken, inzetvorm, tarief, looptijd en verantwoordelijkheden." },
      { title: "Aandacht voor Wet DBA", desc: "We kijken kritisch naar de aard van de inzet en de manier waarop de opdracht wordt georganiseerd." },
      { title: "Voorbereid op WTTA", desc: "We houden rekening met ontwikkelingen rondom toelating, transparantie en verantwoord ter beschikking stellen van arbeid." },
    ],
    stepsKicker: "Hoe een match tot stand komt",
    stepsTitle: "Vier stappen, geen van alle overhaast.",
    steps: [
      { title: "We brengen de vraag in beeld", desc: "Eerst bespreken we de opdracht, de organisatie en het gewenste resultaat. Zo kijken we verder dan alleen een functieprofiel." },
      { title: "We zoeken naar een passende professional", desc: "Daarna vergelijken we de vraag met de kennis, ervaring, beschikbaarheid en voorkeuren van professionals in ons netwerk." },
      { title: "We bespreken de mogelijke match", desc: "Wanneer we een passende combinatie zien, nemen we persoonlijk contact op. Pas na afstemming en toestemming stellen we een kandidaat voor." },
      { title: "We begeleiden de vervolgstappen", desc: "Vervolgens ondersteunen we bij de kennismaking en de afspraken over de samenwerking. Ook na de start blijven we betrokken." },
    ],
    audiencesKicker: "Twee kanten, één proces",
    colsTitle1: "Voor professionals",
    col1: [
      "Een passende opdracht gaat niet alleen over functie-eisen. Ook de inhoud, werkomgeving, verantwoordelijkheden en ontwikkelmogelijkheden moeten aansluiten.",
      "Daarom willen we eerst weten wie je bent, wat je kunt en welke stap je wilt zetten. Vervolgens kijken we welke opdrachten daarbij passen.",
    ],
    col1Promise: "Je ontvangt niet alleen een mogelijke match, maar ook uitleg waarom wij denken dat de opdracht interessant voor je kan zijn.",
    col1Consent: "Je gegevens worden nooit zonder jouw uitdrukkelijke toestemming met een opdrachtgever gedeeld. Zo houd je zelf de regie.",
    colsTitle2: "Voor opdrachtgevers",
    col2Intro: "Een openstaande opdracht snel invullen is belangrijk. Toch begint een duurzame match bij een heldere vraag. Daarom kijken we onder andere naar:",
    col2List: [
      "de inhoud en doelstellingen van de opdracht",
      "de benodigde kennis en ervaring",
      "de fase waarin de organisatie of het project zich bevindt",
      "de gewenste beschikbaarheid en inzet",
      "de manier van samenwerken",
      "de omgeving waarin de professional terechtkomt",
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
    toolKicker: "De tool erachter",
    toolTitle: "Waar Inkoopmatch in past",
    toolBody:
      "De matching verloopt via Inkoopmatch, de digitale tool achter de bemiddeling van Meester Inkoop. Het helpt ons om opdrachten en professionals zorgvuldig en consistent met elkaar te vergelijken. Het is geen algemene vacaturebank waarin cv's zonder context worden doorgestuurd — technologie ondersteunt het proces, maar de inhoudelijke beoordeling en het persoonlijke contact blijven bij ons team.",
    ctaTitle: "Even sparren?",
    ctaSubtitle: "Zoekt u een professional voor een tijdelijke opdracht, projectmatige inzet of een rechtstreeks dienstverband? Of bent u zelf benieuwd naar een volgende stap? We beginnen met een gesprek over wat u daadwerkelijk nodig heeft.",
    ctaButton: "Neem contact op",
  },
};

// ─────────────────────────────────────────────────────────────────
// Role marks — six small line-art glyphs in the same visual language
// as the landing hero's illustration (thin strokes, no fills, abstract
// rather than literal). Each suggests the role's *work*, not a person.
// Green so they sit with the timeline circles and kickers on this page.
// Keyed by position in the roles array, so EN/NL share the same marks.
// ─────────────────────────────────────────────────────────────────
const markProps = {
  viewBox: "0 0 40 40",
  width: 40,
  height: 40,
  fill: "none",
  stroke: "var(--green)",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const roleMarks = [
  // Procurement Advisor — two options weighed against each other.
  <svg key="0" {...markProps}>
    <circle cx="15" cy="21" r="9" />
    <circle cx="25" cy="19" r="9" strokeDasharray="2 3" />
  </svg>,
  // Tender Advisor — a procedure guided through to a clean finish.
  <svg key="1" {...markProps}>
    <rect x="9" y="7" width="20" height="26" rx="3" />
    <path d="M14 21 l4 4 l8 -9" />
  </svg>,
  // Tender Lawyer — balance, held steady.
  <svg key="2" {...markProps}>
    <path d="M20 11 v20" />
    <path d="M9 15 h22" />
    <circle cx="9" cy="22" r="3.5" />
    <circle cx="31" cy="22" r="3.5" />
    <path d="M14 31 h12" />
  </svg>,
  // Contract Manager — agreements that link to each other.
  <svg key="3" {...markProps}>
    <rect x="5" y="14" width="13" height="12" rx="3" />
    <rect x="22" y="14" width="13" height="12" rx="3" />
    <path d="M18 20 h4" />
  </svg>,
  // Project Leader — one direction that branches into tracks.
  <svg key="4" {...markProps}>
    <path d="M7 20 h11" />
    <path d="M18 20 c5 0 5 -8 10 -8 h5" />
    <path d="M18 20 c5 0 5 8 10 8 h5" />
    <circle cx="7" cy="20" r="1.75" fill="var(--green)" />
  </svg>,
  // Procurement Support — case files, planning, the paper trail.
  <svg key="5" {...markProps}>
    <path d="M9 12 h22" />
    <path d="M9 19 h16" />
    <path d="M9 26 h20" />
    <path d="M9 33 h12" />
  </svg>,
];

// ─────────────────────────────────────────────────────────────────
// Page-scoped styles. Prefixed `prc-` so nothing collides with the
// global stylesheet. Reuses the global tokens (--ink, --green, --sage,
// --muted, --line) so the page inherits the site's palette exactly.
// Kept inline for the same reason the previous version did: this is
// the only page that uses these, and it avoids touching styles.css.
// ─────────────────────────────────────────────────────────────────
const styles = `
  /* ── Hero ─────────────────────────────────────────────── */
  .prc-hero {
    display: grid;
    grid-template-columns: 1.1fr .9fr;
    gap: 64px;
    align-items: start;
    padding-block: 54px 72px;
  }
  .prc-hero h1 {
    font-size: clamp(44px, 4.6vw, 64px);
    line-height: 1.06;
    letter-spacing: -.045em;
    font-weight: 780;
    margin: 22px 0 22px;
    color: var(--ink);
  }
  .prc-hero h1 em {
    font-style: normal;
    color: var(--green);
  }
  .prc-hero .lead {
    max-width: 58ch;
  }
  .prc-hero-closer {
    margin: 18px 0 0;
    font-size: 18px;
    line-height: 1.5;
    font-weight: 700;
    color: var(--ink);
    max-width: 48ch;
  }

  /* Credentials — the compliance list in the hero's right column.
     Rendered as a quiet vertical list on sage, not as feature cards. */
  .prc-credentials {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 24px;
    padding: 30px 32px 22px;
    margin-top: 48px;
    box-shadow: var(--shadow);
  }
  .prc-credentials-label {
    text-transform: uppercase;
    color: var(--green-dark);
    font-size: 12px;
    letter-spacing: .16em;
    font-weight: 800;
    margin: 0 0 16px;
  }
  .prc-credentials ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .prc-credentials li {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: 14px;
    padding: 14px 0;
    border-top: 1px solid var(--line);
  }
  .prc-credentials li:first-child {
    border-top: 0;
    padding-top: 0;
  }
  .prc-credentials li::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--green);
    margin-top: 7px;
    justify-self: center;
  }
  .prc-credentials strong {
    display: block;
    font-size: 16px;
    color: var(--ink);
    letter-spacing: -.01em;
  }
  .prc-credentials p {
    margin: 4px 0 0;
    font-size: 14px;
    line-height: 1.55;
    color: #405363;
  }

  /* ── Timeline band ────────────────────────────────────── */
  .prc-band {
    background: var(--sage);
    padding-block: 88px 96px;
  }
  .prc-band h2,
  .prc-h2 {
    font-size: clamp(30px, 3.2vw, 40px);
    line-height: 1.12;
    letter-spacing: -.035em;
    font-weight: 780;
    color: var(--ink);
    margin: 10px 0 0;
    max-width: 22ch;
  }
  .prc-timeline {
    list-style: none;
    margin: 48px 0 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
    position: relative;
  }
  .prc-timeline li {
    position: relative;
  }
  /* Rail segment: from this step's circle edge across the gap to the
     next step's circle. The last step has no segment, so the rail ends
     exactly at the final circle instead of overshooting. */
  .prc-timeline li:not(:last-child)::before {
    content: "";
    position: absolute;
    top: 21px;
    left: 42px;
    right: -28px;
    height: 2px;
    background: rgba(40, 122, 58, .35);
  }
  .prc-timeline .num {
    position: relative;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--green);
    color: #fff;
    display: grid;
    place-items: center;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0;
  }
  .prc-timeline h3 {
    font-size: 20px;
    line-height: 1.25;
    letter-spacing: -.02em;
    margin: 22px 0 10px;
    color: var(--ink);
  }
  .prc-timeline p {
    margin: 0;
    color: #405363;
    line-height: 1.6;
    font-size: 15px;
  }

  /* ── Two audiences ────────────────────────────────────── */
  .prc-audiences {
    padding-block: 96px 72px;
  }
  .prc-audiences-grid {
    margin-top: 36px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }
  .prc-panel {
    padding: 8px 0 8px 30px;
    border-left: 3px solid var(--ink);
  }
  .prc-panel h2 {
    font-size: 26px;
    letter-spacing: -.025em;
    margin: 0 0 18px;
    color: var(--ink);
  }
  /* Professionals is the highlighted side — the site is candidate-first. */
  .prc-panel.is-pro {
    background: var(--sage);
    border-left: 0;
    border-radius: 24px;
    padding: 36px 36px 32px;
  }
  .prc-panel.is-pro h2 {
    color: var(--green-dark);
  }
  .prc-panel p {
    margin: 0 0 14px;
    color: #405363;
    line-height: 1.65;
    max-width: 52ch;
  }
  .prc-panel .promise {
    margin: 22px 0 18px;
    padding: 18px 20px;
    background: #fff;
    border-left: 3px solid var(--green);
    border-radius: 0 16px 16px 0;
    color: var(--ink);
    font-weight: 700;
    line-height: 1.5;
  }
  .prc-panel .consent {
    font-size: 14px;
    color: var(--muted);
  }
  .prc-panel ul {
    margin: 4px 0 16px;
    padding: 0 0 0 20px;
    color: #405363;
    line-height: 1.7;
  }
  .prc-panel li::marker {
    color: var(--ink);
  }

  /* ── Roles list ───────────────────────────────────────── */
  .prc-roles {
    padding-block: 72px 96px;
  }
  .prc-roles-intro {
    margin: 10px 0 0;
    max-width: 58ch;
    color: #405363;
    line-height: 1.6;
  }
  .prc-roles-list {
    margin: 36px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 56px;
    row-gap: 0;
    border-top: 1px solid var(--line);
  }
  .prc-roles-list li {
    display: grid;
    grid-template-columns: 40px 1fr;
    gap: 18px;
    align-items: start;
    padding: 20px 0;
    border-bottom: 1px solid var(--line);
  }
  .prc-roles-list .mark {
    margin-top: 1px;
  }
  .prc-roles-list strong {
    font-size: 18px;
    color: var(--ink);
    letter-spacing: -.015em;
  }
  .prc-roles-list p {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.5;
  }

  /* ── Dark closing band (tool + CTA) ───────────────────── */
  .prc-close {
    background: var(--ink);
    color: #fff;
    padding-block: 88px 96px;
  }
  .prc-close-grid {
    display: grid;
    grid-template-columns: 1.15fr .85fr;
    gap: 72px;
    align-items: start;
  }
  .prc-close .section-kicker {
    color: #9fd6ac;
  }
  .prc-close h2 {
    font-size: clamp(30px, 3.2vw, 40px);
    line-height: 1.12;
    letter-spacing: -.035em;
    margin: 10px 0 18px;
    color: #fff;
  }
  .prc-close p {
    color: #c7d1d7;
    line-height: 1.7;
    margin: 0;
    max-width: 58ch;
  }
  .prc-close-cta {
    background: rgba(255, 255, 255, .06);
    border: 1px solid rgba(255, 255, 255, .12);
    border-radius: 24px;
    padding: 32px 34px;
  }
  .prc-close-cta h3 {
    font-size: 24px;
    letter-spacing: -.025em;
    margin: 0 0 12px;
    color: #fff;
  }
  .prc-close-cta p {
    margin: 0 0 24px;
    font-size: 15px;
  }

  /* ── Responsive ───────────────────────────────────────── */
  @media (max-width: 960px) {
    .prc-hero { grid-template-columns: 1fr; gap: 40px; }
    .prc-hero h1 { max-width: none; }
    .prc-timeline { grid-template-columns: 1fr; gap: 28px; }
    .prc-timeline li { padding-left: 62px; }
    .prc-timeline li:not(:last-child)::before {
      top: 42px; bottom: -28px; left: 20px; right: auto; width: 2px; height: auto;
    }
    .prc-timeline .num { position: absolute; left: 0; top: 0; }
    .prc-timeline h3 { margin-top: 6px; }
    .prc-audiences-grid { grid-template-columns: 1fr; }
    .prc-roles-list { grid-template-columns: 1fr; column-gap: 0; }
    .prc-close-grid { grid-template-columns: 1fr; gap: 40px; }
  }
  @media (prefers-reduced-motion: no-preference) {
    .prc-close-cta .button { transition: transform .15s ease; }
    .prc-close-cta .button:hover { transform: translateY(-1px); }
  }
`;

function Process() {
  const { language } = useLanguage();
  const c = language === "nl" ? content.nl : content.en;

  return (
    <PageShell>
      <style>{styles}</style>

      {/* ── Hero: left-aligned copy, compliance credentials on the right ── */}
      <section className="shell prc-hero" aria-labelledby="prc-title">
        <div>
          <p className="section-kicker">{c.kicker}</p>
          <h1 id="prc-title">
            {c.title} <em>{c.titleAccent}</em>
          </h1>
          <p className="lead">{c.subtitle}</p>
          <p className="prc-hero-closer">{c.subtitle2}</p>
        </div>

        <aside className="prc-credentials" aria-label={c.credentialsLabel}>
          <p className="prc-credentials-label">{c.credentialsLabel}</p>
          <ul>
            {c.features.map((f) => (
              <li key={f.title}>
                <div>
                  <strong>{f.title}</strong>
                  <p>{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* ── Process: the one bold moment — a connected timeline ── */}
      <section className="prc-band" aria-labelledby="prc-steps-title">
        <div className="shell">
          <p className="section-kicker">{c.stepsKicker}</p>
          <h2 id="prc-steps-title">{c.stepsTitle}</h2>
          <ol className="prc-timeline">
            {c.steps.map((s, i) => (
              <li key={s.title}>
                <span className="num" aria-hidden="true">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Two audiences: same shape, different accent ── */}
      <section className="shell prc-audiences" aria-labelledby="prc-aud-title">
        <p className="section-kicker" id="prc-aud-title">{c.audiencesKicker}</p>
        <div className="prc-audiences-grid">
          <div className="prc-panel is-pro">
            <h2>{c.colsTitle1}</h2>
            {c.col1.map((p, i) => <p key={i}>{p}</p>)}
            <p className="promise">{c.col1Promise}</p>
            <p className="consent">{c.col1Consent}</p>
          </div>

          <div className="prc-panel is-org">
            <h2>{c.colsTitle2}</h2>
            <p>{c.col2Intro}</p>
            <ul>
              {c.col2List.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p>{c.col2Outro}</p>
          </div>
        </div>
      </section>

      {/* ── Roles: a scannable list, not a grid of cards ── */}
      <section className="shell prc-roles" aria-labelledby="prc-roles-title">
        <p className="section-kicker" id="prc-roles-title">{c.rolesKicker}</p>
        <p className="prc-roles-intro">{c.rolesIntro}</p>
        <ul className="prc-roles-list">
          {c.roles.map((r, i) => (
            <li key={r.title}>
              <span className="mark">{roleMarks[i]}</span>
              <div>
                <strong>{r.title}</strong>
                <p>{r.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Closing band: what the tool is + how to reach us ── */}
      <section className="prc-close" aria-labelledby="prc-tool-title">
        <div className="shell prc-close-grid">
          <div>
            <p className="section-kicker">{c.toolKicker}</p>
            <h2 id="prc-tool-title">{c.toolTitle}</h2>
            <p>{c.toolBody}</p>
          </div>
          <div className="prc-close-cta">
            <h3>{c.ctaTitle}</h3>
            <p>{c.ctaSubtitle}</p>
            <Link className="button button-light" to="/contact">
              {c.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
