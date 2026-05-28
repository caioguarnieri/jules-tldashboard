'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types';
import { mockUsers } from './mock-data';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Auto-login as Caio (Team Leader) for MVP convenience
  useEffect(() => {
    const initAuth = () => {
      const savedUserId = localStorage.getItem('userId');
      if (savedUserId) {
        const foundUser = mockUsers.find((u) => u.id === savedUserId);
        if (foundUser) {
          setUser(foundUser);
          setIsMounted(true);
          return;
        }
      }
      // Default to Caio
      const defaultUser = mockUsers.find(u => u.email === 'caio@vio.com') || null;
      if (defaultUser) {
        setUser(defaultUser);
        localStorage.setItem('userId', defaultUser.id);
      }
      setIsMounted(true);
    };
    initAuth();
  }, []);

  if (!isMounted) {
    return null; // Or a loading spinner
  }

  const login = (email: string) => {
    const foundUser = mockUsers.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('userId', foundUser.id);
    } else {
      alert('User not found in mock data. Try caio@vio.com or ana@vio.com');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
