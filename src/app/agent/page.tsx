"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Users, TrendingUp, DollarSign, FileText, Download, LogOut, Target, Award, Calendar, CheckCircle, Clock, LifeBuoy, Send, Plus, AlertCircle, Settings, Key, Smartphone } from "lucide-react";

type Tab = "dashboard" | "leads" | "crm" | "commission" | "resources" | "support" | "settings";

export default function AgentPortal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [agentEmail, setAgentEmail] = useState("");
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: ""
  });

  useEffect(() => {
    const authenticated = localStorage.getItem("agentAuthenticated");
    const email = localStorage.getItem("agentEmail");
    
    if (authenticated === "true" && email) {
      setIsAuthenticated(true);
      setAgentEmail(email);
    } else {
      router.push("/agent/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("agentAuthenticated");
    localStorage.removeItem("agentEmail");
    router.push("/agent/login");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // TODO: Fetch from Supabase
  const [leads, setLeads] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [commissions, setCommissions] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);

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
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "leads", label: "Leads & Opportunities", icon: Target },
    { id: "crm", label: "CRM", icon: Users },
    { id: "commission", label: "Commission", icon: DollarSign },
    { id: "resources", label: "Resource Center", icon: FileText },
    { id: "support", label: "Support Tickets", icon: LifeBuoy },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">Life Evolutions X</div>
                <div className="text-xs text-gray-500">Agent Portal</div>
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
                  {agentEmail.substring(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-900">{agentEmail.split('@')[0]}</div>
                  <div className="text-xs text-gray-500">Agent</div>
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
              {activeTab === "dashboard" && "Overview of your sales performance"}
              {activeTab === "leads" && "Manage leads and track opportunities"}
              {activeTab === "crm" && "Customer relationship management"}
              {activeTab === "commission" && "Track your earnings and commissions"}
              {activeTab === "resources" && "Access marketing materials and templates"}
              {activeTab === "support" && "Get help and track support tickets"}
              {activeTab === "settings" && "Manage your account and security settings"}
            </p>
          </div>

          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <Target className="h-8 w-8 text-purple-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{leads.length}</div>
                  <div className="text-sm text-gray-500">Active Leads</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <Award className="h-8 w-8 text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-500">Policies This Month</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <DollarSign className="h-8 w-8 text-blue-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">$7,275</div>
                  <div className="text-sm text-gray-500">Commission (MTD)</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <TrendingUp className="h-8 w-8 text-orange-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">85%</div>
                  <div className="text-sm text-gray-500">Close Rate</div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">Hot Leads</h2>
                  <div className="space-y-3">
                    {leads.filter(l => l.status === "Hot").map((lead) => (
                      <div key={lead.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm font-bold text-gray-900">{lead.name}</div>
                            <div className="mt-1 text-xs text-gray-500">{lead.product}</div>
                            <div className="mt-2 text-sm font-semibold text-purple-600">{lead.value}</div>
                          </div>
                          <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            {lead.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <h2 className="mb-4 text-lg font-bold text-gray-900">Active Opportunities</h2>
                  <div className="space-y-3">
                    {opportunities.map((opp) => (
                      <div key={opp.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-sm font-bold text-gray-900">{opp.client}</div>
                            <div className="text-xs text-gray-500">{opp.product}</div>
                          </div>
                          <div className="text-sm font-semibold text-purple-600">{opp.value}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600" style={{ width: `${opp.probability}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-gray-700">{opp.probability}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Performance Chart</h2>
                <div className="flex h-64 items-end justify-around gap-2">
                  {[65, 78, 82, 90, 75, 88, 95, 85, 92, 88, 96, 100].map((height, idx) => (
                    <div key={idx} className="group relative flex-1">
                      <div
                        className="rounded-t-lg bg-gradient-to-t from-purple-600 to-[color:var(--gold)] transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white group-hover:block">
                        ${(height * 100).toFixed(0)}
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

          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">All Leads</h2>
                  <button className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-700">
                    + Add Lead
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Contact</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Value</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Last Contact</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                          <td className="py-4">
                            <div className="text-sm font-semibold text-gray-900">{lead.name}</div>
                            <div className="text-xs text-gray-500">{lead.id}</div>
                          </td>
                          <td className="py-4">
                            <div className="text-sm text-gray-700">{lead.email}</div>
                            <div className="text-xs text-gray-500">{lead.phone}</div>
                          </td>
                          <td className="py-4 text-sm text-gray-900">{lead.product}</td>
                          <td className="py-4 text-sm font-bold text-purple-600">{lead.value}</td>
                          <td className="py-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                              lead.status === "Hot" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                              lead.status === "Warm" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                              "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-gray-500">{lead.lastContact}</td>
                          <td className="py-4">
                            <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-900 transition-all hover:border-purple-600">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Opportunities Pipeline</h2>
                <div className="space-y-3">
                  {opportunities.map((opp) => (
                    <div key={opp.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{opp.client}</div>
                          <div className="text-xs text-gray-500">{opp.id} • {opp.product}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-purple-600">{opp.value}</div>
                          <div className="text-xs text-gray-500">Close: {opp.closeDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-gray-700">{opp.stage}</span>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-600 to-[color:var(--gold)]" style={{ width: `${opp.probability}%` }}></div>
                        </div>
                        <span className="text-xs font-semibold text-purple-600">{opp.probability}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "crm" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">CRM Integration</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { name: "Salesforce", status: "Connected", icon: "☁️" },
                    { name: "HubSpot", status: "Connected", icon: "🔶" },
                    { name: "Zoho CRM", status: "Not Connected", icon: "📊" },
                  ].map((crm) => (
                    <div key={crm.name} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="text-3xl mb-2">{crm.icon}</div>
                      <div className="text-sm font-bold text-gray-900 mb-1">{crm.name}</div>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        crm.status === "Connected" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                        "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}>
                        {crm.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Recent Activities</h2>
                <div className="space-y-3">
                  {[
                    { type: "Call", client: "John Smith", time: "2 hours ago", icon: "📞" },
                    { type: "Email", client: "Emma Wilson", time: "5 hours ago", icon: "📧" },
                    { type: "Meeting", client: "Sarah Davis", time: "1 day ago", icon: "📅" },
                    { type: "Follow-up", client: "Michael Brown", time: "2 days ago", icon: "🔔" },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">{activity.type} with {activity.client}</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "commission" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <DollarSign className="h-8 w-8 text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">$7,275</div>
                  <div className="text-sm text-gray-500">This Month</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <Award className="h-8 w-8 text-purple-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">$22,275</div>
                  <div className="text-sm text-gray-500">Total Earned (YTD)</div>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <TrendingUp className="h-8 w-8 text-blue-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-900">15%</div>
                  <div className="text-sm text-gray-500">Commission Rate</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Commission History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Period</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Policies</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Revenue</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Commission</th>
                        <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissions.map((comm, idx) => (
                        <tr key={idx} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                          <td className="py-4 text-sm text-gray-900">{comm.month}</td>
                          <td className="py-4 text-sm text-gray-700">{comm.policies}</td>
                          <td className="py-4 text-sm font-semibold text-gray-900">{comm.revenue}</td>
                          <td className="py-4 text-sm font-bold text-green-600">{comm.commission}</td>
                          <td className="py-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                              comm.status === "Paid" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                              "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}>
                              {comm.status}
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

          {activeTab === "resources" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Marketing Assets</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {resources.map((resource, idx) => (
                    <div key={idx} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <FileText className="h-8 w-8 text-purple-600" />
                        <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                          {resource.type}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-gray-900 mb-1">{resource.name}</div>
                      <div className="text-xs text-gray-500 mb-3">{resource.category} • {resource.size}</div>
                      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-purple-700">
                        <Download className="h-3 w-3" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Training Materials</h2>
                <div className="space-y-3">
                  {[
                    { title: "Product Knowledge Training", duration: "45 min", completed: true },
                    { title: "Sales Techniques Workshop", duration: "60 min", completed: true },
                    { title: "Compliance & Regulations", duration: "30 min", completed: false },
                    { title: "Customer Service Excellence", duration: "40 min", completed: false },
                  ].map((training, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex items-center gap-3">
                        {training.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-gray-400" />
                        )}
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{training.title}</div>
                          <div className="text-xs text-gray-500">{training.duration}</div>
                        </div>
                      </div>
                      <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-900 transition-all hover:border-purple-600">
                        {training.completed ? "Review" : "Start"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "support" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                  <LifeBuoy className="h-8 w-8 text-purple-600 mb-3" />
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
                    className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-700"
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
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          ticket.status === "Resolved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
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
                          <div className={`text-sm font-bold ${
                            ticket.priority === "High" ? "text-red-600" :
                            ticket.priority === "Medium" ? "text-orange-600" :
                            "text-blue-600"
                          }`}>{ticket.priority}</div>
                        </div>
                      </div>
                      <button className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-900 transition-all hover:border-purple-600">
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
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">Category *</label>
                          <select
                            required
                            value={ticketForm.category}
                            onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                          >
                            <option value="">Select category</option>
                            <option value="Technical">Technical Issue</option>
                            <option value="Billing">Commission & Billing</option>
                            <option value="Resources">Marketing Resources</option>
                            <option value="CRM">CRM Support</option>
                            <option value="Training">Training & Development</option>
                            <option value="General">General Inquiry</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-gray-900">Priority *</label>
                          <select
                            required
                            value={ticketForm.priority}
                            onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
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
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
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
                          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-purple-700"
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

          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Account Settings */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Full Name</label>
                    <input type="text" defaultValue="Agent Name" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Email Address</label>
                    <input type="email" value={agentEmail} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm outline-none cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Phone Number</label>
                    <input type="tel" placeholder="(555) 123-4567" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Agent ID</label>
                    <input type="text" placeholder="AGT-12345" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
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
                  <div className="flex items-center gap-2">
                    <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Disabled</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Authenticator App */}
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
              </div>

              {/* Password Change */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Current Password</label>
                    <input type="password" placeholder="Enter current password" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">New Password</label>
                    <input type="password" placeholder="Enter new password" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">Confirm New Password</label>
                    <input type="password" placeholder="Confirm new password" className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
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
                  {[
                    { label: "Email notifications for new leads", enabled: true },
                    { label: "SMS alerts for commission updates", enabled: true },
                    { label: "Marketing materials and updates", enabled: false },
                    { label: "Training and webinar reminders", enabled: true },
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

