"use client";

import { PageShell } from "@/components/PageShell";
import { useState } from "react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Small Business Owner",
    avatar: "SM",
    product: "Business Insurance",
    rating: 5,
    text: "Life Evolutions X made getting business insurance incredibly easy. The quote tool was fast, and when I had questions, a real agent walked me through everything. Highly recommend!",
    videoPlaceholder: true,
    date: "2 weeks ago",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    avatar: "MC",
    product: "Life Insurance",
    rating: 5,
    text: "I was overwhelmed by life insurance options until I found this platform. The comparison tool showed me exactly what I needed, and the process was completely transparent.",
    videoPlaceholder: false,
    date: "1 month ago",
  },
  {
    name: "Jennifer Rodriguez",
    role: "Marketing Manager",
    avatar: "JR",
    product: "Health Insurance",
    rating: 5,
    text: "Switching to a new health plan was painless. The team helped me understand my options and I saved $200/month. The customer portal makes managing everything so easy.",
    videoPlaceholder: true,
    date: "3 weeks ago",
  },
  {
    name: "David Thompson",
    role: "Retired Teacher",
    avatar: "DT",
    product: "Auto Insurance",
    rating: 5,
    text: "After 30 years with my old insurer, I was nervous to switch. Life Evolutions X made it seamless and I'm saving $600/year with better coverage!",
    videoPlaceholder: false,
    date: "2 months ago",
  },
  {
    name: "Emily Parker",
    role: "First-Time Homeowner",
    avatar: "EP",
    product: "Home Insurance",
    rating: 5,
    text: "Buying my first home was stressful enough. Life Evolutions X made getting home insurance the easiest part of the process. Great rates and excellent service.",
    videoPlaceholder: true,
    date: "1 month ago",
  },
  {
    name: "Robert Kim",
    role: "Freelance Designer",
    avatar: "RK",
    product: "Health Insurance",
    rating: 5,
    text: "As a freelancer, finding affordable health insurance was tough. The platform compared dozens of plans and found me coverage that actually fits my budget.",
    videoPlaceholder: false,
    date: "3 months ago",
  },
  {
    name: "Amanda Foster",
    role: "Real Estate Agent",
    avatar: "AF",
    product: "Auto Insurance",
    rating: 5,
    text: "I drive a lot for work, so good auto insurance is critical. Life Evolutions X got me comprehensive coverage with roadside assistance at a great price.",
    videoPlaceholder: true,
    date: "2 weeks ago",
  },
  {
    name: "James Wilson",
    role: "Restaurant Owner",
    avatar: "JW",
    product: "Business Insurance",
    rating: 5,
    text: "Running a restaurant comes with risks. The team helped me get the right liability and property coverage. I sleep better knowing I'm protected.",
    videoPlaceholder: false,
    date: "1 month ago",
  },
  {
    name: "Lisa Anderson",
    role: "Young Professional",
    avatar: "LA",
    product: "Life Insurance",
    rating: 5,
    text: "I never thought about life insurance until my friend recommended this platform. The process was quick, affordable, and now I have peace of mind.",
    videoPlaceholder: true,
    date: "2 months ago",
  },
];

const filters = [
  { id: "all", label: "All Reviews" },
  { id: "Life Insurance", label: "Life Insurance" },
  { id: "Health Insurance", label: "Health Insurance" },
  { id: "Auto Insurance", label: "Auto Insurance" },
  { id: "Home Insurance", label: "Home Insurance" },
  { id: "Business Insurance", label: "Business Insurance" },
];

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTestimonials = testimonials.filter(
    (t) => activeFilter === "all" || t.product === activeFilter
  );

  return (
    <PageShell
      eyebrow="Testimonials"
      title="Trusted by real people."
      description="See what our customers have to say about their experience with Life Evolutions X."
      primaryCta={{ href: "/quote-center", label: "Get My Quote" }}
      secondaryCta={{ href: "/talk-with-an-agent", label: "Talk With an Agent" }}
    >
      <div className="space-y-8">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                activeFilter === filter.id
                  ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-[color:var(--ink)] shadow-lg"
                  : "border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-primary)] hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface-2)]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((testimonial, idx) => (
            <div
              key={testimonial.name}
              className="group relative overflow-hidden rounded-[28px] border border-[color:var(--border)]/50 bg-[color:var(--surface)]/60 p-6 backdrop-blur-xl transition-all duration-500 hover:border-[color:var(--gold)]/50 hover:bg-[color:var(--surface)]/80 hover:shadow-[0_20px_70px_-15px_rgba(255,208,87,0.3)] hover:scale-[1.02]"
              style={{
                animation: `float 6s ease-in-out infinite`,
                animationDelay: `${idx * 0.15}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--gold)]/5 via-transparent to-[color:var(--blue)]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[color:var(--gold)] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-20"></div>

              <div className="relative">
                {testimonial.videoPlaceholder && (
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[color:var(--blue)] to-[color:var(--blue-2)]">
                    <div className="flex h-full items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover:scale-110">
                        <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 rounded-lg bg-black/50 px-2 py-1 text-xs text-white backdrop-blur">
                      Video testimonial
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-[color:var(--bg)] text-sm font-bold text-[color:var(--text-primary)]">
                      {testimonial.avatar}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[color:var(--text-primary)]">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-[color:var(--text-tertiary)]">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-[color:var(--gold)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="mt-4 text-sm leading-6 text-[color:var(--text-secondary)]">
                  "{testimonial.text}"
                </blockquote>

                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-2)] px-3 py-1 text-xs font-semibold text-[color:var(--text-tertiary)]">
                    {testimonial.product}
                  </div>
                  <div className="text-xs text-[color:var(--text-tertiary)]">
                    {testimonial.date}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[color:var(--gold)] via-[color:var(--blue)] to-[color:var(--gold)] transition-all duration-500 group-hover:w-full"></div>
              </div>
            </div>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-12 text-center">
            <div className="text-5xl">🔍</div>
            <div className="mt-4 text-lg font-bold text-[color:var(--text-primary)]">
              No testimonials found
            </div>
            <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
              Try selecting a different product category
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--surface)] to-[color:var(--surface-2)] p-10 text-center shadow-2xl">
          <div className="text-4xl">⭐</div>
          <div className="mt-4 text-2xl font-bold text-[color:var(--text-primary)]">
            Join thousands of satisfied customers
          </div>
          <div className="mt-3 text-sm text-[color:var(--text-secondary)]">
            Get your personalized quote in under 2 minutes
          </div>
          <a
            href="/quote-center"
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--gold)] px-8 text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-xl"
          >
            Get My Quote
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </PageShell>
  );
}
