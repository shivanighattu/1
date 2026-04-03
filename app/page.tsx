'use client';

import * as React from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { MessageCircle, TrendingUp, Target, BarChart2, Repeat } from 'lucide-react';

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

  const breakEvenPercent = 72;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

        body {
          font-family: 'Cabinet Grotesk', sans-serif;
          background: #FFF4EE;
          margin: 0;
        }

        .page-bg {
          min-height: 100vh;
          width: 100%;
          background: #FFF4EE;
          position: relative;
          overflow: hidden;
        }

        .blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.55;
          pointer-events: none;
          z-index: 0;
        }
        .blob-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, #FFBFA0 0%, #FF8C6B 60%, transparent 100%);
          top: -160px; right: -100px;
          animation: drift1 12s ease-in-out infinite alternate;
        }
        .blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #FFD4A8 0%, #FFAB6E 60%, transparent 100%);
          bottom: -80px; left: -80px;
          animation: drift2 15s ease-in-out infinite alternate;
        }
        .blob-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #FFC5B5 0%, #FF9580 60%, transparent 100%);
          top: 40%; left: 50%;
          transform: translate(-50%, -50%);
          animation: drift3 18s ease-in-out infinite alternate;
        }

        @keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(-30px, 40px) scale(1.08); } }
        @keyframes drift2 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px, -30px) scale(1.05); } }
        @keyframes drift3 { from { transform: translate(-50%,-50%) scale(1); } to { transform: translate(-48%,-52%) scale(1.1); } }

        .navbar {
          position: fixed;
          top: 16px;
          left: 0; right: 0;
          z-index: 50;
          display: flex;
          justify-content: center;
          pointer-events: none;
        }
        .navbar-inner {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 400px;
          width: calc(100% - 32px);
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 999px;
          padding: 10px 16px 10px 20px;
          box-shadow: 0 4px 24px rgba(255,120,80,0.12), 0 1px 4px rgba(0,0,0,0.06);
        }
        .navbar-logo {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 900;
          font-size: 18px;
          color: #1a1208;
          letter-spacing: -0.03em;
        }
        .navbar-logo span { color: #FF6B35; }

        .signin-btn {
          background: #1a1208;
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 8px 20px;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          letter-spacing: -0.01em;
        }
        .signin-btn:hover { background: #2d1f0a; }
        .signin-btn:active { transform: scale(0.96); }

        .main {
          position: relative;
          z-index: 1;
          max-width: 440px;
          margin: 0 auto;
          padding: 120px 20px 60px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .hero { text-align: center; padding-bottom: 6px; }
        .hero-eyebrow {
          display: inline-block;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,200,160,0.7);
          border-radius: 999px;
          padding: 4px 14px;
          font-size: 11px;
          font-weight: 700;
          color: #FF6B35;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .hero h1 {
          font-family: 'Cabinet Grotesk', sans-serif;
          font-size: clamp(30px, 8vw, 40px);
          font-weight: 900;
          color: #1a1208;
          line-height: 1.08;
          letter-spacing: -0.04em;
          margin-bottom: 10px;
        }
        .hero h1 em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          font-weight: 400;
          color: #FF6B35;
        }
        .hero p {
          font-size: 15px;
          font-weight: 500;
          color: #8a6040;
          line-height: 1.5;
        }

        .glass-card {
          background: rgba(255,255,255,0.52);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 24px;
          box-shadow: 0 6px 28px rgba(255,100,50,0.09), inset 0 1px 0 rgba(255,255,255,0.9);
          padding: 20px 22px;
          transition: transform 0.2s;
        }
        .glass-card:hover { transform: translateY(-2px); }

        .card-profit {
          background: rgba(255,235,218,0.62);
          border-color: rgba(255,180,130,0.5);
          text-align: center;
        }
        .card-profit .amount {
          font-size: 52px;
          font-weight: 900;
          color: #1a1208;
          letter-spacing: -0.05em;
          line-height: 1;
        }
        .card-profit .amount span { color: #FF6B35; }
        .card-profit .label {
          font-size: 12px; font-weight: 700; color: #b07040;
          text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px;
        }
        .card-profit .sublabel { font-size: 13px; color: #c09060; margin-top: 4px; font-weight: 500; }

        .card-breakeven { background: rgba(255,245,228,0.6); border-color: rgba(255,195,140,0.5); }
        .be-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .be-title { font-size: 15px; font-weight: 800; color: #1a1208; letter-spacing: -0.02em; }
        .be-pct { font-size: 24px; font-weight: 900; color: #FF6B35; letter-spacing: -0.04em; }
        .progress-track { width: 100%; height: 8px; background: rgba(255,160,100,0.2); border-radius: 999px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #FFB347, #FF6B35); border-radius: 999px; transition: width 1s cubic-bezier(.4,0,.2,1); }
        .be-footer { display: flex; justify-content: space-between; margin-top: 8px; font-size: 12px; color: #b07840; font-weight: 600; }

        .bento-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .bento-card {
          background: rgba(255,255,255,0.52);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.88);
          border-radius: 20px;
          box-shadow: 0 4px 16px rgba(255,100,50,0.07), inset 0 1px 0 rgba(255,255,255,0.9);
          padding: 16px;
          transition: transform 0.2s;
        }
        .bento-card:hover { transform: translateY(-2px); }
        .bento-icon {
          width: 34px; height: 34px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
        }
        .bento-icon.orange { background: rgba(255,107,53,0.12); color: #FF6B35; }
        .bento-icon.peach  { background: rgba(255,179,100,0.16); color: #e07030; }
        .bento-icon.amber  { background: rgba(255,200,80,0.16); color: #c07820; }
        .bento-icon.rose   { background: rgba(255,140,110,0.15); color: #e05040; }
        .bento-name { font-size: 13px; font-weight: 800; color: #1a1208; letter-spacing: -0.02em; margin-bottom: 3px; }
        .bento-desc { font-size: 12px; color: #a07050; font-weight: 500; line-height: 1.35; }
        .bento-tag {
          display: inline-block; margin-top: 8px;
          background: rgba(255,107,53,0.1); color: #cc5020;
          font-size: 10px; font-weight: 700; padding: 2px 8px;
          border-radius: 999px; letter-spacing: 0.04em; text-transform: uppercase;
        }
        .bento-tag.pro { background: rgba(255,160,60,0.15); color: #a06010; }

        .mentor-card {
          background: linear-gradient(135deg, rgba(255,225,195,0.68) 0%, rgba(255,205,165,0.6) 100%);
          border-color: rgba(255,175,120,0.55);
          display: flex; gap: 14px; align-items: flex-start;
        }
        .mentor-avatar {
          width: 42px; height: 42px; flex-shrink: 0;
          background: rgba(255,107,53,0.15); border-radius: 13px;
          display: flex; align-items: center; justify-content: center; color: #FF6B35;
        }
        .mentor-title { font-size: 13px; font-weight: 800; color: #1a1208; margin-bottom: 4px; letter-spacing: -0.02em; }
        .mentor-text { font-size: 13px; color: #7a4520; line-height: 1.45; font-weight: 500; }
        .mentor-text strong { color: #FF6B35; font-weight: 800; }

        .cta-wrap { text-align: center; padding-top: 6px; }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #1a1208; color: #fff; border: none; border-radius: 999px;
          padding: 15px 36px;
          font-family: 'Cabinet Grotesk', sans-serif;
          font-weight: 800; font-size: 16px; cursor: pointer;
          letter-spacing: -0.02em;
          box-shadow: 0 8px 24px rgba(26,18,8,0.18);
          transition: background 0.2s, transform 0.15s;
        }
        .cta-btn:hover { background: #2d1f0a; transform: translateY(-1px); }
        .cta-btn:active { transform: scale(0.97); }
        .cta-sub { margin-top: 9px; font-size: 12px; color: #b08060; font-weight: 500; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.55s ease both; }
        .delay-1 { animation-delay: 0.07s; }
        .delay-2 { animation-delay: 0.14s; }
        .delay-3 { animation-delay: 0.21s; }
        .delay-4 { animation-delay: 0.28s; }
        .delay-5 { animation-delay: 0.35s; }
      `}</style>

      <div className="page-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        <nav className="navbar">
          <div className="navbar-inner">
            <span className="navbar-logo">trak<span>kit</span></span>
            <button className="signin-btn" onClick={handleSignIn}>Sign in</button>
          </div>
        </nav>

        <main className="main">

          <div className="hero fade-up">
            <span className="hero-eyebrow">For teen entrepreneurs</span>
            <h1>Your hustle,<br /><em>finally</em> makes sense.</h1>
            <p>Log it, track it, grow it — with an AI mentor that actually gets you.</p>
          </div>

          <div className="glass-card card-profit fade-up delay-1">
            <div className="amount"><span>+</span>$47.00</div>
            <div className="label">This week's profit</div>
            <div className="sublabel">↑ $12 more than last week</div>
          </div>

          <div className="glass-card card-breakeven fade-up delay-2">
            <div className="be-header">
              <span className="be-title">Break-even progress</span>
              <span className="be-pct">{breakEvenPercent}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${breakEvenPercent}%` }} />
            </div>
            <div className="be-footer">
              <span>$72 recovered</span>
              <span>$100 invested</span>
            </div>
          </div>

          <div className="bento-grid fade-up delay-3">
            <div className="bento-card">
              <div className="bento-icon orange"><TrendingUp size={18} /></div>
              <div className="bento-name">Income tracker</div>
              <div className="bento-desc">Log every dollar earned</div>
              <span className="bento-tag">Free</span>
            </div>
            <div className="bento-card">
              <div className="bento-icon peach"><Target size={18} /></div>
              <div className="bento-name">Goals</div>
              <div className="bento-desc">Watch the bar fill up</div>
              <span className="bento-tag">Free</span>
            </div>
            <div className="bento-card">
              <div className="bento-icon amber"><BarChart2 size={18} /></div>
              <div className="bento-name">Tax estimator</div>
              <div className="bento-desc">Know what to set aside</div>
              <span className="bento-tag pro">Pro</span>
            </div>
            <div className="bento-card">
              <div className="bento-icon rose"><Repeat size={18} /></div>
              <div className="bento-name">Forecast</div>
              <div className="bento-desc">See your next 30 days</div>
              <span className="bento-tag pro">Pro</span>
            </div>
          </div>

          <div className="glass-card mentor-card fade-up delay-4">
            <div className="mentor-avatar">
              <MessageCircle size={20} />
            </div>
            <div>
              <div className="mentor-title">Your AI mentor says —</div>
              <div className="mentor-text">
                Your tutoring earns <strong>3× more</strong> per hour than reselling.
                Shift 2 extra hours a week and hit your goal <strong>18 days sooner.</strong>
              </div>
            </div>
          </div>

          <div className="cta-wrap fade-up delay-5">
            <button className="cta-btn" onClick={handleSignIn}>
              Start for free →
            </button>
            <div className="cta-sub">No credit card · Free forever on basic</div>
          </div>

        </main>
      </div>
    </>
  );
}