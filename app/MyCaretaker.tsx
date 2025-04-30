import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth } from './services/auth'; // Adjust path if needed
import * as Clipboard from 'expo-clipboard';

export default function MyCaretaker() {
  const uid = auth.currentUser?.uid;

  const copyToClipboard = async () => {
    if (uid) {
      await Clipboard.setStringAsync(uid);
      Alert.alert('Copied!', 'Elderly ID copied to clipboard.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Elderly ID</Text>

      <Text selectable style={styles.uidText}>
        {uid}
      </Text>

      <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
        <Text style={styles.buttonText}>📋 Copy ID</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1E7F0',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  uidText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3D5A80',
    marginBottom: 20,
    textAlign: 'center',
  },
  copyButton: {
    backgroundColor: '#3D5A80',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
