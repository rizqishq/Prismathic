import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
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
import NeoBrutalismNavbar, { APP_COLORS } from "../../../components/NeoBrutalismNavbar";

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

export default function Physics() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('course');
  const [quizVisible, setQuizVisible] = useState(false);

  const courseInfo = {
    title: "Physics",
    category: "Science",
    level: "Beginner",
    duration: "7 hours",
    students: "4,012",
    rating: 4.8,
    icon: "atom",
    color: APP_COLORS.CATEGORY_BLUE,
    description: "Explore the fundamental laws of nature. Learn about motion, forces, energy, and the building blocks of the universe through engaging lessons and hands-on activities."
  };

  const courseContent: CourseContent[] = [
    {
      title: "Introduction to Physics",
      type: "video",
      duration: "12:00",
      description: "Overview of physics and its importance in understanding the universe",
      completed: false,
    },
    {
      title: "Motion and Forces",
      type: "video",
      duration: "15:30",
      description: "Learn about Newton's Laws and the basics of motion",
      completed: false,
    },
    {
      title: "Energy and Work",
      type: "reading",
      duration: "18 min",
      description: "Understanding different forms of energy and how work is done",
      completed: false,
    },
    {
      title: "Practice: Calculating Force",
      type: "exercise",
      duration: "20 min",
      description: "Apply Newton's Second Law to solve real problems",
      completed: false,
    },
    {
      title: "Waves and Sound",
      type: "video",
      duration: "14:00",
      description: "Explore the properties of waves and how sound travels",
      completed: false,
    },
    {
      title: "Light and Optics",
      type: "reading",
      duration: "16 min",
      description: "Learn about the behavior of light and basic optics",
      completed: false,
    },
    {
      title: "Practice: Energy Transformations",
      type: "exercise",
      duration: "25 min",
      description: "Hands-on activity to explore energy conversions",
      completed: false,
    },
    {
      title: "Final Project",
      type: "project",
      duration: "45 min",
      description: "Design and present a simple physics experiment",
      completed: false,
    }
  ];

  const handleContentPress = (item: CourseContent) => {
    console.log(`Opening lesson: ${item.title} (under development)`);
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
    "Understand the basic laws of physics and their applications",
    "Analyze motion, forces, and energy in everyday life",
    "Explore the nature of waves, sound, and light",
    "Develop problem-solving skills through hands-on activities",
    "Design and conduct simple physics experiments"
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
          <FontAwesome5 name="atom" size={60} color="#000" style={styles.bannerIcon} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Science</Text>
            <Text style={styles.bannerSubtitle}>Explore the laws of nature</Text>
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

        {/* Quiz Section */}
        {activeTab === 'quiz' && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Quiz Section</Text>
            <View style={styles.quizCard}>
              <View style={styles.quizHeader}>
                <FontAwesome5 name="question-circle" size={24} color={APP_COLORS.BLACK} />
                <Text style={styles.quizTitle}>Physics Quiz</Text>
              </View>
              <Text style={styles.quizDescription}>
                Test your understanding of physics concepts through this comprehensive quiz. The quiz consists of 5 questions covering basic physics principles and problem-solving.
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
}); 