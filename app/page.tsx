'use client';

import * as React from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { MessageCircle } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createBrowserClient(supabaseUrl!, supabaseAnonKey!);

export default function Home() {
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // Example break-even % for progress bar
  const breakEvenPercent = 72;

  return (
    <main
      className="font-sans min-h-screen w-full bg-[#FAF9F6]"
      style={{ fontFeatureSettings: 'calt' }}
    >
      {/* Floating Handlebar Navbar */}
      <nav className="fixed top-4 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <div className="max-w-[380px] w-full mx-auto flex items-center justify-between rounded-full bg-white/80 backdrop-blur-md border border-zinc-200 shadow-sm px-4 py-2 pointer-events-auto select-none">
          <span className="font-semibold text-lg tracking-tight text-zinc-900 select-none">
            Trakkit
          </span>
          <button
            onClick={handleSignIn}
            className="ml-2 rounded-full bg-black text-white text-sm font-medium px-4 py-1.5 shadow transition hover:bg-zinc-900 active:scale-95"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-[420px] mx-auto min-h-screen px-6 py-8 flex flex-col gap-8 items-center justify-center">
        {/* Hero */}
        <div className="mt-20 text-center mb-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 leading-tight mb-2">
            Your Side Hustle, <br className="sm:hidden" /> Simplified.
          </h1>
          <p className="text-zinc-500 font-normal text-base sm:text-lg">
            Track what matters most — with Money Diary flair.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 w-full">
          {/* Card A: Profit */}
          <div
            className="rounded-3xl bg-[#FFF1F1] p-6 flex flex-col items-center justify-center shadow"
            style={{ minHeight: 112 }}
          >
            <div className="text-3xl font-extrabold text-zinc-900 tracking-tight mb-1">
              +$47.00
            </div>
            <div className="text-zinc-400 font-medium text-base">Profit</div>
          </div>

          {/* Card B: Break-even Progress */}
          <div
            className="rounded-3xl bg-[#F0FDF4] p-6 flex flex-col items-start justify-center shadow"
            style={{ minHeight: 112 }}
          >
            <div className="flex justify-between items-center w-full mb-2">
              <div className="text-zinc-700 font-semibold text-base">
                Break-even
              </div>
              <span className="text-zinc-500 text-sm">{breakEvenPercent}%</span>
            </div>
            <div className="w-full">
              <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-emerald-400 transition-all"
                  style={{
                    width: `${breakEvenPercent}%`,
                    borderRadius: 9999,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Card C: Mentor */}
          <div
            className="rounded-3xl bg-[#F5F3FF] p-6 flex gap-3 items-start shadow"
            style={{ minHeight: 112 }}
          >
            <div className="mt-1">
              <MessageCircle size={28} className="text-violet-400" strokeWidth={2} />
            </div>
            <div>
              <div className="text-zinc-800 font-bold text-base mb-1">
                Mentor
              </div>
              <div className="text-zinc-500 text-sm">
                Your tutoring makes <span className="font-semibold">3x</span> more than reselling.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
