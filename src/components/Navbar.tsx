'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Rocket, LogOut, LayoutDashboard, User } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-30">
      <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold text-indigo-600">
        <Rocket className="w-5 h-5" />
        <span>SaaS Boilerplate</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition hidden sm:flex">
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
        <Link href="/dashboard/profile" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition hidden sm:flex">
          <User className="w-4 h-4" />
          <span>Profile</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
