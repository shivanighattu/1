"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";

// --- Font: Geist Variable (assumes it's added in _app or via fontsource) ---
const geistFont = {
  fontFamily:
    "'Geist Sans', 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontFeatureSettings: "'ss01' on, 'cv11' on, 'cv12' on",
};

// --- Color Constants ---
const COLORS = {
  bg: "#111111",
  border: "#222222",
  lilac: "#c4b5fd",
  blue: "#60a5fa",
  purple: "#7c3aed",
  white: "#fff",
  glass: "rgba(26,26,32,0.65)",
  cardBorder: "rgba(160,160,190,0.09)",
};

const supabase = createClientComponentClient();

export default function LandingPage() {
  const [user, setUser] = useState<User | null>(null);

  // Get session on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, sess) => {
      setUser(sess?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Google sign in/out handlers
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: "100vh",
        ...geistFont,
      }}
      className="relative flex flex-col items-center"
    >
      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md"
        style={{
          background: COLORS.glass,
          borderBottom: `1px solid ${COLORS.border}`,
          boxShadow: "0 1px 12px 0 rgba(16,16,24,0.08)",
        }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <div
              style={{
                background: `linear-gradient(90deg, ${COLORS.lilac}, ${COLORS.purple})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 900,
                letterSpacing: "-0.05em",
                fontSize: 22,
                ...geistFont,
              }}
              className="font-extrabold select-none tracking-tight"
            >
              Trakkit
            </div>
          </div>
          <div className="flex items-center gap-4">
            {!user ? (
              <button
                onClick={handleSignIn}
                className="px-4 py-2 font-normal rounded-md border transition-all"
                style={{
                  borderColor: COLORS.white,
                  background: COLORS.bg,
                  color: COLORS.white,
                  boxShadow:
                    "0 2px 8px 0 rgba(24,24,32,0.06), 0 1.5px 5px 0 rgba(44,44,54,0.02)",
                  ...geistFont,
                }}
              >
                <span className="flex items-center gap-2">
                  <GoogleIcon />
                  Sign in with Google
                </span>
              </button>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-white px-3 py-2 rounded-md font-normal transition-all hover:bg-[#18181c] border border-transparent"
                  style={{ ...geistFont }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="pl-4 pr-5 py-2 rounded-md border border-white text-white font-normal transition-colors hover:bg-[#1a1a22] hover:border-[#7c3aed] ml-2"
                  style={{
                    boxShadow: "0 2px 8px 0 rgba(44,44,54,0.03)",
                    ...geistFont,
                  }}
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-start pt-32 pb-20 w-full"
        style={{ minHeight: "70vh" }}
      >
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold"
          style={{
            ...geistFont,
            letterSpacing: "-0.04em",
            fontWeight: 900,
            lineHeight: "1.07",
            textAlign: "center",
            background: `linear-gradient(90deg, ${COLORS.lilac}, ${COLORS.blue})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "24px",
            marginTop: 0,
          }}
        >
          The Side Hustle Co-Pilot for Students
        </h1>
        <p
          className="mt-5 max-w-xl text-lg font-normal text-neutral-300 antialiased text-center"
          style={{ ...geistFont, marginBottom: "32px" }}
        >
          Trakkit helps student creators profit, manage their time, and stay consistent—so side hustles can thrive alongside real life.
        </p>
        <button
          className="group flex items-center px-7 py-3 text-lg font-semibold rounded-lg text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#7c3aed] shadow"
          style={{
            background: COLORS.purple,
            marginTop: 4,
            boxShadow: "0 3px 18px 0 rgba(72,28,140,0.11)",
            ...geistFont,
          }}
        >
          <span>Join Waitlist</span>
        </button>
      </section>

      {/* Features: Glassmorphism Card Deck */}
      <section
        className="w-full flex flex-col items-center"
        style={{ marginTop: 8, marginBottom: "80px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full px-6">
          <FeatureCard
            icon={<ProfitIcon />}
            title="Profit"
            description="Effortlessly track earnings, expenses, and growth. Maximize every dollar and see your side hustle’s value in real time."
            accentColor={COLORS.lilac}
          />
          <FeatureCard
            icon={<TimeIcon />}
            title="Time"
            description="Smart routines, schedules, and automations help you protect your time—juggling classes and side projects like a pro."
            accentColor={COLORS.blue}
          />
          <FeatureCard
            icon={<ConsistencyIcon />}
            title="Consistency"
            description="Never drop the ball. Automated reminders, progress streaks, and gentle nudges to keep momentum (even on tough weeks)."
            accentColor={COLORS.purple}
          />
        </div>
      </section>
    </div>
  );
}

// --- Google Icon ---
function GoogleIcon() {
  return (
    <svg width="19" height="19" fill="none" viewBox="0 0 19 19">
      <g>
        <path
          d="M17.64 9.204c0-.638-.057-1.25-.164-1.833H9.5v3.471h4.567a3.919 3.919 0 0 1-1.7 2.555v2.12h2.756c1.615-1.488 2.547-3.679 2.547-6.313z"
          fill="#4285F4"
        />
        <path
          d="M9.5 18.001c2.295 0 4.218-.76 5.624-2.059l-2.757-2.12c-.765.51-1.744.808-2.868.808-2.205 0-4.075-1.488-4.75-3.486H1.875v2.185A8.498 8.498 0 0 0 9.5 18z"
          fill="#34A853"
        />
        <path
          d="M4.75 11.144A5.097 5.097 0 0 1 4.36 9.5c0-.571.098-1.126.273-1.643V5.67H1.874A8.506 8.506 0 0 0 1 9.5c0 1.335.32 2.598.874 3.715l2.876-2.07z"
          fill="#FBBC05"
        />
        <path
          d="M9.5 3.778c1.251 0 2.37.431 3.25 1.278l2.438-2.438C13.715 1.148 11.793.5 9.5.5A8.498 8.498 0 0 0 1.874 5.67l2.876 2.185C5.425 5.965 7.295 3.778 9.5 3.778z"
          fill="#EA4335"
        />
      </g>
    </svg>
  );
}

// --- Feature Card Component ---
function FeatureCard({
  icon,
  title,
  description,
  accentColor,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}) {
  return (
    <div
      className="rounded-2xl p-7 shadow-lg transition-all feature-glass"
      style={{
        background: "rgba(26,26,32,0.54)",
        backdropFilter: "blur(19px)",
        WebkitBackdropFilter: "blur(19px)",
        border: `1.2px solid ${COLORS.cardBorder}`,
        boxShadow:
          "0 8px 32px 0 rgba(24,24,40,0.21), 0 0.5px 3px 0 rgba(44,44,54,0.02)",
        minHeight: "280px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        ...geistFont,
      }}
    >
      <div
        className="mb-4"
        style={{
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}11)`,
          boxShadow: `0 2px 14px 0 ${accentColor}33`,
        }}
      >
        {/* icon */}
        <span style={{ color: accentColor, fontSize: 29 }}>{icon}</span>
      </div>
      <h3
        className="font-extrabold text-xl mb-2"
        style={{
          ...geistFont,
          letterSpacing: "-0.025em",
          fontWeight: 800,
          color: "#fff",
        }}
      >
        {title}
      </h3>
      <p
        className="text-neutral-300 font-normal text-base antialiased"
        style={{ ...geistFont }}
      >
        {description}
      </p>
    </div>
  );
}

// --- SVG Icons used for feature cards ---

function ProfitIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 26 26">
      <rect x="1.5" y="5.5" width="23" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
      <rect x="6" y="1" width="14" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M13 17v-4m0 4c.6 0 1.25-.45 1.25-1.25S13.6 14.5 13 14.5s-1.25.45-1.25 1.25S12.4 17 13 17z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function TimeIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 26 26">
      <circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M13 8v5l3 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function ConsistencyIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 26 26">
      <rect x="4.5" y="6.5" width="17" height="13" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M8.5 3.5v6m9-6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9.5 14l2.5 2.5 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}