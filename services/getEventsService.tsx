import { useState, useEffect } from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ImageSourcePropType,
  FlatList,
} from "react-native";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

interface Category {
  ID: string;
  DESCRIPCION: string;
  ESTADO: string;
}
interface Event {
  ID: string;
  ID_TEVE: number;
  TITULO: string;
  UBICACION: string;
  DIRECCION: string;
  ENTGRATUITA: string;
  FINICIO: string;
  FFINAL: string;
  DESCRIPCION: string;
  IMAGEN: string;
  CONTACTO: string;
  NOCONTACTO: string;
  EMAILCONT: string;
  ESTADO: string;
  DESTACADO: number | null;
}

export const getAllEvents = async () => {
  //
  // console.error('API_BASE_URL:', API_BASE_URL);
  const API_URL = `${API_BASE_URL}/list/even`;
  const headers = {
    Authorization: API_KEY,
  };

  try {
    console.log('Fetching events from API...');
    const response = await fetch(API_URL, { headers });

    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
      return [];
    }

    const apiEvents = await response.json();
    // Verificar que apiEventTypes y apiEventTypes.data no sean undefined
    if (!apiEvents || !apiEvents.registros) {
      //throw new Error('La respuesta de la API (getAllEvents) no contiene datos válidos.');
      return [];
    }

    const eventsData = apiEvents.registros; // Array de eventos

    // Obtener los tipos de eventos
    const eventTypes = await getEventTypes();

    // Mapear y transformar los eventos
    const transformedEvents = eventsData.map((event: any) => {
      // Buscar la categoría correspondiente
      const matchedCategory = eventTypes.find(
        (type) => type.id === event.ID_TEVE.toString()
      );

      return {
        id: event.ID.toString(),
        title: event.TITULO || 'Evento sin título', // Default if title is null
        date: event.FINICIO.split(' ')[0], // Extract date
        time: event.FINICIO.split(' ')[1], // Extract time
        description: event.DESCRIPCION || 'Sin descripción disponible',
        location: event.UBICACION || 'Ubicación no especificada',
        category: matchedCategory ? matchedCategory.name : 'General', // Asignar nombre de categoría
        price: event.ENTGRATUITA === 'Si' ? 0 : 20, // Lógica de precio
        isPublic: event.ENTGRATUITA === 'Si', // Determinar si es público
        image: event.IMAGEN || 'https://via.placeholder.com/150', // Fallback image
      };
    });

    return transformedEvents;
  } catch (error) {
    console.error('Error loading events:', error.message);
    return [];
  }
};

/**
 * Fetches a random subset of events by shuffling and slicing.
 */
export const getRandomEvents = async () => {
  try {
    const allEvents = await getAllEvents();
    if (!allEvents.length) {
      console.warn('No events available to fetch randomly.');
      return [];
    }

    // Shuffle and return a subset of 3 events
    const randomEvents = allEvents
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return randomEvents;
  } catch (error) {
    console.error('Error fetching random events:', error.message);
    return [];
  }
};


export const getEventTypes = async () => {
  const API_URL = `${API_BASE_URL}/list/teve`;
  const headers = {
    Authorization: API_KEY,
  };

  try {
    //console.log('Fetching event types from API...');
    const response = await fetch(API_URL, { headers });

    if (!response.ok) {
      throw new Error(`Error fetching event types: ${response.statusText}`);
    }

    const apiEventTypes = await response.json();

    // Verificar que apiEventTypes y apiEventTypes.data no sean undefined
    if (!apiEventTypes || !apiEventTypes.registros) {
      //throw new Error('La respuesta de la API (getEventTypes) no contiene datos válidos.');
      return [];
    }

    const data = apiEventTypes.registros;
    // Transformar los tipos de eventos al formato deseado
    const transformedEventTypes = data.map((type: any) => ({
      id: type.ID.toString(),
      name: type.DESCRIPCION || 'Sin categoría',
    }));

    //console.log('Event Types:', transformedEventTypes);
    return transformedEventTypes;
  } catch (error) {
    console.error('Error loading event types:', error.message);
    return [];
  }
};


