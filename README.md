
# Course & LMS Platform
This project is a comprehensive Learning Management System (LMS) and course platform built with modern web technologies. It replicates key features of popular online learning platforms like Udemy, enabling users to create, sell, and take online courses.

## Table of Contents
- Features
- Tech Stack
- Setup Instructions
- Project Structure
- Usage
- Contributing
- License
## Features
- Course Creation: Instructors can create and manage courses with detailed descriptions, pricing, and content chapters.
Video Hosting: Secure video streaming using Mux.
- Payment Integration: Secure payments through Stripe.
- User Authentication: Account creation, login, and role management (instructors, students).
- Responsive Design: Mobile-first design with Tailwind CSS.
- Database Management: Efficient data handling with Prisma ORM and Postgresql.
- Search and Filter: Powerful search and filtering options for courses.
- Dynamic Routing: Seamless navigation and dynamic content with Next.js 13.
## Tech Stack
- Framework: Next.js 13
- Frontend: React, Tailwind CSS
- Backend: Node.js, Prisma ORM
- Database: PostgreSQL
- Video Streaming: Mux
- Payments: Stripe
- Deployment: Vercel

## Setup Instructions
- Prerequisites
- Node.js (v14 or later)
- postgresql
- Stripe Account
- Mux Account

## Project Structure
- /components: React components for UI elements and layout.
- /pages: Next.js pages for routing.
- /lib: Utility functions and API integration.
- /prisma: Prisma schema and database configuration.
- /styles: Global styles and Tailwind configuration.
- /public: Static assets like images and icons.

## Usage
- Teachers: Create and manage courses, upload videos, and set pricing.
- Students: Browse courses, enroll, and access course content.

## License
- This project is licensed under the MIT License. See the LICENSE file for details.
