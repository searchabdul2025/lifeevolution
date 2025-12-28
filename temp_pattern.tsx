"use client";

import { PageShell } from "@/components/PageShell";
import { useState } from "react";

const coverageTypes = [
  {
    name: "Term Life",
    icon: "",
    description: "Affordable coverage for a specific period (10, 20, or 30 years)",
    features: ["Lower premiums", "Flexible terms", "Convertible options", "No cash value"],
    bestFor: "Young families, mortgage protection, temporary needs",
  },
  {
    name: "Whole Life",
    icon: "",
    description: "Permanent coverage with guaranteed cash value growth",
    features: ["Lifetime protection", "Cash value accumulation", "Fixed premiums", "Dividend potential"],
    bestFor: "Estate planning, long-term wealth building, permanent needs",
  },
  {
    name: "Universal Life",
    icon: "",
    description: "Flexible permanent coverage with adjustable premiums and death benefit",
    features: ["Flexible premiums", "Adjustable coverage", "Cash value growth", "Tax advantages"],
    bestFor: "Those wanting flexibility, investment-minded individuals",
  },
];

const faqs = [
  {
    q: "How much life insurance do I need?",
    a: "A common rule of thumb is 10-12x your annual income. However, consider debts, future expenses (college, mortgage), and your family's needs. Our quote tool helps calculate your ideal coverage.",
  },
  {
    q: "What's the difference between term and whole life?",
    a: "Term life covers you for a specific period (e.g., 20 years) with lower premiums. Whole life provides lifetime coverage with cash value that grows over time, but costs more.",
  },
  {
    q: "Do I need a medical exam?",
    a: "It depends on the policy and coverage amount. Many insurers now offer simplified or accelerated underwriting with no exam required for qualifying applicants.",
  },
  {
    q: "Can I get coverage if I have health conditions?",
    a: "Yes! Many policies are available for people with pre-existing conditions. Premiums may be higher, but coverage is possible. We'll help you find the right fit.",
  },
  {
    q: "How quickly can I get covered?",
    a: "With accelerated underwriting, some applicants get approved in 24-48 hours. Traditional underwriting may take 4-6 weeks depending on medical exams and records.",
  },
];

export default function LifeInsurancePage() {
  const [activeType, setActiveType] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageShell
      eyebrow="Product"
      title="Life Insurance"
      description="Protect your family's financial future with comprehensive life insurance coverage tailored to your needs."
      primaryCta={{ href: "/quote-center", label: "Get a Quote" }}
      secondaryCta={{ href: "/talk-with-an-agent", label: "Talk With an Agent" }}
    >
      <div className="space-y-12">
        <div className="grid gap-6 md:grid-cols-3">
          {coverageTypes.map((type, idx) => (
            <button
              key={type.name}
              onClick={() => setActiveType(idx)}
              className={`group relative overflow-hidden rounded-3xl border p-6 text-left transition-all ${activeType === idx
                  ? "border-[color:var(--gold)] bg-gradient-to-br from-[color:var(--surface)] to-[color:var(--surface-2)] shadow-2xl scale-105"
                  : "border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--border-hover)] hover:shadow-lg"
                }`}
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[color:var(--gold)] opacity-0 blur-2xl transition-opacity group-hover:opacity-10"></div>

              <div className="relative">
                <div className="text-4xl">{type.icon}</div>
                <div className="mt-4 text-lg font-bold text-[color:var(--text-primary)]">
                  {type.name}
                </div>
                <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                  {type.description}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-2xl">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="text-2xl font-bold text-[color:var(--text-primary)]">
                {coverageTypes[activeType].name}
              </div>
              <div className="mt-4 text-[color:var(--text-secondary)]">
                {coverageTypes[activeType].description}
              </div>

              <div className="mt-6">
                <div className="text-sm font-bold uppercase tracking-wider text-[color:var(--text-tertiary)]">
                  Key Features
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {coverageTypes[activeType].features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--gold)] text-sm font-bold text-[color:var(--ink)]">

                      </div>
                      <div className="text-sm font-semibold text-[color:var(--text-primary)]">
                        {feature}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-6">
                <div className="text-sm font-bold text-[color:var(--text-primary)]">
                  Best For
                </div>
                <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                  {coverageTypes[activeType].bestFor}
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="sticky top-24 rounded-2xl border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--gold)]/10 to-[color:var(--blue)]/10 p-6">
                <div className="text-lg font-bold text-[color:var(--text-primary)]">
                  Coverage Calculator
                </div>
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                      Annual Income
                    </label>
                    <input
                      type="text"
                      placeholder="$75,000"
                      className="mt-1 h-10 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-3 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                      Outstanding Debts
                    </label>
                    <input
                      type="text"
                      placeholder="$250,000"
                      className="mt-1 h-10 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-3 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                      Years of Coverage
                    </label>
                    <select className="mt-1 h-10 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-3 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20">
                      <option>10 years</option>
                      <option>20 years</option>
                      <option>30 years</option>
                      <option>Lifetime</option>
                    </select>
                  </div>
                  <button className="mt-4 h-10 w-full rounded-full bg-[color:var(--gold)] text-sm font-semibold text-[color:var(--ink)] transition hover:scale-105">
                    Calculate Coverage
                  </button>
                  <div className="text-xs text-[color:var(--text-tertiary)]">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-gray-600 dark:text-gray-400">
              Eligibility
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Who can apply?
            </h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[/* eslint-disable @typescript-eslint/no-unused-vars */
              { title: "Age Range", value: "18-85 years old", icon: "" },
              { title: "Health Status", value: "Most conditions accepted", icon: "" },
              { title: "Citizenship", value: "US citizens & residents", icon: "" },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl p-6 text-center shadow-lg">
                <div className="text-4xl">{item.icon}</div>
                <div className="mt-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {item.title}
                </div>
                <div className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-gray-600 dark:text-gray-400">
              FAQs
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Common questions about life insurance
            </h2>
          </div>

          <div className="mt-8 space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl transition-all hover:shadow-lg"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <div className="text-sm font-bold text-gray-900 dark:text-white">
                    {faq.q}
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform ${openFaq === idx ? "rotate-180" : ""
                      }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === idx && (
                  <div className="border-t-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-6">
                    <div className="text-sm leading-6 text-gray-700 dark:text-gray-200">
                      {faq.a}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
