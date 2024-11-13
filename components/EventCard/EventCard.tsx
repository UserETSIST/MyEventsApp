import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // For the star icon
import styles from './EventCardStyles';

interface EventCardProps {
  title: string;
  date: string;
  image: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, image }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity style={styles.eventCard}>
      <Image source={{ uri: image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventDate}>{date}</Text>
      </View>

      {/* Favorite Button */}
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <MaterialCommunityIcons
          name={isFavorite ? 'star' : 'star-outline'}
          size={24}
          color={isFavorite ? 'gold' : '#888'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default EventCard;
