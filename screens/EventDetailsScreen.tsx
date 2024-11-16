import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const EventDetailsScreen = ({ route }) => {
  const { event } = route.params;
  console.log("He reibidooo: ", event);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Event Image */}
      <Image source={{ uri: event.IMAGEN ? event.IMAGEN : event.image }} style={styles.image} />

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{event.TITULO ? event.TITULO : event.title}</Text>
      </View>

      {/* Event Details */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <MaterialIcons name="date-range" size={20} color="#6a1b9a" />
          <Text style={styles.infoText}>Fecha: {event.FINICIO ? event.FINICIO : event.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={20} color="#6a1b9a" />
          <Text style={styles.infoText}>Ubicación: {event.UBICACION ? event.UBICACION : event.location }</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{event.DESCRIPCION ? event.DESCRIPCION : event.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  image: {
    width: '100%',
    height: width * 0.6, // Makes the image responsive
    borderRadius: 12,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default EventDetailsScreen;
