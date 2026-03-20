'use client';

import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/components/AuthProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-warm-white)',
            color: 'var(--color-charcoal)',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 10px 40px rgba(45, 41, 38, 0.15)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#8B9D77',
              secondary: 'white',
            },
            style: {
              border: '1px solid rgba(139, 157, 119, 0.3)',
            },
          },
          error: {
            iconTheme: {
              primary: '#C75D3A',
              secondary: 'white',
            },
            style: {
              border: '1px solid rgba(199, 93, 58, 0.3)',
            },
          },
        }}
      />
    </AuthProvider>
  );
}
