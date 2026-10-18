'use client';

import { useEffect, useState } from 'react';
import api from '@/utils/api';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get('/users/me').then((res) => setUser(res.data.data || res.data)).catch(() => {});
  }, []);

  const stats = [
    { label: 'Total Users', value: '128', icon: '👥', color: 'bg-blue-50 text-blue-700' },
    { label: 'Uploads', value: '56', icon: '📁', color: 'bg-green-50 text-green-700' },
    { label: 'Payments', value: '$2,450', icon: '💳', color: 'bg-purple-50 text-purple-700' },
    { label: 'Emails Sent', value: '342', icon: '📧', color: 'bg-amber-50 text-amber-700' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back{user?.name ? `, ${user.name}` : ''} 👋
      </h1>
      <p className="mt-1 text-sm text-gray-500">Here&apos;s what&apos;s happening with your app today.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-md transition">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-lg ${s.color}`}>
              {s.icon}
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <a href="/dashboard/users" className="p-4 bg-indigo-50 rounded-lg text-center hover:bg-indigo-100 transition">
              <span className="text-2xl">👥</span>
              <p className="mt-2 text-sm font-medium text-indigo-700">Manage Users</p>
            </a>
            <a href="/dashboard/upload" className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition">
              <span className="text-2xl">📁</span>
              <p className="mt-2 text-sm font-medium text-green-700">Upload Files</p>
            </a>
            <a href="/dashboard/payments" className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition">
              <span className="text-2xl">💳</span>
              <p className="mt-2 text-sm font-medium text-purple-700">Payments</p>
            </a>
            <a href="/dashboard/profile" className="p-4 bg-amber-50 rounded-lg text-center hover:bg-amber-100 transition">
              <span className="text-2xl">👤</span>
              <p className="mt-2 text-sm font-medium text-amber-700">My Profile</p>
            </a>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            {['New user registered', 'Payment received ($49)', 'File uploaded: report.pdf', 'Email sent to user@example.com'].map((a, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-600 py-2 border-b border-gray-50 last:border-0">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
