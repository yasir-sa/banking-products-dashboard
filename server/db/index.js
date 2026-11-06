import pg from "pg";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

dotenv.config();

// Connection pool to Neon Postgres (connection string comes from .env)
export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Drizzle ORM instance, used for all queries
export const db = drizzle(pool, { schema });

// Checks the DB connection once at startup and logs the result
export const connectDB = async () => {
  try {
    const { rows } = await pool.query("SELECT current_database() AS db");
    console.log(`✅ Database connected: ${rows[0].db}`);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
};
