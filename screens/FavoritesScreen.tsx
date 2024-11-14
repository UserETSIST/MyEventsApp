import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import EventCard from "../components/EventCard/EventCard";
import { useFavorites } from "../services/FavoritesContext"; // Adjust path

const FavoritesScreen = () => {
  const { favorites } = useFavorites();

  console.log("Favorites: ", favorites)

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            id={item.id}
            title={item.title}
            date={item.date}
            image={item.image}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se han añadido favoritos aún</Text>
            <Text style={styles.subText}>
              ¡Explora los eventos y marca tus favoritos con la estrella ⭐!
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default FavoritesScreen;
