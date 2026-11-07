# 🚀 Ultimate NestJS & Next.js SaaS Boilerplate

[![NestJS](https://img.shields.io/badge/NestJS-v10-red.svg)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-v15-black.svg)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green.svg)](https://mongoosejs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-blueviolet.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)]()

> A production-ready, highly secure, modular full-stack SaaS boilerplate with NestJS backend, Next.js 15 frontend, MongoDB database, AWS S3 integration, Stripe payments, Nodemailer, and JWT Role-Based Access Control (RBAC).

---

## 📌 Table of Contents

- [🌟 Features](#-features)
- [💻 Tech Stack](#-tech-stack)
- [📂 Folder Structure](#-folder-structure)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [⚙️ Environment Configuration (.env)](#️-environment-configuration-env)
- [🔑 Authentication & Authorization](#-authentication--authorization)
- [📌 Main API Endpoints](#-main-api-endpoints)
- [📚 User & Developer Documentation](#-user--developer-documentation)
- [📩 Contact & Support](#-contact--support)

---

## 🌟 Features

* **🔐 Robust Auth System**: JWT Access & Refresh Tokens (with hashed refresh token storage in MongoDB for ultimate security).
* **🌐 Google OAuth 2.0**: Out-of-the-box Google OAuth login strategy.
* **🛡️ Role-Based Access Control (RBAC)**: Enforced permissions across `ADMIN`, `MANAGER`, and `USER` roles using NestJS Guards & Decorators.
* **🍃 MongoDB & Mongoose**: Fully typed database models with automated **Soft Delete** (`isDeleted: true`) capabilities.
* **☁️ AWS S3 File Upload**: Pre-configured file upload module using AWS SDK with secure URL generation.
* **📧 Email Dispatcher**: Integrated Nodemailer module with HTML templates for welcome emails, password resets, and notifications.
* **💳 Stripe Payments & Webhooks**: Integrated Stripe Payment Intent creation and async webhook event listener.
* **⚡ Modern Next.js 15 Frontend**: Built-in interactive Web UI Dashboard styled with Tailwind CSS v4.
* **📖 Interactive Swagger OpenAPI**: Built-in interactive API docs at `http://localhost:3000/docs`.
* **🛡️ Production Security**: Helmet security headers, CORS protection, global `ValidationPipe`, and Rate Limiting (Throttling).

---

## 💻 Tech Stack

### Backend
- **Framework**: NestJS (v10)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js, JWT, Bcrypt, Google OAuth 2.0
- **Storage**: AWS SDK (S3)
- **Mailer**: Nodemailer
- **Payments**: Stripe SDK
- **Security**: Helmet, Throttler (Rate Limiting)

### Frontend
- **Framework**: Next.js (v15) & React 19
- **Styling**: Tailwind CSS (v4) & Lucide Icons

---

## 📂 Folder Structure

```text
nestjs-mongodb-saas-boilerplate/
├── public/                     # Static assets & dashboard files
├── src/                        # NestJS Backend source code
│   ├── config/                 # App configuration & loader
│   ├── common/                 # Decorators, Enums, Filters, Guards & Interceptors
│   │   ├── decorators/         # Custom decorators (@GetUser, @Roles)
│   │   ├── enums/              # System Enums (Role: ADMIN, MANAGER, USER)
│   │   ├── filters/            # Global Exception Filters
│   │   ├── guards/             # JwtAuthGuard, RefreshTokenGuard, RolesGuard
│   │   └── interceptors/       # Response Transform Interceptor
│   ├── modules/                # Core Business Logic Modules
│   │   ├── auth/               # Auth controller, service, JWT & Google strategies
│   │   ├── users/              # User management, CRUD & soft delete
│   │   ├── upload/             # AWS S3 file upload module
│   │   ├── mail/               # Nodemailer service & email dispatch
│   │   └── payment/            # Stripe payment intent & webhook handling
│   ├── app.controller.ts       # Health check controller
│   ├── app.module.ts           # Root module
│   └── main.ts                 # Entry point (Pipes, Filters, Swagger, Helmet)
├── .env.example                # Sample environment variables file
├── README.md                   # Quick overview documentation
├── DOCUMENTATION.md            # Comprehensive Developer Documentation
└── USER_GUIDE.md               # User & Setup Step-by-Step Guide
```

---

## 📋 Prerequisites

Before getting started, make sure you have installed:

- **Node.js**: `v18.0.0` or higher
- **NPM**: `v9.0.0` or higher
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) or MongoDB Atlas Cluster URL

---

## 🚀 Quick Start & Installation

### 1. Clone the repository
```bash
git clone https://github.com/yanayem/NestJS-Boilerplate.git
cd NestJS-Boilerplate
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Copy the example `.env` file and update your configuration settings:
```bash
cp .env.example .env
```

### 4. Run Development Mode (Full Stack)
Run both backend and frontend concurrently with hot reload:
```bash
npm run dev
```
Alternatively, to run only backend watch mode:
```bash
npm run dev:backend
```

### 5. Access Application URLs
- 🌐 **Frontend Dashboard**: `http://localhost:3000`
- 📚 **Swagger API Docs**: `http://localhost:3000/docs`
- 📡 **API Base Route**: `http://localhost:3000/api/v1`

---

## ⚙️ Environment Configuration (.env)

| Environment Variable | Description | Default / Example Value |
| :--- | :--- | :--- |
| `PORT` | HTTP Server Port | `3000` |
| `NODE_ENV` | Application Environment | `development` |
| `APP_NAME` | SaaS Application Name | `"SaaS Boilerplate"` |
| `API_PREFIX` | Global API route prefix | `api/v1` |
| `MONGO_URI` | MongoDB Connection URI | `mongodb://localhost:27017/nestjs-saas-db` |
| `JWT_SECRET` | Secret key for Access Token | `super_secret_jwt_access_key` |
| `JWT_EXPIRATION` | Expiration time for Access Token | `15m` |
| `JWT_REFRESH_SECRET` | Secret key for Refresh Token | `super_secret_jwt_refresh_key` |
| `JWT_REFRESH_EXPIRATION` | Expiration time for Refresh Token | `7d` |
| `MAIL_HOST` | SMTP Host for Nodemailer | `smtp.mailtrap.io` |
| `MAIL_PORT` | SMTP Port | `2525` |
| `MAIL_USER` | SMTP Username | `your_smtp_user` |
| `MAIL_PASS` | SMTP Password | `your_smtp_password` |
| `MAIL_FROM` | Default sender email address | `"SaaS App <no-reply@saasapp.com>"` |
| `AWS_REGION` | AWS Region for S3 Bucket | `us-east-1` |
| `AWS_ACCESS_KEY_ID` | AWS IAM Access Key ID | `your_aws_access_key` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM Secret Key | `your_aws_secret_key` |
| `AWS_S3_BUCKET_NAME` | AWS S3 Bucket Name | `your_s3_bucket_name` |
| `STRIPE_SECRET_KEY` | Stripe API Secret Key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Signing Secret | `whsec_...` |
| `THROTTLE_TTL` | Rate limiting window (seconds) | `60` |
| `THROTTLE_LIMIT` | Max requests permitted per window | `100` |

---

## 🔑 Authentication & Authorization

All secure endpoints require a Bearer token in the request header:
```text
Authorization: Bearer <your_access_token>
```

### Roles Breakdown:
- **`USER`**: Can view and update their own profile data, upload files, and make payments.
- **`MANAGER`**: Can list all users, view non-deleted profiles, and perform operational user tasks.
- **`ADMIN`**: Full administrative privileges, including soft-deleting user accounts (`isDeleted: true`).

---

## 📌 Main API Endpoints

| Method | Endpoint | Authorization | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/auth/register` | Public | Register new user & issue JWT tokens |
| **POST** | `/api/v1/auth/login` | Public | Log in user & receive Access/Refresh tokens |
| **POST** | `/api/v1/auth/refresh` | Refresh Token | Issue a new Access Token |
| **POST** | `/api/v1/auth/logout` | Bearer JWT | Log out & clear refresh token |
| **GET** | `/api/v1/users/me` | Bearer JWT | Retrieve currently authenticated profile |
| **GET** | `/api/v1/users` | Admin & Manager | Retrieve all user records |
| **GET** | `/api/v1/users/:id` | Bearer JWT | Retrieve user by ID |
| **PATCH** | `/api/v1/users/:id` | Bearer JWT | Update user profile |
| **DELETE**| `/api/v1/users/:id` | Admin Only | Soft delete user (`isDeleted: true`) |
| **POST** | `/api/v1/upload` | Bearer JWT | Upload single file to AWS S3 |
| **POST** | `/api/v1/payment/create-intent` | Bearer JWT | Generate Stripe Payment Intent |
| **POST** | `/api/v1/payment/webhook` | Public | Handle Stripe payment events |

---

## 📚 User & Developer Documentation

- 📘 **[USER_GUIDE.md](./USER_GUIDE.md)**: Detailed step-by-step user guide for installation, testing APIs, authentication, AWS S3 setup, and Stripe payment integration.
- 🛠️ **[DOCUMENTATION.md](./DOCUMENTATION.md)**: Complete developer documentation explaining architecture, data flow, guards, interceptors, and error handling.

---

## 📩 Contact & Support

For questions, issues, or custom development requests, feel free to contact:

- 📧 **Email**: [arafatnayem1@gmail.com](mailto:arafatnayem1@gmail.com)
- 🌐 **GitHub Repository**: [yanayem/NestJS-Boilerplate](https://github.com/yanayem/NestJS-Boilerplate)
