# E-Commerce Web Application

A premium, full-stack E-Commerce Application built with modern technologies.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: NextAuth.js (JWT credentials)
- **Icons**: Lucide React

## Features
- 🎨 **Premium UI/UX**: Dark mode by default, glassmorphism aesthetics, and smooth micro-animations.
- 🔐 **Secure Authentication**: Registration and Login using encrypted passwords (bcrypt) and JSON Web Tokens.
- 🛍️ **Product Management**: Browse featured products and categories dynamically fetched from the database.
- 🛒 **Shopping Cart**: Fully functional state management for adding items.
- 📦 **API Integration**: RESTful Next.js API routes for seamless frontend-backend communication.

## Getting Started

First, install the dependencies:
```bash
npm install
```

Next, apply the Prisma database schema and seed it with sample data:
```bash
npx prisma db push
npx prisma generate
npx tsx prisma/seed.ts
```

Finally, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sample Accounts
The database has been seeded with the following sample accounts (Password for all: `password123`):
- `hseniv@example.com` (Customer)
- `dumku@example.com` (Customer)
- `kutty@example.com` (Customer)
- `admin@example.com` (Admin)
