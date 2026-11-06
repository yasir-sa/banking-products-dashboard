import express from "express";
import cors from "cors";
import { connectDB } from "./db/index.js"; // db/index.js loads .env (dotenv)
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

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

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// 404 for unknown API routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error("❌", err.message);
  res.status(500).json({ message: "Something went wrong. Please try again." });
});

console.log(`Mode: ${isProduction ? "production" : "development"} | Allowed client URL: ${CLIENT_URL}`);
connectDB();

// Local-la mattum listen pannum. Vercel-la exported app-ah Vercel thaane run pannum.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
