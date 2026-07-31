"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Home, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-2xl">HomeValue</span>
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Welcome back</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 py-2.5 rounded-lg font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-700"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Connecting..." : "Sign in with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}
