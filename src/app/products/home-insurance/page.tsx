import { ProductPageTemplate } from "@/components/ProductPageTemplate";

const coverageTypes = [
  {
    name: "HO-3 (Standard)",
    icon: "🏡",
    description: "Most common homeowners policy with broad dwelling coverage",
    features: ["Dwelling coverage", "Personal property", "Liability protection", "Additional living expenses"],
    bestFor: "Single-family homes, most homeowners",
  },
  {
    name: "HO-5 (Premium)",
    icon: "🏰",
    description: "Comprehensive open-peril coverage for home and belongings",
    features: ["All-risk dwelling", "All-risk contents", "Higher limits", "Fewer exclusions"],
    bestFor: "High-value homes, valuable possessions",
  },
  {
    name: "HO-6 (Condo)",
    icon: "🏢",
    description: "Coverage designed specifically for condominium owners",
    features: ["Interior coverage", "Personal property", "Loss assessment", "Liability coverage"],
    bestFor: "Condo owners, co-op residents",
  },
];

const faqs = [
  {
    q: "What does home insurance actually cover?",
    a: "Standard policies cover: dwelling (structure), personal property (belongings), liability (injuries/damages you cause), and additional living expenses if your home becomes uninhabitable.",
  },
  {
    q: "Is flood and earthquake coverage included?",
    a: "No, these require separate policies. Standard home insurance excludes floods and earthquakes. If you're in a high-risk area, consider adding these coverages.",
  },
  {
    q: "How much dwelling coverage do I need?",
    a: "Coverage should equal your home's rebuild cost (not market value). Consider construction costs, square footage, materials, and local labor rates. We offer free replacement cost estimates.",
  },
  {
    q: "What's the difference between actual cash value and replacement cost?",
    a: "Actual cash value pays depreciated value. Replacement cost pays to replace items with new ones of similar quality. Replacement cost costs more but provides better protection.",
  },
  {
    q: "How can I lower my home insurance premium?",
    a: "Increase deductibles, bundle with auto insurance, install security systems, upgrade roof/plumbing/electrical, maintain good credit, and stay claims-free for discounts.",
  },
];

const eligibility = [
  { title: "Property Type", value: "Houses, condos, townhomes", icon: "🏘️" },
  { title: "Occupancy", value: "Primary or secondary", icon: "🔑" },
  { title: "Condition", value: "Good repair required", icon: "✨" },
];

export default function HomeInsurancePage() {
  return (
    <ProductPageTemplate
      title="Home Insurance"
      description="Safeguard your home and belongings against unexpected events."
      coverageTypes={coverageTypes}
      faqs={faqs}
      eligibility={eligibility}
    />
  );
}
