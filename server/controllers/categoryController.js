import { asc, count, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { categories, products } from "../db/schema.js";

// GET /api/categories -> categories with the number of products in each
export const getCategories = async (req, res, next) => {
  try {
    const rows = await db
      .select({
        slug: categories.slug,
        name: categories.name,
        description: categories.description,
        productCount: count(products.id),
      })
      .from(categories)
      .leftJoin(products, eq(products.categoryId, categories.id))
      .groupBy(categories.id)
      .orderBy(asc(categories.sortOrder));

    res.json({ count: rows.length, data: rows });
  } catch (err) {
    next(err);
  }
};
