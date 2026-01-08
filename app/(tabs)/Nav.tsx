import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "../../api/auth.service";

const Nav = () => {
  const router = useRouter();

  const goToProfile = () => {
    router.push("/(tabs)/Profile");
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/Login");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.accentDot} />
          <Text style={styles.title}>ExpenseTracker</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={goToProfile}
            style={styles.iconButton}
            activeOpacity={0.6}
          >
            <MaterialIcons name="account-circle" size={24} color="#6366F1" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.iconButton, styles.logoutButton]}
            activeOpacity={0.6}
          >
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFFFFF",
  },
  container: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  titleContainer: { 
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  accentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6366F1",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.3,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
  },
  logoutButton: {
    backgroundColor: "#FEF2F2",
  },
});

export default Nav;