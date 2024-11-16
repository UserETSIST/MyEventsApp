
export const getAllEvents = async () => {
  const API_URL =
    'https://animalsveterinaria.net/go2event/api/v1.php?action=list&table=EVEN';

  const headers = {
    Authorization: `Basic QWRtaW46MTIzNDU=`, // Basic Authentication Header
  };

  try {
    console.log('Fetching events from API...');
    const response = await fetch(API_URL, { headers });

    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
    }

    const apiEvents = await response.json();
    const eventsData = apiEvents.data; // Array de eventos

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
  const API_URL = 'https://animalsveterinaria.net/go2event/api/v1.php?action=list&table=TEVE';
  const headers = {
    Authorization: 'Basic QWRtaW46MTIzNDU=',
  };

  try {
    console.log('Fetching event types from API...');
    const response = await fetch(API_URL, { headers });

    if (!response.ok) {
      throw new Error(`Error fetching event types: ${response.statusText}`);
    }

    const apiEventTypes = await response.json();
    const data = apiEventTypes.data;

    // Transformar los tipos de eventos al formato deseado
    const transformedEventTypes = data.map((type: any) => ({
      id: type.ID.toString(),
      name: type.DESCRIPCION || 'Sin categoría',
    }));

    console.log('Event Types:', transformedEventTypes);
    return transformedEventTypes;
  } catch (error) {
    console.error('Error loading event types:', error.message);
    return [];
  }
};


export const getEventsByCategory = async (categoryId: string) => {
  const API_URL = `https://animalsveterinaria.net/go2event/api/v1.php?action=list&records=10&table=EVEN&q=(ID_TEVE~equals~${categoryId})`;
  const headers = {
    Authorization: 'Basic QWRtaW46MTIzNDU=', // Autenticación básica
  };

  try {
    console.log(`Fetching events for category ID: ${categoryId}...`);
    const response = await fetch(API_URL, { headers });

    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
    }

    const apiResponse = await response.json();
    
    if (!apiResponse.data) {
      throw new Error('No data received from the API');
    }


    return apiResponse.data;
  } catch (error) {
    console.error('Error loading events by category:', error.message);
    return [];
  }
};
