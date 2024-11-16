import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import EventCard from "../components/EventCard/EventCard";
import { useFavorites } from "../services/FavoritesContext"; // Adjust path
import Modal from "react-native-modal";

const FavoritesScreen = () => {
  const { favorites } = useFavorites();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
            onPress={toggleModal} // Toggle the modal on press
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

      {/* Custom Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal} // Close modal when tapping outside
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Información del evento</Text>
          <Text style={styles.modalMessage}>
            Para ver más información sobre el evento, acceda desde el menú principal o desde la ventana de filtros.
          </Text>
          <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4CAF50",
  },
  modalMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FavoritesScreen;
