import Custombox from "@/components/Custombox";
import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "../../config/env";
import { showToast } from "../utils/toast";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();
  const isEmpty = (value: string) => !value || value.trim();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

    const navigateToLoginScreen = async () => {
      if(isEmpty(firstName)){
        showToast("First name is required")
      }
      if(isEmpty(lastName)){
        showToast("Last name is required")
      }
      if(isEmpty(email)){
        showToast("Email is required")
      }
      if(isEmpty(userName)){
        showToast("Username is required")
      }
      if(isEmpty(password)){
        showToast("Password is required")
      }
      if(isEmpty(phoneNumber)){
        showToast("Phone number is required")
      }
    try {
      const response = await fetch(`${BASE_URL}/auth/v1/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
          password: password,
          username: userName,
        }),
      });
      const data = await response.json();
      // await saveToken("accessToken", data["accessToken"]);
      // await saveToken("refreshToken", data["token"]);
      router.replace("/auth/Login");
    } catch (error) {
      console.log("Error during signup: ", error);
    }
  };


  // const navigateToLoginScreen = async () => {
  //   if (isEmpty(firstName)) {
  //     showToast("First name is required");
  //     return;
  //   }
  //   if (isEmpty(lastName)) {
  //     showToast("Last name is required");
  //     return;
  //   }
  //   if (isEmpty(email)) {
  //     showToast("Email is required");
  //     return;
  //   }
  //   if (isEmpty(phoneNumber)) {
  //     showToast("Phone number is required");
  //     return;
  //   }
  //   if (isEmpty(userName)) {
  //     showToast("Username is required");
  //     return;
  //   }
  //   if (isEmpty(password)) {
  //     showToast("Password is required");
  //     return;
  //   }

  //   try {
  //     const data = await signup(
  //       firstName,
  //       lastName,
  //       email,
  //       phoneNumber,
  //       password,
  //       userName
  //     );

  //     if (data) {
  //       console.log("Signup successful");
  //       router.push("/auth/Login");
  //     }
  //   } catch (error) {
  //     console.log("Staying on signup");
  //     console.error("Error while signing: ", error);
  //   }
  // };

  const gotLoginWithoutValidation = () => {
    router.replace("/auth/Login");
  };

  return (
    <SafeAreaView style={styles.signupContainer}>
      <View style={styles.signupBoxWrapper}>
        <Custombox
          style={styles.signupBoxWrapper}
          boxStyle={signUpBox.mainBox}
          shadowStyle={signUpBox.shadowBox}
        >
          <CustomText style={styles.heading}>Sign Up</CustomText>

          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Username"
            value={userName}
            onChangeText={setUserName}
            style={styles.textInput}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
            placeholderTextColor="#888"
            keyboardType="email-address"
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
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.textInput}
            placeholderTextColor="#888"
            keyboardType="phone-pad"
          />

          <Button onPress={navigateToLoginScreen} style={styles.button}>
            <Custombox
              boxStyle={buttonBox.mainBox}
              shadowStyle={buttonBox.shadowBox}
            >
              <CustomText style={styles.buttonText}>Sign Up</CustomText>
            </Custombox>
          </Button>

          <Button onPress={gotLoginWithoutValidation} style={styles.button}>
            <Custombox
              boxStyle={buttonBox.mainBox}
              shadowStyle={buttonBox.shadowBox}
            >
              <CustomText style={styles.buttonText}>Go to Login</CustomText>
            </Custombox>
          </Button>
        </Custombox>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const signUpBox = {
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
  signupContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  signupBoxWrapper: {
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
