import express from "express";
import cors from "cors";
import { connectDB } from "./db.js"; // db.js loads .env (dotenv)

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

// Production-la Vercel URL, local-la localhost URL mattum allow aagum
const CLIENT_URL = isProduction
  ? process.env.PROD_CLIENT_URL
  : process.env.LOCAL_CLIENT_URL;

// Middleware
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is working" });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT} [${isProduction ? "production" : "development"}]`);
  console.log(`Allowed client URL: ${CLIENT_URL}`);
  await connectDB();
});
