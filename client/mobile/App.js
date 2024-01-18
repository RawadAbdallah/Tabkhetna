import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19181a',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:{
    color: 'black',
    backgroundColor: 'white',
    padding: 10,
    fontSize: 14,
    borderRadius: 12
  }
});
