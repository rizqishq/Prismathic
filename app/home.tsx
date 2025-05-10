import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  COURSE_CALCULUS,
  FOUNDATIONAL_MATH,
  HEADER_LOGIN_PAGE,
  HEADER_LOGIN_PAGE_2,
  ICON,
  PROFILE_PICTURE
} from "../assets/placeholder-images";
import NeoBrutalismNavbar, { APP_COLORS } from "../components/NeoBrutalismNavbar";


const NEO_SHADOW = {
  shadowColor: APP_COLORS.BLACK,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

const { width } = Dimensions.get("window");


type ReminderCardType = {
  title: string;
  name: string;
  message: string;
  image: any;
  bgColor: string;
};


type ReminderCardProps = {
  card: ReminderCardType;
  onNext: () => void;
  onPrev: () => void;
};

type CourseCardProps = {
  image: any;
  category: string;
  title: string;
};

type LearningOptionProps = {
  image: any;
  title: string;
};

const reminderCards: ReminderCardType[] = [
  {
    title: "We missed you,",
    name: "Prabu Rizqi",
    message: "Get back on track and achieve your goals.\n5-10 minutes a day will do",
    image: HEADER_LOGIN_PAGE,
    bgColor: "#FFBE55",
  },
  {
    title: "Go further in\nmath and Science",
    name: "",
    message: "Look to a collection of our top courses in Foundational math, Python, and more",
    image: HEADER_LOGIN_PAGE_2,
    bgColor: "#B1FFF5",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reminderCards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reminderCards.length) % reminderCards.length);
  };
  
  const userData = {
    name: "Paduka Rizqi",
    firstName: "Paduka",
    avatar: ICON,
  };


  const ReminderCard = ({ card, onNext, onPrev }: ReminderCardProps) => (
    <View style={[styles.reminderCard, { backgroundColor: card.bgColor }]}>
      <Image 
        source={card.image} 
        style={styles.cardBackgroundImage} 
        resizeMode="cover"
      />
      
      <View style={styles.cardContentOverlay}>
        <View style={styles.reminderTextContainer}>
          <Text style={styles.reminderTitle}>{card.title}</Text>
          {card.name ? (
            <Text style={styles.reminderName}>{card.name}</Text>
          ) : null}
          <Text style={styles.reminderText}>{card.message}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.navButton, { right: -15 }]} 
        onPress={onNext}
      >
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.navButton, { left: -15 }]} 
        onPress={onPrev}
      >
        <AntDesign name="left" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );


  const CourseCard = ({ image, category, title }: CourseCardProps) => (
    <View style={styles.courseCard}>
      <View style={styles.courseImageContainer}>
        <Image source={image} style={styles.courseImage} />
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseCategory}>{category}</Text>
        <Text style={styles.courseTitle}>{title}</Text>
        <Pressable style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue path</Text>
        </Pressable>
      </View>
    </View>
  );


  const LearningOption = ({ image, title }: LearningOptionProps) => (
    <TouchableOpacity style={styles.learningOption}>
      <Image source={image} style={styles.learningOptionImage} />
      <Text style={styles.learningOptionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Fixed Header */}
      <View style={styles.headerFixed}>
        <View style={styles.logoAndWelcome}>
          <View style={styles.logoContainer}>
            <Image source={ICON} style={styles.logo} />
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.userName}>{userData.name}</Text>
          </View>
        </View>
        <View style={styles.avatarContainer}>
          <Image source={PROFILE_PICTURE} style={styles.avatar} />
        </View>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>

        {/* Reminder Card */}
        <View style={styles.reminderCardContainer}>
          <ReminderCard 
            card={reminderCards[currentIndex]} 
            onNext={handleNext} 
            onPrev={handlePrev}
          />
        </View>

        {/* Jump Back In */}
        <Text style={styles.sectionTitle}>Jump Back In</Text>
        <View style={styles.courseCardContainer}>
          <CourseCard 
            image={FOUNDATIONAL_MATH}
            category="FOUNDATIONAL MATH • LEVEL 1"
            title="Solving Equations"
          />
        </View>

        {/* Let's start learning */}
        <Text style={styles.sectionTitle}>Let's start learning</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.learningOptionsContainer}>
          <LearningOption image={COURSE_CALCULUS} title="Calculus" />
          <LearningOption image={COURSE_CALCULUS} title="Algebra" />
          <LearningOption image={COURSE_CALCULUS} title="Geometry" />
          <LearningOption image={COURSE_CALCULUS} title="Statistics" />
        </ScrollView>

        <View style={styles.spacer} />
      </ScrollView>
      <NeoBrutalismNavbar variant="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff",
    paddingTop: 70,
  },
  contentContainer: { 
    padding: 20, 
    paddingBottom: 100, 
    paddingTop: 10,
  },
  headerFixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: APP_COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    ...NEO_SHADOW,
  },
  logoAndWelcome: { 
    flexDirection: "row", 
    alignItems: "center" 
  },
  logoContainer: { 
    marginRight: 10 
  },
  logo: { 
    width: 40, 
    height: 40, 
    resizeMode: "contain",
    borderRadius: 8
  },
  welcomeText: { 
    fontSize: 14, 
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", 
    color: "#555" 
  },
  userName: { 
    fontSize: 18, 
    fontWeight: "bold", 
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace" 
  },
  avatarContainer: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#000" 
  },
  avatar: { 
    width: "100%", 
    height: "100%" 
  },
  reminderCardContainer: { 
    marginBottom: 30,
    position: "relative", 
  },
  reminderCard: {
    backgroundColor: APP_COLORS.CATEGORY_ORANGE,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    height: 160,
    ...NEO_SHADOW,
    position: "relative",
    overflow: "hidden",
  },
  cardBackgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
  cardContentOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: 15,
    flexDirection: "row",
  },
  reminderTextContainer: { 
    flex: 1, 
    paddingRight: 10 
  },
  reminderTitle: { 
    fontSize: 16, 
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", 
    fontWeight: "bold" 
  },
  reminderName: { 
    fontSize: 18, 
    fontWeight: "bold", 
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", 
    marginBottom: 5 
  },
  reminderText: { 
    fontSize: 14, 
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", 
    lineHeight: 18 
  },
  navButton: {
    position: "absolute",
    top: "50%",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: APP_COLORS.WHITE,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    transform: [{ translateY: -17.5 }],
    zIndex: 10,
    shadowColor: APP_COLORS.BLACK,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: "bold", 
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", 
    marginVertical: 16 
  },
  courseCardContainer: { 
    marginBottom: 30
  },
  courseCard: {
    backgroundColor: APP_COLORS.WHITE,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    borderRadius: 8,
    overflow: "hidden",
    ...NEO_SHADOW
  },
  courseImageContainer: {
    height: 180,
    backgroundColor: "#E1E9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  courseImage: { 
    width: "100%", 
    height: "100%", 
    resizeMode: "cover" 
  },
  courseInfo: { 
    padding: 16 
  },
  courseCategory: { 
    fontSize: 14, 
    color: "#6B7AFF", 
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontWeight: "600" 
  },
  courseTitle: { 
    fontSize: 22, 
    fontWeight: "bold", 
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", 
    marginVertical: 12 
  },
  continueButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    backgroundColor: APP_COLORS.WHITE,
    shadowColor: APP_COLORS.BLACK,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
    borderRadius: 6
  },
  continueButtonText: { 
    fontSize: 16, 
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", 
    fontWeight: "600" 
  },
  learningOptionsContainer: {
    marginBottom: 20
  },
  learningOption: {
    width: width * 0.42,
    marginRight: 12,
    backgroundColor: APP_COLORS.WHITE,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    borderRadius: 8,
    overflow: "hidden",
    ...NEO_SHADOW
  },
  learningOptionImage: { 
    width: "100%", 
    height: 130, 
    resizeMode: "contain",
    backgroundColor: "#F6F7FF"
  },
  learningOptionText: { 
    textAlign: "center", 
    paddingVertical: 16,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace", 
    fontWeight: "600" 
  },
  spacer: { 
    height: 90 
  },
});