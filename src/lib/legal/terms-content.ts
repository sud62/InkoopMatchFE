/**
 * Full Terms & Conditions content - "Gebruiks- en bemiddelingsvoorwaarden
 * Inkoopmatch", provided as a real legal document from The Goodlife
 * Company B.V. (trading as Meester Inkoop).
 *
 * Dutch is the AUTHORITATIVE version (the document's own Article 29.6
 * states this explicitly). English is a complete, careful translation
 * for convenience - NOT independently legally reviewed, and clearly
 * labeled as a courtesy translation wherever it's shown.
 *
 * BLANKS: the source document itself contains several unfilled
 * placeholders (KvK number, liability cap amount, certification
 * webpage reference, version number, dates). These are preserved
 * here EXACTLY as bracketed placeholders - never invented or guessed
 * - so they render visibly and can be found and confirmed with the
 * team before publishing. See BLANKS_TO_CONFIRM at the bottom of this
 * file for a flat list of every one of them.
 */

export type TermsBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type TermsArticle = {
  number: number;
  title: string;
  blocks: TermsBlock[];
};

export type TermsContent = {
  docTitle: string;
  version: string;
  effectiveDate: string;
  lastModified: string;
  intro: string[];
  summaryPoints: string[];
  summaryClosing: string;
  articles: TermsArticle[];
  formTexts: { heading: string; text: string }[];
};

