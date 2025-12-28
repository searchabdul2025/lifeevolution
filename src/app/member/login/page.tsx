"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Mail, Lock } from "lucide-react";

export default function MemberLogin() {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validCredentials = {
      email: "member@lifeevox.com",
      password: "member123"
    };

    if (
      credentials.email === validCredentials.email &&
      credentials.password === validCredentials.password
    ) {
      setTimeout(() => {
        setStep("2fa");
        setLoading(false);
      }, 1000);
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (twoFactorCode === "123456") {
      localStorage.setItem("memberAuthenticated", "true");
      localStorage.setItem("memberEmail", credentials.email);
      router.push("/member");
    } else {
      setError("Invalid 2FA code");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-[#0a0f1a] to-blue-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[color:var(--gold)]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-[color:var(--border)] bg-white/95 dark:bg-[#1a1f2e]/95 backdrop-blur-xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-[color:var(--gold)] text-2xl font-bold text-white shadow-lg">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-[color:var(--text-primary)]">Member Portal</h1>
            <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
              {step === "credentials" ? "Sign in to your account" : "Enter 2FA Code"}
            </p>
          </div>

          {step === "credentials" ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                  className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-[color:var(--gold)] px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Continue"}
              </button>
            </form>
          ) : (
            <form onSubmit={handle2FASubmit} className="space-y-6">
              <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 text-center">
                <Shield className="mx-auto h-12 w-12 text-blue-600 mb-2" />
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">Two-Factor Authentication</p>
                <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">Enter the 6-digit code from your authenticator app</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)] text-center">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="w-full rounded-xl border border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] px-4 py-3 text-center text-2xl font-bold tracking-widest outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="000000"
                  maxLength={6}
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
                disabled={loading || twoFactorCode.length !== 6}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-[color:var(--gold)] px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify & Sign In"}
              </button>

              <button
                type="button"
                onClick={() => setStep("credentials")}
                className="w-full text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]"
              >
                ← Back to login
              </button>
            </form>
          )}

          <div className="mt-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
            <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-2">Demo Credentials:</p>
            <p className="text-xs text-blue-700 dark:text-blue-400">Email: <span className="font-mono font-bold">member@lifeevox.com</span></p>
            <p className="text-xs text-blue-700 dark:text-blue-400">Password: <span className="font-mono font-bold">member123</span></p>
            <p className="text-xs text-blue-700 dark:text-blue-400">2FA Code: <span className="font-mono font-bold">123456</span></p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          © 2024 Life Evolutions X. All rights reserved.
        </p>
      </div>
    </div>
  );
}
