
# Task Manager

A full-stack task management application built with React,
TypeScript, Node.js, Express, and SQLite.

## Features

- User registration and login
- Cookie-based sessions
- Personal task management
- Create, update, and delete tasks
- Task completion tracking
- Search and status filters
- Progress statistics
- Responsive dark and light themes
- Protected API endpoints

## Tech Stack

**Frontend:** React, TypeScript, Vite, CSS

**Backend:** Node.js, Express

**Database:** SQLite

**Testing:** Vitest, React Testing Library, Node.js Test Runner

## Getting Started

Requirements: Node.js and npm.

### Install dependencies

```bash
npm ci --prefix frontend
npm ci --prefix backend
```

### Start the Backend

```bash
node backend/server.js
```

### Start the Frontend

In another terminal:

```bash
npm run dev --prefix frontend
```

Open http://localhost:5173

## Testing

```bash
npm run build --prefix frontend
npm run lint --prefix frontend
npm test --prefix frontend
npm test --prefix backend
```

## Security

The application includes password hashing, session-based
authentication, CSRF origin validation, API input validation,
and rate limiting.

Never commit SQLite databases, credentials, or private
environment configuration files.

## Deployment

Public deployment is planned. Production requires HTTPS
and persistent database storage.

## Author

Tokyo — Full-Stack Developer
