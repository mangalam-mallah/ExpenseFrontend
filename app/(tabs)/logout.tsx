import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "../../api/auth.service";

const LogoutButton = () => {
  const router = useRouter();

  const handlelogout = async () => {
    await logout();
    router.push("/auth/Login");
    console.log("Logout Pressed");
  };
  return (
    <SafeAreaView>
      <Pressable style={styles.button} onPress={handlelogout}>
        <Text style={styles.text}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E53935",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default LogoutButton;
