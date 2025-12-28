"use client";

import { PageShell } from "@/components/PageShell";
import { useState } from "react";

const steps = [
  {
    number: 1,
    title: "Consultation",
    icon: "💬",
    description: "We start by understanding your unique needs, goals, and budget.",
    details: [
      "Free 30-minute consultation",
      "Assess your coverage needs",
      "Review existing policies",
      "Discuss budget and timeline",
    ],
    duration: "30 min",
  },
  {
    number: 2,
    title: "Application",
    icon: "📝",
    description: "We guide you through the application process with clarity and speed.",
    details: [
      "Pre-filled forms when possible",
      "Document upload assistance",
      "Medical exam scheduling (if needed)",
      "Real-time application tracking",
    ],
    duration: "1-2 days",
  },
  {
    number: 3,
    title: "Approval",
    icon: "✅",
    description: "Track your application status and respond to any carrier requests.",
    details: [
      "Instant status updates",
      "Underwriting support",
      "Quick response to requests",
      "Policy review before finalization",
    ],
    duration: "2-6 weeks",
  },
  {
    number: 4,
    title: "Payment",
    icon: "💳",
    description: "Set up secure payments with flexible options that work for you.",
    details: [
      "Multiple payment methods",
      "Auto-pay setup available",
      "Payment reminders",
      "Secure encryption (PCI compliant)",
    ],
    duration: "5 min",
  },
  {
    number: 5,
    title: "Ongoing Support",
    icon: "🤝",
    description: "We're here for policy changes, claims, and any questions you have.",
    details: [
      "24/7 customer portal access",
      "Dedicated support team",
      "Policy modification assistance",
      "Claims guidance and advocacy",
    ],
    duration: "Lifetime",
  },
];

const services = [
  {
    title: "Policy Comparison",
    icon: "🔍",
    description: "Compare multiple carriers and plans side-by-side with transparent pricing.",
  },
  {
    title: "Expert Guidance",
    icon: "👨‍💼",
    description: "Licensed agents available via chat, phone, or video to answer your questions.",
  },
  {
    title: "Digital Tools",
    icon: "🤖",
    description: "Intelligent quote builder, document vault, and payment management.",
  },
  {
    title: "Claims Support",
    icon: "🛡️",
    description: "We advocate for you during the claims process to ensure smooth payouts.",
  },
];

