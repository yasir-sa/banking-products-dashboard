# Banking Products Dashboard

A single-screen dashboard that brings a customer's banking products into one unified view: savings accounts, credit cards, loans, wealth products and deposits. Users can switch categories, search, and filter by status.

**Live demo:** https://banking-products-dashboard-silk.vercel.app
**API:** https://banking-products-api.vercel.app/api/products

## Features

- **Unified product cards.** Each card shows the product name, category, status, two key metrics (balance, interest rate, limit, due date and so on) and a call-to-action (View Details, Apply Now or Track Application).
- **Category tabs with live counts:** All, Savings, Credit Cards, Loans, Wealth, Deposits.
- **Search** across product name, description and category, plus a **status filter** (Active, Available, Pending, Inactive).
- **Summary stats:** total, active, pending, and products available to apply for.
- **Details modal** with every metric and the product's key features.
- **Responsive** from 320px mobile up to wide desktop.
- **Loading skeletons, empty state and error state with retry.**
- **Accessibility:** keyboard support, focus states, closing the modal with Esc, and reduced-motion support.

## Tech Stack

| Layer     | Technology                                 | Why |
|-----------|--------------------------------------------|-----|
| Frontend  | React 19 + Vite                            | Fast dev server; the UI is split into components |
| Icons     | lucide-react                               | Consistent, tree-shakeable icon set |
| Styling   | Plain CSS with design tokens (CSS variables) | No framework lock-in; each component has its own stylesheet |
| Font      | Plus Jakarta Sans (Google Fonts)           | Clean, modern typeface that suits a fintech product |
| Backend   | Node.js + Express                          | Small REST API layer |
| ORM       | Drizzle ORM + drizzle-kit                  | Type-safe SQL, lightweight, works well on serverless |
| Database  | PostgreSQL on Neon                         | Serverless Postgres with a pooled connection |
| Hosting   | Vercel (two projects: `client`, `server`)  | Deploys automatically on every push to `main` |

## Separation of Data and UI

```
client/src/
├── api/bankingApi.js          # the only place that calls the backend
├── hooks/useBankingData.js    # loading / error / reload state
├── utils/filterProducts.js    # pure filter + count functions
├── utils/formatters.js        # currency / percent / date formatting
├── constants/productMeta.js   # presentation-only config (icons, colours, CTA labels)
└── components/                # UI only: Header, SummaryStats, FilterBar,
                               # ProductCard, ProductModal, StatusBadge, StateViews, Toast
```

The API sends each metric's raw value together with a `format` (`currency`, `percent` or `date`). The UI decides how to display it, so the data never holds pre-formatted strings.

```
server/
├── server.js                  # Express app, CORS, routes, error handler
├── routes/                    # productRoutes, categoryRoutes
├── controllers/               # query logic with Drizzle
├── db/schema.js               # Drizzle tables: categories, products
├── db/index.js                # pg Pool + Drizzle instance
├── db/seed.js, seedData.js    # sample data
└── drizzle.config.js
```

## Database Schema

- **categories**: `id`, `slug`, `name`, `description`, `sort_order`
- **products**: `id`, `name`, `category_id` (FK → categories), `status` (enum), `description`, `account_ref`, `metrics` (JSONB), `features` (JSONB), `created_at`

## API

| Method | Endpoint                | Description |
|--------|-------------------------|-------------|
| GET    | `/api/health`           | Health check |
| GET    | `/api/categories`       | Categories with product counts |
| GET    | `/api/products`         | All products. Optional query params: `category`, `status`, `search` |
| GET    | `/api/products/:id`     | A single product |

## Running Locally

### 1. Backend

```bash
cd server
npm install
cp .env.example .env     # then fill in DATABASE_URL
npm run db:push          # create the tables in Neon (Drizzle)
npm run db:seed          # insert the sample data
npm run dev              # http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev              # http://localhost:5173
```

## Environment Variables

**server/.env**

| Variable           | Description                                  |
|--------------------|----------------------------------------------|
| `PORT`             | Server port (default 5000)                   |
| `NODE_ENV`         | `development` or `production`                |
| `LOCAL_CLIENT_URL` | Frontend URL allowed by CORS in development  |
| `PROD_CLIENT_URL`  | Frontend URL allowed by CORS in production   |
| `DATABASE_URL`     | Neon Postgres connection string              |

**client/.env.development / .env.production**

| Variable       | Description          |
|----------------|----------------------|
| `VITE_API_URL` | Backend API base URL |
