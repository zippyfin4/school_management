# School Management System - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Requirements](#system-requirements)
3. [Project Structure](#project-structure)
4. [Installation & Setup](#installation--setup)
5. [Environment Configuration](#environment-configuration)
6. [Database Setup](#database-setup)
7. [Running the Application](#running-the-application)
8. [API Endpoints](#api-endpoints)
9. [Database Models & Schema](#database-models--schema)
10. [Key Features](#key-features)
11. [Tech Stack](#tech-stack)
12. [Troubleshooting](#troubleshooting)

---

## Project Overview

**School Management System** is a comprehensive full-stack web application built with Next.js and PostgreSQL that streamlines school administration. The system manages students, teachers, parents, classes, lessons, exams, assignments, attendance, and announcements.

### Key Capabilities:
- Multi-role authentication (Admin, Teacher, Student, Parent)
- Student and teacher management
- Class and subject management
- Lesson scheduling and timetable management
- Exam and assignment tracking
- Attendance management
- Event and announcement system
- Dashboard with analytics charts
- Responsive UI with Tailwind CSS

---

## System Requirements

### Minimum Hardware Requirements:
- **CPU**: Dual-core processor
- **RAM**: 4 GB minimum (8 GB recommended)
- **Storage**: 5 GB free space

### Software Requirements:

#### Essential:
1. **Node.js**: Version 18.x or higher
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm**: Comes with Node.js (version 9.x or higher)
   - Verify installation: `npm --version`

3. **PostgreSQL**: Version 15 or higher
   - Download from: https://www.postgresql.org/download/
   - Verify installation: `psql --version`

4. **Git**: For version control
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

#### Optional:
- **Docker & Docker Compose**: For containerized deployment
- **VS Code**: Recommended IDE with extensions:
  - Prisma
  - TypeScript Vue Plugin
  - ES7+ React/Redux/React-Native snippets

---

## Project Structure

```
school_management/
├── src/
│   ├── app/                          # Next.js app directory
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   ├── (dashboard)/              # Protected dashboard routes
│   │   │   ├── admin/                # Admin dashboard
│   │   │   ├── teacher/              # Teacher dashboard
│   │   │   ├── student/              # Student dashboard
│   │   │   ├── parent/               # Parent dashboard
│   │   │   └── list/                 # Management pages
│   │   │       ├── announcements/
│   │   │       ├── assignments/
│   │   │       ├── classes/
│   │   │       ├── events/
│   │   │       ├── exams/
│   │   │       ├── lessons/
│   │   │       ├── parents/
│   │   │       ├── results/
│   │   │       ├── students/
│   │   │       ├── subjects/
│   │   │       └── teachers/
│   │   ├── api/                      # API routes
│   │   │   └── auth/
│   │   │       ├── login/            # Login endpoint
│   │   │       ├── logout/           # Logout endpoint
│   │   │       └── health/           # Health check
│   │   └── sign-in/                  # Authentication page
│   ├── components/                   # Reusable React components
│   │   ├── forms/                    # Form components
│   │   ├── store/                    # Zustand state management
│   │   └── ...other UI components
│   ├── lib/                          # Utility functions & helpers
│   │   ├── actions.ts                # Server actions
│   │   ├── data.ts                   # Data fetching
│   │   ├── formValidationSchemas.ts  # Zod validation schemas
│   │   ├── prisma.ts                 # Prisma client
│   │   ├── settings.ts               # Configuration
│   │   └── utils.ts                  # Helper functions
│   └── middleware.ts                 # Next.js middleware
├── prisma/                           # Database schema & migrations
│   ├── schema.prisma                 # Data models definition
│   ├── seed.ts                       # Database seeding script
│   └── migrations/                   # Database migrations
├── public/                           # Static assets
├── .env.local                        # Environment variables
├── .eslintrc.json                    # ESLint configuration
├── docker-compose.yml                # Docker composition file
├── Dockerfile                        # Docker image definition
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── postcss.config.mjs                # PostCSS configuration
└── package.json                      # Project dependencies

```

### Directory Purposes:

| Directory | Purpose |
|-----------|---------|
| `src/app` | Next.js app router pages and layouts |
| `src/components` | Reusable UI components |
| `src/lib` | Business logic, utilities, and helpers |
| `prisma` | Database schema, models, and migrations |
| `public` | Static files (images, fonts, etc.) |

---

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd school_management
```

### Step 2: Install Dependencies

```bash
npm install
```

This command will:
- Download all packages from `package.json`
- Install both dependencies and devDependencies
- Create `node_modules` folder
- Generate `package-lock.json`

**Installation time**: 2-5 minutes depending on internet speed

### Step 3: Install PostgreSQL (if not already installed)

**Windows**:
1. Download from https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for the `postgres` user
4. Keep default port as `5432`

**macOS**:
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian)**:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 4: Create Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE school_management;

# Exit psql
\q
```

Alternatively, use a GUI tool like **pgAdmin** or **DBeaver**.

---

## Environment Configuration

### Step 1: Create `.env.local` File

In the project root directory, create a `.env.local` file with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/school_management"

# JWT Configuration
JWT_SECERET="your_jwt_secret_key_here"

# Next.js Public URLs
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Clerk Authentication (Optional)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_key"
CLERK_SECRET_KEY="your_clerk_secret"

# Cloudinary Configuration (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_name"

# Environment
NODE_ENV="development"
```

### Environment Variables Explanation:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/dbname` |
| `JWT_SECERET` | Secret key for JWT tokens | `your_super_secret_key_123` |
| `NEXT_PUBLIC_API_URL` | Base URL for API calls | `http://localhost:3000` |
| `NODE_ENV` | Environment type | `development` or `production` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image uploads | Get from cloudinary.com |

### Step 2: Update Database URL

Edit `DATABASE_URL` in `.env.local`:
- Replace `YOUR_PASSWORD` with your PostgreSQL password
- If using different username/port, update accordingly

Example:
```env
DATABASE_URL="postgresql://postgres:mypassword123@localhost:5432/school_management"
```

---

## Database Setup

### Step 1: Initialize Prisma

```bash
# Install Prisma CLI
npm install -D prisma

# Generate Prisma client
npx prisma generate
```

### Step 2: Run Migrations

```bash
# Create and apply database schema
npx prisma migrate dev --name init
```

This command:
- Creates database tables based on `schema.prisma`
- Generates migration files in `prisma/migrations/`
- Generates Prisma Client

### Step 3: Seed Database (Optional)

To populate the database with sample data:

```bash
npx prisma db seed
```

This runs the script in `prisma/seed.ts` (if it exists).

### Step 4: Verify Database Setup

```bash
# Open Prisma Studio
npx prisma studio
```

This opens a visual database manager at `http://localhost:5555`

---

## Running the Application

### Development Mode

```bash
npm run dev
```

**Output**:
```
▲ Next.js 14.2.5
- Local:        http://localhost:4000
```

The application will be available at: **http://localhost:4000**

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm start
```

### With Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access at http://localhost:3000
```

---

## API Endpoints

### Authentication Routes

All API endpoints are located in `src/app/api/auth/`

#### 1. Login
- **Route**: `/api/auth/login`
- **Method**: `POST`
- **Purpose**: Authenticate user and return JWT token
- **Request Body**:
```json
{
  "username": "admin",
  "password": "password123"
}
```
- **Response**:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "admin",
    "role": "ADMIN"
  }
}
```

#### 2. Logout
- **Route**: `/api/auth/logout`
- **Method**: `POST`
- **Purpose**: Clear session/token

#### 3. Health Check
- **Route**: `/api/auth/health`
- **Method**: `GET`
- **Purpose**: Verify API is running
- **Response**:
```json
{
  "status": "ok"
}
```

### Dashboard Routes

#### Admin Dashboard
- **Route**: `/list/students` - View all students
- **Route**: `/list/teachers` - View all teachers
- **Route**: `/list/classes` - Manage classes
- **Route**: `/list/subjects` - Manage subjects
- **Route**: `/list/announcements` - View announcements

#### Teacher Routes
- **Route**: `/list/lessons` - View assigned lessons
- **Route**: `/list/exams` - Manage exams
- **Route**: `/list/assignments` - Create/manage assignments

#### Student Routes
- **Route**: `/student` - Student dashboard
- **Route**: `/list/results` - View exam results

#### Parent Routes
- **Route**: `/parent` - Parent dashboard

---

## Database Models & Schema

### User Models

#### Admin
```prisma
model Admin {
  id       String @id @unique @default(uuid())
  username String @unique
  password String
  role     UserRole
}
```
- Manages the entire system
- Full access to all features

#### Student
```prisma
model Student {
  id           String
  username     String @unique
  name         String
  surname      String
  email        String? @unique
  phone        String? @unique
  address      String
  bloodType    String
  sex          UserSex
  birthday     DateTime
  parentId     String     (links to Parent)
  classId      Int        (links to Class)
  gradeId      Int        (links to Grade)
  attendances  Attendance[]
  results      Result[]
}
```
- Children of parents
- Assigned to classes and grades
- Can have attendance records and exam results

#### Teacher
```prisma
model Teacher {
  id        String @id @unique @default(uuid())
  username  String @unique
  name      String
  surname   String
  email     String? @unique
  phone     String? @unique
  address   String
  bloodType String
  sex       UserSex
  birthday  DateTime
  subjects  Subject[]
  lessons   Lesson[]
  classes   Class[]
}
```
- Teaches subjects and lessons
- Can supervise classes
- Creates and grades assignments/exams

#### Parent
```prisma
model Parent {
  id       String @id @unique @default(uuid())
  username String @unique
  name     String
  surname  String
  email    String? @unique
  phone    String @unique
  address  String
  students Student[]
}
```
- Can have multiple children (students)
- Views child's progress and attendance

### Academic Models

#### Class
```prisma
model Class {
  id           Int       @id @default(autoincrement())
  name         String    @unique
  capacity     Int
  supervisorId String?   (Teacher ID)
  gradeId      Int       (Grade level)
  lessons      Lesson[]
  students     Student[]
  events       Event[]
  announcements Announcement[]
}
```
- Contains students
- Has lessons and a supervisor (teacher)
- Organized by grade/level

#### Grade
```prisma
model Grade {
  id        Int    @id @default(autoincrement())
  level     Int    @unique
  students  Student[]
  classess  Class[]
}
```
- Represents class level (1st grade, 2nd grade, etc.)
- Multiple classes can belong to same grade

#### Subject
```prisma
model Subject {
  id       Int       @id @default(autoincrement())
  name     String    @unique
  teachers Teacher[]
  lessons  Lesson[]
}
```
- Subjects taught in school (Math, English, etc.)
- Taught by teachers in lessons

#### Lesson
```prisma
model Lesson {
  id        Int      @id @default(autoincrement())
  name      String
  day       Day      (MONDAY-FRIDAY)
  startTime DateTime
  endTime   DateTime
  subjectId Int      (Subject ID)
  classId   Int      (Class ID)
  teacherId String   (Teacher ID)
  exams     Exam[]
  assignments Assignment[]
  attendances Attendance[]
}
```
- Individual class sessions
- Scheduled for specific day and time
- Has exams and assignments

### Assessment Models

#### Exam
```prisma
model Exam {
  id        Int      @id @default(autoincrement())
  title     String
  startTime DateTime
  endTime   DateTime
  lessonId  Int      (Lesson ID)
  results   Result[]
}
```
- Tests students take
- Associated with lessons
- Has results for students

#### Assignment
```prisma
model Assignment {
  id        Int      @id @default(autoincrement())
  title     String
  startDate DateTime
  dueDate   DateTime
  lessonId  Int      (Lesson ID)
  results   Result[]
}
```
- Homework/projects
- Has due dates
- Students submit and get graded

#### Result
```prisma
model Result {
  id           Int      @id @default(autoincrement())
  score        Int
  examId       Int?     (Exam ID - optional)
  assignmentId Int?     (Assignment ID - optional)
  studentId    String   (Student ID)
}
```
- Student scores for exams or assignments
- Links to both exam and assignment

### Attendance Model

```prisma
model Attendance {
  id        Int      @id @default(autoincrement())
  date      DateTime
  present   Boolean
  studentId String   (Student ID)
  lessonId  Int      (Lesson ID)
}
```
- Tracks student attendance per lesson
- Records date and presence status

### Communication Models

#### Event
```prisma
model Event {
  id          Int     @id @default(autoincrement())
  title       String
  description String
  startTime   DateTime
  endTime     DateTime
  classId     Int?    (optional - for specific class)
}
```
- School events (field trips, sports day, etc.)
- Can be for specific class or whole school

#### Announcement
```prisma
model Announcement {
  id          Int     @id @default(autoincrement())
  title       String
  description String
  date        DateTime
  classId     Int?    (optional - for specific class)
}
```
- Important announcements
- Can target specific classes or all students

### Enums

```prisma
enum UserRole {
  ADMIN    # Full system access
  TEACHER  # Teach lessons, grade students
  STUDENT  # View own grades and attendance
  PARENT   # View child's information
}

enum UserSex {
  MALE
  FEMALE
}

enum Day {
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
}
```

---

## Key Features

### 1. Authentication & Authorization
- Multi-role login system (Admin, Teacher, Student, Parent)
- JWT token-based authentication
- Role-based access control

### 2. Student Management
- Student profile with personal information
- Class assignment
- Birthday tracking
- Blood type and contact information

### 3. Teacher Management
- Teacher profiles with specialization
- Subject assignment
- Class supervision
- Lesson creation

### 4. Class & Grade Management
- Organize students by class and grade
- Set class capacity
- Assign supervisors

### 5. Academic Planning
- Create lessons and schedule them
- Organize by day and time
- Assign teachers and subjects

### 6. Assessment Tracking
- Create and schedule exams
- Create and manage assignments
- Record and track student results
- Score management

### 7. Attendance System
- Mark student attendance per lesson
- Track presence/absence
- Generate attendance reports

### 8. Communication
- Publish announcements to classes
- Create school events
- Schedule and manage events

### 9. Dashboard Analytics
- Attendance charts
- Performance analytics
- Finance charts
- Student and teacher statistics

### 10. Responsive UI
- Mobile-friendly interface
- Modern design with Tailwind CSS
- Interactive charts and calendar
- Real-time form validation

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18 | UI library |
| **Next.js** | 14.2.5 | React framework with SSR |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 3.4.1 | Styling |
| **React Hook Form** | 7.52.2 | Form state management |
| **Zod** | 3.23.8 | Schema validation |
| **Zustand** | 5.0.8 | State management |
| **React Big Calendar** | 1.13.2 | Calendar component |
| **Recharts** | 2.12.7 | Charts and graphs |
| **React Toastify** | 10.0.5 | Toast notifications |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js API Routes** | 14.2.5 | Backend API |
| **Prisma** | 5.19.1 | ORM |
| **PostgreSQL** | 15 | Database |

### Authentication
| Technology | Version | Purpose |
|-----------|---------|---------|
| **JWT** | 9.0.2 | Token-based auth |
| **jose** | 6.1.3 | JWT handling |

### Development Tools
| Tool | Version | Purpose |
|------|---------|---------|
| **ESLint** | 8 | Code linting |
| **TypeScript** | 5 | Type checking |
| **PostCSS** | 8 | CSS processing |

---

## Troubleshooting

### Common Issues & Solutions

#### 1. Database Connection Error
```
Error: getaddrinfo ENOTFOUND localhost
```

**Solution**:
- Check PostgreSQL is running: `psql -U postgres`
- Verify `DATABASE_URL` in `.env.local`
- Ensure database name exists: `psql -U postgres -l`
- Correct format: `postgresql://username:password@localhost:5432/dbname`

#### 2. Port Already in Use
```
Error: listen EADDRINUSE :::4000
```

**Solution**:
```bash
# Kill process on port 4000 (Windows)
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 5000
```

#### 3. Prisma Client Not Generated
```
Error: @prisma/client did not initialize
```

**Solution**:
```bash
npx prisma generate
npm install
```

#### 4. Migration Issues
```
Error: Pending Prisma migrations detected
```

**Solution**:
```bash
# Run pending migrations
npx prisma migrate deploy

# Or create new migration
npx prisma migrate dev --name <migration_name>
```

#### 5. JWT Secret Not Set
```
Error: JWT_SECERET is undefined
```

**Solution**:
- Add `JWT_SECERET` to `.env.local`
- Example: `JWT_SECERET="my_super_secret_key_123"`

#### 6. Module Not Found Errors
```
Error: Cannot find module '@/lib/actions'
```

**Solution**:
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install

# Or
npm ci
```

#### 7. Build Fails
```
Error: next build fails
```

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Try building again
npm run build
```

#### 8. Cloudinary Upload Fails
```
Error: Cloudinary cloud name not set
```

**Solution**:
- Sign up at cloudinary.com
- Add to `.env.local`: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"`

### Debug Mode

Enable verbose logging for debugging:

```bash
# Set debug mode
export DEBUG=* npm run dev

# Or on Windows
set DEBUG=* && npm run dev
```

### Useful Commands Reference

```bash
# Development
npm run dev                    # Start dev server

# Building
npm run build                  # Build for production
npm start                      # Start production server

# Code Quality
npm run lint                   # Run ESLint

# Database
npx prisma studio             # Open database UI
npx prisma generate           # Generate Prisma client
npx prisma migrate dev         # Create/apply migrations
npx prisma db seed            # Seed database
npx prisma db push            # Push schema to database

# Docker
docker-compose up              # Start with Docker
docker-compose down            # Stop Docker containers
```

---

## Deployment Guide

### Deploy to Vercel

1. **Push code to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
   - Go to vercel.com
   - Connect your GitHub account
   - Select this repository

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Deploy**
   - Push to main branch
   - Vercel auto-deploys

### Deploy to Docker

```bash
# Build image
docker build -t school-management .

# Run container
docker run -p 3000:3000 --env-file .env.local school-management

# Or use docker-compose
docker-compose up -d
```

---

## Support & Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs/
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Hook Form**: https://react-hook-form.com/

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-11-21 | Initial release with password and role management |
| 0.2.0 | 2024-11-21 | UUID implementation |
| 0.1.0 | 2024-09-13 | Birthday field addition |

---

**Last Updated**: January 20, 2026
**Maintained By**: Development Team