// =====================================================================
// DUTCH - verbatim from the source document, authoritative version.
// =====================================================================
export const termsNL: TermsContent = {
  docTitle: "Gebruiks- en bemiddelingsvoorwaarden Inkoopmatch",
  version: "[1.0 - te bevestigen]",
  effectiveDate: "[datum - te bevestigen]",
  lastModified: "[datum - te bevestigen]",
  intro: [
    "Deze voorwaarden gelden voor personen die zich via Inkoopmatch inschrijven voor matching, bemiddeling en mogelijke plaatsing bij een opdrachtgever.",
    "Wij vinden het belangrijk dat u vóór uw inschrijving direct weet wat de belangrijkste afspraken zijn.",
  ],
  summaryPoints: [
    "The Goodlife Company B.V. is uw contractspartij. The Goodlife Company B.V. biedt haar bemiddelingsdiensten aan onder de naam Meester Inkoop en gebruikt Inkoopmatch als digitaal matchingplatform.",
    "Inkoopmatch is een digitaal hulpmiddel. Via Inkoopmatch worden cv's geregistreerd, geanalyseerd en vergeleken met opdrachten. Inkoopmatch neemt niet zelfstandig een beslissing over uw geschiktheid.",
    "Meester Inkoop voert de bemiddeling uit. Medewerkers van Meester Inkoop controleren de voorgestelde matches, onderhouden het contact met kandidaten en opdrachtgevers en verzorgen de verdere bemiddeling en administratieve afhandeling.",
    "Uw inschrijving geldt voor meerdere mogelijke opdrachten. Uw inschrijving is niet beperkt tot de opdracht waarvoor u zich aanvankelijk heeft aangemeld. Zolang uw inschrijving actief is, kan uw cv intern worden gebruikt om andere passende opdrachten voor te stellen.",
    "Uw inschrijving blijft twaalf maanden actief. Na ongeveer zes maanden kunnen wij u vragen uw gegevens, cv en beschikbaarheid te controleren. Voor het einde van de twaalf maanden vragen wij of u de inschrijving wilt verlengen.",
    "AI ondersteunt de matching. Het systeem kan berekenen in welke mate uw cv overeenkomt met de gevraagde kwalificaties van een opdracht.",
    "Het matchingspercentage is geen definitief oordeel. Een medewerker van Meester Inkoop controleert altijd het cv, de opdracht en het voorgestelde matchingspercentage. De medewerker kan van de uitkomst afwijken.",
    "Uw volledige cv wordt niet zonder uw akkoord aan een opdrachtgever gestuurd. Voor iedere concrete voordracht vragen wij afzonderlijk akkoord.",
    "Geen plaatsing betekent niet dat uw inschrijving stopt. Wanneer een voordracht niet tot een opdracht leidt, mag uw cv intern worden gebruikt voor volgende matches zolang uw inschrijving actief blijft.",
    "U kunt altijd stoppen. U kunt uw inschrijving op ieder moment beëindigen en verzoeken uw cv en matchprofiel te verwijderen.",
    "Een inschrijving of match geeft geen garantie. Een inschrijving, matchingspercentage of voordracht geeft geen recht op een gesprek, plaatsing, arbeidsovereenkomst of opdracht.",
  ],
  summaryClosing: "De volledige afspraken staan hieronder.",
  articles: [
    {
      number: 1,
      title: "Wie biedt de dienstverlening aan?",
      blocks: [
        { type: "p", text: "1. De dienstverlening wordt aangeboden door:" },
        {
          type: "list",
          items: [
            "Statutaire naam: The Goodlife Company B.V.",
            "KvK-nummer: [ACTUEEL KVK-NUMMER CONTROLEREN]",
            "Handelsnamen: Meester Inkoop en Inkoopmatch",
            "Vestigingsadres: Park Vronesteyn 34, 2271 HS Voorburg",
            "Telefoonnummer: 070-2110502",
            "E-mailadres: info@meesterinkoop.nl",
            "Privacycontact: info@meesterinkoop.nl, onder vermelding van \"privacy\"",
          ],
        },
        { type: "p", text: "2. The Goodlife Company B.V. wordt in deze voorwaarden aangeduid als \"Meester Inkoop\", \"wij\" of \"ons\"." },
        { type: "p", text: "3. \"Inkoopmatch\" is de naam van het digitale platform dat Meester Inkoop gebruikt voor registratie, cv-analyse, matching en ondersteuning van het bemiddelingsproces." },
        { type: "p", text: "4. Inkoopmatch is geen afzonderlijke rechtspersoon en geen afzonderlijke contractspartij." },
        { type: "p", text: "5. De overeenkomst voor het gebruik van Inkoopmatch en de matching- en bemiddelingsdienst wordt gesloten met The Goodlife Company B.V." },
        { type: "p", text: "6. De persoon die zich via Inkoopmatch inschrijft, wordt aangeduid als de \"Kandidaat\" of \"u\"." },
        { type: "p", text: "7. Een organisatie die een vacature, opdracht, tijdelijke functie, detachering, project of andere professionele mogelijkheid aanbiedt, wordt aangeduid als de \"Opdrachtgever\"." },
      ],
    },
    {
      number: 2,
      title: "Toepasselijkheid en totstandkoming",
      blocks: [
        { type: "p", text: "1. Deze voorwaarden gelden wanneer u:" },
        {
          type: "list",
          items: [
            "een account bij Inkoopmatch aanmaakt;",
            "een cv of profiel aan Inkoopmatch verstrekt;",
            "zich inschrijft voor matching of bemiddeling;",
            "reageert op een opdracht via Inkoopmatch; of",
            "Meester Inkoop op een andere manier verzoekt passende werkzaamheden of opdrachten voor u te zoeken.",
          ],
        },
        { type: "p", text: "2. De overeenkomst komt tot stand nadat u:" },
        {
          type: "list",
          items: [
            "de gevraagde inschrijfgegevens heeft verstrekt;",
            "deze voorwaarden heeft kunnen bekijken en opslaan; en",
            "met deze voorwaarden akkoord bent gegaan.",
          ],
        },
        { type: "p", text: "3. De privacyverklaring en de uitleg over AI-matching bevatten aanvullende informatie over de verwerking van persoonsgegevens. Deze documenten zijn geen algemene voorwaarden, maar moeten wel vóór de inschrijving beschikbaar zijn." },
        { type: "p", text: "4. Voor een concrete plaatsing, bemiddeling, detachering, arbeidsovereenkomst, opdrachtovereenkomst, detavastconstructie of andere samenwerking kunnen aanvullende overeenkomsten en voorwaarden gelden." },
        { type: "p", text: "5. Bij tegenstrijdigheid tussen deze voorwaarden en een later gesloten specifieke overeenkomst, gaat de specifieke overeenkomst voor ten aanzien van het onderwerp dat daarin uitdrukkelijk is geregeld." },
      ],
    },
    {
      number: 3,
      title: "Wie kan zich inschrijven?",
      blocks: [
        { type: "p", text: "1. Inkoopmatch is bedoeld voor personen die belangstelling hebben voor vacatures, opdrachten, detachering, projecten of andere professionele mogelijkheden." },
        { type: "p", text: "2. U moet juridisch bevoegd zijn om de overeenkomst aan te gaan." },
        { type: "p", text: "3. Een persoon jonger dan achttien jaar kan zich alleen inschrijven wanneer:" },
        {
          type: "list",
          items: [
            "Meester Inkoop de dienstverlening voor deze doelgroep heeft opengesteld; en",
            "toestemming van een ouder of wettelijke vertegenwoordiger wordt verkregen wanneer dat wettelijk noodzakelijk is.",
          ],
        },
        { type: "p", text: "4. Meester Inkoop mag een inschrijving weigeren wanneer:" },
        {
          type: "list",
          items: [
            "de verstrekte informatie kennelijk onjuist, onvolledig of misleidend is;",
            "de inschrijving vermoedelijk voor oneigenlijke doeleinden wordt gebruikt;",
            "sprake is van fraude, misbruik of een beveiligingsrisico;",
            "de gevraagde dienstverlening niet door Meester Inkoop wordt aangeboden;",
            "voortzetting in strijd zou zijn met wet- of regelgeving; of",
            "Meester Inkoop de dienstverlening redelijkerwijs niet kan uitvoeren.",
          ],
        },
        { type: "p", text: "5. De reguliere inschrijving en matching zijn voor de Kandidaat kosteloos, tenzij vooraf uitdrukkelijk en schriftelijk anders is afgesproken." },
      ],
    },
    {
      number: 4,
      title: "Verdeling tussen Inkoopmatch en Meester Inkoop",
      blocks: [
        { type: "p", text: "4.1 Inkoopmatch als digitaal hulpmiddel" },
        { type: "p", text: "1. Inkoopmatch ondersteunt Meester Inkoop bij:" },
        {
          type: "list",
          items: [
            "het registreren van Kandidaten;",
            "het opslaan en beheren van cv's en profielgegevens;",
            "het uitlezen en structureren van informatie uit cv's;",
            "het vergelijken van kandidatenprofielen met opdrachten;",
            "het berekenen van een indicatief matchingspercentage;",
            "het presenteren van mogelijke matches aan medewerkers van Meester Inkoop;",
            "het vastleggen van menselijke beoordelingen;",
            "het registreren van akkoord voor een concrete voordracht;",
            "het vastleggen van de voortgang van een bemiddelingsproces.",
          ],
        },
        { type: "p", text: "2. Inkoopmatch is een technisch ondersteuningsmiddel." },
        { type: "p", text: "3. Inkoopmatch:" },
        {
          type: "list",
          items: [
            "sluit zelf geen overeenkomsten met Kandidaten of Opdrachtgevers;",
            "neemt niet zelfstandig een definitief selectiebesluit;",
            "wijst Kandidaten niet zelfstandig definitief af;",
            "verstuurt niet zelfstandig cv's zonder de daarvoor vereiste controle en goedkeuring.",
          ],
        },
        { type: "p", text: "4.2 Meester Inkoop als bemiddelaar" },
        { type: "p", text: "4. De feitelijke matching, beoordeling en bemiddeling worden uitgevoerd door medewerkers van Meester Inkoop." },
        { type: "p", text: "5. Meester Inkoop kan onder andere verantwoordelijk zijn voor:" },
        {
          type: "list",
          items: [
            "het beoordelen van voorgestelde matches;",
            "contact met de Kandidaat;",
            "contact met Opdrachtgevers;",
            "controle van beschikbaarheid en relevante profielgegevens;",
            "het bespreken van een mogelijke opdracht;",
            "het voorbereiden en uitvoeren van een voordracht;",
            "het plannen of begeleiden van gesprekken;",
            "het voorbereiden van overeenkomsten en plaatsingsdocumenten;",
            "onboarding en begeleiding;",
            "contract-, uren- en plaatsingsadministratie;",
            "facturatie en andere administratieve werkzaamheden, voor zover deze bij de gekozen samenwerkingsvorm horen.",
          ],
        },
        { type: "p", text: "6. Welke werkzaamheden Meester Inkoop precies uitvoert, is afhankelijk van de aard van de opdracht en de gekozen vorm van samenwerking." },
        { type: "p", text: "4.3 Beslissing van de Opdrachtgever" },
        { type: "p", text: "7. De Opdrachtgever beslist uiteindelijk zelfstandig:" },
        {
          type: "list",
          items: [
            "wie voor een gesprek wordt uitgenodigd;",
            "wie verdergaat in een selectieprocedure;",
            "aan wie een aanbod wordt gedaan;",
            "met wie een overeenkomst wordt gesloten.",
          ],
        },
        { type: "p", text: "8. Een beoordeling of voordracht door Meester Inkoop verplicht een Opdrachtgever niet om de Kandidaat te selecteren." },
      ],
    },
    {
      number: 5,
      title: "Certificering",
      blocks: [
        { type: "p", text: "1. The Goodlife Company B.V., handelend onder de naam Meester Inkoop, kan beschikken over certificeringen, keurmerken of registraties die betrekking hebben op bepaalde onderdelen van haar dienstverlening." },
        { type: "p", text: "2. Vóór publicatie van een certificeringsclaim moeten op de website ten minste worden vermeld:" },
        {
          type: "list",
          items: [
            "de naam van de certificering of het keurmerk;",
            "de gecertificeerde rechtspersoon;",
            "het registratie- of certificaatnummer;",
            "de geldigheidsduur;",
            "de activiteiten waarop de certificering betrekking heeft.",
          ],
        },
        { type: "p", text: "3. Een certificering geldt uitsluitend binnen de formeel vastgelegde reikwijdte van het betreffende certificaat." },
        { type: "p", text: "4. Een certificering van de bemiddeling, administratie of uitlening van personeel betekent niet automatisch dat:" },
        {
          type: "list",
          items: [
            "het AI-systeem afzonderlijk is gecertificeerd;",
            "iedere match inhoudelijk juist is;",
            "iedere Kandidaat wordt geplaatst;",
            "iedere Opdrachtgever onder de betreffende certificering valt.",
          ],
        },
        { type: "p", text: "5. De actuele certificeringsgegevens worden vermeld op [webpagina of registerverwijzing - te bevestigen]." },
      ],
    },
    {
      number: 6,
      title: "De matching- en bemiddelingsdienst",
      blocks: [
        { type: "p", text: "1. Meester Inkoop ondersteunt Kandidaten bij het vinden van mogelijk passende professionele mogelijkheden." },
        { type: "p", text: "2. De dienstverlening kan bestaan uit:" },
        {
          type: "list",
          items: [
            "registratie en beheer van een kandidatenprofiel;",
            "verwerking en analyse van een cv;",
            "vergelijking met één of meer opdrachten;",
            "AI-ondersteunde matching;",
            "menselijke beoordeling van matches;",
            "het doen van matchvoorstellen;",
            "het bespreken van een mogelijke voordracht;",
            "het voordragen bij een Opdrachtgever;",
            "ondersteuning bij selectie, onboarding en administratie.",
          ],
        },
        { type: "p", text: "3. De inschrijving geldt voor een doorlopende matchingdienst gedurende de actieve inschrijfperiode." },
        { type: "p", text: "4. De inschrijving is daarom niet beperkt tot:" },
        {
          type: "list",
          items: ["één vacature;", "één opdracht;", "één Opdrachtgever; of", "één voorgesteld matchingsresultaat."],
        },
        { type: "p", text: "5. Wanneer een match, sollicitatie of voordracht niet tot een opdracht leidt, mag Meester Inkoop het cv en profiel intern blijven gebruiken voor nieuwe matches zolang de inschrijving actief is." },
        { type: "p", text: "6. Voor iedere nieuwe externe verstrekking van het volledige cv wordt opnieuw afzonderlijk akkoord gevraagd." },
        { type: "p", text: "7. Meester Inkoop heeft een inspanningsverplichting en geen resultaatsverplichting." },
        { type: "p", text: "8. Meester Inkoop garandeert niet dat:" },
        {
          type: "list",
          items: [
            "voortdurend passende opdrachten beschikbaar zijn;",
            "iedere Kandidaat een matchvoorstel ontvangt;",
            "iedere match tot een voordracht leidt;",
            "een Opdrachtgever belangstelling toont;",
            "een gesprek of overeenkomst tot stand komt.",
          ],
        },
      ],
    },
    {
      number: 7,
      title: "Gebruik van AI bij matching",
      blocks: [
        { type: "p", text: "1. Inkoopmatch kan AI en andere geautomatiseerde technieken gebruiken om informatie uit het cv en kandidatenprofiel te vergelijken met kenmerken en kwalificaties van een opdracht." },
        { type: "p", text: "2. Het systeem kan een indicatief matchingspercentage of een vergelijkbare beoordeling berekenen." },
        { type: "p", text: "3. Bij de matching kunnen relevante professionele gegevens worden gebruikt, waaronder:" },
        {
          type: "list",
          items: [
            "werkervaring;",
            "functie- en projectervaring;",
            "opleidingen;",
            "kennis en vaardigheden;",
            "certificeringen;",
            "branche- of sectorervaring;",
            "ervaring met bepaalde typen opdrachten;",
            "locatie of reisafstand;",
            "beschikbaarheid;",
            "andere voor de opdracht relevante kwalificaties.",
          ],
        },
        { type: "p", text: "4. Het matchingspercentage:" },
        {
          type: "list",
          items: [
            "is een hulpmiddel voor Meester Inkoop;",
            "is geen objectieve vaststelling van geschiktheid;",
            "is geen definitief selectiebesluit;",
            "geeft niet de statistische kans weer dat de Kandidaat de opdracht krijgt;",
            "vormt geen garantie op een voordracht of plaatsing;",
            "kan onvolledig of onjuist zijn.",
          ],
        },
        { type: "p", text: "5. Het systeem mag een Kandidaat niet uitsluitend vanwege een automatisch berekende ondergrens definitief uitsluiten." },
        { type: "p", text: "6. Een lagere score sluit niet uit dat een medewerker de Kandidaat alsnog als passend beoordeelt." },
        { type: "p", text: "7. Een hogere score betekent niet automatisch dat de Kandidaat wordt voorgedragen." },
        { type: "p", text: "8. Meester Inkoop gebruikt geen bijzondere persoonsgegevens, zoals gezondheidsgegevens, religie, afkomst of politieke overtuiging, als selectiecriterium." },
        { type: "p", text: "9. Meester Inkoop probeert dergelijke gegevens ook niet uit andere informatie af te leiden." },
        { type: "p", text: "10. De Kandidaat kan verzoeken om:" },
        {
          type: "list",
          items: [
            "correctie van onjuist uit het cv overgenomen informatie;",
            "verwerking van een nieuw cv;",
            "een menselijke toelichting op een voorgestelde match;",
            "herbeoordeling van een kennelijk onjuiste match.",
          ],
        },
        { type: "p", text: "11. Meester Inkoop gebruikt persoonsgegevens en cv-inhoud niet voor het trainen van algemene AI-basismodellen." },
        { type: "p", text: "12. Geanonimiseerde gegevens die redelijkerwijs niet meer tot een persoon kunnen worden herleid, mogen worden gebruikt om de kwaliteit en werking van Inkoopmatch te onderzoeken en verbeteren." },
      ],
    },
    {
      number: 8,
      title: "Verplichte menselijke beoordeling",
      blocks: [
        { type: "p", text: "1. Voordat een Kandidaat daadwerkelijk wordt voorgesteld aan een Opdrachtgever, beoordeelt een medewerker van Meester Inkoop altijd:" },
        {
          type: "list",
          items: [
            "het oorspronkelijke cv;",
            "de relevante profielgegevens;",
            "de eisen en kenmerken van de opdracht;",
            "het voorgestelde matchingspercentage;",
            "de inhoudelijke overeenkomsten en verschillen;",
            "of de voorgestelde match in de praktijk voldoende passend is.",
          ],
        },
        { type: "p", text: "2. De medewerker kan:" },
        {
          type: "list",
          items: [
            "het matchingspercentage corrigeren;",
            "aanvullende informatie meenemen;",
            "de AI-uitkomst buiten beschouwing laten;",
            "besluiten een Kandidaat ondanks een lagere score te benaderen;",
            "besluiten een Kandidaat ondanks een hogere score niet voor te dragen.",
          ],
        },
        { type: "p", text: "3. Het matchingspercentage vervangt het professionele oordeel van de medewerker niet." },
        { type: "p", text: "4. Meester Inkoop neemt geen definitief besluit met belangrijke gevolgen voor de Kandidaat uitsluitend op basis van een geautomatiseerde verwerking." },
        { type: "p", text: "5. Meester Inkoop mag de beoordeling intern registreren, inclusief:" },
        {
          type: "list",
          items: [
            "de beoordeelde opdracht;",
            "het matchingspercentage;",
            "de naam van de beoordelaar;",
            "het beoordelingsmoment;",
            "eventuele correcties;",
            "een korte motivering.",
          ],
        },
      ],
    },
    {
      number: 9,
      title: "Duur van de inschrijving",
      blocks: [
        { type: "p", text: "1. De inschrijving is gedurende twaalf maanden actief." },
        { type: "p", text: "2. Deze termijn begint op:" },
        {
          type: "list",
          items: [
            "de datum waarop de eerste inschrijving is voltooid; of",
            "de datum waarop de inschrijving voor het laatst actief is verlengd.",
          ],
        },
        { type: "p", text: "3. Zolang de inschrijving actief is, mag Meester Inkoop:" },
        {
          type: "list",
          items: [
            "het cv intern opslaan;",
            "profielgegevens bijhouden;",
            "nieuwe opdrachten met het profiel vergelijken;",
            "nieuwe matchingspercentages berekenen;",
            "de Kandidaat benaderen over mogelijk passende opdrachten.",
          ],
        },
        { type: "p", text: "4. Een afgewezen, ingetrokken of niet succesvolle voordracht beëindigt de inschrijving niet." },
        { type: "p", text: "5. De Kandidaat kan de inschrijving gedurende de actieve periode op ieder moment beëindigen." },
        { type: "p", text: "6. Een Kandidaat kan de inschrijving meerdere keren verlengen. Hierdoor kan de dienstverlening langer dan twaalf maanden voortduren, zolang de Kandidaat periodiek actief bevestigt dat de inschrijving moet blijven bestaan." },
        { type: "p", text: "7. De inschrijving wordt niet automatisch voor onbepaalde tijd verlengd." },
      ],
    },
    {
      number: 10,
      title: "Actualisatie na zes maanden",
      blocks: [
        { type: "p", text: "1. Meester Inkoop kan de Kandidaat ongeveer zes maanden na inschrijving vragen om:" },
        {
          type: "list",
          items: [
            "het cv te controleren;",
            "werkervaring bij te werken;",
            "opleidingen of certificeringen toe te voegen;",
            "contactgegevens te controleren;",
            "beschikbaarheid te bevestigen;",
            "gewenste functies, opdrachten of locaties te actualiseren.",
          ],
        },
        { type: "p", text: "2. Wanneer de Kandidaat niet reageert, eindigt de inschrijving niet direct." },
        { type: "p", text: "3. Meester Inkoop mag het profiel wel markeren als \"actualisatie gewenst\"." },
        { type: "p", text: "4. Meester Inkoop mag een voordracht uitstellen wanneer de beschikbare gegevens zo verouderd zijn dat geen betrouwbare voordracht kan worden gedaan." },
        { type: "p", text: "5. De Kandidaat blijft verantwoordelijk voor het tijdig doorgeven van relevante wijzigingen." },
      ],
    },
    {
      number: 11,
      title: "Verlenging en verwijdering",
      blocks: [
        { type: "p", text: "1. Uiterlijk ongeveer dertig dagen vóór het einde van de actieve inschrijfperiode kan Meester Inkoop een verlengingsverzoek sturen." },
        { type: "p", text: "2. De Kandidaat kan dan:" },
        {
          type: "list",
          items: [
            "de inschrijving voor een nieuwe periode van twaalf maanden verlengen;",
            "het cv vervangen of actualiseren;",
            "de inschrijving beëindigen;",
            "om verwijdering van het profiel verzoeken.",
          ],
        },
        { type: "p", text: "3. Verlenging vereist een actieve handeling van de Kandidaat." },
        { type: "p", text: "4. Wanneer de Kandidaat niet verlengt:" },
        {
          type: "list",
          items: [
            "wordt het profiel na de einddatum inactief;",
            "stopt nieuwe AI-matching;",
            "wordt het profiel niet meer voor nieuwe voordrachten gebruikt;",
            "wordt geen cv meer aan een nieuwe Opdrachtgever verstrekt.",
          ],
        },
        { type: "p", text: "5. Na het einde van de inschrijving kan een hersteltermijn van maximaal dertig dagen worden toegepast." },
        { type: "p", text: "6. Na deze hersteltermijn worden het cv en het actieve matchprofiel verwijderd, tenzij bepaalde gegevens nog noodzakelijk zijn voor:" },
        {
          type: "list",
          items: [
            "een lopende voordracht;",
            "een lopende overeenkomst;",
            "een wettelijke administratieve verplichting;",
            "behandeling van een klacht;",
            "beveiligingsonderzoek;",
            "het instellen, uitoefenen of verdedigen van een rechtsvordering.",
          ],
        },
        { type: "p", text: "7. Alleen de gegevens die voor een dergelijk afzonderlijk doel noodzakelijk zijn, mogen langer worden bewaard." },
        { type: "p", text: "8. Het volledige cv wordt niet uitsluitend voor bewijs- of auditdoeleinden onbeperkt bewaard." },
        { type: "p", text: "9. Verwijderde gegevens kunnen nog gedurende een beperkte technische periode aanwezig zijn in beveiligde back-ups." },
        { type: "p", text: "10. Gegevens in back-ups worden niet opnieuw gebruikt voor actieve matching en verdwijnen volgens de geldende back-upcyclus." },
      ],
    },
    {
      number: 12,
      title: "Akkoord voor een concrete voordracht",
      blocks: [
        { type: "p", text: "1. Het volledige cv wordt uitsluitend aan een Opdrachtgever verstrekt nadat de Kandidaat akkoord heeft gegeven met de voordracht voor de concrete opdracht." },
        { type: "p", text: "2. Voordat akkoord wordt gevraagd, informeert Meester Inkoop de Kandidaat ten minste over:" },
        {
          type: "list",
          items: [
            "de betreffende opdracht;",
            "de naam van de Opdrachtgever;",
            "de belangrijkste werkzaamheden en vereisten;",
            "het doel van de verstrekking;",
            "de cv-versie die zal worden verstrekt.",
          ],
        },
        { type: "p", text: "3. Wanneer de naam van de Opdrachtgever nog niet bekendgemaakt kan worden, verstrekt Meester Inkoop het volledige cv niet, tenzij:" },
        {
          type: "list",
          items: [
            "de Kandidaat op basis van voldoende concrete informatie uitdrukkelijk akkoord gaat; en",
            "de identiteit van de Opdrachtgever vóór verdere inhoudelijke selectie alsnog wordt bekendgemaakt.",
          ],
        },
        { type: "p", text: "4. Waar mogelijk kan vóór het akkoord uitsluitend een geanonimiseerd of niet direct herleidbaar profiel worden gebruikt om belangstelling bij een Opdrachtgever te verkennen." },
        { type: "p", text: "5. Het akkoord van de Kandidaat geldt uitsluitend voor:" },
        {
          type: "list",
          items: ["de genoemde opdracht;", "de genoemde Opdrachtgever;", "het beschreven doel;", "de aangegeven cv-versie."],
        },
        { type: "p", text: "6. Een akkoord voor één opdracht geldt niet voor andere opdrachten of Opdrachtgevers." },
        { type: "p", text: "7. De Kandidaat kan een voordracht weigeren zonder dat daardoor de algemene inschrijving eindigt." },
        { type: "p", text: "8. De Kandidaat kan het akkoord intrekken zolang het cv nog niet is verzonden." },
        { type: "p", text: "9. Nadat het cv is verzonden, kan de verstrekking niet volledig ongedaan worden gemaakt." },
        { type: "p", text: "10. Wanneer daarvoor aanleiding bestaat, kan Meester Inkoop de Opdrachtgever verzoeken het cv te verwijderen." },
        { type: "p", text: "11. Meester Inkoop registreert:" },
        {
          type: "list",
          items: [
            "voor welke opdracht akkoord is gegeven;",
            "aan welke Opdrachtgever het cv is verstrekt;",
            "welke cv-versie is gebruikt;",
            "wanneer akkoord is gegeven;",
            "wanneer het cv daadwerkelijk is verzonden.",
          ],
        },
        { type: "p", text: "12. Wanneer een voordracht niet tot een opdracht leidt, blijft het profiel intern beschikbaar voor andere matches zolang de inschrijving actief is." },
        { type: "p", text: "13. Voor iedere volgende externe voordracht wordt opnieuw akkoord gevraagd." },
      ],
    },
    {
      number: 13,
      title: "Verantwoordelijkheid van de Opdrachtgever",
      blocks: [
        { type: "p", text: "1. Een Opdrachtgever die het cv ontvangt, verwerkt de gegevens voor de eigen selectie- en opdrachtgeversdoeleinden." },
        { type: "p", text: "2. De Opdrachtgever kan daardoor zelfstandig verwerkingsverantwoordelijke worden voor de verdere verwerking van het ontvangen cv." },
        { type: "p", text: "3. Meester Inkoop kan met Opdrachtgevers afspraken maken over:" },
        {
          type: "list",
          items: [
            "vertrouwelijke behandeling;",
            "beperkte toegang;",
            "gebruik uitsluitend voor de betreffende opdracht;",
            "bewaartermijnen;",
            "verwijdering wanneer geen samenwerking tot stand komt.",
          ],
        },
        { type: "p", text: "4. Meester Inkoop kan niet volledig garanderen dat een Opdrachtgever alle verplichtingen correct naleeft." },
        { type: "p", text: "5. Meester Inkoop blijft wel verantwoordelijk voor een zorgvuldige keuze van Opdrachtgevers en een zorgvuldige verstrekking vanuit Inkoopmatch." },
      ],
    },
    {
      number: 14,
      title: "Mogelijke samenwerkingsvormen",
      blocks: [
        { type: "p", text: "1. Een match kan onder andere leiden tot:" },
        {
          type: "list",
          items: [
            "een bemiddelingsovereenkomst met The Goodlife Company B.V. en de Opdrachtgever;",
            "een arbeidsovereenkomst met The Goodlife Company B.V.;",
            "detachering via Meester Inkoop;",
            "een detavastconstructie;",
            "indiensttreding bij een Opdrachtgever;",
            "een tijdelijke projectovereenkomst;",
            "een opdrachtovereenkomst als zelfstandige, voor zover juridisch toegestaan;",
            "een andere afzonderlijk overeengekomen vorm.",
          ],
        },
        { type: "p", text: "2. De exacte afspraken worden vastgelegd in een afzonderlijke overeenkomst." },
        { type: "p", text: "3. Deze voorwaarden zijn op zichzelf:" },
        {
          type: "list",
          items: [
            "geen arbeidsovereenkomst;",
            "geen opdrachtovereenkomst;",
            "geen uitzendovereenkomst;",
            "geen garantie op inzet;",
            "geen toezegging over uren, looptijd, tarief of salaris.",
          ],
        },
        { type: "p", text: "4. Voorafgaand aan een concrete samenwerking kan Meester Inkoop aanvullende gegevens en documenten opvragen die voor die samenwerking noodzakelijk zijn." },
        { type: "p", text: "5. Gegevens zoals een BSN, identiteitsbewijs, loonbelastinggegevens of bankgegevens worden niet al tijdens de algemene matching gevraagd wanneer deze nog niet noodzakelijk zijn." },
      ],
    },
    {
      number: 15,
      title: "Verplichtingen van de Kandidaat",
      blocks: [
        { type: "p", text: "1. De Kandidaat verstrekt juiste, actuele en volledige informatie." },
        { type: "p", text: "2. De Kandidaat meldt relevante wijzigingen zo spoedig mogelijk, waaronder wijzigingen in:" },
        {
          type: "list",
          items: [
            "contactgegevens;",
            "beschikbaarheid;",
            "werkervaring;",
            "opleiding of certificeringen;",
            "bevoegdheden of registraties;",
            "de mogelijkheid om de werkzaamheden rechtmatig uit te voeren.",
          ],
        },
        { type: "p", text: "3. De Kandidaat mag geen bewust onjuiste, vervalste of misleidende informatie verstrekken." },
        { type: "p", text: "4. De Kandidaat mag uitsluitend documenten uploaden:" },
        {
          type: "list",
          items: ["die betrekking hebben op de Kandidaat zelf; en", "waarvoor de Kandidaat voldoende rechten heeft."],
        },
        { type: "p", text: "5. De Kandidaat wordt verzocht niet in het cv op te nemen:" },
        {
          type: "list",
          items: [
            "een BSN;",
            "een volledige kopie van een identiteitsdocument;",
            "medische informatie;",
            "strafrechtelijke informatie;",
            "religieuze of politieke overtuigingen;",
            "vakbondslidmaatschap;",
            "andere gegevens die niet noodzakelijk zijn voor professionele matching.",
          ],
        },
        { type: "p", text: "6. Meester Inkoop mag onnodige of risicovolle persoonsgegevens verwijderen of afschermen wanneer deze voor de matching niet nodig zijn." },
        { type: "p", text: "7. De Kandidaat mag geen bestanden uploaden die:" },
        {
          type: "list",
          items: [
            "malware of schadelijke code bevatten;",
            "beveiligingsmaatregelen proberen te omzeilen;",
            "rechten van anderen schenden;",
            "onrechtmatige inhoud bevatten.",
          ],
        },
        { type: "p", text: "8. De Kandidaat behandelt account- en inloggegevens vertrouwelijk." },
        { type: "p", text: "9. Vermoedelijk misbruik van een account moet direct worden gemeld." },
      ],
    },
    {
      number: 16,
      title: "Controle van verstrekte informatie",
      blocks: [
        { type: "p", text: "1. Meester Inkoop mag informatie uit het cv bespreken en verifiëren wanneer dit noodzakelijk is voor een concrete voordracht of plaatsing." },
        { type: "p", text: "2. Verificatie kan onder andere betrekking hebben op:" },
        {
          type: "list",
          items: ["opleidingen;", "certificeringen;", "relevante werkervaring;", "professionele registraties;", "beschikbaarheid."],
        },
        { type: "p", text: "3. Referenties worden niet zonder voorafgaande afstemming met de Kandidaat benaderd." },
        { type: "p", text: "4. Openbare internetinformatie wordt niet zonder meer als juist beschouwd." },
        { type: "p", text: "5. Wanneer openbare informatie bij de beoordeling wordt betrokken, krijgt de Kandidaat waar nodig de mogelijkheid om de informatie toe te lichten of te corrigeren." },
        { type: "p", text: "6. Voor een uitgebreidere screening kunnen afzonderlijke voorwaarden, informatie en wettelijke grondslagen nodig zijn." },
      ],
    },
    {
      number: 17,
      title: "Communicatie",
      blocks: [
        { type: "p", text: "1. Meester Inkoop mag de Kandidaat benaderen voor communicatie die noodzakelijk is voor de dienstverlening, waaronder:" },
        {
          type: "list",
          items: [
            "account- en beveiligingsberichten;",
            "vragen over het cv;",
            "matchvoorstellen;",
            "verzoeken om beschikbaarheid te bevestigen;",
            "verzoeken om een voordracht goed te keuren;",
            "actualisatie- en verlengingsverzoeken;",
            "informatie over een lopend bemiddelingsproces;",
            "wijzigingen in de dienst of voorwaarden.",
          ],
        },
        { type: "p", text: "2. Deze communicatie is onderdeel van de matching- en bemiddelingsdienst." },
        { type: "p", text: "3. Voor algemene nieuwsbrieven en niet-noodzakelijke commerciële communicatie wordt afzonderlijk toestemming gevraagd wanneer dat wettelijk vereist is." },
        { type: "p", text: "4. De Kandidaat kan zich voor commerciële communicatie afmelden zonder dat de algemene inschrijving daardoor automatisch eindigt." },
        { type: "p", text: "5. De Kandidaat is verantwoordelijk voor het verstrekken van bereikbare en actuele contactgegevens." },
      ],
    },
    {
      number: 18,
      title: "Persoonsgegevens en Microsoft-omgeving",
      blocks: [
        { type: "p", text: "1. The Goodlife Company B.V. is verantwoordelijk voor de verwerking van persoonsgegevens binnen Inkoopmatch, voor zover zij het doel en de middelen van die verwerking bepaalt." },
        { type: "p", text: "2. Meer informatie staat in de afzonderlijke privacyverklaring." },
        { type: "p", text: "3. Voor de dienstverlening kunnen zakelijke Microsoft-diensten worden gebruikt, waaronder:" },
        {
          type: "list",
          items: [
            "Microsoft Azure;",
            "Microsoft Power Platform en Power Apps;",
            "Microsoft 365 en Office-toepassingen;",
            "zakelijke Microsoft Copilot- of AI-diensten;",
            "Microsoft-opslag-, authenticatie-, beveiligings- en loggingdiensten.",
          ],
        },
        { type: "p", text: "4. Microsoft en eventuele andere technische leveranciers kunnen persoonsgegevens verwerken als leverancier of verwerker van The Goodlife Company B.V." },
        { type: "p", text: "5. Meester Inkoop selecteert en configureert de gebruikte diensten met het doel dat:" },
        {
          type: "list",
          items: [
            "gegevens binnen de zakelijke omgeving worden verwerkt;",
            "toegang wordt beperkt tot bevoegde personen;",
            "cv's niet via persoonlijke accounts worden verwerkt;",
            "persoonsgegevens niet worden gebruikt voor training van algemene AI-basismodellen;",
            "passende contractuele privacy- en beveiligingsafspraken gelden.",
          ],
        },
        { type: "p", text: "6. De exacte gebruikte diensten, gegevenscategorieën, ontvangers en eventuele internationale doorgiften worden in de privacyverklaring of aanvullende privacy-informatie beschreven." },
        { type: "p", text: "7. Wanneer de technische inrichting wezenlijk verandert, wordt beoordeeld of de privacy-informatie en deze voorwaarden moeten worden aangepast." },
      ],
    },
    {
      number: 19,
      title: "Beveiliging",
      blocks: [
        { type: "p", text: "1. Meester Inkoop neemt passende technische en organisatorische maatregelen om persoonsgegevens te beschermen." },
        { type: "p", text: "2. Deze maatregelen kunnen onder andere bestaan uit:" },
        {
          type: "list",
          items: [
            "persoonlijke gebruikersaccounts;",
            "multifactorauthenticatie;",
            "rolgebaseerd toegangsbeheer;",
            "versleutelde verbindingen;",
            "versleutelde opslag;",
            "logging en controle;",
            "beveiligde back-ups;",
            "malwarecontrole;",
            "leveranciersbeheer;",
            "beveiligingsupdates;",
            "procedures voor incidenten en datalekken.",
          ],
        },
        { type: "p", text: "3. Toegang tot cv's wordt beperkt tot medewerkers en leveranciers die deze toegang voor hun werkzaamheden nodig hebben." },
        { type: "p", text: "4. Meester Inkoop mag een account, koppeling of functionaliteit tijdelijk blokkeren wanneer dat noodzakelijk is om:" },
        {
          type: "list",
          items: [
            "een beveiligingsincident te onderzoeken;",
            "ongeautoriseerde toegang te voorkomen;",
            "misbruik te beperken;",
            "persoonsgegevens te beschermen;",
            "aan een wettelijke verplichting te voldoen.",
          ],
        },
        { type: "p", text: "5. Geen enkel digitaal systeem kan absolute beveiliging garanderen." },
        { type: "p", text: "6. Wanneer een beveiligingsincident gevolgen heeft voor de Kandidaat, informeert Meester Inkoop de Kandidaat voor zover en binnen de termijn waarin dat wettelijk noodzakelijk is." },
        { type: "p", text: "7. Een vermoedelijk beveiligingsprobleem kan worden gemeld via info@meesterinkoop.nl, onder vermelding van \"beveiligingsmelding\"." },
      ],
    },
    {
      number: 20,
      title: "Beschikbaarheid van Inkoopmatch",
      blocks: [
        { type: "p", text: "1. Meester Inkoop probeert Inkoopmatch zorgvuldig en voldoende beschikbaar aan te bieden." },
        { type: "p", text: "2. De dienst kan tijdelijk geheel of gedeeltelijk niet beschikbaar zijn door:" },
        {
          type: "list",
          items: [
            "onderhoud;",
            "beveiligingsupdates;",
            "storingen;",
            "problemen bij Microsoft of andere leveranciers;",
            "internet- of communicatiestoringen;",
            "maatregelen ter voorkoming van misbruik;",
            "overmacht.",
          ],
        },
        { type: "p", text: "3. Meester Inkoop garandeert geen ononderbroken of volledig foutloze beschikbaarheid." },
        { type: "p", text: "4. Meester Inkoop mag functionaliteiten wijzigen wanneer dat redelijkerwijs noodzakelijk is voor:" },
        {
          type: "list",
          items: ["beveiliging;", "privacy;", "wet- en regelgeving;", "verbetering van de dienst;", "wijzigingen bij leveranciers;", "technische continuïteit."],
        },
        { type: "p", text: "5. Wezenlijke wijzigingen worden waar redelijk mogelijk vooraf gecommuniceerd." },
      ],
    },
    {
      number: 21,
      title: "Rechten op cv en platform",
      blocks: [
        { type: "p", text: "1. De Kandidaat behoudt de rechten op de eigen cv-inhoud en zelf aangeleverde documenten." },
        { type: "p", text: "2. De Kandidaat geeft Meester Inkoop gedurende de inschrijving een beperkt gebruiksrecht om het cv:" },
        {
          type: "list",
          items: [
            "op te slaan;",
            "technisch te verwerken;",
            "te structureren;",
            "intern te analyseren;",
            "te vergelijken met opdrachten;",
            "na afzonderlijk akkoord voor een concrete opdracht te delen.",
          ],
        },
        { type: "p", text: "3. Dit gebruiksrecht eindigt wanneer de gegevens overeenkomstig de privacyverklaring worden verwijderd." },
        { type: "p", text: "4. De software, vormgeving, matchingsmethodiek, databankstructuur en overige onderdelen van Inkoopmatch blijven eigendom van The Goodlife Company B.V. of haar licentiegevers." },
        { type: "p", text: "5. De Kandidaat mag Inkoopmatch niet:" },
        {
          type: "list",
          items: [
            "kopiëren of reverse-engineeren;",
            "geautomatiseerd uitlezen zonder toestemming;",
            "gebruiken om beveiligingsmaatregelen te omzeilen;",
            "gebruiken om gegevens van anderen te verzamelen;",
            "commercieel exploiteren buiten het doel van de inschrijving.",
          ],
        },
      ],
    },
    {
      number: 22,
      title: "Geen exclusiviteit en geen verplichting",
      blocks: [
        { type: "p", text: "1. De inschrijving is niet exclusief." },
        { type: "p", text: "2. De Kandidaat mag:" },
        {
          type: "list",
          items: [
            "zich bij andere bemiddelaars inschrijven;",
            "zelf op vacatures en opdrachten reageren;",
            "een voorgestelde opdracht weigeren;",
            "de inschrijving beëindigen.",
          ],
        },
        { type: "p", text: "3. De Kandidaat is niet verplicht een matchvoorstel of aanbod te accepteren." },
        { type: "p", text: "4. Meester Inkoop is niet verplicht iedere beschikbare opdracht aan iedere Kandidaat voor te stellen." },
        { type: "p", text: "5. Eventuele exclusiviteit voor een concrete opdracht geldt alleen wanneer dit vooraf afzonderlijk en schriftelijk is overeengekomen." },
      ],
    },
    {
      number: 23,
      title: "Opschorting en beëindiging door Meester Inkoop",
      blocks: [
        { type: "p", text: "1. Meester Inkoop mag een account of inschrijving tijdelijk opschorten wanneer:" },
        {
          type: "list",
          items: [
            "aanvullende controle noodzakelijk is;",
            "de gegevens vermoedelijk onjuist zijn;",
            "sprake is van een beveiligingsrisico;",
            "misbruik wordt vermoed;",
            "de Kandidaat deze voorwaarden niet naleeft.",
          ],
        },
        { type: "p", text: "2. Meester Inkoop mag de overeenkomst beëindigen wanneer:" },
        {
          type: "list",
          items: [
            "de Kandidaat bewust onjuiste of vervalste informatie verstrekt;",
            "sprake is van fraude of ernstig misbruik;",
            "systemen of persoonsgegevens in gevaar worden gebracht;",
            "de Kandidaat ernstig tekortschiet in de naleving van deze voorwaarden;",
            "voortzetting in strijd is met wet- of regelgeving;",
            "Meester Inkoop de dienst beëindigt.",
          ],
        },
        { type: "p", text: "3. Wanneer herstel mogelijk is, kan Meester Inkoop eerst een redelijke hersteltermijn geven." },
        { type: "p", text: "4. Meester Inkoop informeert de Kandidaat over de beëindiging en de reden daarvan, tenzij dit vanwege beveiliging, onderzoek of een wettelijke verplichting niet mogelijk is." },
        { type: "p", text: "5. Na beëindiging worden persoonsgegevens behandeld overeenkomstig de privacyverklaring en het geldende bewaarbeleid." },
      ],
    },
    {
      number: 24,
      title: "Aansprakelijkheid",
      blocks: [
        { type: "p", text: "1. Meester Inkoop voert de dienstverlening zorgvuldig uit." },
        { type: "p", text: "2. Meester Inkoop garandeert niet dat:" },
        {
          type: "list",
          items: [
            "alle opdrachtinformatie volledig of foutloos is;",
            "ieder AI-resultaat volledig juist is;",
            "een matchingspercentage overeenkomt met het oordeel van de Opdrachtgever;",
            "een opdracht beschikbaar blijft;",
            "een plaatsing of overeenkomst tot stand komt.",
          ],
        },
        { type: "p", text: "3. Meester Inkoop is niet aansprakelijk voor schade die uitsluitend ontstaat door:" },
        {
          type: "list",
          items: [
            "een zelfstandig selectiebesluit van de Opdrachtgever;",
            "het intrekken of wijzigen van een opdracht door de Opdrachtgever;",
            "onjuiste of onvolledige informatie van de Kandidaat;",
            "het niet actueel houden van het profiel;",
            "storingen buiten de redelijke invloedssfeer van Meester Inkoop.",
          ],
        },
        { type: "p", text: "4. Meester Inkoop is aansprakelijk voor directe schade die het gevolg is van een toerekenbare tekortkoming of onrechtmatige daad van Meester Inkoop." },
        { type: "p", text: "5. Voor zover wettelijk toegestaan, is aansprakelijkheid voor indirecte schade uitgesloten, waaronder:" },
        {
          type: "list",
          items: ["gemiste inkomsten;", "gemiste opdrachten;", "gemiste kansen;", "gevolgschade;", "reputatieschade."],
        },
        { type: "p", text: "6. Wanneer de aansprakelijkheidsverzekering dekking biedt, is de aansprakelijkheid beperkt tot het bedrag dat voor het betreffende geval door de verzekeraar wordt uitgekeerd, vermeerderd met het toepasselijke eigen risico." },
        { type: "p", text: "7. Wanneer de verzekering om een andere reden dan het ontbreken van dekking niet uitkeert, wordt de aansprakelijkheid beperkt tot een bedrag van € [REDELIJK BEDRAG INVULLEN - te bevestigen] per gebeurtenis." },
        { type: "p", text: "8. De beperkingen gelden niet:" },
        {
          type: "list",
          items: [
            "bij opzet of bewuste roekeloosheid van de leiding van The Goodlife Company B.V.;",
            "bij overlijden of lichamelijk letsel voor zover uitsluiting wettelijk niet is toegestaan;",
            "wanneer een wettelijke aansprakelijkheid niet mag worden beperkt;",
            "voor wettelijke rechten wegens onrechtmatige verwerking van persoonsgegevens.",
          ],
        },
        { type: "p", text: "9. Dwingendrechtelijke rechten van consumenten en andere Kandidaten blijven van toepassing." },
      ],
    },
    {
      number: 25,
      title: "Overmacht",
      blocks: [
        { type: "p", text: "1. Meester Inkoop is niet gehouden tot nakoming wanneer dit tijdelijk of blijvend onmogelijk is door een omstandigheid die redelijkerwijs niet aan Meester Inkoop kan worden toegerekend." },
        { type: "p", text: "2. Hieronder kunnen onder andere vallen:" },
        {
          type: "list",
          items: [
            "langdurige internet- of stroomstoringen;",
            "ernstige storingen bij Microsoft of andere essentiële leveranciers;",
            "cyberaanvallen;",
            "overheidsmaatregelen;",
            "natuurrampen;",
            "oorlog, terrorisme of maatschappelijke ontwrichting;",
            "uitval van essentiële infrastructuur.",
          ],
        },
        { type: "p", text: "3. Meester Inkoop probeert de gevolgen redelijkerwijs te beperken." },
        { type: "p", text: "4. Wanneer de dienstverlening gedurende langere tijd niet kan worden voortgezet, mogen beide partijen de overeenkomst beëindigen." },
      ],
    },
    {
      number: 26,
      title: "Privacyrechten",
      blocks: [
        { type: "p", text: "1. De Kandidaat kan, voor zover de wet dit toestaat, verzoeken om:" },
        {
          type: "list",
          items: ["inzage in persoonsgegevens;", "correctie;", "verwijdering;", "beperking van verwerking;", "overdracht van gegevens;", "bezwaar tegen bepaalde verwerkingen."],
        },
        { type: "p", text: "2. Een verzoek kan worden ingediend via info@meesterinkoop.nl, onder vermelding van \"privacyverzoek\"." },
        { type: "p", text: "3. Meester Inkoop mag aanvullende informatie vragen wanneer dit noodzakelijk is om de identiteit van de verzoeker vast te stellen." },
        { type: "p", text: "4. Bij een verwijderingsverzoek:" },
        {
          type: "list",
          items: [
            "wordt het profiel zo spoedig mogelijk geblokkeerd voor nieuwe matching;",
            "wordt geen nieuwe externe voordracht gedaan;",
            "worden het cv en matchprofiel verwijderd, tenzij een wettelijke uitzondering geldt.",
          ],
        },
        { type: "p", text: "5. De Kandidaat kan een privacyklacht indienen bij Meester Inkoop." },
        { type: "p", text: "6. De Kandidaat heeft daarnaast het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens." },
      ],
    },
    {
      number: 27,
      title: "Klachten over de dienstverlening",
      blocks: [
        { type: "p", text: "1. Een klacht over matching, bemiddeling of administratie kan worden ingediend via info@meesterinkoop.nl." },
        { type: "p", text: "2. Vermeld bij de klacht waar mogelijk:" },
        {
          type: "list",
          items: [
            "de naam en contactgegevens van de Kandidaat;",
            "de betreffende opdracht of voordracht;",
            "een omschrijving van de klacht;",
            "de gewenste oplossing.",
          ],
        },
        { type: "p", text: "3. Meester Inkoop bevestigt de ontvangst van de klacht." },
        { type: "p", text: "4. Meester Inkoop probeert de klacht binnen een redelijke termijn inhoudelijk te beantwoorden." },
        { type: "p", text: "5. Een klacht schort lopende verplichtingen niet automatisch op." },
      ],
    },
    {
      number: 28,
      title: "Wijziging van de voorwaarden",
      blocks: [
        { type: "p", text: "1. Meester Inkoop mag deze voorwaarden wijzigen wanneer dit noodzakelijk of redelijk is vanwege:" },
        {
          type: "list",
          items: [
            "wijzigingen in de dienstverlening;",
            "wijzigingen in wet- en regelgeving;",
            "beveiligings- of privacymaatregelen;",
            "wijzigingen in AI- of Microsoft-diensten;",
            "organisatorische veranderingen;",
            "verduidelijking van bestaande afspraken.",
          ],
        },
        { type: "p", text: "2. Bij een wezenlijke wijziging wordt de Kandidaat vooraf geïnformeerd." },
        { type: "p", text: "3. Wanneer een wijziging de positie van de Kandidaat wezenlijk nadelig beïnvloedt, kan de Kandidaat de inschrijving beëindigen voordat de wijziging ingaat." },
        { type: "p", text: "4. Voor zover opnieuw akkoord nodig is, wordt dit via Inkoopmatch gevraagd." },
        { type: "p", text: "5. De actuele versie en ingangsdatum worden op de website vermeld." },
      ],
    },
    {
      number: 29,
      title: "Overige bepalingen",
      blocks: [
        { type: "p", text: "1. Wanneer een bepaling ongeldig of niet afdwingbaar blijkt, blijven de overige bepalingen geldig." },
        { type: "p", text: "2. De ongeldige bepaling wordt vervangen door een geldige bepaling die zoveel mogelijk aansluit bij het doel en de strekking van de oorspronkelijke bepaling." },
        { type: "p", text: "3. Het niet direct afdwingen van een recht betekent niet dat afstand van dat recht wordt gedaan." },
        { type: "p", text: "4. De Kandidaat mag rechten of verplichtingen uit de overeenkomst niet zonder voorafgaande schriftelijke toestemming aan een ander overdragen." },
        { type: "p", text: "5. The Goodlife Company B.V. mag de overeenkomst in het kader van een herstructurering of bedrijfsoverdracht overdragen, mits:" },
        {
          type: "list",
          items: ["de Kandidaat hierover wordt geïnformeerd; en", "de rechten van de Kandidaat niet wezenlijk worden verminderd."],
        },
        { type: "p", text: "6. De Nederlandstalige versie is leidend wanneer ook vertalingen worden aangeboden." },
      ],
    },
    {
      number: 30,
      title: "Toepasselijk recht en geschillen",
      blocks: [
        { type: "p", text: "1. Op de overeenkomst is Nederlands recht van toepassing." },
        { type: "p", text: "2. Partijen proberen een geschil eerst in onderling overleg op te lossen." },
        { type: "p", text: "3. Wanneer dit niet lukt, kan het geschil worden voorgelegd aan de bevoegde Nederlandse rechter." },
        { type: "p", text: "4. Wanneer de Kandidaat als consument handelt, blijven de dwingendrechtelijke regels over de bevoegde rechter en consumentenbescherming volledig van toepassing." },
      ],
    },
  ],
  formTexts: [
    {
      heading: "Verplichte akkoordverklaring",
      text: "Ik ga akkoord met de Gebruiks- en bemiddelingsvoorwaarden van Inkoopmatch. Ik begrijp dat The Goodlife Company B.V. mijn contractspartij is, dat Meester Inkoop de bemiddeling uitvoert en dat Inkoopmatch daarbij als digitaal hulpmiddel wordt gebruikt.",
    },
    {
      heading: "Verplichte informatieverklaring",
      text: "Ik heb de privacyverklaring en de uitleg over AI-ondersteunde matching gelezen.\n\nDeze tweede verklaring is een bevestiging dat de informatie is verstrekt en is geen algemene toestemming voor alle verwerking van persoonsgegevens.",
    },
    {
      heading: "Optionele commerciële communicatie",
      text: "Ik ontvang graag algemene updates, nieuws en andere commerciële berichten van Meester Inkoop en Inkoopmatch. Ik kan mij hiervoor op ieder moment afmelden.",
    },
    {
      heading: "Akkoord voor een concrete voordracht",
      text: "Ik ga ermee akkoord dat Meester Inkoop versie [nummer en datum] van mijn cv voor de opdracht [naam en opdrachtnummer] verstrekt aan [naam Opdrachtgever]. Ik begrijp dat dit akkoord uitsluitend geldt voor deze specifieke voordracht.",
    },
    {
      heading: "Verlengen van de inschrijving",
      text: "Ik wil mijn inschrijving bij Inkoopmatch met twaalf maanden verlengen. Ik begrijp dat mijn cv gedurende deze actieve periode intern mag worden gebruikt om nieuwe passende opdrachten te vinden. Voor iedere verstrekking van mijn volledige cv aan een Opdrachtgever wordt opnieuw mijn akkoord gevraagd.",
    },
  ],
};

