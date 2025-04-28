import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { auth } from './services/auth';


export default function MyCaretaker() {
  const uid = auth.currentUser?.uid; // Get Elderly's UID from Firebase Authentication

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share this QR code with your Caretaker!</Text>

      {uid ? (
        <View style={styles.qrContainer}>
          <QRCode
            value={uid}
            size={220}
          />
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading QR Code...</Text>
      )}
      <View style={{ marginTop: 20 }}>
  <Text style={{ fontSize: 18 }}>Your Elderly ID:</Text>
  <Text selectable style={{ fontSize: 20, fontWeight: 'bold', color: '#3D5A80', marginTop: 5 }}>
    {uid}
  </Text>
</View>

    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1E7F0', // match your WellNest theme
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  qrContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
});
