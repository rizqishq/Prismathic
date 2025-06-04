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
import { APP_COLORS } from "../../../components/NeoBrutalismNavbar";
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
  type: 'video' | 'reading' | 'exercise' | 'project';
  duration: string;
  description: string;
  completed: boolean;
};

type TabType = 'course' | 'quiz';

export default function ThinkingInCode() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [quizVisible, setQuizVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('course');

  const courseInfo = {
    title: "Thinking in Code",
    category: "Programming & CS",
    level: "Beginner",
    duration: "5 hours",
    students: "3,245",
    rating: 4.7,
    icon: "brain",
    color: APP_COLORS.CATEGORY_PINK,
    description: "Learn the fundamental mindset and thought processes behind programming. Develop computational thinking skills and understand how to break down problems into solvable steps."
  };

  // Thinking in Code quiz questions
  const thinkingInCodeQuestions: Question[] = [
    {
      id: 1,
      text: "What is computational thinking?",
      options: [
        "Using a computer to think for you", 
        "A problem-solving approach that involves breaking down complex problems", 
        "Writing code without planning", 
        "Memorizing programming syntax"
      ],
      correctAnswer: 1, // A problem-solving approach
    },
    {
      id: 2,
      text: "Which of the following is NOT a key component of computational thinking?",
      options: [
        "Decomposition", 
        "Pattern recognition", 
        "Memory management", 
        "Abstraction"
      ],
      correctAnswer: 2, // Memory management
    },
    {
      id: 3,
      text: "What is decomposition in computational thinking?",
      options: [
        "Breaking down a complex problem into smaller, more manageable parts", 
        "Removing unnecessary code from a program", 
        "The process of converting code into machine language", 
        "Creating documentation for your code"
      ],
      correctAnswer: 0, // Breaking down a complex problem
    },
    {
      id: 4,
      text: "What is an algorithm in programming?",
      options: [
        "A complex mathematical formula", 
        "A step-by-step procedure for solving a problem", 
        "A type of programming language", 
        "A way to organize data in memory"
      ],
      correctAnswer: 1, // A step-by-step procedure
    },
    {
      id: 5,
      text: "Which of these best describes abstraction in computational thinking?",
      options: [
        "Making code run faster", 
        "Creating detailed documentation", 
        "Focusing on essential details while ignoring irrelevant ones", 
        "Writing complex code that's hard to understand"
      ],
      correctAnswer: 2, // Focusing on essential details
    },
  ];
  
  const handleQuizComplete = (score: number, total: number) => {
    // Update progress based on quiz performance
    const quizProgress = Math.round((score / total) * 15); // Add up to 15% to progress
    setProgress(Math.min(100, progress + quizProgress));
    
    // Provide feedback based on score
    const percentage = Math.round((score / total) * 100);
    if (percentage >= 80) {
      Alert.alert("Excellent!", `You scored ${score} out of ${total}! You're thinking like a programmer already!`);
    } else if (percentage >= 60) {
      Alert.alert("Good job!", `You scored ${score} out of ${total}. Keep developing your computational thinking skills!`);
    } else {
      Alert.alert("Keep practicing!", `You scored ${score} out of ${total}. Computational thinking takes time to develop - review the concepts and try again!`);
    }
  };

  const courseContent: CourseContent[] = [
    {
      title: "Introduction to Computational Thinking",
      type: "video",
      duration: "12:30",
      description: "Understanding the core concepts of computational thinking",
      completed: false,
    },
    {
      title: "Problem Decomposition",
      type: "video",
      duration: "15:45",
      description: "Breaking down complex problems into smaller, manageable parts",
      completed: false,
    },
    {
      title: "Pattern Recognition",
      type: "reading",
      duration: "18 min",
      description: "Identifying patterns and similarities in problems",
      completed: false,
    },
    {
      title: "Practice: Pattern Recognition",
      type: "exercise",
      duration: "25 min",
      description: "Exercises to develop pattern recognition skills",
      completed: false,
    },
    {
      title: "Abstraction",
      type: "video",
      duration: "14:20",
      description: "Understanding abstraction in problem-solving",
      completed: false,
    },
    {
      title: "Algorithmic Thinking",
      type: "reading",
      duration: "20 min",
      description: "Developing step-by-step solution approaches",
      completed: false,
    },
    {
      title: "Practice: Algorithm Design",
      type: "exercise",
      duration: "30 min",
      description: "Creating algorithms for common problems",
      completed: false,
    },
    {
      title: "Final Project",
      type: "project",
      duration: "45 min",
      description: "Apply computational thinking to solve a real-world problem",
      completed: false,
    },
    {
      title: "Computational Thinking Quiz",
      type: "exercise",
      duration: "15 min",
      description: "Test your understanding of computational thinking concepts",
      completed: false,
    }
  ];

  const handleContentPress = (item: CourseContent) => {
    if (item.title === "Computational Thinking Quiz") {
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
    "Develop computational thinking skills",
    "Master problem decomposition techniques",
    "Learn pattern recognition in programming",
    "Understand abstraction and its importance",
    "Create effective algorithms for problem-solving"
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
          <FontAwesome5 name="brain" size={60} color="#000" style={styles.bannerIcon} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Programming & CS</Text>
            <Text style={styles.bannerSubtitle}>Master computational thinking</Text>
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
            {courseContent.filter(item => item.title !== 'Computational Thinking Quiz').map((item, index) => renderContentItem(item, index))}
          </View>
        )}

        {/* Quiz Section */}
        {activeTab === 'quiz' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Quiz Section</Text>
            <View style={styles.quizCard}>
              <View style={styles.quizHeader}>
                <FontAwesome5 name="question-circle" size={24} color={APP_COLORS.BLACK} />
                <Text style={styles.quizTitle}>Computational Thinking Assessment</Text>
              </View>
              <Text style={styles.quizDescription}>
                Test your understanding of computational thinking concepts through this comprehensive quiz. The quiz consists of 5 questions covering key topics from the course.
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
        title="Computational Thinking Assessment"
        questions={thinkingInCodeQuestions}
        onComplete={handleQuizComplete}
        themeColor={courseInfo.color}
        onClose={() => setQuizVisible(false)}
        visible={quizVisible}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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