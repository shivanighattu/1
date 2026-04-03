'use client';

import { useEffect, useState, type ReactElement } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase: SupabaseClient | null =
  typeof window !== 'undefined' && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
      )
    : null;

type Entry = {
  id: string | number;
  note?: string;
  date: string;
  type: 'income' | 'expense' | string;
  amount: number | string;
  [key: string]: any;
};

type UserType = {
  user_metadata?: {
    full_name?: string;
    [key: string]: any;
  };
  [key: string]: any;
} | null;

export default function Dashboard(): ReactElement | null {
  if (!supabase) return null;

  const [entries, setEntries] = useState<Entry[] | null>([]);
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const load = async (): Promise<void> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/');
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from('entries')
        .select('*')
        .order('date', { ascending: false });

      setEntries(data as Entry[] || []);
      setLoading(false);
    };

    load();
  }, [router]);

  const income: number = ((entries || []) as Entry[])
    .filter((e: Entry) => e.type === 'income')
    .reduce((a: number, e: Entry) => a + Number(e.amount), 0);

  const expenses: number = ((entries || []) as Entry[])
    .filter((e: Entry) => e.type === 'expense')
    .reduce((a: number, e: Entry) => a + Number(e.amount), 0);

  const profit: number = income - expenses;

  const firstName: string =
    (user?.user_metadata?.full_name?.split(' ')[0] as string) ?? 'there';

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#FFF4EE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        color: '#a07050'
      }}>
        Loading your dashboard...
      </div>
    );
  }

  return (
    <>
      <style>{`
        body { margin: 0; background: #FFF4EE; font-family: sans-serif; }

        .dash-wrap {
          max-width: 440px;
          margin: 0 auto;
          padding: 48px 20px 60px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .dash-greeting {
          font-size: 26px;
          font-weight: 900;
          color: #1a1208;
          letter-spacing: -0.03em;
          margin-bottom: 4px;
        }

        .dash-sub {
          font-size: 14px;
          color: #a07050;
          font-weight: 500;
        }

        .glass {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.88);
          border-radius: 24px;
          box-shadow: 0 6px 28px rgba(255,100,50,0.09),
                      inset 0 1px 0 rgba(255,255,255,0.9);
          padding: 20px 22px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }

        .stat-card {
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.88);
          border-radius: 18px;
          padding: 16px 14px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(255,100,50,0.07);
        }

        .stat-val {
          font-size: 22px;
          font-weight: 900;
          color: #1a1208;
          letter-spacing: -0.03em;
        }

        .stat-val.green { color: #2a9d5c; }
        .stat-val.red   { color: #e05040; }
        .stat-val.orange { color: #FF6B35; }

        .stat-label {
          font-size: 11px;
          font-weight: 700;
          color: #b07040;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 4px;
        }

        .section-title {
          font-size: 15px;
          font-weight: 800;
          color: #1a1208;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .entry-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,180,120,0.15);
        }

        .entry-row:last-child { border-bottom: none; }

        .entry-hustle { font-size: 14px; font-weight: 700; color: #1a1208; }
        .entry-note   { font-size: 12px; color: #a07050; font-weight: 500; margin-top: 2px; }

        .entry-amount {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .entry-amount.income  { color: #2a9d5c; }
        .entry-amount.expense { color: #e05040; }

        .empty-state {
          text-align: center;
          color: #b08060;
          font-size: 14px;
          font-weight: 500;
          padding: 24px 0;
        }

        .signout-btn {
          width: 100%;
          padding: 14px;
          background: transparent;
          border: 1px solid rgba(255,150,80,0.3);
          border-radius: 14px;
          color: #b07040;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .signout-btn:hover { background: rgba(255,150,80,0.08); }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#FFF4EE' }}>
        <div className="dash-wrap">

          <div>
            <div className="dash-greeting">Hey {firstName} 👋</div>
            <div className="dash-sub">Here's how your hustle is doing</div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className={`stat-val green`}>${income.toFixed(0)}</div>
              <div className="stat-label">Income</div>
            </div>
            <div className="stat-card">
              <div className="stat-val red">${expenses.toFixed(0)}</div>
              <div className="stat-label">Spent</div>
            </div>
            <div className="stat-card">
              <div className={`stat-val ${profit >= 0 ? 'orange' : 'red'}`}>
                ${Math.abs(profit).toFixed(0)}
              </div>
              <div className="stat-label">Profit</div>
            </div>
          </div>

          <div className="glass">
            <div className="section-title">Recent entries</div>
            {(entries && (entries as Entry[]).length === 0) ? (
              <div className="empty-state">
                No entries yet — log your first hustle!
              </div>
            ) : (
              ((entries || []) as Entry[]).slice(0, 8).map((entry: Entry) => (
                <div className="entry-row" key={entry.id}>
                  <div>
                    <div className="entry-hustle">{entry.note || 'Entry'}</div>
                    <div className="entry-note">{entry.date}</div>
                  </div>
                  <div className={`entry-amount ${entry.type}`}>
                    {entry.type === 'income' ? '+' : '-'}${Number(entry.amount).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            className="signout-btn"
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/');
            }}
          >
            Sign out
          </button>

        </div>
      </div>
    </>
  );
}