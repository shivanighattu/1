"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate waitlist join
    setSubmitted(true);
    setEmail("");
  };

  return (
    <main className="min-h-screen w-full bg-[#17171f] flex flex-col items-center justify-start relative overflow-hidden">
      {/* Glowing Background Accent */}
      <div
        aria-hidden
        className="absolute top-0 left-0 w-full h-[600px] pointer-events-none"
      >
        <div className="absolute w-[900px] h-[500px] left-1/2 -translate-x-1/2 -top-40 rounded-full opacity-60 blur-2xl bg-gradient-to-tr from-[#7928ca] via-[#4f8cff] to-transparent" />
        <div className="absolute w-[450px] h-[300px] left-1/3 top-10 rounded-full opacity-40 blur-3xl bg-gradient-to-b from-[#4f8cff] to-transparent" />
      </div>
      {/* Hero Section */}
      <section className="z-10 pt-28 pb-12 flex flex-col items-center w-full max-w-2xl text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-br from-[#c471f5] via-[#49a4fa] to-white inline-block text-transparent bg-clip-text drop-shadow-lg mb-4">
          The Side Hustle Co-Pilot <br /> for Students.
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 font-medium mb-8">
          Meet Trakkit — organize, analyze, and crush your side hustles with pro-level insights.
        </p>
        {/* Waitlist input */}
        <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto rounded-xl bg-white/10 backdrop-blur-md shadow-lg ring-1 ring-white/10 p-2 gap-2 items-center">
          <input
            type="email"
            className="flex-1 px-4 py-3 rounded-md bg-transparent focus:outline-none text-zinc-100 placeholder:text-zinc-400 font-medium"
            placeholder="Enter your email"
            required
            disabled={submitted}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={submitted}
            className="bg-gradient-to-tr from-[#7928ca] to-[#4f8cff] shadow-[0_0_15px_2px_rgba(121,40,202,0.25)] text-white px-6 py-3 rounded-md font-semibold transition-all hover:scale-105 hover:shadow-[0_0_25px_8px_rgba(79,140,255,0.15)] focus:outline-none focus:ring-2 focus:ring-[#7928ca]"
          >
            {submitted ? "Joined!" : "Join"}
          </button>
        </form>
        {submitted && (
          <span className="mt-2 inline-block text-xs text-[#49a4fa] font-semibold">
            Thanks for joining the waitlist!
          </span>
        )}
      </section>
      {/* Features Section */}
      <section className="z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-7 px-4 pb-16">
        {[
          {
            title: "Track Profits",
            desc:
              "Instantly see income, costs, and net profit across all your hustles. Analytics made simple.",
            icon: (
              <svg viewBox="0 0 36 36" width={44} height={44} fill="none">
                <circle cx="18" cy="18" r="16" stroke="#49a4fa" strokeWidth="3" opacity=".13"/>
                <path d="M10 25V18M16 25V14M22 25V21M28 25V12" stroke="#c471f5" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            ),
          },
          {
            title: "Time Optimization",
            desc:
              "Visualize where your precious hours go. Maximize output, minimize wasted time.",
            icon: (
              <svg viewBox="0 0 36 36" width={44} height={44} fill="none">
                <circle cx="18" cy="18" r="16" stroke="#49a4fa" strokeWidth="3" opacity=".13"/>
                <path d="M18 9v9l6 3" stroke="#49a4fa" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            ),
          },
          {
            title: "Consistency Scoring",
            desc:
              "Stay on track with smart streaks, reminders, and gamified progression.",
            icon: (
              <svg viewBox="0 0 36 36" width={44} height={44} fill="none">
                <circle cx="18" cy="18" r="16" stroke="#49a4fa" strokeWidth="3" opacity=".13"/>
                <path d="M18 25c-3-2.5-7-4.5-7-9 0-4 4-6 7-2 3-4 7-2 7 2 0 4.5-4 6.5-7 9z" stroke="#c471f5" strokeWidth="2.5" strokeLinejoin="round"/>
              </svg>
            ),
          },
        ].map((f, i) => (
          <div
            key={f.title}
            className="
              bg-white/10
              rounded-3xl 
              p-7 
              backdrop-blur-xl 
              border border-white/10
              shadow-[0_4px_24px_0_rgba(76,34,173,0.10),0_1.5px_4px_0_rgba(79,140,255,0.09)]
              flex flex-col items-center gap-4
              hover:scale-[1.03] hover:border-white/20 transition-all duration-200
              "
            style={{
              background:
                "linear-gradient(135deg, rgba(76,34,173,0.23) 0%, rgba(79,140,255,0.13) 100%)",
            }}
          >
            <span className="mb-2">{f.icon}</span>
            <h3 className="text-xl font-bold text-white mb-1">{f.title}</h3>
            <p className="text-sm text-zinc-300">{f.desc}</p>
          </div>
        ))}
      </section>
      {/* Mobile Gradient Glow Bottom */}
      <div
        aria-hidden
        className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-0"
      >
        <div className="absolute w-full h-24 bottom-0 left-0 rounded-t-full blur-2xl bg-gradient-to-t from-[#7928ca]/30 to-transparent" />
      </div>
    </main>
  );
}
"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  // Fetch user session on mount
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getSession();

    // Optionally: listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      authListener?.subscription?.unsubscribe?.();
    };
    // eslint-disable-next-line
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a184d] via-[#20123c] to-[#141218] relative">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-transparent z-30">
        <Link href="/" className="text-2xl font-extrabold text-[#c471f5] tracking-tight hover:text-[#7928ca] transition">
          NeonApp
        </Link>
        <div className="flex gap-4 items-center">
          {!user ? (
            <button
              onClick={signInWithGoogle}
              className="px-5 py-2 rounded-full bg-[#7928ca] hover:bg-[#c471f5] text-white font-semibold shadow-[0_4px_24px_0_rgba(124,56,249,0.25)] transition-all hover:scale-105 border border-[#c471f5]/30 focus:outline-none focus:ring-2 focus:ring-[#c471f5]"
            >
              Sign In
            </button>
          ) : (
            <>
              <Link
                className="px-5 py-2 rounded-full bg-[#1a184d] hover:bg-[#341892] text-white font-semibold border border-[#c471f5]/30 transition-all shadow-[0_4px_24px_0_rgba(124,56,249,0.16)] hover:scale-105"
                href="/dashboard"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={signOut}
                className="px-5 py-2 rounded-full bg-transparent border border-[#c471f5] text-[#c471f5] font-semibold hover:bg-[#c471f5] hover:text-white transition-all ml-2 shadow-[0_1px_8px_0_rgba(196,113,245,0.14)] hover:scale-105"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </nav>
      {/* --- rest of landing page content below --- */}
      {/* Move your previous <main> content below here */}
      <div className="flex-1 flex flex-col">
        {/* Content previously in main is preserved below */}
        {/* ... */}
      </div>
      {/* Mobile Gradient Glow Bottom */}
      <div
        aria-hidden
        className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-0"
      >
        <div className="absolute w-full h-24 bottom-0 left-0 rounded-t-full blur-2xl bg-gradient-to-t from-[#7928ca]/30 to-transparent" />
      </div>
    </main>
  );
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Check for an authenticated user on mount
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
      else setUser(null);
    };
    getUser();
    // Optionally subscribe to auth changes to keep in sync
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  // Sign in with Supabase Google OAuth
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined"
          ? `${window.location.origin}/dashboard`
          : undefined,
      },
    });
    if (error) {
      alert("Sign in failed: " + error.message);
    }
    // Supabase will handle the redirect, so nothing else to do here
  };

  // Sign out user
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a184d] via-[#20123c] to-[#141218] relative">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-transparent z-30">
        <Link href="/" className="text-2xl font-extrabold text-[#c471f5] tracking-tight hover:text-[#7928ca] transition">
          NeonApp
        </Link>
        <div className="flex gap-4 items-center">
          {!user ? (
            <button
              onClick={signInWithGoogle}
              className="px-5 py-2 rounded-full bg-[#7928ca] hover:bg-[#c471f5] text-white font-semibold shadow-[0_4px_24px_0_rgba(124,56,249,0.25)] transition-all hover:scale-105 border border-[#c471f5]/30 focus:outline-none focus:ring-2 focus:ring-[#c471f5]"
            >
              Sign In
            </button>
          ) : (
            <>
              <Link
                className="px-5 py-2 rounded-full bg-[#1a184d] hover:bg-[#341892] text-white font-semibold border border-[#c471f5]/30 transition-all shadow-[0_4px_24px_0_rgba(124,56,249,0.16)] hover:scale-105"
                href="/dashboard"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={signOut}
                className="px-5 py-2 rounded-full bg-transparent border border-[#c471f5] text-[#c471f5] font-semibold hover:bg-[#c471f5] hover:text-white transition-all ml-2 shadow-[0_1px_8px_0_rgba(196,113,245,0.14)] hover:scale-105"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </nav>
      {/* --- rest of landing page content below --- */}
      {/* Move your previous <main> content below here */}
      <div className="flex-1 flex flex-col">
        {/* Content previously in main is preserved below */}
        {/* ... */}
      </div>
      {/* Mobile Gradient Glow Bottom */}
      <div
        aria-hidden
        className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-0"
      >
        <div className="absolute w-full h-24 bottom-0 left-0 rounded-t-full blur-2xl bg-gradient-to-t from-[#7928ca]/30 to-transparent" />
      </div>
    </main>
  );
}