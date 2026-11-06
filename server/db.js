import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Connection pool to Neon Postgres (connection string comes from .env)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Checks the DB connection once at startup and logs the result
export const connectDB = async () => {
  try {
    const client = await pool.connect();
    const { rows } = await client.query("SELECT current_database() AS db");
    console.log(`✅ Database connected: ${rows[0].db}`);
    client.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
};

export default pool;
