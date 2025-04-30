import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc as firestoreDoc,
  orderBy,
} from 'firebase/firestore';
import { auth, firestore } from './services/auth';

export default function CTMedicationReminder() {
  const [elderlyList, setElderlyList] = useState<{ id: string; name: string }[]>([]);
  const [selectedElderly, setSelectedElderly] = useState<string>('');
  const [medicineName, setMedicineName] = useState('');
  const [reminderDay, setReminderDay] = useState('');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminders, setReminders] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchElderlyList = async () => {
      const caretakerUID = auth.currentUser?.uid;
      if (!caretakerUID) return;

      try {
        const q = query(
          collection(firestore, 'users'),
          where('caretakerUID', '==', caretakerUID),
          where('role', '==', 'elderly')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().fullName || doc.data().email || 'Unnamed Elderly',
        }));
        setElderlyList(data);
      } catch (err) {
        console.error('Error fetching elderly list:', err);
      }
    };

    fetchElderlyList();
  }, []);

  const fetchReminders = async (elderlyId: string) => {
    try {
      const q = query(
        collection(firestore, 'medicationReminders'),
        where('elderlyId', '==', elderlyId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReminders(list);
    } catch (err) {
      console.error('Error fetching reminders:', err);
    }
  };

  const handleSaveReminder = async () => {
    if (!selectedElderly || !medicineName || !reminderDay) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const elderly = elderlyList.find((e) => e.id === selectedElderly);
    if (!elderly) {
      Alert.alert('Error', 'Selected elderly not found.');
      return;
    }

    const reminderData = {
      elderlyId: elderly.id,
      elderlyName: elderly.name,
      medicineName,
      reminderDay,
      reminderTime: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date(),
    };

    try {
      if (editingId) {
        await deleteDoc(firestoreDoc(firestore, 'medicationReminders', editingId));
        await addDoc(collection(firestore, 'medicationReminders'), reminderData);
        Alert.alert('Updated', 'Reminder successfully updated.');
      } else {
        await addDoc(collection(firestore, 'medicationReminders'), reminderData);
        Alert.alert('Success', `Reminder for ${elderly.name} has been saved!`);
      }

      // Reset form
      setSelectedElderly('');
      setMedicineName('');
      setReminderDay('');
      setTime(new Date());
      setEditingId(null);
      fetchReminders(elderly.id);
    } catch (err) {
      console.error('Error saving reminder:', err);
      Alert.alert('Error', 'Failed to save reminder.');
    }
  };

  const handleEditReminder = (reminder: any) => {
    setSelectedElderly(reminder.elderlyId);
    setMedicineName(reminder.medicineName);
    setReminderDay(reminder.reminderDay || '');
    const [hour, minute] = reminder.reminderTime
      .replace(/\s?AM|PM/i, '')
      .split(':')
      .map((v: string) => parseInt(v));
    const newTime = new Date();
    newTime.setHours(reminder.reminderTime.includes('PM') && hour < 12 ? hour + 12 : hour);
    newTime.setMinutes(minute);
    setTime(newTime);
    setEditingId(reminder.id);
    fetchReminders(reminder.elderlyId);
  };

  const handleDeleteReminder = async (reminderId: string) => {
    try {
      await deleteDoc(firestoreDoc(firestore, 'medicationReminders', reminderId));
      if (selectedElderly) fetchReminders(selectedElderly);
      Alert.alert('Deleted', 'Reminder has been removed.');
    } catch (err) {
      console.error('Error deleting reminder:', err);
      Alert.alert('Error', 'Failed to delete reminder.');
    }
  };

  useEffect(() => {
    if (selectedElderly) {
      fetchReminders(selectedElderly);
    } else {
      setReminders([]);
    }
  }, [selectedElderly]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Set Medication Reminder</Text>

      <Text style={styles.label}>Select Elderly:</Text>
      <View style={styles.elderlyCardContainer}>
        {elderlyList.map((elderly) => (
          <TouchableOpacity
            key={elderly.id}
            style={[
              styles.elderlyCard,
              selectedElderly === elderly.id && styles.elderlyCardSelected,
            ]}
            onPress={() => setSelectedElderly(elderly.id)}
          >
            <Text
              style={[
                styles.elderlyCardText,
                selectedElderly === elderly.id && styles.elderlyCardSelectedText,
              ]}
            >
              {elderly.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Medicine Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Medicine Name"
        value={medicineName}
        onChangeText={setMedicineName}
      />

      <Text style={styles.label}>Reminder Day:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={reminderDay}
          onValueChange={(value) => setReminderDay(value)}
        >
          <Picker.Item label="-- Select Day --" value="" />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
      </View>

      <Text style={styles.label}>Reminder Time:</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.timeButton}>
        <Text style={styles.timeButtonText}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}

      <Button
        title={editingId ? 'Update Reminder' : 'Set Reminder'}
        onPress={handleSaveReminder}
      />

      <Text style={styles.subtitle}>Existing Reminders</Text>
      {reminders.length === 0 ? (
        <Text style={styles.emptyText}>No reminders set yet.</Text>
      ) : (
        reminders.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.medicineName}</Text>
            <Text style={styles.cardTime}>Day: {item.reminderDay}</Text>
            <Text style={styles.cardTime}>Time: {item.reminderTime}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => handleEditReminder(item)}>
                <Text style={styles.editText}>✏️ Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert('Confirm', 'Delete this reminder?', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: () => handleDeleteReminder(item.id) },
                  ])
                }
              >
                <Text style={styles.deleteText}>🗑 Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#EAF4F4',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  elderlyCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  elderlyCard: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  elderlyCardSelected: {
    backgroundColor: '#3D5A80',
    borderColor: '#3D5A80',
  },
  elderlyCardText: {
    color: '#000',
  },
  elderlyCardSelectedText: {
    color: '#fff',
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  timeButtonText: {
    fontSize: 16,
    color: '#000',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 15,
    color: 'gray',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardTime: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editText: {
    color: '#007AFF',
    fontSize: 14,
  },
  deleteText: {
    color: 'red',
    fontSize: 14,
  },
});
