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
  isQuiz?: boolean;
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
    duration: "10 hours",
    students: "5,234",
    rating: 4.8,
    icon: "microchip",
    color: APP_COLORS.CATEGORY_BLUE,
    description: "Master the core concepts of computer science including algorithms, data structures, computer architecture, and computational thinking. Build a strong foundation for your programming journey."
  };

  const quizQuestions: Question[] = [
    {
      id: 1,
      text: "What is an algorithm?",
      options: [
        "A programming language",
        "A step-by-step procedure to solve a problem",
        "A type of computer",
        "A mathematical equation"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "Which of these is NOT a basic data structure?",
      options: [
        "Array",
        "LinkedList",
        "Database",
        "Stack"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      text: "What is the primary function of RAM in a computer?",
      options: [
        "Long-term storage",
        "Processing data",
        "Temporary data storage during execution",
        "Cooling the CPU"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      text: "What is binary code?",
      options: [
        "A programming language",
        "A number system using only 0s and 1s",
        "A type of computer virus",
        "A networking protocol"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      text: "What is the time complexity of a linear search algorithm?",
      options: [
        "O(1)",
        "O(n)",
        "O(n²)",
        "O(log n)"
      ],
      correctAnswer: 1
    }
  ];

  const handleQuizComplete = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    setProgress(Math.max(progress, percentage));
    Alert.alert(
      "Quiz Complete!",
      `You scored ${score} out of ${total} questions correctly!`,
      [{ text: "OK", onPress: () => setQuizVisible(false) }]
    );
  };

  const courseContent: CourseItem[] = [
    {
      title: "Introduction to Computer Science",
      duration: "45 mins",
      icon: "book-open"
    },
    {
      title: "Understanding Algorithms",
      duration: "1 hour",
      icon: "sitemap"
    },
    {
      title: "Data Structures Basics",
      duration: "1.5 hours",
      icon: "database"
    },
    {
      title: "Computer Architecture",
      duration: "2 hours",
      icon: "microchip"
    },
    {
      title: "Binary and Number Systems",
      duration: "1 hour",
      icon: "calculator"
    },
    {
      title: "Memory and Storage",
      duration: "1 hour",
      icon: "memory"
    },
    {
      title: "Introduction to Programming",
      duration: "1.5 hours",
      icon: "code"
    },
    {
      title: "Problem Solving Techniques",
      duration: "1 hour",
      icon: "puzzle-piece"
    },
    {
      title: "Computer Science Quiz",
      duration: "15 mins",
      icon: "question-circle",
      isQuiz: true
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Course Header */}
      <View style={[styles.header, { backgroundColor: courseInfo.color }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backButton, NEO_SHADOW]}
        >
          <Ionicons name="arrow-back" size={24} color={APP_COLORS.BLACK} />
        </TouchableOpacity>

        <View style={[styles.titleContainer, NEO_SHADOW]}>
          <FontAwesome5 name={courseInfo.icon} size={24} color={APP_COLORS.BLACK} />
          <Text style={styles.title}>{courseInfo.title}</Text>
        </View>

        <View style={[styles.progressContainer, NEO_SHADOW]}>
          <Text style={styles.progressText}>{progress}%</Text>
          <Text style={styles.progressLabel}>Progress</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'course' && styles.activeTab]}
          onPress={() => setActiveTab('course')}
        >
          <Text style={styles.tabText}>Course Content</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'quiz' && styles.activeTab]}
          onPress={() => setActiveTab('quiz')}
        >
          <Text style={styles.tabText}>Quiz</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Course Info Card */}
        <View style={[styles.infoCard, NEO_SHADOW]}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialIcons name="speed" size={20} color={APP_COLORS.BLACK} />
              <Text style={styles.infoText}>{courseInfo.level}</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialIcons name="timer" size={20} color={APP_COLORS.BLACK} />
              <Text style={styles.infoText}>{courseInfo.duration}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <MaterialIcons name="people" size={20} color={APP_COLORS.BLACK} />
              <Text style={styles.infoText}>{courseInfo.students} students</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialIcons name="star" size={20} color={APP_COLORS.BLACK} />
              <Text style={styles.infoText}>{courseInfo.rating} rating</Text>
            </View>
          </View>
          <Text style={styles.description}>{courseInfo.description}</Text>
        </View>

        {/* Course Content List */}
        {courseContent.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.contentItem, NEO_SHADOW]}
            onPress={() => item.isQuiz ? setQuizVisible(true) : null}
          >
            <FontAwesome5 name={item.icon} size={20} color={APP_COLORS.BLACK} />
            <View style={styles.contentItemText}>
              <Text style={styles.contentItemTitle}>{item.title}</Text>
              <Text style={styles.contentItemDuration}>{item.duration}</Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={APP_COLORS.BLACK}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quiz Modal */}
      <Quiz
        visible={quizVisible}
        title={courseInfo.title}
        questions={quizQuestions}
        onComplete={handleQuizComplete}
        onClose={() => setQuizVisible(false)}
        themeColor={courseInfo.color}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.BACKGROUND,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 20,
  },
  backButton: {
    backgroundColor: APP_COLORS.WHITE,
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
  },
  titleContainer: {
    backgroundColor: APP_COLORS.WHITE,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    gap: 10,
    borderWidth: 2,
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  progressContainer: {
    backgroundColor: APP_COLORS.WHITE,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressLabel: {
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    backgroundColor: APP_COLORS.WHITE,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
  },
  activeTab: {
    backgroundColor: APP_COLORS.CATEGORY_BLUE,
  },
  tabText: {
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoCard: {
    backgroundColor: APP_COLORS.WHITE,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  infoText: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  contentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: APP_COLORS.WHITE,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
  },
  contentItemText: {
    flex: 1,
    marginLeft: 15,
  },
  contentItemTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  contentItemDuration: {
    fontSize: 12,
    color: "#666",
  },
});
