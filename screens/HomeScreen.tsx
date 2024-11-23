import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import EventCard from '../components/EventCard/EventCard';
import { getRandomEvents, getEventTypes, getEventsPage } from '../services/getEventsService';
import CustomButton from '../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the navigation parameter types
export type RootStackParamList = {
  HomeScreen: undefined;
  CategoryScreen: { categoryId: string; categoryName: string };
  EventDetailsScreen: { event: any };
  New: undefined;
};

// Define the navigation prop type for HomeScreen
type NavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

function HomeScreen() {
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;  

  const navigation = useNavigation<NavigationProp>(); // Use typed navigation prop
  const [categories, setCategories] = useState([]); // Dynamic categories state
  //const [events, setEvents] = useState([]); // State for storing events
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false); // State to handle loading categories or events
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [eventsPage, setEventsPage] = useState<number>(1);
  const [eventsHasMore, setEventsHasMore] = useState<boolean>(true);
  const [errorEvents, setErrorEvents] = useState<boolean>(false);

  // Fetch categories and random events when the screen loads
  useEffect(() => {
    fetchCategories(); // Load categories from API
    //fetchRandomEvents(); // Load initial random events
    fetchEventsPage();
  }, []);

  
  // Function to fetch categories from the API
  const fetchCategories = async () => {
    try {
      setLoading(true); // Start loading
      const fetchedCategories = await getEventTypes(); // Fetch event types from API
      setCategories(fetchedCategories); // Update state with fetched categories
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to fetch random events -- ya no la uso
  const fetchRandomEvents = async () => {
    try {
      setLoading(true); // Start loading
      const fetchedEvents = await getRandomEvents(); // Wait for async function
      console.log('fetchRandomEvents events:', fetchedEvents);
      setEvents(fetchedEvents); // Update state with new events
    } catch (error) {
      console.error('Error fetching random events:', error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };


   // Function to fetch events por pagina
  const fetchEventsPage = async () => {
    setLoadingEvents(true); 
    try {
      // Desestructuramos correctamente el retorno
      const { events: apiEvents, totalRecords } = await getEventsPage(eventsPage);

      if (eventsPage === 1) {
        setEvents(apiEvents);
        // Optionally, set eventsHasMore based on server response (if applicable)
        // setEventsHasMore(apiEvents.length < apiEvents[0]?.totalRecords); // Assuming totalRecords is in the first element
      } else {
        setEvents([...events, ...apiEvents]);
      }
      if (events.length >= totalRecords) {
        setEventsHasMore(false);
      } else {
        setEventsPage(eventsPage + 1);
      }

      //setEvents(apiEvents); // Update state with new events
      //console.log('fetchEventsPage events length:', events.length);    
      //console.log('fetchEventsPage eventsPage:', eventsPage);  
      //console.log('fetchEventsPage totalRecords', totalRecords);
      //console.log('Has more events:', eventsHasMore);
      //console.log('loadingEvents:', loadingEvents);
    } catch (error) {
      //console.error('Error fetchEventsPage events:', error.message);
      setErrorEvents(true);
    } finally {
      setLoadingEvents(false); // Stop loading
    }
   
  };

  // Navigate to the CategoryScreen with the selected category
  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    navigation.navigate('CategoryScreen', { categoryId, categoryName });
  };

  // Navigate to the EventDetailsScreen for the selected event
  const handleEventPress = (event: any) => {
    //console.log("Eventoo: ", event);
    navigation.navigate('EventDetailsScreen', { event });
  };

  return (
    <ImageBackground
      source={require('../assets/Focos.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eventos en tu ciudad</Text>
          <CustomButton
            title="Añadir evento"
            onPress={() => navigation.navigate('New')}
          />
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <Text style={styles.sectionTitle}>Buscar por categoría</Text>
          {loading ? (
            <Text style={styles.loadingText}>Cargando categorías...</Text>
          ) : (
            <FlatList
              data={categories}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => handleCategoryPress(item.id, item.name)} 
                >
                  <Text style={styles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* Featured Events */}
        <View style={styles.featuredEvents}>
          <Text style={styles.sectionTitle}>Eventos destacados</Text>
          {events.length === 0 && loadingEvents ? (
              <View style={styles.eventsContent}>
                <Text style={styles.eventsLoadingText}>Cargando...</Text>
              </View>
            ) : errorEvents ? (
              <View style={styles.eventsContent}>
                <CustomButton
                  text="Intentar de nuevo"
                  onPress={fetchEventsPage}
                  size="small"
                />
              </View>
            ) : (
            <FlatList
              data={events}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <EventCard
                  id={item.id} // Pass the unique ID
                  title={item.title}
                  date={item.date}
                  image={item.image}
                  onPress={() => handleEventPress(item)} // Navigate to EventDetailsScreen
                  ></EventCard>
              )}
              contentContainerStyle={styles.eventsListContainer}
              ListFooterComponent={() =>                                
                events.length && loadingEvents ? (
                  <Text style={styles.eventsLoadingText}>Cargando...</Text>
                ) : (
                  <View style={styles.eventsListBottom}></View>
                )                
              }
              onEndReached={() => {
                if (eventsHasMore && !loadingEvents) {
                  fetchEventsPage();
                }
              }}              
              onEndReachedThreshold={0.2}
            ></FlatList>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent overlay
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    marginTop: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  categories: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginLeft: 10,
  },
  categoryItem: {
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  eventsSection: {
    flex: 1,
    marginBottom: -16,
    gap: 10,
  },
  eventsContent: {
    marginBottom: 16,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  eventsLoadingText: {
    fontSize: 14,
    color: "#fff",
  },
  eventsListContainer: {
    flexGrow: 1,
    gap: 12,
  },
  eventsListSeparator: {
    height: 12,
  },
  eventsListBottom: {
    marginTop: -12,
    height: 16,
  },
  featuredEvents: {
    marginTop: 20,
  },
  loadingText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default HomeScreen;
