import Expense from "@/components/Expense";
import Heading from "@/components/Header";
import React from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExpenseDto } from "../../Dto/ExpenseDto";

type SpendsProps = {
  expenses: ExpenseDto[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  onRefresh: () => Promise<void>;
};

const Spends = ({
  expenses,
  loading,
  error,
  refreshing,
  onRefresh,
}: SpendsProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Heading heading="Recent Spends" />
        {expenses.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{expenses.length}</Text>
          </View>
        )}
      </View>

      {loading && expenses.length === 0 && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6B9BD1" />
        </View>
      )}

      {error && (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>Unable to load expenses</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && !error && expenses.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💳</Text>
          <Text style={styles.emptyTitle}>No expenses yet</Text>
        </View>
      )}

      {!loading && !error && expenses.length > 0 && (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6B9BD1"
            />
          }
        >
          {expenses.map((expense) => (
            <Expense key={expense.key} props={expense} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  badge: {
    backgroundColor: "#E8F1F8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5D8AAF",
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  expensesContainer: {
    gap: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  loadingContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 32,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 15,
    color: "#6B7786",
    fontWeight: "500",
  },
  errorCard: {
    margin: 20,
    padding: 24,
    backgroundColor: "#FFF5F5",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F8D7DA",
    alignItems: "center",
  },
  errorIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  errorIcon: {
    fontSize: 28,
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#991B1B",
    marginBottom: 8,
    textAlign: "center",
  },
  errorText: {
    fontSize: 14,
    color: "#B91C1C",
    textAlign: "center",
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#E8F1F8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 15,
    color: "#718096",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default Spends;