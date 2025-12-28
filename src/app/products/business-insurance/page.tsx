import { ProductPageTemplate } from "@/components/ProductPageTemplate";

const coverageTypes = [
  {
    name: "General Liability",
    icon: "🏢",
    description: "Essential protection against third-party claims and lawsuits",
    features: ["Bodily injury coverage", "Property damage", "Legal defense", "Medical payments"],
    bestFor: "All businesses, required by many contracts",
  },
  {
    name: "Professional Liability",
    icon: "💼",
    description: "Errors & omissions coverage for service-based businesses",
    features: ["Professional mistakes", "Negligence claims", "Legal defense", "Client disputes"],
    bestFor: "Consultants, agencies, professional services",
  },
  {
    name: "Business Owner's Policy",
    icon: "📦",
    description: "Bundled coverage combining multiple protections at a discount",
    features: ["General liability", "Property coverage", "Business interruption", "Equipment breakdown"],
    bestFor: "Small to medium businesses, cost-conscious owners",
  },
];

const faqs = [
  {
    q: "What type of business insurance do I need?",
    a: "Most businesses need general liability as a baseline. Add professional liability if you provide services/advice, property insurance if you have physical assets, and workers' comp if you have employees.",
  },
  {
    q: "Is workers' compensation insurance required?",
    a: "Requirements vary by state, but most states require it if you have employees. Even if not required, it protects you from employee injury lawsuits and covers medical costs.",
  },
  {
    q: "What does cyber liability insurance cover?",
    a: "Cyber insurance covers data breaches, ransomware attacks, business interruption from cyber events, notification costs, credit monitoring for affected customers, and legal defense.",
  },
  {
    q: "How much does business insurance cost?",
    a: "Costs vary widely based on industry, revenue, employees, and coverage limits. General liability averages $500-$3,000/year. Professional liability runs $500-$5,000/year depending on risk.",
  },
  {
    q: "Can I get business insurance as a sole proprietor?",
    a: "Absolutely! Sole proprietors, freelancers, and contractors can and should get business insurance. Many clients require proof of insurance before working with you.",
  },
];

const eligibility = [
  { title: "Business Type", value: "All industries", icon: "🏭" },
  { title: "Company Size", value: "Sole prop to enterprise", icon: "📊" },
  { title: "Revenue", value: "Any revenue level", icon: "💰" },
];

export default function BusinessInsurancePage() {
  return (
    <ProductPageTemplate
      title="Business Insurance"
      description="Comprehensive protection for your business operations and growth."
      coverageTypes={coverageTypes}
      faqs={faqs}
      eligibility={eligibility}
    />
  );
}
