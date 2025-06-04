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
    View
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

type TabType = 'course' | 'quiz';

export default function PythonProgramming() {
  const router = useRouter();
  const [progress, setProgress] = useState(15);
  const [quizVisible, setQuizVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('course');

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

  // Python programming quiz questions
  const pythonProgrammingQuizQuestions: Question[] = [
    {
      id: 1,
      text: "Which of the following is NOT a valid Python data type?",
      options: ["int", "float", "char", "bool"],
      correctAnswer: 2, // char (Python uses 'str' instead)
    },
    {
      id: 2,
      text: "What is the output of: print(len('Python Programming'))?'",
      options: ["17", "18", "19", "20"],
      correctAnswer: 1, // 18 (including the space)
    },
    {
      id: 3,
      text: "Which of the following is used to define a function in Python?",
      options: ["function", "def", "fun", "define"],
      correctAnswer: 1, // def
    },
    {
      id: 4,
      text: "How do you create a list in Python?",
      options: ["[1, 2, 3]", "(1, 2, 3)", "{1, 2, 3}", "<1, 2, 3>"],
      correctAnswer: 0, // [1, 2, 3]
    },
    {
      id: 5,
      text: "Which method is used to add an element at the end of a list?",
      options: ["append()", "add()", "push()", "insert()"],
      correctAnswer: 0, // append()
    },
  ];
  
  const handleQuizComplete = (score: number, total: number) => {
    // Update progress based on quiz performance
    const quizProgress = Math.round((score / total) * 15);
    setProgress(Math.min(100, progress + quizProgress));
    
    // Provide feedback based on score
    const percentage = Math.round((score / total) * 100);
    if (percentage >= 80) {
      Alert.alert("Excellent work!", `You scored ${score} out of ${total}! You're becoming a Python master!`);
    } else if (percentage >= 60) {
      Alert.alert("Good job!", `You scored ${score} out of ${total}. Keep practicing your Python skills!`);
    } else {
      Alert.alert("Keep learning!", `You scored ${score} out of ${total}. Review the Python concepts and try again!`);
    }
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

  const learningPoints = [
    "Master Python syntax and basic concepts",
    "Learn to work with data structures and control flow",
    "Understand functions and modules",
    "Practice with real-world programming exercises",
    "Build your first Python applications"
  ];

  const handleContentPress = (item: any) => {
    if (item.title === "Course Assessment") {
      // Show the quiz when the assessment item is clicked
      setQuizVisible(true);
    } else if (item.title === "Python Basics") {
      console.log(`Opening lesson: ${item.title}`);
      
      if (courseContent.indexOf(item) === 2) {
        router.back();
        setTimeout(() => {
          router.push({ pathname: "/explore" });
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

      <ScrollView style={styles.scrollView}>
        {/* Course Banner */}
        <View style={[styles.bannerContainer, {backgroundColor: courseInfo.color}]}>
          <FontAwesome5 name="python" size={60} color="#000" style={styles.bannerIcon} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Programming & CS</Text>
            <Text style={styles.bannerSubtitle}>Master Python programming</Text>
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

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'course' && styles.activeTabButton]}
            onPress={() => setActiveTab('course')}
          >
            <FontAwesome5 name="book" size={16} color={activeTab === 'course' ? APP_COLORS.BLACK : '#666'} />
            <Text style={[styles.tabText, activeTab === 'course' && styles.activeTabText]}>Course Content</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'quiz' && styles.activeTabButton]}
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
            {courseContent.filter(item => item.title !== 'Course Assessment').map((item, index) => renderContentItem(item, index))}
          </View>
        )}

        {/* Quiz Section */}
        {activeTab === 'quiz' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Quiz Section</Text>
            <View style={styles.quizCard}>
              <View style={styles.quizHeader}>
                <FontAwesome5 name="question-circle" size={24} color={APP_COLORS.BLACK} />
                <Text style={styles.quizTitle}>Python Programming Quiz</Text>
              </View>
              <Text style={styles.quizDescription}>
                Test your understanding of Python programming through this comprehensive quiz. The quiz consists of 5 questions covering Python basics, data types, functions, and more.
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
        title="Python Programming Quiz"
        questions={pythonProgrammingQuizQuestions}
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
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  bannerIcon: {
    marginBottom: 16,
  },
  bannerContent: {
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  bannerSubtitle: {
    fontSize: 16,
    color: "#666",
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
    flexDirection: "row",
    flexWrap: "wrap",
  },
  learnPoint: {
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
  checkIcon: {
    marginRight: 8,
  },
  learnPointText: {
    fontSize: 14,
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
    backgroundColor: APP_COLORS.CATEGORY_PINK,
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
  contentSection: {
    padding: 16,
  },
  quizCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  quizDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  quizStats: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  quizStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  quizStatText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  startQuizButton: {
    backgroundColor: APP_COLORS.CATEGORY_PINK,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  startQuizButtonText: {
    color: APP_COLORS.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
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
  quizMenuBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    ...NEO_SHADOW,
    marginBottom: 10,
  },
  quizMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    ...NEO_SHADOW,
  },
  quizMenuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  quizMenuIcon: {
    marginRight: 8,
  },
});
