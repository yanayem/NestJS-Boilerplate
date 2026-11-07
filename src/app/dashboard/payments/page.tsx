'use client';

import { useState } from 'react';
import api from '@/utils/api';
import { CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PaymentsPage() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCreateIntent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setResult(null);
    try {
      const res = await api.post('/payment/create-intent', {
        amount: parseInt(amount) * 100, // Convert to cents
        currency,
      });
      setResult(res.data.data || res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Payment failed');
    } finally { setLoading(false); }
  };

  const mockHistory = [
    { id: 'pi_1abc', amount: '$49.00', status: 'Succeeded', date: '2026-10-06' },
    { id: 'pi_2def', amount: '$99.00', status: 'Succeeded', date: '2026-10-05' },
    { id: 'pi_3ghi', amount: '$29.00', status: 'Pending', date: '2026-10-04' },
  ];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2">
        <CreditCard className="w-6 h-6 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
      </div>
      <p className="mt-1 text-sm text-gray-500">Manage Stripe payment intents</p>

      {error && (
        <div className="mt-4 p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Create Payment Intent */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Payment Intent</h3>
        <form onSubmit={handleCreateIntent} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
              <input type="number" required min="1" value={amount} onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900"
                placeholder="49" />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900 bg-white">
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition">
            <CreditCard className="w-4 h-4" />
            <span>{loading ? 'Creating...' : 'Create Payment Intent'}</span>
          </button>
        </form>

        {result && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-700">Payment Intent Created!</p>
              <p className="mt-1 text-xs text-green-600 break-all">ID: {result.id || JSON.stringify(result)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-gray-100 mt-6 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500">ID</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Amount</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockHistory.map((p) => (
              <tr key={p.id} className="border-b border-gray-50">
                <td className="px-6 py-3 text-gray-500 font-mono text-xs">{p.id}</td>
                <td className="px-6 py-3 font-medium text-gray-900">{p.amount}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${p.status === 'Succeeded' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-500">{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
