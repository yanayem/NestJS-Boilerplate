'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const api_1 = __importDefault(require("../../utils/api"));
function LoginPage() {
    const router = (0, navigation_1.useRouter)();
    const [form, setForm] = (0, react_1.useState)({ email: '', password: '' });
    const [error, setError] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await api_1.default.post('/auth/login', form);
            const { accessToken, refreshToken } = res.data.data || res.data;
            js_cookie_1.default.set('accessToken', accessToken, { expires: 1 });
            js_cookie_1.default.set('refreshToken', refreshToken, { expires: 7 });
            router.push('/dashboard');
        }
        catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center mb-8", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/", className: "text-2xl font-bold text-indigo-600", children: "\uD83D\uDE80 SaaS Boilerplate" }), (0, jsx_runtime_1.jsx)("h2", { className: "mt-4 text-2xl font-bold text-gray-900", children: "Welcome back" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-gray-500", children: "Sign in to your account" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-gray-100", children: [error && ((0, jsx_runtime_1.jsx)("div", { className: "mb-4 p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100", children: error })), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-5", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", required: true, className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900", placeholder: "you@example.com", value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", required: true, className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: form.password, onChange: (e) => setForm({ ...form, password: e.target.value }) })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: loading, className: "w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition", children: loading ? 'Signing in...' : 'Sign In' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full border-t border-gray-200" }) }), (0, jsx_runtime_1.jsx)("div", { className: "relative flex justify-center text-sm", children: (0, jsx_runtime_1.jsx)("span", { className: "px-2 bg-white text-gray-400", children: "Or continue with" }) })] }), (0, jsx_runtime_1.jsxs)("a", { href: "http://localhost:3000/api/v1/auth/google", className: "mt-4 w-full flex items-center justify-center gap-3 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700", children: [(0, jsx_runtime_1.jsxs)("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z", fill: "#4285F4" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }), (0, jsx_runtime_1.jsx)("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }), (0, jsx_runtime_1.jsx)("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })] }), "Sign in with Google"] })] })] }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-6 text-center text-sm text-gray-500", children: ["Don't have an account?", ' ', (0, jsx_runtime_1.jsx)(link_1.default, { href: "/register", className: "text-indigo-600 font-medium hover:text-indigo-800", children: "Sign up" })] })] }) }));
}
