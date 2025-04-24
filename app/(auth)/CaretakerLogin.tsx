import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/auth';
import { useRouter } from 'expo-router';

export default function CaretakerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      Alert.alert('Login successful');
      router.replace('/CaretakerHomepage'); // Update this to your actual caretaker home route
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Login failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/wellnest_logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Hi, Caretaker!</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#000"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#000"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Processing...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
  <Text style={{ color: '#000' }}>
    Don’t have an account?{' '}
    <Text
      style={{ color: '#3D5A80', fontWeight: 'bold' }}
      onPress={() => router.push('/(auth)/CaretakerRegister')}
    >
      Register now
    </Text>
  </Text>
</View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 24,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#3D5A80',
  },
  button: {
    backgroundColor: '#3D5A80',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
