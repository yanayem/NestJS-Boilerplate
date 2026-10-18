'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const js_cookie_1 = __importDefault(require("js-cookie"));
const Navbar_1 = __importDefault(require("../../components/Navbar"));
const Sidebar_1 = __importDefault(require("../../components/Sidebar"));
function DashboardLayout({ children }) {
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        const token = js_cookie_1.default.get('accessToken');
        if (!token) {
            router.push('/login');
        }
    }, [router]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-gray-50", children: [(0, jsx_runtime_1.jsx)(Navbar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)(Sidebar_1.default, {}), (0, jsx_runtime_1.jsx)("main", { className: "flex-1 p-6", children: children })] })] }));
}