// =====================================================================
// ENGLISH - complete translation, courtesy only. NOT independently
// legally reviewed. Dutch (termsNL above) is authoritative.
// =====================================================================
export const termsEN: TermsContent = {
  docTitle: "InkoopMatch Terms of Use and Mediation",
  version: "[1.0 - to be confirmed]",
  effectiveDate: "[date - to be confirmed]",
  lastModified: "[date - to be confirmed]",
  intro: [
    "These terms apply to individuals who register via InkoopMatch for matching, mediation, and possible placement with a client organisation.",
    "We think it's important that you know the key agreements right away, before you register.",
  ],
  summaryPoints: [
    "The Goodlife Company B.V. is your contracting party. The Goodlife Company B.V. offers its mediation services under the name Meester Inkoop and uses InkoopMatch as a digital matching platform.",
    "InkoopMatch is a digital tool. CVs are registered, analysed, and compared against assignments via InkoopMatch. InkoopMatch does not independently decide on your suitability.",
    "Meester Inkoop carries out the mediation. Meester Inkoop staff review proposed matches, maintain contact with candidates and client organisations, and handle the further mediation and administrative processing.",
    "Your registration applies to multiple possible assignments. Your registration is not limited to the assignment you originally applied for. As long as your registration is active, your CV may be used internally to propose other suitable assignments.",
    "Your registration remains active for twelve months. After around six months we may ask you to check your details, CV, and availability. Before the end of the twelve months we will ask whether you want to extend your registration.",
    "AI supports the matching. The system can calculate the degree to which your CV matches the qualifications requested for an assignment.",
    "The match percentage is not a final judgement. A Meester Inkoop staff member always reviews the CV, the assignment, and the proposed match percentage, and may deviate from the outcome.",
    "Your full CV is not sent to a client organisation without your consent. We ask for separate consent for every specific proposal.",
    "No placement does not mean your registration stops. When a proposal doesn't lead to an assignment, your CV may continue to be used internally for further matches as long as your registration is active.",
    "You can stop at any time. You can end your registration at any time and request that your CV and match profile be deleted.",
    "A registration or match provides no guarantee. A registration, match percentage, or proposal does not entitle you to an interview, placement, employment contract, or assignment.",
  ],
  summaryClosing: "The full agreement is set out below.",
  articles: [
    {
      number: 1,
      title: "Who provides the service?",
      blocks: [
        { type: "p", text: "1. The service is provided by:" },
        {
          type: "list",
          items: [
            "Legal name: The Goodlife Company B.V.",
            "Chamber of Commerce (KvK) number: [CURRENT KVK NUMBER TO BE CONFIRMED]",
            "Trade names: Meester Inkoop and InkoopMatch",
            "Registered address: Park Vronesteyn 34, 2271 HS Voorburg, the Netherlands",
            "Phone number: 070-2110502",
            "Email address: info@meesterinkoop.nl",
            "Privacy contact: info@meesterinkoop.nl, marked \"privacy\"",
          ],
        },
        { type: "p", text: "2. In these terms, The Goodlife Company B.V. is referred to as \"Meester Inkoop\", \"we\", or \"us\"." },
        { type: "p", text: "3. \"InkoopMatch\" is the name of the digital platform Meester Inkoop uses for registration, CV analysis, matching, and support of the mediation process." },
        { type: "p", text: "4. InkoopMatch is not a separate legal entity and not a separate contracting party." },
        { type: "p", text: "5. The agreement for using InkoopMatch and the matching and mediation service is entered into with The Goodlife Company B.V." },
        { type: "p", text: "6. The person who registers via InkoopMatch is referred to as the \"Candidate\" or \"you\"." },
        { type: "p", text: "7. An organisation offering a vacancy, assignment, temporary position, secondment, project, or other professional opportunity is referred to as the \"Client\"." },
      ],
    },
    {
      number: 2,
      title: "Applicability and formation of the agreement",
      blocks: [
        { type: "p", text: "1. These terms apply when you:" },
        {
          type: "list",
          items: [
            "create an InkoopMatch account;",
            "provide a CV or profile to InkoopMatch;",
            "register for matching or mediation;",
            "respond to an assignment via InkoopMatch; or",
            "otherwise ask Meester Inkoop to look for suitable work or assignments on your behalf.",
          ],
        },
        { type: "p", text: "2. The agreement is formed once you have:" },
        {
          type: "list",
          items: [
            "provided the requested registration details;",
            "been able to view and save these terms; and",
            "agreed to these terms.",
          ],
        },
        { type: "p", text: "3. The privacy notice and the explanation of AI matching contain additional information about the processing of personal data. These documents are not general terms and conditions, but must be available before registration." },
        { type: "p", text: "4. Additional agreements and terms may apply to a specific placement, mediation, secondment, employment contract, assignment agreement, secondment-to-permanent arrangement, or other collaboration." },
        { type: "p", text: "5. In the event of a conflict between these terms and a later, specific agreement, the specific agreement takes precedence with regard to the subject matter it expressly governs." },
      ],
    },
    {
      number: 3,
      title: "Who can register?",
      blocks: [
        { type: "p", text: "1. InkoopMatch is intended for people interested in vacancies, assignments, secondment, projects, or other professional opportunities." },
        { type: "p", text: "2. You must have the legal capacity to enter into the agreement." },
        { type: "p", text: "3. A person under the age of eighteen may only register when:" },
        {
          type: "list",
          items: [
            "Meester Inkoop has opened the service to this age group; and",
            "consent from a parent or legal representative is obtained where legally required.",
          ],
        },
        { type: "p", text: "4. Meester Inkoop may refuse a registration when:" },
        {
          type: "list",
          items: [
            "the information provided is clearly incorrect, incomplete, or misleading;",
            "the registration is suspected of being used for improper purposes;",
            "there is fraud, abuse, or a security risk;",
            "the requested service is not offered by Meester Inkoop;",
            "continuing would conflict with law or regulation; or",
            "Meester Inkoop cannot reasonably perform the service.",
          ],
        },
        { type: "p", text: "5. Regular registration and matching are free of charge for the Candidate, unless expressly agreed otherwise in writing in advance." },
      ],
    },
    {
      number: 4,
      title: "Division of roles between InkoopMatch and Meester Inkoop",
      blocks: [
        { type: "p", text: "4.1 InkoopMatch as a digital tool" },
        { type: "p", text: "1. InkoopMatch supports Meester Inkoop with:" },
        {
          type: "list",
          items: [
            "registering Candidates;",
            "storing and managing CVs and profile data;",
            "reading and structuring information from CVs;",
            "comparing candidate profiles with assignments;",
            "calculating an indicative match percentage;",
            "presenting possible matches to Meester Inkoop staff;",
            "recording human assessments;",
            "recording consent for a specific proposal;",
            "recording the progress of a mediation process.",
          ],
        },
        { type: "p", text: "2. InkoopMatch is a technical support tool." },
        { type: "p", text: "3. InkoopMatch:" },
        {
          type: "list",
          items: [
            "does not itself enter into agreements with Candidates or Clients;",
            "does not independently make a final selection decision;",
            "does not independently and definitively reject Candidates;",
            "does not independently send CVs without the required review and approval.",
          ],
        },
        { type: "p", text: "4.2 Meester Inkoop as mediator" },
        { type: "p", text: "4. The actual matching, assessment, and mediation are carried out by Meester Inkoop staff." },
        { type: "p", text: "5. Meester Inkoop may, among other things, be responsible for:" },
        {
          type: "list",
          items: [
            "assessing proposed matches;",
            "contact with the Candidate;",
            "contact with Clients;",
            "checking availability and relevant profile data;",
            "discussing a possible assignment;",
            "preparing and carrying out a proposal;",
            "scheduling or guiding interviews;",
            "preparing agreements and placement documents;",
            "onboarding and guidance;",
            "contract, hours, and placement administration;",
            "invoicing and other administrative work, insofar as this belongs to the chosen form of collaboration.",
          ],
        },
        { type: "p", text: "6. Exactly which activities Meester Inkoop carries out depends on the nature of the assignment and the chosen form of collaboration." },
        { type: "p", text: "4.3 Decision by the Client" },
        { type: "p", text: "7. The Client ultimately and independently decides:" },
        {
          type: "list",
          items: [
            "who is invited for an interview;",
            "who proceeds in a selection process;",
            "to whom an offer is made;",
            "with whom an agreement is concluded.",
          ],
        },
        { type: "p", text: "8. An assessment or proposal by Meester Inkoop does not obligate a Client to select the Candidate." },
      ],
    },
    {
      number: 5,
      title: "Certification",
      blocks: [
        { type: "p", text: "1. The Goodlife Company B.V., trading as Meester Inkoop, may hold certifications, quality marks, or registrations relating to certain parts of its services." },
        { type: "p", text: "2. Before a certification claim is published, the website must state at least:" },
        {
          type: "list",
          items: [
            "the name of the certification or quality mark;",
            "the certified legal entity;",
            "the registration or certificate number;",
            "the period of validity;",
            "the activities the certification covers.",
          ],
        },
        { type: "p", text: "3. A certification applies only within the formally defined scope of the relevant certificate." },
        { type: "p", text: "4. A certification of the mediation, administration, or supply of staff does not automatically mean that:" },
        {
          type: "list",
          items: [
            "the AI system is separately certified;",
            "every match is substantively correct;",
            "every Candidate is placed;",
            "every Client falls under the relevant certification.",
          ],
        },
        { type: "p", text: "5. Current certification details are published at [webpage or register reference - to be confirmed]." },
      ],
    },
    {
      number: 6,
      title: "The matching and mediation service",
      blocks: [
        { type: "p", text: "1. Meester Inkoop supports Candidates in finding potentially suitable professional opportunities." },
        { type: "p", text: "2. The service may consist of:" },
        {
          type: "list",
          items: [
            "registration and management of a candidate profile;",
            "processing and analysis of a CV;",
            "comparison against one or more assignments;",
            "AI-assisted matching;",
            "human assessment of matches;",
            "making match proposals;",
            "discussing a possible proposal;",
            "putting the Candidate forward to a Client;",
            "support with selection, onboarding, and administration.",
          ],
        },
        { type: "p", text: "3. The registration applies to an ongoing matching service for the duration of the active registration period." },
        { type: "p", text: "4. The registration is therefore not limited to:" },
        { type: "list", items: ["one vacancy;", "one assignment;", "one Client; or", "one proposed match result."] },
        { type: "p", text: "5. When a match, application, or proposal does not lead to an assignment, Meester Inkoop may continue to use the CV and profile internally for new matches as long as the registration is active." },
        { type: "p", text: "6. Separate consent is requested again for every new external provision of the full CV." },
        { type: "p", text: "7. Meester Inkoop has a best-efforts obligation, not an obligation of result." },
        { type: "p", text: "8. Meester Inkoop does not guarantee that:" },
        {
          type: "list",
          items: [
            "suitable assignments are continuously available;",
            "every Candidate receives a match proposal;",
            "every match leads to a proposal;",
            "a Client shows interest;",
            "an interview or agreement comes about.",
          ],
        },
      ],
    },
    {
      number: 7,
      title: "Use of AI in matching",
      blocks: [
        { type: "p", text: "1. InkoopMatch may use AI and other automated techniques to compare information from the CV and candidate profile against the characteristics and qualifications of an assignment." },
        { type: "p", text: "2. The system can calculate an indicative match percentage or comparable assessment." },
        { type: "p", text: "3. Matching may use relevant professional data, including:" },
        {
          type: "list",
          items: [
            "work experience;",
            "role and project experience;",
            "education;",
            "knowledge and skills;",
            "certifications;",
            "industry or sector experience;",
            "experience with certain types of assignments;",
            "location or travel distance;",
            "availability;",
            "other qualifications relevant to the assignment.",
          ],
        },
        { type: "p", text: "4. The match percentage:" },
        {
          type: "list",
          items: [
            "is a tool for Meester Inkoop;",
            "is not an objective determination of suitability;",
            "is not a final selection decision;",
            "does not represent the statistical chance that the Candidate will get the assignment;",
            "does not constitute a guarantee of a proposal or placement;",
            "may be incomplete or incorrect.",
          ],
        },
        { type: "p", text: "5. The system may not definitively exclude a Candidate solely on the basis of an automatically calculated threshold." },
        { type: "p", text: "6. A lower score does not prevent a staff member from still assessing the Candidate as suitable." },
        { type: "p", text: "7. A higher score does not automatically mean the Candidate will be put forward." },
        { type: "p", text: "8. Meester Inkoop does not use special categories of personal data, such as health data, religion, ethnicity, or political opinion, as a selection criterion." },
        { type: "p", text: "9. Meester Inkoop also does not attempt to infer such data from other information." },
        { type: "p", text: "10. The Candidate may request:" },
        {
          type: "list",
          items: [
            "correction of information incorrectly taken from the CV;",
            "processing of a new CV;",
            "a human explanation of a proposed match;",
            "reassessment of a clearly incorrect match.",
          ],
        },
        { type: "p", text: "11. Meester Inkoop does not use personal data or CV content to train general-purpose AI foundation models." },
        { type: "p", text: "12. Anonymised data that can no longer reasonably be traced back to a person may be used to research and improve the quality and operation of InkoopMatch." },
      ],
    },
    {
      number: 8,
      title: "Mandatory human review",
      blocks: [
        { type: "p", text: "1. Before a Candidate is actually put forward to a Client, a Meester Inkoop staff member always reviews:" },
        {
          type: "list",
          items: [
            "the original CV;",
            "the relevant profile data;",
            "the requirements and characteristics of the assignment;",
            "the proposed match percentage;",
            "the substantive similarities and differences;",
            "whether the proposed match is, in practice, sufficiently suitable.",
          ],
        },
        { type: "p", text: "2. The staff member may:" },
        {
          type: "list",
          items: [
            "correct the match percentage;",
            "take additional information into account;",
            "disregard the AI outcome;",
            "decide to approach a Candidate despite a lower score;",
            "decide not to put a Candidate forward despite a higher score.",
          ],
        },
        { type: "p", text: "3. The match percentage does not replace the staff member's professional judgement." },
        { type: "p", text: "4. Meester Inkoop does not make a final decision with significant consequences for the Candidate based solely on automated processing." },
        { type: "p", text: "5. Meester Inkoop may internally record the assessment, including:" },
        {
          type: "list",
          items: [
            "the assessed assignment;",
            "the match percentage;",
            "the name of the reviewer;",
            "the time of assessment;",
            "any corrections made;",
            "a brief rationale.",
          ],
        },
      ],
    },
    {
      number: 9,
      title: "Duration of the registration",
      blocks: [
        { type: "p", text: "1. The registration is active for twelve months." },
        { type: "p", text: "2. This period begins on:" },
        {
          type: "list",
          items: [
            "the date on which the initial registration was completed; or",
            "the date on which the registration was last actively extended.",
          ],
        },
        { type: "p", text: "3. As long as the registration is active, Meester Inkoop may:" },
        {
          type: "list",
          items: [
            "store the CV internally;",
            "maintain profile data;",
            "compare new assignments against the profile;",
            "calculate new match percentages;",
            "approach the Candidate about potentially suitable assignments.",
          ],
        },
        { type: "p", text: "4. A rejected, withdrawn, or unsuccessful proposal does not end the registration." },
        { type: "p", text: "5. The Candidate may end the registration at any time during the active period." },
        { type: "p", text: "6. A Candidate may extend the registration multiple times. This means the service may continue for longer than twelve months, as long as the Candidate periodically and actively confirms that the registration should continue." },
        { type: "p", text: "7. The registration is not automatically extended for an indefinite period." },
      ],
    },
    {
      number: 10,
      title: "Update after six months",
      blocks: [
        { type: "p", text: "1. Meester Inkoop may ask the Candidate, approximately six months after registration, to:" },
        {
          type: "list",
          items: [
            "check the CV;",
            "update work experience;",
            "add education or certifications;",
            "check contact details;",
            "confirm availability;",
            "update desired roles, assignments, or locations.",
          ],
        },
        { type: "p", text: "2. If the Candidate does not respond, the registration does not end immediately." },
        { type: "p", text: "3. Meester Inkoop may mark the profile as \"update requested\"." },
        { type: "p", text: "4. Meester Inkoop may postpone a proposal when the available data is so outdated that a reliable proposal cannot be made." },
        { type: "p", text: "5. The Candidate remains responsible for reporting relevant changes in a timely manner." },
      ],
    },
    {
      number: 11,
      title: "Renewal and deletion",
      blocks: [
        { type: "p", text: "1. No later than approximately thirty days before the end of the active registration period, Meester Inkoop may send a renewal request." },
        { type: "p", text: "2. The Candidate may then:" },
        {
          type: "list",
          items: [
            "extend the registration for a new twelve-month period;",
            "replace or update the CV;",
            "end the registration;",
            "request deletion of the profile.",
          ],
        },
        { type: "p", text: "3. Renewal requires an active action by the Candidate." },
        { type: "p", text: "4. If the Candidate does not renew:" },
        {
          type: "list",
          items: [
            "the profile becomes inactive after the end date;",
            "new AI matching stops;",
            "the profile is no longer used for new proposals;",
            "no CV is provided to any new Client.",
          ],
        },
        { type: "p", text: "5. After the registration ends, a recovery period of up to thirty days may apply." },
        { type: "p", text: "6. After this recovery period, the CV and active match profile are deleted, unless certain data is still necessary for:" },
        {
          type: "list",
          items: [
            "an ongoing proposal;",
            "an ongoing agreement;",
            "a legal administrative obligation;",
            "handling a complaint;",
            "a security investigation;",
            "establishing, exercising, or defending a legal claim.",
          ],
        },
        { type: "p", text: "7. Only the data necessary for such a specific purpose may be retained for longer." },
        { type: "p", text: "8. The full CV is not retained indefinitely solely for evidentiary or audit purposes." },
        { type: "p", text: "9. Deleted data may still be present in secure backups for a limited technical period." },
        { type: "p", text: "10. Data in backups is not reused for active matching and disappears according to the applicable backup cycle." },
      ],
    },
    {
      number: 12,
      title: "Consent for a specific proposal",
      blocks: [
        { type: "p", text: "1. The full CV is only provided to a Client after the Candidate has given consent to the proposal for the specific assignment." },
        { type: "p", text: "2. Before consent is requested, Meester Inkoop informs the Candidate at least about:" },
        {
          type: "list",
          items: [
            "the assignment in question;",
            "the name of the Client;",
            "the main tasks and requirements;",
            "the purpose of the disclosure;",
            "the CV version that will be provided.",
          ],
        },
        { type: "p", text: "3. When the name of the Client cannot yet be disclosed, Meester Inkoop does not provide the full CV unless:" },
        {
          type: "list",
          items: [
            "the Candidate expressly consents on the basis of sufficiently concrete information; and",
            "the Client's identity is disclosed before any further substantive selection.",
          ],
        },
        { type: "p", text: "4. Where possible, only an anonymised or non-directly-identifiable profile may be used before consent to explore a Client's interest." },
        { type: "p", text: "5. The Candidate's consent applies only to:" },
        { type: "list", items: ["the named assignment;", "the named Client;", "the stated purpose;", "the indicated CV version."] },
        { type: "p", text: "6. Consent for one assignment does not apply to other assignments or Clients." },
        { type: "p", text: "7. The Candidate may decline a proposal without this ending the general registration." },
        { type: "p", text: "8. The Candidate may withdraw consent as long as the CV has not yet been sent." },
        { type: "p", text: "9. Once the CV has been sent, the disclosure cannot be fully undone." },
        { type: "p", text: "10. Where there is reason to do so, Meester Inkoop may ask the Client to delete the CV." },
        { type: "p", text: "11. Meester Inkoop records:" },
        {
          type: "list",
          items: [
            "for which assignment consent was given;",
            "to which Client the CV was provided;",
            "which CV version was used;",
            "when consent was given;",
            "when the CV was actually sent.",
          ],
        },
        { type: "p", text: "12. When a proposal does not lead to an assignment, the profile remains available internally for other matches as long as the registration is active." },
        { type: "p", text: "13. Consent is requested again for every subsequent external proposal." },
      ],
    },
    {
      number: 13,
      title: "Responsibility of the Client",
      blocks: [
        { type: "p", text: "1. A Client that receives the CV processes the data for its own selection and client purposes." },
        { type: "p", text: "2. The Client may thereby independently become a controller for the further processing of the received CV." },
        { type: "p", text: "3. Meester Inkoop may agree with Clients on:" },
        {
          type: "list",
          items: [
            "confidential handling;",
            "limited access;",
            "use solely for the relevant assignment;",
            "retention periods;",
            "deletion when no collaboration comes about.",
          ],
        },
        { type: "p", text: "4. Meester Inkoop cannot fully guarantee that a Client correctly complies with all obligations." },
        { type: "p", text: "5. Meester Inkoop nevertheless remains responsible for a careful choice of Clients and careful disclosure from InkoopMatch." },
      ],
    },
    {
      number: 14,
      title: "Possible forms of collaboration",
      blocks: [
        { type: "p", text: "1. A match may, among other things, lead to:" },
        {
          type: "list",
          items: [
            "a mediation agreement with The Goodlife Company B.V. and the Client;",
            "an employment contract with The Goodlife Company B.V.;",
            "secondment via Meester Inkoop;",
            "a secondment-to-permanent arrangement;",
            "direct employment with a Client;",
            "a temporary project agreement;",
            "a self-employed contractor agreement, insofar as legally permitted;",
            "another separately agreed form.",
          ],
        },
        { type: "p", text: "2. The exact arrangements are set out in a separate agreement." },
        { type: "p", text: "3. These terms are, in themselves:" },
        {
          type: "list",
          items: [
            "not an employment contract;",
            "not an assignment agreement;",
            "not a temporary-staffing agreement;",
            "not a guarantee of deployment;",
            "not a commitment regarding hours, duration, rate, or salary.",
          ],
        },
        { type: "p", text: "4. Prior to a specific collaboration, Meester Inkoop may request additional data and documents necessary for that collaboration." },
        { type: "p", text: "5. Data such as a national ID number (BSN), proof of identity, payroll tax data, or bank details are not requested already during general matching when not yet necessary." },
      ],
    },
    {
      number: 15,
      title: "Obligations of the Candidate",
      blocks: [
        { type: "p", text: "1. The Candidate provides correct, current, and complete information." },
        { type: "p", text: "2. The Candidate reports relevant changes as soon as possible, including changes to:" },
        {
          type: "list",
          items: [
            "contact details;",
            "availability;",
            "work experience;",
            "education or certifications;",
            "qualifications or registrations;",
            "the ability to lawfully carry out the work.",
          ],
        },
        { type: "p", text: "3. The Candidate may not provide knowingly incorrect, falsified, or misleading information." },
        { type: "p", text: "4. The Candidate may only upload documents:" },
        { type: "list", items: ["that relate to the Candidate personally; and", "for which the Candidate holds sufficient rights."] },
        { type: "p", text: "5. The Candidate is asked not to include in the CV:" },
        {
          type: "list",
          items: [
            "a national ID number (BSN);",
            "a full copy of an identity document;",
            "medical information;",
            "criminal record information;",
            "religious or political beliefs;",
            "trade union membership;",
            "other data not necessary for professional matching.",
          ],
        },
        { type: "p", text: "6. Meester Inkoop may remove or shield unnecessary or risky personal data when it is not needed for matching." },
        { type: "p", text: "7. The Candidate may not upload files that:" },
        {
          type: "list",
          items: [
            "contain malware or harmful code;",
            "attempt to circumvent security measures;",
            "infringe the rights of others;",
            "contain unlawful content.",
          ],
        },
        { type: "p", text: "8. The Candidate keeps account and login details confidential." },
        { type: "p", text: "9. Suspected misuse of an account must be reported immediately." },
      ],
    },
    {
      number: 16,
      title: "Verification of information provided",
      blocks: [
        { type: "p", text: "1. Meester Inkoop may discuss and verify information from the CV when necessary for a specific proposal or placement." },
        { type: "p", text: "2. Verification may relate to, among other things:" },
        { type: "list", items: ["education;", "certifications;", "relevant work experience;", "professional registrations;", "availability."] },
        { type: "p", text: "3. References are not approached without prior coordination with the Candidate." },
        { type: "p", text: "4. Public internet information is not simply assumed to be correct." },
        { type: "p", text: "5. When public information is taken into account in an assessment, the Candidate is given the opportunity, where necessary, to explain or correct that information." },
        { type: "p", text: "6. More extensive screening may require separate terms, information, and legal bases." },
      ],
    },
    {
      number: 17,
      title: "Communication",
      blocks: [
        { type: "p", text: "1. Meester Inkoop may contact the Candidate for communication necessary for the service, including:" },
        {
          type: "list",
          items: [
            "account and security messages;",
            "questions about the CV;",
            "match proposals;",
            "requests to confirm availability;",
            "requests to approve a proposal;",
            "update and renewal requests;",
            "information about an ongoing mediation process;",
            "changes to the service or terms.",
          ],
        },
        { type: "p", text: "2. This communication is part of the matching and mediation service." },
        { type: "p", text: "3. Separate consent is requested for general newsletters and non-essential commercial communication where legally required." },
        { type: "p", text: "4. The Candidate may unsubscribe from commercial communication without this automatically ending the general registration." },
        { type: "p", text: "5. The Candidate is responsible for providing reachable and up-to-date contact details." },
      ],
    },
    {
      number: 18,
      title: "Personal data and the Microsoft environment",
      blocks: [
        { type: "p", text: "1. The Goodlife Company B.V. is responsible for the processing of personal data within InkoopMatch, insofar as it determines the purpose and means of that processing." },
        { type: "p", text: "2. More information is provided in the separate privacy notice." },
        { type: "p", text: "3. Business Microsoft services may be used for the service, including:" },
        {
          type: "list",
          items: [
            "Microsoft Azure;",
            "Microsoft Power Platform and Power Apps;",
            "Microsoft 365 and Office applications;",
            "business Microsoft Copilot or AI services;",
            "Microsoft storage, authentication, security, and logging services.",
          ],
        },
        { type: "p", text: "4. Microsoft and any other technical suppliers may process personal data as a supplier or processor of The Goodlife Company B.V." },
        { type: "p", text: "5. Meester Inkoop selects and configures the services used with the aim that:" },
        {
          type: "list",
          items: [
            "data is processed within the business environment;",
            "access is limited to authorised persons;",
            "CVs are not processed via personal accounts;",
            "personal data is not used to train general-purpose AI foundation models;",
            "appropriate contractual privacy and security arrangements apply.",
          ],
        },
        { type: "p", text: "6. The exact services used, categories of data, recipients, and any international transfers are described in the privacy notice or additional privacy information." },
        { type: "p", text: "7. When the technical setup changes materially, it is assessed whether the privacy information and these terms need to be adjusted." },
      ],
    },
    {
      number: 19,
      title: "Security",
      blocks: [
        { type: "p", text: "1. Meester Inkoop takes appropriate technical and organisational measures to protect personal data." },
        { type: "p", text: "2. These measures may include, among other things:" },
        {
          type: "list",
          items: [
            "personal user accounts;",
            "multi-factor authentication;",
            "role-based access control;",
            "encrypted connections;",
            "encrypted storage;",
            "logging and monitoring;",
            "secure backups;",
            "malware scanning;",
            "supplier management;",
            "security updates;",
            "incident and data-breach procedures.",
          ],
        },
        { type: "p", text: "3. Access to CVs is limited to staff and suppliers who need that access for their work." },
        { type: "p", text: "4. Meester Inkoop may temporarily block an account, integration, or feature when necessary to:" },
        {
          type: "list",
          items: [
            "investigate a security incident;",
            "prevent unauthorised access;",
            "limit misuse;",
            "protect personal data;",
            "comply with a legal obligation.",
          ],
        },
        { type: "p", text: "5. No digital system can guarantee absolute security." },
        { type: "p", text: "6. When a security incident affects the Candidate, Meester Inkoop informs the Candidate to the extent and within the timeframe legally required." },
        { type: "p", text: "7. A suspected security issue can be reported via info@meesterinkoop.nl, marked \"security report\"." },
      ],
    },
    {
      number: 20,
      title: "Availability of InkoopMatch",
      blocks: [
        { type: "p", text: "1. Meester Inkoop endeavours to keep InkoopMatch carefully and sufficiently available." },
        { type: "p", text: "2. The service may be temporarily wholly or partially unavailable due to:" },
        {
          type: "list",
          items: [
            "maintenance;",
            "security updates;",
            "outages;",
            "problems at Microsoft or other suppliers;",
            "internet or communication disruptions;",
            "measures to prevent abuse;",
            "force majeure.",
          ],
        },
        { type: "p", text: "3. Meester Inkoop does not guarantee uninterrupted or completely error-free availability." },
        { type: "p", text: "4. Meester Inkoop may change features when reasonably necessary for:" },
        { type: "list", items: ["security;", "privacy;", "laws and regulations;", "improving the service;", "changes at suppliers;", "technical continuity."] },
        { type: "p", text: "5. Material changes are communicated in advance where reasonably possible." },
      ],
    },
    {
      number: 21,
      title: "Rights to the CV and the platform",
      blocks: [
        { type: "p", text: "1. The Candidate retains the rights to their own CV content and self-provided documents." },
        { type: "p", text: "2. The Candidate grants Meester Inkoop a limited licence, for the duration of the registration, to:" },
        {
          type: "list",
          items: [
            "store the CV;",
            "technically process it;",
            "structure it;",
            "analyse it internally;",
            "compare it against assignments;",
            "share it, after separate consent, for a specific assignment.",
          ],
        },
        { type: "p", text: "3. This licence ends when the data is deleted in accordance with the privacy notice." },
        { type: "p", text: "4. The software, design, matching methodology, database structure, and other components of InkoopMatch remain the property of The Goodlife Company B.V. or its licensors." },
        { type: "p", text: "5. The Candidate may not:" },
        {
          type: "list",
          items: [
            "copy or reverse-engineer InkoopMatch;",
            "read it out automatically without permission;",
            "use it to circumvent security measures;",
            "use it to collect data about others;",
            "commercially exploit it outside the purpose of the registration.",
          ],
        },
      ],
    },
    {
      number: 22,
      title: "No exclusivity and no obligation",
      blocks: [
        { type: "p", text: "1. The registration is not exclusive." },
        { type: "p", text: "2. The Candidate may:" },
        {
          type: "list",
          items: [
            "register with other mediation agencies;",
            "respond to vacancies and assignments directly;",
            "decline a proposed assignment;",
            "end the registration.",
          ],
        },
        { type: "p", text: "3. The Candidate is not obliged to accept a match proposal or offer." },
        { type: "p", text: "4. Meester Inkoop is not obliged to propose every available assignment to every Candidate." },
        { type: "p", text: "5. Any exclusivity for a specific assignment only applies when separately agreed in writing in advance." },
      ],
    },
    {
      number: 23,
      title: "Suspension and termination by Meester Inkoop",
      blocks: [
        { type: "p", text: "1. Meester Inkoop may temporarily suspend an account or registration when:" },
        {
          type: "list",
          items: [
            "additional verification is necessary;",
            "the data is suspected to be incorrect;",
            "there is a security risk;",
            "misuse is suspected;",
            "the Candidate fails to comply with these terms.",
          ],
        },
        { type: "p", text: "2. Meester Inkoop may terminate the agreement when:" },
        {
          type: "list",
          items: [
            "the Candidate knowingly provides incorrect or falsified information;",
            "there is fraud or serious misuse;",
            "systems or personal data are put at risk;",
            "the Candidate seriously fails to comply with these terms;",
            "continuation would conflict with law or regulation;",
            "Meester Inkoop discontinues the service.",
          ],
        },
        { type: "p", text: "3. Where remedy is possible, Meester Inkoop may first give a reasonable period to remedy the situation." },
        { type: "p", text: "4. Meester Inkoop informs the Candidate of the termination and the reason for it, unless this is not possible for reasons of security, investigation, or a legal obligation." },
        { type: "p", text: "5. After termination, personal data is handled in accordance with the privacy notice and the applicable retention policy." },
      ],
    },
    {
      number: 24,
      title: "Liability",
      blocks: [
        { type: "p", text: "1. Meester Inkoop performs the service with due care." },
        { type: "p", text: "2. Meester Inkoop does not guarantee that:" },
        {
          type: "list",
          items: [
            "all assignment information is complete or error-free;",
            "every AI result is entirely correct;",
            "a match percentage corresponds to the Client's judgement;",
            "an assignment remains available;",
            "a placement or agreement comes about.",
          ],
        },
        { type: "p", text: "3. Meester Inkoop is not liable for damage arising solely from:" },
        {
          type: "list",
          items: [
            "an independent selection decision by the Client;",
            "the withdrawal or modification of an assignment by the Client;",
            "incorrect or incomplete information from the Candidate;",
            "failure to keep the profile up to date;",
            "disruptions outside Meester Inkoop's reasonable sphere of influence.",
          ],
        },
        { type: "p", text: "4. Meester Inkoop is liable for direct damage resulting from an attributable failure or unlawful act by Meester Inkoop." },
        { type: "p", text: "5. To the extent legally permitted, liability for indirect damage is excluded, including:" },
        { type: "list", items: ["lost income;", "lost assignments;", "lost opportunities;", "consequential damage;", "reputational damage."] },
        { type: "p", text: "6. Where liability insurance provides cover, liability is limited to the amount paid out by the insurer for the relevant case, plus the applicable deductible." },
        { type: "p", text: "7. Where the insurance does not pay out for a reason other than lack of cover, liability is limited to an amount of € [REASONABLE AMOUNT TO BE FILLED IN - to be confirmed] per event." },
        { type: "p", text: "8. These limitations do not apply:" },
        {
          type: "list",
          items: [
            "in the case of intent or conscious recklessness on the part of The Goodlife Company B.V.'s management;",
            "in the case of death or personal injury, insofar as exclusion is not legally permitted;",
            "where a statutory liability may not be limited;",
            "for statutory rights arising from unlawful processing of personal data.",
          ],
        },
        { type: "p", text: "9. Mandatory statutory rights of consumers and other Candidates continue to apply." },
      ],
    },
    {
      number: 25,
      title: "Force majeure",
      blocks: [
        { type: "p", text: "1. Meester Inkoop is not obliged to perform when this is temporarily or permanently impossible due to a circumstance not reasonably attributable to Meester Inkoop." },
        { type: "p", text: "2. This may include, among other things:" },
        {
          type: "list",
          items: [
            "prolonged internet or power outages;",
            "serious disruptions at Microsoft or other essential suppliers;",
            "cyberattacks;",
            "government measures;",
            "natural disasters;",
            "war, terrorism, or social disruption;",
            "failure of essential infrastructure.",
          ],
        },
        { type: "p", text: "3. Meester Inkoop endeavours to reasonably limit the consequences." },
        { type: "p", text: "4. When the service cannot be continued for a prolonged period, both parties may terminate the agreement." },
      ],
    },
    {
      number: 26,
      title: "Privacy rights",
      blocks: [
        { type: "p", text: "1. To the extent permitted by law, the Candidate may request:" },
        { type: "list", items: ["access to personal data;", "correction;", "deletion;", "restriction of processing;", "data portability;", "objection to certain processing."] },
        { type: "p", text: "2. A request can be submitted via info@meesterinkoop.nl, marked \"privacy request\"." },
        { type: "p", text: "3. Meester Inkoop may request additional information when necessary to establish the requester's identity." },
        { type: "p", text: "4. In the event of a deletion request:" },
        {
          type: "list",
          items: [
            "the profile is blocked for new matching as soon as possible;",
            "no new external proposal is made;",
            "the CV and match profile are deleted, unless a statutory exception applies.",
          ],
        },
        { type: "p", text: "5. The Candidate may lodge a privacy complaint with Meester Inkoop." },
        { type: "p", text: "6. The Candidate also has the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens)." },
      ],
    },
    {
      number: 27,
      title: "Complaints about the service",
      blocks: [
        { type: "p", text: "1. A complaint about matching, mediation, or administration can be submitted via info@meesterinkoop.nl." },
        { type: "p", text: "2. Where possible, please state in the complaint:" },
        {
          type: "list",
          items: [
            "the Candidate's name and contact details;",
            "the assignment or proposal in question;",
            "a description of the complaint;",
            "the desired resolution.",
          ],
        },
        { type: "p", text: "3. Meester Inkoop confirms receipt of the complaint." },
        { type: "p", text: "4. Meester Inkoop endeavours to respond to the complaint in substance within a reasonable period." },
        { type: "p", text: "5. A complaint does not automatically suspend ongoing obligations." },
      ],
    },
    {
      number: 28,
      title: "Changes to these terms",
      blocks: [
        { type: "p", text: "1. Meester Inkoop may change these terms when necessary or reasonable due to:" },
        {
          type: "list",
          items: [
            "changes to the service;",
            "changes in law and regulation;",
            "security or privacy measures;",
            "changes in AI or Microsoft services;",
            "organisational changes;",
            "clarification of existing agreements.",
          ],
        },
        { type: "p", text: "2. The Candidate is informed in advance of any material change." },
        { type: "p", text: "3. When a change materially and adversely affects the Candidate's position, the Candidate may end the registration before the change takes effect." },
        { type: "p", text: "4. Insofar as renewed consent is required, this is requested via InkoopMatch." },
        { type: "p", text: "5. The current version and effective date are published on the website." },
      ],
    },
    {
      number: 29,
      title: "Other provisions",
      blocks: [
        { type: "p", text: "1. If a provision proves invalid or unenforceable, the remaining provisions remain valid." },
        { type: "p", text: "2. The invalid provision is replaced by a valid provision that reflects the purpose and intent of the original provision as closely as possible." },
        { type: "p", text: "3. Not immediately enforcing a right does not mean that right is waived." },
        { type: "p", text: "4. The Candidate may not transfer rights or obligations under the agreement to another party without prior written consent." },
        { type: "p", text: "5. The Goodlife Company B.V. may transfer the agreement in connection with a restructuring or business transfer, provided that:" },
        { type: "list", items: ["the Candidate is informed of this; and", "the Candidate's rights are not materially reduced."] },
        { type: "p", text: "6. The Dutch-language version is authoritative where translations are also offered." },
      ],
    },
    {
      number: 30,
      title: "Governing law and disputes",
      blocks: [
        { type: "p", text: "1. The agreement is governed by Dutch law." },
        { type: "p", text: "2. The parties will first try to resolve a dispute through mutual consultation." },
        { type: "p", text: "3. If this does not succeed, the dispute may be submitted to the competent Dutch court." },
        { type: "p", text: "4. When the Candidate acts as a consumer, the mandatory statutory rules on the competent court and consumer protection remain fully applicable." },
      ],
    },
  ],
  formTexts: [
    {
      heading: "Mandatory consent statement",
      text: "I agree to InkoopMatch's Terms of Use and Mediation. I understand that The Goodlife Company B.V. is my contracting party, that Meester Inkoop carries out the mediation, and that InkoopMatch is used as the digital tool for this purpose.",
    },
    {
      heading: "Mandatory information statement",
      text: "I have read the privacy notice and the explanation of AI-assisted matching.\n\nThis second statement confirms that the information was provided and is not a general consent to all processing of personal data.",
    },
    {
      heading: "Optional commercial communication",
      text: "I would like to receive general updates, news, and other commercial messages from Meester Inkoop and InkoopMatch. I can unsubscribe at any time.",
    },
    {
      heading: "Consent for a specific proposal",
      text: "I agree that Meester Inkoop will provide version [number and date] of my CV for assignment [name and assignment number] to [Client name]. I understand that this consent applies only to this specific proposal.",
    },
    {
      heading: "Extending the registration",
      text: "I want to extend my InkoopMatch registration by twelve months. I understand that my CV may be used internally during this active period to find new suitable assignments. Consent will be requested from me again for every disclosure of my full CV to a Client.",
    },
  ],
};

/**
 * Flat list of every blank/placeholder the SOURCE document itself left
 * open - nothing here was invented; these are exactly what appeared
 * as brackets in the original file. For the team to confirm.
 */
export const BLANKS_TO_CONFIRM = [
  "Document version number (currently shown as [1.0])",
  "Effective date (\"Ingangsdatum\") - not filled in in the source document",
  "Last modified date (\"Laatst gewijzigd\") - not filled in in the source document",
  "Article 1: KvK (Chamber of Commerce) number - source document says \"[ACTUEEL KVK-NUMMER CONTROLEREN]\" (check current KvK number)",
  "Article 5.5: certification webpage or register reference - not specified in the source document",
  "Article 24.7: liability cap amount in euros - source document says \"[REDELIJK BEDRAG INVULLEN]\" (fill in a reasonable amount)",
  "Registration-form text, \"Consent for a specific proposal\": CV version number/date, assignment name/number, and Client name - these are per-instance fields filled in at the time of each actual proposal, not fixed values for the Terms page itself",
];
