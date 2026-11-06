// Backend API base URL
// Local (npm run dev)   -> .env.development -> http://localhost:5000
// Vercel (npm run build) -> .env.production / Vercel env var
export const API_URL = import.meta.env.VITE_API_URL;
