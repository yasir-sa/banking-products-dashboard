# Banking Products Dashboard

A single-screen dashboard that shows multiple banking products (savings account, credit card, loan, wealth product) in one unified view, with category filtering and search.

## Tech Stack

| Layer    | Technology                     |
|----------|--------------------------------|
| Frontend | React + Vite                   |
| Backend  | Node.js + Express              |
| Database | PostgreSQL (Neon serverless)   |

**Why this stack:** React with Vite gives a fast dev setup and keeps the UI split into components. Express is a small layer for the products API. Neon Postgres stores the product data and can run serverless.

## Project Structure

```
├── client/          # React (Vite) frontend
│   ├── src/config.js        # API base URL (from env)
│   ├── .env.development     # local API URL
│   └── .env.production      # deployed API URL
└── server/          # Node + Express backend
    ├── server.js            # Express app + routes
    ├── db.js                # Postgres connection pool
    └── .env.example         # env template
```

## Getting Started

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # then fill in DATABASE_URL
npm run dev
```

Runs on `http://localhost:5000`. The console shows the database connection status.

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173`.

## Environment Variables

**server/.env**

| Variable           | Description                                   |
|--------------------|-----------------------------------------------|
| `PORT`             | Server port (default 5000)                    |
| `NODE_ENV`         | `development` or `production`                 |
| `LOCAL_CLIENT_URL` | Frontend URL allowed by CORS in development   |
| `PROD_CLIENT_URL`  | Frontend URL allowed by CORS in production    |
| `DATABASE_URL`     | Neon Postgres connection string               |

**client/.env.development / .env.production**

| Variable       | Description          |
|----------------|----------------------|
| `VITE_API_URL` | Backend API base URL |

## API

| Method | Endpoint      | Description  |
|--------|---------------|--------------|
| GET    | `/api/health` | Health check |
