import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FALLBACK_IMAGE, PROFILE_PICTURE } from "../assets/placeholder-images";
import NeoBrutalismNavbar from "../components/NeoBrutalismNavbar";

const { width } = Dimensions.get("window");

const NEO_SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

export default function Profile() {
  const navigateTo = (route: any) => {
    router.push(route);
  };
  const Header = () => (
    <View style={styles.headerFixed}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <Text style={styles.pageTitle}>Your Profile</Text>
          <Text style={styles.subtitle}>Manage your account and settings</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            source={PROFILE_PICTURE}
            style={styles.avatar}
            defaultSource={FALLBACK_IMAGE}
            onError={(e) => {
              console.warn(
                "Failed to load profile picture:",
                e.nativeEvent.error
              );
            }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Header />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Card */}
        <View style={[styles.card, { backgroundColor: "#AAC4FF" }]}>
          <View style={styles.userInfoRow}>
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={40} color="#000" />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Prabu Rizqi</Text>
              <Text style={styles.userEmail}>rzqishq@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigateTo("/edit-profile")}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
            <MaterialIcons name="edit" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Account Settings Card */}
        <View style={[styles.card, { backgroundColor: "#FDFFB6" }]}>
          <Text style={styles.cardTitle}>Account Settings</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigateTo("/notifications")}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#000"
              style={styles.settingIcon}
            />
            <Text style={styles.settingText}>Notifications</Text>
            <MaterialIcons name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigateTo("/privacy-security")}
          >
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="#000"
              style={styles.settingIcon}
            />
            <Text style={styles.settingText}>Privacy & Security</Text>
            <MaterialIcons name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigateTo("/payment-methods")}
          >
            <Ionicons
              name="wallet-outline"
              size={24}
              color="#000"
              style={styles.settingIcon}
            />
            <Text style={styles.settingText}>Payment Methods</Text>
            <MaterialIcons name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Learning Activity Card */}
        <View style={[styles.card, { backgroundColor: "#CDB4DB" }]}>
          <Text style={styles.cardTitle}>Your Learning Activity</Text>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigateTo("/learning-history")}
          >
            <Ionicons
              name="time-outline"
              size={24}
              color="#000"
              style={styles.settingIcon}
            />
            <Text style={styles.settingText}>Learning History</Text>
            <MaterialIcons name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigateTo("/saved-courses")}
          >
            <Ionicons
              name="bookmark-outline"
              size={24}
              color="#000"
              style={styles.settingIcon}
            />
            <Text style={styles.settingText}>Saved Courses</Text>
            <MaterialIcons name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigateTo("/achievements")}
          >
            <Ionicons
              name="trophy-outline"
              size={24}
              color="#000"
              style={styles.settingIcon}
            />
            <Text style={styles.settingText}>Achievements</Text>
            <MaterialIcons name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace("/")}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />
      </ScrollView>

      <NeoBrutalismNavbar variant="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70, // Space for fixed header
  },
  // Fixed header styles
  headerFixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    ...NEO_SHADOW,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  headerLeft: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderColor: "#000",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  card: {
    marginVertical: 10,
    borderRadius: 8,
    padding: 15,
    borderWidth: 2,
    borderColor: "#000",
    ...NEO_SHADOW,
  },
  userInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 16,
    ...NEO_SHADOW,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#FF3B30",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    ...NEO_SHADOW,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  spacer: {
    height: 80, // Extra space at the bottom
  },
});
