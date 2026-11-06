// All backend calls live here. UI components never call fetch directly.
import { API_URL } from "../config";

const request = async (path) => {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed (${res.status})`);
  }
  return res.json();
};

export const fetchProducts = async () => (await request("/api/products")).data;

export const fetchCategories = async () => (await request("/api/categories")).data;
