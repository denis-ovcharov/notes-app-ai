'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthTokens } from '@/types/user';
import { apiRequest, setAuthTokens, getAuthTokens, removeAuthTokens } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const tokens = getAuthTokens();
    if (!tokens?.accessToken) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiRequest<{ data: { user: User } }>('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    console.log('Login called with:', email);
    const response = await apiRequest<{ data: { user: User; accessToken: string; refreshToken: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    console.log('Login response:', response);

    const { user, accessToken, refreshToken } = response.data;
    setAuthTokens({ accessToken, refreshToken });
    setUser(user);
    console.log('User set:', user);
  }

  async function register(email: string, password: string) {
    console.log('Register called with:', email);
    const response = await apiRequest<{ data: { user: User; accessToken: string; refreshToken: string } }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    console.log('Register response:', response);

    const { user, accessToken, refreshToken } = response.data;
    setAuthTokens({ accessToken, refreshToken });
    setUser(user);
    console.log('User set:', user);
  }

  async function logout() {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeAuthTokens();
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
