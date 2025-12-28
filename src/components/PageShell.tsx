import Link from "next/link";

export function PageShell({
  title,
  eyebrow,
  description,
  primaryCta,
  secondaryCta,
  children,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[color:var(--ink)]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(27,60,255,0.42),transparent_60%)] blur-2xl" />
          <div className="absolute -top-52 right-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,208,87,0.28),transparent_60%)] blur-2xl" />
          <div className="absolute top-40 left-[-160px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(11,75,138,0.32),transparent_60%)] blur-2xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-14">
          {eyebrow ? (
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
              {eyebrow}
            </div>
          ) : null}
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-white/70 md:text-lg">
              {description}
            </p>
          ) : null}

          {primaryCta || secondaryCta ? (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--gold)] px-5 text-sm font-semibold text-[color:var(--ink)] transition hover:opacity-95"
                >
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white/90 transition hover:border-white/35 hover:text-white"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,rgba(7,16,32,0.86),rgba(245,247,251,1))]">
        <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
      </section>
    </main>
  );
}
