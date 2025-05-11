import { AntDesign, Ionicons } from "@expo/vector-icons";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
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
  };
  
  const handleLogin = () => {
    validateEmail(email);
    validatePassword(password);
    
    if (!emailError && !passwordError && email.trim() !== "" && password.trim() !== "") {
      console.log("Login pressed", { email, password });
      router.replace("/home");
    }
  };
  
  const goToSignup = () => {
    router.push("/signup");
  };
  
  const goToForgotPassword = () => {
    router.push("/forgot-password");
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
        <View style={styles.orangeTop} />

        <View style={styles.avatarTitleWrapper}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person-outline" size={70} color="#000" />
          </View>
          <Text style={styles.title}>Sign In</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
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
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

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
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword} onPress={goToForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
        </View>

        {/* Or Divider */}
        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        {/* Social Login Container */}
        <View style={styles.socialContainer}>
          {/* Login with Apple */}
          <Pressable style={styles.socialButton}>
            <AntDesign
              name="apple1"
              size={20}
              color="#000"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.socialButtonText}>Login with Apple</Text>
          </Pressable>

          {/* Login with Google */}
          <Pressable style={styles.socialButton}>
            <AntDesign
              name="google"
              size={20}
              color="#000"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.socialButtonText}>Login with Google</Text>
          </Pressable>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don&apos;t have an account?</Text>
          <TouchableOpacity onPress={goToSignup}>
            <Text style={styles.signupLink}>Sign Up</Text>
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
  loginButton: {
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
  loginButtonText: {
    color: "#000",
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "bold",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 16,
    padding: 4,
  },
  forgotPasswordText: {
    color: "#222",
    textDecorationLine: "underline",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 14,
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginVertical: 20,
  },
  line: {
    width: "35%",
    height: 1,
    backgroundColor: "#aaa",
  },
  orText: {
    marginHorizontal: 15,
    color: "#444",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 15,
    fontWeight: "500",
  },
  socialContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    padding: 20,
    ...NEO_SHADOW,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    marginBottom: 14,
    ...NEO_SHADOW,
  },
  socialButtonText: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
  },
  signupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
    marginBottom: 20,
  },
  signupText: {
    fontSize: 15,
    color: "#444",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  signupLink: {
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