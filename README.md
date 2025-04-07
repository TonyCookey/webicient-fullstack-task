# Project Task Manager

Lightweight internal tool for managing projects and tasks.

## Stack

- Next.js (App Router)
- PostgreSQL + Prisma
- JWT-based Auth

## Setup

1. Copy `.env.example` to `.env` and fill in values
2. Run `npm install`
3. Run `npx prisma migrate dev`
4. Run `npm run dev`

## Features

- Register/Login/Logout with JWT
- Protected routes (Projects & Tasks)
- Project dashboard
- Project detail view (with tasks)
- Create and Edit projects and tasks

## Scripts

- `npm run dev` – Start dev server
- `npx prisma studio` – DB GUI
