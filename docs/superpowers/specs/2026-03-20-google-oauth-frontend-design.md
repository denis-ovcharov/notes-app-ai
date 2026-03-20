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
6. Frontend parses code from URL
7. Frontend: POST /auth/google/callback { code } → receives JWT
8. Store tokens, redirect to home page
```

### File Changes
```
src/app/login/page.tsx     # + Google Sign-In button
src/lib/api.ts             # + Google OAuth functions
.env.local                 # + NEXT_PUBLIC_API_URL
```

## Components

### Login Page (src/app/login/page.tsx)
- Google Sign-In button (GIS SDK)
- Existing email/password form
- Error handling via alert

### API Client (src/lib/api.ts)
- `getGoogleAuthUrl()` - GET /auth/google
- `googleCallback(code)` - POST /auth/google/callback

## Environment Variables
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Error Handling
- OAuth errors shown via browser alert()
- User stays on login page on error
- URL cleared of code parameter after processing