export default function ServicesPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <PageShell
      eyebrow="Services"
      title="A guided workflow from start to protection."
      description="A smooth, step-by-step experience — with clarity and support at every stage."
      primaryCta={{ href: "/schedule-appointment", label: "Schedule Appointment" }}
      secondaryCta={{ href: "/talk-with-an-agent", label: "Talk With an Agent" }}
    >
      <div className="space-y-16">
        <div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
              How We Work
            </div>
            <h2 className="mt-6 text-3xl font-bold text-[color:var(--text-primary)]">
              Five simple steps to complete protection
            </h2>
          </div>

          <div className="relative mt-12">
            <div className="absolute left-0 top-1/2 hidden h-1 w-full -translate-y-1/2 md:block">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--blue)] to-[color:var(--gold)] opacity-30"></div>
              <div className="absolute inset-0 h-full rounded-full bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--blue)] to-[color:var(--gold)] blur-sm"></div>
            </div>

            <div className="grid gap-6 md:grid-cols-5">
              {steps.map((step, idx) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative overflow-hidden rounded-[28px] border-2 p-6 text-center transition-all duration-500 ${
                    activeStep === idx
                      ? "border-[color:var(--gold)] bg-white dark:bg-[#1a1f2e] shadow-[0_20px_70px_-15px_rgba(255,208,87,0.4)] scale-110 z-10"
                      : "border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] hover:border-[color:var(--gold)]/50 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] hover:scale-105"
                  }`}
                  style={{
                    animation: `float 6s ease-in-out infinite`,
                    animationDelay: `${idx * 0.2}s`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--gold)]/5 via-transparent to-[color:var(--blue)]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[color:var(--gold)] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-20"></div>
                  <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-[color:var(--blue)] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-15"></div>

                  <div className="relative">
                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] text-2xl font-bold text-white shadow-lg ring-2 ring-white/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl">
                      {step.number}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
                    </div>
                    <div className="mt-5 text-5xl transition-transform duration-500 group-hover:scale-110">{step.icon}</div>
                    <div className="mt-4 text-base font-bold text-[color:var(--text-primary)] transition-colors duration-300 group-hover:text-[color:var(--gold)]">
                      {step.title}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--blue)] to-[color:var(--gold)] transition-all duration-500 group-hover:w-full"></div>
                  
                  {activeStep === idx && (
                    <div className="absolute -inset-0.5 rounded-[28px] bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--blue)] to-[color:var(--gold)] opacity-20 blur-xl animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-8 shadow-2xl">
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] text-3xl shadow-lg">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
                      Step {steps[activeStep].number}
                    </div>
                    <div className="mt-1 text-2xl font-bold text-[color:var(--text-primary)]">
                      {steps[activeStep].title}
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-[color:var(--text-secondary)]">
                  {steps[activeStep].description}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {steps[activeStep].details.map((detail) => (
                    <div
                      key={detail}
                      className="flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] p-4"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--gold)] text-xs font-bold text-[color:var(--ink)]">
                        ✓
                      </div>
                      <div className="text-sm text-[color:var(--text-primary)]">{detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="rounded-2xl border-2 border-[color:var(--gold)]/30 bg-gradient-to-br from-[color:var(--gold)]/10 to-[color:var(--blue)]/10 p-6">
                  <div className="text-sm font-bold text-[color:var(--text-primary)]">
                    Typical Timeline
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--gold)] text-xl font-bold text-[color:var(--ink)]">
                      ⏱️
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[color:var(--text-primary)]">
                        {steps[activeStep].duration}
                      </div>
                      <div className="text-xs text-[color:var(--text-tertiary)]">
                        Average completion time
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
                      What You'll Need
                    </div>
                    {activeStep === 0 && (
                      <ul className="space-y-1 text-sm text-[color:var(--text-secondary)]">
                        <li>• Current coverage details (if any)</li>
                        <li>• Budget range</li>
                        <li>• Coverage goals</li>
                      </ul>
                    )}
                    {activeStep === 1 && (
                      <ul className="space-y-1 text-sm text-[color:var(--text-secondary)]">
                        <li>• Personal information</li>
                        <li>• Medical history</li>
                        <li>• Beneficiary details</li>
                        <li>• Payment information</li>
                      </ul>
                    )}
                    {activeStep === 2 && (
                      <ul className="space-y-1 text-sm text-[color:var(--text-secondary)]">
                        <li>• Respond to carrier requests</li>
                        <li>• Complete medical exam (if required)</li>
                        <li>• Review policy terms</li>
                      </ul>
                    )}
                    {activeStep === 3 && (
                      <ul className="space-y-1 text-sm text-[color:var(--text-secondary)]">
                        <li>• Bank account or card details</li>
                        <li>• Preferred payment schedule</li>
                        <li>• Auto-pay preferences</li>
                      </ul>
                    )}
                    {activeStep === 4 && (
                      <ul className="space-y-1 text-sm text-[color:var(--text-secondary)]">
                        <li>• Access to customer portal</li>
                        <li>• Policy documents</li>
                        <li>• Support contact info</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
              What We Offer
            </div>
            <h2 className="mt-6 text-3xl font-bold text-[color:var(--text-primary)]">
              Comprehensive support at every stage
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-[#1a1f2e]/90 p-6 backdrop-blur-xl transition-all hover:border-[color:var(--gold)] hover:shadow-2xl"
                style={{
                  animation: `float 6s ease-in-out infinite`,
                  animationDelay: `${idx * 0.15}s`,
                }}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[color:var(--gold)] opacity-20 blur-2xl transition-opacity group-hover:opacity-30"></div>

                <div className="relative">
                  <div className="text-5xl">{service.icon}</div>
                  <div className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {service.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-[#1a1f2e]/90 p-10 text-center shadow-2xl backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ready to get started?
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
            Schedule a free consultation with one of our licensed agents, or get an instant
            quote using our intelligent quote tool. No pressure, just clarity.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/schedule-appointment"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--gold)] px-8 text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-xl"
            >
              Schedule Appointment
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
            <a
              href="/quote-center"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[color:var(--gold)] bg-white/50 dark:bg-[#1a1f2e]/50 px-8 text-sm font-semibold text-gray-900 dark:text-white transition-all hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] hover:scale-105"
            >
              Get Instant Quote
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
