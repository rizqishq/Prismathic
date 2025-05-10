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
import NeoBrutalismNavbar, { APP_COLORS } from "../../components/NeoBrutalismNavbar";

const { width } = Dimensions.get("window");


const NEO_SHADOW = {
  shadowColor: APP_COLORS.BLACK,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

export default function PythonProgramming() {
  const router = useRouter();
  const [progress, setProgress] = useState(15);


  const courseInfo = {
    title: "Programming with Python",
    category: "Programming & CS",
    level: "Beginner",
    duration: "8 hours",
    students: "5,239",
    rating: 4.8,
    icon: "python",
    color: APP_COLORS.CATEGORY_PINK,
    description: "Master Python programming from the ground up. Learn core concepts, best practices, and build real-world applications with one of the most popular programming languages worldwide."
  };

  const courseContent = [
    {
      title: "Introduction to Python",
      type: "video",
      duration: "10:20",
      description:
        "Learn about Python's history, features, and why it's popular",
      completed: false,
    },
    {
      title: "Setting Up Your Environment",
      type: "reading",
      duration: "15 min",
      description: "Install Python and set up your development environment",
      completed: false,
    },
    {
      title: "Python Basics",
      type: "video",
      duration: "15:45",
      description: "Variables, data types, and basic operations in Python",
      completed: false,
    },
    {
      title: "Control Flow",
      type: "video",
      duration: "12:30",
      description: "Learn about if statements, loops, and control structures",
      completed: false,
    },
    {
      title: "Practice: Basic Python",
      type: "exercise",
      duration: "25 min",
      description: "Hands-on exercises to practice Python basics",
      completed: false,
    },
    {
      title: "Functions and Modules",
      type: "video",
      duration: "18:15",
      description: "Create and use functions, import modules",
      completed: false,
    },
    {
      title: "Data Structures",
      type: "reading",
      duration: "20 min",
      description: "Lists, tuples, dictionaries, and sets in Python",
      completed: false,
    },
    {
      title: "Final Project",
      type: "exercise",
      duration: "45 min",
      description:
        "Build a simple Python application using what you've learned",
      completed: false,
    },
    {
      title: "Course Assessment",
      type: "quiz",
      duration: "30 min",
      description: "Test your Python programming knowledge",
      completed: false,
    },
  ];

  const handleContentPress = (item: any) => {

    if (item.title === "Python Basics") {

      console.log(`Opening lesson: ${item.title}`);
      

      
      if (courseContent.indexOf(item) === 2) {
        router.back();
        setTimeout(() => {
          router.push("/explore");
        }, 100);
      }
    } else {
      // For other lessons, just show feedback that they're under development
      console.log(`Opening lesson: ${item.title} (under development)`);
    }
  };

  const renderContentItem = (item: any, index: number) => {
    const isCompleted = progress > (index * 10); // Simple logic to determine if completed
    
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

      {/* Progress Section */}
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>Course Progress</Text>
          <Text style={styles.progressPercentage}>{progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Course Content */}
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Course Content</Text>
        {courseContent.map((item, index) => renderContentItem(item, index))}
        
        {/* Call to Action */}
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Continue Learning</Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
      </ScrollView>

      {/* Use explore variant as fallback since there is no course variant */}
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

  courseInfoCard: {
    padding: 16,
    margin: 16,
    marginTop: 8,
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
    backgroundColor: "#CDB4DB",
    borderRadius: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
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
    backgroundColor: APP_COLORS.CATEGORY_PINK,
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
  spacer: {
    height: 100,
  },
});
