import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NeoBrutalismNavbar from "../../components/NeoBrutalismNavbar";

export default function BasicAlgebra() {
  const router = useRouter();

  const courseContent = [
    {
      title: "Introduction to Algebra",
      type: "video",
      duration: "8:15",
      description: "Learn the basic concepts of algebra and why it's important",
      completed: false,
    },
    {
      title: "Variables and Expressions",
      type: "reading",
      duration: "15 min",
      description:
        "Understanding variables, constants, and algebraic expressions",
      completed: false,
    },
    {
      title: "Solving Linear Equations",
      type: "video",
      duration: "12:30",
      description: "Step-by-step guide to solving linear equations",
      completed: false,
    },
    {
      title: "Practice: Linear Equations",
      type: "exercise",
      duration: "20 min",
      description: "Practice problems to master linear equations",
      completed: false,
    },
    {
      title: "Word Problems",
      type: "reading",
      duration: "25 min",
      description:
        "Learn how to translate word problems into algebraic equations",
      completed: false,
    },
    {
      title: "Final Assessment",
      type: "quiz",
      duration: "30 min",
      description: "Test your understanding of basic algebra concepts",
      completed: false,
    },
  ];

  const renderContentItem = (item: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.contentItem}
      onPress={() => {

      }}
    >
      <View style={styles.contentIconContainer}>
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
          color="#000"
        />
      </View>
      <View style={styles.contentInfo}>
        <Text style={styles.contentTitle}>{item.title}</Text>
        <Text style={styles.contentDescription}>{item.description}</Text>
        <Text style={styles.contentDuration}>{item.duration}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#000" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />


      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <FontAwesome5 name="superscript" size={24} color="#000" />
          <Text style={styles.courseTitle}>Basic Algebra</Text>
          <Text style={styles.categoryText}>Foundational Math</Text>
        </View>
      </View>


      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>Course Progress</Text>
          <Text style={styles.progressPercentage}>0%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "0%" }]} />
        </View>
      </View>


      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Course Content</Text>
        {courseContent.map((item, index) => renderContentItem(item, index))}
      </ScrollView>

      <NeoBrutalismNavbar variant="home" />
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
  progressContainer: {
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
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
    backgroundColor: "#AAC4FF",
    borderRadius: 4,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
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
  contentDuration: {
    fontSize: 14,
    color: "#666",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
});
