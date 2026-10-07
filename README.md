# Fullstack SaaS Boilerplate (NestJS + Next.js) 🚀

A complete, production-ready Boilerplate for building scalable SaaS applications. This monorepo contains a **NestJS + MongoDB** backend API and a **Next.js + Tailwind CSS** frontend — all served from a single server.

---

## 🌟 Features

### Backend (NestJS)
- **JWT Authentication**: Access & Refresh Tokens with Bcrypt password hashing
- **Social Login**: Google OAuth integration
- **Role-Based Access Control (RBAC)**: Admin, Manager, User roles
- **MongoDB (Mongoose)**: User schema with Soft Delete
- **Rate Limiting**: DDoS protection via `@nestjs/throttler`
- **Helmet & CORS**: Security headers configured
- **File Upload**: AWS S3 Upload Module
- **Email Service**: Nodemailer integration
- **Payment Gateway**: Stripe payment intents & webhook handling
- **Swagger API Docs**: Interactive API documentation at `/docs`
- **Global Exception Handling**: Unified error responses
- **Input Validation**: `class-validator` with `ValidationPipe`

### Frontend (Next.js + Tailwind CSS)
- **Landing Page**: Professional hero section with feature showcase
- **Login Page**: Email/password + Google OAuth sign-in
- **Register Page**: Full registration with validation
- **Dashboard**: Stats overview, quick actions, recent activity
- **Profile Page**: View & edit profile, change password
- **User Management**: Admin-only user table with delete (RBAC)
- **File Upload Page**: Drag & drop file uploader with S3 integration
- **Payments Page**: Stripe payment intent creation & history
- **Auth Protection**: JWT-based route guarding
- **Responsive Design**: Works on desktop, tablet, and mobile

---

## 📂 Folder Structure

```
NestJS Boilerplate/
├── frontend/                       # Next.js UI Application
│   └── src/
│       ├── app/
│       │   ├── page.tsx            # Landing Page
│       │   ├── login/page.tsx      # Login Page
│       │   ├── register/page.tsx   # Register Page
│       │   └── dashboard/
│       │       ├── layout.tsx      # Dashboard Layout (Navbar + Sidebar)
│       │       ├── page.tsx        # Dashboard Home
│       │       ├── profile/        # Profile Page
│       │       ├── users/          # Admin User Management
│       │       ├── upload/         # File Upload Page
│       │       └── payments/       # Payments Page
│       ├── components/
│       │   ├── Navbar.tsx          # Top Navigation Bar
│       │   └── Sidebar.tsx         # Side Navigation Menu
│       └── utils/
│           └── api.ts              # Axios instance with JWT interceptor
│
├── src/                            # NestJS Backend API
│   ├── main.ts                     # Entry point (Helmet, CORS, Swagger)
│   ├── app.module.ts               # Root module
│   ├── config/configuration.ts     # Environment config loader
│   ├── common/                     # Guards, Decorators, Filters, Interceptors
│   └── modules/
│       ├── auth/                   # JWT + Google OAuth strategies
│       ├── users/                  # User CRUD + Mongoose schema
│       ├── mail/                   # Email service (Nodemailer)
│       ├── upload/                 # AWS S3 file upload
│       └── payment/                # Stripe payment handling
│
├── .env / .env.example             # Environment variables
├── package.json                    # Root scripts & dependencies
└── README.md                       # This file
```

---

## 🛠️ Prerequisites

- **Node.js**: v18 or later
- **MongoDB**: Local instance or MongoDB Atlas URL

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Configure Environment
```bash
cp .env.example .env
```

**Environment Variables:**

| Key | Description |
|-----|-------------|
| `PORT` | Server port (default: 3000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `JWT_ACCESS_EXPIRATION` | Access token expiry (e.g., `15m`) |
| `JWT_REFRESH_EXPIRATION` | Refresh token expiry (e.g., `7d`) |
| `AWS_REGION` | AWS region for S3 |
| `AWS_ACCESS_KEY_ID` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `AWS_S3_BUCKET` | S3 bucket name |
| `MAIL_HOST` | SMTP host (e.g., smtp.mailtrap.io) |
| `MAIL_PORT` | SMTP port |
| `MAIL_USER` | SMTP username |
| `MAIL_PASS` | SMTP password |
| `MAIL_FROM` | Default sender email |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |

### 3. Run the Project
```bash
npm run build       # Builds frontend + backend
npm run start:dev   # Starts the server (frontend + API on port 3000)
```

- **UI**: `http://localhost:3000`
- **API**: `http://localhost:3000/api/v1`
- **Swagger Docs**: `http://localhost:3000/docs`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login & get tokens |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| GET | `/api/v1/auth/google` | Google OAuth login |

### Users (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users/me` | Get current user profile |
| GET | `/api/v1/users` | List all users (Admin/Manager) |
| POST | `/api/v1/users` | Create user (Admin) |
| PATCH | `/api/v1/users/:id` | Update user (Admin) |
| DELETE | `/api/v1/users/:id` | Soft delete user (Admin) |

### Upload (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/upload` | Upload file to S3 |

### Payment (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/payment/create-intent` | Create Stripe payment intent |
| POST | `/api/v1/payment/webhook` | Stripe webhook listener |

---

## 💡 Customization

- **Add Roles**: Edit `src/common/enums/role.enum.ts`
- **Email Templates**: Customize `src/modules/mail/mail.service.ts`
- **Switch to Cloudinary**: Replace S3 logic in `src/modules/upload/upload.service.ts`
- **Add Pages**: Create new folders in `frontend/src/app/dashboard/`

---

## 📄 License

MIT — use it for personal or commercial projects.

Happy Coding! 💻
