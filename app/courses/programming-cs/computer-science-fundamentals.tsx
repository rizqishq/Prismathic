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

type CourseItem = {
  title: string;
  duration: string;
  icon: string;
  type: 'video' | 'reading' | 'exercise' | 'project' | 'quiz' | 'knowledge-assessment-quiz';
  description: string;
  completed: boolean;
  isQuiz?: boolean;
};

type CourseContent = {
  title: string;
  type: 'video' | 'reading' | 'exercise' | 'project' | 'quiz' | 'knowledge-assessment-quiz';
  duration: string;
  description: string;
  completed: boolean;
};

export default function ComputerScienceFundamentals() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [quizVisible, setQuizVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('course');

  const courseInfo = {
    title: "Computer Science Fundamentals",
    category: "Programming & CS",
    level: "Beginner",
    duration: "8 hours",
    students: "5,234",
    rating: 4.8,
    icon: "laptop-code",
    color: APP_COLORS.CATEGORY_PINK,
    description: "Build a strong foundation in computer science. Learn about algorithms, data structures, computational thinking, and problem-solving techniques. Master the fundamental concepts that power modern computing."
  };

  // CS fundamentals quiz questions
  const csFundamentalsQuizQuestions: Question[] = [
    {
      id: 1,
      text: "What is an algorithm?",
      options: [
        "A programming language", 
        "A step-by-step procedure for solving a problem", 
        "A type of computer hardware", 
        "A data structure"
      ],
      correctAnswer: 1, // A step-by-step procedure for solving a problem
    },
    {
      id: 2,
      text: "Which of these is NOT a common data structure?",
      options: [
        "Array", 
        "Linked List", 
        "Algorithm Tree", 
        "Hash Table"
      ],
      correctAnswer: 2, // Algorithm Tree
    },
    {
      id: 3,
      text: "What does CPU stand for?",
      options: [
        "Central Processing Unit", 
        "Computer Processing Unit", 
        "Central Program Utility", 
        "Core Processing Unit"
      ],
      correctAnswer: 0, // Central Processing Unit
    },
    {
      id: 4,
      text: "Which sorting algorithm has the worst-case time complexity of O(n log n)?",
      options: [
        "Bubble Sort", 
        "Selection Sort", 
        "Merge Sort", 
        "Insertion Sort"
      ],
      correctAnswer: 2, // Merge Sort
    },
    {
      id: 5,
      text: "What is binary?",
      options: [
        "A programming language", 
        "A numbering system using base 2", 
        "A computer processor type", 
        "A type of algorithm"
      ],
      correctAnswer: 1, // A numbering system using base 2
    },
  ];
  
  const handleQuizComplete = (score: number, total: number) => {
    // Update progress based on quiz performance
    const quizProgress = Math.round((score / total) * 15); // Add up to 15% to progress
    setProgress(Math.min(100, progress + quizProgress));
    
    // Provide feedback based on score
    const percentage = Math.round((score / total) * 100);
    if (percentage >= 80) {
      Alert.alert("Outstanding!", `You scored ${score} out of ${total}! You're mastering computer science fundamentals!`);
    } else if (percentage >= 60) {
      Alert.alert("Good work!", `You scored ${score} out of ${total}. Keep studying the core CS concepts!`);
    } else {
      Alert.alert("Keep learning!", `You scored ${score} out of ${total}. Review the CS fundamentals and try again!`);
    }
  };

  const courseContent: CourseItem[] = [
    {
      title: "Introduction to Computer Science",
      duration: "45 mins",
      icon: "book-open",
      type: "video",
      description: "Get started with the fundamentals of computer science",
      completed: false
    },
    {
      title: "Understanding Algorithms",
      duration: "1 hour",
      icon: "sitemap",
      type: "reading",
      description: "Learn about algorithms and their importance",
      completed: false
    },
    {
      title: "Data Structures Basics",
      duration: "1.5 hours",
      icon: "database",
      type: "video",
      description: "Introduction to fundamental data structures",
      completed: false
    },
    {
      title: "Computer Architecture",
      duration: "2 hours",
      icon: "microchip",
      type: "reading",
      description: "Understanding computer hardware and architecture",
      completed: false
    },
    {
      title: "Binary and Number Systems",
      duration: "1 hour",
      icon: "calculator",
      type: "exercise",
      description: "Practice with binary and different number systems",
      completed: false
    },
    {
      title: "Memory and Storage",
      duration: "1 hour",
      icon: "memory",
      type: "video",
      description: "Learn about computer memory and storage systems",
      completed: false
    },
    {
      title: "Introduction to Programming",
      duration: "1.5 hours",
      icon: "code",
      type: "project",
      description: "Write your first computer program",
      completed: false
    },
    {
      title: "Problem Solving Techniques",
      duration: "1 hour",
      icon: "puzzle-piece",
      type: "exercise",
      description: "Practice problem-solving in computer science",
      completed: false
    },
    {
      title: "Computer Science Quiz",
      duration: "15 mins",
      icon: "question-circle",
      type: "knowledge-assessment-quiz",
      description: "Test your knowledge of computer science fundamentals",
      completed: false,
      isQuiz: true
    }
  ];

  const handleContentPress = (item: CourseItem) => {
    if (item.title === "Computer Science Quiz") {
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
    "Understand core computer science concepts and principles",
    "Master computational thinking and problem-solving techniques",
    "Learn fundamental algorithms and their applications",
    "Explore essential data structures and their implementations",
    "Develop strong programming and analytical skills"
  ];

  const QuizMenuBar = () => (
    <View style={styles.quizMenuBar}>
      <TouchableOpacity
        style={[
          styles.quizMenuButton,
          { backgroundColor: courseInfo.color }
        ]}
        onPress={() => setQuizVisible(true)}
      >
        <FontAwesome5 name="question-circle" size={20} color="#fff" />
        <Text style={styles.quizMenuText}>Take Quiz</Text>
      </TouchableOpacity>
    </View>
  );

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
          <FontAwesome5 name="laptop-code" size={60} color="#000" style={styles.bannerIcon} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Programming & CS</Text>
            <Text style={styles.bannerSubtitle}>Master computer science</Text>
          </View>
        </View>

        {/* Tab Navigation */}
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
                <Text style={styles.quizTitle}>Computer Science Quiz</Text>
              </View>
              <Text style={styles.quizDescription}>
                Test your understanding of computer science concepts through this comprehensive quiz. The quiz consists of 5 questions covering basic CS principles and problem-solving.
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

        <View style={styles.spacer} />
      </ScrollView>

      {/* Quiz Modal */}
      <Quiz 
        title="Computer Science Fundamentals Assessment"
        questions={csFundamentalsQuizQuestions}
        onComplete={handleQuizComplete}
        themeColor={courseInfo.color}
        onClose={() => setQuizVisible(false)}
        visible={quizVisible}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spacer: {
    height: 40,
  },
  contentSection: {
    padding: 16,
    marginBottom: 16,
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
  },
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
    backgroundColor: APP_COLORS.CATEGORY_PINK,
  },
  courseContentSection: {
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
  quizMenuBar: {
    padding: 10,
    backgroundColor: '#fff',
    ...NEO_SHADOW,
    marginBottom: 10,
  },
  quizMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  quizMenuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 