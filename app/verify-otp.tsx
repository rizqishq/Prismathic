import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
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

export default function VerifyOTP() {
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null, null]);
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");

  const handleOtpChange = (text: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = text;
    setOtpValues(newOtpValues);
    if (text.length === 1 && index < otpValues.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    setOtpError("");
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otpValues[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    const isComplete = otpValues.every(value => value.length === 1);
    
    if (!isComplete) {
      setOtpError("Please enter the complete verification code");
      return;
    }

    console.log("Verifying OTP:", otpValues.join(""));
    
    router.push("/set-new-password");
  };

  const resendCode = () => {
    console.log("Resending verification code");
    
    setOtpValues(["", "", "", "", ""]);
    setOtpError("");
    
    inputRefs.current[0]?.focus();
  };

  const goBack = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
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
          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a one-time passcode (OTP) to your
            email. Please check your inbox and enter the
            code below.
          </Text>
        </View>

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          {otpValues.map((value, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[styles.otpInput, otpError ? styles.inputError : null]}
              value={value}
              onChangeText={(text) => handleOtpChange(text.replace(/[^0-9]/g, ''), index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>
        {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}

        {/* Verify Code Button */}
        <Pressable style={styles.verifyButton} onPress={verifyOtp}>
          <Text style={styles.verifyButtonText}>Verify Code</Text>
        </Pressable>

        {/* Resend Code */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the email? </Text>
          <TouchableOpacity onPress={resendCode}>
            <Text style={styles.resendLink}>Resend Code</Text>
          </TouchableOpacity>
        </View>
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderColor: APP_COLORS.BLACK,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    backgroundColor: APP_COLORS.WHITE,
    ...NEO_SHADOW,
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  errorText: {
    alignSelf: "center",
    color: "#FF3B30",
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginBottom: 16,
    marginTop: -8,
  },
  verifyButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF8A65",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  verifyButtonText: {
    color: "#000",
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "bold",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#555",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  resendLink: {
    fontSize: 14,
    color: "#FF8A65",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
