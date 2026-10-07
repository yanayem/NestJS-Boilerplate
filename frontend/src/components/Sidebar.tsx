'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
  { href: '/dashboard/users', label: 'Users', icon: '👥' },
  { href: '/dashboard/upload', label: 'Upload', icon: '📁' },
  { href: '/dashboard/payments', label: 'Payments', icon: '💳' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-[calc(100vh-49px)] bg-white border-r border-gray-200 p-4 hidden md:block">
      <ul className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
