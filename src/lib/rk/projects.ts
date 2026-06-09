export type Project = {
  id: string;
  title: string;
  org: string;
  location: string;
  duration: string;
  mode: "Remote" | "Hybrid" | "On-site";
  rate: string;
  tags: string[];
  fit: number; // 0-100
  matchedSkills: string[];
  unmatchedSkills: string[];
  postedHoursAgo: number;
  description: string;
  category: "Procurement" | "Legal" | "Compliance" | "Finance" | "Contract";
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: "RK-31241",
    title: "Senior Procurement Advisor — EU Tender Programme",
    org: "Ministry of Infrastructure",
    location: "The Hague, NL",
    duration: "6 months",
    mode: "Hybrid",
    rate: "€850–950 / day",
    tags: ["EU Procurement", "Public Tender", "FIDIC", "Contract Law"],
    fit: 96,
    matchedSkills: ["EU Procurement", "Public Tender", "FIDIC", "Contract Law"],
    unmatchedSkills: [],
    postedHoursAgo: 4,
    description:
      "Lead procurement strategy for a €120M infrastructure framework. Owns vendor evaluation, contract negotiation and FIDIC compliance.",
    category: "Procurement",
  },
  {
    id: "RK-31238",
    title: "Compliance Lead — GDPR & NIS2 Programme",
    org: "Northern Bank Group",
    location: "Amsterdam, NL",
    duration: "9 months",
    mode: "Hybrid",
    rate: "€780–880 / day",
    tags: ["GDPR", "NIS2", "Vendor Risk", "Internal Audit"],
    fit: 92,
    matchedSkills: ["GDPR", "NIS2", "Vendor Risk"],
    unmatchedSkills: ["Internal Audit"],
    postedHoursAgo: 19,
    description:
      "Build the NIS2 readiness programme across 14 EU subsidiaries. Partner with legal, IT and risk.",
    category: "Compliance",
  },
  {
    id: "RK-31230",
    title: "Contract Manager — Energy Transition Portfolio",
    org: "Vattenfall NL",
    location: "Amsterdam, NL",
    duration: "12 months",
    mode: "Remote",
    rate: "€700–820 / day",
    tags: ["Contract Law", "Vendor Negotiations", "EU Regulatory"],
    fit: 88,
    matchedSkills: ["Contract Law", "Vendor Negotiations"],
    unmatchedSkills: ["EU Regulatory"],
    postedHoursAgo: 32,
    description:
      "Manage a portfolio of supplier contracts across wind and solar build-out. Drive renegotiation savings.",
    category: "Contract",
  },
  {
    id: "RK-31225",
    title: "Legal Counsel — Vendor Negotiations (Tech)",
    org: "Adyen",
    location: "Amsterdam, NL",
    duration: "4 months",
    mode: "Hybrid",
    rate: "€900–1,050 / day",
    tags: ["NDA Review", "Vendor Negotiations", "Legal Drafting"],
    fit: 84,
    matchedSkills: ["NDA Review", "Vendor Negotiations"],
    unmatchedSkills: ["Legal Drafting"],
    postedHoursAgo: 51,
    description:
      "Negotiate enterprise SaaS and infra contracts. Partner closely with procurement and security.",
    category: "Legal",
  },
  {
    id: "RK-31218",
    title: "AML / KYC Programme Manager",
    org: "ING Wholesale Banking",
    location: "Brussels, BE",
    duration: "6 months",
    mode: "On-site",
    rate: "€680–780 / day",
    tags: ["AML", "KYC", "Data Protection"],
    fit: 79,
    matchedSkills: ["AML", "KYC"],
    unmatchedSkills: ["Data Protection"],
    postedHoursAgo: 72,
    description:
      "Refactor the KYC onboarding flow for corporate clients across BENELUX. Drive automation pilots.",
    category: "Compliance",
  },
  {
    id: "RK-31202",
    title: "Procurement Operations Lead — Healthcare",
    org: "Erasmus MC",
    location: "Rotterdam, NL",
    duration: "8 months",
    mode: "Hybrid",
    rate: "€650–750 / day",
    tags: ["EU Procurement", "Public Tender", "Vendor Negotiations"],
    fit: 74,
    matchedSkills: ["EU Procurement", "Vendor Negotiations"],
    unmatchedSkills: ["Public Tender"],
    postedHoursAgo: 96,
    description:
      "Restructure procurement ops across clinical supply categories. Reports to the CFO office.",
    category: "Procurement",
  },
];
