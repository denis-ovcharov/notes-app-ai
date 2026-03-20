# Google OAuth Frontend Integration Design

## Overview

Add Google OAuth login to the Next.js frontend using Google Identity Services SDK.

## Architecture

### OAuth Flow
```
1. User clicks "Sign in with Google" button
2. Frontend: GET /auth/google → receives OAuth URL
3. window.location.href = OAuth URL (redirect to Google)
4. User authorizes on Google
5. Google → redirect to /auth/google/callback?code=XXX
6. Frontend parses code from URL, clears URL
7. Frontend: POST /auth/google/callback { code } → receives JWT
8. Store tokens via setAuthTokens(), redirect to home
```

### File Changes
```
src/app/auth/google/callback/page.tsx  # NEW - handles callback
src/app/login/page.tsx                # + Google Sign-In button
src/lib/api.ts                       # + Google OAuth functions
src/components/AuthProvider.tsx       # + loginWithGoogle function
.env.local                            # already has NEXT_PUBLIC_BACKEND_URL
```

## Components

### Callback Page (src/app/auth/google/callback/page.tsx)
- Parses `?code=XXX` from URL
- Calls POST /auth/google/callback
- Stores tokens via `setAuthTokens()`
- Clears code from URL (privacy)
- Redirects to home on success
- Shows alert on error, redirects to login

### Login Page (src/app/login/page.tsx)
- Google Sign-In button (GIS SDK) - above email form
- Existing email/password form
- Error handling via alert

### API Client (src/lib/api.ts)
- `getGoogleAuthUrl()` - GET /auth/google, returns { url }
- `googleCallback(code)` - POST /auth/google/callback, returns tokens

### AuthProvider (src/components/AuthProvider.tsx)
- `loginWithGoogle()` - handles full OAuth flow, calls loginWithGoogle from page

## Token Storage
- Uses existing `setAuthTokens()` function
- Tokens stored in localStorage as `accessToken` and `refreshToken`

## Environment Variables
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```
(Already exists in .env.local)

## Error Handling
- OAuth errors shown via browser alert()
- User redirected to /login on error
- URL cleared of code parameter after processing

## Google OAuth Flow

1. **Frontend calls GET /auth/google** - backend returns { url: "https://accounts.google.com/..." }
2. **Redirect to Google** - user logs in
3. **Google redirects to /auth/google/callback?code=XXX**
4. **Callback page extracts code** - parses URL, makes POST request
5. **Callback page stores tokens** - calls setAuthTokens()
6. **Redirect to /** - home page loads with auth

## Security Notes
- Code is single-use (backend invalidates after exchange)
- URL cleared after processing to prevent token leakage
- State parameter could be added for CSRF protection (future enhancement)
