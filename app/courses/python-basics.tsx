import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import NeoBrutalismNavbar, { APP_COLORS } from "../../components/NeoBrutalismNavbar";

const { width } = Dimensions.get("window");


const NEO_SHADOW = {
  shadowColor: APP_COLORS.BLACK,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

export default function PythonBasicsLesson() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);


  const lessonInfo = {
    title: "Python Basics",
    courseTitle: "Programming with Python",
    duration: "15:45",
    instructor: "Dr. Alex Rivera",
    totalSections: 6,
    color: APP_COLORS.CATEGORY_PINK,
    description: "Learn the essential building blocks of Python programming including variables, data types, and basic operations. This lesson covers the fundamental concepts every Python programmer needs to know."
  };


  const lessonSections = [
    {
      title: "Introduction to Python Variables",
      content: [
        "Variables in Python are containers for storing data values. Unlike other programming languages, Python has no command for declaring a variable. A variable is created the moment you first assign a value to it.",
        "Python is dynamically typed, which means you don't need to declare variable types. The interpreter automatically identifies the type based on the assigned value.",
        "Example:\n```python\nx = 5       # x is an integer\ny = \"Hello\"  # y is a string\nz = 3.14     # z is a float\n```",
        "Variable names must start with a letter or underscore and can contain letters, numbers, and underscores. They are also case-sensitive."
      ],
      codeExample: 'name = "John"\nage = 25\nprint(f"Hello, {name}! You are {age} years old.")\n# Output: Hello, John! You are 25 years old.',
      videoUrl: "https://example.com/video/python-variables",
    },
    {
      title: "Data Types in Python",
      content: [
        "Python has several built-in data types:",
        "• Numeric Types: int, float, complex\n• Sequence Types: list, tuple, range\n• Mapping Type: dict\n• Set Types: set, frozenset\n• Boolean Type: bool\n• Binary Types: bytes, bytearray, memoryview",
        "You can check the type of any object using the type() function.",
        "Example:\n```python\nx = 5\nprint(type(x))  # Output: <class 'int'>\n```"
      ],
      codeExample: "# Different data types\nage = 25                  # integer\nprice = 19.99             # float\nis_student = True         # boolean\nname = \"Alice\"            # string\ncolors = [\"red\", \"blue\"]  # list\n\n# Print their types\nprint(type(age))         # <class 'int'>\nprint(type(price))       # <class 'float'>\nprint(type(is_student))  # <class 'bool'>\nprint(type(name))        # <class 'str'>\nprint(type(colors))      # <class 'list'>",
      videoUrl: "https://example.com/video/python-data-types",
    },
    {
      title: "Basic Operations",
      content: [
        "Python supports various mathematical operations:",
        "• Addition: x + y\n• Subtraction: x - y\n• Multiplication: x * y\n• Division: x / y\n• Floor Division: x // y\n• Modulus: x % y\n• Exponentiation: x ** y",
        "Python also supports compound assignment operators: +=, -=, *=, /= etc.",
        "For strings, + is used for concatenation and * for repetition."
      ],
      codeExample: "# Arithmetic operations\nx = 10\ny = 3\n\nprint(x + y)   # 13  (addition)\nprint(x - y)   # 7   (subtraction)\nprint(x * y)   # 30  (multiplication)\nprint(x / y)   # 3.333... (division)\nprint(x // y)  # 3   (floor division)\nprint(x % y)   # 1   (modulus/remainder)\nprint(x ** y)  # 1000 (exponentiation)\n\n# String operations\nfirst = \"Hello\"\nsecond = \"World\"\nprint(first + \" \" + second)  # Hello World\nprint(first * 3)  # HelloHelloHello",
      videoUrl: "https://example.com/video/python-operations",
    },
    {
      title: "Taking User Input",
      content: [
        "In Python, you can take user input using the input() function. This function reads a line from the input (usually from the keyboard) and returns it as a string.",
        "If you want to convert the input to another data type, you need to explicitly convert it.",
        "Example:\n```python\nname = input(\"Enter your name: \")\nage = int(input(\"Enter your age: \"))\n```",
        "Remember that input() always returns a string, so you need to convert it to the appropriate type if needed."
      ],
      codeExample: "# Basic input example\nname = input(\"Enter your name: \")\nprint(f\"Hello, {name}!\")\n\n# Input with type conversion\nheight = float(input(\"Enter your height in meters: \"))\nweight = float(input(\"Enter your weight in kilograms: \"))\n\n# Calculate BMI\nbmi = weight / (height ** 2)\nprint(f\"Your BMI is: {bmi:.2f}\")",
      videoUrl: "https://example.com/video/python-input",
    },
    {
      title: "Print Function",
      content: [
        "The print() function in Python is used to display output to the console.",
        "Basic syntax: print(object(s), sep=separator, end=end, file=file, flush=flush)",
        "• object(s): one or more objects to print\n• sep: separator between objects (default is space)\n• end: what to print at the end (default is newline)\n• file: where to send the output (default is sys.stdout)\n• flush: whether to flush the stream (default is False)",
        "F-strings (formatted string literals) are a convenient way to embed expressions inside string literals using {}."
      ],
      codeExample: "# Basic print\nprint(\"Hello World\")\n\n# Print multiple items\nprint(\"Hello\", \"World\", \"Python\")\n\n# Change separator\nprint(\"apple\", \"banana\", \"cherry\", sep=\"-\")\n# Output: apple-banana-cherry\n\n# Change end character\nprint(\"Hello\", end=\" \")\nprint(\"World\")\n# Output: Hello World\n\n# F-strings for formatting\nname = \"Python\"\nversion = 3.9\nprint(f\"{name} version {version} is awesome!\")\n# Output: Python version 3.9 is awesome!",
      videoUrl: "https://example.com/video/python-print",
    },
    {
      title: "Practice and Quiz",
      content: [
        "Let's practice what we've learned with some exercises:",
        "1. Create variables for your name, age, and favorite programming language.",
        "2. Calculate the area of a circle with a radius of 5 (Area = π * r²).",
        "3. Take user input for two numbers and display their sum, difference, product, and quotient.",
        "4. Create a program that converts temperature from Celsius to Fahrenheit (F = C * 9/5 + 32)."
      ],
      codeExample: "# Sample solution for exercise 4\n\ndef celsius_to_fahrenheit(celsius):\n    \"\"\"Convert Celsius to Fahrenheit\"\"\"\n    return celsius * 9/5 + 32\n\n# Get input from user\ncelsius = float(input(\"Enter temperature in Celsius: \"))\n\n# Convert and display\nfahrenheit = celsius_to_fahrenheit(celsius)\nprint(f\"{celsius}°C is equal to {fahrenheit:.2f}°F\")",
      videoUrl: "https://example.com/video/python-practice",
    },
  ];


  const goToNextSection = () => {
    if (currentSection < lessonSections.length - 1) {
      setCurrentSection(currentSection + 1);
      updateProgress(currentSection + 1);
    }
  };

  const goToPrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      updateProgress(currentSection - 1);
    }
  };

  const updateProgress = (sectionIndex: any) => {
    const newProgress = Math.round(((sectionIndex + 1) / lessonSections.length) * 100);
    setProgress(newProgress);
  };


  const SectionSelector = () => (
    <View style={styles.sectionSelectorContainer}>
      {lessonSections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.sectionDot,
            currentSection === index && styles.activeSectionDot,
            { backgroundColor: currentSection >= index ? lessonInfo.color : "#f0f0f0" }
          ]}
          onPress={() => {
            setCurrentSection(index);
            updateProgress(index);
          }}
        >
          <Text style={styles.sectionNumber}>{index + 1}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );


  const CodeBlock = (code: any) => (
    <View style={styles.codeBlockContainer}>
      <Text style={styles.codeBlockTitle}>
        <FontAwesome5 name="code" size={14} color="#000" /> Example Code
      </Text>
      <View style={styles.codeBlock}>
        <Text style={styles.codeText}>{code}</Text>
      </View>
    </View>
  );

  // Current section content
  const currentSectionData = lessonSections[currentSection];

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
        <View style={styles.headerTitles}>
          <Text style={styles.courseTitle}>{lessonInfo.courseTitle}</Text>
          <Text style={styles.lessonTitle}>{lessonInfo.title}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            Section {currentSection + 1}/{lessonSections.length}
          </Text>
          <Text style={styles.progressPercentage}>{progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress}%`, backgroundColor: lessonInfo.color }
            ]}
          />
        </View>
      </View>

      {/* Section Navigation */}
      <SectionSelector />

      {/* Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionContainer}>
          <View style={[styles.sectionHeader, { backgroundColor: lessonInfo.color }]}>
            <Text style={styles.sectionTitle}>{currentSectionData.title}</Text>
            <View style={styles.sectionMeta}>
              <FontAwesome5 name="video" size={14} color="#000" style={{ marginRight: 6 }} />
              <Text style={styles.sectionMetaText}>{lessonInfo.duration}</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            {currentSectionData.content.map((paragraph, idx) => (
              <Text key={idx} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}

            <CodeBlock code={currentSectionData.codeExample} />

            <TouchableOpacity style={styles.videoButton}>
              <FontAwesome5 name="play-circle" size={16} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.videoButtonText}>Watch Video Explanation</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, currentSection === 0 && styles.disabledButton]}
            onPress={goToPrevSection}
            disabled={currentSection === 0}
          >
            <MaterialIcons name="navigate-before" size={24} color="#000" />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navButton,
              styles.nextButton,
              currentSection === lessonSections.length - 1 && styles.disabledButton
            ]}
            onPress={goToNextSection}
            disabled={currentSection === lessonSections.length - 1}
          >
            <Text style={styles.navButtonText}>Next</Text>
            <MaterialIcons name="navigate-next" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Complete Section Button */}
        {currentSection === lessonSections.length - 1 && (
          <TouchableOpacity 
            style={styles.completeButton}
            onPress={() => router.back()}
          >
            <Text style={styles.completeButtonText}>Complete Lesson</Text>
            <Ionicons name="checkmark-circle" size={20} color="#000" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}

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
  header: {
    padding: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  backButton: {
    marginBottom: 8,
  },
  headerTitles: {
    alignItems: "center",
  },
  courseTitle: {
    fontSize: 16,
    color: "#666",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginBottom: 4,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  progressContainer: {
    padding: 12,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    backgroundColor: APP_COLORS.WHITE,
    ...NEO_SHADOW,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  sectionSelectorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  sectionDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
  },
  activeSectionDot: {
    transform: [{ scale: 1.2 }],
  },
  sectionNumber: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    ...NEO_SHADOW,
  },
  sectionHeader: {
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: APP_COLORS.BLACK,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginBottom: 8,
  },
  sectionMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionMetaText: {
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  contentContainer: {
    padding: 16,
    backgroundColor: APP_COLORS.WHITE,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  codeBlockContainer: {
    marginVertical: 12,
  },
  codeBlockTitle: {
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "bold",
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  codeText: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 14,
    color: "#333",
  },
  videoButton: {
    backgroundColor: "#6B7AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  videoButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: APP_COLORS.WHITE,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  nextButton: {
    backgroundColor: APP_COLORS.CATEGORY_BLUE,
  },
  navButtonText: {
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  disabledButton: {
    opacity: 0.5,
  },
  completeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  completeButtonText: {
    color: APP_COLORS.BLACK,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  spacer: {
    height: 100,
  },
});
