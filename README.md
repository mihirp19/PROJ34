# PROJ34

A simple events and RSVP API built with Node.js, Express and MongoDB (Mongoose). This README explains how to set up the project locally, run it, and call the available endpoints (auth, events, RSVP).

---

## Table of Contents

- Project overview
- Prerequisites
- Environment
- Install & run
- Endpoints
  - Authentication
  - Events
  - RSVP
  - Dev/debug
- Notes, security and next steps

---

## Project overview

This application provides APIs to register/login users, create and list events, and allow users to RSVP to events. RSVP documents now store denormalized `user_name` and `event_title` for faster reads.

Key folders/files

- `src/app.js` - Express app entry (routes and middleware)
- `src/config/db.js` - MongoDB connection
- `src/controllers` - Route handlers
- `src/services` - Business logic
- `src/models` - Mongoose models (`User`, `Event`, `RSVP`, `Tags`)
- `src/routes` - Route definitions

---

## Prerequisites

- Node.js (v18+ recommended)
- npm
- A MongoDB instance (local or Atlas)

---

## Environment

Create a `.env` file in the project root with these variables (example):

```
PORT=5000
MONGO_URI="mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/proj34?retryWrites=true&w=majority"
JWT_SECRET=your_jwt_secret_here
```

Security note: Do NOT commit `.env` to source control. Add it to `.gitignore`. If this repository contains real credentials, rotate them immediately.

---

## Install & run

1. Install dependencies:

```bash
npm install
```

2. Start in development (uses `nodemon`):

```bash
export PORT=5000
export MONGO_URI="<your-mongo-uri>"
export JWT_SECRET="your_jwt_secret"
npm run dev
```

You should see startup logs in the console, e.g. `Server running on port 5000` and `MongoDB connected` (if DB reachable).

---

## API Endpoints

Base URL: `http://localhost:5000`

All examples use `curl`; you can convert these to Postman requests.

### Authentication

- POST `/api/auth/register` — register a new user (public)

Request body (JSON):

```json
{
  "name": "Mihir Panchal",
  "email": "mihir@email.com",
  "password": "Mihir@123"
}
```

Success response (200):

```json
{ "message": "User registered successfully" }
```

If email exists: status `400` and body:

```json
{ "error": "Email already exists" }
```

- POST `/api/auth/login` — log in and get a JWT (public)

Request body (JSON):

```json
{ "email": "mihir@email.com", "password": "Mihir@123" }
```

Success response (200):

```json
{ "token": "<JWT>", "user": { /* user object */ } }
```

Use this token in `Authorization` header for protected endpoints: `Authorization: Bearer <JWT>`

### Events

- POST `/api/events` — create a new event (protected — requires Authorization header)

Example body:

```json
{
  "title": "Night Market",
  "description": "Food and crafts",
  "start_time": "2026-01-01T12:00:00Z",
  "end_time": "2026-01-01T18:00:00Z",
  "city": "San Francisco",
  "capacity": 100,
  "tags": ["food", "market"]
}
```

- GET `/api/events` — list events. Optional query params: `city`, `tag`, `date` (ISO date)

Example: `GET /api/events?city=San%20Francisco&tag=food`

- GET `/api/events/:id` — get event details

- GET `/api/events/:id/recommendations` — get up to 5 similar upcoming events

### RSVP

- POST `/api/rsvp/:id` — RSVP to event with id `:id` (protected)

Request body (JSON):

```json
{ "status": "going" }
```

Notes:
- `status` must be one of: `going`, `maybe`, `decline`.
- The RSVP service will check event capacity when `status` is `going`.
- RSVP documents now include `user_name` and `event_title` in addition to `user_id`, `event_id`, and `status`.

Example (with token):

```bash
curl -X POST http://localhost:5000/api/rsvp/<EVENT_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"status":"going"}'
```

Success response: the created/updated RSVP document (JSON) including `user_name` and `event_title` fields.

### Dev/debug

A dev-only helper was added to confirm requests reach this process:

- GET `/__debug` — returns basic request info and headers (masks `Authorization` value)

Use this to verify whether calls from Postman/curl are reaching the app instance you're running.

Example:

```bash
curl http://localhost:5000/__debug
```

---

## Troubleshooting

- If you receive `401 Unauthorized` from protected endpoints:
  - Ensure `Authorization` header is present: `Authorization: Bearer <token>`
  - Ensure `JWT_SECRET` in your `.env` is the same secret used to sign tokens
  - Check server console for `Auth failure` logs

- If register/login fails or you see `MongoDB connection error:` check your `MONGO_URI` and network access.

- If you don't see console logs for a request: make sure you are hitting the correct host/port and the server instance you started.

---

## Security & notes

- Do not commit `.env` or credentials. Add `.env` to `.gitignore` if not already present.
- Rotate any credentials found in the repo or `.env` immediately (the example `MONGO_URI` contains a password).
- Denormalized fields (`user_name`, `event_title`) are stored in `RSVP` documents for fast reads. If you rename Users or Events later, consider a migration or background job to sync these fields.

