'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const api_1 = __importDefault(require("../../utils/api"));
function DashboardPage() {
    const [user, setUser] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        api_1.default.get('/users/me').then((res) => setUser(res.data.data || res.data)).catch(() => { });
    }, []);
    const stats = [
        { label: 'Total Users', value: '128', icon: '👥', color: 'bg-blue-50 text-blue-700' },
        { label: 'Uploads', value: '56', icon: '📁', color: 'bg-green-50 text-green-700' },
        { label: 'Payments', value: '$2,450', icon: '💳', color: 'bg-purple-50 text-purple-700' },
        { label: 'Emails Sent', value: '342', icon: '📧', color: 'bg-amber-50 text-amber-700' },
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h1", { className: "text-2xl font-bold text-gray-900", children: ["Welcome back", user?.name ? `, ${user.name}` : '', " \uD83D\uDC4B"] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-gray-500", children: "Here's what's happening with your app today." }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8", children: stats.map((s, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-5 rounded-xl border border-gray-100 hover:shadow-md transition", children: [(0, jsx_runtime_1.jsx)("div", { className: `inline-flex items-center justify-center w-10 h-10 rounded-lg text-lg ${s.color}`, children: s.icon }), (0, jsx_runtime_1.jsx)("p", { className: "mt-3 text-2xl font-bold text-gray-900", children: s.value }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500", children: s.label })] }, i))) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-6 rounded-xl border border-gray-100", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Quick Actions" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-3", children: [(0, jsx_runtime_1.jsxs)("a", { href: "/dashboard/users", className: "p-4 bg-indigo-50 rounded-lg text-center hover:bg-indigo-100 transition", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDC65" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm font-medium text-indigo-700", children: "Manage Users" })] }), (0, jsx_runtime_1.jsxs)("a", { href: "/dashboard/upload", className: "p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDCC1" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm font-medium text-green-700", children: "Upload Files" })] }), (0, jsx_runtime_1.jsxs)("a", { href: "/dashboard/payments", className: "p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDCB3" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm font-medium text-purple-700", children: "Payments" })] }), (0, jsx_runtime_1.jsxs)("a", { href: "/dashboard/profile", className: "p-4 bg-amber-50 rounded-lg text-center hover:bg-amber-100 transition", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDC64" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm font-medium text-amber-700", children: "My Profile" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-6 rounded-xl border border-gray-100", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Recent Activity" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-3", children: ['New user registered', 'Payment received ($49)', 'File uploaded: report.pdf', 'Email sent to user@example.com'].map((a, i) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-3 text-sm text-gray-600 py-2 border-b border-gray-50 last:border-0", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-2 h-2 bg-indigo-400 rounded-full" }), a] }, i))) })] })] })] }));
}
