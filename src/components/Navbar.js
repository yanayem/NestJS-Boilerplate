'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const js_cookie_1 = __importDefault(require("js-cookie"));
function Navbar() {
    const router = (0, navigation_1.useRouter)();
    const handleLogout = () => {
        js_cookie_1.default.remove('accessToken');
        js_cookie_1.default.remove('refreshToken');
        router.push('/login');
    };
    return ((0, jsx_runtime_1.jsxs)("nav", { className: "flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-30", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/dashboard", className: "text-lg font-bold text-indigo-600", children: "\uD83D\uDE80 SaaS Boilerplate" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/dashboard", className: "text-sm text-gray-600 hover:text-indigo-600 transition hidden sm:block", children: "Dashboard" }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/dashboard/profile", className: "text-sm text-gray-600 hover:text-indigo-600 transition hidden sm:block", children: "Profile" }), (0, jsx_runtime_1.jsx)("button", { onClick: handleLogout, className: "px-4 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition", children: "Logout" })] })] }));
}
