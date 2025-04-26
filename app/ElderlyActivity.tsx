import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function ElderlyActivity() {
  const activities = [
    { name: 'Cooking' },
    { name: 'Sewing' },
    { name: 'Gardening' },
    { name: 'Walk' },
    { name: 'Mosque' },
    { name: 'Grocery' },
  ];

  const handleActivityPress = (activityName: string) => {
    // 🧠 In future: Save to database here!

    // 🛎️ Show success message
    Alert.alert(
      "Activity Logged!",
      `Great! You selected ${activityName}. Have a good time and stay safe! 🌟`,
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.pageTitle}>Select Activity</Text>

        <View style={styles.grid}>
          {activities.map((activity, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.activityCard}
              onPress={() => handleActivityPress(activity.name)}
            >
              <Text style={styles.activityText}>{activity.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D1E7F0',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 30,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  activityText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
