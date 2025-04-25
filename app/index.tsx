import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let’s get started!</Text>

      <Image
        source={require('../assets/images/wellnest_logo.png')} // Adjust path if needed
        style={styles.logo}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/(auth)/CaretakerLogin')}>
        <Text style={styles.buttonText}>Caretaker</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/(auth)/ElderlyLogin')}>
        <Text style={styles.buttonText}>Elderly</Text>
      </TouchableOpacity>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3D5A80',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
