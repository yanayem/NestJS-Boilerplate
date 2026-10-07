'use client';

import { useEffect, useState } from 'react';
import api from '@/utils/api';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '' });
  const [passForm, setPassForm] = useState({ password: '', confirmPassword: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/users/me').then((res) => {
      const u = res.data.data || res.data;
      setUser(u);
      setForm({ name: u.name, email: u.email });
    }).catch(() => {});
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(''); setError(''); setLoading(true);
    try {
      await api.patch(`/users/${user._id}`, form);
      setMsg('Profile updated successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Update failed');
    } finally { setLoading(false); }
  };

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(''); setError('');
    if (passForm.password !== passForm.confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    try {
      await api.patch(`/users/${user._id}`, { password: passForm.password });
      setMsg('Password changed successfully!');
      setPassForm({ password: '', confirmPassword: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Password change failed');
    } finally { setLoading(false); }
  };

  if (!user) return <div className="text-center py-12 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
      <p className="mt-1 text-sm text-gray-500">Manage your account settings</p>

      {msg && <div className="mt-4 p-3 text-sm text-green-700 bg-green-50 rounded-lg border border-green-100">{msg}</div>}
      {error && <div className="mt-4 p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100">{error}</div>}

      {/* Info Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 mt-6">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <div className="flex gap-2 mt-1">
              <span className="px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">{user.role}</span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${user.isVerified ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                {user.isVerified ? '✓ Verified' : '⏳ Unverified'}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900" />
          </div>
          <button type="submit" disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition">
            {loading ? 'Saving...' : 'Update Profile'}
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <form onSubmit={handlePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input type="password" required minLength={6} value={passForm.password} onChange={(e) => setPassForm({ ...passForm, password: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input type="password" required minLength={6} value={passForm.confirmPassword} onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading}
            className="px-6 py-2.5 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50 transition">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
