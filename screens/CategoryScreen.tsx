import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import EventCard from '../components/EventCard/EventCard';
import { getAllEvents } from '../services/getEventsService';

const CategoryScreen = ({ route }) => {
  const { category } = route.params; // Recibe la categoría seleccionada
  const events = getAllEvents().filter(event => event.category === category); // Filtra los eventos

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos de {category}</Text>
      {events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              date={item.date}
              image={item.image}
            />
          )}
        />
      ) : (
        <Text style={styles.noEventsText}>No hay eventos para esta categoría.</Text>
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
  noEventsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CategoryScreen;
