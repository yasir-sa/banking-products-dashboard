import { ArrowRight } from "lucide-react";
import { getCategoryMeta, STATUS_META } from "../constants/productMeta";
import { formatMetric } from "../utils/formatters";
import StatusBadge from "./StatusBadge";
import "./ProductCard.css";

export default function ProductCard({ product, onSelect }) {
  const { icon: Icon, tone } = getCategoryMeta(product.category);
  const status = STATUS_META[product.status] || STATUS_META.inactive;

  return (
    <article className={`card tone-${tone}`}>
      <div className="card__top">
        <span className="card__icon" aria-hidden="true">
          <Icon size={22} />
        </span>
        <StatusBadge status={product.status} />
      </div>

      <div className="card__heading">
        <h3 className="card__title">{product.name}</h3>
        <p className="card__meta">
          <span className="card__category">{product.categoryName}</span>
          {product.accountRef && (
            <>
              <span className="card__sep" aria-hidden="true">•</span>
              <span className="card__ref">{product.accountRef}</span>
            </>
          )}
        </p>
      </div>

      <p className="card__desc">{product.description}</p>

      <dl className="card__metrics">
        {product.metrics.slice(0, 2).map((m) => (
          <div key={m.label} className="metric">
            <dt>{m.label}</dt>
            <dd>{formatMetric(m)}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        className={`btn ${status.primary ? "btn--primary" : "btn--outline"} card__cta`}
        onClick={() => onSelect(product)}
      >
        {status.cta}
        <ArrowRight size={16} aria-hidden="true" />
      </button>
    </article>
  );
}
