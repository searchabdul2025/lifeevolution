"use client";

import Link from "next/link";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Life Insurance Customer",
    avatar: "SJ",
    quote: "The process was incredibly smooth. They explained everything clearly and I felt confident in my decision.",
    rating: 5,
    product: "Life Insurance",
    videoPlaceholder: true,
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    avatar: "MC",
    quote: "Life Evolutions X helped me find the perfect business insurance package. Their quote tool saved me hours.",
    rating: 5,
    product: "Business Insurance",
    videoPlaceholder: true,
  },
  {
    name: "Emily Rodriguez",
    role: "Young Professional",
    avatar: "ER",
    quote: "I was overwhelmed by insurance options until I found this platform. The agent was patient and helpful.",
    rating: 5,
    product: "Health Insurance",
    videoPlaceholder: true,
  },
];

export function VideoTestimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[color:var(--bg)] to-[color:var(--surface)] py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[color:var(--gold)] opacity-5 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
            Real Stories
          </div>
          <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight text-[color:var(--text-primary)] md:text-5xl">
            Trusted by thousands of families
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[color:var(--text-secondary)]">
            See what our customers have to say about their experience with Life Evolutions X.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.name}
              className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition-all hover:border-[color:var(--border-hover)] hover:shadow-2xl"
              style={{
                animation: `float 6s ease-in-out infinite`,
                animationDelay: `${idx * 0.3}s`,
              }}
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[color:var(--gold)] opacity-5 blur-2xl transition-opacity group-hover:opacity-10"></div>

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

                <div className="mt-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-[color:var(--gold)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="mt-4 text-sm leading-6 text-[color:var(--text-secondary)]">
                  "{testimonial.quote}"
                </blockquote>

                <div className="mt-4 inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-2)] px-3 py-1 text-xs font-semibold text-[color:var(--text-tertiary)]">
                  {testimonial.product}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/testimonials"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--text-primary)] px-8 text-sm font-semibold text-[color:var(--bg)] transition-all hover:scale-105 hover:shadow-xl"
          >
            View All Testimonials
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
