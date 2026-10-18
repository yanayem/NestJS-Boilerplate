'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UsersPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const api_1 = __importDefault(require("../../../utils/api"));
function UsersPage() {
    const [users, setUsers] = (0, react_1.useState)([]);
    const [error, setError] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(true);
    const fetchUsers = async () => {
        try {
            const res = await api_1.default.get('/users');
            setUsers(res.data.data || res.data || []);
        }
        catch (err) {
            setError(err.response?.status === 403 ? 'Access Denied — Admin only' : 'Failed to load users');
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => { fetchUsers(); }, []);
    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this user?'))
            return;
        try {
            await api_1.default.delete(`/users/${id}`);
            setUsers(users.filter((u) => u._id !== id));
        }
        catch {
            alert('Delete failed');
        }
    };
    if (loading)
        return (0, jsx_runtime_1.jsx)("div", { className: "text-center py-12 text-gray-400", children: "Loading..." });
    if (error)
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center py-20", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-5xl mb-4", children: "\uD83D\uDD12" }), (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-gray-900", children: error }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-gray-500", children: "You need admin privileges to view this page." })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "User Management" }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-sm text-gray-500", children: [users.length, " users found"] }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-xl border border-gray-100 mt-6 overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "overflow-x-auto", children: (0, jsx_runtime_1.jsxs)("table", { className: "w-full text-sm", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-gray-50 border-b border-gray-100", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "text-left px-6 py-3 font-medium text-gray-500", children: "Name" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left px-6 py-3 font-medium text-gray-500", children: "Email" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left px-6 py-3 font-medium text-gray-500", children: "Role" }), (0, jsx_runtime_1.jsx)("th", { className: "text-left px-6 py-3 font-medium text-gray-500", children: "Status" }), (0, jsx_runtime_1.jsx)("th", { className: "text-right px-6 py-3 font-medium text-gray-500", children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: users.map((u) => ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b border-gray-50 hover:bg-gray-50 transition", children: [(0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 font-medium text-gray-900", children: u.name }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 text-gray-500", children: u.email }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsx)("span", { className: `px-2 py-0.5 text-xs font-medium rounded-full ${u.role === 'admin' ? 'bg-red-50 text-red-700' : u.role === 'manager' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`, children: u.role }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4", children: (0, jsx_runtime_1.jsx)("span", { className: `px-2 py-0.5 text-xs font-medium rounded-full ${u.isVerified ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`, children: u.isVerified ? 'Verified' : 'Unverified' }) }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 text-right", children: (0, jsx_runtime_1.jsx)("button", { onClick: () => handleDelete(u._id), className: "px-3 py-1 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition", children: "Delete" }) })] }, u._id))) })] }) }) })] }));
}
