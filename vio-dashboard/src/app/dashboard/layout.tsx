'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth, AuthProvider } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Settings, LogOut, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/components/ui/card';

function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Team Overview', icon: LayoutDashboard },
    { href: '/dashboard/agents', label: 'All Agents', icon: Users },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r bg-white md:flex h-[calc(100vh-64px)] overflow-y-auto">
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" className="-m-2.5 p-2.5 text-gray-700 md:hidden">
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center">
          <Link href="/dashboard" className="text-xl font-bold text-blue-600">Vio.com <span className="text-gray-900 font-medium">Dashboard</span></Link>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="flex items-center gap-x-4">
            <div className="hidden lg:flex lg:flex-col lg:items-end lg:justify-center">
              <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{user?.name}</span>
              <span className="text-xs leading-4 text-gray-500">{user?.role}</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              {user?.name.charAt(0)}
            </div>
            <Button variant="ghost" size="sm" onClick={logout} title="Logout" className="px-2">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Login to Dashboard</h2>
          <p className="text-gray-500 mb-6 text-center">Simulated login. Refreshing automatically logs you in as Caio (Team Leader).</p>
          <Button className="w-full" onClick={() => window.location.reload()}>Simulate Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </AuthProvider>
  );
}
