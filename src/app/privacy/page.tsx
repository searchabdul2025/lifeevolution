import { PageShell } from "@/components/PageShell";

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="Placeholder page. We’ll replace this with your official policy text."
    >
      <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_8px_40px_rgba(7,16,32,0.06)]">
        <div className="text-sm leading-7 text-[color:rgba(7,16,32,0.70)]">
          This is placeholder content.
        </div>
      </div>
    </PageShell>
  );
}
