import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './EventCardStyles'; // Import the separated styles

interface EventCardProps {
  title: string;
  date: string;
  image: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, image }) => {
  return (
    <TouchableOpacity style={styles.eventCard}>
      <Image source={{ uri: image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventDate}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
