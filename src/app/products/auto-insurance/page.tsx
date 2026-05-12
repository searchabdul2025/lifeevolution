import { ProductPageTemplate } from "@/components/ProductPageTemplate";

const coverageTypes = [
  {
    name: "Liability Coverage",
    icon: "🚦",
    description: "Required coverage that protects others if you cause an accident",
    features: ["Bodily injury liability", "Property damage liability", "Legal defense costs", "State minimum requirements"],
    bestFor: "All drivers (legally required in most states)",
  },
  {
    name: "Full Coverage",
    icon: "🛡️",
    description: "Comprehensive protection including collision and comprehensive coverage",
    features: ["Collision coverage", "Comprehensive coverage", "Theft & vandalism", "Natural disasters"],
    bestFor: "New cars, financed vehicles, valuable cars",
  },
  {
    name: "Premium Protection",
    icon: "⭐",
    description: "Maximum coverage with added benefits and lower deductibles",
    features: ["Rental reimbursement", "Roadside assistance", "Gap coverage", "New car replacement"],
    bestFor: "Luxury vehicles, frequent drivers, peace of mind seekers",
  },
];

const faqs = [
  {
    q: "What's the difference between collision and comprehensive?",
    a: "Collision covers damage from accidents with other vehicles or objects. Comprehensive covers non-collision events like theft, vandalism, weather, or hitting an animal.",
  },
  {
    q: "How much liability coverage do I need?",
    a: "While states set minimums (often 25/50/25), experts recommend at least 100/300/100 to protect your assets. Higher limits cost only slightly more but provide much better protection.",
  },
  {
    q: "What factors affect my auto insurance rate?",
    a: "Key factors include: driving record, age, location, vehicle type, credit score, annual mileage, and coverage limits. Bundling policies and maintaining good credit can lower rates.",
  },
  {
    q: "Do I need uninsured motorist coverage?",
    a: "Highly recommended! It protects you if hit by an uninsured or underinsured driver. About 13% of drivers are uninsured, making this coverage crucial.",
  },
  {
    q: "How can I lower my auto insurance premium?",
    a: "Increase deductibles, bundle with home insurance, maintain good credit, take defensive driving courses, install safety features, and ask about all available discounts.",
  },
];

const eligibility = [
  { title: "License Status", value: "Valid driver's license", icon: "🪪" },
  { title: "Vehicle Age", value: "Any age accepted", icon: "🚗" },
  { title: "Driving Record", value: "All records considered", icon: "📋" },
];

export default function AutoInsurancePage() {
  return (
    <ProductPageTemplate
      title="Auto Insurance"
      description="Drive with confidence knowing you're fully protected on the road."
      coverageTypes={coverageTypes}
      faqs={faqs}
      eligibility={eligibility}
    />
  );
}
