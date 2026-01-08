import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  dailyAvg: number;
  willExceed: boolean;
  daysToExceed?: number;
  topCategory: string;
  topCategoryPercent: number;
};

const ExpenseInsights = ({
  dailyAvg,
  willExceed,
  daysToExceed,
  topCategory,
  topCategoryPercent,
}: Props) => {
  return (
    <View style={styles.container}>
      {/* Daily Spend */}
      <Text style={styles.insight}>
        You’re spending about <Text style={styles.bold}>₹{dailyAvg}</Text> per
        day
      </Text>

      {/* Prediction */}
      <Text style={styles.insight}>
        {willExceed
          ? `At this pace, you may exceed your budget in ${daysToExceed} days`
          : "You’re on track to stay within your budget"}
      </Text>

      {/* Category */}
      <Text style={styles.insight}>
        Most of your spending is on{" "}
        <Text style={styles.bold}>
          {topCategory} ({topCategoryPercent}%)
        </Text>
      </Text>

      {/* Action */}
      <Text style={styles.tip}>
        {willExceed
          ? "Consider cutting down on non-essential expenses"
          : "Good control so far — keep it up"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  insight: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 10,
    lineHeight: 20,
  },
  bold: {
    fontWeight: "700",
    color: "#111827",
  },
  tip: {
    marginTop: 6,
    fontSize: 13,
    color: "#6B7280",
    fontStyle: "italic",
  },
});

export default ExpenseInsights;
