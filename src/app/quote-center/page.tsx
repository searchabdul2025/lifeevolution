"use client";

import { PageShell } from "@/components/PageShell";
import { useState, useEffect } from "react";

const products = [
  { id: "life", name: "Life Insurance", icon: "🛡️", desc: "Protect your family's future" },
  { id: "health", name: "Health Insurance", icon: "❤️", desc: "Quality healthcare coverage" },
  { id: "auto", name: "Auto Insurance", icon: "🚗", desc: "Drive with confidence" },
  { id: "home", name: "Home Insurance", icon: "🏠", desc: "Safeguard your home" },
  { id: "business", name: "Business Insurance", icon: "💼", desc: "Protect your business" },
];

export default function QuoteCenterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [formData, setFormData] = useState({
    zipCode: "",
    age: "",
    coverage: "",
    email: "",
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    const saved = localStorage.getItem("quoteProgress");
    if (saved) {
      setShowLoadModal(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const saveProgress = () => {
    const saveData = { currentStep, selectedProduct, formData, savedAt: new Date().toISOString() };
    localStorage.setItem("quoteProgress", JSON.stringify(saveData));
    setShowSaveModal(true);
  };

  const loadProgress = () => {
    const saved = localStorage.getItem("quoteProgress");
    if (saved) {
      const data = JSON.parse(saved);
      setCurrentStep(data.currentStep);
      setSelectedProduct(data.selectedProduct);
      setFormData(data.formData);
      setShowLoadModal(false);
    }
  };

  const dismissLoadModal = () => {
    setShowLoadModal(false);
  };

  return (
    <PageShell
      eyebrow="Quote Center"
      title="Build your quote in minutes."
      description="Get an instant estimate with our intelligent quote builder. Save your progress and return anytime."
      primaryCta={{ href: "/portal/customer", label: "Customer Portal" }}
      secondaryCta={{ href: "/talk-with-an-agent", label: "Talk With an Agent" }}
    >
      <div className="space-y-8">
        <div className="rounded-3xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-[color:var(--text-primary)]">
              Step {currentStep} of {totalSteps}
            </div>
            <button
              onClick={saveProgress}
              className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-2 text-xs font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)]/10"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Progress
            </button>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[color:var(--surface-2)]">
            <div
              className="h-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--blue)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="mt-4 flex justify-between text-xs text-[color:var(--text-tertiary)]">
            {["Product", "Details", "Coverage", "Review"].map((step, idx) => (
              <div key={step} className={`${currentStep > idx ? "text-[color:var(--gold)]" : ""}`}>
                {step}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--gold)]/5 via-transparent to-[color:var(--blue)]/5"></div>
              <div className="relative z-10">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[color:var(--text-primary)]">
                      Choose Your Insurance Type
                    </h3>
                    <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                      Select the type of coverage you need
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => setSelectedProduct(product.id)}
                        className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                          selectedProduct === product.id
                            ? "border-[color:var(--gold)] bg-gradient-to-br from-[color:var(--gold)]/20 to-[color:var(--blue)]/20 shadow-[0_8px_30px_rgba(255,208,87,0.3)] scale-105"
                            : "border-[color:var(--border)] bg-gray-50 dark:bg-[#0f1419] hover:border-[color:var(--gold)]/50 hover:shadow-lg hover:scale-102"
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--gold)]/0 to-[color:var(--blue)]/0 opacity-0 transition-opacity group-hover:opacity-100"></div>
                        <div className="relative">
                          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[color:var(--gold)]/20 to-[color:var(--blue)]/20 text-4xl shadow-inner">{product.icon}</div>
                          <div className="mt-4 text-base font-bold text-[color:var(--text-primary)]">
                            {product.name}
                          </div>
                          <div className="mt-2 text-xs leading-relaxed text-[color:var(--text-secondary)]">
                            {product.desc}
                          </div>
                        </div>
                        {selectedProduct === product.id && (
                          <div className="absolute right-3 top-3">
                            <svg className="h-6 w-6 text-[color:var(--gold)]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[color:var(--text-primary)]">
                      Basic Information
                    </h3>
                    <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                      Tell us a bit about yourself
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-[color:var(--text-primary)]">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="mt-2 h-12 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[color:var(--text-primary)]">
                        Your Age *
                      </label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="mt-2 h-12 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                        placeholder="35"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[color:var(--text-primary)]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2 h-12 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] px-4 text-sm outline-none focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold)]/20"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[color:var(--text-primary)]">
                      Coverage Amount
                    </h3>
                    <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                      How much coverage do you need?
                    </p>
                  </div>

                  <div className="space-y-4">
                    {["$100,000", "$250,000", "$500,000", "$1,000,000", "Custom Amount"].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setFormData({ ...formData, coverage: amount })}
                        className={`flex w-full items-center justify-between rounded-2xl border p-4 transition-all ${
                          formData.coverage === amount
                            ? "border-[color:var(--gold)] bg-gradient-to-br from-[color:var(--gold)]/10 to-[color:var(--blue)]/10"
                            : "border-[color:var(--border)] bg-[color:var(--surface-2)] hover:border-[color:var(--border-hover)]"
                        }`}
                      >
                        <span className="text-sm font-semibold text-[color:var(--text-primary)]">
                          {amount}
                        </span>
                        {formData.coverage === amount && (
                          <svg className="h-5 w-5 text-[color:var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[color:var(--text-primary)]">
                      Review Your Quote
                    </h3>
                    <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                      Confirm your details and get your estimate
                    </p>
                  </div>

                  <div className="space-y-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-2)] p-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-[color:var(--text-tertiary)]">Product</span>
                      <span className="text-sm font-semibold text-[color:var(--text-primary)]">
                        {products.find((p) => p.id === selectedProduct)?.name || "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[color:var(--text-tertiary)]">ZIP Code</span>
                      <span className="text-sm font-semibold text-[color:var(--text-primary)]">
                        {formData.zipCode || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[color:var(--text-tertiary)]">Age</span>
                      <span className="text-sm font-semibold text-[color:var(--text-primary)]">
                        {formData.age || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[color:var(--text-tertiary)]">Coverage</span>
                      <span className="text-sm font-semibold text-[color:var(--text-primary)]">
                        {formData.coverage || "—"}
                      </span>
                    </div>
                  </div>

                  <button className="h-12 w-full rounded-full bg-[color:var(--gold)] text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-xl">
                    Get My Quote
                  </button>
                </div>
              )}

              </div>
              <div className="relative z-10 mt-8 flex gap-3">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="h-12 flex-1 rounded-full border-2 border-[color:var(--gold)] bg-transparent text-sm font-semibold text-[color:var(--text-primary)] transition-all hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] hover:scale-105"
                  >
                    Back
                  </button>
                )}
                {currentStep < totalSteps && (
                  <button
                    onClick={handleNext}
                    disabled={currentStep === 1 && !selectedProduct}
                    className="h-12 flex-1 rounded-full bg-[color:var(--gold)] text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6 shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--gold)_0%,_transparent_50%)] opacity-10"></div>
                <div className="relative z-10">
                <div className="text-lg font-bold text-[color:var(--text-primary)]">
                  Instant Estimate
                </div>
                <div className="mt-4 rounded-2xl border-2 border-[color:var(--gold)]/30 bg-gradient-to-br from-gray-50 to-white dark:from-[#0f1419] dark:to-[#0f1419] p-6 text-center shadow-inner">
                  <div className="text-4xl">💰</div>
                  <div className="mt-3 text-3xl font-bold text-[color:var(--text-primary)]">
                    ${selectedProduct && formData.age ? "45-85" : "—"}
                  </div>
                  <div className="text-sm text-[color:var(--text-tertiary)]">per month</div>
                  <div className="mt-4 text-xs text-[color:var(--text-secondary)]">
                    {selectedProduct && formData.age
                      ? "Estimated range based on your inputs"
                      : "Complete the form to see your estimate"}
                  </div>
                </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-white dark:bg-[#1a1f2e] p-6 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--blue)]/5 to-transparent"></div>
                <div className="relative z-10">
                  <div className="text-sm font-bold text-[color:var(--text-primary)]">
                    Why Choose Us?
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { icon: "⚡", text: "Instant quotes in under 2 minutes" },
                      { icon: "🔒", text: "Your data is secure and never sold" },
                      { icon: "💬", text: "Talk to licensed agents anytime" },
                      { icon: "💾", text: "Save progress and return later" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3 text-sm text-[color:var(--text-primary)]">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[color:var(--gold)]/20 to-[color:var(--blue)]/20 text-base">{item.icon}</div>
                        <span className="font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-md overflow-hidden rounded-3xl border border-[color:var(--gold)]/30 bg-white dark:bg-[#1a1f2e] p-8 shadow-2xl">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[color:var(--gold)] opacity-20 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-[color:var(--blue)] opacity-20 blur-3xl"></div>
            
            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] text-3xl shadow-lg">
                ✓
              </div>
              <h3 className="mt-6 text-center text-2xl font-bold text-[color:var(--text-primary)]">
                Progress Saved!
              </h3>
              <p className="mt-3 text-center text-sm text-[color:var(--text-secondary)]">
                Your quote has been saved. You can return anytime to continue where you left off.
              </p>
              <button
                onClick={() => setShowSaveModal(false)}
                className="mt-6 h-12 w-full rounded-full bg-[color:var(--gold)] text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-xl"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-md overflow-hidden rounded-3xl border border-[color:var(--gold)]/30 bg-white dark:bg-[#1a1f2e] p-8 shadow-2xl">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[color:var(--gold)] opacity-20 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-[color:var(--blue)] opacity-20 blur-3xl"></div>
            
            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--blue)] text-3xl shadow-lg">
                💾
              </div>
              <h3 className="mt-6 text-center text-2xl font-bold text-[color:var(--text-primary)]">
                Welcome Back!
              </h3>
              <p className="mt-3 text-center text-sm text-[color:var(--text-secondary)]">
                We found your saved progress. Would you like to continue where you left off?
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={dismissLoadModal}
                  className="h-12 flex-1 rounded-full border-2 border-[color:var(--gold)] bg-transparent text-sm font-semibold text-[color:var(--text-primary)] transition-all hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] hover:scale-105"
                >
                  Start Fresh
                </button>
                <button
                  onClick={loadProgress}
                  className="h-12 flex-1 rounded-full bg-[color:var(--gold)] text-sm font-semibold text-[color:var(--ink)] transition-all hover:scale-105 hover:shadow-xl"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
