import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, firestore } from './services/auth'; // adjust if needed

// Define Elderly type
type Elderly = {
  id: string;
  fullName: string;
  email: string;
};

export default function MyElderlyList() {
  const [elderlyList, setElderlyList] = useState<Elderly[]>([]);
  const [loading, setLoading] = useState(true);

  const caretakerUID = auth.currentUser?.uid;

  useEffect(() => {
    const fetchElderly = async () => {
      try {
        const q = query(
          collection(firestore, 'users'),
          where('caretakerUID', '==', caretakerUID),
          where('role', '==', 'elderly') // optional filter for safety
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Elderly, 'id'>),
        }));

        setElderlyList(data);
      } catch (error) {
        console.error('Error fetching elderly:', error);
      } finally {
        setLoading(false);
      }
    };

    if (caretakerUID) {
      fetchElderly();
    }
  }, [caretakerUID]);

  return (
    <View style={styles.safeArea}>
      <Text style={styles.title}>My Elderly</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3D5A80" />
      ) : elderlyList.length === 0 ? (
        <Text style={styles.emptyText}>No elderly linked yet.</Text>
      ) : (
        <FlatList
          data={elderlyList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.fullName}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.uid}>ID: {item.id}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D1E7F0',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  uid: {
    fontSize: 12,
    color: '#999',
    marginTop: 10,
  },
});
