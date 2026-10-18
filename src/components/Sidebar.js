'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sidebar;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
    { href: '/dashboard/users', label: 'Users', icon: '👥' },
    { href: '/dashboard/upload', label: 'Upload', icon: '📁' },
    { href: '/dashboard/payments', label: 'Payments', icon: '💳' },
];
function Sidebar() {
    const pathname = (0, navigation_1.usePathname)();
    return ((0, jsx_runtime_1.jsx)("aside", { className: "w-60 min-h-[calc(100vh-49px)] bg-white border-r border-gray-200 p-4 hidden md:block", children: (0, jsx_runtime_1.jsx)("ul", { className: "space-y-1", children: menuItems.map((item) => {
                const isActive = pathname === item.href;
                return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: item.href, className: `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${isActive
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`, children: [(0, jsx_runtime_1.jsx)("span", { children: item.icon }), item.label] }) }, item.href));
            }) }) }));
}
