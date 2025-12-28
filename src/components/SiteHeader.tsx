"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors ${active
          ? "text-[color:var(--text-primary)]"
          : "text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
        }`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="group inline-flex items-center">
          <img
            src="/logo.svg"
            alt="Life Evolutions X"
            className="h-8 w-auto md:h-10 transition-transform group-hover:scale-105"
          />
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <NavLink href="/about" label="About" />
          <NavLink href="/products" label="Products" />
          <NavLink href="/services" label="Services" />
          <NavLink href="/quote-center" label="Quote Center" />
          <NavLink href="/blog" label="Blog" />
          <NavLink href="/contact" label="Contact" />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/quote-center"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[color:var(--gold)] px-4 text-sm font-semibold text-[color:var(--ink)] transition hover:scale-105 hover:shadow-lg"
          >
            Get My Quote
          </Link>
          <Link
            href="/talk-with-an-agent"
            className="hidden h-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface-2)] md:inline-flex"
          >
            Talk With an Agent
          </Link>
        </div>
      </div>
    </header>
  );
}
