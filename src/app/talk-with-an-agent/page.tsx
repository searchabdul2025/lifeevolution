"use client";

import { PageShell } from "@/components/PageShell";
import { Video } from "lucide-react";

export default function TalkWithAnAgentPage() {
  const handleVideoCall = () => {
    // Redirect to schedule appointment page where OpenAI assistant is integrated
    window.location.href = "/schedule-appointment";
  };

  return (
    <PageShell
      eyebrow="Talk With an Agent"
      title="Instant help, the way you want it."
      description="Connect with our expert agents through live chat or video call. Get personalized assistance for all your insurance needs."
      primaryCta={{ href: "/schedule-appointment", label: "Schedule Appointment" }}
      secondaryCta={{ href: "/quote-center", label: "Get My Quote" }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            t: "Live Chat",
            d: "Connect instantly with our insurance experts through live chat. Get quick answers to your questions and personalized guidance.",
            action: null
          },
          {
            t: "Video Call",
            d: "Schedule a face-to-face video consultation with our licensed agents. Perfect for detailed policy discussions and personalized recommendations.",
            action: handleVideoCall
          },
        ].map((x) => (
          <div
            key={x.t}
            className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1f2e] p-8 shadow-lg hover:shadow-2xl transition-all hover:border-yellow-400"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-yellow-400 to-blue-600 opacity-10 blur-3xl transition-all group-hover:opacity-20"></div>

            <div className="relative">
              <div className="text-xl font-bold text-gray-900 dark:text-white">{x.t}</div>
              <div className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {x.d}
              </div>

              {x.action && (
                <button
                  onClick={x.action}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
                >
                  <Video className="h-4 w-4" />
                  Start Video Call
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-yellow-50 dark:from-blue-900/20 dark:to-yellow-900/20 p-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Chat Assistant</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Our AI-powered chat assistant is available 24/7 to answer your questions, provide quotes, and help you find the right insurance coverage. Click the chat icon in the bottom right corner to get started.
        </p>
      </div>
    </PageShell>
  );
}