export const getEventsByCategory = async (categoryId: string) => {
  const API_URL = `${API_BASE_URL}/list/even?categoria=${categoryId}`;
  const headers = {
    Authorization: API_KEY,
  };
  try {
    //console.log(`Fetching events for category ID: ${categoryId}...`);
    //console.log(`Api URLs for category ID:`, API_URL);
    const response = await fetch(API_URL, { headers });

    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
      return [];
    }

    const apiResponse = await response.json();
    //console.log("Dataaaa: ", apiResponse.registros);   
    if (!apiResponse.registros) {
      throw new Error('No data received from the API');
    }

    // Verificar que apiResponse y apiResponse.data no sean undefined
    if (!apiResponse || !apiResponse.registros) {
      throw new Error('La respuesta de la API (getEventsByCategory) no contiene datos válidos.');
      return [];
    }
    return apiResponse.registros;
  } catch (error) {
    console.error('Error loading events by category:', error.message);
    return [];
  }

};

//  insertar evento
export const insertEvent = async (eventData) => {
  const API_URL = API_BASE_URL;
  const formBody = new URLSearchParams(eventData).toString();
  try {
    console.log('JSON del evento:', JSON.stringify(eventData));
    // data manual
    
    const response = await fetch(`${API_URL}/insert/even`, {
      method: 'POST',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });

    if (response.ok) {
      const data = await response.json(); // Parsear el JSON de la respuesta
      console.log('Request',data.message)
      return { success: true, 
               message: data.message, // Pasamos el mensaje desde la respuesta
             };
    } else {
      const errorResponse = await response.json();
      return { success: false, message: `Error: ${errorResponse.message}` };
    }
  } catch (error) {
    console.error('Error insert event:', error.message);
    return { success: false, message: 'Error: No se pudo conectar con la API.' };
  }
};

// retorno del servicio
type EventsResponse = {
  events: any[];
  totalRecords: number;
};

export const getEventsPage = async (pageNo: number): Promise<EventsResponse> => {
  const API_URL = `${API_BASE_URL}/list/even?page=${pageNo}&limit=7`;
  const headers = { Authorization: API_KEY };

  try {
    //console.log('Fetching getEventsPage from API...');
    const response = await fetch(API_URL, { headers });

    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
      return { events: [], totalRecords: 0 };
    }

    const apiEvents = await response.json();
    // Verificar que apiEventTypes y apiEventTypes.data no sean undefined
    if (!apiEvents || !apiEvents.registros) {
      //throw new Error('La respuesta de la API (getEventsPage) no contiene datos válidos.');
      return { events: [], totalRecords: 0 };
    }

    const eventsData = apiEvents.registros; // Array de eventos
    const totalRecords = apiEvents.pagination.total_records;

    // Obtener los tipos de eventos
    const eventTypes = await getEventTypes();

    // Mapear y transformar los eventos
    const transformedEvents = eventsData.map((event: any) => {
      // Buscar la categoría correspondiente
      const matchedCategory = eventTypes.find(
        (type) => type.id === event.ID_TEVE.toString()
      );
      return {
        id: event.ID.toString(),
        title: event.TITULO || 'Evento sin título', // Default if title is null
        date: event.FINICIO.split(' ')[0], // Extract date
        time: event.FINICIO.split(' ')[1], // Extract time
        description: event.DESCRIPCION || 'Sin descripción disponible',
        location: event.UBICACION || 'Ubicación no especificada',
        category: matchedCategory ? matchedCategory.name : 'General', // Asignar nombre de categoría
        price: event.ENTGRATUITA === 'Si' ? 0 : 20, // Lógica de precio
        isPublic: event.ENTGRATUITA === 'Si', // Determinar si es público
        image: event.IMAGEN || 'https://via.placeholder.com/150', // Fallback image
      };
    });
    // Devuelve tanto los eventos como el número adicional
    return { events: transformedEvents, totalRecords };
  } catch (error) {
    //console.error('Error loading events:', error.message);
    return { events: [], totalRecords: 0 };
  }
};


