// Pure filtering helpers, kept separate from the UI.

const matchesSearch = (product, term) => {
  if (!term) return true;
  const q = term.trim().toLowerCase();
  return [product.name, product.description, product.categoryName]
    .some((field) => field?.toLowerCase().includes(q));
};

const matchesStatus = (product, status) => status === "all" || product.status === status;

// Products that pass the search + status filters (category not applied)
export const applyBaseFilters = (products, { search, status }) =>
  products.filter((p) => matchesSearch(p, search) && matchesStatus(p, status));

export const filterByCategory = (products, category) =>
  category === "all" ? products : products.filter((p) => p.category === category);

// { all: n, savings: n, ... } used for the tab badges
export const countByCategory = (products) =>
  products.reduce(
    (acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }),
    { all: products.length }
  );
