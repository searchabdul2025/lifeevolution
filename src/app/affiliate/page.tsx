"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Award, TrendingUp, Users, DollarSign, Link, Download, LogOut, Share2, BarChart3, FileText, Copy, CheckCircle } from "lucide-react";

type Tab = "dashboard" | "referrals" | "analytics" | "marketing";

export default function AffiliatePortal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [affiliateEmail, setAffiliateEmail] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const authenticated = localStorage.getItem("affiliateAuthenticated");
    const email = localStorage.getItem("affiliateEmail");
    
    if (authenticated === "true" && email) {
      setIsAuthenticated(true);
      setAffiliateEmail(email);
    } else {
      router.push("/affiliate/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("affiliateAuthenticated");
    localStorage.removeItem("affiliateEmail");
    router.push("/affiliate/login");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50  flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // TODO: Fetch from Supabase
  const [referralLink, setReferralLink] = useState("https://lifeevox.com/ref/AFFILIATE2024");
  const [referrals, setReferrals] = useState<any[]>([]);
  const [marketingAssets, setMarketingAssets] = useState<any[]>([]);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "referrals", label: "Referral Tracking", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "marketing", label: "Marketing Toolkit", icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Life Evolutions X</div>
                <div className="text-xs text-gray-500">Affiliate Portal</div>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white uppercase">
                  {affiliateEmail.substring(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-900">{affiliateEmail.split('@')[0]}</div>
                  <div className="text-xs text-gray-500">Affiliate</div>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition-all hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
            <p className="mt-1 text-sm text-gray-700">
              {activeTab === "dashboard" && "Overview of your affiliate performance"}
              {activeTab === "referrals" && "Track your referrals and conversions"}
              {activeTab === "analytics" && "Detailed analytics and insights"}
              {activeTab === "marketing" && "Access marketing materials and tools"}
            </p>
          </div>

          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                  <Users className="h-8 w-8 text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{referrals.length}</div>
                  <div className="text-sm text-gray-500">Total Referrals</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                  <CheckCircle className="h-8 w-8 text-blue-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{referrals.filter(r => r.status === "Converted").length}</div>
                  <div className="text-sm text-gray-500">Conversions</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                  <DollarSign className="h-8 w-8 text-purple-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">$475</div>
                  <div className="text-sm text-gray-500">Total Earnings</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                  <TrendingUp className="h-8 w-8 text-orange-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">75%</div>
                  <div className="text-sm text-gray-500">Conversion Rate</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Link className="h-6 w-6 text-green-600" />
                  <h2 className="text-lg font-bold text-gray-900">Your Referral Link</h2>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 rounded-xl border border-gray-200 bg-white  px-4 py-3 text-sm font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(referralLink)}
                    className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-green-700"
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">Recent Referrals</h2>
                  <div className="space-y-3">
                    {referrals.slice(0, 3).map((referral) => (
                      <div key={referral.id} className="rounded-xl border border-gray-200 bg-gray-50  p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm font-bold text-gray-900">{referral.name}</div>
                            <div className="mt-1 text-xs text-gray-500">{referral.product}</div>
                            <div className="mt-2 text-sm font-semibold text-green-600">{referral.commission}</div>
                          </div>
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            referral.status === "Converted" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}>
                            {referral.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">Earnings Chart</h2>
                  <div className="flex h-48 items-end justify-around gap-2">
                    {[45, 62, 78, 85, 92, 88].map((height, idx) => (
                      <div key={idx} className="group relative flex-1">
                        <div
                          className="rounded-t-lg bg-gradient-to-t from-green-600  transition-all hover:opacity-80"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white group-hover:block">
                          ${(height * 10).toFixed(0)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-around text-xs text-gray-500">
                    {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
                      <div key={month}>{month}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "referrals" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">All Referrals</h2>
                  <button className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-green-700">
                    Export Data
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Commission</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referrals.map((referral) => (
                        <tr key={referral.id} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                          <td className="py-4 text-sm font-semibold text-gray-900">{referral.id}</td>
                          <td className="py-4 text-sm text-gray-900">{referral.name}</td>
                          <td className="py-4 text-sm text-gray-700">{referral.email}</td>
                          <td className="py-4 text-sm text-gray-700">{referral.product}</td>
                          <td className="py-4 text-sm text-gray-500">{referral.date}</td>
                          <td className="py-4 text-sm font-bold text-green-600">{referral.commission}</td>
                          <td className="py-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                              referral.status === "Converted" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                              "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}>
                              {referral.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                  <BarChart3 className="h-8 w-8 text-blue-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">1,234</div>
                  <div className="text-sm text-gray-500">Total Clicks</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                  <Users className="h-8 w-8 text-purple-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">892</div>
                  <div className="text-sm text-gray-500">Unique Visitors</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                  <TrendingUp className="h-8 w-8 text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">3.2%</div>
                  <div className="text-sm text-gray-500">Click-Through Rate</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Traffic Sources</h2>
                <div className="space-y-3">
                  {[
                    { source: "Social Media", visits: 456, percentage: 37 },
                    { source: "Email Campaign", visits: 312, percentage: 25 },
                    { source: "Direct Link", visits: 289, percentage: 23 },
                    { source: "Blog Posts", visits: 177, percentage: 15 },
                  ].map((item) => (
                    <div key={item.source}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-900">{item.source}</span>
                        <span className="text-gray-500">{item.visits} visits</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200 ">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-green-600 "
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Top Performing Products</h2>
                <div className="space-y-3">
                  {[
                    { product: "Life Insurance", conversions: 12, revenue: "$3,000" },
                    { product: "Home Insurance", conversions: 8, revenue: "$2,400" },
                    { product: "Auto Insurance", conversions: 6, revenue: "$1,200" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50  p-4">
                      <div>
                        <div className="text-sm font-bold text-gray-900">{item.product}</div>
                        <div className="text-xs text-gray-500">{item.conversions} conversions</div>
                      </div>
                      <div className="text-sm font-bold text-green-600">{item.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "marketing" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Shareable Links</h2>
                <div className="space-y-3">
                  {[
                    { name: "Main Referral Link", url: referralLink },
                    { name: "Life Insurance Campaign", url: "https://lifeevox.com/ref/AFFILIATE2024/life" },
                    { name: "Auto Insurance Campaign", url: "https://lifeevox.com/ref/AFFILIATE2024/auto" },
                  ].map((link, idx) => (
                    <div key={idx} className="flex gap-3">
                      <input
                        type="text"
                        value={link.url}
                        readOnly
                        className="flex-1 rounded-xl border border-gray-200 bg-white  px-4 py-3 text-sm font-mono"
                      />
                      <button
                        onClick={() => copyToClipboard(link.url)}
                        className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-green-700"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Marketing Assets</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {marketingAssets.map((asset, idx) => (
                    <div key={idx} className="rounded-xl border border-gray-200 bg-gray-50  p-4">
                      <div className="flex items-start justify-between mb-3">
                        <FileText className="h-8 w-8 text-green-600" />
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          {asset.type}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-gray-900 mb-1">{asset.name}</div>
                      <div className="text-xs text-gray-500 mb-3">{asset.size} • {asset.downloads} downloads</div>
                      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-green-700">
                        <Download className="h-3 w-3" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white  p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Social Media Templates</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { platform: "Facebook", template: "Protect your family's future with Life Evolutions X! Get a quote today: [YOUR_LINK]" },
                    { platform: "Twitter", template: "Looking for reliable insurance? Check out Life Evolutions X! [YOUR_LINK] #Insurance #Protection" },
                    { platform: "LinkedIn", template: "Professional insurance solutions for your peace of mind. Learn more: [YOUR_LINK]" },
                    { platform: "Instagram", template: "Your family deserves the best protection. 🛡️ Get started with Life Evolutions X! Link in bio." },
                  ].map((social, idx) => (
                    <div key={idx} className="rounded-xl border border-gray-200 bg-gray-50  p-4">
                      <div className="mb-2 text-sm font-bold text-gray-900">{social.platform}</div>
                      <p className="text-xs text-gray-700 mb-3">{social.template}</p>
                      <button
                        onClick={() => copyToClipboard(social.template.replace('[YOUR_LINK]', referralLink))}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-900 transition-all hover:border-green-600"
                      >
                        <Copy className="h-3 w-3" />
                        Copy Template
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

