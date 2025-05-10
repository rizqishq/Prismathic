import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { router } from "expo-router";
import { APP_COLORS } from "../components/NeoBrutalismNavbar";
import { ICON } from "../assets/placeholder-images";

const NEO_SHADOW = {
  shadowColor: APP_COLORS.BLACK,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

const { width } = Dimensions.get("window");

export default function Achievements() {
  const goBack = () => {
    router.back();
  };
  
  const getIconName = (customName: string): string => {
    const iconMap: {[key: string]: string} = {
      "trophy": "trophy",
      "calculator": "calculator",
      "calendar": "calendar",
      "bulb": "bulb",
      "sunny": "sunny",
      "moon": "moon",
    };
    return iconMap[customName] || "help-circle";
  };

  const achievements = [
    {
      id: 1,
      title: "Fast Learner",
      description: "Complete your first course within 7 days",
      icon: "trophy",
      progress: 100,
      completed: true,
      color: APP_COLORS.CATEGORY_YELLOW,
    },
    {
      id: 2,
      title: "Math Wizard",
      description: "Complete 3 math courses",
      icon: "calculator",
      progress: 66,
      completed: false,
      color: APP_COLORS.CATEGORY_BLUE,
    },
    {
      id: 3,
      title: "Consistent Learner",
      description: "Study for 7 consecutive days",
      icon: "calendar",
      progress: 85,
      completed: false,
      color: APP_COLORS.CATEGORY_ORANGE,
    },
    {
      id: 4,
      title: "Problem Solver",
      description: "Solve 100 practice problems",
      icon: "bulb",
      progress: 45,
      completed: false,
      color: APP_COLORS.CATEGORY_TEAL,
    },
    {
      id: 5,
      title: "Early Bird",
      description: "Complete 5 sessions before 9 AM",
      icon: "sunny",
      progress: 20,
      completed: false,
      color: APP_COLORS.CATEGORY_PINK,
    },
    {
      id: 6,
      title: "Night Owl",
      description: "Complete 5 sessions after 10 PM",
      icon: "moon",
      progress: 80,
      completed: false,
      color: APP_COLORS.CATEGORY_BLUE,
    },
  ];

  const stats = {
    totalAchievements: 24,
    completed: 8,
    inProgress: 6,
    points: 1250,
    level: 4,
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Fixed Header */}
      <View style={styles.headerFixed}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={APP_COLORS.BLACK} />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Achievements</Text>
        <View style={{ width: 24 }} /> {/* Empty view for spacing */}
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Achievement Summary Card */}
        <View style={[styles.summaryCard, { backgroundColor: APP_COLORS.CATEGORY_YELLOW }]}>
          <View style={styles.statsContainer}>
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <Image source={ICON} style={styles.avatar} />
              </View>
              <Text style={styles.userName}>John Prismathic</Text>
            </View>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.totalAchievements}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.completed}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.inProgress}</Text>
                <Text style={styles.statLabel}>In Progress</Text>
              </View>
            </View>
            
            <View style={styles.levelContainer}>
              <Text style={styles.pointsText}>{stats.points} Points</Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>Level {stats.level}</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Achievements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Achievements</Text>
          
          <View style={styles.achievementsGrid}>
            {achievements.map(achievement => (
              <View 
                key={achievement.id}
                style={[styles.achievementCard, { backgroundColor: achievement.color }]}
              >
                <View style={styles.achievementIconContainer}>
                  <Ionicons 
                    name={getIconName(achievement.icon) as any} 
                    size={30} 
                    color={achievement.completed ? APP_COLORS.BLACK : "#777"} 
                  />
                </View>
                
                <Text style={[
                  styles.achievementTitle,
                  achievement.completed ? styles.completedTitle : null
                ]}>
                  {achievement.title}
                </Text>
                
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar,
                      { width: `${achievement.progress}%` as any }
                    ]} 
                  />
                </View>
                
                <Text style={styles.progressText}>
                  {achievement.progress}% Complete
                </Text>
                
                {achievement.completed && (
                  <View style={styles.completedBadge}>
                    <Ionicons name="checkmark-circle" size={24} color={APP_COLORS.BLACK} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
        
        {/* View All Button */}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Achievements</Text>
        </TouchableOpacity>
        
        {/* Share Achievements */}
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-social" size={20} color={APP_COLORS.BLACK} style={{marginRight: 8}} />
          <Text style={styles.shareButtonText}>Share Your Achievements</Text>
        </TouchableOpacity>
        
        <View style={styles.spacer} />
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
  summaryCard: {
    marginTop: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  statsContainer: {
    width: "100%",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    backgroundColor: "#fff",
    marginRight: 12,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    shadowColor: APP_COLORS.BLACK,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  statLabel: {
    fontSize: 12,
    color: "#555",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  levelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  levelBadge: {
    backgroundColor: APP_COLORS.BLACK,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  levelText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  achievementCard: {
    width: (width - 40) / 2, // Two columns with spacing
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    marginBottom: 16,
    shadowColor: APP_COLORS.BLACK,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  achievementIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  completedTitle: {
    color: APP_COLORS.BLACK,
  },
  achievementDescription: {
    fontSize: 12,
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    color: "#333",
  },
  progressBarContainer: {
    height: 8,
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: 4,
    marginBottom: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: APP_COLORS.BLACK,
  },
  progressBar: {
    height: "100%",
    backgroundColor: APP_COLORS.BLACK,
  },
  progressText: {
    fontSize: 12,
    color: "#555",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  completedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  viewAllButton: {
    alignItems: "center",
    padding: 14,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    borderRadius: 8,
    shadowColor: APP_COLORS.BLACK,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
    backgroundColor: APP_COLORS.CATEGORY_BLUE,
    marginBottom: 16,
  },
  viewAllText: {
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    borderRadius: 8,
    shadowColor: APP_COLORS.BLACK,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
    backgroundColor: APP_COLORS.WHITE,
    marginBottom: 20,
  },
  shareButtonText: {
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  spacer: {
    height: 60,
  },
});
