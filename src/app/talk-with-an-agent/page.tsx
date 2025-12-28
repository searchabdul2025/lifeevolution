import { PageShell } from "@/components/PageShell";

export default function TalkWithAnAgentPage() {
  return (
    <PageShell
      eyebrow="Talk With an Agent"
      title="Instant help, the way you want it."
      description="Live chat, video call, and chatbot triage will be wired here."
      primaryCta={{ href: "/schedule-appointment", label: "Schedule Appointment" }}
      secondaryCta={{ href: "/quote-center", label: "Get My Quote" }}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { t: "Live chat", d: "One-click chat (placeholder)." },
          { t: "Video call", d: "Instant video call (placeholder)." },
          { t: "Smart triage", d: "Chatbot handoff flow (placeholder)." },
        ].map((x) => (
          <div
            key={x.t}
            className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_8px_40px_rgba(7,16,32,0.06)]"
          >
            <div className="text-sm font-semibold text-[color:var(--ink)]">{x.t}</div>
            <div className="mt-2 text-sm leading-6 text-[color:rgba(7,16,32,0.70)]">
              {x.d}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
