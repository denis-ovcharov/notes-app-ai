'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthProvider';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
    router.refresh();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card-elevated p-10 text-center max-w-md w-full animate-scale-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-blush)] flex items-center justify-center">
            <svg className="w-8 h-8 text-[var(--color-terracotta)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-charcoal)] mb-3">
            Welcome
          </h1>
          <p className="text-[var(--color-warm-gray)] mb-8">
            You need to be logged in to view your profile.
          </p>
          <Link
            href="/login"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="card-elevated p-8 animate-fade-in-up">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[var(--color-light-gray)]">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-gold)] flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl font-bold">
                {user.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-[var(--color-charcoal)]">
                Profile
              </h1>
              <p className="text-[var(--color-warm-gray)]">Manage your account</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-warm-gray)] mb-3 uppercase tracking-wider">
                Email Address
              </label>
              <div className="flex items-center gap-3 px-5 py-4 bg-[var(--color-cream)] rounded-xl border border-[var(--color-light-gray)]">
                <svg className="w-5 h-5 text-[var(--color-warm-gray)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[var(--color-charcoal)] font-medium">
                  {user.email}
                </span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleLogout}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--color-warm-gray)] hover:text-[var(--color-terracotta)] transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Notes
          </Link>
        </div>
      </main>
    </div>
  );
}
