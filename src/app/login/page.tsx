'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { getGoogleAuthUrl } from '@/lib/api';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
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
      await login(email, password);
      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const { url } = await getGoogleAuthUrl();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start Google login');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-charcoal)] via-[#3D3530] to-[#4A3F38]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[var(--color-terracotta)] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-[var(--color-gold)] rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[var(--color-sage)] rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: '0.75s' }}></div>
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
              Welcome back. Let&apos;s continue your journey.
            </p>
          </div>

          <div className="glass-dark rounded-3xl p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Sign In
            </h2>
            <p className="text-[var(--color-light-gray)] text-sm mb-8">
              Enter your credentials to access your notes
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
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--color-warm-gray)] focus:outline-none focus:border-[var(--color-terracotta)] focus:bg-white/15 transition-all"
                  placeholder="••••••••"
                />
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
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-[var(--color-warm-gray)]">or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-4 bg-white text-[var(--color-charcoal)] rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 hover:shadow-lg"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            <p className="mt-8 text-center text-[var(--color-warm-gray)]">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-[var(--color-terracotta-light)] hover:text-white font-medium transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>

          <p className="mt-8 text-center text-[var(--color-warm-gray)]/60 text-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
