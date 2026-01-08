import { useCallback, useEffect, useState } from "react";
import { DeviceEventEmitter } from "react-native";
import { getExpense } from "../api/auth.service";
import { getMonthlyBudget } from "../api/user.service";

export const useMonthlyExpenseStats = (month: string) => {
  const [budget, setBudget] = useState<number>(0);
  const [spent, setSpent] = useState<number>(0);

  const [loading, setLoading] = useState(true);      
  const [refreshing, setRefreshing] = useState(false); 

  const fetchStats = useCallback(
    async (silent = false) => {
      try {
        silent ? setRefreshing(true) : setLoading(true);

        const budgetRes = await getMonthlyBudget(month);
        setBudget(budgetRes.totalBudget);

        const expenses = await getExpense();
        const totalSpent = expenses.reduce(
          (sum: number, e: any) => sum + Number(e.amount),
          0
        );

        setSpent(totalSpent);
      } finally {
        silent ? setRefreshing(false) : setLoading(false);
      }
    },
    [month]
  );

  useEffect(() => {
    fetchStats();

    const sub = DeviceEventEmitter.addListener(
      "expense:updated",
      () => fetchStats(true)
    );

    return () => sub.remove();
  }, [fetchStats]);

  const percentage =
    budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

  return { budget, spent, percentage, loading, refreshing };
};
