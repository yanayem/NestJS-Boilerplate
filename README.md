# 🚀 Ultimate NestJS & MongoDB SaaS Boilerplate

[![NestJS](https://img.shields.io/badge/NestJS-v10-red.svg)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green.svg)](https://mongoosejs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Commercial-brightgreen.svg)]()

> A production-ready, highly secure, and modular backend boilerplate for building scalable SaaS applications.

---

## 🌟 2. Key Features

* **Robust Authentication**: JWT Access/Refresh Tokens (hashed tokens stored in DB for extra security).
* **Role-Based Authorization (RBAC)**: Fine-grained access control with `ADMIN`, `MANAGER`, and `USER` roles.
* **Database Management**: MongoDB integration using Mongoose with pre-configured schemas and automated **Soft Delete** (`isDeleted: true`).
* **Security & DDoS Protection**: Helmet security headers, CORS enabled, and Rate Limiting (Throttling) activated.
* **Cloud File Upload**: Ready-to-use AWS S3 file upload module with public URL generation.
* **Email Service**: Built-in Nodemailer support with HTML templates for welcome emails and password reset tokens.
* **Payment Gateway**: Integrated Stripe Payment Intent creation API and asynchronous webhook handling.
* **Interactive Frontend Dashboard**: Built-in Tailwind CSS web interface (`http://localhost:3000/`) for live API testing out-of-the-box.

---

## 💻 3. Tech Stack

* **Framework**: NestJS (v10+)
* **Language**: TypeScript
* **Database**: MongoDB
* **ODM**: Mongoose
* **Security & Auth**: Passport.js, JWT, Bcrypt, Helmet, Throttler
* **Storage**: AWS S3 SDK
* **Mailer**: Nodemailer
* **Payment Gateway**: Stripe API
* **UI & Style**: Tailwind CSS

---

## 📋 4. Prerequisites

Before running the application, make sure you have the following installed:

* **Node.js**: `v18.0.0` or higher
* **NPM**: `v9.0.0` or higher (or Yarn/PNPM)
* **MongoDB**: Local MongoDB instance or MongoDB Atlas cluster URL

---

## 🚀 5. Getting Started & Installation

Follow these simple steps to run the application locally:

```bash
# 1. Clone or extract the project repository
cd NestJS-Boilerplate

# 2. Install dependencies
npm install

# 3. Create environment file from sample
cp .env.example .env

# 4. Start the application in development mode with hot reload
npm run start:dev
```

For production deployment:
```bash
# Build the project
npm run build

# Start production server
npm run start:prod
```

---

## ⚙️ 6. Environment Variable Guide (.env)

Below is the detailed description for every key in your `.env` configuration file:

| Key | Example Value | Description |
| :--- | :--- | :--- |
| `PORT` | `3000` | Port on which the application server runs |
| `NODE_ENV` | `development` | Application environment (`development` or `production`) |
| `APP_NAME` | `"SaaS Boilerplate"` | Name of your SaaS application |
| `API_PREFIX` | `api/v1` | Global REST API prefix for all endpoints |
| `MONGO_URI` | `mongodb://localhost:27017/nestjs-saas-db` | Your MongoDB connection string |
| `JWT_SECRET` | `super_secret_jwt_access_key` | Secret key for signing JWT Access Tokens |
| `JWT_EXPIRATION` | `15m` | Expiration time for Access Tokens |
| `JWT_REFRESH_SECRET` | `super_secret_jwt_refresh_key` | Secret key for signing Refresh Tokens |
| `JWT_REFRESH_EXPIRATION` | `7d` | Expiration time for Refresh Tokens |
| `MAIL_HOST` | `smtp.mailtrap.io` | SMTP host address for Nodemailer |
| `MAIL_PORT` | `2525` | SMTP port number |
| `MAIL_USER` | `your_smtp_username` | SMTP username |
| `MAIL_PASS` | `your_smtp_password` | SMTP password |
| `MAIL_FROM` | `"SaaS App <no-reply@saasapp.com>"` | Sender email header |
| `AWS_REGION` | `us-east-1` | AWS region for S3 bucket |
| `AWS_ACCESS_KEY_ID` | `your_aws_access_key_id` | AWS IAM Access Key ID |
| `AWS_SECRET_ACCESS_KEY` | `your_aws_secret_access_key` | AWS IAM Secret Access Key |
| `AWS_S3_BUCKET_NAME` | `your_s3_bucket_name` | AWS S3 Bucket Name |
| `STRIPE_SECRET_KEY` | `sk_test_your_stripe_secret_key` | Stripe API Secret Key |
| `STRIPE_WEBHOOK_SECRET` | `whsec_your_stripe_webhook_secret` | Stripe Webhook Listener Secret |
| `THROTTLE_TTL` | `60` | Rate limiting time window in seconds |
| `THROTTLE_LIMIT` | `100` | Maximum requests permitted per window |

---

## 📂 7. Project Folder Structure

```text
nestjs-saas-boilerplate/
├── src/
│   ├── config/                 # Environment variables & configuration loaders
│   ├── common/                 # Shared decorators, enums, guards, filters & interceptors
│   │   ├── decorators/         # Custom decorators (@GetUser, @Roles)
│   │   ├── enums/              # System Enums (Role: ADMIN, MANAGER, USER)
│   │   ├── filters/            # Global Exception Filter
│   │   ├── guards/             # JWT Auth, Refresh Token & Roles Guards
│   │   └── interceptors/       # Response Transform Interceptor
│   ├── modules/                # Main business logic divided into modules
│   │   ├── auth/               # Auth controller, service, strategies (JWT, Refresh)
│   │   ├── users/              # User CRUD, schemas, soft-delete service
│   │   ├── upload/             # AWS S3 file upload logic
│   │   ├── mail/               # Email templates and dispatching logic
│   │   └── payment/            # Stripe payment handling & webhooks
│   ├── app.controller.ts       # Health check controller
│   ├── app.module.ts           # Main application module
│   └── main.ts                 # Entry point (Helmet, ValidationPipe, Swagger setup)
├── public/
│   └── index.html              # Interactive Tailwind CSS Web Dashboard
├── .env.example                # Pre-configured sample environment file
└── README.md                   # Project documentation
```

---

## 📌 8. Main API Endpoints Overview

| Method | Endpoint | Access Control | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/v1/auth/register` | Public | Register new user & return access/refresh tokens |
| **POST** | `/api/v1/auth/login` | Public | Authenticate credentials & return tokens |
| **POST** | `/api/v1/auth/refresh` | Refresh Token | Issue fresh access token via refresh token |
| **POST** | `/api/v1/auth/logout` | Bearer JWT | Logout user & invalidate refresh token |
| **GET** | `/api/v1/users/me` | Bearer JWT | Retrieve logged-in user profile |
| **GET** | `/api/v1/users` | Admin & Manager | List all non-deleted user records |
| **GET** | `/api/v1/users/:id` | Bearer JWT | Find user by ID |
| **PATCH** | `/api/v1/users/:id` | Bearer JWT / Self | Update profile information |
| **DELETE**| `/api/v1/users/:id` | Admin Only | Soft delete user record (`isDeleted: true`) |
| **POST** | `/api/v1/upload` | Bearer JWT | Upload single file to AWS S3 bucket |
| **POST** | `/api/v1/payment/create-intent` | Bearer JWT | Generate Stripe Payment Intent |
| **POST** | `/api/v1/payment/webhook` | Public | Stripe webhook listener |

---

## 💡 Live Interactive Demo & Documentation (Value Booster)

This project features built-in interactive surfaces that allow buyers to test request-response cycles before integrating into their frontend:

- 🌐 **Interactive Web UI Dashboard**: `http://localhost:3000/`
- 📚 **Swagger OpenAPI Interactive Documentation**: `http://localhost:3000/docs`
- 🔗 **GitHub Repository**: [https://github.com/yanayem/NestJS-Boilerplate](https://github.com/yanayem/NestJS-Boilerplate)

---

## 📩 Buyer Support & Customization Contact

For technical assistance, custom feature development, or project inquiries:

* 📧 **Email**: [arafatnayem1@gmail.com](mailto:arafatnayem1@gmail.com)
* 💼 **CodeCanyon Profile**: Contact via item support tab or email.

*If you find this boilerplate helpful, please leave a 5-star rating on CodeCanyon!* ⭐⭐⭐⭐⭐
