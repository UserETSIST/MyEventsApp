import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; 
import styles from './EventCardStyles';
import { useFavorites } from '../../services/FavoritesContext'; 

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  image: string;
}

const EventCard: React.FC<EventCardProps> = ({ id, title, date, image }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleFavoriteToggle = () => {
    toggleFavorite({ id, title, date, image }); // Use the `toggleFavorite` function from the context
  };

  return (
    <TouchableOpacity style={styles.eventCard}>
      <Image source={{ uri: image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventDate}>{date}</Text>
      </View>

      {/* Favorite Button */}
      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteToggle}>
        <MaterialCommunityIcons
          name={isFavorite(id) ? 'star' : 'star-outline'} // Use the `isFavorite` function to determine the state
          size={24}
          color={isFavorite(id) ? 'gold' : '#888'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default EventCard;
