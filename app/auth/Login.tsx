import { getToken } from "@/api/security";
import CustomBox from "@/components/Custombox";
import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { login, ping } from "../../api/auth.service";
import { showToast } from "../utils/toast";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();
  const isEmpty = (value: string) => !value || !value.trim();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const gotoHomePageWithLogin = async () => {
    if (isEmpty(userName)) {
      showToast("Username is required");
      return;
    }
    if (isEmpty(password)) {
      showToast("Password is required");
      return;
    }

    try {
      await login(userName, password);
      await ping();

      showToast("Login successful", "success");
      Toast.hide();

      router.replace("/(tabs)/HomeScreen");
    } catch (error: any) {
      showToast(error?.message || "Invalid credentials");
    }
  };

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const token = await getToken("accessToken");
        if (token) {
          router.replace("/(tabs)/HomeScreen");
        }
      } catch (e) {
        console.error("Failed to fetch token", e);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkExistingSession();
  }, []);

  if (checkingAuth) {
    return null; 
  }

  const gotoSignup = () => {
    router.push("/auth/Signup");
  };
  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginBoxWrapper}>
        <CustomBox
          style={styles.loginBoxWrapper}
          boxStyle={loginBox.mainBox}
          shadowStyle={loginBox.shadowBox}
        >
          <CustomText style={styles.heading}>Login</CustomText>
          <TextInput
            placeholder="Username"
            value={userName}
            onChangeText={(text) => setUserName(text)}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.passwordInput}
              placeholderTextColor="#888"
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconContainer}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          <Button onPress={() => gotoHomePageWithLogin()} style={styles.button}>
            <CustomBox
              boxStyle={buttonBox.mainBox}
              shadowStyle={buttonBox.shadowBox}
            >
              <CustomText style={styles.buttonText}>Submit</CustomText>
            </CustomBox>
          </Button>
          <Button onPress={() => gotoSignup()} style={styles.button}>
            <CustomBox
              boxStyle={buttonBox.mainBox}
              shadowStyle={buttonBox.shadowBox}
            >
              <CustomText style={styles.buttonText}>Go to SignUp</CustomText>
            </CustomBox>
          </Button>
        </CustomBox>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const loginBox = {
  mainBox: {
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    padding: 25,
  },
  shadowBox: {
    backgroundColor: "gray",
    borderRadius: 15,
  },
};

const buttonBox = {
  mainBox: {
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  shadowBox: {
    backgroundColor: "gray",
    borderRadius: 10,
  },
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  loginBoxWrapper: {
    width: "90%",
    alignSelf: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    width: "100%",
    color: "black",
  },
  button: {
    marginTop: 15,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "600",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 15,
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    color: "black",
  },
  iconContainer: {
    paddingHorizontal: 12,
  },
});
