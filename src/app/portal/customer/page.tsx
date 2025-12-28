"use client";

import { useState } from "react";

type Tab = "overview" | "policies" | "payments" | "documents" | "family" | "security";

export default function CustomerPortalPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleLogin = () => {
    setShow2FA(true);
  };

  const verify2FA = () => {
    if (twoFACode === "123456") {
      setIsLoggedIn(true);
      setShow2FA(false);
    }
  };

  const policies = [
    { id: "POL-001", type: "Life Insurance", coverage: "$500,000", premium: "$85/mo", status: "Active", nextPayment: "Jan 15, 2025" },
    { id: "POL-002", type: "Auto Insurance", coverage: "Full Coverage", premium: "$120/mo", status: "Active", nextPayment: "Jan 10, 2025" },
    { id: "POL-003", type: "Home Insurance", coverage: "$350,000", premium: "$95/mo", status: "Active", nextPayment: "Jan 20, 2025" },
  ];

  const documents = [
    { name: "Life Insurance Policy Document", date: "Dec 1, 2024", size: "2.4 MB", type: "PDF" },
    { name: "Auto Insurance Certificate", date: "Nov 15, 2024", size: "1.1 MB", type: "PDF" },
    { name: "Home Insurance Declaration", date: "Oct 20, 2024", size: "3.2 MB", type: "PDF" },
  ];

  const transactions = [
    { id: "TXN-001", date: "Dec 15, 2024", description: "Life Insurance Premium", amount: "$85.00", status: "Paid" },
    { id: "TXN-002", date: "Dec 10, 2024", description: "Auto Insurance Premium", amount: "$120.00", status: "Paid" },
    { id: "TXN-003", date: "Nov 15, 2024", description: "Life Insurance Premium", amount: "$85.00", status: "Paid" },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1a] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] text-2xl font-bold text-white">
                LE
              </div>
              <h1 className="mt-6 text-2xl font-bold text-[color:var(--text-primary)]">Customer Portal</h1>
              <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Sign in to manage your policies</p>
            </div>

            {!show2FA ? (
              <div className="mt-8 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">Email</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">Password</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  onClick={handleLogin}
                  className="h-12 w-full rounded-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--blue)] text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
                >
                  Sign In
                </button>
                <div className="text-center text-xs text-[color:var(--text-tertiary)]">
                  Demo: Use any email/password, then enter code: 123456
                </div>
              </div>
            ) : (
              <div className="mt-8 space-y-4">
                <div className="text-center">
                  <div className="text-4xl">🔐</div>
                  <h3 className="mt-4 text-lg font-bold text-[color:var(--text-primary)]">Two-Factor Authentication</h3>
                  <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Enter the 6-digit code from your authenticator app</p>
                </div>
                <input
                  type="text"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value)}
                  maxLength={6}
                  className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-center text-2xl font-bold tracking-widest text-[color:var(--text-primary)] outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                  placeholder="000000"
                />
                <button
                  onClick={verify2FA}
                  className="h-12 w-full rounded-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--blue)] text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
                >
                  Verify
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "policies", label: "Policies", icon: "📄" },
    { id: "payments", label: "Payments", icon: "💳" },
    { id: "documents", label: "Documents", icon: "📁" },
    { id: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1a]">
      <div className="border-b border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] text-xl font-bold text-white">LE</div>
            <div>
              <div className="text-sm font-bold text-[color:var(--text-primary)]">Customer Portal</div>
              <div className="text-xs text-[color:var(--text-tertiary)]">Welcome back, John Doe</div>
            </div>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--text-primary)] transition-all hover:border-[color:var(--gold)]"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--blue)] text-white"
                  : "border border-[color:var(--border)] text-[color:var(--text-secondary)] hover:border-[color:var(--gold)]"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
                <div className="text-2xl">📄</div>
                <div className="mt-3 text-3xl font-bold text-[color:var(--text-primary)]">{policies.length}</div>
                <div className="text-sm text-[color:var(--text-tertiary)]">Active Policies</div>
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
                <div className="text-2xl">💰</div>
                <div className="mt-3 text-3xl font-bold text-[color:var(--text-primary)]">$300</div>
                <div className="text-sm text-[color:var(--text-tertiary)]">Monthly Premium</div>
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
                <div className="text-2xl">📁</div>
                <div className="mt-3 text-3xl font-bold text-[color:var(--text-primary)]">{documents.length}</div>
                <div className="text-sm text-[color:var(--text-tertiary)]">Documents</div>
              </div>
            </div>

            <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
              <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Quick Actions</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Make Payment", icon: "💳", action: () => setActiveTab("payments") },
                  { label: "Download Docs", icon: "📥", action: () => setActiveTab("documents") },
                  { label: "Add Coverage", icon: "➕", action: () => {} },
                  { label: "File Claim", icon: "📋", action: () => {} },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="flex items-center gap-3 rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] p-4 text-left transition-all hover:border-[color:var(--gold)] hover:shadow-lg"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div className="text-sm font-semibold text-[color:var(--text-primary)]">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "policies" && (
          <div className="space-y-4">
            {policies.map((policy) => (
              <div key={policy.id} className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-bold text-[color:var(--text-primary)]">{policy.type}</div>
                    <div className="mt-1 text-sm text-[color:var(--text-tertiary)]">{policy.id}</div>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {policy.status}
                  </span>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <div className="text-xs text-[color:var(--text-tertiary)]">Coverage</div>
                    <div className="mt-1 text-sm font-semibold text-[color:var(--text-primary)]">{policy.coverage}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[color:var(--text-tertiary)]">Premium</div>
                    <div className="mt-1 text-sm font-semibold text-[color:var(--text-primary)]">{policy.premium}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[color:var(--text-tertiary)]">Next Payment</div>
                    <div className="mt-1 text-sm font-semibold text-[color:var(--text-primary)]">{policy.nextPayment}</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-xs font-semibold text-[color:var(--text-primary)] transition-all hover:border-[color:var(--gold)]">View Details</button>
                  <button className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-xs font-semibold text-[color:var(--text-primary)] transition-all hover:border-[color:var(--gold)]">Download PDF</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "payments" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
              <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Make a Payment</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">Select Policy</label>
                  <select className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm outline-none">
                    {policies.map((p) => (
                      <option key={p.id}>{p.type} - {p.premium}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">Payment Method</label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {["💳 Card", "🏦 ACH", "📱 PayPal"].map((method) => (
                      <button key={method} className="rounded-xl border-2 border-[color:var(--border)] p-3 text-sm font-semibold transition-all hover:border-[color:var(--gold)]">
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
                <button className="h-12 w-full rounded-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--blue)] text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                  Pay Now
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
              <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Payment History</h2>
              <div className="mt-4 space-y-3">
                {transactions.map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] p-4">
                    <div>
                      <div className="text-sm font-semibold text-[color:var(--text-primary)]">{txn.description}</div>
                      <div className="text-xs text-[color:var(--text-tertiary)]">{txn.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[color:var(--text-primary)]">{txn.amount}</div>
                      <span className="text-xs font-semibold text-green-600">{txn.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">📄</div>
                  <div>
                    <div className="text-sm font-semibold text-[color:var(--text-primary)]">{doc.name}</div>
                    <div className="text-xs text-[color:var(--text-tertiary)]">{doc.date} • {doc.size}</div>
                  </div>
                </div>
                <button className="rounded-lg bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--blue)] px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105">
                  Download
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "family" && (
          <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
            <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Apply for Family Members</h2>
            <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Your information will be pre-filled to make it easier</p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">Relationship</label>
                <select className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm outline-none">
                  <option>Spouse</option>
                  <option>Child</option>
                  <option>Parent</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">Full Name</label>
                <input type="text" className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm outline-none" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">Date of Birth</label>
                <input type="date" className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm outline-none" />
              </div>
              <button className="h-12 w-full rounded-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--blue)] text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                Start Application
              </button>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
              <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Two-Factor Authentication</h2>
              <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Add an extra layer of security to your account</p>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] p-4">
                <div>
                  <div className="text-sm font-semibold text-[color:var(--text-primary)]">2FA Enabled</div>
                  <div className="text-xs text-[color:var(--text-tertiary)]">Using authenticator app</div>
                </div>
                <div className="flex h-6 w-11 items-center rounded-full bg-[color:var(--gold)]">
                  <span className="h-4 w-4 translate-x-6 rounded-full bg-white transition-transform"></span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
              <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Trusted Devices</h2>
              <div className="mt-4 space-y-3">
                {[
                  { device: "Chrome on Windows", location: "New York, US", lastActive: "Active now" },
                  { device: "Safari on iPhone", location: "New York, US", lastActive: "2 hours ago" },
                ].map((device, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] p-4">
                    <div>
                      <div className="text-sm font-semibold text-[color:var(--text-primary)]">{device.device}</div>
                      <div className="text-xs text-[color:var(--text-tertiary)]">{device.location} • {device.lastActive}</div>
                    </div>
                    <button className="text-xs font-semibold text-red-600 hover:underline">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
