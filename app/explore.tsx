import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ICON } from "../assets/placeholder-images";
import NeoBrutalismNavbar from "../components/NeoBrutalismNavbar";


type Course = {
  title: string;
  icon: string;
};

type Category = {
  title: string;
  subtitle: string;
  color: string;
  courses: Course[];
};

export default function Explore() {
  const router = useRouter();


  const categories: Category[] = [
    {
      title: "Foundational Math",
      subtitle: "Master essential core concepts",
      color: "#AAC4FF",
      courses: [
        { title: "Getting Started", icon: "calculator" },
        { title: "Basic Algebra", icon: "square-root-alt" },
        { title: "Basic Solid Algebra", icon: "cube" },
        { title: "Geometry", icon: "draw-polygon" },
        { title: "Function", icon: "function" },
      ],
    },
    {
      title: "Programming & CS",
      subtitle: "Master the art of coding",
      color: "#CDB4DB",
      courses: [
        { title: "Thinking in Code", icon: "brain" },
        { title: "Programming with Variables", icon: "code" },
        { title: "Programming with Python", icon: "python" },
        { title: "Programming with Functions", icon: "code" },
        { title: "Computer Science Fundamentals", icon: "microchip" },
        { title: "How AI Works", icon: "robot" },
        { title: "Introduction to Neural Networks", icon: "network-wired" },
      ],
    },
    {
      title: "Data Science",
      subtitle: "Master data analysis and machine learning",
      color: "#FFD6A5",
      courses: [
        { title: "Introduction to Data Science", icon: "chart-bar" },
        { title: "Data Visualization", icon: "chart-line" },
        { title: "Machine Learning Basics", icon: "brain" },
      ],
    },
    {
      title: "Science",
      subtitle: "Discover the laws of nature",
      color: "#FDFFB6",
      courses: [
        { title: "Scientific Thinking", icon: "microscope" },
        { title: "Physics", icon: "atom" },
        { title: "Aerospace Engineering Basics", icon: "rocket" },
        { title: "Quantum Mechanics with Python", icon: "python" },
        { title: "Quantum Computing", icon: "microchip" },
      ],
    },
    {
      title: "Logical Reasoning",
      subtitle: "Enhance your thinking skills",
      color: "#A0C4FF",
      courses: [
        { title: "Logic", icon: "chess" },
        { title: "Logic II", icon: "chess-knight" },
        { title: "Everyday Tech", icon: "mobile-alt" },
        { title: "Mathematical Thinking", icon: "square-root-alt" },
      ],
    },
    {
      title: "Technology",
      subtitle: "Discover technology at the edge",
      color: "#BDB2FF",
      courses: [
        { title: "How AI Works", icon: "robot" },
        { title: "Digital Circuits", icon: "microchip" },
        { title: "Web Technology Basics", icon: "globe" },
        { title: "Search Engines", icon: "search" },
        { title: "Cryptography", icon: "lock" },
        { title: "Quantum Computing", icon: "laptop" },
      ],
    },
    {
      title: "Advanced Math",
      subtitle: "Deepen your mathematical knowledge",
      color: "#9BF6FF",
      courses: [
        { title: "Calculus", icon: "infinity" },
        { title: "Linear Algebra", icon: "vector-square" },
      ],
    },
  ];

  const getCoursePath = (courseTitle: string) => {

    const kebabCase = courseTitle.toLowerCase().replace(/\s+/g, "-");


    const coursePaths: { [key: string]: string } = {
      "basic-algebra": "/courses/foundational-math/basic-algebra",
      "basic-solid-algebra": "/courses/foundational-math/basic-solid-algebra",
      "function": "/courses/foundational-math/function",
      "geometry": "/courses/foundational-math/geometry",
      
      "thinking-in-code": "/courses/programming-cs/thinking-in-code",
      "programming-with-variables": "/courses/programming-cs/programming-variables",
      "programming-with-python": "/courses/programming-cs/python-programming",
      "programming-with-functions": "/courses/programming-cs/programming-functions",
      "computer-science-fundamentals": "/courses/programming-cs/computer-science-fundamentals",
      "how-ai-works": "/courses/programming-cs/how-ai-works",
      "introduction-to-neural-networks": "/courses/programming-cs/introduction-to-neural-networks",

      "getting-started": "/courses/foundational-math/getting-started",
      "calculus": "/courses/advanced-math/calculus",
      "linear-algebra": "/courses/advanced-math/linear-algebra",
      "introduction-to-data-science": "/courses/data-science/introduction-to-data-science",
      "data-visualization": "/courses/data-science/data-visualization",
      "machine-learning-basics": "/courses/data-science/machine-learning-basics",

      // Science section
      "scientific-thinking": "/courses/science/scientific-thinking",
      "physics": "/courses/science/physics",
      "aerospace-engineering-basics": "/courses/science/aerospace-engineering-basics",
      "quantum-mechanics-with-python": "/courses/science/quantum-mechanics-with-python",
      "quantum-computing": "/courses/science/quantum-computing",

      // Logical Reasoning section
      "logic": "/courses/logical-reasoning/logic",
      "logic-ii": "/courses/logical-reasoning/logic-ii",
      "everyday-tech": "/courses/logical-reasoning/everyday-tech",
      "mathematical-thinking": "/courses/logical-reasoning/mathematical-thinking",

      // Technology section
      "digital-circuits": "/courses/technology/digital-circuits",
      "web-technology-basics": "/courses/technology/web-technology-basics",
      "search-engines": "/courses/technology/search-engines",
      "cryptography": "/courses/technology/cryptography",
    };

    return coursePaths[kebabCase] || "/course";
  };


  const renderCategory = (category: Category, index: number) => {
    return (
      <View
        key={index}
        style={[styles.categoryContainer, { backgroundColor: category.color }]}
      >
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
        </View>

        {category.courses.map((course: Course, idx: number) => (
          <TouchableOpacity
            key={idx}
            style={styles.courseButton}
            onPress={() => {
              const coursePath = getCoursePath(course.title);
              if (coursePath === "/course") {
                router.push({
                  pathname: "/course",
                  params: {
                    title: course.title,
                    icon: course.icon,
                    category: category.title,
                  },
                });
              } else {
                router.push(coursePath as any);
              }
            }}
          >
            <FontAwesome5
              name={course.icon}
              size={20}
              color="#444"
              style={styles.courseIcon}
            />
            <Text style={styles.courseText}>{course.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };


  const Header = () => (
    <View>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <Text style={styles.pageTitle}>Get Smarter Each Day</Text>
          <Text style={styles.subtitle}>Discover new courses & paths</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image source={ICON} style={styles.avatar} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for courses, subjects, or topics"
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.searchButton}>
          <MaterialIcons name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header />
      <ScrollView style={styles.scrollView}>
        {categories.map((category, index) => renderCategory(category, index))}
        <View style={styles.spacer} />
      </ScrollView>
      <NeoBrutalismNavbar variant="explore" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  headerLeft: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  searchButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  scrollView: {
    flex: 1,
    paddingTop: 10,
  },

  categoryContainer: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 15,
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  categoryHeader: {
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  categorySubtitle: {
    fontSize: 14,
    color: "#333",
    marginTop: 2,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  courseButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  courseIcon: {
    marginRight: 12,
    width: 24,
    textAlign: "center",
  },
  courseText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    flex: 1,
  },
  spacer: {
    height: 80,
  },
});
