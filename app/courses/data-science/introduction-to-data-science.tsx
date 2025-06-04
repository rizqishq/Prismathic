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

export default function IntroductionToDataScience() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [quizVisible, setQuizVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('course');

  const courseInfo = {
    title: "Introduction to Data Science",
    category: "Data Science",
    level: "Beginner",
    duration: "6 hours",
    students: "4,567",
    rating: 4.7,
    icon: "chart-bar",
    color: APP_COLORS.CATEGORY_ORANGE,
    description: "Start your journey in data science. Learn about data analysis, visualization, and basic statistical concepts. Master the tools and techniques used by data scientists to extract insights from data."
  };

  const courseContent: CourseContent[] = [
    {
      title: "What is Data Science?",
      type: "video",
      duration: "12:30",
      description: "Understanding the field of data science and its applications",
      completed: false,
    },
    {
      title: "Data Types and Structures",
      type: "video",
      duration: "15:45",
      description: "Learning about different types of data and how to work with them",
      completed: false,
    },
    {
      title: "Basic Statistics",
      type: "reading",
      duration: "20 min",
      description: "Understanding fundamental statistical concepts",
      completed: false,
    },
    {
      title: "Practice: Data Analysis",
      type: "exercise",
      duration: "25 min",
      description: "Hands-on data analysis with real datasets",
      completed: false,
    },
    {
      title: "Data Visualization",
      type: "video",
      duration: "18:20",
      description: "Creating effective visualizations to communicate insights",
      completed: false,
    },
    {
      title: "Data Cleaning",
      type: "reading",
      duration: "22 min",
      description: "Techniques for cleaning and preparing data",
      completed: false,
    },
    {
      title: "Practice: Data Visualization",
      type: "exercise",
      duration: "30 min",
      description: "Creating visualizations using popular tools",
      completed: false,
    },
    {
      title: "Quiz: Data Science Fundamentals",
      type: "quiz",
      duration: "25 min",
      description: "Test your knowledge of data science concepts",
      completed: false,
    },
    {
      title: "Final Project",
      type: "project",
      duration: "45 min",
      description: "Complete a data analysis project from start to finish",
      completed: false,
    }
  ];

  // Quiz questions for data science concepts
  const quizQuestions: Question[] = [
    {
      id: 1,
      text: "What is the primary goal of data science?",
      options: [
        "To create beautiful visualizations",
        "To extract insights and knowledge from data",
        "To store large amounts of data",
        "To write complex algorithms"
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: "Which of the following is NOT a common data type in data science?",
      options: [
        "Numerical data",
        "Categorical data",
        "Textual data",
        "Emotional data"
      ],
      correctAnswer: 3,
    },
    {
      id: 3,
      text: "What is the purpose of data cleaning?",
      options: [
        "To make data look prettier",
        "To remove all data points",
        "To handle missing values and inconsistencies",
        "To increase data size"
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      text: "Which statistical measure represents the middle value of a dataset?",
      options: [
        "Mean",
        "Median",
        "Mode",
        "Range"
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      text: "What is the main purpose of data visualization?",
      options: [
        "To make reports look professional",
        "To communicate insights effectively",
        "To store data permanently",
        "To process data faster"
      ],
      correctAnswer: 1,
    },
  ];

  const handleQuizComplete = (score: number, total: number) => {
    // Update progress based on quiz performance
    const quizProgress = Math.round((score / total) * 15);
    setProgress(Math.min(100, progress + quizProgress));
    
    // Provide feedback based on score
    const percentage = Math.round((score / total) * 100);
    if (percentage >= 80) {
      Alert.alert("Excellent!", `You scored ${score} out of ${total}! Your understanding of data science fundamentals is outstanding!`);
    } else if (percentage >= 60) {
      Alert.alert("Good job!", `You scored ${score} out of ${total}. Keep learning and practicing data science concepts!`);
    } else {
      Alert.alert("Keep learning!", `You scored ${score} out of ${total}. Review the data science concepts and try again!`);
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
    "Understand the fundamentals of data science",
    "Master basic statistical concepts and analysis",
    "Learn to clean and prepare data effectively",
    "Create meaningful data visualizations",
    "Apply data science techniques to real-world problems"
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
          <FontAwesome5 name="chart-bar" size={60} color="#000" style={styles.bannerIcon} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Data Science</Text>
            <Text style={styles.bannerSubtitle}>Master data analysis</Text>
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
            <View style={[styles.progressFill, { backgroundColor: courseInfo.color }]} />
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
        {activeTab === 'quiz' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Quiz Section</Text>
            <View style={{backgroundColor: '#fff', borderRadius: 8, borderWidth: 2, borderColor: '#000', padding: 16, marginBottom: 16}}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                <FontAwesome5 name="question-circle" size={24} color={APP_COLORS.BLACK} style={{marginRight: 8}} />
                <Text style={{fontWeight: 'bold', fontSize: 16}}>Data Science Quiz</Text>
              </View>
              <Text style={{marginBottom: 8}}>
                Test your understanding of data science through this comprehensive quiz. The quiz consists of 5 questions covering core concepts.
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                <FontAwesome5 name="clock" size={14} color="#666" style={{marginRight: 4}} />
                <Text style={{marginRight: 16}}>15 minutes</Text>
                <FontAwesome5 name="question-circle" size={14} color="#666" style={{marginRight: 4}} />
                <Text>5 questions</Text>
              </View>
              <TouchableOpacity 
                style={{backgroundColor: courseInfo.color, padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8, borderWidth: 2, borderColor: '#000'}}
                onPress={() => setQuizVisible(true)}
              >
                <Text style={{fontWeight: 'bold', color: '#000'}}>Start Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {quizVisible && (
        <Quiz
          questions={quizQuestions}
          onComplete={handleQuizComplete}
          onClose={() => setQuizVisible(false)}
        />
      )}

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