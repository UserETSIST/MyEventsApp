// components/EventCard/EventCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; 
import styles from './EventCardStyles';
import { useFavorites } from '../../services/FavoritesContext'; 
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  image: string;
  onPress: () => void; // New prop for handling card clicks
}

const EventCard: React.FC<EventCardProps> = ({ id, title, date, image, onPress }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleFavoriteToggle = () => {
    toggleFavorite({ id, title, date, image }); 
  };

  return (
    <TouchableOpacity style={styles.eventCard} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventDate}>{date}</Text>
      </View>

      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteToggle}>
        <MaterialCommunityIcons
          name={isFavorite(id) ? 'star' : 'star-outline'}
          size={24}
          color={isFavorite(id) ? 'gold' : '#888'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default EventCard;
