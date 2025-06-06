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

type TabType = 'course' | 'quiz';

type CourseItem = {
  title: string;
  duration: string;
  icon: string;
  isQuiz?: boolean;
};

export default function BasicAlgebra() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [quizVisible, setQuizVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('course');

  const courseInfo = {
    title: "Basic Algebra",
    category: "Foundational Math",
    level: "Beginner",
    duration: "8 hours",
    students: "3,856",
    rating: 4.7,
    icon: "square-root-alt",
    color: APP_COLORS.CATEGORY_YELLOW,
    description: "Master the fundamentals of algebra including variables, equations, functions, and mathematical problem-solving. Build a strong foundation for advanced mathematics."
  };

  const quizQuestions: Question[] = [
    {
      id: 1,
      text: "What is a variable in algebra?",
      options: [
        "A fixed number",
        "A letter or symbol representing an unknown value",
        "A mathematical operation",
        "A geometric shape"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "Which of these is a linear equation?",
      options: [
        "y = x²",
        "y = 2x + 3",
        "y = 1/x",
        "y = √x"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      text: "What does the slope of a line represent?",
      options: [
        "The y-intercept",
        "The starting point",
        "The rate of change",
        "The endpoint"
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      text: "How do you solve for x in 2x + 5 = 13?",
      options: [
        "x = 4",
        "x = 6",
        "x = 8",
        "x = 9"
      ],
      correctAnswer: 0
    },
    {
      id: 5,
      text: "What is the quadratic formula?",
      options: [
        "x = -b ± √(b² - 4ac)/2a",
        "x = a + b",
        "x = -b/a",
        "x = c/a"
      ],
      correctAnswer: 0
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
      title: "Introduction to Algebra",
      duration: "45 mins",
      icon: "book-open"
    },
    {
      title: "Variables and Constants",
      duration: "1 hour",
      icon: "superscript"
    },
    {
      title: "Linear Equations",
      duration: "1.5 hours",
      icon: "equals"
    },
    {
      title: "Solving Word Problems",
      duration: "2 hours",
      icon: "pencil-alt"
    },
    {
      title: "Graphing Linear Equations",
      duration: "1.5 hours",
      icon: "chart-line"
    },
    {
      title: "Systems of Equations",
      duration: "1.5 hours",
      icon: "project-diagram"
    },
    {
      title: "Quadratic Equations",
      duration: "1.5 hours",
      icon: "square"
    },
    {
      title: "Practice Problems",
      duration: "1 hour",
      icon: "tasks"
    },
    {
      title: "Algebra Quiz",
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
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 20 : 20,
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
    backgroundColor: APP_COLORS.CATEGORY_YELLOW,
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
