"use client";

import { PageShell } from "@/components/PageShell";
import { useState } from "react";

const jobs = [
  {
    title: "Senior Insurance Agent",
    department: "Sales",
    location: "Remote",
    type: "Full-time",
    description: "Guide clients through insurance decisions with expertise and care. Build lasting relationships while helping families protect what matters most.",
    requirements: ["5+ years insurance sales", "Active state license", "Excellent communication", "CRM experience"],
  },
  {
    title: "Customer Success Specialist",
    department: "Support",
    location: "New York, NY",
    type: "Full-time",
    description: "Be the hero for our customers. Help with policy questions, payment issues, and ensure every interaction leaves them feeling valued.",
    requirements: ["2+ years customer service", "Insurance knowledge preferred", "Problem-solving skills", "Empathy and patience"],
  },
  {
    title: "Full-Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build the platform that's modernizing insurance. Work with React, Next.js, and modern tech to create delightful user experiences.",
    requirements: ["3+ years full-stack dev", "React/Next.js expertise", "API design experience", "Startup mindset"],
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design experiences that make insurance feel human. Create interfaces that are both beautiful and intuitive.",
    requirements: ["4+ years product design", "Figma mastery", "User research skills", "Portfolio required"],
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Hybrid",
    type: "Full-time",
    description: "Tell our story and grow our brand. Lead campaigns that connect with people who need better insurance options.",
    requirements: ["5+ years marketing", "Digital marketing expertise", "Content strategy", "Data-driven mindset"],
  },
  {
    title: "Data Analyst",
    department: "Analytics",
    location: "Remote",
    type: "Full-time",
    description: "Turn data into insights that drive better decisions. Help us understand our customers and optimize our platform.",
    requirements: ["3+ years analytics", "SQL & Python", "Data visualization", "Business acumen"],
  },
];

export default function CareersPage() {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleApply = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setShowApplicationForm(true);
  };

  return (
    <PageShell
      eyebrow="Careers"
      title="Build the future of care-led coverage."
      description="Join a team that's making insurance simple, transparent, and human. We're hiring passionate people who want to make a difference."
      primaryCta={{ href: "/contact", label: "Contact Us" }}
      secondaryCta={{ href: "/about", label: "About Us" }}
    >
      <div className="space-y-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: "🚀", title: "Fast Growth", description: "Join a rapidly scaling startup with huge potential" },
            { icon: "💰", title: "Competitive Pay", description: "Top-tier salaries, equity, and comprehensive benefits" },
            { icon: "🏠", title: "Remote First", description: "Work from anywhere with flexible hours and unlimited PTO" },
          ].map((benefit) => (
            <div key={benefit.title} className="rounded-3xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-[#1a1f2e]/90 p-6 text-center shadow-lg backdrop-blur-xl">
              <div className="text-5xl">{benefit.icon}</div>
              <div className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{benefit.title}</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{benefit.description}</div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-[#1a1f2e]/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <div className="text-3xl">🎬</div>
            <div className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Life at Life Evolutions X</div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">See what it's like to work with us</div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {["Company Culture", "Day in the Life"].map((video) => (
              <div key={video} className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[color:var(--blue)] to-[color:var(--blue-2)]">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-white">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur mx-auto">
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-sm font-semibold">{video} Video</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">Open Positions</h2>
            <p className="mt-2 text-[color:var(--text-secondary)]">Find your perfect role and apply today</p>
          </div>

          <div className="mt-8 space-y-4">
            {jobs.map((job, idx) => (
              <div
                key={job.title}
                className="group relative overflow-hidden rounded-[28px] border border-gray-300 dark:border-gray-600 bg-white/90 dark:bg-[#1a1f2e]/95 backdrop-blur-xl transition-all duration-500 hover:border-[color:var(--gold)]/70 hover:bg-white dark:hover:bg-[#1a1f2e] hover:shadow-[0_20px_70px_-15px_rgba(255,208,87,0.3)]"
                style={{
                  animation: `float 6s ease-in-out infinite`,
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--gold)]/10 via-transparent to-[color:var(--blue)]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                
                <div className="relative p-6">
                  <div className="grid gap-6 md:grid-cols-12">
                    <div className="md:col-span-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h3>
                        <div className="flex gap-2">
                          <span className="rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#0f1419] px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {job.department}
                          </span>
                          <span className="rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#0f1419] px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {job.location}
                          </span>
                          <span className="rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#0f1419] px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{job.description}</p>
                      <div className="mt-4">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Requirements</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {job.requirements.map((req) => (
                            <div key={req} className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                              <svg className="h-4 w-4 text-[color:var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {req}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-4 md:flex md:items-center md:justify-end">
                      <button
                        onClick={() => handleApply(job.title)}
                        className="h-12 w-full rounded-full bg-[color:var(--gold)] px-8 text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-xl md:w-auto"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showApplicationForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg)] p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[color:var(--text-primary)]">Apply for {selectedJob}</h3>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] transition hover:bg-[color:var(--surface-2)]"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">First Name *</label>
                    <input className="mt-1 h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">Last Name *</label>
                    <input className="mt-1 h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">Email *</label>
                  <input type="email" className="mt-1 h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">Phone</label>
                  <input type="tel" className="mt-1 h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">LinkedIn Profile</label>
                  <input className="mt-1 h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20" placeholder="https://linkedin.com/in/..." />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">Resume/CV *</label>
                  <div className="mt-1 flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-[color:var(--border)] bg-[color:var(--surface)] transition hover:border-[color:var(--gold)]">
                    <div className="text-center">
                      <svg className="mx-auto h-8 w-8 text-[color:var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <div className="mt-2 text-sm text-[color:var(--text-secondary)]">Click to upload or drag and drop</div>
                      <div className="text-xs text-[color:var(--text-tertiary)]">PDF, DOC, DOCX (max 5MB)</div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">Cover Letter</label>
                  <textarea className="mt-1 min-h-32 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20" placeholder="Tell us why you're a great fit..."></textarea>
                </div>
                <button className="h-12 w-full rounded-full bg-[color:var(--gold)] text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-xl">
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
