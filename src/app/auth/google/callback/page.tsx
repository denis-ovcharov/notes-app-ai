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

        window.history.replaceState({}, '', '/auth/google/callback');
        
        router.push('/');
        router.refresh();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Authentication failed';
        setError(message);
        alert(message);
        router.push('/login');
      }
    }

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Logging you in...</h1>
        <p className="text-gray-600">Please wait while we complete the sign-in process.</p>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
        <p className="text-gray-600">Please wait while we complete the sign-in process.</p>
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
