import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

const AVATAR_SIZE = 120;
const ORANGE_HEIGHT = 200;
const ORANGE = "#FF8A65";

const NEO_SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateUsername = (text: string) => {
    setUsername(text);
    if (text.trim() === "") {
      setUsernameError("Username is required");
    } else if (text.length < 3) {
      setUsernameError("Username must be at least 3 characters");
    } else {
      setUsernameError("");
    }
  };

  const validateEmail = (text: string) => {
    setEmail(text);
    if (text.trim() === "") {
      setEmailError("Email is required");
    } else if (!/^\S+@\S+\.\S+$/.test(text)) {
      setEmailError("Email format is invalid");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (text: string) => {
    setPassword(text);
    if (text.trim() === "") {
      setPasswordError("Password is required");
    } else if (text.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }

    if (confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
  };

  const validateConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (text.trim() === "") {
      setConfirmPasswordError("Please confirm your password");
    } else if (text !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleRegister = () => {
    validateUsername(username);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (
      !usernameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      username.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== ""
    ) {
      console.log("Register pressed", { username, email, password });
      router.replace("/");
    }
  };

  const goToLogin = () => {
    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f0f0f0" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar backgroundColor={ORANGE} barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Orange Top Half Circle */}
        <View style={styles.orangeTop} />

        {/* Avatar & Title Wrapper */}
        <View style={styles.avatarTitleWrapper}>
          {/* User Icon in White Circle */}
          <View style={styles.avatarCircle}>
            <Ionicons name="person-outline" size={70} color="#000" />
          </View>
          {/* Sign Up Title */}
          <Text style={styles.title}>Sign Up</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Username Input */}
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={[styles.input, usernameError ? styles.inputError : null]}
            placeholder="Enter your username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={validateUsername}
            autoCapitalize="none"
          />
          {usernameError ? (
            <Text style={styles.errorText}>{usernameError}</Text>
          ) : null}

          {/* Email Input */}
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : null]}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={validateEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          {/* Password Input */}
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : null]}
            placeholder="Enter your password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={validatePassword}
            secureTextEntry
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          {/* Confirm Password Input */}
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={[
              styles.input,
              confirmPasswordError ? styles.inputError : null,
            ]}
            placeholder="Confirm your password"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={validateConfirmPassword}
            secureTextEntry
          />
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}

          {/* Register Button */}
          <Pressable style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>
        </View>

        {/* Already have account Link */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 32,
    paddingTop: 0,
    minHeight: "100%",
    backgroundColor: "#f0f0f0",
  },
  orangeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: ORANGE_HEIGHT,
    backgroundColor: ORANGE,
    borderBottomLeftRadius: width * 0.6,
    borderBottomRightRadius: width * 0.6,
    zIndex: 0,
  },
  avatarTitleWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: ORANGE_HEIGHT - AVATAR_SIZE / 2,
    marginBottom: 24,
  },
  avatarCircle: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000",
    zIndex: 1,
    ...NEO_SHADOW,
  },
  title: {
    fontSize: 32,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#000",
    letterSpacing: 0,
    textAlign: "center",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    ...NEO_SHADOW,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: "#fff",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: ORANGE,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    borderWidth: 2,
    borderColor: "#000",
    ...NEO_SHADOW,
  },
  registerButtonText: {
    color: "#000",
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "bold",
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 15,
    color: "#444",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  loginLink: {
    color: ORANGE,
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    alignSelf: "flex-start",
    color: "#FF3B30",
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginBottom: 12,
    marginTop: -8,
  },
});
