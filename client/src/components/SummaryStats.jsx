import { Layers, CircleCheck, Clock, Sparkles } from "lucide-react";
import "./SummaryStats.css";

const STAT_ITEMS = [
  { key: "total", label: "Total Products", icon: Layers },
  { key: "active", label: "Active", icon: CircleCheck },
  { key: "pending", label: "Pending", icon: Clock },
  { key: "available", label: "Available to Apply", icon: Sparkles },
];

export default function SummaryStats({ products, loading }) {
  const counts = products.reduce(
    (acc, p) => ({ ...acc, [p.status]: (acc[p.status] || 0) + 1 }),
    { total: products.length }
  );

  return (
    <section className="hero">
      <div className="container">
        <p className="hero__eyebrow">Welcome back</p>
        <h1 className="hero__title">All your banking products in one place</h1>
        <p className="hero__subtitle">
          Track your accounts, cards, loans, investments and deposits, or explore new products you can apply for.
        </p>

        <div className="stats">
          {STAT_ITEMS.map(({ key, label, icon: Icon }) => (
            <div key={key} className="stat">
              <span className="stat__icon" aria-hidden="true">
                <Icon size={18} />
              </span>
              <div>
                <p className="stat__value">{loading ? "–" : counts[key] || 0}</p>
                <p className="stat__label">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
