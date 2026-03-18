'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Notes App
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-600 hidden sm:inline">
                  {user.username}
                </span>
                <Link
                  href="/profile"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
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
