import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Switch,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { APP_COLORS } from "../components/NeoBrutalismNavbar";

const NEO_SHADOW = {
  shadowColor: APP_COLORS.BLACK,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

export default function PrivacySecurity() {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [biometricLogin, setBiometricLogin] = useState(true);
  const [appLock, setAppLock] = useState(false);
  const [shareActivity, setShareActivity] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  
  const goBack = () => {
    router.back();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Fixed Header */}
      <View style={styles.headerFixed}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={APP_COLORS.BLACK} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Privacy & Security</Text>
        <View style={{ width: 24 }} /> 
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          
          <View style={styles.settingGroup}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="lock-closed" size={22} color={APP_COLORS.BLACK} style={styles.settingIcon} />
                <Text style={styles.settingText}>Two-Factor Authentication</Text>
              </View>
              <Switch
                value={twoFactorAuth}
                onValueChange={setTwoFactorAuth}
                trackColor={{ false: "#DDD", true: APP_COLORS.CATEGORY_BLUE }}
                thumbColor={twoFactorAuth ? "#fff" : "#fff"}
              />
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="finger-print" size={22} color={APP_COLORS.BLACK} style={styles.settingIcon} />
                <Text style={styles.settingText}>Biometric Login</Text>
              </View>
              <Switch
                value={biometricLogin}
                onValueChange={setBiometricLogin}
                trackColor={{ false: "#DDD", true: APP_COLORS.CATEGORY_BLUE }}
                thumbColor={biometricLogin ? "#fff" : "#fff"}
              />
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="shield" size={22} color={APP_COLORS.BLACK} style={styles.settingIcon} />
                <Text style={styles.settingText}>App Lock</Text>
              </View>
              <Switch
                value={appLock}
                onValueChange={setAppLock}
                trackColor={{ false: "#DDD", true: APP_COLORS.CATEGORY_BLUE }}
                thumbColor={appLock ? "#fff" : "#fff"}
              />
            </View>
          </View>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Change Password</Text>
            <MaterialIcons name="chevron-right" size={22} color={APP_COLORS.BLACK} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Manage Connected Accounts</Text>
            <MaterialIcons name="chevron-right" size={22} color={APP_COLORS.BLACK} />
          </TouchableOpacity>
        </View>
        
        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          
          <View style={styles.settingGroup}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="share-social" size={22} color={APP_COLORS.BLACK} style={styles.settingIcon} />
                <Text style={styles.settingText}>Share Learning Activity</Text>
              </View>
              <Switch
                value={shareActivity}
                onValueChange={setShareActivity}
                trackColor={{ false: "#DDD", true: APP_COLORS.CATEGORY_BLUE }}
                thumbColor={shareActivity ? "#fff" : "#fff"}
              />
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="stats-chart" size={22} color={APP_COLORS.BLACK} style={styles.settingIcon} />
                <Text style={styles.settingText}>Show Progress to Others</Text>
              </View>
              <Switch
                value={showProgress}
                onValueChange={setShowProgress}
                trackColor={{ false: "#DDD", true: APP_COLORS.CATEGORY_BLUE }}
                thumbColor={showProgress ? "#fff" : "#fff"}
              />
            </View>
          </View>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Profile Visibility</Text>
            <MaterialIcons name="chevron-right" size={22} color={APP_COLORS.BLACK} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Data & Privacy Settings</Text>
            <MaterialIcons name="chevron-right" size={22} color={APP_COLORS.BLACK} />
          </TouchableOpacity>
        </View>
        
        {/* Login Sessions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Login Sessions</Text>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>View Active Sessions</Text>
            <MaterialIcons name="chevron-right" size={22} color={APP_COLORS.BLACK} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Log Out of All Devices</Text>
            <MaterialIcons name="chevron-right" size={22} color={APP_COLORS.BLACK} />
          </TouchableOpacity>
        </View>
        
        {/* Extra options */}
        <TouchableOpacity style={styles.dangerButton}>
          <Text style={styles.dangerButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60, // Space for fixed header
  },
  headerFixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    ...NEO_SHADOW,
  },
  backButton: {
    padding: 4,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  settingGroup: {
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 6,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    shadowColor: APP_COLORS.BLACK,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  linkButtonText: {
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  dangerButton: {
    backgroundColor: "#FF3B30",
    padding: 16,
    marginTop: 24,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
});
