"use client";

import { useEffect, useState } from "react";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[color:var(--bg)]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full blur-3xl transition-transform duration-700"
          style={{
            background: `radial-gradient(circle at 30% 20%, var(--hero-gradient-1), transparent 60%)`,
            transform: `translate(-50%, ${mousePosition.y * 0.5}px)`,
          }}
        />
        <div
          className="absolute -top-52 right-[-180px] h-[680px] w-[680px] rounded-full blur-3xl transition-transform duration-700"
          style={{
            background: `radial-gradient(circle at 30% 20%, var(--hero-gradient-2), transparent 60%)`,
            transform: `translateX(${mousePosition.x * 0.3}px)`,
          }}
        />
        <div
          className="absolute top-48 left-[-220px] h-[620px] w-[620px] rounded-full blur-3xl transition-transform duration-700"
          style={{
            background: `radial-gradient(circle at 30% 20%, var(--hero-gradient-3), transparent 60%)`,
            transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * 0.3}px)`,
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-20 md:grid-cols-12 md:items-center md:py-28">
        <div className="md:col-span-7">
          <div className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)] transition-all hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface-2)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--gold)] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--gold)]"></span>
            </span>
            Protection & care, reimagined
          </div>

          <h1 className="mt-8 text-balance text-5xl font-bold tracking-tight text-[color:var(--text-primary)] md:text-7xl">
            Confidence you can{" "}
            <span className="relative inline-block">
              <span className="relative z-10">feel.</span>
              <span className="absolute -bottom-2 left-0 h-3 w-full bg-[color:var(--gold)] opacity-30 blur-sm"></span>
            </span>
            <br />
            <span className="bg-gradient-to-r from-[color:var(--text-primary)] to-[color:var(--text-secondary)] bg-clip-text text-transparent">
              Coverage you can trust.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-[color:var(--text-secondary)]">
            Life Evolutions X helps you compare options, get guided by experts, and
            protect what matters — with speed, clarity, and care.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="/quote-center"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-[color:var(--gold)] px-8 text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,208,87,0.4)]"
            >
              <span className="relative z-10">Get My Quote</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:animate-[shimmer_2s_infinite] group-hover:opacity-100"></div>
            </a>
            <a
              href="/talk-with-an-agent"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-8 text-sm font-semibold text-[color:var(--text-primary)] transition-all hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface-2)] hover:shadow-lg"
            >
              Talk With an Agent
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="group relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white/80 dark:bg-[#1a1f2e]/90 p-8 shadow-2xl backdrop-blur-2xl transition-all hover:border-[color:var(--border-hover)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.15)]">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[color:var(--gold)] opacity-20 blur-3xl transition-all group-hover:opacity-30"></div>

            <div className="relative">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                Get My Quote
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                A fast estimate — save it, then finish later.
              </div>

              <div className="mt-6 grid gap-4">
                <label className="grid gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Coverage type
                  <select className="h-12 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f1419] px-4 text-gray-900 dark:text-white outline-none transition-all focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)] focus:ring-opacity-20">
                    <option>Life Insurance</option>
                    <option>Health Insurance</option>
                    <option>Auto Insurance</option>
                    <option>Home Insurance</option>
                    <option>Business Insurance</option>
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  ZIP code
                  <input
                    className="h-12 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f1419] px-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-all focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)] focus:ring-opacity-20"
                    placeholder="e.g. 10001"
                    inputMode="numeric"
                  />
                </label>

                <a
                  href="/quote-center"
                  className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--gold)] px-6 text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-lg"
                >
                  Build My Quote →
                </a>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
