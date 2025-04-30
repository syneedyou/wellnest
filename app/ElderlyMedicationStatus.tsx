import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { auth, firestore } from './services/auth';

export default function ElderlyMedicationStatus() {
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [markedStatus, setMarkedStatus] = useState<{ [id: string]: 'taken' | 'missed' }>({});

  useEffect(() => {
    const fetchTodayReminders = async () => {
      const userId = auth.currentUser?.uid;
      console.log('🔑 Elderly UID:', userId);
    
      if (!userId) return;
    
      try {
        const today = new Date();
        const options = { weekday: 'long' } as const;
        const dayName = today.toLocaleDateString('en-US', options);
        console.log('📅 Today is:', dayName);
    
        const q = query(
          collection(firestore, 'medicationReminders'),
          where('elderlyId', '==', userId),
          where('reminderDay', '==', dayName)
        );
    
        const snapshot = await getDocs(q);
        console.log('📦 Reminder documents found:', snapshot.docs.length);
    
        const list = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        console.log('🧾 Reminders:', list);
    
        setReminders(list);
      } catch (err) {
        console.error('❌ Error fetching reminders:', err);
      } finally {
        setLoading(false);
      }
    };
    

    fetchTodayReminders();
  }, []);

  const handleStatusUpdate = async (id: string, status: 'taken' | 'missed') => {
    setMarkedStatus((prev) => ({ ...prev, [id]: status }));
    Alert.alert(
      status === 'taken' ? '✅ Taken' : '⚠️ Missed',
      `You have marked this medication as ${status}.`
    );

    try {
      const ref = doc(firestore, 'medicationReminders', id);
      await updateDoc(ref, { status });
    } catch (err) {
      console.error('Error updating reminder status:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Today's Medication Reminders</Text>

      {loading ? (
        <Text style={styles.info}>Loading...</Text>
      ) : reminders.length === 0 ? (
        <Text style={styles.info}>No medications scheduled for today.</Text>
      ) : (
        reminders.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.medicineName}>{item.medicineName}</Text>
            <Text style={styles.reminderTime}>Time: {item.reminderTime}</Text>

            {!markedStatus[item.id] ? (
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonTaken]}
                  onPress={() => handleStatusUpdate(item.id, 'taken')}
                >
                  <Text style={styles.buttonText}>I Took It</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonMissed]}
                  onPress={() => handleStatusUpdate(item.id, 'missed')}
                >
                  <Text style={styles.buttonText}>I Missed It</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={
                markedStatus[item.id] === 'taken' ? styles.statusTaken : styles.statusMissed
              }>
                {markedStatus[item.id] === 'taken' ? '✅ Marked as Taken' : '⚠️ Marked as Missed'}
              </Text>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0FAF9',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reminderTime: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonTaken: {
    backgroundColor: '#4CAF50',
  },
  buttonMissed: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  statusTaken: {
    marginTop: 10,
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
  },
  statusMissed: {
    marginTop: 10,
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});
