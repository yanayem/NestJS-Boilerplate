'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PaymentsPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const api_1 = __importDefault(require("../../../utils/api"));
function PaymentsPage() {
    const [amount, setAmount] = (0, react_1.useState)('');
    const [currency, setCurrency] = (0, react_1.useState)('usd');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [result, setResult] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)('');
    const handleCreateIntent = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);
        try {
            const res = await api_1.default.post('/payment/create-intent', {
                amount: parseInt(amount) * 100, // Convert to cents
                currency,
            });
            setResult(res.data.data || res.data);
        }
        catch (err) {
            setError(err.response?.data?.message || 'Payment failed');
        }
        finally {
            setLoading(false);
        }
    };
    const mockHistory = [
        { id: 'pi_1abc', amount: '$49.00', status: 'Succeeded', date: '2026-10-06' },
        { id: 'pi_2def', amount: '$99.00', status: 'Succeeded', date: '2026-10-05' },
        { id: 'pi_3ghi', amount: '$29.00', status: 'Pending', date: '2026-10-04' },
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "Payments" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-gray-500", children: "Manage Stripe payment intents" }), error && (0, jsx_runtime_1.jsx)("div", { className: "mt-4 p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100", children: error }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-6 rounded-xl border border-gray-100 mt-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Create Payment Intent" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleCreateIntent, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Amount ($)" }), (0, jsx_runtime_1.jsx)("input", { type: "number", required: true, min: "1", value: amount, onChange: (e) => setAmount(e.target.value), className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900", placeholder: "49" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "w-32", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Currency" }), (0, jsx_runtime_1.jsxs)("select", { value: currency, onChange: (e) => setCurrency(e.target.value), className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900 bg-white", children: [(0, jsx_runtime_1.jsx)("option", { value: "usd", children: "USD" }), (0, jsx_runtime_1.jsx)("option", { value: "eur", children: "EUR" }), (0, jsx_runtime_1.jsx)("option", { value: "gbp", children: "GBP" })] })] })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: loading, className: "px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition", children: loading ? 'Creating...' : 'Create Payment Intent' })] }), result && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-4 p-4 bg-green-50 rounded-lg border border-green-100", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-green-700", children: "\u2713 Payment Intent Created!" }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-xs text-green-600 break-all", children: ["ID: ", result.id || JSON.stringify(result)] })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white rounded-xl border border-gray-100 mt-6 overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "px-6 py-4 border-b border-gray-100", children: (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-900", children: "Payment History" }) }), (0, jsx_runtime_1.jsxs)("table", { className: "w-full text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-gray-50 border-b border-gray-100", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "text-left px-6 py-3 font-medium text-gray-500", children: "ID" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left px-6 py-3 font-medium text-gray-500", children: "Amount" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left px-6 py-3 font-medium text-gray-500", children: "Status" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left px-6 py-3 font-medium text-gray-500", children: "Date" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: mockHistory.map((p) => ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-gray-50", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-6 py-3 text-gray-500 font-mono text-xs", children: p.id }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-3 font-medium text-gray-900", children: p.amount }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-3", children: (0, jsx_runtime_1.jsx)("span", { className: `px-2 py-0.5 text-xs font-medium rounded-full ${p.status === 'Succeeded' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`, children: p.status }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-3 text-gray-500", children: p.date })] }, p.id))) })] })] })] }));
}
