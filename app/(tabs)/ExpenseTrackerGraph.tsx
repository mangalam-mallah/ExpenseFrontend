import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { getCurrentYearMonth } from "../../api/user.service";
import { useMonthlyExpenseStats } from "../../hooks/useMonthlyExpenseStats";

const ExpenseTrackerGraph = () => {
  const month = getCurrentYearMonth();
  const { budget, spent, percentage, loading } =
    useMonthlyExpenseStats(month);

  if (loading) return null;

  const getColor = () => {
    if (percentage >= 90) return "#EF4444";
    if (percentage >= 70) return "#F59E0B";
    return "#10B981";
  };

  const getStatusText = () => {
    if (percentage >= 90) return "Budget Alert";
    if (percentage >= 70) return "Watch Spending";
    return "On Track";
  };

  const remaining = budget - spent;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Monthly Budget</Text>
          <View style={[styles.badge, { backgroundColor: getColor() + '15' }]}>
            <Text style={[styles.badgeText, { color: getColor() }]}>
              {getStatusText()}
            </Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <CircularProgress
            radius={100}
            value={percentage}
            valueSuffix="%"
            activeStrokeColor={getColor()}
            inActiveStrokeColor="#E5E7EB"
            activeStrokeWidth={12}
            inActiveStrokeWidth={12}
            duration={1200}
            // title={`${Math.round(percentage)}%`}
            titleFontSize={32}
            titleColor="#111827"
            titleStyle={{ fontWeight: "700" }}
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Spent</Text>
            <Text style={[styles.statValue, { color: getColor() }]}>
              ₹{spent.toLocaleString()}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Remaining</Text>
            <Text style={[styles.statValue, { color: remaining >= 0 ? "#10B981" : "#EF4444" }]}>
              ₹{Math.abs(remaining).toLocaleString()}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Budget</Text>
            <Text style={styles.statValue}>₹{budget.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  progressContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
    fontWeight: "500",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  divider: {
    width: 1,
    backgroundColor: "#F3F4F6",
    marginHorizontal: 12,
  },
});

export default ExpenseTrackerGraph;