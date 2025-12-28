"use client";

import { PageShell } from "@/components/PageShell";
import { useState } from "react";

const categories = [
  { id: "all", label: "All Topics", icon: "📚" },
  { id: "general", label: "General", icon: "ℹ️" },
  { id: "products", label: "Products", icon: "🛡️" },
  { id: "quotes", label: "Quotes & Pricing", icon: "💰" },
  { id: "claims", label: "Claims", icon: "📋" },
  { id: "account", label: "Account", icon: "👤" },
];

const faqs = [
  {
    category: "general",
    q: "How does Life Evolutions X work?",
    a: "We combine intelligent tools with human expertise to help you find, compare, and purchase insurance. Get instant quotes, talk to licensed agents, and manage everything through your secure portal.",
  },
  {
    category: "general",
    q: "Is Life Evolutions X an insurance company?",
    a: "We're an insurance marketplace and technology platform. We partner with A-rated carriers to offer you the best coverage options. You get choice, transparency, and expert guidance all in one place.",
  },
  {
    category: "products",
    q: "What types of insurance do you offer?",
    a: "We offer Life, Health, Auto, Home, and Business insurance. Each product has multiple coverage options and carriers to choose from, ensuring you find the perfect fit for your needs and budget.",
  },
  {
    category: "products",
    q: "Can I bundle multiple insurance policies?",
    a: "Yes! Bundling policies (like auto + home) often results in significant discounts. Our platform automatically identifies bundling opportunities and shows you potential savings.",
  },
  {
    category: "quotes",
    q: "How long does it take to get a quote?",
    a: "Our intelligent quote tool provides instant estimates in under 2 minutes. For more accurate quotes requiring underwriting, expect 24-48 hours for most products.",
  },
  {
    category: "quotes",
    q: "Can I save my quote and finish later?",
    a: "Absolutely! Create a free account and your quote progress is automatically saved. Return anytime to review, modify, or complete your application.",
  },
  {
    category: "quotes",
    q: "Do I need to provide payment information to get a quote?",
    a: "No! Quotes are completely free with no payment required. You only provide payment details when you're ready to purchase a policy.",
  },
  {
    category: "quotes",
    q: "How accurate are the instant quotes?",
    a: "Instant quotes are estimates based on the information provided. Final premiums may vary slightly after underwriting review, but we strive for 95%+ accuracy.",
  },
  {
    category: "claims",
    q: "How do I file a claim?",
    a: "File claims directly through your customer portal or call our 24/7 claims hotline. We'll guide you through the process and advocate on your behalf with the carrier.",
  },
  {
    category: "claims",
    q: "How long does claim processing take?",
    a: "Timeline varies by claim type and carrier. Simple claims may process in 3-5 days, while complex claims can take 4-6 weeks. We provide real-time status updates throughout.",
  },
  {
    category: "account",
    q: "How do I access my policy documents?",
    a: "All policy documents are available 24/7 in your customer portal. You can view, download, or print them anytime. We also email copies when policies are issued or updated.",
  },
  {
    category: "account",
    q: "Can I make changes to my policy online?",
    a: "Yes! Many changes (address updates, payment methods, beneficiaries) can be made directly in your portal. For coverage changes, you may need agent assistance.",
  },
  {
    category: "account",
    q: "What payment methods do you accept?",
    a: "We accept credit/debit cards, ACH bank transfers, and PayPal. Auto-pay is available for all payment methods with discounts for annual payments.",
  },
  {
    category: "general",
    q: "Is my personal information secure?",
    a: "Yes! We use bank-level encryption (256-bit SSL), are SOC 2 compliant, and never sell your data. Your information is only shared with carriers you choose to get quotes from.",
  },
  {
    category: "general",
    q: "Can I talk to a real person?",
    a: "Absolutely! Licensed agents are available via phone, chat, or video call. Schedule appointments or connect instantly during business hours. We believe in human + technology, working together.",
  },
];

export default function FaqsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageShell
      eyebrow="FAQs"
      title="Answers, instantly."
      description="Search our knowledge base or ask questions using voice. Get the information you need, when you need it."
      primaryCta={{ href: "/quote-center", label: "Get My Quote" }}
      secondaryCta={{ href: "/talk-with-an-agent", label: "Talk With an Agent" }}
    >
      <div className="space-y-8">
        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] pl-12 pr-4 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                  placeholder="Search questions..."
                />
                <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-8 w-px bg-[color:var(--border)]"></div>
              <button className="group flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-2 text-sm font-semibold text-[color:var(--text-primary)] transition-all hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)]/10">
                <svg className="h-5 w-5 text-[color:var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span>Voice Search</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-xs text-[color:var(--text-tertiary)]">
            🎤 Voice search enabled - Click to ask questions naturally
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-[color:var(--ink)] shadow-lg"
                  : "border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-primary)] hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface-2)]"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-12 text-center">
              <div className="text-5xl">🔍</div>
              <div className="mt-4 text-lg font-bold text-[color:var(--text-primary)]">
                No results found
              </div>
              <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
                Try adjusting your search or browse by category
              </div>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] transition-all hover:shadow-lg"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-start justify-between gap-4 p-6 text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {categories.find((c) => c.id === faq.category)?.icon}
                      </span>
                      <div className="text-sm font-bold text-[color:var(--text-primary)]">
                        {faq.q}
                      </div>
                    </div>
                  </div>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-[color:var(--text-tertiary)] transition-transform ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === idx && (
                  <div className="border-t border-[color:var(--border)] bg-[color:var(--surface-2)] p-6">
                    <div className="text-sm leading-6 text-[color:var(--text-secondary)]">
                      {faq.a}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="rounded-3xl border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--surface)] to-[color:var(--surface-2)] p-8 text-center shadow-2xl">
          <div className="text-3xl">💡</div>
          <div className="mt-4 text-xl font-bold text-[color:var(--text-primary)]">
            Still have questions?
          </div>
          <div className="mt-2 text-sm text-[color:var(--text-secondary)]">
            Our team is here to help. Talk to a licensed agent or schedule a consultation.
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="/talk-with-an-agent"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--gold)] px-8 text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-xl"
            >
              Talk With an Agent
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-[color:var(--gold)] bg-transparent px-8 text-sm font-semibold text-[color:var(--text-primary)] transition-all hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
