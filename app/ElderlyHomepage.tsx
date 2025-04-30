import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ElderlyHomepage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Greeting */}
        <Text style={styles.greeting}>Hi, Sir!</Text>

        {/* Vital Log Card */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Vital Log</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </TouchableOpacity>

        {/* Activity Log Card */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => router.push('/ElderlyActivity')}
        >
          <Text style={styles.cardTitle}>Activity Log</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </TouchableOpacity>

        {/* Medication Reminder Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/ElderlyMedicationStatus')}
          >
            <Text style={styles.cardTitle}>Medication Reminder</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </TouchableOpacity>


        {/* Bottom Two Cards */}
        <View style={styles.row}>
          {/* Tapping this goes to MyCaretaker.tsx */}
          <TouchableOpacity 
            style={styles.smallCard}
            onPress={() => router.push('/MyCaretaker')}
          >
            <Text style={styles.smallCardText}>My Caretaker</Text>
          </TouchableOpacity>

          <View style={styles.smallCard}>
            <Text style={styles.smallCardText}>Widget</Text>
          </View>
        </View>

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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#B2DDF0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#6EC1E4',
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
});
