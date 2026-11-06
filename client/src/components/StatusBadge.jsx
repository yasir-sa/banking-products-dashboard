import { STATUS_META } from "../constants/productMeta";
import "./StatusBadge.css";

export default function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.inactive;
  return (
    <span className={`badge badge--${meta.tone}`}>
      <span className="badge__dot" aria-hidden="true" />
      {meta.label}
    </span>
  );
}
