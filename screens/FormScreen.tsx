import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';

const FormScreen = () => {
  // States for inputs
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Concierto');
  const [price, setPrice] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = () => {
    // Here you can send the event data to a server or handle it as needed
    console.log({
      eventName,
      description,
      date,
      time,
      location,
      category,
      price,
      isPublic,
    });
    alert('¡Evento creado con éxito!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Nuevo Evento</Text>

      {/* Nombre del Evento */}
      <Text style={styles.label}>Nombre del Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el nombre del evento"
        value={eventName}
        onChangeText={setEventName}
      />

      {/* Descripción */}
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe tu evento"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Fecha */}
      <Text style={styles.label}>Fecha (DD/MM/YYYY)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: 25/12/2024"
        value={date}
        onChangeText={setDate}
        keyboardType="numeric"
      />

      {/* Hora */}
      <Text style={styles.label}>Hora (HH:MM)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: 18:30"
        value={time}
        onChangeText={setTime}
        keyboardType="numeric"
      />

      {/* Ubicación */}
      <Text style={styles.label}>Ubicación</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce la dirección del evento"
        value={location}
        onChangeText={setLocation}
      />

      {/* Categoría */}
      <Text style={styles.label}>Categoría</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: Concierto, Conferencia"
        value={category}
        onChangeText={setCategory}
      />

      {/* Precio */}
      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el precio (Ejemplo: 0 para gratuito)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Evento Público */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>¿Evento público?</Text>
        <Switch value={isPublic} onValueChange={setIsPublic} />
      </View>

      {/* Botón para Guardar */}
      <Button title="Guardar Evento" onPress={handleSubmit} color="purple" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'purple',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default FormScreen;
