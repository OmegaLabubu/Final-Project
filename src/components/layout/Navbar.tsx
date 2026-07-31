"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Home, Menu, X, User, LogOut } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
              <Home className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">HomeValue</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/estimator" className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-4 py-2 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 transition-colors">
              Cost Calculator
            </Link>
            <Link href="/houses" className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 px-4 py-2 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 transition-colors">
              House Finder
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleSignOut} className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-600 dark:text-zinc-400">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
          <div className="px-4 py-4 space-y-3">
            <Link href="/estimator" className="block text-zinc-600 dark:text-zinc-400" onClick={() => setIsOpen(false)}>
              Cost Calculator
            </Link>
            <Link href="/houses" className="block text-zinc-600 dark:text-zinc-400" onClick={() => setIsOpen(false)}>
              House Finder
            </Link>
            {user ? (
              <>
                <Link href="/dashboard" className="block text-zinc-600 dark:text-zinc-400" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={() => { handleSignOut(); setIsOpen(false); }} className="block text-zinc-600 dark:text-zinc-400">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
