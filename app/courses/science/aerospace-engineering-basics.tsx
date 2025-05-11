import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { APP_COLORS } from "../../../components/NeoBrutalismNavbar";

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

export default function AerospaceEngineeringBasics() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const courseInfo = {
    title: "Aerospace Engineering Basics",
    category: "Science",
    level: "Intermediate",
    duration: "6 hours",
    students: "3,847",
    rating: 4.7,
    icon: "rocket",
    color: APP_COLORS.CATEGORY_BLUE,
    description: "Explore the fundamental principles of aerospace engineering, from aerodynamics to space systems. Learn about aircraft design, propulsion systems, and the physics of flight."
  };

  const courseContent: CourseContent[] = [
    {
      title: "Introduction to Aerospace Engineering",
      type: "video",
      duration: "15:30",
      description: "Overview of aerospace engineering and its two main branches: aeronautical and astronautical engineering",
      completed: false,
    },
    {
      title: "Fundamentals of Aerodynamics",
      type: "video",
      duration: "20:45",
      description: "Understanding air flow, lift, drag, and the principles of flight",
      completed: false,
    },
    {
      title: "Aircraft Propulsion Systems",
      type: "reading",
      duration: "25 min",
      description: "Study of jet engines, rocket propulsion, and thrust generation",
      completed: false,
    },
    {
      title: "Aircraft Structures and Materials",
      type: "video",
      duration: "18:20",
      description: "Analysis of aircraft components, materials, and structural integrity",
      completed: false,
    },
    {
      title: "Flight Mechanics and Control",
      type: "reading",
      duration: "20 min",
      description: "Principles of aircraft stability, control systems, and flight dynamics",
      completed: false,
    },
    {
      title: "Space Systems Engineering",
      type: "video",
      duration: "22:15",
      description: "Introduction to spacecraft design, orbital mechanics, and space missions",
      completed: false,
    },
    {
      title: "Final Project: Aircraft Design",
      type: "project",
      duration: "45 min",
      description: "Apply your knowledge to design a basic aircraft concept",
      completed: false,
    }
  ];

  const handleContentPress = (item: CourseContent) => {
    console.log(`Opening lesson: ${item.title} (under development)`);
  };

  const renderContentItem = (item: CourseContent, index: number) => {
    const isCompleted = progress > (index * 15);
    
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
                : "rocket"
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
    "Understand fundamental aerospace principles",
    "Master aerodynamics and flight mechanics",
    "Learn about propulsion systems and aircraft structures",
    "Explore space systems and orbital mechanics",
    "Develop practical aerospace engineering skills"
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
          <FontAwesome5 name="rocket" size={60} color="#000" style={styles.bannerIcon} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Aerospace Engineering</Text>
            <Text style={styles.bannerSubtitle}>Master the fundamentals of flight</Text>
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
              <Text style={styles.statText}>{courseInfo.students} students</Text>
            </View>
          </View>
        </View>

        {/* Learning Points */}
        <View style={styles.learningPointsContainer}>
          <Text style={styles.learningPointsTitle}>What You'll Learn</Text>
          {learningPoints.map((point, index) => (
            <View key={index} style={styles.learningPoint}>
              <FontAwesome5 name="check-circle" size={16} color={courseInfo.color} />
              <Text style={styles.learningPointText}>{point}</Text>
            </View>
          ))}
        </View>

        {/* Course Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Course Content</Text>
          {courseContent.map((item, index) => renderContentItem(item, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    marginLeft: 16,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  bannerIcon: {
    marginRight: 20,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#000',
  },
  courseInfoCard: {
    padding: 20,
    margin: 16,
    borderRadius: 8,
    ...NEO_SHADOW,
  },
  courseDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
  },
  learningPointsContainer: {
    padding: 16,
  },
  learningPointsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  learningPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  learningPointText: {
    marginLeft: 12,
    fontSize: 16,
  },
  contentContainer: {
    padding: 16,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  completedItem: {
    borderColor: APP_COLORS.CATEGORY_BLUE,
  },
  contentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contentDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  contentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentDuration: {
    fontSize: 12,
    color: '#666',
    marginRight: 16,
  },
  completedText: {
    fontSize: 12,
    color: 'green',
  },
}); 