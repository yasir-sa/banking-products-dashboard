import { SearchX, TriangleAlert, RefreshCw } from "lucide-react";
import "./StateViews.css";

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="product-grid" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="skeleton-card">
          <div className="sk sk--icon" />
          <div className="sk sk--title" />
          <div className="sk sk--line" />
          <div className="sk sk--line sk--short" />
          <div className="sk sk--metrics" />
          <div className="sk sk--btn" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ onReset }) {
  return (
    <div className="state">
      <span className="state__icon">
        <SearchX size={28} />
      </span>
      <h3>No products match your filters</h3>
      <p>Try a different search term or category, or clear the filters.</p>
      <button type="button" className="btn btn--outline" onClick={onReset}>
        Clear filters
      </button>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state state--error" role="alert">
      <span className="state__icon">
        <TriangleAlert size={28} />
      </span>
      <h3>We couldn't load your products</h3>
      <p>{message}</p>
      <button type="button" className="btn btn--primary" onClick={onRetry}>
        <RefreshCw size={16} aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}
