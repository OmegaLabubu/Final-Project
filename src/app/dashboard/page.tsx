"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User, Mail, LogOut, Calculator, Home, Shield } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Dashboard</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Manage your account and tools</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <User className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-1">Your Account</h2>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm mb-4">
              <Mail className="h-4 w-4" />
              {user.email}
            </div>
            <div className="w-full space-y-2">
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Account secured with Supabase</span>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2.5 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-bold text-xl text-zinc-900 dark:text-zinc-100">Quick Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/estimator"
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">Cost Estimator</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Calculate mortgage, taxes, and total monthly costs with AI analysis.
              </p>
            </Link>

            <Link
              href="/houses"
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 mb-2">House Finder</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Search real-time MLS listings with maps and filters.
              </p>
            </Link>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-2">Need Help?</h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
              Our AI assistant is available 24/7 to answer your home buying questions. Click the chat icon in the bottom right corner to start a conversation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
