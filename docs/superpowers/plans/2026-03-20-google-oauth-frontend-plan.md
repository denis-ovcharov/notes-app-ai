# Google OAuth Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Google OAuth login to Next.js frontend using Google Identity Services SDK

**Architecture:** Frontend calls backend for OAuth URL, redirects to Google, receives code, exchanges for JWT tokens.

**Tech Stack:** Next.js, Google Identity Services SDK, Tailwind CSS

---

## File Structure

```
src/
├── app/
│   └── auth/
│       └── google/
│           └── callback/
│               └── page.tsx     # NEW - OAuth callback handler
├── lib/
│   └── api.ts                   # + Google OAuth functions
├── components/
│   └── AuthProvider.tsx          # + loginWithGoogle helper
├── app/
│   └── login/
│       └── page.tsx             # + Google Sign-In button
.env.local                        # verify NEXT_PUBLIC_BACKEND_URL
```

---

## Tasks

### Task 1: Add Google OAuth API functions

**Files:**
- Modify: `src/lib/api.ts`

- [ ] **Step 1: Add Google OAuth API functions**

Add these functions at the end of `src/lib/api.ts`:

```typescript
export async function getGoogleAuthUrl(): Promise<{ url: string }> {
  const response = await fetch(`${BACKEND_URL}/auth/google`);
  if (!response.ok) {
    throw new Error('Failed to get Google auth URL');
  }
  const data = await response.json();
  return data.data;
}

export async function googleCallback(code: string): Promise<{
  user: { id: string; email: string };
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}> {
  const response = await fetch(`${BACKEND_URL}/auth/google/callback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'OAuth callback failed' }));
    throw new Error(error.message || 'OAuth callback failed');
  }
  
  const data = await response.json();
  return data.data;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build` in the frontend directory
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/api.ts
git commit -m "feat: add Google OAuth API functions"
```

---

### Task 2: Create OAuth callback page

**Files:**
- Create: `src/app/auth/google/callback/page.tsx`

- [ ] **Step 1: Create the callback page**

Create directory `src/app/auth/google/callback/` and file `page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { googleCallback } from '@/lib/api';
import { setAuthTokens } from '@/lib/api';

export default function GoogleCallbackPage() {
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

    async function handleCallback() {
      try {
        const data = await googleCallback(code);
        
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
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/auth/google/callback/page.tsx
git commit -m "feat: add Google OAuth callback page"
```

---

### Task 3: Add Google Sign-In button to login page

**Files:**
- Modify: `src/app/login/page.tsx`

- [ ] **Step 1: Add Google Sign-In button**

Add this import at the top:
```typescript
import { getGoogleAuthUrl } from '@/lib/api';
```

Add a new handler function after `handleSubmit`:
```typescript
const handleGoogleLogin = async () => {
  try {
    const { url } = await getGoogleAuthUrl();
    window.location.href = url;
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to start Google login');
  }
};
```

Add the button after the form's submit button (before `</form>`):
```tsx
<div className="relative my-4">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-gray-300"></div>
  </div>
  <div className="relative flex justify-center text-sm">
    <span className="px-2 bg-white text-gray-500">or</span>
  </div>
</div>

<button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-md flex items-center justify-center gap-3"
>
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
  Sign in with Google
</button>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/login/page.tsx
git commit -m "feat: add Google Sign-In button to login page"
```

---

## Summary

After implementation:
1. Login page will show "Sign in with Google" button
2. Clicking it redirects to Google OAuth
3. After authorization, Google redirects to `/auth/google/callback?code=XXX`
4. Callback page exchanges code for tokens and redirects to home

## Environment

Ensure `.env.local` has:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```
(Should already exist)
