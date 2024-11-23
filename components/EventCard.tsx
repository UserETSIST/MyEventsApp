import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface EventCardProps {
  title: string;
  date: string;
  image: string;
  onPress: () => void;
}

export default function EventCard({
  title,
  date,
  image,
  onPress,
}: EventCardProps) {
  return (
    <TouchableOpacity style={styles.eventCard} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventDate}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventDetails: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  eventDate: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
