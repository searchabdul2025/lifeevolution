import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--bg)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <img
            src="/logo.png"
            alt="Life Evolutions X"
            className="h-8 w-auto mb-3"
          />
          <div className="mt-3 text-sm text-[color:var(--text-secondary)]">
            Protection, care, and clarity — designed for modern life.
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
            Company
          </div>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link className="text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]" href="/about">
              About Us
            </Link>
            <Link className="text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]" href="/careers">
              Careers
            </Link>
            <Link className="text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
            Explore
          </div>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link className="text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]" href="/products">
              Products
            </Link>
            <Link className="text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]" href="/services">
              Services
            </Link>
            <Link className="text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]" href="/faqs">
              FAQs
            </Link>
            <Link
              className="text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]"
              href="/testimonials"
            >
              Testimonials
            </Link>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[color:var(--text-tertiary)]">
            Portals
          </div>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link
              className="text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]"
              href="/portal/customer"
            >
              Customer
            </Link>
            <Link className="text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]" href="/portal/agent">
              Agent
            </Link>
            <Link
              className="text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]"
              href="/portal/affiliate"
            >
              Affiliate
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-[color:var(--text-tertiary)] md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Life Evolutions X. All rights reserved.</div>
          <div className="flex gap-4">
            <Link className="transition hover:text-[color:var(--text-primary)]" href="/privacy">
              Privacy
            </Link>
            <Link className="transition hover:text-[color:var(--text-primary)]" href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
