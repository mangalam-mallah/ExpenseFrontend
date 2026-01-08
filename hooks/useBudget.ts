import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { getMonthlyBudget } from "../api/user.service";

export const useBudget = (month: string) => {
  const [budget, setBudget] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const loadBudget = useCallback(async () => {
    const userId = await SecureStore.getItemAsync("userId");

    if (!userId) {
      setBudget(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getMonthlyBudget(month);
      setBudget(data.totalBudget);
    } catch {
      setBudget(null);
    } finally {
      setLoading(false);
    }
  }, [month]);

  useEffect(() => {
    let mounted = true;

    const guardedLoad = async () => {
      if (!mounted) return;
      await loadBudget();
    };

    guardedLoad();

    return () => {
      mounted = false;
    };
  }, [loadBudget]);

  return {
    budget,
    loading,
    refreshBudget: loadBudget,
  };
};
