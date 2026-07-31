"use client";

import { useState } from "react";
import { Calculator, DollarSign, Home, Percent, Loader2, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function EstimatorPage() {
  const [form, setForm] = useState({
    homePrice: "350000",
    downPayment: "70000",
    interestRate: "6.5",
    loanTerm: "30",
    propertyTaxRate: "1.2",
    insurance: "1200",
    hoa: "0",
    paymentFrequency: "monthly",
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleEstimate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cost-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homePrice: Number(form.homePrice) || 0,
          downPayment: Number(form.downPayment) || 0,
          interestRate: Number(form.interestRate) || 6.5,
          loanTerm: Number(form.loanTerm) || 30,
          propertyTaxRate: Number(form.propertyTaxRate) || 1.2,
          insurance: Number(form.insurance) || 1200,
          hoa: Number(form.hoa) || 0,
          paymentFrequency: form.paymentFrequency,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      alert("Failed to calculate. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const fmt = (n: number) => `$${n.toLocaleString()}`;
  const homePriceNum = Number(form.homePrice) || 0;
  const downPaymentNum = Number(form.downPayment) || 0;

  const inputClass = "w-full pl-10 pr-4 py-3 bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-700/60 rounded-xl text-zinc-900 dark:text-zinc-100 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-800/60";

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-sm font-medium mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-3 tracking-tight">
            Home Cost Estimator
          </h1>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Get a detailed breakdown of your monthly costs and long-term investment.
          </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-zinc-200/80 dark:border-zinc-800/80">
          <h2 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50">
              <Calculator className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            Property Details
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Home Price</label>
              <div className="relative group">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                <input type="number" value={form.homePrice} onChange={(e) => handleChange("homePrice", e.target.value)} onFocus={handleFocus} className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                Down Payment <span className="text-blue-600 dark:text-blue-400 font-semibold">{homePriceNum > 0 ? ((downPaymentNum / homePriceNum) * 100).toFixed(1) : 0}%</span>
              </label>
              <div className="relative group">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                <input type="number" value={form.downPayment} onChange={(e) => handleChange("downPayment", e.target.value)} onFocus={handleFocus} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Interest Rate</label>
                <div className="relative group">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                  <input type="number" step="0.1" value={form.interestRate} onChange={(e) => handleChange("interestRate", e.target.value)} onFocus={handleFocus} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Loan Term (years)</label>
                <div className="relative group">
                  <input type="number" min="1" max="50" value={form.loanTerm} onChange={(e) => handleChange("loanTerm", e.target.value)} onFocus={handleFocus} className="w-full px-4 py-3 bg-zinc-50/80 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-700/60 rounded-xl text-zinc-900 dark:text-zinc-100 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Property Tax Rate</label>
                <div className="relative group">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                  <input type="number" step="0.1" value={form.propertyTaxRate} onChange={(e) => handleChange("propertyTaxRate", e.target.value)} onFocus={handleFocus} className={inputClass} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Insurance / year</label>
                <div className="relative group">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                  <input type="number" value={form.insurance} onChange={(e) => handleChange("insurance", e.target.value)} onFocus={handleFocus} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">HOA / month</label>
                <div className="relative group">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                  <input type="number" value={form.hoa} onChange={(e) => handleChange("hoa", e.target.value)} onFocus={handleFocus} className={inputClass} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">Payment Frequency</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: "weekly", label: "Weekly" },
                  { value: "biweekly", label: "Bi-Weekly" },
                  { value: "bimonthly", label: "Bi-Monthly" },
                  { value: "monthly", label: "Monthly" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, paymentFrequency: option.value }))}
                    className={`text-sm py-2.5 rounded-lg border font-medium transition-all duration-200 cursor-pointer ${
                      form.paymentFrequency === option.value
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                        : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-blue-400 dark:hover:border-blue-600"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleEstimate}
                disabled={loading}
                className="group relative w-full py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 transition-all duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)" }} />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Calculator className="h-5 w-5" />}
                  {loading ? "Calculating..." : (
                    <>
                      Calculate Costs
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div>
          {result?.calculations ? (
            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-sm border border-zinc-200/80 dark:border-zinc-800/80">
                <h2 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50">
                    <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Cost Breakdown
                </h2>

                <div className="mb-5 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">{result.calculations.paymentFrequency} Payment</p>
                  <p className="text-3xl font-bold text-zinc-900 dark:text-white tabular-nums">{fmt(result.calculations.paymentAmount)}</p>
                </div>

                <div className="space-y-0">
                  <div className="flex justify-between items-center py-3.5 border-b border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Mortgage (P&I)</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">{fmt(result.calculations.monthlyMortgage)}<span className="text-xs text-zinc-400 ml-1">/mo</span></span>
                  </div>
                  <div className="flex justify-between items-center py-3.5 border-b border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Property Tax</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">{fmt(result.calculations.monthlyTax)}<span className="text-xs text-zinc-400 ml-1">/mo</span></span>
                  </div>
                  <div className="flex justify-between items-center py-3.5 border-b border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Insurance</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">{fmt(result.calculations.monthlyInsurance)}<span className="text-xs text-zinc-400 ml-1">/mo</span></span>
                  </div>
                  <div className="flex justify-between items-center py-3.5 border-b border-zinc-100 dark:border-zinc-800/60">
                    <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">HOA</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">{fmt(result.calculations.monthlyHoa)}<span className="text-xs text-zinc-400 ml-1">/mo</span></span>
                  </div>
                  <div className="flex justify-between items-center pt-5 mt-1">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Total Monthly</span>
                    <span className="font-bold text-3xl text-zinc-900 dark:text-white tabular-nums">{fmt(result.calculations.totalMonthly)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200/80 dark:border-zinc-800/80">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-medium uppercase tracking-wide">Total Interest</p>
                  <p className="font-bold text-xl text-zinc-900 dark:text-zinc-100 tabular-nums">{fmt(result.calculations.totalInterest)}</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200/80 dark:border-zinc-800/80">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-medium uppercase tracking-wide">Total Cost</p>
                  <p className="font-bold text-xl text-zinc-900 dark:text-zinc-100 tabular-nums">{fmt(result.calculations.totalCost)}</p>
                </div>
              </div>

              {result.ai && (
                <div className="bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl p-8 border border-zinc-200/80 dark:border-zinc-800/60">
                  <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50">
                      <Home className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    AI Analysis
                  </h3>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-300 prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-headings:mt-5 prose-headings:mb-2 prose-p:my-2 prose-li:my-0.5 prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100 prose-table:text-sm prose-th:bg-zinc-100 dark:prose-th:bg-zinc-800 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-hr:my-4 prose-table:rounded-lg prose-table:overflow-hidden">
                    <ReactMarkdown>{result.ai}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-16 shadow-sm border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
              <div className="p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-6">
                <Calculator className="h-12 w-12 text-zinc-400 dark:text-zinc-500" />
              </div>
              <h3 className="font-semibold text-xl text-zinc-900 dark:text-zinc-100 mb-2">Ready to Calculate</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs">
                Fill in your property details and click calculate to see the full cost breakdown.
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}