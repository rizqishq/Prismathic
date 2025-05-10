import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { COURSE_CALCULUS, ICON } from "../../assets/placeholder-images";
import NeoBrutalismNavbar, { APP_COLORS } from "../../components/NeoBrutalismNavbar";

const { width } = Dimensions.get("window");


const NEO_SHADOW = {
  shadowColor: APP_COLORS.BLACK,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

export default function CalculusCourse() {
  const router = useRouter();
  const [progress, setProgress] = useState(30);


  const courseInfo = {
    title: "Calculus",
    category: "Advanced Math",
    level: "Intermediate",
    duration: "10 hours",
    students: "3,842",
    rating: 4.7,
    icon: "integral",
    color: APP_COLORS.CATEGORY_BLUE,
    description: "Master the fundamentals of calculus including limits, derivatives, and integrals. Learn how to solve real-world problems using calculus and understand the mathematical foundations of science and engineering."
  };

  const courseContent = [
    {
      title: "Introduction to Calculus",
      type: "video",
      duration: "12:45",
      description: "Overview of calculus and its applications in science and engineering",
      completed: true,
    },
    {
      title: "Limits and Continuity",
      type: "video",
      duration: "15:20",
      description: "Understanding limits, continuity, and their properties",
      completed: true,
    },
    {
      title: "The Derivative",
      type: "reading",
      duration: "20 min",
      description: "Definition of derivatives and rules of differentiation",
      completed: true,
    },
    {
      title: "Applications of Derivatives",
      type: "video",
      duration: "18:30",
      description: "Using derivatives for rates of change and optimization problems",
      completed: false,
    },
    {
      title: "Practice: Derivatives",
      type: "exercise",
      duration: "25 min",
      description: "Hands-on exercises applying differentiation rules",
      completed: false,
    },
    {
      title: "The Definite Integral",
      type: "video",
      duration: "16:40",
      description: "Introduction to integration and the Fundamental Theorem of Calculus",
      completed: false,
    },
    {
      title: "Techniques of Integration",
      type: "reading",
      duration: "30 min",
      description: "Methods for evaluating integrals including substitution and parts",
      completed: false,
    },
    {
      title: "Applications of Integration",
      type: "video",
      duration: "22:15",
      description: "Finding areas, volumes, and other applications of integrals",
      completed: false,
    },
    {
      title: "Final Project: Calculus in Real Life",
      type: "project",
      duration: "45 min",
      description: "Apply calculus concepts to solve a real-world problem",
      completed: false,
    },
  ];

  const handleContentPress = (item: any) => {

    if (item.title === "The Derivative") {
      router.push({
        pathname: "/course",
        params: { type: "calculus", lesson: "derivative" }
      });
    } else {
      console.log(`Opening lesson: ${item.title} (under development)`);
    }
  };

  const renderContentItem = (item: any, index: number) => {
    const isCompleted = progress > (index * 10);
    
    return (
      <TouchableOpacity
        key={index}
        style={[styles.contentItem, isCompleted && styles.completedItem]}
        onPress={() => handleContentPress(item)}
      >
        <View style={[styles.contentIconContainer, { backgroundColor: isCompleted ? courseInfo.color : "#f0f0f0" }]}>
          <FontAwesome5
            name={
              item.type === "video"
                ? "play-circle"
                : item.type === "reading"
                ? "book"
                : item.type === "exercise"
                ? "dumbbell"
                : item.type === "project"
                ? "project-diagram"
                : "question-circle"
            }
            size={20}
            color={isCompleted ? APP_COLORS.BLACK : "#555"}
          />
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.contentTitle}>{item.title}</Text>
          <Text style={styles.contentDescription}>{item.description}</Text>
          <View style={styles.contentMeta}>
            <Text style={styles.contentDuration}>
              <FontAwesome5 name="clock" size={12} /> {item.duration}
            </Text>
            {isCompleted && (
              <Text style={styles.completedText}>
                <Ionicons name="checkmark-circle" size={14} color="green" /> Completed
              </Text>
            )}
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#000" />
      </TouchableOpacity>
    );
  };

  // Create a sample of what students will learn
  const learningPoints = [
    "Master the concept of limits and continuity",
    "Understand derivatives and their applications",
    "Learn integration techniques and applications",
    "Apply calculus to solve real-world problems",
    "Prepare for advanced mathematics courses"
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <FontAwesome5 name={courseInfo.icon} size={28} color="#000" />
          <Text style={styles.courseTitle}>{courseInfo.title}</Text>
          <Text style={styles.categoryText}>{courseInfo.category}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Course Banner with Icon instead of Image */}
        <View style={[styles.bannerContainer, {backgroundColor: courseInfo.color}]}>
          <FontAwesome5 name="square-root-alt" size={60} color="#000" style={styles.bannerIcon} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Advanced Mathematics</Text>
            <Text style={styles.bannerSubtitle}>Master complex mathematical concepts</Text>
          </View>
        </View>

        {/* Course Info */}
        <View style={[styles.courseInfoCard, {backgroundColor: courseInfo.color}]}>
          <Text style={styles.courseDescription}>{courseInfo.description}</Text>
          
          <View style={styles.courseStats}>
            <View style={styles.statItem}>
              <FontAwesome5 name="layer-group" size={16} color="#000" />
              <Text style={styles.statText}>{courseInfo.level}</Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome5 name="clock" size={16} color="#000" />
              <Text style={styles.statText}>{courseInfo.duration}</Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome5 name="users" size={16} color="#000" />
              <Text style={styles.statText}>{courseInfo.students}</Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome5 name="star" size={16} color="#000" />
              <Text style={styles.statText}>{courseInfo.rating}</Text>
            </View>
          </View>
        </View>

        {/* What You'll Learn */}
        <View style={styles.learnSection}>
          <Text style={styles.sectionTitle}>What You'll Learn</Text>
          <View style={styles.learnPoints}>
            {learningPoints.map((point, index) => (
              <View key={index} style={styles.learnPoint}>
                <FontAwesome5 name="check-circle" size={16} color={courseInfo.color} style={styles.checkIcon} />
                <Text style={styles.learnPointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>Course Progress</Text>
            <Text style={styles.progressPercentage}>{progress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: courseInfo.color }]} />
          </View>
        </View>

        {/* Course Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Course Content</Text>
          <Text style={styles.contentSubtitle}>{courseContent.length} lessons • {courseInfo.duration} total</Text>
          
          {courseContent.map((item, index) => renderContentItem(item, index))}
          
          {/* Call to Action */}
          <TouchableOpacity 
            style={[styles.ctaButton, {backgroundColor: courseInfo.color}]}
            onPress={() => handleContentPress(courseContent[3])} // Navigate to next incomplete lesson
          >
            <Text style={styles.ctaButtonText}>Continue Learning</Text>
          </TouchableOpacity>
        </View>

        {/* Instructor */}
        <View style={styles.instructorSection}>
          <Text style={styles.sectionTitle}>Your Instructor</Text>
          <View style={styles.instructorCard}>
            <View style={styles.instructorImageContainer}>
              <Image source={ICON} style={styles.instructorImage} />
            </View>
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>Dr. Sarah Jenkins</Text>
              <Text style={styles.instructorTitle}>Professor of Mathematics</Text>
              <Text style={styles.instructorBio}>PhD in Applied Mathematics with 15+ years teaching experience. Specializes in calculus and differential equations.</Text>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <NeoBrutalismNavbar variant="explore" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  backButton: {
    marginBottom: 16,
  },
  headerContent: {
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  categoryText: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    margin: 16,
    marginTop: 0,
    height: 140,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    marginBottom: 16,
    ...NEO_SHADOW,
  },
  bannerIcon: {
    marginRight: 16,
    marginLeft: 8,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    color: APP_COLORS.BLACK,
  },
  // Course Info Card
  courseInfoCard: {
    padding: 16,
    margin: 16,
    marginTop: 0,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  courseDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  courseStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: APP_COLORS.WHITE,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: APP_COLORS.BLACK,
  },
  statText: {
    marginLeft: 6,
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  // What You'll Learn Section
  learnSection: {
    margin: 16,
    marginTop: 0,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  learnPoints: {
    marginTop: 12,
  },
  learnPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  checkIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  learnPointText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  progressContainer: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
    ...NEO_SHADOW,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  progressBar: {
    height: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#000",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },

  contentContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  contentSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  contentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  completedItem: {
    borderLeftWidth: 6,
    borderLeftColor: "green",
  },
  contentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  contentDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  contentMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentDuration: {
    fontSize: 12,
    color: "#666",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  completedText: {
    fontSize: 12,
    color: "green",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },

  ctaButton: {
    alignItems: "center",
    padding: 16,
    marginVertical: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },

  instructorSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  instructorCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  instructorImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    marginRight: 16,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
  },
  instructorImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  instructorTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  instructorBio: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  spacer: {
    height: 100,
  },
});
