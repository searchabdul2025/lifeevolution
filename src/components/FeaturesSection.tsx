"use client";

export function FeaturesSection() {
  const features = [
    {
      icon: "🎯",
      title: "Smart guidance",
      description: "Concierge-style experience that routes you to the right coverage and the right person.",
    },
    {
      icon: "⚡",
      title: "Fast workflows",
      description: "From consultation to approval — optimized steps with progress saving.",
    },
    {
      icon: "🛡️",
      title: "Real protection",
      description: "Coverage explained visually, with eligibility and FAQs built in.",
    },
    {
      icon: "🔐",
      title: "Secure portals",
      description: "Customer, agent, and affiliate portals ready for payments, docs, and tracking.",
    },
  ];

  return (
    <section className="relative bg-[color:var(--bg)] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="sticky top-24">
              <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
                Why choose us
              </div>
              <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight text-[color:var(--text-primary)] md:text-5xl">
                Premium service.{" "}
                <span className="bg-gradient-to-r from-[color:var(--blue)] to-[color:var(--blue-2)] bg-clip-text text-transparent">
                  Precise recommendations.
                </span>
              </h2>
              <p className="mt-6 text-pretty text-lg leading-8 text-[color:var(--text-secondary)]">
                You get a modern experience without losing the human care. Transparent
                comparisons, clear next steps, and real support when you need it.
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature, idx) => (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white/80 dark:bg-[#1a1f2e]/90 p-8 backdrop-blur-xl transition-all hover:border-[color:var(--border-hover)] hover:shadow-2xl"
                  style={{
                    animation: `float 6s ease-in-out infinite`,
                    animationDelay: `${idx * 0.2}s`,
                  }}
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[color:var(--gold)] opacity-20 blur-2xl transition-all group-hover:opacity-30"></div>
                  
                  <div className="relative">
                    <div className="text-4xl">{feature.icon}</div>
                    <div className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </div>
                    <div className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--blue)] transition-all duration-500 group-hover:w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white/80 dark:bg-[#1a1f2e]/90 p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-[#0f1419]/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-gray-600 dark:text-gray-400">
                Real stories
              </div>
              <blockquote className="mt-6 text-balance text-3xl font-bold text-gray-900 dark:text-white">
                "They made it simple — I knew exactly what I was buying."
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] p-0.5">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-[#1a1f2e] text-lg font-bold text-gray-900 dark:text-white">
                    JD
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    Jane Doe
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Life Insurance Customer
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 md:justify-self-end">
              <a
                href="/testimonials"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--text-primary)] px-8 text-sm font-semibold text-[color:var(--bg)] transition-all hover:scale-105 hover:shadow-xl"
              >
                View All Stories
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
