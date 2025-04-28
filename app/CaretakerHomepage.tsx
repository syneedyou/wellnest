import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function CaretakerHomepage() {
  const router = useRouter();

  const goToReminder = () => {
    router.push('/CTMedicationReminder');

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Caretaker!</Text>

      <Button title="Set Medication Reminder" onPress={goToReminder} />

      <Button title="Link Elderly" onPress={() => router.push('/LinkElderly')} />

    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
