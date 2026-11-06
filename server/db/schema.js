// Drizzle ORM schema: the tables for this project.
// Change a table here, then run `npm run db:push` to sync it to Neon.
import {
  pgTable, pgEnum, serial, integer, varchar, text, jsonb, timestamp, index,
} from "drizzle-orm/pg-core";

export const productStatus = pgEnum("product_status", [
  "active",    // customer already holds this product
  "available", // customer can apply for it
  "pending",   // application under review
  "inactive",  // paused or closed
]);

// Product categories: savings, credit_card, loan, wealth, deposit
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 30 }).notNull().unique(),
  name: varchar("name", { length: 60 }).notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

// Banking products, each linked to one category
export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    status: productStatus("status").notNull(),
    description: text("description").notNull(),
    accountRef: varchar("account_ref", { length: 30 }),
    // [{ label: "Interest Rate", value: 4.5, format: "percent" | "currency" | "date" | "text" }]
    metrics: jsonb("metrics").notNull().default([]),
    // ["Free debit card", "Zero balance", ...]
    features: jsonb("features").notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("idx_products_category").on(t.categoryId),
    index("idx_products_status").on(t.status),
  ]
);
