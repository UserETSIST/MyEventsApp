import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import EventCard from '../components/EventCard/EventCard';
import { getRandomEvents, getEventTypes } from '../services/getEventsService'; 
import CustomButton from '../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the navigation parameter types
export type RootStackParamList = {
  HomeScreen: undefined;
  CategoryScreen: { category: string };
  EventDetailsScreen: { event: any }; // Add EventDetailsScreen
  New: undefined;
};

// Define the navigation prop type for HomeScreen
type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

function HomeScreen() {
  const navigation = useNavigation<NavigationProp>(); // Use typed navigation prop

  const [categories, setCategories] = useState([]); // Dynamic categories state
  const [events, setEvents] = useState([]); // State for storing events
  const [loading, setLoading] = useState(false); // State to handle loading categories or events

  // Fetch categories and random events when the screen loads
  useEffect(() => {
    fetchCategories(); // Load categories from API
    fetchRandomEvents(); // Load initial random events
  }, []);

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    try {
      setLoading(true); // Start loading
      const fetchedCategories = await getEventTypes(); // Fetch event types from API
      setCategories(fetchedCategories); // Update state with fetched categories
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to fetch random events
  const fetchRandomEvents = async () => {
    try {
      setLoading(true); // Start loading
      const fetchedEvents = await getRandomEvents(); // Wait for async function
      setEvents(fetchedEvents); // Update state with new events
    } catch (error) {
      console.error('Error fetching random events:', error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Navigate to the CategoryScreen with the selected category
  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate('CategoryScreen', { category: categoryName });
  };

  // Navigate to the EventDetailsScreen for the selected event
  const handleEventPress = (event: any) => {
    navigation.navigate('EventDetailsScreen', { event });
  };

  return (
    <ImageBackground
      source={require('../assets/Focos.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eventos en tu ciudad</Text>
          <CustomButton
            title="Añadir evento"
            onPress={() => navigation.navigate('New')}
          />
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          {loading ? (
            <Text style={styles.loadingText}>Cargando categorías...</Text>
          ) : (
            <FlatList
              data={categories}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => handleCategoryPress(item.name)} // Navigate using the helper function
                >
                  <Text style={styles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* Featured Events */}
        <View style={styles.featuredEvents}>
          <Text style={styles.sectionTitle}>Eventos destacados</Text>
          {loading ? (
            <Text style={styles.loadingText}>Cargando eventos...</Text>
          ) : (
            <FlatList
              data={events}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <EventCard
                  id={item.id} // Pass the unique ID
                  title={item.title}
                  date={item.date}
                  image={item.image}
                  onPress={() => handleEventPress(item)} // Navigate to EventDetailsScreen
                />
              )}
            />
          )}
        </View>

        {/* Button to Load New Events */}
        <CustomButton
          title="Cargar nuevos eventos"
          onPress={fetchRandomEvents}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    marginTop: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  categories: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginLeft: 10,
  },
  categoryItem: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  featuredEvents: {
    marginTop: 20,
  },
  loadingText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default HomeScreen;
