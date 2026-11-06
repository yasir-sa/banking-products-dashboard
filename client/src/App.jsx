import { useCallback, useMemo, useState } from "react";
import { useBankingData } from "./hooks/useBankingData";
import { applyBaseFilters, countByCategory, filterByCategory } from "./utils/filterProducts";
import Header from "./components/Header";
import SummaryStats from "./components/SummaryStats";
import FilterBar from "./components/FilterBar";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import Toast from "./components/Toast";
import { EmptyState, ErrorState, SkeletonGrid } from "./components/StateViews";

// Message shown after the modal action button, per product status
const actionMessage = {
  active: (name) => `Opening ${name}…`,
  available: (name) => `Application started for ${name}. We'll be in touch shortly.`,
  pending: (name) => `${name}: your application is under review.`,
  inactive: (name) => `Reactivation request sent for ${name}.`,
};

export default function App() {
  const { products, categories, loading, error, lastUpdated, reload } = useBankingData();

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const baseFiltered = useMemo(
    () => applyBaseFilters(products, { search, status }),
    [products, search, status]
  );
  const visible = useMemo(() => filterByCategory(baseFiltered, category), [baseFiltered, category]);
  const counts = useMemo(() => countByCategory(baseFiltered), [baseFiltered]);

  const activeCategoryName =
    category === "all" ? "all categories" : categories.find((c) => c.slug === category)?.name;
  const hasFilters = category !== "all" || search || status !== "all";

  const resetFilters = () => {
    setCategory("all");
    setSearch("");
    setStatus("all");
  };

  const closeModal = useCallback(() => setSelected(null), []);
  const clearToast = useCallback(() => setToast(null), []);

  const handleAction = (product) => {
    setSelected(null);
    setToast((actionMessage[product.status] || actionMessage.active)(product.name));
  };

  return (
    <>
      <Header lastUpdated={lastUpdated} onRefresh={reload} refreshing={loading} />
      <SummaryStats products={products} loading={loading} />

      <main className="container main">
        <FilterBar
          categories={categories}
          counts={counts}
          activeCategory={category}
          onCategoryChange={setCategory}
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />

        <section className="results" aria-live="polite">
          {!loading && !error && (
            <div className="results__bar">
              <p className="results__text">
                Showing <strong>{visible.length}</strong> {visible.length === 1 ? "product" : "products"} in{" "}
                <strong>{activeCategoryName}</strong>
              </p>
              {hasFilters && (
                <button type="button" className="link-btn" onClick={resetFilters}>
                  Clear filters
                </button>
              )}
            </div>
          )}

          {loading ? (
            <SkeletonGrid />
          ) : error ? (
            <ErrorState message={error} onRetry={reload} />
          ) : visible.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <div className="product-grid">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} onSelect={setSelected} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          React + Vite · Node.js + Express · PostgreSQL on Neon · Drizzle ORM
        </div>
      </footer>

      {selected && <ProductModal product={selected} onClose={closeModal} onAction={handleAction} />}
      {toast && <Toast message={toast} onDone={clearToast} />}
    </>
  );
}
