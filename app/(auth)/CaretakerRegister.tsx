import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { auth } from '../../services/auth';
import { db } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import layout from '../../styles/layout';
import typography from '../../styles/typography';

export default function CaretakerRegister({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    console.log('🔁 Register button pressed');
  
    if (!email || !password || !fullName) {
      console.log('❗ Missing fields');
      return;
    }
  
    setLoading(true);
  
    try {
      console.log('👤 Creating user...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ Firebase Auth success');
  
      const uid = userCredential.user.uid;
      console.log('📌 User UID:', uid);
  
      console.log('📝 Writing user to Firestore...');
      await setDoc(doc(db, 'users', uid), {
        fullName,
        email,
        role: 'caretaker',
      });
      console.log('✅ Firestore write success');
  
      setEmail('');
      setPassword('');
      setFullName('');
      setLoading(false);
  
      console.log('🏁 Finished registration. Navigating...');
      navigation.navigate('CaretakerLogin');
    } catch (error: any) {
      console.log('❌ Registration FAILED:', error.message);
      setLoading(false);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={layout.container}>
        <Image
          source={require('../../assets/images/wellnest_logo.png')}
          style={{
            width: 180,
            height: 180,
            resizeMode: 'contain',
            marginBottom: 20,
            marginTop: 40,
          }}
        />

        <View style={styles.card}>
          <Text style={[typography.heading, { color: '#fff', marginBottom: 20 }]}>
            Register
          </Text>

          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#000"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />

          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#000"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity
            style={[layout.button, loading && { opacity: 0.6 }]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={typography.button}>
              {loading ? 'Registering...' : 'Register'}
            </Text>
          </TouchableOpacity>

          {/* ✅ Visible Feedback Instead of Alert */}
          {loading && (
            <Text style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>
              Processing...
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#3D5A80',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
    width: '100%',
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
});
