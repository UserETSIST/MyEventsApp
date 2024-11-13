// src/services/getEventsService.tsx
export const getAllEvents = () => {
  return [
    {
      id: '1',
      title: 'Festival de Música Electrónica',
      date: '15 Nov 2024',
      time: '20:00',
      description: 'Un increíble festival con los mejores DJs de música electrónica.',
      location: 'Parque Central',
      category: 'Conciertos', // Categoría definida en el array de categorías
      price: 50,
      isPublic: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      title: 'Exposición de Arte Moderno',
      date: '20 Nov 2024',
      time: '10:00',
      description: 'Explora las últimas tendencias del arte moderno en esta exposición única.',
      location: 'Museo de Arte',
      category: 'Exposiciones', // Categoría definida
      price: 15,
      isPublic: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      title: 'Maratón de la Ciudad',
      date: '25 Nov 2024',
      time: '07:00',
      description: 'Únete al maratón más emocionante del año con miles de participantes.',
      location: 'Plaza Principal',
      category: 'Deportes', // Categoría definida
      price: 0,
      isPublic: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '4',
      title: 'Conferencia de Tecnología',
      date: '10 Dec 2024',
      time: '09:30',
      description: 'Descubre las últimas innovaciones tecnológicas y conecta con expertos.',
      location: 'Centro de Convenciones',
      category: 'Tecnología', // Categoría definida
      price: 100,
      isPublic: false,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '5',
      title: 'Torneo de Ajedrez',
      date: '5 Jan 2025',
      time: '15:00',
      description: 'Participa o asiste al torneo de ajedrez más prestigioso de la ciudad.',
      location: 'Club de Ajedrez',
      category: 'Cultura', // Categoría definida
      price: 20,
      isPublic: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '6',
      title: 'Obra de Teatro: Hamlet',
      date: '18 Feb 2025',
      time: '19:30',
      description: 'Una interpretación clásica de Hamlet en un entorno moderno.',
      location: 'Teatro Nacional',
      category: 'Teatro', // Categoría definida
      price: 25,
      isPublic: true,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '7',
      title: 'Ciclo de Cine al Aire Libre',
      date: '25 Mar 2025',
      time: '19:00',
      description: 'Disfruta de una noche mágica con películas clásicas bajo las estrellas.',
      location: 'Parque de la Ciudad',
      category: 'Cultura', // Categoría definida
      price: 5,
      isPublic: true,
      image: 'https://via.placeholder.com/150',
    },
  ];
};


  
  export const getRandomEvents = () => {
    const allEvents = getAllEvents();
    const randomEvents = allEvents.sort(() => 0.5 - Math.random()).slice(0, 3);
    return randomEvents;
  };
  



  
