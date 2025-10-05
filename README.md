# URL Shortener (MERN)

A full-stack URL shortener with authentication, custom slugs, and click tracking.

- Backend: Node.js, Express, Mongoose, JWT cookies
- Frontend: React (Vite + Tailwind), Axios with credentials, Vite proxy

## Project structure

```
UrlShortener/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── dao/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── frontend/
│   ├── src/
│   └── vite.config.js
└── README.md (this file)
```

## Prerequisites
- Node.js 18+
- MongoDB running locally (or a cloud URI)

## Backend setup
1) Create backend/.env:
```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/urlshortener
JWT_SECRET=replace-with-a-strong-secret
APP_URL=http://localhost:3000/
```
2) Install deps and run:
```
cd backend
npm install
npm run dev
```
- Server: http://localhost:3000
- Health: No public health route; API served under /api

## Frontend setup
1) Install deps and run:
```
cd frontend
npm install
npm run dev
```
- App: http://localhost:5173
- Vite proxy forwards /api/* to http://localhost:3000

## Authentication
- Register: POST /api/auth/register { name, email, password }
- Login: POST /api/auth/login { email, password }
- Me: GET /api/auth/me (requires accessToken cookie)
- Logout: POST /api/auth/logout

Cookies
- Authentication uses an httpOnly cookie (accessToken). The frontend must send credentials.
- Already configured: axios (apiClient) uses withCredentials: true and Vite proxy keeps same origin.

## URL Shortening
- Create short URL: POST /api/create { url }
- Create custom slug (authenticated users):
  - POST /api/create { url, slug }
  - Slug must be unique (backend enforces uniqueness and will return an error if taken).
- Redirect: GET /:id (id is the short_url)
- Get user URLs: GET /api/user/urls (requires auth)

## Frontend usage
- On the main page, authenticated users see an optional field to enter a custom slug. If provided, the frontend will send `{ url, slug }` to `/api/create`.
- Unauthenticated users can still shorten URLs (without custom slug) and will receive a short URL.
- The user URLs list is scrollable and constrained to fit the page.

## Development tips
- Always access the backend through the frontend proxy during development (http://localhost:5173/api/*). This ensures cookies work correctly.
- If you need to call the backend directly with curl, include the cookie jar to maintain sessions.

## Scripts
- Backend: `npm run dev` (nodemon)
- Frontend: `npm run dev` (Vite)

## License
ISC (update if needed)
