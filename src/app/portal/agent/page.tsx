"use client";

import { useState } from "react";

type Tab = "dashboard" | "leads" | "commissions" | "resources" | "calendar";

export default function AgentPortalPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const leads = [
    { id: "L-001", name: "Sarah Johnson", product: "Life Insurance", status: "Hot", value: "$500K", lastContact: "2 hours ago", nextAction: "Follow-up call" },
    { id: "L-002", name: "Michael Chen", product: "Auto Insurance", status: "Warm", value: "$50K", lastContact: "1 day ago", nextAction: "Send quote" },
    { id: "L-003", name: "Emily Rodriguez", product: "Home Insurance", status: "Cold", value: "$350K", lastContact: "1 week ago", nextAction: "Email check-in" },
  ];

  const commissions = [
    { month: "December 2024", policies: 12, revenue: "$45,000", commission: "$4,500", status: "Pending" },
    { month: "November 2024", policies: 15, revenue: "$52,000", commission: "$5,200", status: "Paid" },
    { month: "October 2024", policies: 10, revenue: "$38,000", commission: "$3,800", status: "Paid" },
  ];

  const resources = [
    { name: "Life Insurance Brochure", type: "PDF", size: "2.1 MB", downloads: 45 },
    { name: "Email Template - Follow Up", type: "DOC", size: "156 KB", downloads: 89 },
    { name: "Social Media Graphics Pack", type: "ZIP", size: "12.4 MB", downloads: 23 },
  ];
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "leads", label: "Leads", icon: "🎯" },
    { id: "commissions", label: "Commissions", icon: "💰" },
    { id: "resources", label: "Resources", icon: "📚" },
    { id: "calendar", label: "Calendar", icon: "📅" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1a]">
      <div className="border-b border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] text-xl font-bold text-white">LE</div>
            <div>
              <div className="text-sm font-bold text-[color:var(--text-primary)]">Agent Portal</div>
              <div className="text-xs text-[color:var(--text-tertiary)]">Sarah Johnson - Licensed Agent</div>
            </div>
          </div>
          <button className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--text-primary)] transition-all hover:border-[color:var(--gold)]">
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

        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
                <div className="text-2xl">🎯</div>
                <div className="mt-3 text-3xl font-bold text-[color:var(--text-primary)]">{leads.length}</div>
                <div className="text-sm text-[color:var(--text-tertiary)]">Active Leads</div>
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
                <div className="text-2xl">📄</div>
                <div className="mt-3 text-3xl font-bold text-[color:var(--text-primary)]">37</div>
                <div className="text-sm text-[color:var(--text-tertiary)]">Policies Sold (MTD)</div>
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
                <div className="text-2xl">💰</div>
                <div className="mt-3 text-3xl font-bold text-[color:var(--text-primary)]">$13.5K</div>
                <div className="text-sm text-[color:var(--text-tertiary)]">Commission (MTD)</div>
              </div>
              <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
                <div className="text-2xl">📈</div>
                <div className="mt-3 text-3xl font-bold text-[color:var(--text-primary)]">92%</div>
                <div className="text-sm text-[color:var(--text-tertiary)]">Conversion Rate</div>
              </div>
            </div>

            <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
              <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Performance Chart</h2>
              <div className="mt-6 flex h-64 items-end justify-around gap-2">
                {[85, 92, 78, 95, 88, 94, 97, 90, 93, 89, 96, 100].map((height, idx) => (
                  <div key={idx} className="group relative flex-1">
                    <div
                      className="rounded-t-lg bg-gradient-to-t from-[color:var(--gold)] to-[color:var(--blue)] transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white group-hover:block">
                      ${(height * 50).toFixed(0)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-around text-xs text-[color:var(--text-tertiary)]">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
                  <div key={month}>{month}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "leads" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[color:var(--text-primary)]">Lead Pipeline</h2>
              <button className="rounded-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--blue)] px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105">
                + Add Lead
              </button>
            </div>
            {leads.map((lead) => (
              <div key={lead.id} className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-bold text-[color:var(--text-primary)]">{lead.name}</div>
                    <div className="mt-1 text-sm text-[color:var(--text-tertiary)]">{lead.id} • {lead.product}</div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    lead.status === "Hot" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                    lead.status === "Warm" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}>
                    {lead.status}
                  </span>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-4">
                  <div>
                    <div className="text-xs text-[color:var(--text-tertiary)]">Value</div>
                    <div className="mt-1 text-sm font-semibold text-[color:var(--text-primary)]">{lead.value}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[color:var(--text-tertiary)]">Last Contact</div>
                    <div className="mt-1 text-sm font-semibold text-[color:var(--text-primary)]">{lead.lastContact}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="text-xs text-[color:var(--text-tertiary)]">Next Action</div>
                    <div className="mt-1 text-sm font-semibold text-[color:var(--text-primary)]">{lead.nextAction}</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-xs font-semibold text-[color:var(--text-primary)] transition-all hover:border-[color:var(--gold)]">Contact</button>
                  <button className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-xs font-semibold text-[color:var(--text-primary)] transition-all hover:border-[color:var(--gold)]">Send Quote</button>
                  <button className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-xs font-semibold text-[color:var(--text-primary)] transition-all hover:border-[color:var(--gold)]">Schedule</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "commissions" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
              <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Commission Summary</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] p-4">
                  <div className="text-xs text-[color:var(--text-tertiary)]">Total Earned (YTD)</div>
                  <div className="mt-2 text-2xl font-bold text-[color:var(--text-primary)]">$54,200</div>
                </div>
                <div className="rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] p-4">
                  <div className="text-xs text-[color:var(--text-tertiary)]">Pending</div>
                  <div className="mt-2 text-2xl font-bold text-[color:var(--text-primary)]">$4,500</div>
                </div>
                <div className="rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] p-4">
                  <div className="text-xs text-[color:var(--text-tertiary)]">Avg Commission</div>
                  <div className="mt-2 text-2xl font-bold text-[color:var(--text-primary)]">$4,518</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
              <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Commission History</h2>
              <div className="mt-4 space-y-3">
                {commissions.map((comm, idx) => (
                  <div key={idx} className="rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-[color:var(--text-primary)]">{comm.month}</div>
                        <div className="mt-1 text-xs text-[color:var(--text-tertiary)]">{comm.policies} policies • {comm.revenue} revenue</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[color:var(--text-primary)]">{comm.commission}</div>
                        <span className={`text-xs font-semibold ${
                          comm.status === "Paid" ? "text-green-600" : "text-yellow-600"
                        }`}>{comm.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
              <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Marketing Assets</h2>
              <div className="mt-4 space-y-3">
                {resources.map((resource) => (
                  <div key={resource.name} className="flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">📄</div>
                      <div>
                        <div className="text-sm font-semibold text-[color:var(--text-primary)]">{resource.name}</div>
                        <div className="text-xs text-[color:var(--text-tertiary)]">{resource.type} • {resource.size} • {resource.downloads} downloads</div>
                      </div>
                    </div>
                    <button className="rounded-lg bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--blue)] px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
              <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Email Templates</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {["Welcome Email", "Follow-Up", "Quote Reminder", "Policy Renewal"].map((template) => (
                  <button key={template} className="rounded-xl border-2 border-[color:var(--border)] p-4 text-left transition-all hover:border-[color:var(--gold)] hover:shadow-lg">
                    <div className="text-sm font-semibold text-[color:var(--text-primary)]">{template}</div>
                    <div className="mt-1 text-xs text-[color:var(--text-tertiary)]">Click to use template</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "calendar" && (
          <div className="rounded-2xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6">
            <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Upcoming Appointments</h2>
            <div className="mt-6 space-y-3">
              {[
                { time: "10:00 AM", client: "Sarah Johnson", type: "Video Call", topic: "Life Insurance Quote" },
                { time: "2:00 PM", client: "Michael Chen", type: "Phone Call", topic: "Policy Review" },
                { time: "4:30 PM", client: "Emily Rodriguez", type: "In Office", topic: "Home Insurance" },
              ].map((appt, idx) => (
                <div key={idx} className="flex items-center gap-4 rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] text-sm font-bold text-white">
                    {appt.time.split(" ")[0]}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[color:var(--text-primary)]">{appt.client}</div>
                    <div className="text-xs text-[color:var(--text-tertiary)]">{appt.type} • {appt.topic}</div>
                  </div>
                  <button className="rounded-lg border border-[color:var(--border)] px-3 py-1 text-xs font-semibold text-[color:var(--text-primary)] transition-all hover:border-[color:var(--gold)]">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
