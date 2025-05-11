import { StyleSheet, Text, View } from 'react-native';
export default function ProgrammingWithVariables() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Programming with Variables</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold' },
}); 