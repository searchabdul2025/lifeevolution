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
              className="group relative overflow-hidden rounded-3xl border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl p-6 text-center transition-all hover:border-yellow-400 hover:shadow-2xl hover:scale-105"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-400 opacity-0 blur-2xl transition-opacity group-hover:opacity-10"></div>

              <div className="relative">
                <div className="text-5xl">{contact.icon}</div>
                <div className="mt-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {contact.title}
                </div>
                <div className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                  {contact.value}
                </div>
                <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  {contact.description}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="rounded-3xl border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl p-8 shadow-2xl">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                Send us a message
              </div>
              <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
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
                    className={`rounded-2xl border-2 p-4 text-left transition-all ${department === dept.id
                        ? "border-yellow-400 bg-gradient-to-br from-yellow-400/10 to-blue-500/10 shadow-lg"
                        : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                  >
                    <div className="text-2xl">{dept.icon}</div>
                    <div className="mt-2 text-sm font-bold text-gray-900 dark:text-white">
                      {dept.label}
                    </div>
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                      {dept.desc}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                      First Name *
                    </label>
                    <input
                      className="mt-1 h-11 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 text-sm text-gray-900 dark:text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                      Last Name *
                    </label>
                    <input
                      className="mt-1 h-11 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 text-sm text-gray-900 dark:text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="mt-1 h-11 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 text-sm text-gray-900 dark:text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="mt-1 h-11 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 text-sm text-gray-900 dark:text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    Message *
                  </label>
                  <textarea
                    className="mt-1 min-h-32 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm text-gray-900 dark:text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    placeholder="How can we help you today?"
                  />
                </div>

                <button className="h-12 rounded-full bg-yellow-400 px-8 text-sm font-semibold text-gray-900 transition-all hover:scale-105 hover:shadow-xl hover:bg-yellow-500">
                  Send Message
                </button>

                <div className="text-xs text-gray-600 dark:text-gray-400">
                  🔒 Your information is secure and will only be used to respond to your inquiry
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 space-y-6">
            <div className="rounded-3xl border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl p-6 shadow-2xl">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                Office Location
              </div>
              <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                <div className="flex items-start gap-3">
                  <div className="text-xl">📍</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Address</div>
                    <div>123 Insurance Plaza, Suite 500</div>
                    <div>New York, NY 10001</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-xl">🕐</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Hours</div>
                    <div>Monday - Friday: 8am - 8pm ET</div>
                    <div>Saturday: 9am - 5pm ET</div>
                    <div>Sunday: Closed</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 aspect-video overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                <div className="flex h-full items-center justify-center text-center p-6">
                  <div>
                    <div className="text-4xl">🗺️</div>
                    <div className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
                      Google Maps Integration
                    </div>
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                      Embed your location here
                    </div>
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      iframe src="https://maps.google.com/..."
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl p-6 shadow-2xl">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                Prefer to meet in person?
              </div>
              <div className="mt-3 text-sm text-gray-700 dark:text-gray-200">
                Schedule a consultation at our office or request a home visit from one of our licensed agents.
              </div>
              <a
                href="/schedule-appointment"
                className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-gray-900 dark:bg-white px-6 text-sm font-semibold text-white dark:text-gray-900 transition-all hover:scale-105"
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
