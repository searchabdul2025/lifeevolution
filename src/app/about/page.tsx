"use client";

import { PageShell } from "@/components/PageShell";
import Link from "next/link";

const milestones = [
  { year: "2020", title: "Founded", description: "Life Evolutions X launched with a mission to modernize insurance." },
  { year: "2021", title: "Tech Integration", description: "Introduced intelligent quote builder, reducing quote time by 80%." },
  { year: "2022", title: "10K Customers", description: "Reached 10,000 satisfied customers across all product lines." },
  { year: "2023", title: "Portal Launch", description: "Launched secure customer, agent, and affiliate portals." },
  { year: "2024", title: "National Expansion", description: "Expanded coverage to all 50 states with 24/7 support." },
];

const team = [
  {
    name: "Alexandra Martinez",
    role: "CEO & Founder",
    avatar: "AM",
    bio: "15+ years in insurance innovation. Former VP at Fortune 500 insurer.",
    linkedin: "#",
  },
  {
    name: "David Chen",
    role: "Chief Technology Officer",
    avatar: "DC",
    bio: "Technology expert. Previously led engineering at fintech unicorn.",
    linkedin: "#",
  },
  {
    name: "Sarah Johnson",
    role: "Head of Customer Success",
    avatar: "SJ",
    bio: "Passionate about client care. 12 years in customer experience.",
    linkedin: "#",
  },
  {
    name: "Michael Rodriguez",
    role: "VP of Sales & Partnerships",
    avatar: "MR",
    bio: "Built agent networks at top insurance carriers. MBA from Wharton.",
    linkedin: "#",
  },
  {
    name: "Emily Thompson",
    role: "Chief Compliance Officer",
    avatar: "ET",
    bio: "Ensures regulatory excellence. Former state insurance commissioner.",
    linkedin: "#",
  },
  {
    name: "James Park",
    role: "Head of Product",
    avatar: "JP",
    bio: "Product visionary. Designed award-winning insurance platforms.",
    linkedin: "#",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Built on care. Powered by clarity."
      description="Life Evolutions X exists to make protection feel simple, confident, and human — from first quote to long-term coverage."
      primaryCta={{ href: "/schedule-appointment", label: "Schedule Appointment" }}
      secondaryCta={{ href: "/contact", label: "Contact Us" }}
    >
      <div className="space-y-16">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-2xl">
              <div className="text-lg font-bold text-[color:var(--text-primary)]">
                Our Story
              </div>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[color:var(--text-secondary)]">
                <p>
                  Life Evolutions X was born from a simple observation: insurance shouldn't be
                  complicated, confusing, or impersonal. Our founders, frustrated by outdated
                  processes and opaque pricing, set out to build something better.
                </p>
                <p>
                  We combine cutting-edge technology with genuine human care. Our platform
                  delivers instant quotes, transparent comparisons, and expert guidance—all
                  while maintaining the personal touch that insurance decisions deserve.
                </p>
                <p>
                  Today, we serve thousands of families and businesses across the nation,
                  backed by A-rated carriers and a team that truly cares about your protection.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { k: "Mission", v: "Make insurance simple, transparent, and human-centered." },
                  { k: "Vision", v: "Become America's most trusted insurance platform." },
                  { k: "Values", v: "Clarity, speed, trust, and genuine care." },
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
                      {x.k}
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-6 text-[color:var(--text-primary)]">
                      {x.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-2xl">
              <div className="text-lg font-bold text-[color:var(--text-primary)]">
                By the Numbers
              </div>
              <div className="mt-6 grid gap-6">
                {[
                  { value: "50K+", label: "Policies Issued" },
                  { value: "4.9/5", label: "Customer Rating" },
                  { value: "24/7", label: "Support Available" },
                  { value: "50", label: "States Covered" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] text-2xl font-bold text-white">
                      {stat.value.charAt(0)}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[color:var(--text-primary)]">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[color:var(--text-secondary)]">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
              Our Journey
            </div>
            <h2 className="mt-6 text-3xl font-bold text-[color:var(--text-primary)]">
              Milestones & Growth
            </h2>
          </div>

          <div className="relative mt-12">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-[color:var(--gold)] to-[color:var(--blue)]"></div>

            <div className="space-y-12">
              {milestones.map((milestone, idx) => (
                <div
                  key={milestone.year}
                  className={`relative grid gap-8 md:grid-cols-2 ${idx % 2 === 0 ? "" : "md:flex-row-reverse"
                    }`}
                >
                  <div className={idx % 2 === 0 ? "md:text-right" : "md:col-start-2"}>
                    <div className="inline-block rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-lg transition-all hover:shadow-2xl">
                      <div className="text-2xl font-bold text-[color:var(--gold)]">
                        {milestone.year}
                      </div>
                      <div className="mt-2 text-lg font-bold text-[color:var(--text-primary)]">
                        {milestone.title}
                      </div>
                      <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                        {milestone.description}
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-1/2 top-8 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[color:var(--bg)] bg-[color:var(--gold)] shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
              Leadership Team
            </div>
            <h2 className="mt-6 text-3xl font-bold text-[color:var(--text-primary)]">
              Meet the people behind the platform
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, idx) => (
              <div
                key={member.name}
                className="group relative overflow-hidden rounded-[28px] border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl p-6 shadow-xl transition-all duration-500 hover:border-yellow-400 hover:bg-white dark:hover:bg-gray-900 hover:shadow-[0_20px_70px_-15px_rgba(255,208,87,0.5)] hover:scale-[1.05] hover:-translate-y-2"
                style={{
                  animation: `float 6s ease-in-out infinite`,
                  animationDelay: `${idx * 0.2}s`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-blue-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-yellow-400 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-30"></div>
                <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-blue-600 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-25"></div>

                <div className="relative">
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-yellow-400 to-blue-600 p-1 ring-4 ring-white/20 dark:ring-gray-800/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-white dark:bg-gray-900 text-2xl font-bold text-gray-900 dark:text-white">
                      {member.avatar}
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-yellow-500">
                      {member.name}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {member.role}
                    </div>
                    <div className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {member.bio}
                    </div>
                  </div>

                  <Link
                    href={member.linkedin}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 transition-all duration-300 hover:gap-3 hover:text-yellow-500"
                  >
                    <span>Connect on LinkedIn</span>
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </Link>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-yellow-400 via-blue-600 to-yellow-400 transition-all duration-500 group-hover:w-full rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl p-10 text-center shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Join Our Team
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-gray-700 dark:text-gray-200">
            We're always looking for talented individuals who share our passion for
            making insurance better. Explore open positions and help us build the future
            of protection.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/careers"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-yellow-400 px-8 text-sm font-semibold text-gray-900 transition-all hover:scale-105 hover:shadow-xl hover:bg-yellow-500"
            >
              View Open Positions
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-yellow-400 bg-transparent px-8 text-sm font-semibold text-gray-900 dark:text-white transition-all hover:bg-yellow-400 hover:text-gray-900 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
