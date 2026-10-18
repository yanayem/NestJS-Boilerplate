'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UploadPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const api_1 = __importDefault(require("../../../utils/api"));
function UploadPage() {
    const [file, setFile] = (0, react_1.useState)(null);
    const [uploading, setUploading] = (0, react_1.useState)(false);
    const [result, setResult] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)('');
    const [dragOver, setDragOver] = (0, react_1.useState)(false);
    const handleUpload = async () => {
        if (!file)
            return;
        setUploading(true);
        setError('');
        setResult(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await api_1.default.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResult(res.data.data || res.data);
            setFile(null);
        }
        catch (err) {
            setError(err.response?.data?.message || 'Upload failed');
        }
        finally {
            setUploading(false);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile)
            setFile(droppedFile);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-900", children: "File Upload" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-gray-500", children: "Upload files to AWS S3 storage" }), error && (0, jsx_runtime_1.jsx)("div", { className: "mt-4 p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100", children: error }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-6 rounded-xl border border-gray-100 mt-6", children: [(0, jsx_runtime_1.jsxs)("div", { onDragOver: (e) => { e.preventDefault(); setDragOver(true); }, onDragLeave: () => setDragOver(false), onDrop: handleDrop, className: `border-2 border-dashed rounded-xl p-12 text-center transition cursor-pointer ${dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`, onClick: () => document.getElementById('fileInput')?.click(), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-4xl", children: "\uD83D\uDCC1" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-3 text-sm font-medium text-gray-700", children: file ? file.name : 'Drag & drop a file here, or click to browse' }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-xs text-gray-400", children: "PNG, JPG up to 5MB" }), (0, jsx_runtime_1.jsx)("input", { id: "fileInput", type: "file", accept: ".png,.jpg,.jpeg", className: "hidden", onChange: (e) => { if (e.target.files?.[0])
                                    setFile(e.target.files[0]); } })] }), file && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-700", children: file.name }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-gray-400", children: [(file.size / 1024).toFixed(1), " KB"] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleUpload, disabled: uploading, className: "px-5 py-2 bg-indigo-600 text-white text-sm rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition", children: uploading ? 'Uploading...' : 'Upload' })] })), result && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-4 p-4 bg-green-50 rounded-lg border border-green-100", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-green-700", children: "\u2713 Upload successful!" }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-xs text-green-600 break-all", children: ["URL: ", result.url || JSON.stringify(result)] })] }))] })] }));
}
