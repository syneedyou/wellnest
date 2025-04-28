import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '@/services/auth';

export default function CTMedicationReminder() {
  const [elderlyList, setElderlyList] = useState<string[]>([]);
  const [selectedElderly, setSelectedElderly] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const fetchElderly = async () => {
      try {
        const q = query(collection(firestore, 'users'), where('role', '==', 'elderly'));
        const querySnapshot = await getDocs(q);
        const names: string[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.fullName) {
            names.push(data.fullName);
          } else if (data.email) {
            names.push(data.email); // fallback if no name
          }
        });
        setElderlyList(names);
      } catch (error) {
        console.error('Error fetching elderly:', error);
      }
    };

    fetchElderly();
  }, []);

  const handleSetReminder = () => {
    alert(`Reminder set for ${selectedElderly}: ${medicineName} at ${time.toLocaleTimeString()}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Medication Reminder</Text>

      <Text style={styles.label}>Select Elderly:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedElderly}
          onValueChange={(itemValue) => setSelectedElderly(itemValue)}
        >
          <Picker.Item label="-- Select Elderly --" value="" />
          {elderlyList.map((name, index) => (
            <Picker.Item key={index} label={name} value={name} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Medicine Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Medicine Name"
        value={medicineName}
        onChangeText={setMedicineName}
      />

      <Text style={styles.label}>Reminder Time:</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.timeButton}>
        <Text style={styles.timeButtonText}>{time.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setTime(selectedTime);
            }
          }}
        />
      )}

      <Button title="Set Reminder" onPress={handleSetReminder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginTop: 15, marginBottom: 5, color: '#555' },
  input: { borderWidth: 1, borderColor: '#aaa', padding: 10, borderRadius: 8, marginBottom: 15 },
  pickerContainer: { borderWidth: 1, borderColor: '#aaa', borderRadius: 8, marginBottom: 15, overflow: 'hidden' },
  timeButton: { borderWidth: 1, borderColor: '#aaa', borderRadius: 8, padding: 10, alignItems: 'center', marginBottom: 20 },
  timeButtonText: { fontSize: 16, color: '#000' },
});
