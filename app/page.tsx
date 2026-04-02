"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { Session } from "@supabase/supabase-js";

const geist =
  "https://fonts.googleapis.com/css2?family=Geist:wght@400;600&display=swap";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function Navbar({ session }: { session: Session | null }) {
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    // This will hand off to Google, but if pop-up fails etc., let user retry
    setLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#191A1B",
        padding: "1.5rem 2rem",
        borderBottom: "1px solid #232425",
      }}
    >
      <span
        style={{
          fontWeight: 600,
          color: "#fff",
          fontSize: "1.25rem",
          letterSpacing: "0.01em",
        }}
      >
        CharcoalApp
      </span>
      {session ? (
        <button
          style={{
            fontFamily: "Geist, sans-serif",
            background: "#191A1B",
            color: "#FAFAFA",
            border: "1px solid #232425",
            borderRadius: "0.4rem",
            padding: "0.6rem 1.25rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
          onClick={signOut}
        >
          Sign Out
        </button>
      ) : (
        <button
          style={{
            fontFamily: "Geist, sans-serif",
            background: "#262728",
            color: "#FAFAFA",
            border: "1px solid #252525",
            borderRadius: "0.4rem",
            padding: "0.6rem 1.25rem",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            display: "flex",
            alignItems: "center",
            gap: "0.6em",
            transition: "background 0.2s, color 0.2s, opacity 0.2s",
          }}
          disabled={loading}
          onClick={signInWithGoogle}
        >
          <svg
            style={{ height: "1.1em", width: "1.1em" }}
            viewBox="0 0 18 18"
            fill="none"
          >
            <g>
              <path
                d="M17.64 9.2045c0-.638-.0573-1.2518-.1645-1.8409H9v3.481h4.8445c-.2082 1.124-0.8346 2.0764-1.7764 2.7195v2.258h2.873c1.679-1.5481 2.644-3.8291 2.644-6.6176z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.403 0 4.419-0.801 5.892-2.179l-2.873-2.258c-0.796 0.534-1.811 0.851-3.019 0.851-2.322 0-4.287-1.569-4.99-3.682h-2.993v2.312a9 9 0 0 0 8.983 7.956z"
                fill="#34A853"
              />
              <path
                d="M4.01 10.732A5.411 5.411 0 0 1 3.615 9c0-0.599 0.105-1.175 0.295-1.732v-2.312h-2.993A8.9773 8.9773 0 0 0 0 9c0 1.536 0.37 2.994 1.027 4.256l2.983-2.524z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.579c1.31 0 2.475 0.4506 3.398 1.335l2.548-2.548C13.416 0.801 11.401 0 9 0A8.9773 8.9773 0 0 0 0 9l2.983 2.524c0.703-2.113 2.668-3.682 4.99-3.682 1.021 0 1.956 0.328 2.754 0.876V3.579z"
                fill="#EA4335"
              />
            </g>
          </svg>
          {loading ? "Loading..." : "Sign In"}
        </button>
      )}
    </nav>
  );
}

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    // Check on mount
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#141516",
        fontFamily: "Geist, sans-serif",
        color: "#FAFAFA",
      }}
    >
      {/* Inject Geist font */}
      <link href={geist} rel="stylesheet" />
      <Navbar session={session} />
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "8vh",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Geist, sans-serif",
            fontSize: "2.75rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#fff",
            marginBottom: "0.7em",
          }}
        >
          Welcome to the Charcoal App
        </h1>
        <p
          style={{
            fontFamily: "Geist, sans-serif",
            fontSize: "1.28rem",
            color: "#C7C9CB",
            maxWidth: "36rem",
            margin: "0 auto 2.5em",
            lineHeight: 1.6,
          }}
        >
          Ultra-clean, secure, and modern Next.js template leveraging Supabase SSR and professional UI design. <br />
          Sign in to get started with a world-class developer experience.
        </p>
        {!session && (
          <div>
            <span
              style={{
                fontFamily: "Geist, sans-serif",
                background: "#232425",
                color: "#E8EAED",
                borderRadius: "0.4em",
                padding: "0.75em 1.6em",
                fontWeight: 600,
                fontSize: "1.1rem",
                letterSpacing: "0.01em",
                boxShadow: "0 1px 8px 0 rgba(0,0,0,0.12)",
              }}
            >
              Please sign in above to continue.
            </span>
          </div>
        )}
        {session && (
          <div
            style={{
              marginTop: "2em",
              background: "#18191B",
              borderRadius: ".75rem",
              padding: "2em 2.5em",
              maxWidth: "28rem",
              boxShadow: "0 2px 16px 0 rgba(0,0,0,0.16)",
            }}
          >
            <p
              style={{
                color: "#9AA0A6",
                fontSize: "1.04rem",
                marginBottom: "0.7em",
                fontFamily: "Geist, sans-serif",
              }}
            >
              You&apos;re signed in as:
            </p>
            <div
              style={{
                fontFamily: "Geist, sans-serif",
                fontWeight: 600,
                fontSize: "1.18rem",
                color: "#FAFAFA",
                wordBreak: "break-all",
              }}
            >
              {session.user.email}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}