import { Search, X, ChevronDown } from "lucide-react";
import { ALL_CATEGORY, getCategoryMeta, STATUS_OPTIONS } from "../constants/productMeta";
import "./FilterBar.css";

export default function FilterBar({
  categories,
  counts,
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  status,
  onStatusChange,
}) {
  const tabs = [
    { ...ALL_CATEGORY },
    ...categories.map((c) => ({ ...c, icon: getCategoryMeta(c.slug).icon })),
  ];

  return (
    <div className="filter-bar">
      <div className="filter-bar__controls">
        <label className="search">
          <Search size={18} className="search__icon" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search e.g. home loan, cashback"
            aria-label="Search products"
          />
          {search && (
            <button type="button" className="search__clear" onClick={() => onSearchChange("")} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </label>

        <div className="select">
          <select value={status} onChange={(e) => onStatusChange(e.target.value)} aria-label="Filter by status">
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="select__icon" aria-hidden="true" />
        </div>
      </div>

      <div className="tabs" role="tablist" aria-label="Product categories">
        {tabs.map(({ slug, name, icon: Icon }) => {
          const selected = activeCategory === slug;
          return (
            <button
              key={slug}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`tab ${selected ? "tab--active" : ""}`}
              onClick={() => onCategoryChange(slug)}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{name}</span>
              <span className="tab__count">{counts[slug] ?? 0}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
