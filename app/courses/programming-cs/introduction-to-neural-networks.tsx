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

type CourseContent = {
  title: string;
  type: 'video' | 'reading' | 'exercise' | 'project';
  duration: string;
  description: string;
  completed: boolean;
};

type TabType = 'course' | 'quiz';

export default function IntroductionToNeuralNetworks() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [quizVisible, setQuizVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('course');

  const courseInfo = {
    title: "Introduction to Neural Networks",
    category: "Programming & CS",
    level: "Intermediate",
    duration: "5 hours",
    students: "2,845",
    rating: 4.6,
    icon: "network-wired",
    color: APP_COLORS.CATEGORY_PINK,
    description: "Dive deep into the world of neural networks. Learn about their architecture, how they work, and how to implement them. Understand the mathematics behind neural networks and their applications in modern AI."
  };

  // Neural Networks quiz questions
  const neuralNetworksQuizQuestions: Question[] = [
    {
      id: 1,
      text: "What is an artificial neural network inspired by?",
      options: [
        "Computer circuits", 
        "Biological neural networks in the human brain", 
        "Electronic relay systems", 
        "Quantum computing"
      ],
      correctAnswer: 1, // Biological neural networks
    },
    {
      id: 2,
      text: "Which of the following is NOT a common activation function in neural networks?",
      options: [
        "ReLU (Rectified Linear Unit)", 
        "Sigmoid", 
        "Tangent", 
        "Tanh (Hyperbolic Tangent)"
      ],
      correctAnswer: 2, // Tangent (it's usually Tanh, not just Tangent)
    },
    {
      id: 3,
      text: "What is the process called when a neural network adjusts weights based on error?",
      options: [
        "Forward propagation", 
        "Backpropagation", 
        "Weight normalization", 
        "Gradient ascent"
      ],
      correctAnswer: 1, // Backpropagation
    },
    {
      id: 4,
      text: "In a neural network, what does a node in the hidden layer do?",
      options: [
        "Simply pass input data to the output layer", 
        "Store the final result of computation", 
        "Process inputs with weights and activation functions", 
        "Only store binary values (0 or 1)"
      ],
      correctAnswer: 2, // Process inputs with weights and activation functions
    },
    {
      id: 5,
      text: "What problem might occur if your neural network has too many layers and neurons?",
      options: [
        "Overfitting", 
        "Underfitting", 
        "Gradient explosion", 
        "All of the above"
      ],
      correctAnswer: 0, // Overfitting
    },
  ];
  
  const handleQuizComplete = (score: number, total: number) => {
    // Update progress based on quiz performance
    const quizProgress = Math.round((score / total) * 15); // Add up to 15% to progress
    setProgress(Math.min(100, progress + quizProgress));
    
    // Provide feedback based on score
    const percentage = Math.round((score / total) * 100);
    if (percentage >= 80) {
      Alert.alert("Excellent!", `You scored ${score} out of ${total}! You're grasping neural network concepts very well!`);
    } else if (percentage >= 60) {
      Alert.alert("Good progress!", `You scored ${score} out of ${total}. Keep studying neural networks fundamentals!`);
    } else {
      Alert.alert("Keep learning!", `You scored ${score} out of ${total}. Neural networks can be complex, so review the material and try again!`);
    }
  };

  const courseContent: CourseContent[] = [
    {
      title: "Neural Network Basics",
      type: "video",
      duration: "14:30",
      description: "Understanding the fundamental concepts of neural networks",
      completed: false,
    },
    {
      title: "Neuron Structure",
      type: "video",
      duration: "12:45",
      description: "Exploring the building blocks of neural networks",
      completed: false,
    },
    {
      title: "Activation Functions",
      type: "reading",
      duration: "18 min",
      description: "Understanding different activation functions and their uses",
      completed: false,
    },
    {
      title: "Practice: Building a Simple Neuron",
      type: "exercise",
      duration: "25 min",
      description: "Implementing a basic neuron from scratch",
      completed: false,
    },
    {
      title: "Network Architecture",
      type: "video",
      duration: "15:20",
      description: "Designing neural network architectures",
      completed: false,
    },
    {
      title: "Backpropagation",
      type: "reading",
      duration: "20 min",
      description: "Understanding how neural networks learn",
      completed: false,
    },
    {
      title: "Practice: Training a Network",
      type: "exercise",
      duration: "30 min",
      description: "Implementing backpropagation and training",
      completed: false,
    },
    {
      title: "Final Project",
      type: "project",
      duration: "45 min",
      description: "Build and train a neural network for pattern recognition",
      completed: false,
    },
    {
      title: "Neural Networks Quiz",
      type: "exercise",
      duration: "10 min",
      description: "Test your understanding of neural network concepts",
      completed: false,
    }
  ];

  const handleContentPress = (item: CourseContent) => {
    if (item.title === "Neural Networks Quiz") {
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
    "Understand the fundamental concepts of neural networks",
    "Learn about different types of neurons and activation functions",
    "Master the mathematics behind neural networks",
    "Implement and train basic neural networks",
    "Apply neural networks to solve real-world problems"
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
          <FontAwesome5 name="network-wired" size={60} color="#000" style={styles.bannerIcon} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Programming & CS</Text>
            <Text style={styles.bannerSubtitle}>Master neural networks</Text>
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
            {courseContent.filter(item => item.title !== 'Neural Networks Quiz').map((item, index) => renderContentItem(item, index))}
          </View>
        )}

        {/* Quiz Section */}
        {activeTab === 'quiz' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Quiz Section</Text>
            <View style={styles.quizCard}>
              <View style={styles.quizHeader}>
                <FontAwesome5 name="question-circle" size={24} color={APP_COLORS.BLACK} />
                <Text style={styles.quizTitle}>Neural Networks Quiz</Text>
              </View>
              <Text style={styles.quizDescription}>
                Test your understanding of neural networks through this comprehensive quiz. The quiz consists of 5 questions covering neural network architecture, activation functions, backpropagation, and more.
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
        title="Neural Networks Assessment"
        questions={neuralNetworksQuizQuestions}
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
    ...NEO_SHADOW,
  },
  activeTabButton: {
    backgroundColor: APP_COLORS.CATEGORY_PINK,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: APP_COLORS.BLACK,
  },
  quizCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
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
  },
  quizDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  quizStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  quizStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quizStatText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  startQuizButton: {
    backgroundColor: APP_COLORS.CATEGORY_PINK,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
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