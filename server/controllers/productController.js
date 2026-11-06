import { and, asc, eq, ilike, or } from "drizzle-orm";
import { db } from "../db/index.js";
import { categories, products, productStatus } from "../db/schema.js";

// Fields returned for every product (category joined in)
const productFields = {
  id: products.id,
  name: products.name,
  category: categories.slug,
  categoryName: categories.name,
  status: products.status,
  description: products.description,
  accountRef: products.accountRef,
  metrics: products.metrics,
  features: products.features,
};

// GET /api/products?category=loan&status=active&search=home
export const getProducts = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;
    const filters = [];

    if (category) filters.push(eq(categories.slug, category));
    if (status) {
      if (!productStatus.enumValues.includes(status)) {
        return res.status(400).json({ message: `Invalid status: ${status}` });
      }
      filters.push(eq(products.status, status));
    }
    if (search) {
      filters.push(or(ilike(products.name, `%${search}%`), ilike(products.description, `%${search}%`)));
    }

    const rows = await db
      .select(productFields)
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(and(...filters))
      .orderBy(asc(categories.sortOrder), asc(products.id));

    res.json({ count: rows.length, data: rows });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const [product] = await db
      .select(productFields)
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.id, id));

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
};
