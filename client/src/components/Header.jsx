import { Landmark, RefreshCw } from "lucide-react";
import { formatTime } from "../utils/formatters";
import "./Header.css";

export default function Header({ lastUpdated, onRefresh, refreshing }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="brand">
          <span className="brand__logo" aria-hidden="true">
            <Landmark size={20} strokeWidth={2.2} />
          </span>
          <div>
            <p className="brand__name">Banking Products</p>
            <p className="brand__tag">Unified Dashboard</p>
          </div>
        </div>

        <div className="header__actions">
          {lastUpdated && (
            <span className="header__sync">
              <span className="header__dot" aria-hidden="true" />
              Synced {formatTime(lastUpdated)}
            </span>
          )}
          <button
            type="button"
            className="icon-btn"
            onClick={onRefresh}
            disabled={refreshing}
            aria-label="Refresh products"
            title="Refresh products"
          >
            <RefreshCw size={18} className={refreshing ? "spin" : ""} />
          </button>
        </div>
      </div>
    </header>
  );
}
