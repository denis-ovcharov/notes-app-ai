'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { googleCallback } from '@/lib/api';
import { setAuthTokens } from '@/lib/api';

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      alert(`OAuth error: ${errorParam}`);
      router.push('/login');
      return;
    }

    if (!code) {
      setError('No authorization code received');
      return;
    }

    const authCode = code;

    async function handleCallback() {
      try {
        const data = await googleCallback(authCode);
        
        setAuthTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        window.location.href = '/';
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Authentication failed';
        alert(message);
        window.location.href = '/login';
      }
    }

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-charcoal)] via-[#3D3530] to-[#4A3F38]"></div>
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <div className="text-center animate-scale-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-3">Authentication Failed</h1>
            <p className="text-[var(--color-light-gray)] mb-8">{error}</p>
            <button
              onClick={() => router.push('/login')}
              className="btn-primary cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-charcoal)] via-[#3D3530] to-[#4A3F38]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[var(--color-terracotta)] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[var(--color-gold)] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
      
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center animate-fade-in-up">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-terracotta)] to-[var(--color-gold)] animate-ping opacity-20"></div>
            <div className="relative w-full h-full rounded-full bg-gradient-to-r from-[var(--color-terracotta)] to-[var(--color-gold)] flex items-center justify-center">
              <svg className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
          
          <h1 className="font-display text-3xl font-bold text-white mb-3">
            Signing you in
          </h1>
          <p className="text-[var(--color-light-gray)] text-lg mb-8">
            Completing Google authentication...
          </p>
          
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-terracotta)] animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 rounded-full bg-[var(--color-gold)] animate-bounce" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-2 h-2 rounded-full bg-[var(--color-sage)] animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-charcoal)] via-[#3D3530] to-[#4A3F38]"></div>
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-[var(--color-light-gray)] border-t-[var(--color-terracotta)] animate-spin"></div>
          <p className="text-[var(--color-light-gray)]">Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GoogleCallbackContent />
    </Suspense>
  );
}
