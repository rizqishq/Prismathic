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

export default function Notifications() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [newCourses, setNewCourses] = useState(true);
  const [achievements, setAchievements] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [promotions, setPromotions] = useState(false);
  
  const goBack = () => {
    router.back();
  };
  
  const getIconName = (customName: string) => {
    const iconMap: {[key: string]: any} = {
      "trophy-outline": "trophy-outline",
      "refresh-outline": "refresh-outline",
      "alarm-outline": "alarm-outline",
      "arrow-back": "arrow-back",
    };
    return iconMap[customName] || "help-circle";
  };
  
  const notificationItems = [
    {
      id: 1,
      title: "New Achievement Unlocked!",
      message: "You've completed 5 consecutive days of learning.",
      time: "2 hours ago",
      icon: "trophy-outline",
      color: APP_COLORS.CATEGORY_YELLOW,
      read: false,
    },
    {
      id: 2,
      title: "Course Update Available",
      message: "The 'Introduction to Calculus' course has been updated with new content.",
      time: "Yesterday",
      icon: "refresh-outline",
      color: APP_COLORS.CATEGORY_BLUE,
      read: true,
    },
    {
      id: 3,
      title: "Learning Reminder",
      message: "It's time to continue your Python programming course!",
      time: "2 days ago",
      icon: "alarm-outline",
      color: APP_COLORS.CATEGORY_ORANGE,
      read: true,
    },
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Fixed Header */}
      <View style={styles.headerFixed}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name={getIconName("arrow-back")} size={24} color={APP_COLORS.BLACK} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Recent Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          
          {notificationItems.map(item => (
            <View 
              key={item.id} 
              style={[
                styles.notificationItem, 
                {opacity: item.read ? 0.8 : 1},
                !item.read ? styles.unreadNotification : null
              ]}
            >
              <View style={[styles.iconContainer, {backgroundColor: item.color}]}>
                <Ionicons name={getIconName(item.icon)} size={24} color={APP_COLORS.BLACK} />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>
            </View>
          ))}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Notifications</Text>
          </TouchableOpacity>
        </View>
        
        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          
          <View style={styles.settingCard}>
            <Text style={styles.settingCardTitle}>Notification Channels</Text>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="phone-portrait" size={20} color={APP_COLORS.BLACK} style={styles.settingIcon} />
                <Text style={styles.settingText}>Push Notifications</Text>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: "#DDD", true: APP_COLORS.CATEGORY_BLUE }}
                thumbColor={pushEnabled ? "#fff" : "#fff"}
              />
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="mail" size={20} color={APP_COLORS.BLACK} style={styles.settingIcon} />
                <Text style={styles.settingText}>Email Notifications</Text>
              </View>
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{ false: "#DDD", true: APP_COLORS.CATEGORY_BLUE }}
                thumbColor={emailEnabled ? "#fff" : "#fff"}
              />
            </View>
          </View>
          
          <View style={styles.settingCard}>
            <Text style={styles.settingCardTitle}>Notification Types</Text>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="book" size={20} color={APP_COLORS.BLACK} style={styles.settingIcon} />
                <Text style={styles.settingText}>Course Updates</Text>
              </View>
              <Switch
                value={courseUpdates}
                onValueChange={setCourseUpdates}
                trackColor={{ false: "#DDD", true: APP_COLORS.CATEGORY_BLUE }}
                thumbColor={courseUpdates ? "#fff" : "#fff"}
              />
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="ribbon" size={20} color={APP_COLORS.BLACK} style={styles.settingIcon} />
                <Text style={styles.settingText}>New Courses</Text>
              </View>
              <Switch
                value={newCourses}
                onValueChange={setNewCourses}
                trackColor={{ false: "#DDD", true: APP_COLORS.CATEGORY_BLUE }}
                thumbColor={newCourses ? "#fff" : "#fff"}
              />
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="trophy" size={20} color={APP_COLORS.BLACK} style={styles.settingIcon} />
                <Text style={styles.settingText}>Achievements</Text>
              </View>
              <Switch
                value={achievements}
                onValueChange={setAchievements}
                trackColor={{ false: "#DDD", true: APP_COLORS.CATEGORY_BLUE }}
                thumbColor={achievements ? "#fff" : "#fff"}
              />
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="alarm" size={20} color={APP_COLORS.BLACK} style={styles.settingIcon} />
                <Text style={styles.settingText}>Learning Reminders</Text>
              </View>
              <Switch
                value={reminders}
                onValueChange={setReminders}
                trackColor={{ false: "#DDD", true: APP_COLORS.CATEGORY_BLUE }}
                thumbColor={reminders ? "#fff" : "#fff"}
              />
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="gift" size={20} color={APP_COLORS.BLACK} style={styles.settingIcon} />
                <Text style={styles.settingText}>Promotions & Offers</Text>
              </View>
              <Switch
                value={promotions}
                onValueChange={setPromotions}
                trackColor={{ false: "#DDD", true: APP_COLORS.CATEGORY_BLUE }}
                thumbColor={promotions ? "#fff" : "#fff"}
              />
            </View>
          </View>
          
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All Notifications</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  notificationItem: {
    flexDirection: "row",
    marginBottom: 12,
    padding: 14,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    shadowColor: APP_COLORS.BLACK,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  unreadNotification: {
    borderLeftWidth: 5,
    borderLeftColor: APP_COLORS.PRIMARY,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  notificationTime: {
    fontSize: 12,
    color: "#888",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  viewAllButton: {
    alignItems: "center",
    padding: 12,
    marginTop: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    borderRadius: 8,
    shadowColor: APP_COLORS.BLACK,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
    backgroundColor: APP_COLORS.CATEGORY_BLUE,
  },
  viewAllText: {
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  settingCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  settingCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 10,
  },
  settingText: {
    fontSize: 15,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  clearButton: {
    alignItems: "center",
    padding: 14,
    marginTop: 8,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    borderRadius: 8,
    shadowColor: APP_COLORS.BLACK,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
    backgroundColor: APP_COLORS.CATEGORY_ORANGE,
  },
  clearButtonText: {
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
});
