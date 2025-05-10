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

export default function ProgrammingWithFunctions() {
  const router = useRouter();
  const [progress, setProgress] = useState(10);


  const courseInfo = {
    title: "Programming with Functions",
    category: "Programming & CS",
    level: "Intermediate",
    duration: "7 hours",
    students: "4,127",
    rating: 4.9,
    icon: "laptop-code",
    color: APP_COLORS.CATEGORY_PINK,
    description: "Learn how to design, write, and use functions to create modular and reusable code. Master the principles of functional programming and apply them to solve complex programming challenges efficiently."
  };

  const courseContent = [
    {
      title: "Introduction to Functions",
      type: "video",
      duration: "10:15",
      description: "Learn what functions are and why they're essential in programming",
      completed: true,
    },
    {
      title: "Function Syntax and Structure",
      type: "reading",
      duration: "15 min",
      description: "Understanding how to define and call functions in different languages",
      completed: false,
    },
    {
      title: "Parameters and Arguments",
      type: "video",
      duration: "13:45",
      description: "Passing data to functions and handling parameters effectively",
      completed: false,
    },
    {
      title: "Return Values and Outputs",
      type: "video",
      duration: "12:30",
      description: "Working with function return values and multiple outputs",
      completed: false,
    },
    {
      title: "Practice: Basic Functions",
      type: "exercise",
      duration: "25 min",
      description: "Hands-on exercises to practice creating and using functions",
      completed: false,
    },
    {
      title: "Scope and Variable Visibility",
      type: "reading",
      duration: "20 min",
      description: "Understanding variable scope, global and local variables",
      completed: false,
    },
    {
      title: "Anonymous Functions and Lambdas",
      type: "video",
      duration: "15:10",
      description: "Using anonymous functions and lambda expressions",
      completed: false,
    },
    {
      title: "Higher-Order Functions",
      type: "video",
      duration: "18:25",
      description: "Functions that take or return other functions",
      completed: false,
    },
    {
      title: "Recursive Functions",
      type: "reading",
      duration: "25 min",
      description: "Functions that call themselves and solving recursive problems",
      completed: false,
    },
    {
      title: "Final Project: Function Library",
      type: "project",
      duration: "45 min",
      description: "Build a library of useful functions to solve common programming problems",
      completed: false,
    },
  ];

  const handleContentPress = (item: any) => {

    console.log(`Opening lesson: ${item.title}`);

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

  // Key learning outcomes
  const learningOutcomes = [
    "Write clean, reusable, and efficient functions",
    "Understand scope and variable visibility rules",
    "Apply functional programming concepts",
    "Master advanced function techniques like recursion",
    "Create modular code that's easy to test and maintain"
  ];

  // Example languages and their function syntax
  const languageExamples = [
    {
      name: "Python",
      example: `def greet(name):
    return f"Hello, {name}!"
    
print(greet("World"))`
    },
    {
      name: "JavaScript",
      example: `function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));`
    },
    {
      name: "Java",
      example: `public String greet(String name) {
    return "Hello, " + name + "!";
}

System.out.println(greet("World"));`
    }
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
        {/* Course Banner with Icon */}
        <View style={[styles.bannerContainer, {backgroundColor: courseInfo.color}]}>
          <FontAwesome5 name="laptop-code" size={60} color="#000" style={styles.bannerIcon} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Programming Fundamentals</Text>
            <Text style={styles.bannerSubtitle}>Learn to write modular, efficient code</Text>
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
            {learningOutcomes.map((point, index) => (
              <View key={index} style={styles.learnPoint}>
                <FontAwesome5 name="check-circle" size={16} color={courseInfo.color} style={styles.checkIcon} />
                <Text style={styles.learnPointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Language Examples */}
        <View style={{margin: 16, marginTop: 0, marginBottom: 16}}>
          <Text style={styles.sectionTitle}>Function Examples</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 12}}>
            {languageExamples.map((lang, index) => (
              <View key={index} style={styles.exampleCard}>
                <Text style={styles.exampleLanguage}>{lang.name}</Text>
                <View style={styles.codeBlock}>
                  <Text style={styles.codeText}>{lang.example}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
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
            onPress={() => handleContentPress(courseContent[1])} // Navigate to next incomplete lesson
          >
            <Text style={styles.ctaButtonText}>Continue Learning</Text>
          </TouchableOpacity>
        </View>

        {/* Prerequisites */}
        <View style={styles.prerequisitesSection}>
          <Text style={styles.sectionTitle}>Prerequisites</Text>
          <View style={styles.prerequisiteCard}>
            <FontAwesome5 name="info-circle" size={20} color={courseInfo.color} style={styles.prerequisiteIcon} />
            <View style={styles.prerequisiteContent}>
              <Text style={styles.prerequisiteTitle}>Before starting this course</Text>
              <Text style={styles.prerequisiteText}>Basic programming knowledge is required. We recommend completing "Programming with Python" or having equivalent experience with any programming language.</Text>
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
  exampleCard: {
    width: width * 0.8,
    marginRight: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  exampleLanguage: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  codeBlock: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 6,
  },
  codeText: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 12,
    color: "#fff",
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

  prerequisitesSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  prerequisiteCard: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  prerequisiteIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  prerequisiteContent: {
    flex: 1,
  },
  prerequisiteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  prerequisiteText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  spacer: {
    height: 100,
  },
});
