'use client';

import Link from 'next/link';

export default function HomePage() {
  const features = [
    { icon: '🔐', title: 'Authentication', desc: 'JWT Access & Refresh Tokens, Google OAuth, Role-Based Access Control' },
    { icon: '📁', title: 'File Upload', desc: 'AWS S3 integration for seamless file and image uploads' },
    { icon: '💳', title: 'Payments', desc: 'Stripe payment gateway with webhook handling' },
    { icon: '📧', title: 'Email Service', desc: 'Nodemailer integration for verification and password reset' },
    { icon: '🛡️', title: 'Security', desc: 'Helmet, CORS, Rate Limiting, and Input Validation' },
    { icon: '👥', title: 'User Management', desc: 'CRUD operations with soft delete and role management' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <h1 className="text-xl font-bold text-indigo-600">🚀 SaaS Boilerplate</h1>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition">Login</Link>
          <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <span className="px-4 py-1.5 mb-6 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">Production-Ready Boilerplate</span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-3xl">
          Build Your <span className="text-indigo-600">SaaS App</span> in Minutes
        </h1>
        <p className="mt-6 text-lg text-gray-500 max-w-2xl">
          A complete NestJS + MongoDB + Next.js boilerplate with authentication, payments, file uploads, email, and more. Ship faster, scale easier.
        </p>
        <div className="flex gap-4 mt-10">
          <Link href="/register" className="px-8 py-3 text-white bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition">
            Get Started Free →
          </Link>
          <Link href="/login" className="px-8 py-3 text-indigo-600 bg-white border border-indigo-200 rounded-lg font-semibold hover:bg-indigo-50 transition">
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Everything You Need</h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">Pre-built modules so you can focus on your business logic, not boilerplate code.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-indigo-100 transition-all duration-300">
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-100 text-sm text-gray-400">
        © {new Date().getFullYear()} SaaS Boilerplate. Built with NestJS, Next.js & MongoDB.
      </footer>
    </div>
  );
}
