import React, { createContext, useState, useContext } from "react";

interface Event {
  id: string;
  title: string;
  date: string;
  image: string;
}

interface FavoritesContextProps {
  favorites: Event[];
  toggleFavorite: (event: Event) => void;
  isFavorite: (eventId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Event[]>([]);

  const toggleFavorite = (event: Event) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === event.id)
        ? prevFavorites.filter((fav) => fav.id !== event.id)
        : [...prevFavorites, event]
    );
  };

  const isFavorite = (eventId: string) =>
    favorites.some((fav) => fav.id === eventId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavorites must be used within a FavoritesProvider"
    );
  }
  return context;
};
