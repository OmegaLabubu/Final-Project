"use client";

import { useState } from "react";
import { Calculator, DollarSign, Home, Percent, Loader2, TrendingUp } from "lucide-react";

export default function EstimatorPage() {
  const [form, setForm] = useState({
    homePrice: 350000,
    downPayment: 70000,
    interestRate: 6.5,
    loanTerm: 30,
    propertyTaxRate: 1.2,
    insurance: 1200,
    hoa: 0,
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: Number(value) || 0 }));
  };

  const handleEstimate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cost-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
          AI Cost Estimator
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Calculate the true cost of homeownership with AI-powered analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
          <h2 className="font-bold text-xl text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            Property Details
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Home Price ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="number"
                  value={form.homePrice}
                  onChange={(e) => handleChange("homePrice", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Down Payment ($) — {form.homePrice > 0 ? ((form.downPayment / form.homePrice) * 100).toFixed(1) : 0}%
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="number"
                  value={form.downPayment}
                  onChange={(e) => handleChange("downPayment", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[5, 10, 20].map(pct => (
                  <button
                    key={pct}
                    onClick={() => setForm(prev => ({ ...prev, downPayment: Math.round(prev.homePrice * pct / 100) }))}
                    className="text-xs px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Interest Rate (%)</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type="number"
                    step="0.1"
                    value={form.interestRate}
                    onChange={(e) => handleChange("interestRate", e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Loan Term (years)</label>
                <select
                  value={form.loanTerm}
                  onChange={(e) => handleChange("loanTerm", e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={15}>15 years</option>
                  <option value={20}>20 years</option>
                  <option value={30}>30 years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Property Tax Rate (%/year)</label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="number"
                  step="0.1"
                  value={form.propertyTaxRate}
                  onChange={(e) => handleChange("propertyTaxRate", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Insurance ($/year)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type="number"
                    value={form.insurance}
                    onChange={(e) => handleChange("insurance", e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">HOA ($/month)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type="number"
                    value={form.hoa}
                    onChange={(e) => handleChange("hoa", e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleEstimate}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calculator className="h-4 w-4" />}
              {loading ? "Calculating..." : "Estimate Costs"}
            </button>
          </div>
        </div>

        <div>
          {result?.calculations ? (
            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
                <h2 className="font-bold text-xl text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Monthly Breakdown
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-600 dark:text-zinc-400">Mortgage (P&I)</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{fmt(result.calculations.monthlyMortgage)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-600 dark:text-zinc-400">Property Tax</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{fmt(result.calculations.monthlyTax)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-600 dark:text-zinc-400">Insurance</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{fmt(result.calculations.monthlyInsurance)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-600 dark:text-zinc-400">HOA</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{fmt(result.calculations.monthlyHoa)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">Total Monthly</span>
                    <span className="font-bold text-3xl text-blue-600">{fmt(result.calculations.totalMonthly)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Total Interest</p>
                  <p className="font-bold text-xl text-zinc-900 dark:text-zinc-100">{fmt(result.calculations.totalInterest)}</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Total Cost</p>
                  <p className="font-bold text-xl text-zinc-900 dark:text-zinc-100">{fmt(result.calculations.totalCost)}</p>
                </div>
              </div>

              {result.ai && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                    <Home className="h-4 w-4 text-blue-600" />
                    AI Analysis
                  </h3>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line">{result.ai}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-12 shadow-lg border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center h-full">
              <Calculator className="h-16 w-16 text-zinc-300 dark:text-zinc-600 mb-4" />
              <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-100 mb-2">Ready to Calculate</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Fill in the property details and click "Estimate Costs" to see your breakdown
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
