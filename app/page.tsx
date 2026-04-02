'use client'

import '@fontsource/geist-sans/400.css'
import '@fontsource/geist-sans/500.css'
import '@fontsource/geist-sans/600.css'
import '@fontsource/geist-sans/700.css'
import '@fontsource/geist-sans/800.css'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useCallback, useMemo } from 'react'

export default function Home() {
  const supabase = useMemo(
    () =>
      createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      ),
    []
  )

  const handleSignIn = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) {
      alert('Sign in failed: ' + error.message)
    }
  }, [supabase])

  return (
    <main style={{ fontFamily: "'Geist Sans', system-ui, sans-serif", minHeight: '100vh', background: '#121217', color: '#fff', paddingTop: 0, boxSizing: 'border-box' }}>
      {/* Glassmorphism Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 10,
        backdropFilter: 'blur(16px)',
        background: 'rgba(30,30,32,0.65)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2.2rem',
        height: '64px',
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.15)'
      }}>
        <span style={{
          fontWeight: 700,
          fontSize: '1.45rem',
          letterSpacing: '-0.03em',
          color: '#fff',
          background: 'linear-gradient(90deg,#b0b6ff,#f8e7ff 95%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Trakkit
        </span>
        <button
          onClick={handleSignIn}
          style={{
            background: 'rgba(255,255,255,0.13)',
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.04)',
            borderRadius: '999px',
            color: '#fff',
            padding: '9px 26px',
            fontSize: '1.05rem',
            backdropFilter: 'blur(10px)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background .18s,border .18s'
          }}
        >
          Sign In
        </button>
      </nav>

      <section style={{
        maxWidth: 820,
        margin: '0 auto',
        padding: '120px 0 32px 0',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Hero Title */}
        <h1 style={{
          fontSize: '2.90rem',
          fontWeight: 800,
          letterSpacing: '-0.045em',
          margin: '0.85em 0 .55em 0',
          color: '#fff',
          lineHeight: 1.06,
          textShadow: '0 2px 20px rgba(38,38,48,0.18)'
        }}>
          The Side Hustle&nbsp;
          <span style={{
            background: 'linear-gradient(90deg,#a1efff 40%,#fcaecb 95%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline'
          }}>Co-Pilot</span>
        </h1>
        <p style={{
          maxWidth: 520,
          margin: '0 auto 1.8em auto',
          fontSize: '1.24rem',
          color: '#dadada',
          lineHeight: 1.56,
          fontWeight: 400,
          letterSpacing: '-0.01em'
        }}>
          Unlock your next project. Organize, track and focus your entrepreneurial journey—all in one spot.
        </p>
      </section>

      {/* Features */}
      <section style={{
        display: 'flex',
        gap: 32,
        maxWidth: 960,
        margin: '0 auto',
        padding: '10px 16px 0 16px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <FeatureCard
          title="Goal Tracking"
          icon="📈"
          desc="Set, track, and smash your business objectives with visual progress and deadline reminders."
        />
        <FeatureCard
          title="Idea Hub"
          icon="💡"
          desc="Capture, organize, and vote on new ideas, opportunities, and experiments as they spark."
        />
        <FeatureCard
          title="Automated Insights"
          icon="🤖"
          desc="Get actionable analytics, trends, and smart nudges to keep you moving confidently."
        />
      </section>
    </main>
  )
}

function FeatureCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div style={{
      flex: '1 1 280px',
      minWidth: 280,
      maxWidth: 330,
      background: 'rgba(34,34,42,0.62)',
      borderRadius: 22,
      border: '1.5px solid rgba(255,255,255,0.08)',
      boxShadow: '0 6px 32px 0 rgba(30,30,45,0.17)',
      padding: '34px 23px 31px 23px',
      margin: '16px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      backdropFilter: 'blur(8px)',
      transition: 'box-shadow .18s'
    }}>
      <span style={{
        fontSize: '2.05rem',
        marginBottom: 16,
        filter: 'drop-shadow(0px 4px 12px rgba(180,255,220,0.12))'
      }}>{icon}</span>
      <p style={{
        fontWeight: 700,
        fontSize: '1.18rem',
        margin: '0 0 8px 0',
        color: '#fff',
        letterSpacing: '-0.01em'
      }}>{title}</p>
      <p style={{
        fontWeight: 400,
        fontSize: '1.01rem',
        color: '#e0e0e0',
        marginBottom: 0
      }}>{desc}</p>
    </div>
  )
}
