import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: '#45a049', // Darker green for press feedback
    transform: [{ scale: 0.96 }], // Slightly shrink the button when pressed
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
