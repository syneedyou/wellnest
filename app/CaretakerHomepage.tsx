import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function CaretakerHomepage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Hi, Caretaker!</Text>

        {/* Top Alert Card */}
        <View style={styles.card}>
          <Text>Important Alert</Text>
        </View>

        {/* Dashboard */}
        <TouchableOpacity style={styles.card}>
          <Text>Dashboard</Text>
        </TouchableOpacity>

        {/* Two small cards */}
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.smallCard}
        onPress={() => router.push('/MyElderlyList')}
      >
        <Text style={styles.smallCardText}>My Elderly</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.smallCard}
        onPress={() => router.push('/CTMedicationReminder')}
      >
        <Text style={styles.smallCardText}>Medication Reminder</Text>
      </TouchableOpacity>
    </View>


        {/* Link Elderly Button */}
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push('/LinkElderly')}
        >
          <Text style={styles.linkButtonText}>Link Elderly</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D1E7F0',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '48%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  smallCardText: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  linkButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
