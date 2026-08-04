/**
 * UI-chrome translations only — job listing content (titles,
 * descriptions) comes from the scraper and is NOT translated here by
 * design; see the language-feature discussion for why.
 *
 * Keys are grouped by the area of the app they belong to, matching
 * the route/component structure, so it's easy to find the right file
 * when adding a new string.
 */

export type Dictionary = {
  nav: {
    howItWorks: string;
    forOrganisations: string;
    about: string;
    signIn: string;
    dashboard: string;
    settings: string;
    signOut: string;
  };
  footer: {
    terms: string;
    contact: string;
  };
  auth: {
    welcomeBack: string;
    createAccount: string;
    checkEmail: string;
    resetPassword: string;
    signInSubtitle: string;
    signUpSubtitle: string;
    forgotSubtitle: string;
    continueWithGoogle: string;
    fullName: string;
    email: string;
    password: string;
    forgotPassword: string;
    verificationCode: string;
    resendCode: string;
    passwordHint: string;
    signInButton: string;
    createAccountButton: string;
    verifyButton: string;
    sendResetLink: string;
    noAccount: string;
    signUpLink: string;
    haveAccount: string;
    signInLink: string;
    back: string;
    backToSignIn: string;
    chooseNewPasswordTitle: string;
    chooseNewPasswordSubtitle: string;
  };
  consent: {
    title: string;
    subtitle: string;
    point1: string;
    point2: string;
    point3: string;
    point4: string;
    point5: string;
    readFullTerms: string;
    hideFullTerms: string;
    readFullPage: string;
    checkboxLabel: string;
    agreeButton: string;
    saving: string;
  };
  onboarding: {
    title: string;
    subtitle: string;
    yourCv: string;
    dropCv: string;
    fileHint: string;
    city: string;
    occupation: string;
    yearsExperience: string;
    mobileOptional: string;
    mobileNumber: string;
    availability: string;
    selectPlaceholder: string;
    finishButton: string;
    saving: string;
  };
  dashboard: {
    goodMorning: string;
    goodAfternoon: string;
    goodEvening: string;
    subtitle: string;
    newIn24h: string;
    nothingNewYet: string;
    freshSinceYesterday: string;
    averageFit: string;
    strongMatches: string;
    scoresLandWithin24h: string;
    acrossScoredMatches: string;
    ninetyPercentOrHigher: string;
    yourMatches: string;
    applied: string;
    shortlisted: string;
    searchPlaceholder: string;
    status: string;
    open: string;
    closed: string;
    allStatuses: string;
    deadlineBefore: string;
    clearFilters: string;
    loadingMore: string;
    reachedEnd: string;
    total: string;
    noMatchesFilters: string;
    noMatchesYet: string;
    appliedTabHint: string;
    noApplications: string;
    shortlistTabHint: string;
    noShortlist: string;
    newBadge: string;
    fitSuffix: string;
    strongMatch: string;
    goodMatch: string;
    worthALook: string;
    scoringLabel: string;
    readyWithin24h: string;
  };
  project: {
    backToMatches: string;
    aboutProject: string;
    fitBreakdown: string;
    requiredSkill: string;
    statusColumn: string;
    onYourCv: string;
    notDetected: string;
    scoringInProgress: string;
    scoringExplainer: string;
    evidenceComingSoon: string;
    requiredSkills: string;
    dayRate: string;
    deadline: string;
    notSpecified: string;
    applyButton: string;
    applying: string;
    appliedButton: string;
    consentAfterApply: string;
    consentBeforeApply: string;
    notFound: string;
    backToDashboard: string;
  };
  settings: {
    title: string;
    subtitle: string;
    profileTitle: string;
    profileSubtitle: string;
    saveChanges: string;
    saving: string;
    passwordTitle: string;
    passwordSubtitle: string;
    currentPassword: string;
    newPassword: string;
    updatePassword: string;
    updating: string;
    notificationsTitle: string;
    notificationsSubtitle: string;
    newMatchesLabel: string;
    newMatchesDesc: string;
    shortlistedLabel: string;
    shortlistedDesc: string;
    productUpdatesLabel: string;
    productUpdatesDesc: string;
    dangerTitle: string;
    dangerSubtitle: string;
    dangerText: string;
    deleteButton: string;
    deleteConfirmTitle: string;
    deleteConfirmDesc: string;
    cancel: string;
    yesDelete: string;
    deleting: string;
    sendResetCode: string;
    reauthPrompt: string;
    confirmAndDelete: string;
  };
  landing: {
    badge: string;
    heroLine1: string;
    heroLine2: string;
    heroLine2Accent: string;
    subtitle: string;
    humanNote: string;
    seeHowItWorks: string;
    startTitle: string;
    startSubtitle: string;
    timeEstimate: string;
    dropCv: string;
    fileHint: string;
    noSpam: string;
    proof1Title: string;
    proof1Desc: string;
    proof2Title: string;
    proof2Desc: string;
    proof3Title: string;
    proof3Desc: string;
    howItWorks: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    questionsTitle: string;
    questionsSubtitle: string;
    contactUs: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    processTitle: string;
    process1Title: string;
    process1Desc: string;
    process2Title: string;
    process2Desc: string;
    process3Title: string;
    process3Desc: string;
    disclosureTitle: string;
    disclosureBody: string;
    orgsTitle: string;
    orgsSubtitle: string;
    orgsCta: string;
  };
  about: {
    badge: string;
    title: string;
    titleAccent: string;
    intro: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    point3Title: string;
    point3Desc: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  contact: {
    title: string;
    subtitle: string;
    orgsNote: string;
    privacyNote: string;
    privacyLink: string;
  };
  terms: {
    title: string;
    updatedNote: string;
    s1Title: string;
    s1Body: string;
    s2Title: string;
    s2Body: string;
    s3Title: string;
    s3Body: string;
    s4Title: string;
    s4Body: string;
    s5Title: string;
    s5Body: string;
    s6Title: string;
    s6Body: string;
    s7Title: string;
    s7BodyPrefix: string;
    s7ContactLink: string;
  };
  language: {
    english: string;
    dutch: string;
  };
};

export const en: Dictionary = {
  nav: {
    howItWorks: "How it works",
    forOrganisations: "For organisations",
    about: "About",
    signIn: "Sign in",
    dashboard: "Dashboard",
    settings: "Settings",
    signOut: "Sign out",
  },
  footer: {
    terms: "Terms & Privacy",
    contact: "Contact us",
  },
  auth: {
    welcomeBack: "Welcome back",
    createAccount: "Create your account",
    checkEmail: "Check your email",
    resetPassword: "Reset your password",
    signInSubtitle: "Sign in to InkoopMatch to see your matches.",
    signUpSubtitle: "Join InkoopMatch and get matched to EU projects.",
    forgotSubtitle: "We'll email you a link to reset your password.",
    continueWithGoogle: "Continue with Google",
    fullName: "Full name",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    verificationCode: "Verification code",
    resendCode: "Resend code",
    passwordHint:
      'At least 8 characters, with a mix of at least 3 of: uppercase, lowercase, numbers, symbols. Avoid common words like "password".',
    signInButton: "Sign in",
    createAccountButton: "Create account",
    verifyButton: "Verify",
    sendResetLink: "Send reset link",
    noAccount: "Don't have an account?",
    signUpLink: "Sign up",
    haveAccount: "Already have an account?",
    signInLink: "Sign in",
    back: "Back",
    backToSignIn: "Back to sign in",
    chooseNewPasswordTitle: "Choose a new password",
    chooseNewPasswordSubtitle: "Pick something you haven't used before.",
  },
  consent: {
    title: "Before we process your CV",
    subtitle: "Here's what happens to your CV and data — the short version.",
    point1: "The Goodlife Company B.V. (trading as Meester Inkoop) is your actual contracting party — Inkoopmatch is their digital matching tool, not a separate company.",
    point2: "Your CV is analysed and compared against assignments using AI — but a Meester Inkoop staff member always reviews it before anything happens with it.",
    point3: "Your registration stays active for 12 months and covers more than one assignment — not just the one you first applied for.",
    point4: "Your CV is only sent to a specific client after you separately agree to that specific proposal — never automatically, and never for a different client without asking again.",
    point5: "You can end your registration and request deletion of your CV and profile at any time.",
    readFullTerms: "Read full terms & mediation conditions",
    hideFullTerms: "Hide full terms",
    readFullPage: "Open full terms on their own page",
    checkboxLabel: "I agree to InkoopMatch processing my CV and profile data as described above.",
    agreeButton: "Agree and continue",
    saving: "Saving…",
  },
  onboarding: {
    title: "Let's set up your profile",
    subtitle: "Your CV and a few details help us match you to the right projects.",
    yourCv: "Your CV",
    dropCv: "Drop your CV, or click to upload",
    fileHint: "PDF or Word · up to 5 MB",
    city: "City",
    occupation: "Occupation / role",
    yearsExperience: "Years of experience",
    mobileOptional: "Mobile number (optional)",
    mobileNumber: "Mobile number",
    availability: "Availability",
    selectPlaceholder: "Select…",
    finishButton: "Finish and see my matches",
    saving: "Saving…",
  },
  dashboard: {
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
    subtitle: "Here's where your matches stand today.",
    newIn24h: "New in the last 24h",
    nothingNewYet: "Nothing new yet",
    freshSinceYesterday: "Fresh since yesterday",
    averageFit: "Average fit",
    strongMatches: "Strong matches",
    scoresLandWithin24h: "Scores land within 24h",
    acrossScoredMatches: "Across scored matches",
    ninetyPercentOrHigher: "90% fit or higher",
    yourMatches: "Your matches",
    applied: "Applied",
    shortlisted: "Shortlisted",
    searchPlaceholder: "Search all matches…",
    status: "Status",
    open: "Open",
    closed: "Closed",
    allStatuses: "All statuses",
    deadlineBefore: "Deadline before",
    clearFilters: "Clear filters",
    loadingMore: "Loading more…",
    reachedEnd: "You've reached the end",
    total: "total",
    noMatchesFilters: "No matches for these filters.",
    noMatchesYet: "No matches yet — check back once your CV has been scored.",
    appliedTabHint: "Projects you've applied to.",
    noApplications: "You haven't applied to anything yet.",
    shortlistTabHint: "Projects where a recruiter has shortlisted you.",
    noShortlist: "No shortlists yet. When a recruiter shortlists you, it'll show here.",
    newBadge: "New",
    fitSuffix: "fit",
    strongMatch: "Strong match",
    goodMatch: "Good match",
    worthALook: "Worth a look",
    scoringLabel: "Scoring",
    readyWithin24h: "Ready within 24h",
  },
  project: {
    backToMatches: "Back to matches",
    aboutProject: "About the project",
    fitBreakdown: "Fit breakdown",
    requiredSkill: "Required skill",
    statusColumn: "Status",
    onYourCv: "On your CV",
    notDetected: "Not detected",
    scoringInProgress: "Scoring in progress",
    scoringExplainer:
      "We're still scoring how well this project fits your CV. Fit details usually appear within 24 hours of uploading your CV — you can still apply now if it looks right.",
    evidenceComingSoon:
      "We're refining how we explain each match — a detailed, skill-by-skill breakdown is coming soon.",
    requiredSkills: "Required skills",
    dayRate: "Day rate",
    deadline: "Deadline",
    notSpecified: "Not specified",
    applyButton: "Apply with my CV",
    applying: "Applying…",
    appliedButton: "Applied ✓",
    consentAfterApply: "The organisation can see your profile.",
    consentBeforeApply: "Your CV is shared only after you confirm.",
    notFound: "Project not found",
    backToDashboard: "Back to dashboard",
  },
  settings: {
    title: "Settings",
    subtitle: "Manage your profile, security and preferences.",
    profileTitle: "Profile details",
    profileSubtitle: "This information helps us match you to projects.",
    saveChanges: "Save changes",
    saving: "Saving…",
    passwordTitle: "Password",
    passwordSubtitle: "Change the password you use to sign in.",
    currentPassword: "Current password",
    newPassword: "New password",
    updatePassword: "Update password",
    updating: "Updating…",
    notificationsTitle: "Notifications",
    notificationsSubtitle: "Choose what we email you about.",
    newMatchesLabel: "New matches",
    newMatchesDesc: "When fresh projects fit your profile.",
    shortlistedLabel: "Shortlisted",
    shortlistedDesc: "When a recruiter shortlists you.",
    productUpdatesLabel: "Product updates",
    productUpdatesDesc: "Occasional news about InkoopMatch.",
    dangerTitle: "Delete account",
    dangerSubtitle: "Permanently remove your account, CV and applications.",
    dangerText: "This can't be undone. Your CV is removed and your applications are withdrawn.",
    deleteButton: "Delete account",
    deleteConfirmTitle: "Delete your account?",
    deleteConfirmDesc:
      "This permanently removes your profile, CV and applications. This action cannot be undone.",
    cancel: "Cancel",
    yesDelete: "Yes, delete",
    deleting: "Deleting…",
    sendResetCode: "Send a code to my email",
    reauthPrompt: "Enter your password to confirm it's really you — this can't be undone.",
    confirmAndDelete: "Confirm and delete",
  },
  landing: {
    badge: "GDPR-compliant · Your CV is never shared without your consent",
    heroLine1: "You know your craft.",
    heroLine2: "We look further than",
    heroLine2Accent: "your job title",
    subtitle:
      "InkoopMatch compares your full CV — not just a title — against every open procurement, legal, compliance and contract project we track. That's how you find opportunities a keyword search would miss.",
    humanNote: "For professionals, by professionals",
    seeHowItWorks: "See how it works first",
    startTitle: "Start with your CV",
    startSubtitle: "Upload your CV and create your account to see your matches.",
    timeEstimate: "~ 20 seconds",
    dropCv: "Drop your CV here, or click to upload",
    fileHint: "PDF or Word · up to 5 MB",
    noSpam: "No recruiter spam. Ever.",
    proof1Title: "Your whole CV counts",
    proof1Desc: "not just your job title",
    proof2Title: "A reason for every match",
    proof2Desc: "a fit score, plus what lined up",
    proof3Title: "You stay in control",
    proof3Desc: "shared only after your consent",
    howItWorks: "How it works",
    step1Title: "Upload once",
    step1Desc: "We compare your full CV — skills, sectors, experience — against every open project, not just titles.",
    step2Title: "See fit scores, with reasons",
    step2Desc: "Every match shows which of your skills lined up — and which didn't.",
    step3Title: "Apply in one click",
    step3Desc: "We send your profile to the organisation. You stay in control of consent.",
    questionsTitle: "Questions before you sign up?",
    questionsSubtitle: "We're happy to help — reach out and we'll get back to you.",
    contactUs: "Contact us",
  },
  howItWorks: {
    badge: "How it works",
    title: "You know your craft. We look further than your job title.",
    subtitle:
      "InkoopMatch compares your full CV against every open project we track — not just the title on the posting.",
    processTitle: "Our process, in three steps",
    process1Title: "We gather open projects",
    process1Desc:
      "We collect open freelance opportunities from a number of external platforms, so you don't have to check each one yourself.",
    process2Title: "We match with our own technology",
    process2Desc:
      "Your CV is compared against every open project using our own matching technology — skills, experience and context, not keyword matching on a title.",
    process3Title: "You stay in control",
    process3Desc:
      "You decide which projects to apply to. Your profile is only shared once you click Apply.",
    disclosureTitle: "Where your data goes",
    disclosureBody:
      "The Goodlife Company B.V., trading as Meester Inkoop, is your actual contracting party — InkoopMatch is the digital tool Meester Inkoop uses for matching, not a separate company and not an aggregator of other platforms' postings. Your CV is analysed against assignments using AI, but a Meester Inkoop staff member always reviews the match before anything happens with it. Your full CV is only sent to a specific client organisation after you separately agree to that specific proposal — never automatically, and never to a different client without asking again. See our full Terms for exactly how this works.",
    orgsTitle: "Hiring on the other side?",
    orgsSubtitle:
      "We work with a limited number of organisations directly. Get in touch and we'll see if it's a fit.",
    orgsCta: "Contact us",
  },
  about: {
    badge: "Our story",
    title: "Matching freelancers to projects",
    titleAccent: "beyond the job title.",
    intro:
      "InkoopMatch was built for the independent specialists who keep EU procurement, legal and compliance work moving. We look at your whole CV — not just your last job title — so you see opportunities that a keyword search would miss.",
    point1Title: "Your full CV counts",
    point1Desc: "Not just your job title, but skills, sector experience, and context.",
    point2Title: "Reviewed by recruiters",
    point2Desc: "A real InkoopMatch recruiter reviews applications before they reach an organisation.",
    point3Title: "Private by design",
    point3Desc: "Your CV is never shared without your consent. See our Terms for exactly how data flows.",
    ctaTitle: "Want to know more?",
    ctaSubtitle: "Reach out to learn how InkoopMatch can help your team or your freelance career.",
    ctaButton: "Contact us",
  },
  contact: {
    title: "Contact us",
    subtitle:
      "Questions about your account, a project, or how InkoopMatch works — we're happy to help.",
    orgsNote: "Hiring, not applying? Mention that in your message and we'll route it right.",
    privacyNote: "Data or privacy request? See our",
    privacyLink: "Terms & Privacy",
  },
  terms: {
    title: "Terms & Privacy",
    updatedNote: "Last updated — placeholder text, pending legal review.",
    s1Title: "1. What we collect",
    s1Body:
      "Your name, email, city, occupation, years of experience, availability, an optional mobile number, and the CV file you upload.",
    s2Title: "2. Why we collect it",
    s2Body:
      "To compute a fit score between your CV and open freelance projects, and to let you apply to projects you choose.",
    s3Title: "3. How InkoopMatch works, and who sees your data",
    s3Body:
      "InkoopMatch acts as an intermediary: we collect open freelance opportunities from a number of external platforms, and use our own matching technology to compare them against your CV. Your CV and profile are visible to InkoopMatch recruiters. When you apply to a project, your profile becomes visible to the organisation behind it — and, depending on where the posting originated, it may also be shared with the platform the opportunity came from, since that's part of how it reached you in the first place. We do not sell your data, and nothing is shared before you choose to apply.",
    s4Title: "4. Storage",
    s4Body:
      "Your CV is stored in a private Azure Blob Storage container, not publicly accessible. Profile data is stored in our SQL database within the EU.",
    s5Title: "5. Retention",
    s5Body:
      "Your data is retained while your account is active. You may request deletion at any time from Settings → Delete account.",
    s6Title: "6. Your rights",
    s6Body:
      "Under GDPR, you have the right to access, correct, or delete your personal data, and to withdraw consent at any time.",
    s7Title: "7. Contact",
    s7BodyPrefix: "For data requests or questions, see our",
    s7ContactLink: "Contact page",
  },
  language: {
    english: "English",
    dutch: "Nederlands",
  },
};

export const nl: Dictionary = {
  nav: {
    howItWorks: "Hoe het werkt",
    forOrganisations: "Voor organisaties",
    about: "Over ons",
    signIn: "Inloggen",
    dashboard: "Dashboard",
    settings: "Instellingen",
    signOut: "Uitloggen",
  },
  footer: {
    terms: "Voorwaarden & privacy",
    contact: "Contact",
  },
  auth: {
    welcomeBack: "Welkom terug",
    createAccount: "Maak je account aan",
    checkEmail: "Controleer je e-mail",
    resetPassword: "Wachtwoord opnieuw instellen",
    signInSubtitle: "Log in bij InkoopMatch om je matches te zien.",
    signUpSubtitle: "Word lid van InkoopMatch en word gematcht aan EU-projecten.",
    forgotSubtitle: "We sturen je een link om je wachtwoord opnieuw in te stellen.",
    continueWithGoogle: "Doorgaan met Google",
    fullName: "Volledige naam",
    email: "E-mail",
    password: "Wachtwoord",
    forgotPassword: "Wachtwoord vergeten?",
    verificationCode: "Verificatiecode",
    resendCode: "Code opnieuw versturen",
    passwordHint:
      'Minimaal 8 tekens, met minstens 3 van: hoofdletters, kleine letters, cijfers, symbolen. Vermijd veelvoorkomende woorden zoals "wachtwoord".',
    signInButton: "Inloggen",
    createAccountButton: "Account aanmaken",
    verifyButton: "Verifiëren",
    sendResetLink: "Stuur resetlink",
    noAccount: "Nog geen account?",
    signUpLink: "Aanmelden",
    haveAccount: "Heb je al een account?",
    signInLink: "Inloggen",
    back: "Terug",
    backToSignIn: "Terug naar inloggen",
    chooseNewPasswordTitle: "Kies een nieuw wachtwoord",
    chooseNewPasswordSubtitle: "Kies iets dat je nog niet eerder hebt gebruikt.",
  },
  consent: {
    title: "Voordat we je cv verwerken",
    subtitle: "Dit gebeurt er met je cv en gegevens — de korte versie.",
    point1: "The Goodlife Company B.V. (handelend onder de naam Meester Inkoop) is je daadwerkelijke contractspartij — Inkoopmatch is hun digitale matchingtool, geen aparte onderneming.",
    point2: "Je cv wordt met AI geanalyseerd en vergeleken met opdrachten — maar een medewerker van Meester Inkoop beoordeelt dit altijd voordat er iets mee gebeurt.",
    point3: "Je inschrijving blijft twaalf maanden actief en geldt voor meerdere opdrachten — niet alleen degene waarop je je oorspronkelijk hebt aangemeld.",
    point4: "Je cv wordt pas aan een specifieke opdrachtgever verstrekt nadat jij apart akkoord bent gegaan met die specifieke voordracht — nooit automatisch, en nooit aan een andere opdrachtgever zonder opnieuw te vragen.",
    point5: "Je kunt je inschrijving op elk moment beëindigen en verwijdering van je cv en profiel aanvragen.",
    readFullTerms: "Lees de volledige gebruiks- en bemiddelingsvoorwaarden",
    hideFullTerms: "Verberg volledige voorwaarden",
    readFullPage: "Open de volledige voorwaarden op een eigen pagina",
    checkboxLabel:
      "Ik ga akkoord dat InkoopMatch mijn cv en profielgegevens verwerkt zoals hierboven beschreven.",
    agreeButton: "Akkoord en doorgaan",
    saving: "Opslaan…",
  },
  onboarding: {
    title: "Laten we je profiel instellen",
    subtitle: "Je cv en een paar gegevens helpen ons je te matchen met de juiste projecten.",
    yourCv: "Je cv",
    dropCv: "Sleep je cv hierheen, of klik om te uploaden",
    fileHint: "PDF of Word · max 5 MB",
    city: "Stad",
    occupation: "Functie / rol",
    yearsExperience: "Jaren ervaring",
    mobileOptional: "Mobiel nummer (optioneel)",
    mobileNumber: "Mobiel nummer",
    availability: "Beschikbaarheid",
    selectPlaceholder: "Selecteer…",
    finishButton: "Afronden en mijn matches bekijken",
    saving: "Opslaan…",
  },
  dashboard: {
    goodMorning: "Goedemorgen",
    goodAfternoon: "Goedemiddag",
    goodEvening: "Goedenavond",
    subtitle: "Dit is de status van je matches vandaag.",
    newIn24h: "Nieuw in de laatste 24 uur",
    nothingNewYet: "Nog niets nieuws",
    freshSinceYesterday: "Vers sinds gisteren",
    averageFit: "Gemiddelde fit",
    strongMatches: "Sterke matches",
    scoresLandWithin24h: "Scores binnen 24 uur",
    acrossScoredMatches: "Over gescoorde matches",
    ninetyPercentOrHigher: "90% fit of hoger",
    yourMatches: "Jouw matches",
    applied: "Gesolliciteerd",
    shortlisted: "Op de shortlist",
    searchPlaceholder: "Zoek in alle matches…",
    status: "Status",
    open: "Open",
    closed: "Gesloten",
    allStatuses: "Alle statussen",
    deadlineBefore: "Deadline voor",
    clearFilters: "Filters wissen",
    loadingMore: "Meer laden…",
    reachedEnd: "Je hebt het einde bereikt",
    total: "totaal",
    noMatchesFilters: "Geen matches voor deze filters.",
    noMatchesYet: "Nog geen matches — kom terug zodra je cv gescoord is.",
    appliedTabHint: "Projecten waarop je hebt gesolliciteerd.",
    noApplications: "Je hebt nog nergens op gesolliciteerd.",
    shortlistTabHint: "Projecten waarvoor een recruiter je heeft geshortlist.",
    noShortlist: "Nog geen shortlist. Zodra een recruiter je shortlist, verschijnt het hier.",
    newBadge: "Nieuw",
    fitSuffix: "fit",
    strongMatch: "Sterke match",
    goodMatch: "Goede match",
    worthALook: "Het bekijken waard",
    scoringLabel: "Scoring",
    readyWithin24h: "Klaar binnen 24 uur",
  },
  project: {
    backToMatches: "Terug naar matches",
    aboutProject: "Over het project",
    fitBreakdown: "Fit-overzicht",
    requiredSkill: "Vereiste vaardigheid",
    statusColumn: "Status",
    onYourCv: "Op je cv",
    notDetected: "Niet gevonden",
    scoringInProgress: "Scoring bezig",
    scoringExplainer:
      "We scoren nog hoe goed dit project bij je cv past. Fit-details verschijnen meestal binnen 24 uur na het uploaden van je cv — je kunt nu alvast solliciteren als het er goed uitziet.",
    evidenceComingSoon:
      "We werken nog aan de manier waarop we elke match toelichten — een gedetailleerd overzicht per vaardigheid komt binnenkort.",
    requiredSkills: "Vereiste vaardigheden",
    dayRate: "Dagtarief",
    deadline: "Deadline",
    notSpecified: "Niet opgegeven",
    applyButton: "Solliciteer met mijn cv",
    applying: "Bezig met solliciteren…",
    appliedButton: "Gesolliciteerd ✓",
    consentAfterApply: "De organisatie kan je profiel zien.",
    consentBeforeApply: "Je cv wordt pas gedeeld na jouw bevestiging.",
    notFound: "Project niet gevonden",
    backToDashboard: "Terug naar dashboard",
  },
  settings: {
    title: "Instellingen",
    subtitle: "Beheer je profiel, beveiliging en voorkeuren.",
    profileTitle: "Profielgegevens",
    profileSubtitle: "Deze informatie helpt ons je te matchen met projecten.",
    saveChanges: "Wijzigingen opslaan",
    saving: "Opslaan…",
    passwordTitle: "Wachtwoord",
    passwordSubtitle: "Wijzig het wachtwoord waarmee je inlogt.",
    currentPassword: "Huidig wachtwoord",
    newPassword: "Nieuw wachtwoord",
    updatePassword: "Wachtwoord bijwerken",
    updating: "Bezig met bijwerken…",
    notificationsTitle: "Meldingen",
    notificationsSubtitle: "Kies waarover we je mailen.",
    newMatchesLabel: "Nieuwe matches",
    newMatchesDesc: "Wanneer nieuwe projecten bij je profiel passen.",
    shortlistedLabel: "Op de shortlist",
    shortlistedDesc: "Wanneer een recruiter je shortlist.",
    productUpdatesLabel: "Productupdates",
    productUpdatesDesc: "Af en toe nieuws over InkoopMatch.",
    dangerTitle: "Account verwijderen",
    dangerSubtitle: "Verwijder permanent je account, cv en sollicitaties.",
    dangerText:
      "Dit kan niet ongedaan worden gemaakt. Je cv wordt verwijderd en je sollicitaties worden ingetrokken.",
    deleteButton: "Account verwijderen",
    deleteConfirmTitle: "Account verwijderen?",
    deleteConfirmDesc:
      "Dit verwijdert permanent je profiel, cv en sollicitaties. Deze actie kan niet ongedaan worden gemaakt.",
    cancel: "Annuleren",
    yesDelete: "Ja, verwijderen",
    deleting: "Bezig met verwijderen…",
    sendResetCode: "Stuur een code naar mijn e-mail",
    reauthPrompt: "Voer je wachtwoord in om te bevestigen dat jij het echt bent — dit kan niet ongedaan worden gemaakt.",
    confirmAndDelete: "Bevestigen en verwijderen",
  },
  landing: {
    badge: "AVG-compliant · Je cv wordt nooit gedeeld zonder jouw toestemming",
    heroLine1: "Jij kent je vak.",
    heroLine2: "Wij kijken verder dan",
    heroLine2Accent: "je functietitel",
    subtitle:
      "InkoopMatch vergelijkt je volledige cv — niet alleen een titel — met elke openstaande opdracht op het gebied van inkoop, juridisch, compliance en contractmanagement die we bijhouden. Zo ontdek je ook kansen die een zoekterm zou missen.",
    humanNote: "Voor vakmensen, door vakmensen",
    seeHowItWorks: "Eerst bekijken hoe het werkt",
    startTitle: "Begin met je cv",
    startSubtitle: "Upload je cv en maak een account aan om je matches te zien.",
    timeEstimate: "~ 20 seconden",
    dropCv: "Sleep je cv hierheen, of klik om te uploaden",
    fileHint: "PDF of Word · max 5 MB",
    noSpam: "Nooit recruiter-spam.",
    proof1Title: "Je hele cv telt",
    proof1Desc: "niet alleen je functietitel",
    proof2Title: "Een reden bij elke match",
    proof2Desc: "een fit-score, plus wat overeenkwam",
    proof3Title: "Jij houdt de regie",
    proof3Desc: "delen pas na jouw toestemming",
    howItWorks: "Hoe het werkt",
    step1Title: "Eén keer uploaden",
    step1Desc: "We vergelijken je volledige cv — vaardigheden, sectoren, ervaring — met elke openstaande opdracht, niet alleen titels.",
    step2Title: "Bekijk fit-scores, met reden",
    step2Desc: "Elke match laat zien welke vaardigheden overeenkwamen — en welke niet.",
    step3Title: "Solliciteer met één klik",
    step3Desc: "We sturen je profiel naar de organisatie. Jij houdt controle over toestemming.",
    questionsTitle: "Vragen voordat je je aanmeldt?",
    questionsSubtitle: "We helpen je graag — neem contact op, we reageren snel.",
    contactUs: "Contact",
  },
  howItWorks: {
    badge: "Hoe het werkt",
    title: "Jij kent je vak. Wij kijken verder dan je functietitel.",
    subtitle:
      "InkoopMatch vergelijkt je volledige cv met elke openstaande opdracht die we bijhouden — niet alleen de titel van de vacature.",
    processTitle: "Ons proces, in drie stappen",
    process1Title: "We verzamelen openstaande opdrachten",
    process1Desc:
      "We halen openstaande opdrachten op van verschillende externe platforms, zodat jij niet elk platform apart hoeft te checken.",
    process2Title: "We matchen met onze eigen technologie",
    process2Desc:
      "Je cv wordt vergeleken met elke openstaande opdracht via onze eigen matchingtechnologie — vaardigheden, ervaring en context, niet alleen een titel.",
    process3Title: "Jij houdt de regie",
    process3Desc:
      "Jij bepaalt op welke opdrachten je reageert. Je profiel wordt pas gedeeld nadat jij op Solliciteren klikt.",
    disclosureTitle: "Waar je gegevens naartoe gaan",
    disclosureBody:
      "The Goodlife Company B.V., handelend onder de naam Meester Inkoop, is je daadwerkelijke contractspartij — Inkoopmatch is de digitale tool die Meester Inkoop gebruikt voor matching, geen aparte onderneming en geen verzamelplatform van opdrachten van andere platforms. Je cv wordt met AI vergeleken met opdrachten, maar een medewerker van Meester Inkoop beoordeelt de match altijd voordat er iets mee gebeurt. Je volledige cv wordt pas aan een specifieke opdrachtgever verstrekt nadat jij apart akkoord bent gegaan met die specifieke voordracht — nooit automatisch, en nooit aan een andere opdrachtgever zonder opnieuw te vragen. Bekijk onze volledige voorwaarden voor precies hoe dit werkt.",
    orgsTitle: "Zoek je zelf naar inkoopexpertise?",
    orgsSubtitle:
      "We werken direct samen met een beperkt aantal organisaties. Neem contact op en we kijken of het een match is.",
    orgsCta: "Neem contact op",
  },
  about: {
    badge: "Ons verhaal",
    title: "Freelancers matchen aan opdrachten",
    titleAccent: "voorbij de functietitel.",
    intro:
      "InkoopMatch is gebouwd voor de zelfstandige specialisten die EU-inkoop, juridisch werk en compliance draaiende houden. We kijken naar je hele cv — niet alleen je laatste functietitel — zodat je ook kansen ziet die een zoekterm zou missen.",
    point1Title: "Je hele cv telt",
    point1Desc: "Niet alleen je functietitel, maar vaardigheden, sectorervaring en context.",
    point2Title: "Beoordeeld door recruiters",
    point2Desc: "Een echte InkoopMatch-recruiter beoordeelt sollicitaties voordat ze een organisatie bereiken.",
    point3Title: "Privé by design",
    point3Desc: "Je cv wordt nooit gedeeld zonder jouw toestemming. Bekijk onze voorwaarden voor precies hoe gegevens stromen.",
    ctaTitle: "Meer weten?",
    ctaSubtitle: "Neem contact op om te horen hoe InkoopMatch jouw team of freelance carrière kan helpen.",
    ctaButton: "Neem contact op",
  },
  contact: {
    title: "Contact",
    subtitle:
      "Vragen over je account, een opdracht, of hoe InkoopMatch werkt — we helpen je graag.",
    orgsNote: "Zoek je zelf naar expertise in plaats van te solliciteren? Vermeld dat in je bericht, dan zetten we je bericht goed door.",
    privacyNote: "Vraag over gegevens of privacy? Bekijk onze",
    privacyLink: "Voorwaarden & privacy",
  },
  terms: {
    title: "Voorwaarden & privacy",
    updatedNote: "Laatst bijgewerkt — placeholder tekst, in afwachting van juridische toetsing.",
    s1Title: "1. Wat we verzamelen",
    s1Body:
      "Je naam, e-mail, stad, functie, jaren ervaring, beschikbaarheid, een optioneel mobiel nummer, en het cv-bestand dat je uploadt.",
    s2Title: "2. Waarom we het verzamelen",
    s2Body:
      "Om een fit-score te berekenen tussen je cv en openstaande opdrachten, en om je te laten solliciteren op opdrachten naar keuze.",
    s3Title: "3. Hoe InkoopMatch werkt, en wie je gegevens ziet",
    s3Body:
      "InkoopMatch treedt op als tussenpersoon: we verzamelen openstaande opdrachten van verschillende externe platforms, en gebruiken onze eigen matchingtechnologie om ze te vergelijken met jouw cv. Je cv en profiel zijn zichtbaar voor InkoopMatch-recruiters. Zodra je solliciteert op een opdracht, wordt je profiel zichtbaar voor de organisatie erachter — en, afhankelijk van waar de opdracht vandaan komt, mogelijk ook gedeeld met het platform waar de opdracht oorspronkelijk vandaan kwam, omdat dat onderdeel is van hoe de opdracht bij jou terecht is gekomen. We verkopen je gegevens niet, en delen niets voordat jij besluit te solliciteren.",
    s4Title: "4. Opslag",
    s4Body:
      "Je cv wordt opgeslagen in een privé Azure Blob Storage-container, niet openbaar toegankelijk. Profielgegevens staan in onze SQL-database binnen de EU.",
    s5Title: "5. Bewaartermijn",
    s5Body:
      "Je gegevens blijven bewaard zolang je account actief is. Je kunt op elk moment verwijdering aanvragen via Instellingen → Account verwijderen.",
    s6Title: "6. Jouw rechten",
    s6Body:
      "Onder de AVG heb je het recht om je persoonsgegevens in te zien, te corrigeren of te laten verwijderen, en je toestemming op elk moment in te trekken.",
    s7Title: "7. Contact",
    s7BodyPrefix: "Voor gegevensverzoeken of vragen, zie onze",
    s7ContactLink: "Contactpagina",
  },
  language: {
    english: "English",
    dutch: "Nederlands",
  },
};

export type Language = "en" | "nl";
export const dictionaries: Record<Language, Dictionary> = { en, nl };
