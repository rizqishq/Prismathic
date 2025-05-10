import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
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
import { APP_COLORS } from "../components/NeoBrutalismNavbar";

const { width } = Dimensions.get("window");

const NEO_SHADOW = {
  shadowColor: APP_COLORS.BLACK,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

export default function SetNewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateNewPassword = (text: string) => {
    setNewPassword(text);
    if (text.trim() === "") {
      setNewPasswordError("New password is required");
    } else if (text.length < 8) {
      setNewPasswordError("Password must be at least 8 characters");
    } else if (!/\d/.test(text) || !/[a-zA-Z]/.test(text)) {
      setNewPasswordError("Password must include both letters and numbers");
    } else {
      setNewPasswordError("");
    }

    if (confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
  };

  const validateConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    if (text.trim() === "") {
      setConfirmPasswordError("Please confirm your password");
    } else if (text !== newPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const updatePassword = () => {
    validateNewPassword(newPassword);
    validateConfirmPassword(confirmPassword);

    if (
      !newPasswordError &&
      !confirmPasswordError &&
      newPassword.trim() !== "" &&
      confirmPassword.trim() !== ""
    ) {
      console.log("Updating password to:", newPassword);
      router.replace("/");
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: APP_COLORS.WHITE }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar backgroundColor={APP_COLORS.WHITE} barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <View style={styles.backButtonCircle}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </View>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Set New Password</Text>
          <Text style={styles.subtitle}>
            Please choose a strong password that you haven't used before. Confirm your new password in the field provided.
          </Text>
        </View>

        {/* New Password Label */}
        <Text style={styles.inputLabel}>New Password</Text>

        {/* New Password Input */}
        <TextInput
          style={[
            styles.input,
            newPasswordError ? styles.inputError : null,
          ]}
          placeholder="New Password"
          placeholderTextColor="#888"
          value={newPassword}
          onChangeText={validateNewPassword}
          secureTextEntry
        />
        {newPasswordError ? (
          <Text style={styles.errorText}>{newPasswordError}</Text>
        ) : null}

        {/* Confirm Password Label */}
        <Text style={styles.inputLabel}>Confirm Password</Text>

        {/* Confirm Password Input */}
        <TextInput
          style={[
            styles.input,
            confirmPasswordError ? styles.inputError : null,
          ]}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={validateConfirmPassword}
          secureTextEntry
        />
        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}

        {/* Update Password Button */}
        <Pressable style={styles.updateButton} onPress={updatePassword}>
          <Text style={styles.updateButtonText}>Update Password</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    minHeight: "100%",
    backgroundColor: APP_COLORS.WHITE,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: APP_COLORS.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  header: {
    width: "100%",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    lineHeight: 22,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "flex-start",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: APP_COLORS.BLACK,
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: APP_COLORS.WHITE,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    ...NEO_SHADOW,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    alignSelf: "flex-start",
    color: "#FF3B30",
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginBottom: 16,
    marginTop: -8,
  },
  updateButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF8A65",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  updateButtonText: {
    color: "#000",
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "bold",
  },
});
