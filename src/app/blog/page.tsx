"use client";

import { PageShell } from "@/components/PageShell";
import { useState } from "react";

const articles = [
  {
    title: "Life Insurance 101: Everything You Need to Know",
    category: "Insurance Basics",
    excerpt: "A comprehensive guide to understanding life insurance, from term vs. whole life to determining how much coverage you need.",
    author: "Sarah Johnson",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    featured: true,
  },
  {
    title: "5 Ways to Lower Your Auto Insurance Premium",
    category: "Money Saving Tips",
    excerpt: "Discover proven strategies to reduce your car insurance costs without sacrificing coverage quality.",
    author: "Michael Chen",
    date: "Dec 12, 2024",
    readTime: "5 min read",
    featured: false,
  },
  {
    title: "Understanding Health Insurance Deductibles",
    category: "Insurance Basics",
    excerpt: "Learn how deductibles work, when they apply, and how to choose the right deductible for your situation.",
    author: "Dr. Emily Rodriguez",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    featured: true,
  },
  {
    title: "Home Insurance Claims: A Step-by-Step Guide",
    category: "Claims & Support",
    excerpt: "What to do after damage occurs, how to file a claim, and tips for getting your claim approved quickly.",
    author: "David Thompson",
    date: "Dec 8, 2024",
    readTime: "10 min read",
    featured: false,
  },
  {
    title: "Small Business Insurance: What You Really Need",
    category: "Business Insurance",
    excerpt: "Essential coverage types for small businesses, from general liability to cyber insurance.",
    author: "Amanda Foster",
    date: "Dec 5, 2024",
    readTime: "7 min read",
    featured: false,
  },
  {
    title: "The Truth About Pre-Existing Conditions",
    category: "Health Insurance",
    excerpt: "How the ACA protects you, what insurers can and can't do, and your rights as a consumer.",
    author: "Dr. Emily Rodriguez",
    date: "Dec 3, 2024",
    readTime: "6 min read",
    featured: false,
  },
  {
    title: "Bundling Insurance: Is It Worth It?",
    category: "Money Saving Tips",
    excerpt: "The pros and cons of bundling auto and home insurance, plus how much you can actually save.",
    author: "Michael Chen",
    date: "Nov 28, 2024",
    readTime: "5 min read",
    featured: false,
  },
  {
    title: "What Happens If You Drive Without Insurance?",
    category: "Auto Insurance",
    excerpt: "Legal consequences, financial risks, and why even minimum coverage is better than none.",
    author: "Sarah Johnson",
    date: "Nov 25, 2024",
    readTime: "4 min read",
    featured: false,
  },
  {
    title: "Life Insurance for Parents: A Complete Guide",
    category: "Life Insurance",
    excerpt: "How to calculate coverage needs, protect your children's future, and choose the right policy type.",
    author: "David Thompson",
    date: "Nov 22, 2024",
    readTime: "9 min read",
    featured: true,
  },
];

const categories = [
  { id: "all", label: "All Articles" },
  { id: "Insurance Basics", label: "Insurance Basics" },
  { id: "Money Saving Tips", label: "Money Saving Tips" },
  { id: "Claims & Support", label: "Claims & Support" },
  { id: "Business Insurance", label: "Business Insurance" },
  { id: "Health Insurance", label: "Health Insurance" },
  { id: "Auto Insurance", label: "Auto Insurance" },
  { id: "Life Insurance", label: "Life Insurance" },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles = articles.filter(
    (article) => activeCategory === "all" || article.category === activeCategory
  );

  const featuredArticle = articles.find((a) => a.featured);

  const shareArticle = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      });
    }
  };

  return (
    <PageShell
      eyebrow="Blog"
      title="News, tips, and coverage insights."
      description="Stay informed with expert advice, industry updates, and practical tips for all your insurance needs."
      primaryCta={{ href: "/quote-center", label: "Get My Quote" }}
      secondaryCta={{ href: "/products", label: "Explore Products" }}
    >
      <div className="space-y-12">
        {featuredArticle && (
          <div className="overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-gradient-to-br from-[color:var(--surface)] to-[color:var(--surface-2)] shadow-2xl">
            <div className="grid gap-8 p-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)] bg-[color:var(--gold)]/10 px-3 py-1 text-xs font-semibold text-[color:var(--gold)]">
                  ⭐ Featured Article
                </div>
                <h2 className="mt-4 text-3xl font-bold text-[color:var(--text-primary)]">
                  {featuredArticle.title}
                </h2>
                <p className="mt-3 text-[color:var(--text-secondary)]">
                  {featuredArticle.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[color:var(--text-tertiary)]">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] p-0.5">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-[color:var(--bg)] text-xs font-bold">
                        {featuredArticle.author.split(" ").map((n) => n[0]).join("")}
                      </div>
                    </div>
                    <span>{featuredArticle.author}</span>
                  </div>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <div className="mt-6 flex gap-3">
                  <button className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[color:var(--gold)] px-6 text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105">
                    Read Article
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => shareArticle(featuredArticle.title)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full border-2 border-[color:var(--gold)] bg-transparent px-6 text-sm font-semibold text-[color:var(--text-primary)] transition-all hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] hover:scale-105"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                </div>
              </div>
              <div className="md:col-span-5">
                <div className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[color:var(--blue)] to-[color:var(--blue-2)]">
                  <div className="flex h-full items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-5xl">📰</div>
                      <div className="mt-3 text-sm font-semibold">Featured Article Image</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${activeCategory === cat.id
                  ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-[color:var(--ink)] shadow-lg"
                  : "border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-primary)] hover:border-[color:var(--border-hover)] hover:bg-[color:var(--surface-2)]"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article, idx) => (
            <div
              key={article.title}
              className="group relative overflow-hidden rounded-[28px] border-2 border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl transition-all duration-500 hover:border-yellow-400/50 hover:shadow-[0_20px_70px_-15px_rgba(255,208,87,0.3)] hover:scale-[1.02]"
              style={{
                animation: `float 6s ease-in-out infinite`,
                animationDelay: `${idx * 0.1}s`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-yellow-400 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-20"></div>

              <div className="relative p-6">
                <div className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-4xl">📄</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-400">
                    {article.category}
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white transition-colors group-hover:text-yellow-500">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-200">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <button
                    onClick={() => shareArticle(article.title)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-all hover:border-yellow-400 hover:bg-yellow-400/10"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-400 transition-all duration-500 group-hover:w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
