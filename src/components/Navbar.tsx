'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-30">
      <Link href="/dashboard" className="text-lg font-bold text-indigo-600">🚀 SaaS Boilerplate</Link>
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-sm text-gray-600 hover:text-indigo-600 transition hidden sm:block">Dashboard</Link>
        <Link href="/dashboard/profile" className="text-sm text-gray-600 hover:text-indigo-600 transition hidden sm:block">Profile</Link>
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
