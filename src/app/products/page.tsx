import Link from "next/link";
import { PageShell } from "@/components/PageShell";

const products = [
  {
    title: "Life Insurance",
    href: "/products/life-insurance",
    desc: "Protect your family’s future with coverage that fits your life.",
  },
  {
    title: "Health Insurance",
    href: "/products/health-insurance",
    desc: "Plans that balance cost, care, and confidence.",
  },
  {
    title: "Auto Insurance",
    href: "/products/auto-insurance",
    desc: "Coverage built for modern driving and real-world risk.",
  },
  {
    title: "Home Insurance",
    href: "/products/home-insurance",
    desc: "Safeguard your home, belongings, and peace of mind.",
  },
  {
    title: "Business Insurance",
    href: "/products/business-insurance",
    desc: "Keep your business resilient with tailored protection.",
  },
];

export default function ProductsPage() {
  return (
    <PageShell
      eyebrow="Products"
      title="Coverage, clearly explained."
      description="Explore the categories below, then build a quote in minutes."
      primaryCta={{ href: "/quote-center", label: "Get a Quote" }}
      secondaryCta={{ href: "/talk-with-an-agent", label: "Talk With an Agent" }}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="group rounded-3xl border border-black/5 bg-white p-6 shadow-[0_8px_40px_rgba(7,16,32,0.06)] transition hover:shadow-[0_14px_60px_rgba(7,16,32,0.12)]"
          >
            <div className="text-sm font-semibold text-[color:var(--ink)]">
              {p.title}
            </div>
            <div className="mt-2 text-sm leading-6 text-[color:rgba(7,16,32,0.70)]">
              {p.desc}
            </div>
            <div className="mt-5 text-sm font-semibold text-[color:var(--blue-2)]">
              Explore
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
