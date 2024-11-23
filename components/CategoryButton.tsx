import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CategoryButtonProps {
  onPress: () => void;
  text: string;
}

export default function CategoryButton({ onPress, text }: CategoryButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={[styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 16,
  },
  text: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});
