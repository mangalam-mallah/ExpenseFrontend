import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCurrentYearMonth, setMonthlyBudget } from "../../api/user.service";

type Props = {
  onSuccess?: () => void;
};

const SetBudget = ({ onSuccess }: Props) => {
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!budget || Number(budget) < 0) {
      Alert.alert("Invalid Budget", "Please enter a valid budget amount");
      return;
    }

    try {
      setLoading(true);
      await setMonthlyBudget(getCurrentYearMonth(), Number(budget));
      onSuccess?.();
    } catch (err) {
      console.error("Failed to save budget: ", err);
      Alert.alert("Error", "Failed to save budget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>💰</Text>
          </View>
          <Text style={styles.title}>Set Monthly Budget</Text>
          <Text style={styles.subtitle}>
            Plan your spending and track your expenses
          </Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Budget Amount</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={budget}
              onChangeText={setBudget}
              placeholder="0"
              placeholderTextColor="#94A3B8"
            />
          </View>
          <Text style={styles.hint}>Enter your total monthly budget</Text>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>
            {loading ? "Saving..." : "Save Budget"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    fontWeight: "500",
  },
  inputSection: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#E2E8F0",
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: "700",
    color: "#6366F1",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 32,
    fontWeight: "700",
    color: "#0F172A",
    paddingVertical: 16,
  },
  hint: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 8,
    marginLeft: 4,
  },
  saveButton: {
    backgroundColor: "#6366F1",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  saveButtonDisabled: {
    backgroundColor: "#94A3B8",
    shadowOpacity: 0.1,
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});

export default SetBudget;