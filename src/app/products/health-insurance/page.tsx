import { ProductPageTemplate } from "@/components/ProductPageTemplate";

const coverageTypes = [
  {
    name: "Individual Plans",
    icon: "",
    description: "Comprehensive coverage for you and your healthcare needs",
    features: ["Preventive care", "Prescription coverage", "Specialist visits", "Emergency services"],
    bestFor: "Self-employed, freelancers, early retirees",
  },
  {
    name: "Family Plans",
    icon: "",
    description: "Complete healthcare protection for your entire family",
    features: ["Pediatric care", "Maternity coverage", "Family deductible", "Dental & vision options"],
    bestFor: "Families with children, multi-generational households",
  },
  {
    name: "HSA Plans",
    icon: "",
    description: "High-deductible plans paired with tax-advantaged savings accounts",
    features: ["Lower premiums", "Tax-free savings", "Investment options", "Rollover funds"],
    bestFor: "Healthy individuals, those wanting to save on taxes",
  },
];

const faqs = [
  {
    q: "What's the difference between HMO, PPO, and EPO plans?",
    a: "HMO plans require referrals and in-network care. PPO plans offer more flexibility with out-of-network options. EPO plans don't require referrals but limit you to in-network providers except emergencies.",
  },
  {
    q: "Are pre-existing conditions covered?",
    a: "Yes! Under the Affordable Care Act, insurers cannot deny coverage or charge more due to pre-existing conditions. Coverage starts immediately upon enrollment.",
  },
  {
    q: "What is a deductible and how does it work?",
    a: "A deductible is the amount you pay out-of-pocket before insurance starts covering costs. For example, with a $2,000 deductible, you pay the first $2,000 of covered services, then insurance kicks in.",
  },
  {
    q: "Can I keep my current doctor?",
    a: "It depends on the plan's network. PPO plans offer the most flexibility. Check if your doctor is in-network before enrolling. We can help you verify provider networks.",
  },
  {
    q: "When can I enroll in health insurance?",
    a: "Open enrollment is typically November-January. You can also enroll during special enrollment periods triggered by life events like marriage, birth, or loss of other coverage.",
  },
];

const eligibility = [
  { title: "Age Range", value: "All ages", icon: "" },
  { title: "Residency", value: "US residents", icon: "" },
  { title: "Pre-existing", value: "Fully covered", icon: "" },
];

export default function HealthInsurancePage() {
  return (
    <ProductPageTemplate
      title="Health Insurance"
      description="Quality healthcare coverage that fits your budget and protects your wellbeing."
      coverageTypes={coverageTypes}
      faqs={faqs}
      eligibility={eligibility}
    />
  );
}
