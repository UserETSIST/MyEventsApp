import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    position: 'relative', // Enables absolute positioning for the favorite button
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventDetails: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
    borderRadius: 16,
    padding: 6,
    elevation: 3, // Adds shadow to the button
  },
});

export default styles;
