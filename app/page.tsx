'use client';

import { useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const handleLogin = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F9F9F4',
        fontFamily: 'var(--font-geist-sans), sans-serif',
        color: '#18181B',
        letterSpacing: '-0.01em',
      }}
    >
      {/* Floating Navbar */}
      <nav
        style={{
          zIndex: 10,
          position: 'fixed',
          top: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0.375rem 1.25rem',
          background: '#fff',
          borderRadius: '9999px',
          boxShadow: '0 2px 24px rgba(80,80,50,0.07)',
          border: '1px solid #E4E4DD',
          display: 'flex',
          alignItems: 'center',
          minWidth: 360,
          maxWidth: 'calc(100vw - 2rem)',
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: '-0.04em',
            color: '#222',
            marginRight: 28,
            userSelect: 'none',
          }}
        >
          Trakkit
        </span>
        <div style={{ flex: 1 }} />
        <button
          type="button"
          onClick={handleLogin}
          style={{
            background: '#fff',
            color: '#18181B',
            border: '1px solid #111',
            borderRadius: '22px',
            fontWeight: 600,
            fontSize: 17,
            padding: '0.45rem 1.25rem',
            boxShadow: '0 1px 8px rgba(40,40,33,0.04)',
            cursor: 'pointer',
            transition: 'box-shadow .14s, border-color .3s',
            outline: 'none',
          }}
        >
          Sign In
        </button>
      </nav>

      {/* Main Content */}
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 160,
          paddingBottom: 64,
          gap: 64,
        }}
      >
        {/* Hero Section */}
        <header style={{ textAlign: 'center', maxWidth: 620 }}>
          <h1
            style={{
              fontSize: '2.8rem',
              letterSpacing: '-0.04em',
              fontWeight: 750,
              margin: 0,
              color: '#20201C',
              lineHeight: 1.08,
            }}
          >
            Your Side Hustle, Simplified.
          </h1>
          <p
            style={{
              fontSize: '1.4rem',
              color: '#54545A',
              marginTop: 20,
              fontWeight: 450,
              letterSpacing: '-0.01em',
              lineHeight: 1.32,
            }}
          >
            Log every dollar, see your progress, and grow your empire without the spreadsheets.
          </p>
        </header>

        {/* Progress Preview Card */}
        <section
          style={{
            marginTop: 36,
            display: 'flex',
            gap: 32,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(108deg, #FFE6EA 0%, #E2FFEB 70%, #E8E6FF 100%)',
              borderRadius: 36,
              boxShadow: '0 4px 36px rgba(100, 100, 90, 0.10)',
              padding: '2.5rem 2.3rem 2.3rem 2.3rem',
              minWidth: 340,
              maxWidth: 410,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              position: 'relative',
            }}
          >
            <span
              style={{
                fontSize: 21,
                fontWeight: 600,
                marginBottom: 30,
                color: '#31493C',
                letterSpacing: '-0.02em',
              }}
            >
              Break-even Timeline
            </span>
            {/* Mock timeline */}
            <div style={{ width: '100%', margin: '18px 0 6px 0' }}>
              <div
                style={{
                  height: 8,
                  background:
                    'linear-gradient(90deg, #FFD9DA 0%, #B8EFD9 70%, #DDDAFD 100%)',
                  borderRadius: 10,
                  position: 'relative',
                  boxShadow: '0 1px 11px 0 rgba(40,70,50,0.08)',
                }}
              >
                {/* Progress marker */}
                <div
                  style={{
                    position: 'absolute',
                    left: '64%',
                    top: -4,
                    transform: 'translateX(-50%)',
                    width: 22,
                    height: 22,
                    background: '#333',
                    borderRadius: '50%',
                    border: '3px solid #EDF7F8',
                    boxShadow: '0 2px 8px #DDF0E6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#A5F3C9',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  color: '#A69AAF',
                  fontWeight: 500,
                  marginTop: 8,
                  paddingLeft: 2,
                  paddingRight: 4,
                }}
              >
                <span>Today</span>
                <span>Break-even</span>
              </div>
            </div>
            {/* +$47 this week badge */}
            <div
              style={{
                position: 'absolute',
                top: 33,
                right: 34,
                background:
                  'linear-gradient(90deg,#D4FCEB 44%,#FFE6EA 120%)',
                color: '#226857',
                borderRadius: 27,
                fontWeight: 650,
                fontSize: 17,
                padding: '0.32em 1.25em',
                boxShadow: '0 1px 7px #ddeef5b3',
                border: '1.3px solid #BEF7CA',
                letterSpacing: '-0.01em',
              }}
            >
              +$47 <span style={{ fontWeight: 550, color: '#647863' }}>this week</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
