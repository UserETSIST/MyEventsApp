import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigation from './navigation/Navigation';

export default function App() {
  return (
   <Navigation></Navigation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Adjust alignment as needed
  },
});
