import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
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

export default function FunctionCourse() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [quizVisible, setQuizVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('course');

  const courseInfo = {
    title: "Function",
    category: "Foundational Math",
    level: "Intermediate",
    duration: "7 hours",
    students: "3,987",
    rating: 4.6,
    icon: "function",
    color: APP_COLORS.CATEGORY_BLUE,
    description: "Master the concept of functions and their applications in mathematics. Learn about different types of functions, their properties, and how to work with them in various mathematical contexts."
  };

  const courseContent: CourseContent[] = [
    {
      title: "Introduction to Functions",
      type: "video",
      duration: "11:30",
      description: "Understanding the basic concept and definition of functions",
      completed: false,
    },
    {
      title: "Types of Functions",
      type: "video",
      duration: "13:45",
      description: "Exploring linear, quadratic, and other common functions",
      completed: false,
    },
    {
      title: "Function Properties",
      type: "reading",
      duration: "16 min",
      description: "Learning about domain, range, and function behavior",
      completed: false,
    },
    {
      title: "Practice: Function Analysis",
      type: "exercise",
      duration: "22 min",
      description: "Analyzing and graphing different types of functions",
      completed: false,
    },
    {
      title: "Function Operations",
      type: "video",
      duration: "15:20",
      description: "Understanding composition and transformation of functions",
      completed: false,
    },
    {
      title: "Inverse Functions",
      type: "reading",
      duration: "19 min",
      description: "Working with inverse functions and their properties",
      completed: false,
    },
    {
      title: "Practice: Function Operations",
      type: "exercise",
      duration: "28 min",
      description: "Solving problems involving function operations",
      completed: false,
    },
    {
      title: "Quiz: Function Fundamentals",
      type: "quiz",
      duration: "25 min",
      description: "Test your understanding of function concepts and applications",
      completed: false,
    },
    {
      title: "Final Project",
      type: "project",
      duration: "45 min",
      description: "Create a mathematical model using functions",
      completed: false,
    }
  ];

  // Quiz questions for function concepts
  const quizQuestions: Question[] = [
    {
      id: 1,
      text: "Which of these is a function where each input has exactly one output?",
      options: ["y = x²", "x = y²", "x² + y² = 1", "y = ±1"],
      correctAnswer: 0, // y = x²
    },
    {
      id: 2,
      text: "What is the domain of the function f(x) = 1/(x-2)?",
      options: ["All real numbers", "All real numbers except 2", "All real numbers except 0", "All positive numbers"],
      correctAnswer: 1, // All real numbers except 2
    },
    {
      id: 3,
      text: "If f(x) = 2x + 3 and g(x) = x², what is (f∘g)(2)?",
      options: ["7", "11", "14", "19"],
      correctAnswer: 1, // 11
    },
    {
      id: 4,
      text: "Which function has a range of all real numbers?",
      options: ["f(x) = |x|", "f(x) = 1/x", "f(x) = x³", "f(x) = √x"],
      correctAnswer: 2, // f(x) = x³
    },
    {
      id: 5,
      text: "What is the inverse of the function f(x) = 3x - 6?",
      options: ["f⁻¹(x) = (x+6)/3", "f⁻¹(x) = (x-6)/3", "f⁻¹(x) = x/3 + 6", "f⁻¹(x) = x/3 - 2"],
      correctAnswer: 0, // f⁻¹(x) = (x+6)/3
    },
  ];

  const handleQuizComplete = (score: number, total: number) => {
    // Update progress based on quiz performance
    const quizProgress = Math.round((score / total) * 15);
    setProgress(Math.min(100, progress + quizProgress));
    
    // Provide feedback based on score
    const percentage = Math.round((score / total) * 100);
    if (percentage >= 80) {
      Alert.alert("Outstanding!", `You scored ${score} out of ${total}! You have a great understanding of functions!`);
    } else if (percentage >= 60) {
      Alert.alert("Good work!", `You scored ${score} out of ${total}. Keep practicing function concepts!`);
    } else {
      Alert.alert("Keep studying!", `You scored ${score} out of ${total}. Review the function materials and try again!`);
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

  const learningPoints = [
    "Understand the fundamental concept of functions",
    "Master different types of functions and their properties",
    "Learn to analyze and graph functions",
    "Apply function operations and transformations",
    "Solve real-world problems using functions"
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
          <FontAwesome5 name="function" size={60} color="#000" style={styles.bannerIcon} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Foundational Mathematics</Text>
            <Text style={styles.bannerSubtitle}>Master mathematical functions</Text>
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
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'course' && { ...styles.activeTabButton, backgroundColor: courseInfo.color }]}
            onPress={() => setActiveTab('course')}
          >
            <FontAwesome5 name="book" size={16} color={activeTab === 'course' ? APP_COLORS.BLACK : '#666'} />
            <Text style={[styles.tabText, activeTab === 'course' && styles.activeTabText]}>Course Content</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'quiz' && { ...styles.activeTabButton, backgroundColor: courseInfo.color }]}
            onPress={() => setActiveTab('quiz')}
          >
            <FontAwesome5 name="question-circle" size={16} color={activeTab === 'quiz' ? APP_COLORS.BLACK : '#666'} />
            <Text style={[styles.tabText, activeTab === 'quiz' && styles.activeTabText]}>Quiz Section</Text>
          </TouchableOpacity>
        </View>

        {/* Course Content */}
        {activeTab === 'course' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Course Content</Text>
            {courseContent.map((item, index) => renderContentItem(item, index))}
          </View>
        )}
        {activeTab === 'quiz' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Quiz Section</Text>
            <View style={styles.quizCard}>
              <View style={styles.quizHeader}>
                <FontAwesome5 name="question-circle" size={24} color={APP_COLORS.BLACK} />
                <Text style={styles.quizTitle}>Function Quiz</Text>
              </View>
              <Text style={styles.quizDescription}>
                Test your understanding of functions through this comprehensive quiz. The quiz consists of 5 questions covering function concepts and applications.
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

      {/* Quiz Component */}
      <Quiz 
        title="Function Fundamentals Quiz"
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
    backgroundColor: APP_COLORS.CATEGORY_BLUE,
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeTabButton: {
    borderColor: APP_COLORS.BLACK,
    borderWidth: 2,
    ...NEO_SHADOW,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  activeTabText: {
    color: APP_COLORS.BLACK,
    fontWeight: 'bold',
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
    marginLeft: 8,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  quizDescription: {
    fontSize: 14,
    color: "#666",
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
    color: "#666",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  startQuizButton: {
    backgroundColor: APP_COLORS.CATEGORY_BLUE,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  startQuizButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
}); 