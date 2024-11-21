import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import EventCard from '../components/EventCard/EventCard';
import { getEventsByCategory } from '../services/getEventsService'; // Función que acabamos de crear
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define navigation type
type RootStackParamList = {
  EventDetailsScreen: { event: any };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'EventDetailsScreen'>;

const CategoryScreen = ({ route }) => {
  const { categoryId, categoryName } = route.params; 
  const navigation = useNavigation<NavigationProp>();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsByCategory = await getEventsByCategory(categoryId);
        setEvents(eventsByCategory);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos de {categoryName}</Text>
      {loading ? (
        <Text style={styles.loadingText}>Cargando eventos...</Text>
      ) : events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.ID}
          renderItem={({ item }) => (
            <EventCard
              id={item.ID}
              title={item.TITULO}
              date={item.FINICIO}
              image={item.IMAGEN}
              onPress={() =>
                navigation.navigate('EventDetailsScreen', { event: item })
              }
            />
          )}
        />
      ) : (
        <Text style={styles.noEventsText}>
          No hay eventos para esta categoría.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  noEventsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CategoryScreen;
