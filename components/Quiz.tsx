import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { APP_COLORS } from './NeoBrutalismNavbar';

export type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
};

type QuizProps = {
  title: string;
  questions: Question[];
  onComplete: (score: number, total: number) => void;
  themeColor?: string;
  onClose: () => void;
  visible: boolean;
};

const NEO_SHADOW = {
  shadowColor: APP_COLORS.BLACK,
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 5,
};

const Quiz: React.FC<QuizProps> = ({
  title,
  questions,
  onComplete,
  themeColor = APP_COLORS.CATEGORY_BLUE,
  onClose,
  visible
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectAnswer = (questionId: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctAnswers = 0;
      questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setShowResults(true);
      onComplete(correctAnswers, questions.length);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    onClose();
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {currentQuestion + 1}. {question.text}
        </Text>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswers[question.id] === index && { backgroundColor: themeColor },
            ]}
            onPress={() => handleSelectAnswer(question.id, index)}
          >
            <Text style={[
              styles.optionText,
              selectedAnswers[question.id] === index && { color: '#fff' }
            ]}>
              {String.fromCharCode(65 + index)}. {option}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={styles.navigationButtons}>
          {currentQuestion > 0 && (
            <TouchableOpacity
              style={[styles.navButton, { backgroundColor: '#f0f0f0' }]}
              onPress={handlePreviousQuestion}
            >
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.navButton,
              { backgroundColor: themeColor },
              selectedAnswers[question.id] === undefined && { opacity: 0.5 }
            ]}
            onPress={handleNextQuestion}
            disabled={selectedAnswers[question.id] === undefined}
          >
            <Text style={[styles.navButtonText, { color: '#fff' }]}>
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderResults = () => {
    return (
      <View style={styles.resultsContainer}>
        <View style={[styles.scoreCard, { backgroundColor: themeColor }]}>
          <FontAwesome5 name="trophy" size={40} color="#fff" style={styles.trophyIcon} />
          <Text style={styles.scoreText}>Your Score</Text>
          <Text style={styles.scoreValue}>{score} / {questions.length}</Text>
          <Text style={styles.scorePercentage}>
            {Math.round((score / questions.length) * 100)}%
          </Text>
        </View>

        <Text style={styles.reviewTitle}>Review Questions</Text>
        <ScrollView style={styles.reviewContainer}>
          {questions.map((question, index) => (
            <View key={index} style={styles.reviewQuestion}>
              <Text style={styles.reviewQuestionText}>
                {index + 1}. {question.text}
              </Text>
              <Text style={[
                styles.reviewAnswer,
                selectedAnswers[question.id] === question.correctAnswer ? 
                  styles.correctAnswer : styles.wrongAnswer
              ]}>
                Your answer: {
                  selectedAnswers[question.id] !== undefined ? 
                  question.options[selectedAnswers[question.id]] : 
                  'Not answered'
                }
              </Text>
              {selectedAnswers[question.id] !== question.correctAnswer && (
                <Text style={styles.correctAnswerText}>
                  Correct answer: {question.options[question.correctAnswer]}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
        
        <TouchableOpacity 
          style={[styles.closeButton, { backgroundColor: themeColor }]}
          onPress={resetQuiz}
        >
          <Text style={styles.closeButtonText}>Close Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={resetQuiz}
      transparent
    >
      <View style={styles.modalContainer}>
        <View style={styles.quizContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={resetQuiz} style={styles.closeIcon}>
              <FontAwesome5 name="times" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          {!showResults ? renderQuestion() : renderResults()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  quizContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '90%',
    borderWidth: 3,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeIcon: {
    padding: 8,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    flex: 1,
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  optionButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
  },
  optionText: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  resultsContainer: {
    borderRadius: 12,
    padding: 10,
  },
  scoreCard: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
  },
  trophyIcon: {
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginVertical: 5,
  },
  scorePercentage: {
    fontSize: 24,
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  reviewContainer: {
    maxHeight: 300,
  },
  reviewQuestion: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  reviewQuestionText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  reviewAnswer: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  correctAnswer: {
    color: 'green',
  },
  wrongAnswer: {
    color: 'red',
  },
  correctAnswerText: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  closeButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: APP_COLORS.BLACK,
    ...NEO_SHADOW,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});

export default Quiz;
