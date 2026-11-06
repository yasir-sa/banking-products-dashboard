import { useEffect, useRef } from "react";
import { X, CircleCheck, ArrowRight } from "lucide-react";
import { getCategoryMeta, STATUS_META } from "../constants/productMeta";
import { formatMetric } from "../utils/formatters";
import StatusBadge from "./StatusBadge";
import "./ProductModal.css";

// Modal action button label per status
const ACTIONS = {
  active: "Manage Product",
  available: "Start Application",
  pending: "Check Application Status",
  inactive: "Reactivate",
};

export default function ProductModal({ product, onClose, onAction }) {
  const closeRef = useRef(null);

  // Close on Escape, lock page scroll, focus the close button
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const { icon: Icon, tone } = getCategoryMeta(product.category);
  const isPrimary = STATUS_META[product.status]?.primary;

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal tone-${tone}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal__header">
          <span className="card__icon" aria-hidden="true">
            <Icon size={24} />
          </span>
          <div className="modal__heading">
            <p className="modal__category">{product.categoryName}</p>
            <h2 id="modal-title" className="modal__title">{product.name}</h2>
          </div>
          <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close details">
            <X size={20} />
          </button>
        </div>

        <div className="modal__body">
          <div className="modal__status">
            <StatusBadge status={product.status} />
            {product.accountRef && <span className="modal__ref">Ref: {product.accountRef}</span>}
          </div>

          <p className="modal__desc">{product.description}</p>

          <dl className="modal__metrics">
            {product.metrics.map((m) => (
              <div key={m.label} className="metric">
                <dt>{m.label}</dt>
                <dd>{formatMetric(m)}</dd>
              </div>
            ))}
          </dl>

          {product.features.length > 0 && (
            <>
              <h3 className="modal__section">Key features</h3>
              <ul className="features">
                {product.features.map((f) => (
                  <li key={f}>
                    <CircleCheck size={18} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="modal__footer">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className={`btn ${isPrimary ? "btn--primary" : "btn--dark"}`}
            onClick={() => onAction(product)}
          >
            {ACTIONS[product.status] || "Continue"}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
