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

export default function ProgrammingWithVariables() {
    const router = useRouter();
    const [progress, setProgress] = useState(5);
    const [quizVisible, setQuizVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('course');

    const courseInfo = {
        title: "Programming with Variables",
        category: "Programming & CS",
        level: "Beginner",
        duration: "5 hours",
        students: "3,892",
        rating: 4.8,
        icon: "code",
        color: APP_COLORS.CATEGORY_PINK,
        description: "Master the concept of variables in programming. Learn how to declare, manipulate, and work with variables to store and process data in your programs efficiently."
    };

    // Programming with Variables quiz questions
    const variablesQuizQuestions: Question[] = [
        {
            id: 1,
            text: "What is the main purpose of variables in programming?",
            options: [
                "To make code look more complicated", 
                "To store and manipulate data", 
                "To increase code execution time", 
                "To create visual elements"
            ],
            correctAnswer: 1, // To store and manipulate data
        },
        {
            id: 2,
            text: "Which of the following is considered a good variable naming convention?",
            options: [
                "1stVariable", 
                "my variable", 
                "userName", 
                "function"
            ],
            correctAnswer: 2, // userName
        },
        {
            id: 3,
            text: "In statically typed languages, what must be specified for variables?",
            options: [
                "The variable's color", 
                "The data type", 
                "The variable's location in memory", 
                "The variable's size in bytes"
            ],
            correctAnswer: 1, // The data type
        },
        {
            id: 4,
            text: "What happens when you try to use a variable that has been declared but not initialized?",
            options: [
                "It will contain a random value", 
                "It will have a default value (like null, undefined, or 0)", 
                "The program will crash", 
                "Nothing happens"
            ],
            correctAnswer: 1, // It will have a default value
        },
        {
            id: 5,
            text: "What is variable scope?",
            options: [
                "The size of memory allocated to a variable", 
                "The region of the program where a variable can be accessed", 
                "The lifetime of a variable", 
                "The maximum value a variable can hold"
            ],
            correctAnswer: 1, // The region of the program where a variable can be accessed
        },
    ];
    
    const handleQuizComplete = (score: number, total: number) => {
        // Update progress based on quiz performance
        const quizProgress = Math.round((score / total) * 20); // Add up to 20% to progress
        setProgress(Math.min(100, progress + quizProgress));
        
        // Provide feedback based on score
        const percentage = Math.round((score / total) * 100);
        if (percentage >= 80) {
            Alert.alert("Great job!", `You scored ${score} out of ${total}! You have a solid understanding of programming variables!`);
        } else if (percentage >= 60) {
            Alert.alert("Good effort!", `You scored ${score} out of ${total}. Keep practicing with variables!`);
        } else {
            Alert.alert("Keep learning!", `You scored ${score} out of ${total}. Variables are fundamental to programming - review the material and try again!`);
        }
    };

    const courseContent: CourseContent[] = [
        {
            title: "What are Variables?",
            type: "video",
            duration: "8:30",
            description: "Introduction to variables and why they're essential in programming",
            completed: true,
        },
        {
            title: "Variable Declaration",
            type: "video",
            duration: "12:45",
            description: "How to properly declare variables in different programming languages",
            completed: false,
        },
        {
            title: "Data Types",
            type: "reading",
            duration: "15 min",
            description: "Understanding different data types and their uses",
            completed: false,
        },
        {
            title: "Variable Naming Conventions",
            type: "reading",
            duration: "10 min",
            description: "Best practices for naming variables in your code",
            completed: false,
        },
        {
            title: "Practice: Working with Variables",
            type: "exercise",
            duration: "20 min",
            description: "Hands-on exercises to practice variable declaration and usage",
            completed: false,
        },
        {
            title: "Variable Scope and Lifetime",
            type: "video",
            duration: "14:20",
            description: "Understanding when and where variables can be accessed",
            completed: false,
        },
        {
            title: "Constants vs Variables",
            type: "reading",
            duration: "12 min",
            description: "When to use constants instead of variables",
            completed: false,
        },
        {
            title: "Advanced Variable Concepts",
            type: "video",
            duration: "18:15",
            description: "Pointers, references, and advanced variable concepts",
            completed: false,
        },
        {
            title: "Final Project: Variable Management",
            type: "project",
            duration: "45 min",
            description: "Create a program demonstrating effective use of variables",
            completed: false,
        },
        {
            title: "Variables Quiz",
            type: "exercise",
            duration: "15 min",
            description: "Test your understanding of programming variables",
            completed: false,
        }
    ];

    const handleContentPress = (item: CourseContent) => {
        if (item.title === "Variables Quiz") {
            setQuizVisible(true);
        } else {
            console.log(`Opening lesson: ${item.title}`);
        }
    };

    const renderContentItem = (item: CourseContent, index: number) => {
        const isCompleted = progress > (index * 10);
        
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
        "Understand variable declaration and initialization",
        "Learn proper variable naming conventions",
        "Master different data types and their uses",
        "Understand variable scope and lifetime",
        "Apply variables effectively in real-world programs"
    ];

    const QuizMenuBar = () => (
        <View style={styles.quizMenuBar}>
            <TouchableOpacity
                style={[styles.quizMenuButton, { backgroundColor: courseInfo.color }]}
                onPress={() => setQuizVisible(true)}
            >
                <FontAwesome5 name="question-circle" size={20} color="#fff" style={styles.quizMenuIcon} />
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
                    <FontAwesome5 name="code" size={60} color="#000" style={styles.bannerIcon} />
                    <View style={styles.bannerContent}>
                        <Text style={styles.bannerTitle}>Programming & CS</Text>
                        <Text style={styles.bannerSubtitle}>Master variable programming</Text>
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
                        {courseContent.filter(item => item.title !== 'Variables Quiz').map((item, index) => renderContentItem(item, index))}
                    </View>
                )}

                {/* Quiz Section */}
                {activeTab === 'quiz' && (
                    <View style={styles.contentSection}>
                        <Text style={styles.sectionTitle}>Quiz Section</Text>
                        <View style={styles.quizCard}>
                            <View style={styles.quizHeader}>
                                <FontAwesome5 name="question-circle" size={24} color={APP_COLORS.BLACK} />
                                <Text style={styles.quizTitle}>Programming with Variables Quiz</Text>
                            </View>
                            <Text style={styles.quizDescription}>
                                Test your understanding of programming variables through this comprehensive quiz. The quiz consists of 5 questions covering variable declaration, naming conventions, data types, and scope.
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
                title="Programming with Variables Quiz"
                questions={variablesQuizQuestions}
                onComplete={handleQuizComplete}
                themeColor={courseInfo.color}
                onClose={() => setQuizVisible(false)}
                visible={quizVisible}
            />

            <QuizMenuBar />
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
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
        ...NEO_SHADOW,
        marginBottom: 10,
    },
    quizMenuButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        ...NEO_SHADOW,
    },
    quizMenuText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    quizMenuIcon: {
        marginRight: 8,
    },
});