import Link from "next/link";
import { Home } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Home className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">HomeValue</span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
              Your complete guide to home buying costs. Estimate expenses, find properties, and make informed decisions with AI-powered insights.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/estimator" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/houses" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  House Finder
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/login" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-center text-zinc-600 dark:text-zinc-400 text-sm">
            &copy; {new Date().getFullYear()} HomeValue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
