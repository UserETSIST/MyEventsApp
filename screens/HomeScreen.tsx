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
import { getRandomEvents } from '../services/getEventsService';
import CustomButton from '../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();

  const categories = [
    { id: '1', name: 'Conciertos' },
    { id: '2', name: 'Exposiciones' },
    { id: '3', name: 'Deportes' },
    { id: '4', name: 'Teatro' },
    { id: '5', name: 'Tecnología' },
    { id: '6', name: 'Cultura' },
  ];

  const [events, setEvents] = useState([]);

  // Fetch random events when the screen loads
  useEffect(() => {
    fetchRandomEvents();
  }, []);

  // Function to fetch random events
  const fetchRandomEvents = () => {
    const fetchedEvents = getRandomEvents();
    setEvents(fetchedEvents);
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
          <FlatList
            data={categories}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() =>
                  navigation.navigate('CategoryScreen', { category: item.name })
                }
              >
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Featured Events */}
        <View style={styles.featuredEvents}>
          <Text style={styles.sectionTitle}>Eventos destacados</Text>
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
              />
            )}
          />
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
});

export default HomeScreen;
