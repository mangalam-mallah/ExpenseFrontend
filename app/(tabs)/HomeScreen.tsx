import { ExpenseDto } from "@/Dto/ExpenseDto";
import { getExpense } from "@/api/auth.service";
import { getToken } from "@/api/security";
import AddExpenseModal from "@/screens/AddExpenseModal";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentYearMonth } from "../../api/user.service";
import { useBudget } from "../../hooks/useBudget";
import { normalizeUserId } from "../utils/normalisedUserId";
import ExpenseTrackerGraph from "./ExpenseTrackerGraph";
import Nav from "./Nav";
import Spends from "./Spends";
import SetBudget from "./setBudget";

const HomeScreen = () => {
  const currentMonth = getCurrentYearMonth();

  const [expenses, setExpenses] = useState<ExpenseDto[]>([]);
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { budget, loading, refreshBudget } = useBudget(currentMonth);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoadingExpenses(true);
    setError(null);

    try {
      const currentUserId = await getToken("userId");
      const response = await getExpense();

      const mapped: ExpenseDto[] = response.map((expense: any) => ({
        key: expense.external_id,
        amount: Number(expense.amount),
        merchant: expense.merchant,
        currency: expense.currency,
        createdAt: new Date(expense.created_at),
        user_id: normalizeUserId(expense.user_id),
      }));

      const filtered = mapped.filter(
        (e) => e.user_id?.userId === currentUserId
      );

      setExpenses(filtered);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoadingExpenses(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchExpenses();
    setRefreshing(false);
  };

  return (
    <View style={styles.wrapper}>
      <Nav />

      <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#6366F1" />
          </View>
        ) : budget == null ? (
          <SetBudget onSuccess={refreshBudget} />
        ) : (
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.graphContainer}>
              <ExpenseTrackerGraph />
            </View>

            <Spends
              expenses={expenses}
              loading={loadingExpenses}
              error={error}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />

            <AddExpenseModal
              visible={showModal}
              onClose={() => setShowModal(false)}
              onSuccess={fetchExpenses}
            />
          </ScrollView>
        )}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setShowModal(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  container: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 24,
  },
  graphContainer: {
    marginBottom: 8,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "300",
    lineHeight: 32,
  },
});

export default HomeScreen;
