"use client";

import { PageShell } from "@/components/PageShell";
import { useState, useEffect } from "react";

const agents = [
  { id: 1, name: "Sarah Johnson", specialty: "Life & Health Insurance", avatar: "SJ", rating: 4.9 },
  { id: 2, name: "Michael Chen", specialty: "Auto & Home Insurance", avatar: "MC", rating: 5.0 },
  { id: 3, name: "Emily Rodriguez", specialty: "Business Insurance", avatar: "ER", rating: 4.8 },
];

const timeSlots = [
  { date: "Tomorrow", times: ["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"] },
  { date: "Wednesday", times: ["9:00 AM", "11:00 AM", "1:30 PM", "3:00 PM"] },
  { date: "Thursday", times: ["10:00 AM", "12:00 PM", "2:30 PM", "5:00 PM"] },
  { date: "Friday", times: ["9:30 AM", "11:30 AM", "2:00 PM", "4:30 PM"] },
];

export default function ScheduleAppointmentPage() {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [meetingType, setMeetingType] = useState("video");
  const [userTimezone, setUserTimezone] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
  }, []);

  const handleBooking = () => {
    const appointment = {
      id: `APT-${Date.now()}`,
      agent: agents.find(a => a.id === selectedAgent)?.name,
      agentId: selectedAgent,
      date: selectedDate,
      time: selectedTime,
      meetingType,
      timezone: userTimezone,
      customer: formData,
      status: "Scheduled",
      createdAt: new Date().toISOString(),
    };

    const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    existingAppointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(existingAppointments));

    setShowConfirmation(true);
  };

  const addToGoogleCalendar = () => {
    const agent = agents.find(a => a.id === selectedAgent);
    const title = encodeURIComponent(`Insurance Consultation with ${agent?.name}`);
    const details = encodeURIComponent(`${meetingType === "video" ? "Video Call" : meetingType === "phone" ? "Phone Call" : "In Office Meeting"}\n\nAgent: ${agent?.name}\nSpecialty: ${agent?.specialty}`);
    const dates = encodeURIComponent(`${selectedDate}/${selectedTime}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dates}`, "_blank");
  };

  const addToOutlookCalendar = () => {
    const agent = agents.find(a => a.id === selectedAgent);
    const title = encodeURIComponent(`Insurance Consultation with ${agent?.name}`);
    const body = encodeURIComponent(`${meetingType === "video" ? "Video Call" : meetingType === "phone" ? "Phone Call" : "In Office Meeting"}\n\nAgent: ${agent?.name}\nSpecialty: ${agent?.specialty}`);
    window.open(`https://outlook.office.com/calendar/0/deeplink/compose?subject=${title}&body=${body}`, "_blank");
  };

  return (
    <PageShell
      eyebrow="Schedule"
      title="Book a time that works for you."
      description="Schedule a free consultation with one of our licensed agents. Choose video call, phone, or in-person."
      primaryCta={{ href: "/talk-with-an-agent", label: "Talk With an Agent" }}
      secondaryCta={{ href: "/quote-center", label: "Get My Quote" }}
    >
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: "📅", title: "Real-Time Availability", desc: "See open slots instantly" },
            { icon: "🌍", title: "Auto Time Zone", desc: "Times shown in your local zone" },
            { icon: "🔄", title: "Calendar Sync", desc: "Add to Google or Outlook" },
          ].map((feature) => (
            <div key={feature.title} className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 text-center shadow-lg">
              <div className="text-4xl">{feature.icon}</div>
              <div className="mt-3 text-sm font-bold text-[color:var(--text-primary)]">{feature.title}</div>
              <div className="mt-1 text-xs text-[color:var(--text-secondary)]">{feature.desc}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7 space-y-6">
            <div className="rounded-3xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-[color:var(--text-primary)]">Choose Your Agent</h3>
              <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Select a licensed agent based on your needs</p>

              <div className="mt-6 space-y-3">
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent.id)}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${selectedAgent === agent.id
                      ? "border-[color:var(--gold)] bg-gradient-to-br from-[color:var(--gold)]/10 to-[color:var(--blue)]/10 shadow-lg"
                      : "border-[color:var(--border)] bg-[color:var(--surface-2)] hover:border-[color:var(--border-hover)]"
                      }`}
                  >
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] p-0.5">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-[color:var(--bg)] text-sm font-bold text-[color:var(--text-primary)]">
                        {agent.avatar}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-[color:var(--text-primary)]">{agent.name}</div>
                      <div className="text-xs text-[color:var(--text-tertiary)]">{agent.specialty}</div>
                      <div className="mt-1 flex items-center gap-1">
                        <svg className="h-4 w-4 text-[color:var(--gold)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-semibold text-[color:var(--text-primary)]">{agent.rating}</span>
                      </div>
                    </div>
                    {selectedAgent === agent.id && (
                      <svg className="h-6 w-6 text-[color:var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-[color:var(--text-primary)]">Select Date & Time</h3>
              <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                All times shown in {userTimezone || "your local timezone"}
              </p>

              <div className="mt-6 space-y-6">
                {timeSlots.map((slot) => (
                  <div key={slot.date}>
                    <div className="text-sm font-bold text-[color:var(--text-primary)]">{slot.date}</div>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {slot.times.map((time) => (
                        <button
                          key={time}
                          onClick={() => {
                            setSelectedDate(slot.date);
                            setSelectedTime(time);
                          }}
                          className={`h-10 rounded-xl border text-xs font-semibold transition-all ${selectedDate === slot.date && selectedTime === time
                            ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-[color:var(--ink)] shadow-lg"
                            : "border-[color:var(--border)] bg-[color:var(--surface-2)] text-[color:var(--text-primary)] hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface)]"
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-[color:var(--text-primary)]">Meeting Type</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { id: "video", icon: "📹", label: "Video Call" },
                  { id: "phone", icon: "📞", label: "Phone Call" },
                  { id: "office", icon: "🏢", label: "In Office" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setMeetingType(type.id)}
                    className={`rounded-2xl border p-4 text-center transition-all ${meetingType === type.id
                      ? "border-[color:var(--gold)] bg-gradient-to-br from-[color:var(--gold)]/10 to-[color:var(--blue)]/10 shadow-lg"
                      : "border-[color:var(--border)] bg-[color:var(--surface-2)] hover:border-[color:var(--border-hover)]"
                      }`}
                  >
                    <div className="text-3xl">{type.icon}</div>
                    <div className="mt-2 text-xs font-semibold text-[color:var(--text-primary)]">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-[color:var(--text-primary)]">Your Information</h3>
              <p className="mt-2 text-sm text-[color:var(--text-secondary)]">We'll use this to send you confirmation details</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">Additional Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any specific topics you'd like to discuss?"
                    rows={3}
                    className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-3xl border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl p-6 shadow-2xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Appointment Summary</h3>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Agent</div>
                    <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      {selectedAgent ? agents.find(a => a.id === selectedAgent)?.name : "Not selected"}
                    </div>
                  </div>

                  <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Date & Time</div>
                    <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      {selectedDate && selectedTime ? `${selectedDate} at ${selectedTime}` : "Not selected"}
                    </div>
                  </div>

                  <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Meeting Type</div>
                    <div className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                      {meetingType === "video" ? "Video Call" : meetingType === "phone" ? "Phone Call" : "In Office"}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!selectedAgent || !selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone}
                  className="mt-6 h-12 w-full rounded-full bg-yellow-400 text-sm font-semibold text-gray-900 transition-all hover:scale-105 hover:shadow-xl hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Appointment
                </button>

                <div className="mt-4 flex items-center justify-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <button onClick={addToGoogleCalendar} className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add to Google
                  </button>
                  <span>•</span>
                  <button onClick={addToOutlookCalendar} className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add to Outlook
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl p-6 shadow-lg">
                <div className="text-sm font-bold text-gray-900 dark:text-white">What to Expect</div>
                <div className="mt-4 space-y-3">
                  {[
                    "Free 30-minute consultation",
                    "No obligation to purchase",
                    "Personalized recommendations",
                    "Instant quote if ready",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200">
                      <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-md overflow-hidden rounded-3xl border border-[color:var(--gold)]/30 bg-white dark:bg-[#1a1f2e] p-8 shadow-2xl">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[color:var(--gold)] opacity-20 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-[color:var(--blue)] opacity-20 blur-3xl"></div>

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] text-3xl shadow-lg">
                ✓
              </div>
              <h3 className="mt-6 text-center text-2xl font-bold text-[color:var(--text-primary)]">
                Appointment Confirmed!
              </h3>
              <p className="mt-3 text-center text-sm text-[color:var(--text-secondary)]">
                Your appointment with {agents.find(a => a.id === selectedAgent)?.name} has been scheduled for {selectedDate} at {selectedTime}.
              </p>
              <p className="mt-2 text-center text-xs text-[color:var(--text-tertiary)]">
                A confirmation email has been sent to {formData.email}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={addToGoogleCalendar}
                  className="h-12 flex-1 rounded-full border-2 border-[color:var(--gold)] bg-transparent text-sm font-semibold text-[color:var(--text-primary)] transition-all hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] hover:scale-105"
                >
                  📅 Google
                </button>
                <button
                  onClick={addToOutlookCalendar}
                  className="h-12 flex-1 rounded-full border-2 border-[color:var(--gold)] bg-transparent text-sm font-semibold text-[color:var(--text-primary)] transition-all hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] hover:scale-105"
                >
                  📅 Outlook
                </button>
              </div>

              <button
                onClick={() => setShowConfirmation(false)}
                className="mt-4 h-12 w-full rounded-full bg-[color:var(--gold)] text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
