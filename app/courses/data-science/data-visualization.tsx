import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import NeoBrutalismNavbar, { APP_COLORS } from "../../../components/NeoBrutalismNavbar";
import Quiz, { Question } from "../../../components/Quiz";

const { width } = Dimensions.get("window");

const NEO_SHADOW = {
  shadowColor: APP_COLORS.BLACK,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

type CourseContent = {
  title: string;
  type: 'video' | 'reading' | 'exercise' | 'project' | 'quiz';
  duration: string;
  description: string;
  completed: boolean;
};

export default function DataVisualization() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [quizVisible, setQuizVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'course' | 'quiz'>('course');

  const courseInfo = {
    title: "Data Visualization",
    category: "Data Science",
    level: "Intermediate",
    duration: "5 hours",
    students: "3,789",
    rating: 4.6,
    icon: "chart-line",
    color: APP_COLORS.CATEGORY_ORANGE,
    description: "Master the art of data visualization. Learn to create compelling and informative visualizations using popular tools and libraries. Understand best practices for presenting data effectively."
  };

  const courseContent: CourseContent[] = [
    {
      title: "Introduction to Data Visualization",
      type: "video",
      duration: "15:30",
      description: "Understanding the importance of data visualization",
      completed: false,
    },
    {
      title: "Types of Visualizations",
      type: "video",
      duration: "18:45",
      description: "Exploring different types of charts and graphs",
      completed: false,
    },
    {
      title: "Design Principles",
      type: "reading",
      duration: "25 min",
      description: "Learning effective visualization design principles",
      completed: false,
    },
    {
      title: "Practice: Creating Charts",
      type: "exercise",
      duration: "30 min",
      description: "Hands-on practice with basic chart creation",
      completed: false,
    },
    {
      title: "Interactive Visualizations",
      type: "video",
      duration: "20:15",
      description: "Creating engaging interactive visualizations",
      completed: false,
    },
    {
      title: "Data Storytelling",
      type: "reading",
      duration: "22 min",
      description: "Using visualizations to tell compelling data stories",
      completed: false,
    },
    {
      title: "Practice: Interactive Dashboards",
      type: "exercise",
      duration: "35 min",
      description: "Building interactive data dashboards",
      completed: false,
    },
    {
      title: "Quiz: Visualization Concepts",
      type: "quiz",
      duration: "25 min",
      description: "Test your knowledge of data visualization principles",
      completed: false,
    },
    {
      title: "Final Project",
      type: "project",
      duration: "45 min",
      description: "Create a comprehensive data visualization project",
      completed: false,
    }
  ];

  // Quiz questions for data visualization concepts
  const quizQuestions: Question[] = [
    {
      id: 1,
      text: "Which type of chart is best for showing trends over time?",
      options: [
        "Pie chart",
        "Bar chart",
        "Line chart",
        "Scatter plot"
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      text: "What is the primary purpose of data visualization?",
      options: [
        "To make data look pretty",
        "To communicate insights clearly and effectively",
        "To store data permanently",
        "To process data faster"
      ],
      correctAnswer: 1,
    },
    {
      id: 3,
      text: "Which of these is NOT a good practice in data visualization?",
      options: [
        "Using appropriate color schemes",
        "Including clear labels and titles",
        "Using 3D effects for all charts",
        "Maintaining consistent scales"
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: "What type of visualization is best for showing proportions?",
      options: [
        "Line chart",
        "Bar chart",
        "Pie chart",
        "Scatter plot"
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: "Which principle helps users understand the relationship between variables?",
      options: [
        "Color contrast",
        "Data-ink ratio",
        "Gestalt principles",
        "All of the above"
      ],
      correctAnswer: 3,
    },
  ];

  const handleQuizComplete = (score: number, total: number) => {
    // Update progress based on quiz performance
    const quizProgress = Math.round((score / total) * 15);
    setProgress(Math.min(100, progress + quizProgress));
    
    // Provide feedback based on score
    const percentage = Math.round((score / total) * 100);
    if (percentage >= 80) {
      Alert.alert("Excellent!", `You scored ${score} out of ${total}! Your understanding of data visualization is outstanding!`);
    } else if (percentage >= 60) {
      Alert.alert("Good job!", `You scored ${score} out of ${total}. Keep learning and practicing visualization concepts!`);
    } else {
      Alert.alert("Keep learning!", `You scored ${score} out of ${total}. Review the visualization concepts and try again!`);
    }
  };

  const handleContentPress = (item: CourseContent) => {
    if (item.type === "quiz") {
      setQuizVisible(true);
    } else {
      console.log(`Opening lesson: ${item.title} (under development)`);
    }
  };

  const renderContentItem = (item: CourseContent, index: number) => {
    const isCompleted = progress > (index * 12);
    
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
                : item.type === "quiz"
                ? "question-circle"
                : "project-diagram"
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

  const learningPoints = [
    "Master the principles of effective data visualization",
    "Create various types of charts and visualizations",
    "Apply color theory and design principles",
    "Build interactive and dynamic visualizations",
    "Tell compelling stories with data"
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
        {/* Course Banner */}
        <View style={[styles.bannerContainer, {backgroundColor: courseInfo.color}]}> 
          <FontAwesome5 name="chart-line" size={60} color="#000" style={styles.bannerIcon} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Data Science</Text>
            <Text style={styles.bannerSubtitle}>Master data visualization</Text>
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
            <View style={[styles.progressFill, { backgroundColor: courseInfo.color, width: `${progress}%` }]} />
          </View>
        </View>
        {/* Bottom Tab Navigation (copied from thinking-in-code.tsx) */}
        <View style={styles.bottomTabContainer}>
          <TouchableOpacity
            style={[styles.bottomTabButton, activeTab === 'course' && { backgroundColor: courseInfo.color, borderColor: APP_COLORS.BLACK }]}
            onPress={() => setActiveTab('course')}
          >
            <FontAwesome5 name="book" size={18} color={activeTab === 'course' ? APP_COLORS.BLACK : '#666'} />
            <Text style={[styles.bottomTabText, activeTab === 'course' && styles.bottomActiveTabText]}>Course Content</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomTabButton, activeTab === 'quiz' && { backgroundColor: courseInfo.color, borderColor: APP_COLORS.BLACK }]}
            onPress={() => setActiveTab('quiz')}
          >
            <FontAwesome5 name="question-circle" size={18} color={activeTab === 'quiz' ? APP_COLORS.BLACK : '#666'} />
            <Text style={[styles.bottomTabText, activeTab === 'quiz' && styles.bottomActiveTabText]}>Quiz Section</Text>
          </TouchableOpacity>
        </View>
        {/* Course Content */}
        {activeTab === 'course' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Course Content</Text>
            {courseContent.map((item, index) => renderContentItem(item, index))}
          </View>
        )}
        {/* Quiz Section */}
        {activeTab === 'quiz' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Quiz Section</Text>
            <View style={styles.quizCard}>
              <View style={styles.quizHeader}>
                <FontAwesome5 name="question-circle" size={24} color={APP_COLORS.BLACK} />
                <Text style={styles.quizTitle}>Data Visualization Quiz</Text>
              </View>
              <Text style={styles.quizDescription}>
                Test your understanding of data visualization through this comprehensive quiz. The quiz consists of 5 questions covering chart types, design principles, and best practices.
              </Text>
              <View style={styles.quizStats}>
                <View style={styles.quizStatItem}>
                  <FontAwesome5 name="clock" size={14} color="#666" />
                  <Text style={styles.quizStatText}>15 minutes</Text>
                </View>
                <View style={styles.quizStatItem}>
                  <FontAwesome5 name="question-circle" size={14} color="#666" />
                  <Text style={styles.quizStatText}>5 questions</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.startQuizButton}
                onPress={() => setQuizVisible(true)}
              >
                <Text style={styles.startQuizButtonText}>Start Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quiz Modal */}
      <Quiz
        title="Data Visualization Quiz"
        questions={quizQuestions}
        onComplete={handleQuizComplete}
        themeColor={courseInfo.color}
        onClose={() => setQuizVisible(false)}
        visible={quizVisible}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  bannerIcon: {
    marginRight: 20,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: "#444",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  courseInfoCard: {
    padding: 20,
    margin: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  courseDescription: {
    fontSize: 16,
    lineHeight: 24,
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
    marginBottom: 8,
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  learnSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  learnPoints: {
    marginTop: 8,
  },
  learnPoint: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkIcon: {
    marginRight: 12,
  },
  learnPointText: {
    fontSize: 14,
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  progressContainer: {
    padding: 16,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: APP_COLORS.CATEGORY_ORANGE,
  },
  contentSection: {
    padding: 16,
    paddingBottom: 100,
  },
  contentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  completedItem: {
    backgroundColor: "#f8f8f8",
  },
  contentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  contentDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  contentMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentDuration: {
    fontSize: 12,
    color: "#666",
    marginRight: 12,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  completedText: {
    fontSize: 12,
    color: "green",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  quizCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  quizHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  quizDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  quizStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  quizStatItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  quizStatText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  startQuizButton: {
    backgroundColor: APP_COLORS.CATEGORY_ORANGE,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  startQuizButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderColor: '#000',
    borderRadius: 16,
    margin: 16,
    marginBottom: 24,
    ...NEO_SHADOW,
  },
  bottomTabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  bottomTabText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontWeight: 'bold',
  },
  bottomActiveTabText: {
    color: APP_COLORS.BLACK,
  },
}); 