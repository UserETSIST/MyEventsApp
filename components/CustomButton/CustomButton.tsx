import React from 'react';
import { Pressable, Text } from 'react-native';
import styles from './CustomButtonStyles'; 

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed, 
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;
