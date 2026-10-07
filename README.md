# 🚀 NestJS + MongoDB Production SaaS Boilerplate — Commercial Starter Kit

[![NestJS](https://img.shields.io/badge/NestJS-v10-red.svg)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green.svg)](https://mongoosejs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Commercial-brightgreen.svg)]()

> **The Ultimate Production-Ready NestJS + MongoDB SaaS Boilerplate.**  
> Designed for developers, startups, and agencies who want to launch commercial SaaS products or web applications in minutes rather than months.

---

## 🌟 Why Buy This Item?

Saving hundreds of development hours, this boilerplate comes pre-built with commercial-grade features, rock-solid security, an interactive frontend UI dashboard, and full modular architecture.

### 🔑 Key Commercial Highlights:
* ⚡ **Unified Single Server Architecture**: Serves both the interactive Web Dashboard and REST API endpoints from a single lightweight NestJS process.
* 🛡️ **Enterprise Security**: Built-in **JWT Access Token & Refresh Token** system with hashed tokens in DB, **Role-Based Access Control (RBAC)**, **Helmet Security Headers**, and **Rate Limiting (DDoS Protection)**.
* ☁️ **AWS S3 Cloud Storage**: Pre-configured file upload module with S3 bucket integration and public URL generation.
* 💳 **Stripe Payment Gateway**: Complete Stripe payment intent creation and webhook listener for handling checkout events.
* 📧 **Nodemailer Email Service**: Asynchronous welcome email and password reset dispatching.
* 🎨 **Built-In Interactive Dashboard UI**: Modern Tailwind CSS interface for instant live testing of all API features.
* 📚 **Swagger OpenAPI Docs**: Fully interactive API documentation available at `/docs`.

---

## 📂 Package Folder Structure

```text
nestjs-saas-boilerplate/
├── src/
│   ├── config/                 # Centralized Configuration (App, DB, Mail, AWS, Stripe)
│   ├── common/                 # Shared Utilities across all modules
│   │   ├── decorators/         # Custom Decorators (@GetUser, @Roles)
│   │   ├── enums/              # Role Enums (ADMIN, MANAGER, USER)
│   │   ├── filters/            # Global Exception Filters
│   │   ├── guards/             # JWT Auth, JWT Refresh & Roles Guards
│   │   └── interceptors/       # Response Transform Interceptors
│   ├── modules/                # Core Business Logic Modules
│   │   ├── auth/               # Auth Controllers, Services & Passport Strategies
│   │   ├── users/              # User CRUD, Schemas & Soft-Delete logic
│   │   ├── upload/             # AWS S3 Upload Module
│   │   ├── mail/               # Nodemailer Email Dispatcher
│   │   └── payment/            # Stripe Payment Intent & Webhook Handling
│   ├── app.controller.ts       # System Health Check Endpoint
│   ├── app.module.ts           # Root Module with Throttler & Static File Serving
│   └── main.ts                 # Application Entry Point
├── public/
│   └── index.html              # Interactive Tailwind CSS Web Dashboard
├── .env.example                # Pre-configured Environment Sample
├── nest-cli.json               # NestJS CLI Configuration
├── tsconfig.json               # TypeScript Compiler Configuration
└── package.json                # Project Dependencies & Scripts
```

---

## 🛠️ Requirements & Quick Start

### Prerequisites:
- **Node.js**: `v18.x` or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas cluster URL

### Step 1: Install Dependencies
Extract the downloaded package and run:
```bash
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set your configuration values in `.env`:
```env
# Application Settings
PORT=3000
NODE_ENV=development
APP_NAME="SaaS Boilerplate"
API_PREFIX=api/v1

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/nestjs-saas-db

# JWT Token Secrets
JWT_SECRET=super_secret_jwt_access_key
JWT_EXPIRATION=15m
JWT_REFRESH_SECRET=super_secret_jwt_refresh_key
JWT_REFRESH_EXPIRATION=7d

# Nodemailer SMTP Configuration
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_smtp_username
MAIL_PASS=your_smtp_password
MAIL_FROM="SaaS App <no-reply@saasapp.com>"

# AWS S3 Storage Credentials
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name

# Stripe Payment Gateway
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# Rate Limiting (DDoS Protection)
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

### Step 3: Run the Application
```bash
# Start in Development Mode with Hot Reload
npm run start:dev

# Production Build & Start
npm run build
npm run start:prod
```

---

## 🌐 Live Demo & Interactive Surfaces

Once the application is running:
- **Interactive Web UI Dashboard**: `http://localhost:3000/`
- **Swagger OpenAPI Dashboard**: `http://localhost:3000/docs`
- **System Health Check Endpoint**: `http://localhost:3000/api/v1`

---

## 📌 REST API Endpoint Directory

| Method | Endpoint | Access Control | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/auth/register` | Public | Register new user & return tokens |
| **POST** | `/api/v1/auth/login` | Public | Authenticate user & return tokens |
| **POST** | `/api/v1/auth/refresh` | Public (Refresh Token) | Generate new access token |
| **POST** | `/api/v1/auth/logout` | Bearer JWT | Invalidate user refresh token |
| **GET** | `/api/v1/users/me` | Bearer JWT | Retrieve current user profile |
| **GET** | `/api/v1/users` | Admin & Manager | List all non-deleted users |
| **GET** | `/api/v1/users/:id` | Bearer JWT | Retrieve user by ID |
| **PATCH** | `/api/v1/users/:id` | Bearer JWT / Self | Update user information |
| **DELETE**| `/api/v1/users/:id` | Admin Only | Soft delete user (`isDeleted: true`) |
| **POST** | `/api/v1/upload` | Bearer JWT | Upload file to AWS S3 bucket |
| **POST** | `/api/v1/payment/create-intent` | Bearer JWT | Create Stripe payment intent |
| **POST** | `/api/v1/payment/webhook` | Public | Stripe asynchronous webhook listener |

---

## 📦 What's Included in the Download Package?

1. **Complete TypeScript Source Code** (Clean, well-commented, modular)
2. **Interactive Frontend Web Dashboard** (`public/index.html`)
3. **Pre-configured Docker & Deployment Setup**
4. **Comprehensive Documentation** (`DOCUMENTATION.md`)
5. **Free Lifetime Updates**

---

## 📞 Buyer Support & Customization

If you need help setting up the boilerplate, extending features, or hiring us for custom SaaS development, feel free to contact us via our CodeCanyon profile page.

*Thank you for purchasing! If you like this item, please rate it 5 stars on CodeCanyon!* ⭐⭐⭐⭐⭐
