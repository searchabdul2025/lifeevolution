"use client";

import Link from "next/link";
import { useState } from "react";

const products = [
  {
    title: "Life Insurance",
    href: "/products/life-insurance",
    icon: "🛡️",
    description: "Protect your family's future with comprehensive coverage options.",
    features: ["Term & Whole Life", "Flexible Premiums", "Living Benefits"],
  },
  {
    title: "Health Insurance",
    href: "/products/health-insurance",
    icon: "❤️",
    description: "Quality healthcare coverage that fits your budget and needs.",
    features: ["Individual & Family", "HSA Compatible", "Nationwide Network"],
  },
  {
    title: "Auto Insurance",
    href: "/products/auto-insurance",
    icon: "🚗",
    description: "Drive with confidence knowing you're fully protected.",
    features: ["Collision & Liability", "Roadside Assistance", "Multi-Car Discounts"],
  },
  {
    title: "Home Insurance",
    href: "/products/home-insurance",
    icon: "🏠",
    description: "Safeguard your home and belongings against unexpected events.",
    features: ["Dwelling Coverage", "Personal Property", "Liability Protection"],
  },
  {
    title: "Business Insurance",
    href: "/products/business-insurance",
    icon: "💼",
    description: "Comprehensive protection for your business operations.",
    features: ["General Liability", "Property Coverage", "Workers' Comp"],
  },
];

export function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-[color:var(--bg)] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
            Our Products
          </div>
          <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight text-[color:var(--text-primary)] md:text-5xl">
            Coverage for every stage of life
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[color:var(--text-secondary)]">
            Explore our comprehensive insurance solutions designed to protect what matters most.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product, idx) => (
            <Link
              key={product.title}
              href={product.href}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`group relative overflow-hidden rounded-[28px] border backdrop-blur-xl transition-all duration-500 ${activeIndex === idx
                ? "border-[color:var(--gold)]/50 bg-gradient-to-br from-[color:var(--surface)]/90 via-[color:var(--surface-2)]/80 to-[color:var(--surface)]/70 shadow-[0_20px_70px_-15px_rgba(255,208,87,0.3)] scale-[1.08] -translate-y-2"
                : "border-[color:var(--border)]/50 bg-[color:var(--surface)]/60 hover:border-[color:var(--border-hover)]/70 hover:bg-[color:var(--surface)]/80 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] hover:scale-[1.02] hover:-translate-y-1"
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--gold)]/5 via-transparent to-[color:var(--blue)]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[color:var(--gold)] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-20"></div>
              <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-[color:var(--blue)] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-15"></div>

              <div className="relative p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 text-4xl ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {product.icon}
                </div>

                <div className="mt-5 text-base font-bold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-yellow-500">
                  {product.title}
                </div>

                <div className="mt-2 text-xs leading-5 text-gray-700 dark:text-gray-200">
                  {product.description}
                </div>

                <div className="mt-5 space-y-2">
                  {product.features.map((feature, featureIdx) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-400 transition-all duration-300"
                      style={{
                        transitionDelay: `${featureIdx * 50}ms`,
                      }}
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400/20 ring-1 ring-yellow-400/30 transition-all duration-300 group-hover:bg-yellow-400/30 group-hover:ring-yellow-400/50">
                        <svg className="h-3 w-3 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-yellow-500 transition-all duration-300 group-hover:gap-3">
                  <span>Learn more</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 transition-all duration-500 group-hover:w-full"></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-8 text-sm font-semibold text-[color:var(--text-primary)] transition-all hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface-2)] hover:shadow-lg"
          >
            View All Products
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
