import {useContext, createContext} from 'react';

export const FavoriteContext = createContext();

export const useFavorite = () => {
    return useContext(FavoriteContext);
}