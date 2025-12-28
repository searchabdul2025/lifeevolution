import { PageShell } from "@/components/PageShell";

export default function AffiliatePortalPage() {
  return (
    <PageShell
      eyebrow="Affiliate Portal"
      title="Track referrals and grow together."
      description="Referral links, analytics, and a marketing toolkit will be wired here."
      primaryCta={{ href: "/contact", label: "Partner Support" }}
      secondaryCta={{ href: "/products", label: "Explore Products" }}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { t: "Referrals", d: "Track your leads and conversions." },
          { t: "Analytics", d: "Performance charts and insights." },
          { t: "Toolkit", d: "Shareable links and creative assets." },
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
