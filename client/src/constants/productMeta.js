// Presentation-only settings: icons, colours and button labels.
// The product data itself comes from the API.
import {
  PiggyBank, CreditCard, HandCoins, TrendingUp, Landmark, LayoutGrid,
} from "lucide-react";

export const ALL_CATEGORY = { slug: "all", name: "All Products", icon: LayoutGrid };

export const CATEGORY_META = {
  savings: { icon: PiggyBank, tone: "emerald" },
  credit_card: { icon: CreditCard, tone: "violet" },
  loan: { icon: HandCoins, tone: "amber" },
  wealth: { icon: TrendingUp, tone: "blue" },
  deposit: { icon: Landmark, tone: "teal" },
};

export const getCategoryMeta = (slug) => CATEGORY_META[slug] || { icon: LayoutGrid, tone: "slate" };

export const STATUS_META = {
  active: { label: "Active", tone: "success", cta: "View Details", primary: false },
  available: { label: "Available", tone: "info", cta: "Apply Now", primary: true },
  pending: { label: "Pending", tone: "warning", cta: "Track Application", primary: false },
  inactive: { label: "Inactive", tone: "neutral", cta: "View Details", primary: false },
};

export const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  ...Object.entries(STATUS_META).map(([value, { label }]) => ({ value, label })),
];
