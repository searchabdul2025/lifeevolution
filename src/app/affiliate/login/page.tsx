"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Award, Mail, Lock } from "lucide-react";

export default function AffiliateLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validCredentials = {
      email: "affiliate@lifeevox.com",
      password: "affiliate123"
    };

    if (
      credentials.email === validCredentials.email &&
      credentials.password === validCredentials.password
    ) {
      localStorage.setItem("affiliateAuthenticated", "true");
      localStorage.setItem("affiliateEmail", credentials.email);
      router.push("/affiliate");
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-[#0a0f1a] to-green-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[color:var(--gold)]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-[color:var(--border)] bg-white/95 dark:bg-[#1a1f2e]/95 backdrop-blur-xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-[color:var(--gold)] text-2xl font-bold text-white shadow-lg">
              <Award className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-[color:var(--text-primary)]">Affiliate Portal</h1>
            <p className="mt-2 text-sm text-[color:var(--text-secondary)]">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">
                <Mail className="inline h-4 w-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">
                <Lock className="inline h-4 w-4 mr-2" />
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm outline-none transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-green-600 to-[color:var(--gold)] px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4">
            <p className="text-xs font-semibold text-green-900 dark:text-green-300 mb-2">Demo Credentials:</p>
            <p className="text-xs text-green-700 dark:text-green-400">Email: <span className="font-mono font-bold">affiliate@lifeevox.com</span></p>
            <p className="text-xs text-green-700 dark:text-green-400">Password: <span className="font-mono font-bold">affiliate123</span></p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          © 2024 Life Evolutions X. All rights reserved.
        </p>
      </div>
    </div>
  );
}
