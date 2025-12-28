"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Download, CreditCard, Users, TrendingUp, Briefcase, Mail, MessageSquare, Bell, FileText, Settings, DollarSign, UserCog, Award, Calendar, Send, Smartphone, MessageCircle, LogOut, Upload } from "lucide-react";
import { exportToExcel, exportToCSV } from "@/lib/exportUtils";
import type { User, PaymentTransaction, Affiliate, Career, Notification, Template, UserRole } from "@/types/admin";

type Tab = "dashboard" | "users" | "transactions" | "reports" | "website" | "affiliates" | "careers" | "analytics" | "integrations" | "notifications" | "support" | "templates" | "chatbot" | "settings";

export default function AdminPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState("");

  // TODO: Fetch from Supabase - All useState hooks must be at the top level
  const [stats, setStats] = useState([
    { label: "Total Users", value: "0", change: "0%", trend: "up", icon: "👥" },
    { label: "Active Quotes", value: "0", change: "0%", trend: "up", icon: "📋" },
    { label: "Policies Sold", value: "0", change: "0%", trend: "up", icon: "✅" },
    { label: "Revenue (MTD)", value: "$0", change: "0%", trend: "up", icon: "💰" },
  ]);

  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<any[]>([]);
  const [paymentTransactions, setPaymentTransactions] = useState<PaymentTransaction[]>([]);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [supportTickets, setSupportTickets] = useState<any[]>([]);
  const [chatRequests, setChatRequests] = useState<any[]>([]);
  const [chatbotSettings, setChatbotSettings] = useState({
    enabled: true,
    welcomeMessage: "Hi! I'm here to help you find the right insurance. What brings you here today?",
    responseDelay: 1000,
    autoAssignAgent: true,
  });

  useEffect(() => {
    const authenticated = localStorage.getItem("adminAuthenticated");
    const user = localStorage.getItem("adminUser");

    if (authenticated === "true" && user) {
      setIsAuthenticated(true);
      setAdminUser(user);

      // Load chat requests from localStorage
      const requests = JSON.parse(localStorage.getItem("chatRequests") || "[]");
      setChatRequests(requests);
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "users", label: "User Management" },
    { id: "transactions", label: "Transactions" },
    { id: "reports", label: "Reports" },
    { id: "website", label: "Website Management" },
    { id: "affiliates", label: "Affiliates" },
    { id: "careers", label: "Careers" },
    { id: "analytics", label: "Analytics" },
    { id: "integrations", label: "Integrations" },
    { id: "notifications", label: "Notifications" },
    { id: "support", label: "Support Tickets" },
    { id: "templates", label: "Templates" },
    { id: "chatbot", label: "Chatbot" },
    { id: "settings", label: "Settings" },
  ];

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

  const handleExportData = (data: any[], filename: string, format: 'excel' | 'csv') => {
    if (format === 'excel') {
      exportToExcel(data, filename);
    } else {
      exportToCSV(data, filename);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                LE
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Life Evolutions X</div>
                <div className="text-xs text-gray-500">Admin Panel</div>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex w-full items-center px-4 py-3 text-sm font-bold transition-all rounded-lg ${activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white uppercase">
                  {adminUser.substring(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-900">{adminUser}</div>
                  <div className="text-xs text-gray-500">Administrator</div>
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h1>
              <p className="mt-1 text-sm text-gray-700">
                {activeTab === "dashboard" && "Overview of your platform performance"}
                {activeTab === "users" && "Manage user accounts with role-based access control"}
                {activeTab === "transactions" && "View and manage all payment transactions"}
                {activeTab === "reports" && "Generate and export comprehensive reports"}
                {activeTab === "website" && "Manage website content, pages, and SEO"}
                {activeTab === "affiliates" && "Manage affiliate partners and commissions"}
                {activeTab === "careers" && "Manage job postings and applications"}
                {activeTab === "analytics" && "Detailed analytics and insights"}
                {activeTab === "integrations" && "Configure email, SMS, and WhatsApp APIs"}
                {activeTab === "notifications" && "Manage system notifications and alerts"}
                {activeTab === "support" && "Manage support tickets from members and agents"}
                {activeTab === "templates" && "Create and manage message templates"}
                {activeTab === "chatbot" && "Manage chatbot requests and configure chatbot settings"}
                {activeTab === "settings" && "System configuration and preferences"}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-900 transition-all hover:border-blue-600">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filters
              </button>
              <button className="flex h-10 items-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Entry
              </button>
            </div>
          </div>

          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                {stats.map((stat, idx) => (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
                    style={{ animation: `float 6s ease-in-out infinite`, animationDelay: `${idx * 0.2}s` }}
                  >
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-600 opacity-5 blur-2xl transition-all group-hover:opacity-10"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className="text-3xl">{stat.icon}</div>
                        <div className={`flex items-center gap-1 text-xs font-semibold ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {stat.trend === "up" ? "↑" : "↓"}
                          {stat.change}
                        </div>
                      </div>
                      <div className="mt-4 text-3xl font-bold text-gray-900">{stat.value}</div>
                      <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Recent Users</h2>
                    <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="space-y-3">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                            user.status === "Pending" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                              "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                            }`}>
                            {user.status}
                          </div>
                          <div className="mt-1 text-xs text-gray-500">{user.plan}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Recent Quotes</h2>
                    <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="space-y-3">
                    {recentQuotes.map((quote) => (
                      <div key={quote.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{quote.id}</div>
                            <div className="mt-1 text-xs text-gray-500">{quote.user}</div>
                            <div className="mt-2 text-xs font-semibold text-gray-700">{quote.product}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-gray-900">{quote.amount}</div>
                            <div className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${quote.status === "Approved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                              quote.status === "Pending" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              }`}>
                              {quote.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Revenue Analytics</h2>
                <div className="flex h-64 items-end justify-around gap-2">
                  {[65, 78, 82, 90, 75, 88, 95, 85, 92, 88, 96, 100].map((height, idx) => (
                    <div key={idx} className="group relative flex-1">
                      <div
                        className="rounded-t-lg bg-blue-600 transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white group-hover:block">
                        ${(height * 5).toFixed(0)}K
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-around text-xs text-gray-500">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
                    <div key={month}>{month}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-5">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">👥</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">{recentUsers.length}</div>
                  <div className="text-sm text-gray-500">Total Users</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">👑</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-500">Super Admins</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">🔑</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-500">Admins</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">✏️</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">8</div>
                  <div className="text-sm text-gray-500">Editors</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">👀</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-500">Viewers</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center gap-4">
                  <input
                    type="search"
                    placeholder="Search users..."
                    className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-[color:var(--gold)]/20"
                  />
                  <select className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none">
                    <option>All Roles</option>
                    <option>Super Admin</option>
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Editor</option>
                    <option>Viewer</option>
                  </select>
                  <select className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Inactive</option>
                  </select>
                  <button className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                    + Add User
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">User</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Role</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Joined</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user, idx) => (
                        <tr key={user.id} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                {user.name.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-gray-700">{user.email}</td>
                          <td className="py-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${idx === 0 ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" :
                              idx === 1 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                                idx === 2 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                                  idx === 3 ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" :
                                    "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                              }`}>
                              {idx === 0 ? "Admin" : idx === 1 ? "Manager" : idx === 2 ? "Editor" : idx === 3 ? "Admin" : "Viewer"}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                              user.status === "Pending" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                              }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-gray-500">{user.joined}</td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <button className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-900 transition-all hover:border-blue-600">
                                Edit Role
                              </button>
                              <button className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-900 transition-all hover:border-[color:var(--blue)]">
                                Permissions
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">Showing 1-5 of 12,458 users</div>
                  <div className="flex gap-2">
                    <button className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-semibold text-gray-900 transition-all hover:border-blue-600">
                      Previous
                    </button>
                    <button className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                      1
                    </button>
                    <button className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-semibold text-gray-900 transition-all hover:border-blue-600">
                      2
                    </button>
                    <button className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-semibold text-gray-900 transition-all hover:border-blue-600">
                      3
                    </button>
                    <button className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-semibold text-gray-900 transition-all hover:border-blue-600">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">👁️</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Page Views (30d)</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">⏱️</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">0m 0s</div>
                  <div className="text-sm text-gray-500">Avg. Session</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">📈</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">0%</div>
                  <div className="text-sm text-gray-500">Conversion Rate</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Traffic Sources</h2>
                <div className="space-y-3">
                  {[
                    { source: "Direct", visits: "0", percentage: 0 },
                    { source: "Organic Search", visits: "0", percentage: 0 },
                    { source: "Social Media", visits: "0", percentage: 0 },
                    { source: "Referral", visits: "0", percentage: 0 },
                  ].map((item) => (
                    <div key={item.source}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-semibold text-gray-900">{item.source}</span>
                        <span className="text-gray-500">{item.visits} visits</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {activeTab === "transactions" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">💰</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">$0</div>
                  <div className="text-sm text-gray-500">Total Revenue</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">✅</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Completed</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">⏳</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Pending</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">❌</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Failed</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
                  <button onClick={() => handleExportData(paymentTransactions, 'transactions', 'excel')} className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:border-blue-600">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">User</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Amount</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Method</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentTransactions.map((txn) => (
                        <tr key={txn.id} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                          <td className="py-4 text-sm font-semibold text-gray-900">{txn.id}</td>
                          <td className="py-4 text-sm text-gray-700">{txn.user}</td>
                          <td className="py-4 text-sm font-bold text-gray-900">${txn.amount.toLocaleString()}</td>
                          <td className="py-4 text-sm text-gray-700">{txn.method}</td>
                          <td className="py-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${txn.status === "Completed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                              txn.status === "Pending" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                txn.status === "Failed" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              }`}>
                              {txn.status}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-gray-500">{txn.date}</td>
                          <td className="py-4">
                            <button className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-900 transition-all hover:border-blue-600">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">Generate Report</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Report Type</label>
                      <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option>User Activity Report</option>
                        <option>Financial Report</option>
                        <option>Transaction Report</option>
                        <option>Affiliate Report</option>
                        <option>Analytics Report</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Date Range</label>
                      <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 90 Days</option>
                        <option>This Year</option>
                        <option>Custom Range</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Export Format</label>
                      <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option>Excel (.xlsx)</option>
                        <option>CSV (.csv)</option>
                        <option>PDF (.pdf)</option>
                      </select>
                    </div>
                    <button className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                      Generate & Download Report
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">Recent Reports</h2>
                  <div className="space-y-3">
                    {[
                      { name: "User Activity - Dec 2024", date: "2024-12-22", size: "2.4 MB" },
                      { name: "Financial Report - Q4 2024", date: "2024-12-20", size: "1.8 MB" },
                      { name: "Transaction Report - Nov 2024", date: "2024-12-15", size: "3.2 MB" },
                      { name: "Affiliate Performance - 2024", date: "2024-12-10", size: "1.5 MB" },
                    ].map((report, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{report.name}</div>
                            <div className="text-xs text-gray-500">{report.date} • {report.size}</div>
                          </div>
                        </div>
                        <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-900 transition-all hover:border-blue-600">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "website" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">Pages</h2>
                  <div className="space-y-2">
                    {["Home", "About", "Services", "Products", "FAQs", "Blog", "Careers", "Contact"].map((page) => (
                      <div key={page} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                        <span className="text-sm font-semibold text-gray-900">{page}</span>
                        <div className="flex gap-2">
                          <button className="text-xs font-semibold text-blue-600 hover:underline">Edit</button>
                          <button className="text-xs font-semibold text-[color:var(--blue)] hover:underline">Preview</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">SEO Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Meta Title</label>
                      <input type="text" defaultValue="Life Evolutions X - Insurance Solutions" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Meta Description</label>
                      <textarea rows={3} defaultValue="Comprehensive insurance solutions for life, auto, home, and business." className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none"></textarea>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Keywords</label>
                      <input type="text" defaultValue="insurance, life insurance, auto insurance" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none" />
                    </div>
                    <button className="w-full rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                      Update SEO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "affiliates" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">🤝</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Total Affiliates</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">💰</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">$0</div>
                  <div className="text-sm text-gray-500">Total Earnings</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">👥</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Total Referrals</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">📈</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">0%</div>
                  <div className="text-sm text-gray-500">Avg Commission</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Affiliate Partners</h2>
                  <button onClick={() => handleExportData(affiliates, 'affiliates', 'excel')} className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition-all hover:border-blue-600">
                    <Download className="h-4 w-4" />
                    Export
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Affiliate</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Code</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Commission</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Earnings</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Referrals</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {affiliates.map((aff) => (
                        <tr key={aff.id} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                          <td className="py-4">
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{aff.name}</div>
                              <div className="text-xs text-gray-500">{aff.email}</div>
                            </div>
                          </td>
                          <td className="py-4 text-sm font-mono text-gray-700">{aff.code}</td>
                          <td className="py-4 text-sm font-semibold text-gray-900">{aff.commission}%</td>
                          <td className="py-4 text-sm font-bold text-gray-900">${aff.totalEarnings.toLocaleString()}</td>
                          <td className="py-4 text-sm text-gray-700">{aff.referrals}</td>
                          <td className="py-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${aff.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                              "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                              }`}>
                              {aff.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <button className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-900 transition-all hover:border-blue-600">
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "careers" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">💼</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Open Positions</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">📝</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Total Applicants</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">✅</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm text-gray-500">Hired This Month</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Job Postings</h2>
                  <button className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                    + New Job
                  </button>
                </div>
                <div className="space-y-3">
                  {careers.map((job) => (
                    <div key={job.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                            <div>
                              <div className="text-sm font-bold text-gray-900">{job.title}</div>
                              <div className="mt-1 text-xs text-gray-500">
                                {job.department} • {job.location} • {job.type}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-4">
                            <div className="text-xs text-gray-700">
                              <span className="font-semibold">{job.applicants}</span> applicants
                            </div>
                            <div className="text-xs text-gray-500">Posted: {job.postedDate}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${job.status === "Open" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                            "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                            }`}>
                            {job.status}
                          </span>
                          <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-900 transition-all hover:border-blue-600">
                            Manage
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Email Integration (SMTP)</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">SMTP Host</label>
                      <input type="text" placeholder="smtp.gmail.com" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">SMTP Port</label>
                      <input type="text" placeholder="587" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Username</label>
                      <input type="text" placeholder="your-email@gmail.com" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Password</label>
                      <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none" />
                    </div>
                  </div>
                  <button className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                    Save Email Settings
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">SMS Integration (Twilio)</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Account SID</label>
                    <input type="text" placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Auth Token</label>
                    <input type="password" placeholder="••••••••••••••••••••••••••••••••" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Phone Number</label>
                    <input type="text" placeholder="+1234567890" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none" />
                  </div>
                  <button className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                    Save SMS Settings
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">WhatsApp Business API</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">API Key</label>
                    <input type="password" placeholder="••••••••••••••••••••••••••••••••" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Business Phone Number</label>
                    <input type="text" placeholder="+1234567890" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Webhook URL</label>
                    <input type="text" placeholder="https://yoursite.com/webhook/whatsapp" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none" />
                  </div>
                  <button className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                    Save WhatsApp Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">🔔</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">{notifications.length}</div>
                  <div className="text-sm text-gray-500">Total Notifications</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">📬</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">{notifications.filter(n => !n.read).length}</div>
                  <div className="text-sm text-gray-500">Unread</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">✅</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">{notifications.filter(n => n.type === "success").length}</div>
                  <div className="text-sm text-gray-500">Success</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">⚠️</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">{notifications.filter(n => n.type === "error" || n.type === "warning").length}</div>
                  <div className="text-sm text-gray-500">Alerts</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Recent Notifications</h2>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`rounded-xl border border-gray-200 p-4 ${!notif.read ? "bg-blue-50 dark:bg-blue-900/10" : "bg-gray-50"}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Bell className={`h-5 w-5 ${notif.type === "success" ? "text-green-600" :
                            notif.type === "error" ? "text-red-600" :
                              notif.type === "warning" ? "text-yellow-600" :
                                "text-blue-600"
                            }`} />
                          <div>
                            <div className="text-sm font-bold text-gray-900">{notif.title}</div>
                            <div className="mt-1 text-xs text-gray-700">{notif.message}</div>
                            <div className="mt-2 text-xs text-gray-500">{notif.date}</div>
                          </div>
                        </div>
                        {!notif.read && (
                          <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-900 transition-all hover:border-blue-600">
                            Mark Read
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "support" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">🎫</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">{supportTickets.length}</div>
                  <div className="text-sm text-gray-500">Total Tickets</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">🟡</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">{supportTickets.filter(t => t.status === "Open").length}</div>
                  <div className="text-sm text-gray-500">Open</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">🔵</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">{supportTickets.filter(t => t.status === "In Progress").length}</div>
                  <div className="text-sm text-gray-500">In Progress</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">✅</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">{supportTickets.filter(t => t.status === "Resolved").length}</div>
                  <div className="text-sm text-gray-500">Resolved</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">All Support Tickets</h2>
                  <div className="flex gap-2">
                    <select className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none">
                      <option>All Users</option>
                      <option>Members</option>
                      <option>Agents</option>
                    </select>
                    <select className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none">
                      <option>All Status</option>
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Ticket ID</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">User</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Type</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Subject</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Category</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Priority</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Assigned To</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supportTickets.map((ticket) => (
                        <tr key={ticket.id} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                          <td className="py-4 text-sm font-semibold text-gray-900">{ticket.id}</td>
                          <td className="py-4 text-sm text-gray-900">{ticket.user}</td>
                          <td className="py-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${ticket.userType === "Member" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                              "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                              }`}>
                              {ticket.userType}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-gray-900">{ticket.subject}</td>
                          <td className="py-4 text-sm text-gray-700">{ticket.category}</td>
                          <td className="py-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${ticket.priority === "High" || ticket.priority === "Urgent" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                              ticket.priority === "Medium" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                                "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              }`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${ticket.status === "Resolved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                              ticket.status === "In Progress" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                                "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              }`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-gray-700">{ticket.assignedTo}</td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-900 transition-all hover:border-blue-600">
                                View
                              </button>
                              <button className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white transition-all hover:opacity-90">
                                Assign
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "templates" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">📧</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">{templates.filter(t => t.type === "email").length}</div>
                  <div className="text-sm text-gray-500">Email Templates</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">💬</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">{templates.filter(t => t.type === "sms").length}</div>
                  <div className="text-sm text-gray-500">SMS Templates</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="text-2xl">📱</div>
                  <div className="mt-3 text-2xl font-bold text-gray-900">{templates.filter(t => t.type === "whatsapp").length}</div>
                  <div className="text-sm text-gray-500">WhatsApp Templates</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Message Templates</h2>
                  <button className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                    + New Template
                  </button>
                </div>
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div key={template.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {template.type === "email" && <Mail className="h-5 w-5 text-blue-600" />}
                          {template.type === "sms" && <Smartphone className="h-5 w-5 text-[color:var(--blue)]" />}
                          {template.type === "whatsapp" && <MessageCircle className="h-5 w-5 text-green-600" />}
                          <div className="flex-1">
                            <div className="text-sm font-bold text-gray-900">{template.name}</div>
                            {template.subject && (
                              <div className="mt-1 text-xs font-semibold text-gray-700">Subject: {template.subject}</div>
                            )}
                            <div className="mt-2 text-xs text-gray-500">{template.content}</div>
                            <div className="mt-3 flex items-center gap-3">
                              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${template.type === "email" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" :
                                template.type === "sms" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                                  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                }`}>
                                {template.type.toUpperCase()}
                              </span>
                              <div className="text-xs text-gray-500">Modified: {template.lastModified}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-900 transition-all hover:border-blue-600">
                            Edit
                          </button>
                          <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-red-600 transition-all hover:border-red-500">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Payment Settings */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Payment Settings</h2>

                <div className="grid gap-6 md:grid-cols-2 mb-6">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="text-2xl mb-2">🏦</div>
                    <div className="text-lg font-bold text-gray-900">ACH</div>
                    <div className="text-sm text-gray-500">Bank Transfer</div>
                    <div className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Active</div>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="text-2xl mb-2">🅿️</div>
                    <div className="text-lg font-bold text-gray-900">PayPal</div>
                    <div className="text-sm text-gray-500">Digital Wallet</div>
                    <div className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Active</div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-md font-bold text-gray-900">ACH Configuration</h3>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Routing Number</label>
                      <input type="text" placeholder="Enter routing number" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Account Number</label>
                      <input type="password" placeholder="Enter account number" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Bank Name</label>
                      <input type="text" placeholder="Enter bank name" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Account Type</label>
                      <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option>Checking</option>
                        <option>Savings</option>
                        <option>Business Checking</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <span className="text-sm font-semibold text-gray-900">Enable ACH Payments</span>
                      <button className="relative h-6 w-11 rounded-full bg-blue-600">
                        <span className="absolute top-1 h-4 w-4 translate-x-6 rounded-full bg-white transition-transform"></span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-md font-bold text-gray-900">PayPal Configuration</h3>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Client ID</label>
                      <input type="text" placeholder="Enter PayPal Client ID" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Client Secret</label>
                      <input type="password" placeholder="Enter PayPal Client Secret" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Webhook ID</label>
                      <input type="text" placeholder="Enter Webhook ID" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Environment</label>
                      <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option>Sandbox</option>
                        <option>Production</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <span className="text-sm font-semibold text-gray-900">Enable PayPal Payments</span>
                      <button className="relative h-6 w-11 rounded-full bg-blue-600">
                        <span className="absolute top-1 h-4 w-4 translate-x-6 rounded-full bg-white transition-transform"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Settings */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Email Settings</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-md font-bold text-gray-900">SMTP Configuration</h3>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">SMTP Host</label>
                      <input type="text" placeholder="smtp.gmail.com" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">SMTP Port</label>
                      <input type="number" placeholder="587" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">SMTP Username</label>
                      <input type="email" placeholder="your-email@gmail.com" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">SMTP Password</label>
                      <input type="password" placeholder="Enter SMTP password" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Encryption</label>
                      <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option>TLS</option>
                        <option>SSL</option>
                        <option>None</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-md font-bold text-gray-900">Email Preferences</h3>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">From Name</label>
                      <input type="text" defaultValue="Life Evolutions X" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">From Email</label>
                      <input type="email" defaultValue="noreply@lifeevox.com" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Reply-To Email</label>
                      <input type="email" defaultValue="support@lifeevox.com" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <span className="text-sm font-semibold text-gray-900">Enable Email Notifications</span>
                      <button className="relative h-6 w-11 rounded-full bg-blue-600">
                        <span className="absolute top-1 h-4 w-4 translate-x-6 rounded-full bg-white transition-transform"></span>
                      </button>
                    </div>
                    <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
                      Send Test Email
                    </button>
                  </div>
                </div>
              </div>

              {/* General Settings */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">General Settings</h2>

                {/* Website Logo Upload */}
                <div className="mb-6 p-4 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
                  <label className="mb-3 block text-sm font-semibold text-gray-900">Website Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-gray-200 bg-white">
                      <span className="text-2xl font-bold text-blue-600">LE</span>
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Logo
                      </label>
                      <p className="mt-2 text-xs text-gray-500">
                        Recommended: PNG or SVG, max 2MB, 200x200px
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Site Name</label>
                      <input type="text" defaultValue="Life Evolutions X" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Site Tagline</label>
                      <input type="text" placeholder="Your insurance partner for life" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Support Email</label>
                      <input type="email" defaultValue="support@lifeevox.com" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Support Phone</label>
                      <input type="tel" placeholder="(555) 123-4567" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Company Address</label>
                      <textarea rows={3} placeholder="Enter company address" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"></textarea>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Timezone</label>
                      <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option>UTC-5 (Eastern)</option>
                        <option>UTC-6 (Central)</option>
                        <option>UTC-7 (Mountain)</option>
                        <option>UTC-8 (Pacific)</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Date Format</label>
                      <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Currency</label>
                      <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Language</label>
                      <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Website URL</label>
                      <input type="url" placeholder="https://lifeevox.com" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Security Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Two-Factor Authentication</div>
                      <div className="text-xs text-gray-500">Require 2FA for all admin users</div>
                    </div>
                    <button className="relative h-6 w-11 rounded-full bg-gray-300">
                      <span className="absolute top-1 h-4 w-4 translate-x-1 rounded-full bg-white transition-transform"></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Session Timeout</div>
                      <div className="text-xs text-gray-500">Auto logout after inactivity</div>
                    </div>
                    <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-600">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>Never</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Password Expiry</div>
                      <div className="text-xs text-gray-500">Force password change every</div>
                    </div>
                    <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-600">
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>Never</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Login Attempt Limit</div>
                      <div className="text-xs text-gray-500">Lock account after failed attempts</div>
                    </div>
                    <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-600">
                      <option>3 attempts</option>
                      <option>5 attempts</option>
                      <option>10 attempts</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">SEO Settings</h2>
                <div className="space-y-6">
                  {/* Meta Tags */}
                  <div className="space-y-4">
                    <h3 className="text-md font-bold text-gray-900">Meta Tags</h3>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Meta Title</label>
                      <input
                        type="text"
                        placeholder="Life Evolutions X - Your Insurance Partner"
                        maxLength={60}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      />
                      <p className="mt-1 text-xs text-gray-500">Recommended: 50-60 characters</p>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Meta Description</label>
                      <textarea
                        rows={3}
                        placeholder="Comprehensive insurance solutions for life, health, auto, and home. Get personalized quotes and expert guidance."
                        maxLength={160}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      ></textarea>
                      <p className="mt-1 text-xs text-gray-500">Recommended: 150-160 characters</p>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Meta Keywords</label>
                      <input
                        type="text"
                        placeholder="life insurance, health insurance, auto insurance, home insurance"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      />
                      <p className="mt-1 text-xs text-gray-500">Separate keywords with commas</p>
                    </div>
                  </div>

                  {/* Open Graph / Social Media */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-md font-bold text-gray-900">Open Graph / Social Media</h3>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">OG Title</label>
                      <input
                        type="text"
                        placeholder="Life Evolutions X"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">OG Description</label>
                      <textarea
                        rows={2}
                        placeholder="Your trusted insurance partner for comprehensive coverage solutions"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      ></textarea>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">OG Image URL</label>
                      <input
                        type="url"
                        placeholder="https://lifeevox.com/og-image.jpg"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      />
                      <p className="mt-1 text-xs text-gray-500">Recommended: 1200x630px</p>
                    </div>
                  </div>

                  {/* Technical SEO */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-md font-bold text-gray-900">Technical SEO</h3>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Canonical URL</label>
                      <input
                        type="url"
                        placeholder="https://lifeevox.com"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Robots Meta Tag</label>
                      <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option>index, follow</option>
                        <option>noindex, follow</option>
                        <option>index, nofollow</option>
                        <option>noindex, nofollow</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Sitemap URL</label>
                      <input
                        type="url"
                        placeholder="https://lifeevox.com/sitemap.xml"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      />
                    </div>
                  </div>

                  {/* Analytics & Tracking */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-md font-bold text-gray-900">Analytics & Tracking</h3>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Google Analytics ID</label>
                      <input
                        type="text"
                        placeholder="G-XXXXXXXXXX"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Google Tag Manager ID</label>
                      <input
                        type="text"
                        placeholder="GTM-XXXXXXX"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Facebook Pixel ID</label>
                      <input
                        type="text"
                        placeholder="Enter Facebook Pixel ID"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Google Search Console Verification</label>
                      <input
                        type="text"
                        placeholder="Enter verification code"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      />
                    </div>
                  </div>

                  {/* Schema Markup */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-md font-bold text-gray-900">Schema Markup</h3>
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Enable Organization Schema</div>
                        <div className="text-xs text-gray-500">Add structured data for your organization</div>
                      </div>
                      <button className="relative h-6 w-11 rounded-full bg-blue-600">
                        <span className="absolute top-1 h-4 w-4 translate-x-6 rounded-full bg-white transition-transform"></span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Enable Local Business Schema</div>
                        <div className="text-xs text-gray-500">Add structured data for local SEO</div>
                      </div>
                      <button className="relative h-6 w-11 rounded-full bg-blue-600">
                        <span className="absolute top-1 h-4 w-4 translate-x-6 rounded-full bg-white transition-transform"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Notification Preferences</h2>
                <div className="space-y-3">
                  {[
                    { label: "New user registrations", enabled: true },
                    { label: "Quote submissions", enabled: true },
                    { label: "Policy purchases", enabled: true },
                    { label: "Payment received", enabled: true },
                    { label: "Support ticket created", enabled: true },
                    { label: "System alerts", enabled: false },
                    { label: "Daily reports", enabled: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <span className="text-sm font-semibold text-gray-900">{item.label}</span>
                      <button className={`relative h-6 w-11 rounded-full transition-colors ${item.enabled ? "bg-blue-600" : "bg-gray-300"}`}>
                        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${item.enabled ? "translate-x-6" : "translate-x-1"}`}></span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Actions */}
              <div className="flex justify-end gap-3">
                <button className="rounded-full border-2 border-gray-200 bg-transparent px-6 py-2 text-sm font-semibold text-gray-900 transition-all hover:border-blue-600">
                  Cancel
                </button>
                <button className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">
                  Save All Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              {/* Send Notification Form */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Send Notification to Members</h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Title</label>
                    <input
                      type="text"
                      id="notif-title"
                      placeholder="Notification title"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Message</label>
                    <textarea
                      id="notif-message"
                      rows={4}
                      placeholder="Notification message"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    ></textarea>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Type</label>
                      <select id="notif-type" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option value="info">Info</option>
                        <option value="success">Success</option>
                        <option value="warning">Warning</option>
                        <option value="alert">Alert</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">Priority</label>
                      <select id="notif-priority" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const titleInput = document.getElementById("notif-title") as HTMLInputElement;
                      const messageInput = document.getElementById("notif-message") as HTMLTextAreaElement;
                      const typeInput = document.getElementById("notif-type") as HTMLSelectElement;

                      const notification = {
                        id: `NOTIF-${Date.now()}`,
                        title: titleInput.value || "New Notification",
                        message: messageInput.value || "You have a new notification",
                        type: typeInput.value,
                        priority: "medium",
                        createdAt: new Date().toISOString(),
                        read: false
                      };

                      const existingNotifications = JSON.parse(localStorage.getItem("memberNotifications") || "[]");
                      existingNotifications.push(notification);
                      localStorage.setItem("memberNotifications", JSON.stringify(existingNotifications));

                      titleInput.value = "";
                      messageInput.value = "";
                      alert("Notification sent successfully to all members!");
                    }}
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                  >
                    <Send className="inline h-4 w-4 mr-2" />
                    Send Notification
                  </button>
                </div>
              </div>

              {/* Sent Notifications History */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Sent Notifications</h2>

                <div className="space-y-3">
                  {JSON.parse(localStorage.getItem("memberNotifications") || "[]").length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-500">No notifications sent yet</p>
                    </div>
                  ) : (
                    JSON.parse(localStorage.getItem("memberNotifications") || "[]").map((notification: any) => (
                      <div key={notification.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-bold text-gray-900">{notification.title}</h3>
                              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${notification.type === "alert" ? "bg-red-100 text-red-700" :
                                  notification.type === "warning" ? "bg-yellow-100 text-yellow-700" :
                                    notification.type === "success" ? "bg-green-100 text-green-700" :
                                      "bg-blue-100 text-blue-700"
                                }`}>
                                {notification.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-1">{notification.message}</p>
                            <p className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

