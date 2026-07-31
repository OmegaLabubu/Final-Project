import Link from "next/link";
import { Calculator, Home, MapPin, Bot, ArrowRight, DollarSign, TrendingUp, Shield } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
              Know Your{" "}
              <span className="text-blue-600">Home Costs</span>{" "}
              Before You Buy
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
              AI-powered cost calculator, real-time property search, and expert guidance — everything you need to make smart home buying decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/estimator"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all hover:scale-105"
              >
                <Calculator className="h-5 w-5" />
                Calculate Costs
              </Link>
              <Link
                href="/houses"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-8 py-4 rounded-xl font-semibold border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all"
              >
                <MapPin className="h-5 w-5" />
                Find Houses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Powerful tools to help you navigate the home buying process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">Cost Calculator</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Calculate mortgage, taxes, insurance, and total monthly costs with AI-powered analysis.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">House Finder</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Search real-time MLS listings with interactive maps and detailed property information.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">AI Assistant</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Get expert advice on home buying, mortgages, and market trends from our AI chatbot.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">Secure Account</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Save your estimates, track favorites, and manage your home buying journey securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                Understand the{" "}
                <span className="text-blue-600">True Cost</span>{" "}
                of Homeownership
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                Beyond the listing price, there are many costs to consider. Our AI-powered estimator breaks down every expense so you can budget with confidence.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <DollarSign className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Mortgage & Interest</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">Calculate monthly payments based on price, down payment, and interest rate.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Property Taxes & Insurance</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">Factor in local tax rates and homeowners insurance costs.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Home className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">HOA & Maintenance</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">Include HOA fees and estimated maintenance costs in your budget.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-xl text-zinc-900 dark:text-zinc-100 mb-6">Sample Cost Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Home Price</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">$350,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Down Payment (20%)</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">$70,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Loan Amount</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">$280,000</span>
                </div>
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">Monthly Mortgage</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">$1,748</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">Property Tax</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">$350</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">Insurance</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">$100</span>
                  </div>
                </div>
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">Total Monthly</span>
                    <span className="font-bold text-2xl text-blue-600">$2,198</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Start exploring properties and estimating costs today. It's free to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimator"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all"
            >
              <Calculator className="h-5 w-5" />
              Start Estimating
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-800 transition-all border border-blue-500"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
