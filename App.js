import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigation from './navigation/Navigation';
import { FavoritesProvider } from './services/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <Navigation></Navigation>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Adjust alignment as needed
  },
});
