'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfilePage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const api_1 = __importDefault(require("../../../utils/api"));
function ProfilePage() {
    const [user, setUser] = (0, react_1.useState)(null);
    const [form, setForm] = (0, react_1.useState)({ name: '', email: '' });
    const [passForm, setPassForm] = (0, react_1.useState)({ password: '', confirmPassword: '' });
    const [msg, setMsg] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        api_1.default.get('/users/me').then((res) => {
            const u = res.data.data || res.data;
            setUser(u);
            setForm({ name: u.name, email: u.email });
        }).catch(() => { });
    }, []);
    const handleUpdate = async (e) => {
        e.preventDefault();
        setMsg('');
        setError('');
        setLoading(true);
        try {
            await api_1.default.patch(`/users/${user._id}`, form);
            setMsg('Profile updated successfully!');
        }
        catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        }
        finally {
            setLoading(false);
        }
    };
    const handlePassword = async (e) => {
        e.preventDefault();
        setMsg('');
        setError('');
        if (passForm.password !== passForm.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            await api_1.default.patch(`/users/${user._id}`, { password: passForm.password });
            setMsg('Password changed successfully!');
            setPassForm({ password: '', confirmPassword: '' });
        }
        catch (err) {
            setError(err.response?.data?.message || 'Password change failed');
        }
        finally {
            setLoading(false);
        }
    };
    if (!user)
        return (0, jsx_runtime_1.jsx)("div", { className: "text-center py-12 text-gray-400", children: "Loading..." });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "My Profile" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-gray-500", children: "Manage your account settings" }), msg && (0, jsx_runtime_1.jsx)("div", { className: "mt-4 p-3 text-sm text-green-700 bg-green-50 rounded-lg border border-green-100", children: msg }), error && (0, jsx_runtime_1.jsx)("div", { className: "mt-4 p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100", children: error }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-6 rounded-xl border border-gray-100 mt-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 mb-6 pb-6 border-b border-gray-100", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600", children: user.name?.charAt(0)?.toUpperCase() }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-gray-900", children: user.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500", children: user.email }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 mt-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "px-2 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full", children: user.role }), (0, jsx_runtime_1.jsx)("span", { className: `px-2 py-0.5 text-xs font-medium rounded-full ${user.isVerified ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`, children: user.isVerified ? '✓ Verified' : '⏳ Unverified' })] })] })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleUpdate, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Name" }), (0, jsx_runtime_1.jsx)("input", { type: "text", required: true, value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", required: true, value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }), className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900" })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: loading, className: "px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition", children: loading ? 'Saving...' : 'Update Profile' })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-6 rounded-xl border border-gray-100 mt-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Change Password" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handlePassword, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "New Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", required: true, minLength: 6, value: passForm.password, onChange: (e) => setPassForm({ ...passForm, password: e.target.value }), className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Confirm New Password" }), (0, jsx_runtime_1.jsx)("input", { type: "password", required: true, minLength: 6, value: passForm.confirmPassword, onChange: (e) => setPassForm({ ...passForm, confirmPassword: e.target.value }), className: "w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-900", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: loading, className: "px-6 py-2.5 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-50 transition", children: "Change Password" })] })] })] }));
}
