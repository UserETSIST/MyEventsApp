import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import EventCard from '../components/EventCard/EventCard';
import { getAllEvents } from '../services/getEventsService';

const CategoryScreen = ({ route }) => {
  const { category } = route.params; // Receives the selected category

  const [events, setEvents] = useState([]); // State to store events
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true); // Start loading
        const allEvents = await getAllEvents(); // Fetch all events
        const filteredEvents = allEvents.filter(
          (event) => event.category === category
        ); // Filter events by category
        setEvents(filteredEvents); // Update state with filtered events
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEvents(); // Trigger the fetch
  }, [category]); // Run this effect whenever the category changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos de {category}</Text>
      {loading ? (
        <Text style={styles.loadingText}>Cargando eventos...</Text>
      ) : events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              id={item.id} // Pass the id of the event
              title={item.title}
              date={item.date}
              image={item.image}
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
