import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState({});

    const toggleFavorite = (id) => {
        setFavorites(prevFavorites => {
            const newFavorites = { ...prevFavorites };
            if (newFavorites[id]) {
                delete newFavorites[id];
            } else {
                newFavorites[id] = true;
            }
            // console.log('New favourites: ' + newFavorites);
            return newFavorites;
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
