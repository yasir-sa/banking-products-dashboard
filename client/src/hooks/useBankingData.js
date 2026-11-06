import { useCallback, useEffect, useState } from "react";
import { fetchCategories, fetchProducts } from "../api/bankingApi";

const loadAll = () => Promise.all([fetchProducts(), fetchCategories()]);

// Loads products + categories and exposes loading / error / reload state.
export const useBankingData = () => {
  const [state, setState] = useState({
    products: [],
    categories: [],
    loading: true,
    error: null,
    lastUpdated: null,
  });
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    let ignore = false; // drop the response if a newer request started

    loadAll()
      .then(([products, categories]) => {
        if (!ignore) {
          setState({ products, categories, loading: false, error: null, lastUpdated: new Date() });
        }
      })
      .catch((err) => {
        if (!ignore) {
          setState((s) => ({ ...s, loading: false, error: err.message || "Unable to load products" }));
        }
      });

    return () => {
      ignore = true;
    };
  }, [requestId]);

  const reload = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    setRequestId((id) => id + 1);
  }, []);

  return { ...state, reload };
};
