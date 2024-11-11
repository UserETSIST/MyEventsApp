import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
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
});

export default styles;
