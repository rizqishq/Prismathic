import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Standardized colors for entire app
export const APP_COLORS = {
  PRIMARY: "#FF8500",         // Primary orange for brand elements
  BACKGROUND: "#f0f0f0",     // Light background for app
  WHITE: "#ffffff",          // White for cards and content areas
  BLACK: "#000000",          // Black for text and borders
  CATEGORY_BLUE: "#AAC4FF",  // Blue theme for categories
  CATEGORY_PINK: "#CDB4DB",  // Pink theme for categories
  CATEGORY_YELLOW: "#FDFFB6", // Yellow theme for categories
  CATEGORY_ORANGE: "#FFD6A5", // Orange theme for categories
  CATEGORY_TEAL: "#B1FFF5",  // Teal theme for categories
  CATEGORY_PURPLE: "#BDB2FF", // Purple theme for categories
};

// Standardized neobrutalism shadow styling
export const NEO_SHADOW = {
  shadowColor: APP_COLORS.BLACK,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

export type NavbarVariant = "home" | "explore" | "profile" | "course";

type NavbarProps = {
  variant?: NavbarVariant;
  style?: any;
};

export default function NeoBrutalismNavbar({
  variant = "home",
  style = {},
}: NavbarProps) {
  const router = useRouter();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.navbar}>
        {/* Home Button */}
        <TouchableOpacity
          style={[
            styles.navItem,
            variant === "home"
              ? styles.activeNavItem
              : styles.inactiveNavItem,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Home"
          onPress={() => variant !== "home" && router.push({ pathname: "/home" })}
        >
          <Ionicons
            name="home-outline"
            size={24}
            color={APP_COLORS.BLACK}
            style={variant === "home" ? styles.navIcon : undefined}
          />
          {variant === "home" ? <Text style={styles.navText}>Home</Text> : null}
        </TouchableOpacity>

        {/* Explore Button */}
        <TouchableOpacity
          style={[
            styles.navItem,
            variant === "explore"
              ? styles.activeNavItem
              : styles.inactiveNavItem,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Explore"
          onPress={() =>
            variant !== "explore" && router.push({ pathname: "/explore" })
          }
        >
          <Ionicons
            name="globe-outline"
            size={24}
            color={APP_COLORS.BLACK}
            style={variant === "explore" ? styles.navIcon : undefined}
          />
          {variant === "explore" ? (
            <Text style={styles.navText}>Explore</Text>
          ) : null}
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity
          style={[
            styles.navItem,
            variant === "profile"
              ? styles.activeNavItem
              : styles.inactiveNavItem,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Profile"
          onPress={() =>
            variant !== "profile" && router.push({ pathname: "/profile" })
          }
        >
          <Ionicons
            name="person-outline"
            size={24}
            color={APP_COLORS.BLACK}
            style={variant === "profile" ? styles.navIcon : undefined}
          />
          {variant === "profile" ? (
            <Text style={styles.navText}>Profile</Text>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: APP_COLORS.CATEGORY_ORANGE,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    borderRadius: 30,
    height: 64,
    padding: 6,
    ...NEO_SHADOW,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: APP_COLORS.WHITE,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    borderRadius: 24,
    height: 52,
    shadowColor: APP_COLORS.BLACK,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  activeNavItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 4,
    backgroundColor: APP_COLORS.CATEGORY_YELLOW,
  },
  inactiveNavItem: {
    width: 52,
    height: 52,
    marginHorizontal: 4,
  },
  navIcon: {
    marginRight: 6,
  },
  navText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    color: APP_COLORS.BLACK,
  },
});
