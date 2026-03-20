'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="font-display text-2xl font-bold text-[var(--color-charcoal)] hover:text-[var(--color-terracotta)] transition-colors"
          >
            <span className="gradient-text">Notes</span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-blush)]/30">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-gold)] flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[var(--color-warm-gray)] text-sm font-medium">
                    {user.email.split('@')[0]}
                  </span>
                </div>
                <Link
                  href="/profile"
                  className="px-4 py-2 text-[var(--color-warm-gray)] hover:text-[var(--color-terracotta)] transition-colors font-medium cursor-pointer"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-[var(--color-charcoal)] text-white rounded-lg hover:bg-[var(--color-terracotta)] transition-all duration-300 font-medium cursor-pointer hover:shadow-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 text-[var(--color-charcoal)] hover:text-[var(--color-terracotta)] transition-colors font-medium cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn-primary cursor-pointer"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
