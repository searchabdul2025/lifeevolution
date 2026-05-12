"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, FileText, CreditCard, Plus, Download, Users, LogOut, DollarSign, Calendar, CheckCircle, AlertCircle, ClipboardList, Send, LifeBuoy, Settings, Key, Smartphone, User, Bell } from "lucide-react";

type Tab = "dashboard" | "policies" | "quotes" | "payments" | "coverage" | "family" | "support" | "notifications" | "settings" | "profile";

export default function MemberPortal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [autoPayEnabled, setAutoPayEnabled] = useState(true);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    insuranceType: "",
    coverageAmount: "",
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    additionalInfo: ""
  });
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: ""
  });

  // TODO: Fetch from Supabase - All hooks must be at top level
  const [policies, setPolicies] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [familyMembers, setFamilyMembers] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailPolicyUpdates: true,
    smsPaymentReminders: true,
    marketingEmails: false,
    policyRenewalReminders: true,
  });
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const authenticated = localStorage.getItem("memberAuthenticated");
    const email = localStorage.getItem("memberEmail");

    if (authenticated === "true" && email) {
      setIsAuthenticated(true);
      setMemberEmail(email);

      // Load notifications from localStorage
      const memberNotifications = JSON.parse(localStorage.getItem("memberNotifications") || "[]");
      setNotifications(memberNotifications);
    } else {
      router.push("/member/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("memberAuthenticated");
    localStorage.removeItem("memberEmail");
    router.push("/member/login");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quote request submitted successfully! We'll review your request and contact you within 24 hours.");
    setShowQuoteForm(false);
    setQuoteForm({
      insuranceType: "",
      coverageAmount: "",
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      additionalInfo: ""
    });
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Support ticket submitted successfully! Our team will respond within 24 hours.");
    setShowTicketForm(false);
    setTicketForm({
      subject: "",
      category: "",
      priority: "",
      description: ""
    });
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Shield },
    { id: "policies", label: "My Policies", icon: FileText },
    { id: "quotes", label: "Quote Requests", icon: ClipboardList },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "coverage", label: "Add Coverage", icon: Plus },
    { id: "family", label: "Family Members", icon: Users },
    { id: "support", label: "Support Tickets", icon: LifeBuoy },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white p-6 hidden lg:block">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Life Evolutions X</div>
                <div className="text-xs text-gray-500">Member Portal</div>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${activeTab === tab.id
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
                  {memberEmail.substring(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-900">{memberEmail.split('@')[0]}</div>
                  <div className="text-xs text-gray-500">Member</div>
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

        <main className="lg:ml-64 flex-1 p-4 md:p-8 w-full">\r
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
            <p className="mt-1 text-sm text-gray-700">
              {activeTab === "dashboard" && "Overview of your insurance coverage"}
              {activeTab === "policies" && "View and manage your active policies"}
              {activeTab === "quotes" && "Request and track insurance quotes"}
              {activeTab === "payments" && "Manage payments and billing"}
              {activeTab === "coverage" && "Add new insurance coverage"}
              {activeTab === "family" && "Manage family member policies"}
              {activeTab === "support" && "Get help and track support tickets"}
              {activeTab === "notifications" && "View important notifications from your insurance provider"}
              {activeTab === "settings" && "Manage your account and security settings"}
              {activeTab === "profile" && "View and edit your personal information"}
            </p>
          </div>

          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <FileText className="h-8 w-8 text-blue-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{policies.length}</div>
                  <div className="text-sm text-gray-500">Active Policies</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <DollarSign className="h-8 w-8 text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">$360</div>
                  <div className="text-sm text-gray-500">Monthly Premium</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <Shield className="h-8 w-8 text-purple-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">$950K</div>
                  <div className="text-sm text-gray-500">Total Coverage</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <Calendar className="h-8 w-8 text-orange-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">Jan 15</div>
                  <div className="text-sm text-gray-500">Next Payment</div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">Active Policies</h2>
                  <div className="space-y-3">
                    {policies.map((policy) => (
                      <div key={policy.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm font-bold text-gray-900">{policy.type}</div>
                            <div className="mt-1 text-xs text-gray-500">{policy.id}</div>
                            <div className="mt-2 text-sm font-semibold text-blue-600">{policy.coverage}</div>
                          </div>
                          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            {policy.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">Recent Payments</h2>
                  <div className="space-y-3">
                    {transactions.slice(0, 3).map((txn) => (
                      <div key={txn.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">${txn.amount}</div>
                          <div className="text-xs text-gray-500">{txn.date}</div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "policies" && (
            <div className="space-y-6">
              {policies.map((policy) => (
                <div key={policy.id} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{policy.type}</h3>
                      <p className="text-sm text-gray-500">Policy #{policy.id}</p>
                    </div>
                    <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      {policy.status}
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3 mb-6">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="text-xs text-gray-500 mb-1">Coverage Amount</div>
                      <div className="text-lg font-bold text-blue-600">{policy.coverage}</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="text-xs text-gray-500 mb-1">Monthly Premium</div>
                      <div className="text-lg font-bold text-gray-900">{policy.premium}</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4">
                      <div className="text-xs text-gray-500 mb-1">Next Payment</div>
                      <div className="text-lg font-bold text-gray-900">{policy.nextPayment}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:border-blue-600">
                      <Download className="h-4 w-4" />
                      Download Documents ({policy.documents})
                    </button>
                    <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "quotes" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <ClipboardList className="h-8 w-8 text-blue-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{quotes.length}</div>
                  <div className="text-sm text-gray-500">Total Quotes</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{quotes.filter(q => q.status === "Approved").length}</div>
                  <div className="text-sm text-gray-500">Approved</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <AlertCircle className="h-8 w-8 text-yellow-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{quotes.filter(q => q.status.includes("Review") || q.status.includes("Pending")).length}</div>
                  <div className="text-sm text-gray-500">Pending</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Your Quote Requests</h2>
                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Request New Quote
                  </button>
                </div>

                <div className="space-y-3">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{quote.type}</div>
                          <div className="text-xs text-gray-500 mt-1">Quote #{quote.id}</div>
                          <div className="text-xs text-gray-500">Submitted: {quote.submittedDate}</div>
                        </div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${quote.status === "Approved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          quote.status === "Pending Review" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                            "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}>
                          {quote.status}
                        </span>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2 mb-3">
                        <div className="rounded-lg bg-white p-3">
                          <div className="text-xs text-gray-500 mb-1">Coverage Amount</div>
                          <div className="text-sm font-bold text-blue-600">{quote.coverage}</div>
                        </div>
                        <div className="rounded-lg bg-white p-3">
                          <div className="text-xs text-gray-500 mb-1">Estimated Premium</div>
                          <div className="text-sm font-bold text-gray-900">{quote.estimatedPremium}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-900 transition-all hover:border-blue-600">
                          View Details
                        </button>
                        {quote.status === "Approved" && (
                          <button className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-700">
                            Accept & Purchase
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {showQuoteForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                  <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Request Insurance Quote</h2>
                      <button
                        onClick={() => setShowQuoteForm(false)}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleQuoteSubmit} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">Insurance Type *</label>
                          <select
                            required
                            value={quoteForm.insuranceType}
                            onChange={(e) => setQuoteForm({ ...quoteForm, insuranceType: e.target.value })}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          >
                            <option value="">Select type</option>
                            <option value="Life Insurance">Life Insurance</option>
                            <option value="Auto Insurance">Auto Insurance</option>
                            <option value="Home Insurance">Home Insurance</option>
                            <option value="Health Insurance">Health Insurance</option>
                            <option value="Business Insurance">Business Insurance</option>
                            <option value="Disability Insurance">Disability Insurance</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">Coverage Amount *</label>
                          <input
                            type="text"
                            required
                            value={quoteForm.coverageAmount}
                            onChange={(e) => setQuoteForm({ ...quoteForm, coverageAmount: e.target.value })}
                            placeholder="e.g., $500,000"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={quoteForm.fullName}
                            onChange={(e) => setQuoteForm({ ...quoteForm, fullName: e.target.value })}
                            placeholder="Enter your full name"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">Email *</label>
                          <input
                            type="email"
                            required
                            value={quoteForm.email}
                            onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                            placeholder="your@email.com"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={quoteForm.phone}
                            onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                            placeholder="(555) 123-4567"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">Date of Birth *</label>
                          <input
                            type="date"
                            required
                            value={quoteForm.dateOfBirth}
                            onChange={(e) => setQuoteForm({ ...quoteForm, dateOfBirth: e.target.value })}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-900">Address *</label>
                        <input
                          type="text"
                          required
                          value={quoteForm.address}
                          onChange={(e) => setQuoteForm({ ...quoteForm, address: e.target.value })}
                          placeholder="Enter your address"
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-900">Additional Information</label>
                        <textarea
                          rows={4}
                          value={quoteForm.additionalInfo}
                          onChange={(e) => setQuoteForm({ ...quoteForm, additionalInfo: e.target.value })}
                          placeholder="Any additional details or questions..."
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        ></textarea>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowQuoteForm(false)}
                          className="flex-1 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                        >
                          <Send className="h-4 w-4" />
                          Submit Quote Request
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Auto-Pay Settings</h2>
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Automatic Payments</div>
                    <div className="text-xs text-gray-500">Pay your premiums automatically each month</div>
                  </div>
                  <button
                    onClick={() => setAutoPayEnabled(!autoPayEnabled)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${autoPayEnabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${autoPayEnabled ? "translate-x-6" : "translate-x-1"
                        }`}
                    ></span>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Payment Methods</h2>
                  <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                    + Add Method
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">ACH Bank Transfer</div>
                        <div className="text-xs text-gray-500">****1234</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Primary
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">PayPal</div>
                        <div className="text-xs text-gray-500">{memberEmail}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Payment History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Description</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Method</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Amount</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((txn) => (
                        <tr key={txn.id} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                          <td className="py-4 text-sm text-gray-700">{txn.date}</td>
                          <td className="py-4 text-sm text-gray-900">{txn.description}</td>
                          <td className="py-4 text-sm text-gray-700">{txn.method}</td>
                          <td className="py-4 text-sm font-bold text-gray-900">${txn.amount}</td>
                          <td className="py-4">
                            <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              {txn.status}
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

          {activeTab === "coverage" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { type: "Life Insurance", icon: Shield, description: "Protect your family's future", price: "From $50/mo" },
                  { type: "Health Insurance", icon: Plus, description: "Comprehensive health coverage", price: "From $200/mo" },
                  { type: "Auto Insurance", icon: FileText, description: "Vehicle protection plans", price: "From $75/mo" },
                  { type: "Home Insurance", icon: Shield, description: "Protect your property", price: "From $100/mo" },
                  { type: "Business Insurance", icon: FileText, description: "Coverage for your business", price: "From $150/mo" },
                  { type: "Disability Insurance", icon: Shield, description: "Income protection", price: "From $40/mo" },
                ].map((coverage) => (
                  <div key={coverage.type} className="rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg">
                    <coverage.icon className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{coverage.type}</h3>
                    <p className="text-sm text-gray-700 mb-4">{coverage.description}</p>
                    <div className="text-sm font-semibold text-blue-600 mb-4">{coverage.price}</div>
                    <button className="w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                      Get Quote
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "family" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Family Members</h2>
                  <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                    + Add Family Member
                  </button>
                </div>
                <div className="space-y-3">
                  {familyMembers.map((member) => (
                    <div key={member.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-[color:var(--gold)] text-sm font-bold text-white">
                            {member.name.split(" ").map((n: string) => n[0]).join("")}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">{member.name}</div>
                            <div className="text-xs text-gray-500">{member.relation}</div>
                            <div className="mt-1 text-xs text-blue-600">{member.coverage}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-900 transition-all hover:border-blue-600">
                            Edit
                          </button>
                          <button className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white transition-all hover:bg-blue-700">
                            Add Coverage
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-6">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300 mb-2">Quick Apply for Family</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
                  Apply for coverage for your loved ones with pre-filled information from your profile.
                </p>
                <button className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                  Start Application
                </button>
              </div>
            </div>
          )}

          {activeTab === "support" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <LifeBuoy className="h-8 w-8 text-blue-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{tickets.length}</div>
                  <div className="text-sm text-gray-500">Total Tickets</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{tickets.filter(t => t.status === "Resolved").length}</div>
                  <div className="text-sm text-gray-500">Resolved</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <AlertCircle className="h-8 w-8 text-orange-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{tickets.filter(t => t.status === "Open" || t.status === "In Progress").length}</div>
                  <div className="text-sm text-gray-500">Active</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Your Support Tickets</h2>
                  <button
                    onClick={() => setShowTicketForm(true)}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Create Ticket
                  </button>
                </div>

                <div className="space-y-3">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{ticket.subject}</div>
                          <div className="text-xs text-gray-500 mt-1">Ticket #{ticket.id}</div>
                          <div className="text-xs text-gray-500">Created: {ticket.createdDate} • Updated: {ticket.lastUpdate}</div>
                        </div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${ticket.status === "Resolved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          ticket.status === "In Progress" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2 mb-3">
                        <div className="rounded-lg bg-white p-3">
                          <div className="text-xs text-gray-500 mb-1">Category</div>
                          <div className="text-sm font-bold text-gray-900">{ticket.category}</div>
                        </div>
                        <div className="rounded-lg bg-white p-3">
                          <div className="text-xs text-gray-500 mb-1">Priority</div>
                          <div className={`text-sm font-bold ${ticket.priority === "High" ? "text-red-600" :
                            ticket.priority === "Medium" ? "text-orange-600" :
                              "text-blue-600"
                            }`}>{ticket.priority}</div>
                        </div>
                      </div>
                      <button className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-900 transition-all hover:border-blue-600">
                        View Details & Messages
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {showTicketForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                  <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Create Support Ticket</h2>
                      <button
                        onClick={() => setShowTicketForm(false)}
                        className="text-gray-700 hover:text-gray-900"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleTicketSubmit} className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-900">Subject *</label>
                        <input
                          type="text"
                          required
                          value={ticketForm.subject}
                          onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                          placeholder="Brief description of your issue"
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">Category *</label>
                          <select
                            required
                            value={ticketForm.category}
                            onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          >
                            <option value="">Select category</option>
                            <option value="General">General Inquiry</option>
                            <option value="Billing">Billing & Payments</option>
                            <option value="Documents">Documents</option>
                            <option value="Claims">Claims</option>
                            <option value="Technical">Technical Issue</option>
                            <option value="Policy">Policy Question</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">Priority *</label>
                          <select
                            required
                            value={ticketForm.priority}
                            onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                          >
                            <option value="">Select priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-900">Description *</label>
                        <textarea
                          rows={6}
                          required
                          value={ticketForm.description}
                          onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                          placeholder="Please provide detailed information about your issue..."
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        ></textarea>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowTicketForm(false)}
                          className="flex-1 rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                        >
                          <Send className="h-4 w-4" />
                          Submit Ticket
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              {/* Notifications Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-6 w-6 text-blue-600" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                    <p className="text-sm text-gray-500">{notifications.filter((n: any) => !n.read).length} unread</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const updatedNotifications = notifications.map((n: any) => ({ ...n, read: true }));
                    setNotifications(updatedNotifications);
                    localStorage.setItem("memberNotifications", JSON.stringify(updatedNotifications));
                  }}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                >
                  Mark All as Read
                </button>
              </div>

              {/* Notifications List */}
              {notifications.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
                  <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No Notifications</h3>
                  <p className="text-sm text-gray-500">You're all caught up! Check back later for updates.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notification: any) => (
                    <div
                      key={notification.id}
                      className={`rounded-xl border p-4 transition-all ${notification.read
                          ? "border-gray-200 bg-white"
                          : "border-blue-200 bg-blue-50"
                        }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-sm font-bold text-gray-900">{notification.title}</h3>
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${notification.type === "alert" ? "bg-red-100 text-red-700" :
                                notification.type === "warning" ? "bg-yellow-100 text-yellow-700" :
                                  notification.type === "success" ? "bg-green-100 text-green-700" :
                                    "bg-blue-100 text-blue-700"
                              }`}>
                              {notification.type}
                            </span>
                            {!notification.read && (
                              <span className="inline-flex h-2 w-2 rounded-full bg-blue-600"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                          <p className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => {
                                const updatedNotifications = notifications.map((n: any) =>
                                  n.id === notification.id ? { ...n, read: true } : n
                                );
                                setNotifications(updatedNotifications);
                                localStorage.setItem("memberNotifications", JSON.stringify(updatedNotifications));
                              }}
                              className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-50"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() => {
                              const updatedNotifications = notifications.filter((n: any) => n.id !== notification.id);
                              setNotifications(updatedNotifications);
                              localStorage.setItem("memberNotifications", JSON.stringify(updatedNotifications));
                            }}
                            className="rounded-lg border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-600 transition-all hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Account Settings */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Full Name</label>
                    <input type="text" defaultValue="John Doe" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Email Address</label>
                    <input type="email" value={memberEmail} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-gray-900 outline-none cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Phone Number</label>
                    <input type="tel" placeholder="(555) 123-4567" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Date of Birth</label>
                    <input type="date" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                  </div>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Two-Factor Authentication (2FA)</h2>
                    <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${twoFactorEnabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                      {twoFactorEnabled ? "Enabled" : "Disabled"}
                    </span>
                    <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${twoFactorEnabled ? "bg-blue-600" : "bg-gray-300"
                        }`}
                    >
                      <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                        }`}></span>
                    </button>
                  </div>
                </div>

                {twoFactorEnabled ? (
                  <div className="space-y-6">
                    {/* Authenticator App - Enabled State */}
                    <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600">
                          <Smartphone className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">Authenticator App</h3>
                            <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">Active</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-4">Your account is protected with two-factor authentication</p>

                          <div className="flex gap-3">
                            <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50">
                              View Backup Codes
                            </button>
                            <button className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition-all hover:bg-red-50">
                              Disable 2FA
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Backup Codes */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-600">
                          <Key className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">Backup Codes</h3>
                          <p className="text-sm text-gray-600 mt-1">Generate backup codes to access your account if you lose your authenticator device</p>

                          <div className="mt-4">
                            <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50">
                              Generate Backup Codes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Authenticator App - Setup */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                          <Smartphone className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">Authenticator App</h3>
                          <p className="text-sm text-gray-600 mt-1">Use an authenticator app like Google Authenticator or Authy to generate verification codes</p>

                          <div className="mt-4 space-y-4">
                            <div className="rounded-lg border border-gray-200 bg-white p-4">
                              <h4 className="text-sm font-semibold text-gray-900 mb-3">Setup Instructions:</h4>
                              <ol className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">1</span>
                                  <span>Download an authenticator app (Google Authenticator, Authy, Microsoft Authenticator)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">2</span>
                                  <span>Click "Enable 2FA" button below to generate a QR code</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">3</span>
                                  <span>Scan the QR code with your authenticator app</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">4</span>
                                  <span>Enter the 6-digit code from your app to verify</span>
                                </li>
                              </ol>
                            </div>

                            <button className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 flex items-center justify-center gap-2">
                              <Key className="h-4 w-4" />
                              Enable 2FA with Authenticator App
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Backup Codes */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-600">
                          <Key className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">Backup Codes</h3>
                          <p className="text-sm text-gray-600 mt-1">Generate backup codes to access your account if you lose your authenticator device</p>

                          <div className="mt-4">
                            <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50">
                              Generate Backup Codes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Password Change */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Current Password</label>
                    <input type="password" placeholder="Enter current password" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">New Password</label>
                    <input type="password" placeholder="Enter new password" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                  </div>
                  <button className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                    Update Password
                  </button>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Notification Preferences</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <span className="text-sm font-semibold text-gray-900">Email notifications for policy updates</span>
                    <button
                      onClick={() => setNotificationPrefs({ ...notificationPrefs, emailPolicyUpdates: !notificationPrefs.emailPolicyUpdates })}
                      className={`relative h-6 w-11 rounded-full transition-colors ${notificationPrefs.emailPolicyUpdates ? "bg-blue-600" : "bg-gray-400"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${notificationPrefs.emailPolicyUpdates ? "translate-x-5" : "translate-x-0"}`}></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <span className="text-sm font-semibold text-gray-900">SMS alerts for payment reminders</span>
                    <button
                      onClick={() => setNotificationPrefs({ ...notificationPrefs, smsPaymentReminders: !notificationPrefs.smsPaymentReminders })}
                      className={`relative h-6 w-11 rounded-full transition-colors ${notificationPrefs.smsPaymentReminders ? "bg-blue-600" : "bg-gray-400"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${notificationPrefs.smsPaymentReminders ? "translate-x-5" : "translate-x-0"}`}></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <span className="text-sm font-semibold text-gray-900">Marketing emails and promotions</span>
                    <button
                      onClick={() => setNotificationPrefs({ ...notificationPrefs, marketingEmails: !notificationPrefs.marketingEmails })}
                      className={`relative h-6 w-11 rounded-full transition-colors ${notificationPrefs.marketingEmails ? "bg-blue-600" : "bg-gray-400"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${notificationPrefs.marketingEmails ? "translate-x-5" : "translate-x-0"}`}></span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <span className="text-sm font-semibold text-gray-900">Policy renewal reminders</span>
                    <button
                      onClick={() => setNotificationPrefs({ ...notificationPrefs, policyRenewalReminders: !notificationPrefs.policyRenewalReminders })}
                      className={`relative h-6 w-11 rounded-full transition-colors ${notificationPrefs.policyRenewalReminders ? "bg-blue-600" : "bg-gray-400"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${notificationPrefs.policyRenewalReminders ? "translate-x-5" : "translate-x-0"}`}></span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Actions */}
              <div className="flex justify-end gap-3">
                <button className="rounded-full border-2 border-gray-200 bg-transparent px-6 py-2 text-sm font-semibold text-gray-900 transition-all hover:border-blue-600">
                  Cancel
                </button>
                <button className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Profile Information</h2>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-4xl font-bold text-white">
                        {memberEmail.substring(0, 2).toUpperCase()}
                      </div>
                      <button className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700">
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                    <button className="text-sm font-semibold text-blue-600 transition-all hover:text-blue-700">
                      Change Photo
                    </button>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-900">First Name</label>
                        <input type="text" defaultValue="John" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-900">Last Name</label>
                        <input type="text" defaultValue="Doe" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Email Address</label>
                      <input type="email" value={memberEmail} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-gray-900 outline-none cursor-not-allowed" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-900">Phone Number</label>
                        <input type="tel" placeholder="(555) 123-4567" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-900">Date of Birth</label>
                        <input type="date" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Address Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Street Address</label>
                    <input type="text" placeholder="123 Main Street" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">City</label>
                      <input type="text" placeholder="New York" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">State</label>
                      <input type="text" placeholder="NY" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">ZIP Code</label>
                      <input type="text" placeholder="10001" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Actions */}
              <div className="flex justify-end gap-3">
                <button className="rounded-full border-2 border-gray-200 bg-transparent px-6 py-2 text-sm font-semibold text-gray-900 transition-all hover:border-blue-600">
                  Cancel
                </button>
                <button className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

