'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password);
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-charcoal)] via-[#3D3530] to-[#4A3F38]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[var(--color-terracotta)] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-20 w-96 h-96 bg-[var(--color-gold)] rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[var(--color-sage)] rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: '0.75s' }}></div>
        </div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
              <h1 className="font-display text-5xl font-bold">
                <span className="bg-gradient-to-r from-white via-[var(--color-cream)] to-[var(--color-gold)] bg-clip-text text-transparent">
                  Notes
                </span>
              </h1>
            </Link>
            <p className="text-[var(--color-light-gray)] text-lg">
              Start capturing your thoughts today.
            </p>
          </div>

          <div className="glass-dark rounded-3xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-[var(--color-light-gray)] text-sm mb-8">
              Join us and start your notes journey
            </p>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[var(--color-light-gray)] mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--color-warm-gray)] focus:outline-none focus:border-[var(--color-terracotta)] focus:bg-white/15 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[var(--color-light-gray)] mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--color-warm-gray)] focus:outline-none focus:border-[var(--color-terracotta)] focus:bg-white/15 transition-all"
                  placeholder="••••••••"
                />
                <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
                  Must be at least 6 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-[var(--color-terracotta)] to-[var(--color-gold)] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[var(--color-terracotta)]/30 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account...
                  </span>
                ) : 'Create Account'}
              </button>
            </form>

            <p className="mt-8 text-center text-[var(--color-warm-gray)]">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[var(--color-terracotta-light)] hover:text-white font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          <p className="mt-8 text-center text-[var(--color-warm-gray)]/60 text-sm">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
