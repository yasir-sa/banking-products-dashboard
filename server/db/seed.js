// Fills the categories and products tables with sample data.
// Run with: npm run db:seed  (safe to re-run: it clears the old data first)
import { sql } from "drizzle-orm";
import { db, pool } from "./index.js";
import { categories, products } from "./schema.js";
import { categoryData, productData } from "./seedData.js";

try {
  await db.execute(sql`TRUNCATE TABLE ${products}, ${categories} RESTART IDENTITY CASCADE`);

  const insertedCategories = await db.insert(categories).values(categoryData).returning();
  const categoryIdBySlug = Object.fromEntries(insertedCategories.map((c) => [c.slug, c.id]));
  console.log(`✅ Seeded ${insertedCategories.length} categories`);

  const rows = productData.map(({ category, ...p }) => ({
    ...p,
    categoryId: categoryIdBySlug[category],
  }));
  const insertedProducts = await db.insert(products).values(rows).returning({ id: products.id });
  console.log(`✅ Seeded ${insertedProducts.length} products`);
} catch (err) {
  console.error("❌ Seeding failed:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
