# 📖 User & Integration Guide — NestJS & Next.js SaaS Boilerplate

Welcome to the **User & Integration Guide** for the NestJS + Next.js SaaS Boilerplate. This document provides step-by-step instructions for installing, configuring, running, and integrating all modules of this application.

---

## 📋 Table of Contents

1. [Prerequisites & System Requirements](#1-prerequisites--system-requirements)
2. [Step-by-Step Installation & Setup](#2-step-by-step-installation--setup)
3. [Environment Configuration Guide](#3-environment-configuration-guide)
4. [Using the Web UI Dashboard & Swagger](#4-using-the-web-ui-dashboard--swagger)
5. [Authentication & Authorization Workflow](#5-authentication--authorization-workflow)
6. [Role-Based Access Control (RBAC)](#6-role-based-access-control-rbac)
7. [User Management & Soft Delete](#7-user-management--soft-delete)
8. [AWS S3 File Upload Setup & Usage](#8-aws-s3-file-upload-setup--usage)
9. [Nodemailer Email Setup & Usage](#9-nodemailer-email-setup--usage)
10. [Stripe Payment Intent & Webhook Setup](#10-stripe-payment-intent--webhook-setup)
11. [Troubleshooting & FAQs](#11-troubleshooting--faqs)

---

## 1. Prerequisites & System Requirements

Before running the project, ensure your environment meets the following requirements:

* **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
* **NPM**: `v9.0.0` or higher (Bundled with Node.js)
* **MongoDB**:
  * Local instance: `mongodb://localhost:27017`
  * Or MongoDB Atlas Cloud: `mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>`
* **Optional Services**:
  * AWS Account (for AWS S3 File Uploads)
  * Mailtrap or SMTP Server (for Nodemailer Email Sending)
  * Stripe Account (for Credit Card Payments)

---

## 2. Step-by-Step Installation & Setup

### Step 1: Clone or Extract the Project
Navigate to your working workspace directory and extract or clone the repository:
```bash
git clone https://github.com/yanayem/NestJS-Boilerplate.git
cd NestJS-Boilerplate
```

### Step 2: Install Project Dependencies
Run the following command to install both NestJS and Next.js dependencies:
```bash
npm install
```

### Step 3: Create Environment Variables
Copy the `.env.example` file to create your active `.env` file:
```bash
cp .env.example .env
```

### Step 4: Run the Application
To run the full-stack project (NestJS Backend + Next.js Frontend concurrently):
```bash
npm run dev
```

If you only want to start the NestJS Backend in watch mode:
```bash
npm run dev:backend
```

---

## 3. Environment Configuration Guide

Open the `.env` file in your text editor and update the keys according to your setup:

### Base Settings
```env
PORT=3000
NODE_ENV=development
APP_NAME="SaaS Boilerplate"
API_PREFIX=api/v1
```

### Database Connection
```env
MONGO_URI=mongodb://localhost:27017/nestjs-saas-db
```
*Note: Replace with your MongoDB Atlas URI if using cloud database.*

### JWT Security Keys
```env
JWT_SECRET=your_super_secret_jwt_access_key
JWT_EXPIRATION=15m
JWT_REFRESH_SECRET=your_super_secret_jwt_refresh_key
JWT_REFRESH_EXPIRATION=7d
```

### Mailer Configuration (SMTP)
```env
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_smtp_username
MAIL_PASS=your_smtp_password
MAIL_FROM="SaaS App <no-reply@saasapp.com>"
```

### AWS S3 Storage Setup
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name
```

### Stripe Payment Gateway
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
```

---

## 4. Using the Web UI Dashboard & Swagger

### A. Next.js Web UI Dashboard
Open your browser and navigate to:
```text
http://localhost:3000
```
This interface allows you to:
* Test User Registration and Login.
* View JWT tokens saved in browser storage.
* Perform S3 File Upload tests.
* Execute Stripe Payment Intent tests.

### B. Swagger OpenAPI Documentation
Navigate to:
```text
http://localhost:3000/docs
```
* You can test every API endpoint interactively.
* Click **Authorize** at the top right and paste `Bearer <access_token>` to authenticate secure routes.

---

## 5. Authentication & Authorization Workflow

### 1. Register a New User
* **Endpoint**: `POST /api/v1/auth/register`
* **Payload**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "Password123!"
  }
  ```
* **Response**: Returns user details along with `accessToken` and `refreshToken`.

### 2. Login User
* **Endpoint**: `POST /api/v1/auth/login`
* **Payload**:
  ```json
  {
    "email": "jane@example.com",
    "password": "Password123!"
  }
  ```
* **Response**:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "data": {
      "accessToken": "eyJhbGciOi...",
      "refreshToken": "eyJhbGciOi...",
      "user": {
        "id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "USER"
      }
    }
  }
  ```

### 3. Refresh Access Token
When your 15-minute Access Token expires, use the Refresh Token to obtain a new Access Token without asking the user to log in again:
* **Endpoint**: `POST /api/v1/auth/refresh`
* **Payload**:
  ```json
  {
    "refreshToken": "<your_refresh_token>"
  }
  ```

---

## 6. Role-Based Access Control (RBAC)

The system supports three user roles:
1. **`USER`**: Default role for new sign-ups. Can access their own data, upload files, and process payments.
2. **`MANAGER`**: Can view all non-deleted user lists and view user details.
3. **`ADMIN`**: Full administrative access, including soft-deleting users.

---

## 7. User Management & Soft Delete

### Viewing Profile (`GET /api/v1/users/me`)
Send `Authorization: Bearer <access_token>` in header to fetch currently logged-in user profile.

### Soft Deleting Users (`DELETE /api/v1/users/:id`)
* Restricted to **`ADMIN`** role.
* Calling this endpoint updates `isDeleted: true` on the target user document.
* Soft-deleted users are automatically filtered out from normal user listings to preserve historical integrity.

---

## 8. AWS S3 File Upload Setup & Usage

### Setup Instructions:
1. Create an AWS S3 Bucket in AWS Console.
2. Create an IAM user with `AmazonS3FullAccess` permissions.
3. Retrieve your `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
4. Enter bucket name and keys into `.env`.

### Uploading a File:
* **Endpoint**: `POST /api/v1/upload`
* **Header**: `Authorization: Bearer <access_token>`
* **Content-Type**: `multipart/form-data`
* **Form Data Key**: `file` (Select file from computer)
* **Response**: Returns public S3 image/file URL.

---

## 9. Nodemailer Email Setup & Usage

### Setup Instructions with Mailtrap:
1. Create a free account at [Mailtrap.io](https://mailtrap.io).
2. Get your SMTP Host, Port, Username, and Password.
3. Update `.env` with these values.

### Triggering Emails:
* Welcome emails are automatically dispatched upon registration.
* Password reset tokens can be dispatched asynchronously using the Mail module service.

---

## 10. Stripe Payment Intent & Webhook Setup

### Setup Instructions:
1. Sign up for a free Stripe Account at [Stripe.com](https://stripe.com).
2. Retrieve your **Test Secret Key** (`sk_test_...`) from Stripe Developer Dashboard.
3. Enter `STRIPE_SECRET_KEY` in `.env`.

### Creating a Payment Intent:
* **Endpoint**: `POST /api/v1/payment/create-intent`
* **Header**: `Authorization: Bearer <access_token>`
* **Payload**:
  ```json
  {
    "amount": 29.99,
    "currency": "usd"
  }
  ```
* **Response**: Returns `clientSecret` for completing checkout on the frontend.

---

## 11. Troubleshooting & FAQs

### Q1: App fails to start with MongoNetworkError
**Solution**: Ensure your MongoDB daemon is running locally (`mongod`) or that your MongoDB Atlas URI in `.env` is correct and IP whitelist includes your current IP address.

### Q2: 401 Unauthorized Error on API requests
**Solution**: Ensure you are passing the header `Authorization: Bearer <your_token>` and that the access token has not expired.

### Q3: How to set a user as ADMIN?
**Solution**: In your MongoDB GUI (e.g., MongoDB Compass or Robo 3T), locate the user document in the `users` collection and set `"role": "ADMIN"`.

---

## 📩 Support & Contact

If you need further assistance, feel free to contact:
* 📧 **Email**: [arafatnayem1@gmail.com](mailto:arafatnayem1@gmail.com)
