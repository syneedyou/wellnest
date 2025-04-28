import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Link Elderly by ID</Text>

      <TextInput
        placeholder="Enter Elderly ID"
        value={elderlyID}
        onChangeText={setElderlyID}
        style={styles.input}
      />

      <Button title="Link Elderly" onPress={linkElderly} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    height: 50,
    borderColor: '#B2DDF0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
