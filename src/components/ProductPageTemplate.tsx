"use client";

import { PageShell } from "@/components/PageShell";
import { useState } from "react";

interface CoverageType {
  name: string;
  icon: string;
  description: string;
  features: string[];
  bestFor: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface ProductPageProps {
  title: string;
  description: string;
  coverageTypes: CoverageType[];
  faqs: FAQ[];
  eligibility: Array<{ title: string; value: string; icon: string }>;
  calculatorFields?: React.ReactNode;
}

export function ProductPageTemplate({
  title,
  description,
  coverageTypes,
  faqs,
  eligibility,
  calculatorFields,
}: ProductPageProps) {
  const [activeType, setActiveType] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageShell
      eyebrow="Product"
      title={title}
      description={description}
      primaryCta={{ href: "/quote-center", label: "Get a Quote" }}
      secondaryCta={{ href: "/talk-with-an-agent", label: "Talk With an Agent" }}
    >
      <div className="space-y-12">
        <div className="grid gap-6 md:grid-cols-3">
          {coverageTypes.map((type, idx) => (
            <button
              key={type.name}
              onClick={() => setActiveType(idx)}
              className={`group relative overflow-hidden rounded-3xl border p-6 text-left transition-all ${
                activeType === idx
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
                        ✓
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
                  Quick Estimate
                </div>
                <div className="mt-4 space-y-3">
                  {calculatorFields || (
                    <>
                      <div>
                        <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                          Coverage Amount
                        </label>
                        <input
                          type="text"
                          placeholder="$100,000"
                          className="mt-1 h-10 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-3 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          placeholder="10001"
                          className="mt-1 h-10 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-3 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                        />
                      </div>
                    </>
                  )}
                  <button className="mt-4 h-10 w-full rounded-full bg-[color:var(--gold)] text-sm font-semibold text-[color:var(--ink)] transition hover:scale-105">
                    Get Estimate
                  </button>
                  <div className="text-xs text-[color:var(--text-tertiary)]">
                    💡 Get a precise quote in our Quote Center
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
              Eligibility
            </div>
            <h2 className="mt-6 text-3xl font-bold text-[color:var(--text-primary)]">
              Who can apply?
            </h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {eligibility.map((item) => (
              <div key={item.title} className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-center shadow-lg">
                <div className="text-4xl">{item.icon}</div>
                <div className="mt-4 text-sm font-bold uppercase tracking-wider text-[color:var(--text-tertiary)]">
                  {item.title}
                </div>
                <div className="mt-2 text-lg font-bold text-[color:var(--text-primary)]">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
              FAQs
            </div>
            <h2 className="mt-6 text-3xl font-bold text-[color:var(--text-primary)]">
              Common questions about {title.toLowerCase()}
            </h2>
          </div>

          <div className="mt-8 space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] transition-all hover:shadow-lg"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <div className="text-sm font-bold text-[color:var(--text-primary)]">
                    {faq.q}
                  </div>
                  <svg
                    className={`h-5 w-5 text-[color:var(--text-tertiary)] transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === idx && (
                  <div className="border-t border-[color:var(--border)] bg-[color:var(--surface-2)] p-6">
                    <div className="text-sm leading-6 text-[color:var(--text-secondary)]">
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
