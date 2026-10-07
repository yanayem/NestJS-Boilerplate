# 📘 NestJS + MongoDB SaaS Boilerplate — Complete Developer Documentation

This comprehensive documentation covers how to set up, use, and present your **NestJS + MongoDB SaaS Boilerplate** project, including the architecture, request lifecycle, data flow, security setup, and API specifications.

---

## 🏗️ 1. Project Architecture & Request Lifecycle (How It Works)

This project follows NestJS **Modular Architecture** and a **Unified Single Server Approach** (serving both the interactive Web UI and the REST API from a single process).

### Request Lifecycle & Data Flow:
1. **Client Request**: Sent from the Web Dashboard (`http://localhost:3000/`) or any API client (e.g., Postman, Swagger UI).
2. **Helmet & CORS Middleware**: Secures HTTP headers and enforces Cross-Origin Resource Sharing rules.
3. **Throttler Guard (Rate Limiting)**: Prevents DDoS attacks by limiting client requests (default: 100 requests per 60s).
4. **Validation Pipe (`class-validator`)**: Validates request DTO schemas and sanitizes input data.
5. **Guards & Strategies**:
   - `JwtAuthGuard`: Extracts and verifies `Bearer <token>` from the HTTP `Authorization` header.
   - `RolesGuard`: Verifies whether the authenticated user possesses the required role (`ADMIN`, `MANAGER`, `USER`).
6. **Services & Mongoose Models**: Executes core business logic and communicates with MongoDB.
   - Password fields are automatically hashed using `bcrypt` pre-save hooks.
   - Soft deletion is managed transparently via `isDeleted: true` query filters.
7. **Interceptors & Filters**:
   - `TransformInterceptor`: Wraps successful responses in a standard JSON structure:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "data": { ... }
     }
     ```
   - `HttpExceptionFilter`: Catches global exceptions and returns formatted error JSON:
     ```json
     {
       "success": false,
       "statusCode": 400,
       "timestamp": "2025-01-01T00:00:00.000Z",
       "path": "/api/v1/auth/login",
       "message": "Invalid email or password"
     }
     ```

---

## 🚀 2. Quick Start & Setup Guide

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Environment Configuration (`.env`)
Create a `.env` file in the project root based on `.env.example`:
```env
# Application Configuration
PORT=3000
NODE_ENV=development
APP_NAME="SaaS Boilerplate"
API_PREFIX=api/v1

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/nestjs-saas-db

# JWT Tokens
JWT_SECRET=super_secret_jwt_access_key
JWT_EXPIRATION=15m
JWT_REFRESH_SECRET=super_secret_jwt_refresh_key
JWT_REFRESH_EXPIRATION=7d

# Mailer (Nodemailer)
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_smtp_username
MAIL_PASS=your_smtp_password
MAIL_FROM="SaaS App <no-reply@saasapp.com>"

# AWS S3 Storage
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_S3_BUCKET_NAME=your_s3_bucket_name

# Stripe Payment Gateway
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# Rate Limiting
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

## 🛠️ 3. Module Breakdown & Usage Guide

### 🔑 A. Authentication & Authorization (`src/modules/auth`)

1. **User Registration (`POST /api/v1/auth/register`)**:
   - **Request Body**: `{ "name": "John Doe", "email": "john@example.com", "password": "Password123!" }`
   - **Behavior**:
     - Hashes password with `bcrypt`.
     - Generates an `accessToken` and a `refreshToken`.
     - Stores the hashed refresh token in the MongoDB User document.
     - Asynchronously dispatches a Welcome Email via Nodemailer.

2. **User Login (`POST /api/v1/auth/login`)**:
   - **Request Body**: `{ "email": "john@example.com", "password": "Password123!" }`
   - **Behavior**: Validates credentials and returns fresh `accessToken` and `refreshToken`.

3. **Token Refresh (`POST /api/v1/auth/refresh`)**:
   - **Request Body**: `{ "refreshToken": "eyJhbG..." }`
   - **Behavior**: Verifies the hashed refresh token and returns a new `accessToken`.

4. **Logout (`POST /api/v1/auth/logout`)**:
   - **Header**: `Authorization: Bearer <accessToken>`
   - **Behavior**: Removes the hashed refresh token from the database.

---

### 👤 B. User Management (`src/modules/users`)

1. **Get My Profile (`GET /api/v1/users/me`)**:
   - **Header**: `Authorization: Bearer <accessToken>`
   - **Behavior**: Returns current authenticated user details.

2. **List All Users (`GET /api/v1/users`)**:
   - **Access Control**: Restricted to `ADMIN` and `MANAGER` roles.
   - **Behavior**: Retrieves all non-deleted user records.

3. **Update User (`PATCH /api/v1/users/:id`)**:
   - **Behavior**: Allows users to update their profile or admins to update any profile.

4. **Soft Delete User (`DELETE /api/v1/users/:id`)**:
   - **Access Control**: Restricted to `ADMIN` role.
   - **Behavior**: Sets `isDeleted: true` on the record to preserve historical data safely.

---

### ☁️ C. File Upload Module (`src/modules/upload`)

1. **Upload File to AWS S3 (`POST /api/v1/upload`)**:
   - **Header**: `Authorization: Bearer <accessToken>`
   - **Body (`multipart/form-data`)**: `file: <your_file>`
   - **Behavior**: Uploads file directly to configured AWS S3 bucket and returns the public S3 URL.

---

### 💳 D. Stripe Payment Module (`src/modules/payment`)

1. **Create Payment Intent (`POST /api/v1/payment/create-intent`)**:
   - **Request Body**: `{ "amount": 49.99, "currency": "usd" }`
   - **Behavior**: Communicates with Stripe API to generate a client secret for checkout elements.

2. **Stripe Webhook Listener (`POST /api/v1/payment/webhook`)**:
   - **Header**: `stripe-signature`
   - **Behavior**: Listens for asynchronous payment events (e.g. `payment_intent.succeeded`).

---

## 🖥️ 4. Interactive Application Surfaces

1. **Web UI Dashboard**:
   - 🌐 **URL**: `http://localhost:3000/`
   - Modern Tailwind CSS interface for interactive API testing, user authentication, file uploads, and payment intents.
2. **Swagger OpenAPI Documentation**:
   - 📚 **URL**: `http://localhost:3000/docs`
   - Interactive OpenAPI dashboard for endpoint testing and API export.
