# Hasnain Online Quran Academy

A full-stack online Quran academy website built with **Next.js**, **Supabase**, and **Tailwind CSS**.

## Features

- Public website with courses, teachers, blog, and free trial registration
- Dashboard with role-based access (Manager, Supervisor, Teacher, Student)
- User management (create, edit, delete users with role hierarchy)
- Teacher-student assignments
- Blog system with rich text editor and featured images
- Free trial / contact form submissions with email notifications
- Country selector with phone masks and SVG flags
- WhatsApp integration for quick contact
- Fully responsive design

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Styling:** Tailwind CSS
- **Email:** Nodemailer (SMTP)
- **Icons:** Lucide React
- **Flags:** country-flag-icons

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the full database setup:

```bash
# Copy and paste the contents of this file into the SQL Editor:
scripts/db_backup.sql
```

This creates all tables, indexes, triggers, RLS policies, and storage buckets.

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials and SMTP settings in `.env.local`.

| Variable | Where to find it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase > Settings > API > Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase > Settings > API > anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase > Settings > API > service_role key |
| `SMTP_PASS` | Gmail > Account > Security > App Passwords |

### 4. Create the first manager account

1. Go to Supabase > Authentication > Users > **Add User**
2. Enter email and password
3. Go to SQL Editor and run:

```sql
UPDATE profiles SET role = 'manager' WHERE email = 'your-email@example.com';
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js pages (App Router)
│   ├── api/                # API routes
│   │   ├── users/          # User CRUD (manager/supervisor only)
│   │   ├── assignments/    # Teacher-student assignments
│   │   ├── blog/           # Blog CRUD
│   │   ├── teachers/       # Public teachers list
│   │   ├── trials/         # Free trial submissions
│   │   └── whatsapp/       # WhatsApp form + email notification
│   ├── dashboard/          # Protected dashboard pages
│   ├── blog/               # Public blog
│   ├── courses/            # Courses page
│   ├── teachers/           # Public teachers page
│   └── register/           # Registration / free trial form
├── components/             # React components
│   ├── dashboard/          # Dashboard-specific components
│   └── ...                 # Shared components
├── lib/
│   ├── supabase/           # Supabase client setup & types
│   ├── countries.ts        # Country list with dial codes & masks
│   ├── email.ts            # Nodemailer SMTP email
│   └── validation.ts       # Password validation rules
└── middleware.ts            # Auth middleware
scripts/
├── db_backup.sql           # Full database schema (run in Supabase SQL Editor)
└── db-indexes.sql          # Optimization indexes (safe to re-run)
```

## User Roles

| Role | Permissions |
|------|------------|
| **Manager** | Full access: manage all users, assignments, blog, trials |
| **Supervisor** | Manage students & teachers, assignments, trials |
| **Teacher** | View assigned students, own profile |
| **Student** | View own profile |

## Deployment

Build for production:

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js hosting platform. Make sure to set all environment variables from `.env.example`.
