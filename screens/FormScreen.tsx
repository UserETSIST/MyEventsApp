import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  ScrollView, 
  Alert,
} from 'react-native';
import { getEventTypes } from '../services/getEventsService'; 
import { Picker } from '@react-native-picker/picker';



const FormScreen = () => {
  // States for inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [contact, setContact] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(''); // Selected category ID
  const [categories, setCategories] = useState([]); // Available categories

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getEventTypes();
        setCategories(fetchedCategories); // Update categories state
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    const eventData = {
      ID_TEVE: category || "1", // ID por defecto si no se selecciona categoría
      TITULO: title || "Título por defecto", // Título por defecto
      UBICACION: location || "Ubicación por defecto", // Ubicación por defecto
      DIRECCION: address || "Dirección por defecto", // Dirección por defecto
      ENTGRATUITA: isFree ? "Sí" : "No", // Determina si es gratuito o no
      FINICIO: startDate ? `${startDate}:00.000` : "2024-11-12 00:00:00.000", // Fecha de inicio predeterminada
      FFINAL: endDate ? `${endDate}:00.000` : "2024-11-27 00:00:00.000", // Fecha final predeterminada
      DESCRIPCION: description || "Descripción por defecto", // Descripción por defecto
      IMAGEN: "https://via.placeholder.com/150", // Imagen predeterminada
      CONTACTO: contact || "Contacto por defecto", // Contacto predeterminado
      NOCONTACTO: contactNumber || "3132475803", // Número de contacto predeterminado
      EMAILCONT: email || "email@por.defecto.com", // Email predeterminado
      ESTADO: "Activo", // Estado predeterminado
    };
    

    try {
      console.log(eventData)
      const response = await fetch(
        'https://animalsveterinaria.net/go2event/api/v1.php?action=insert&table=even',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic QWRtaW46MTIzNDU=',
          },
          body: JSON.stringify(eventData),
        }
      );

      console.log("Responsee: ",response)

      if (response.ok) {
        Alert.alert('¡Éxito!', 'El evento se ha creado correctamente.');
        // Clear the form
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setLocation('');
        setAddress('');
        setIsFree(false);
        setContact('');
        setContactNumber('');
        setEmail('');
        setCategory('');
      } else {
        const errorResponse = await response.json();
        Alert.alert('Error', `No se pudo crear el evento: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error('Error creating event:', error.message);
      Alert.alert('Error', 'No se pudo conectar con la API.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Nuevo Evento</Text>

      {/* Nombre del Evento */}
      <Text style={styles.label}>Nombre del Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el nombre del evento"
        value={title}
        onChangeText={setTitle}
      />

      {/* Categoría */}
      <Text style={styles.label}>Categoría</Text>
            <View style={styles.dropdown}>
              <Picker
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}
              >
                <Picker.Item label="Selecciona una categoría" value="" />
                {categories.map((cat) => (
                  <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                ))}
              </Picker>
            </View>

      {/* Descripción */}
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe tu evento"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Fecha Inicio */}
      <Text style={styles.label}>Fecha Inicio (YYYY-MM-DD HH:MM)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: 2024-11-12 00:00"
        value={startDate}
        onChangeText={setStartDate}
      />

      {/* Fecha Final */}
      <Text style={styles.label}>Fecha Final (YYYY-MM-DD HH:MM)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: 2024-11-27 00:00"
        value={endDate}
        onChangeText={setEndDate}
      />

      {/* Ubicación */}
      <Text style={styles.label}>Ubicación</Text>
      <TextInput
        style={styles.input}
        placeholder="Ubicación. Ej: Polideportivo El Cerro"
        value={location}
        onChangeText={setLocation}
      />

      {/* Dirección */}
      <Text style={styles.label}>Dirección</Text>
      <TextInput
        style={styles.input}
        placeholder="Dirección: Ej: Calle Pablo Neruda 27"
        value={address}
        onChangeText={setAddress}
      />

      {/* Entrada Gratuita */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>¿Entrada gratuita?</Text>
        <Switch value={isFree} onValueChange={setIsFree} />
      </View>

      {/* Contacto */}
      <Text style={styles.label}>Contacto</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el nombre del contacto"
        value={contact}
        onChangeText={setContact}
      />

      {/* Número de Contacto */}
      <Text style={styles.label}>Número de Contacto</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el número de contacto"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el email de contacto"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

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
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default FormScreen;
