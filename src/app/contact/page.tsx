"use client";

import { PageShell } from "@/components/PageShell";
import { useState } from "react";

export default function ContactPage() {
  const [department, setDepartment] = useState("sales");

  return (
    <PageShell
      eyebrow="Contact"
      title="Talk to us. We'll guide you."
      description="Reach out via phone, email, or our smart contact form. We're here to help."
      primaryCta={{ href: "/talk-with-an-agent", label: "Talk With an Agent" }}
      secondaryCta={{ href: "/schedule-appointment", label: "Schedule Appointment" }}
    >
      <div className="space-y-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "📞",
              title: "Call Us",
              value: "(855) 123-4567",
              action: "tel:+18551234567",
              description: "Mon-Fri 8am-8pm ET",
            },
            {
              icon: "✉️",
              title: "Email Us",
              value: "hello@lifeevolutionsx.com",
              action: "mailto:hello@lifeevolutionsx.com",
              description: "Response within 24 hours",
            },
            {
              icon: "💬",
              title: "Live Chat",
              value: "Start Chat",
              action: "#",
              description: "Available 24/7",
            },
          ].map((contact) => (
            <a
              key={contact.title}
              href={contact.action}
              className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-center transition-all hover:border-[color:var(--border-hover)] hover:shadow-2xl hover:scale-105"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[color:var(--gold)] opacity-0 blur-2xl transition-opacity group-hover:opacity-10"></div>
              
              <div className="relative">
                <div className="text-5xl">{contact.icon}</div>
                <div className="mt-4 text-sm font-bold uppercase tracking-wider text-[color:var(--text-tertiary)]">
                  {contact.title}
                </div>
                <div className="mt-2 text-lg font-bold text-[color:var(--text-primary)]">
                  {contact.value}
                </div>
                <div className="mt-1 text-xs text-[color:var(--text-secondary)]">
                  {contact.description}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-2xl">
              <div className="text-2xl font-bold text-[color:var(--text-primary)]">
                Send us a message
              </div>
              <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                Choose a department and we'll route your message to the right team
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { id: "sales", label: "Sales", icon: "💼", desc: "New policies & quotes" },
                  { id: "support", label: "Support", icon: "🛟", desc: "Existing customers" },
                  { id: "careers", label: "Careers", icon: "🚀", desc: "Join our team" },
                ].map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setDepartment(dept.id)}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      department === dept.id
                        ? "border-[color:var(--gold)] bg-gradient-to-br from-[color:var(--gold)]/10 to-[color:var(--blue)]/10 shadow-lg"
                        : "border-[color:var(--border)] bg-[color:var(--surface-2)] hover:border-[color:var(--border-hover)]"
                    }`}
                  >
                    <div className="text-2xl">{dept.icon}</div>
                    <div className="mt-2 text-sm font-bold text-[color:var(--text-primary)]">
                      {dept.label}
                    </div>
                    <div className="mt-1 text-xs text-[color:var(--text-tertiary)]">
                      {dept.desc}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                      First Name *
                    </label>
                    <input
                      className="mt-1 h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                      Last Name *
                    </label>
                    <input
                      className="mt-1 h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="mt-1 h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="mt-1 h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[color:var(--text-tertiary)]">
                    Message *
                  </label>
                  <textarea
                    className="mt-1 min-h-32 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] p-4 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                    placeholder="How can we help you today?"
                  />
                </div>

                <button className="h-12 rounded-full bg-[color:var(--gold)] px-8 text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-xl">
                  Send Message
                </button>

                <div className="text-xs text-[color:var(--text-tertiary)]">
                  🔒 Your information is secure and will only be used to respond to your inquiry
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 space-y-6">
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-2xl">
              <div className="text-lg font-bold text-[color:var(--text-primary)]">
                Office Location
              </div>
              <div className="mt-4 space-y-3 text-sm text-[color:var(--text-secondary)]">
                <div className="flex items-start gap-3">
                  <div className="text-xl">📍</div>
                  <div>
                    <div className="font-semibold text-[color:var(--text-primary)]">Address</div>
                    <div>123 Insurance Plaza, Suite 500</div>
                    <div>New York, NY 10001</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-xl">🕐</div>
                  <div>
                    <div className="font-semibold text-[color:var(--text-primary)]">Hours</div>
                    <div>Monday - Friday: 8am - 8pm ET</div>
                    <div>Saturday: 9am - 5pm ET</div>
                    <div>Sunday: Closed</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--surface)] to-[color:var(--surface-2)]">
                <div className="flex h-full items-center justify-center text-center p-6">
                  <div>
                    <div className="text-4xl">🗺️</div>
                    <div className="mt-3 text-sm font-semibold text-[color:var(--text-primary)]">
                      Google Maps Integration
                    </div>
                    <div className="mt-1 text-xs text-[color:var(--text-secondary)]">
                      Embed your location here
                    </div>
                    <div className="mt-3 text-xs text-[color:var(--text-tertiary)]">
                      iframe src="https://maps.google.com/..."
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--surface)] to-[color:var(--surface-2)] p-6 shadow-2xl">
              <div className="text-lg font-bold text-[color:var(--text-primary)]">
                Prefer to meet in person?
              </div>
              <div className="mt-3 text-sm text-[color:var(--text-secondary)]">
                Schedule a consultation at our office or request a home visit from one of our licensed agents.
              </div>
              <a
                href="/schedule-appointment"
                className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[color:var(--text-primary)] px-6 text-sm font-semibold text-[color:var(--bg)] transition-all hover:scale-105"
              >
                Schedule Appointment
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
