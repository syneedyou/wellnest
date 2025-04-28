import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ElderlyMedicationStatus() {
  // In future, this will come from database
  const [medicationTaken, setMedicationTaken] = useState(false);
  const [medicationMissed, setMedicationMissed] = useState(false);

  const handleTaken = () => {
    setMedicationTaken(true);
    alert('Medication marked as Taken!');
  };

  const handleMissed = () => {
    setMedicationMissed(true);
    alert('Medication marked as Missed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Medication Reminder</Text>

      {!medicationTaken && !medicationMissed ? (
        <>
          <Button title="I Took It" onPress={handleTaken} />
          <View style={{ margin: 10 }} />
          <Button title="I Missed It" onPress={handleMissed} />
        </>
      ) : medicationTaken ? (
        <Text style={styles.success}>✅ You have taken your medication!</Text>
      ) : (
        <Text style={styles.error}>⚠️ You missed your medication!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  success: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
