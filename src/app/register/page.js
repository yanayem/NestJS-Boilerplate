'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegisterPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const js_cookie_1 = __importDefault(require("js-cookie"));
const api_1 = __importDefault(require("../../utils/api"));
function RegisterPage() {
    const router = (0, navigation_1.useRouter)();
    const [form, setForm] = (0, react_1.useState)({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            const res = await api_1.default.post('/auth/register', {
                name: form.name,
                email: form.email,
                password: form.password,
            });
            const { accessToken, refreshToken } = res.data.data || res.data;
            js_cookie_1.default.set('accessToken', accessToken, { expires: 1 });
            js_cookie_1.default.set('refreshToken', refreshToken, { expires: 7 });
            router.push('/dashboard');
        }
        catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center mb-8", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/", className: "text-2xl font-bold text-indigo-600", children: "\uD83D\uDE80 SaaS Boilerplate" }), (0, jsx_runtime_1.jsx)("h2", { className: "mt-4 text-2xl font-bold text-gray-900", children: "Create your account" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-gray-500", children: "Start building your SaaS app today" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-8 rounded-2xl shadow-sm border border-gray-100", children: [error && ((0, jsx_runtime_1.jsx)("div", { className: "mb-4 p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100", children: error })), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Full Name" }), (0, jsx_runtime_1.jsx)("input", { type: "text", required: true, className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900", placeholder: "John Doe", value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", required: true, className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900", placeholder: "you@example.com", value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", required: true, minLength: 6, className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: form.password, onChange: (e) => setForm({ ...form, password: e.target.value }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Confirm Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", required: true, minLength: 6, className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: form.confirmPassword, onChange: (e) => setForm({ ...form, confirmPassword: e.target.value }) })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: loading, className: "w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition", children: loading ? 'Creating account...' : 'Create Account' })] })] }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-6 text-center text-sm text-gray-500", children: ["Already have an account?", ' ', (0, jsx_runtime_1.jsx)(link_1.default, { href: "/login", className: "text-indigo-600 font-medium hover:text-indigo-800", children: "Sign in" })] })] }) }));
}
