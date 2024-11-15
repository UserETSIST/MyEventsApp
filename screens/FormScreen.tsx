import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { getEventTypes } from '../services/getEventsService';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal'; // Import the modal library

const FormScreen = () => {
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
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [modalMessage, setModalMessage] = useState(''); // Modal message state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getEventTypes();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    const eventData = {
      ID_TEVE: category || '1',
      TITULO: title || 'Título por defecto',
      UBICACION: location || 'Ubicación por defecto',
      DIRECCION: address || 'Dirección por defecto',
      ENTGRATUITA: isFree ? 'Sí' : 'No',
      FINICIO: startDate ? `${startDate}:00.000` : '2024-11-12 00:00:00.000',
      FFINAL: endDate ? `${endDate}:00.000` : '2024-11-27 00:00:00.000',
      DESCRIPCION: description || 'Descripción por defecto',
      IMAGEN: 'https://via.placeholder.com/150',
      CONTACTO: contact || 'Contacto por defecto',
      NOCONTACTO: contactNumber || '3132475803',
      EMAILCONT: email || 'email@por.defecto.com',
      ESTADO: 'Activo',
    };

    try {
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

      if (response.ok) {
        setModalMessage('¡Éxito! El evento se ha creado correctamente.');
        setIsModalVisible(true);
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
        setModalMessage(`Error: No se pudo crear el evento: ${errorResponse.message}`);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error creating event:', error.message);
      setModalMessage('Error: No se pudo conectar con la API.');
      setIsModalVisible(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Nuevo Evento</Text>

      <Text style={styles.label}>Nombre del Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el nombre del evento"
        value={title}
        onChangeText={setTitle}
      />

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

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe tu evento"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Fecha Inicio (YYYY-MM-DD HH:MM)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: 2024-11-12 00:00"
        value={startDate}
        onChangeText={setStartDate}
      />

      <Text style={styles.label}>Fecha Final (YYYY-MM-DD HH:MM)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: 2024-11-27 00:00"
        value={endDate}
        onChangeText={setEndDate}
      />

      <Text style={styles.label}>Ubicación</Text>
      <TextInput
        style={styles.input}
        placeholder="Ubicación. Ej: Polideportivo El Cerro"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Dirección</Text>
      <TextInput
        style={styles.input}
        placeholder="Dirección: Ej: Calle Pablo Neruda 27"
        value={address}
        onChangeText={setAddress}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>¿Entrada gratuita?</Text>
        <Switch value={isFree} onValueChange={setIsFree} />
      </View>

      <Text style={styles.label}>Contacto</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el nombre del contacto"
        value={contact}
        onChangeText={setContact}
      />

      <Text style={styles.label}>Número de Contacto</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el número de contacto"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce el email de contacto"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Guardar Evento</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f4f4f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6a1b9a',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
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
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#6a1b9a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#6a1b9a',
    padding: 10,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FormScreen;
