const categories = [
  { id: '1', name: 'Conciertos' },
  { id: '2', name: 'Exposiciones' },
  { id: '3', name: 'Deportes' },
  { id: '4', name: 'Teatro' },
  { id: '5', name: 'Tecnología' },
  { id: '6', name: 'Cultura' },
];

/**
 * Fetches all events from the API, maps them to a desired format,
 * and assigns category names based on the category ID.
 */
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
    const data = apiEvents.data;
    
    

    // Map and transform API response to the desired structure
    const transformedEvents = data.map((event: any) => {
      const matchedCategory = categories.find(
        (cat) => cat.id === event.ID_TEVE.toString()
      );

     

      return {
        id: event.ID.toString(),
        title: event.TITULO || 'Evento sin título', // Default if title is null
        date: event.FINICIO.split(' ')[0], // Extract date
        time: event.FINICIO.split(' ')[1], // Extract time
        description: event.DESCRIPCION || 'Sin descripción disponible',
        location: event.UBICACION || 'Ubicación no especificada',
        category: matchedCategory ? matchedCategory.name : 'General', // Fallback to 'General' if no match
        price: event.ENTGRATUITA === 'Sí' ? 0 : 20, // Default price logic
        isPublic: event.ENTGRATUITA === 'Sí', // Determine if it's public
        image: event.IMAGEN || 'https://via.placeholder.com/150', // Fallback image
      };
    });

    console.log('Transformed Events:', transformedEvents);
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
