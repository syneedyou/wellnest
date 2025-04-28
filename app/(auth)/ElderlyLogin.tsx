import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../services/auth'; // ✅ correct import
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore'; // ✅ doc() not collection()

export default function ElderlyLogin() {
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

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🧠 Debugging output
      console.log('firestore check:', firestore);
      console.log('firestore app name:', firestore.app.name);

      // ✅ Use doc() to get user's document
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        if (userData.role !== 'elderly') {
          setLoading(false);
          Alert.alert('Access Denied', 'You are not registered as an Elderly user.');
          await auth.signOut();
          return;
        }

        setLoading(false);
        Alert.alert('Login successful');
        router.replace('/ElderlyHomepage');

      } else {
        setLoading(false);
        Alert.alert('Login Error', 'User data not found.');
        await auth.signOut();
      }

    } catch (error: any) {
      console.error('Login error:', error);
      setLoading(false);
      Alert.alert('Login failed', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/wellnest_logo.png')}
          style={styles.logo}
        />

        <Text style={styles.heading}>Your wellness journey awaits, login to continue!</Text>

        <View style={styles.card}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#000"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#000"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.footerText}>
            Don’t have an account?{' '}
            <Text
              style={styles.link}
              onPress={() => router.push('/(auth)/ElderlyRegister')}
            >
              Register now
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#3f5b82',
    padding: 24,
    width: '100%',
    borderRadius: 20,
    gap: 15,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3D5A80',
  },
  button: {
    backgroundColor: '#a0d8db',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
    color: '#000',
  },
  link: {
    color: '#3D5A80',
    fontWeight: 'bold',
  },
});
