import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { auth, firestore } from './services/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function LinkElderly() {
  const [elderlyID, setElderlyID] = useState('');
  const router = useRouter();

  const linkElderly = async () => {
    try {
      const caretakerUID = auth.currentUser?.uid;
      if (!caretakerUID) throw new Error('Caretaker not logged in.');

      const elderlyDocRef = doc(firestore, 'users', elderlyID);
      await updateDoc(elderlyDocRef, {
        caretakerUID: caretakerUID,
      });

      Alert.alert('Success!', 'Elderly linked successfully!');
      router.replace('/CaretakerHomepage');
    } catch (error) {
      console.error('Error linking elderly:', error);
      Alert.alert('Error', 'Failed to link elderly. Please check the ID.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Link Elderly</Text>

        <View style={styles.card}>
          <TextInput
            placeholder="Enter Elderly ID"
            value={elderlyID}
            onChangeText={setElderlyID}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={linkElderly}>
            <Text style={styles.buttonText}>Link Elderly</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    height: 50,
    borderColor: '#B2DDF0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3D5A80',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
