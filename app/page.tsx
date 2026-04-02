"use client";

import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useEffect, useState } from "react";

// Lucide icons (inlined SVGs for SSR compatibility)
const LucideDollarSign = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const LucideClock = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const LucideCheck = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function Page() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    // Listen for changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="antialiased font-sans bg-[#0a0a0a] min-h-screen flex flex-col">
      {/* Fading Blurred Gradient Glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: "linear-gradient(90deg, #6d28d960 0%, #0ea5e980 100%)",
          filter: "blur(80px)",
          opacity: "0.65",
          width: "100vw",
          height: "80vh",
          top: "0",
          left: "0"
        }}
      />

      {/* Premium Navbar */}
      <nav className="fixed z-10 top-0 left-0 w-full backdrop-blur-[20px] bg-black/30 border-b border-b-[#262626] flex justify-between items-center px-8 h-16" style={{WebkitBackdropFilter: "blur(20px)"}}>
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="font-bold text-2xl tracking-tight text-white"
            style={{letterSpacing: "-0.04em", fontFamily: "var(--font-geist-sans)"}}
          >
            Trakkit
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-transparent border border-zinc-700 hover:border-zinc-500 transition-all backdrop-blur-[2px]"
              >
                Dashboard
              </Link>
              <button
                onClick={signOut}
                className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-zinc-100 border border-zinc-700 hover:border-zinc-500 bg-black/80 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-black bg-white hover:border-zinc-400 border border-zinc-200 transition-all shadow-sm"
            >
              <svg aria-hidden width="18" height="18" viewBox="0 0 18 18">
                <g>
                  <path fill="#4285F4" d="M17.64 9.204c0-.638-.057-1.25-.163-1.837H9v3.477h4.844c-.209 1.13-.84 2.088-1.791 2.734v2.265h2.899c1.695-1.563 2.688-3.866 2.688-6.639z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.474-.805 5.966-2.186l-2.899-2.265c-.805.54-1.837.863-3.067.863-2.36 0-4.358-1.595-5.074-3.741H.957v2.347A8.994 8.994 0 0 0 9 18z"/>
                  <path fill="#FBBC05" d="M3.926 10.671A5.41 5.41 0 0 1 3.468 9a5.41 5.41 0 0 1 .458-1.671V4.982H.957A8.996 8.996 0 0 0 0 9c0 1.408.338 2.74.957 3.982l2.969-2.311z"/>
                  <path fill="#EA4335" d="M9 3.579c1.32 0 2.5.455 3.428 1.35l2.57-2.571C13.472 1.081 11.429 0 9 0A8.994 8.994 0 0 0 .957 4.982l2.969 2.347C4.642 5.175 6.64 3.579 9 3.579z"/>
                </g>
              </svg>
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Hero & Content */}
      <section className="relative flex flex-col items-center justify-center flex-1 pt-36 pb-16 px-6 sm:px-0 z-10">
        {/* Frosted "glow" panel with typographic hero */}
        <div className="max-w-2xl w-full mx-auto text-center">
          <h1
            className="text-[clamp(2.8rem,9vw,4.6rem)] leading-[1.04] font-bold tracking-tight"
            style={{
              color: "#fafafa",
              letterSpacing: "-.04em",
              fontFamily: "var(--font-geist-sans)"
            }}
          >
            Trakkit
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-medium text-zinc-100" style={{letterSpacing: "-0.02em"}}>
            The Side Hustle Co-Pilot for Students.
          </p>
          <p className="mt-5 text-md sm:text-lg text-zinc-400 max-w-xl mx-auto font-normal">
            Track your income, time, and consistency across all your gigs—effortlessly. Trakkit helps you level up your hustle with beautiful, actionable insights.
          </p>
        </div>
        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <FeatureCard
            title="Profit"
            description="See what you earn, where, and when. Automatic, always up to date."
            icon={LucideDollarSign}
            accent="violet"
          />
          <FeatureCard
            title="Time"
            description="Visualize your time spent. Optimize for what matters."
            icon={LucideClock}
            accent="cyan"
          />
          <FeatureCard
            title="Consistency"
            description="Your progress, streaks, and milestones—tracked for you."
            icon={LucideCheck}
            accent="emerald"
          />
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  accent,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: "violet" | "cyan" | "emerald";
}) {
  const accentMap = {
    violet: {
      border: "border-violet-700/50",
      glow: "group-hover:shadow-[0_0_0_2px_#6d28d9]",
      ring: "group-hover:border-violet-400",
    },
    cyan: {
      border: "border-cyan-700/50",
      glow: "group-hover:shadow-[0_0_0_2px_#0ea5e9]",
      ring: "group-hover:border-cyan-400",
    },
    emerald: {
      border: "border-emerald-700/40",
      glow: "group-hover:shadow-[0_0_0_2px_#10b981]",
      ring: "group-hover:border-emerald-400",
    },
  };
  return (
    <div
      className={[
        "rounded-2xl group transition-all border bg-black/40 backdrop-blur-xl px-6 py-7 flex flex-col items-center hover:scale-[1.025]",
        accentMap[accent].border,
        accentMap[accent].glow,
        accentMap[accent].ring,
        "hover:border-opacity-90 border-opacity-60"
      ].join(" ")}
      style={{
        minHeight: 230,
        boxShadow:
          "0 5px 40px 0 rgba(54,64,112,0.06), 0 1.5px 6px 0 rgba(64,0,150,0.015)",
      }}
    >
      <div className="mb-4">{icon}</div>
      <strong className="text-zinc-100 font-semibold text-lg mb-1">{title}</strong>
      <span className="block text-zinc-400 text-base text-center font-normal">{description}</span>
    </div>
  );
}