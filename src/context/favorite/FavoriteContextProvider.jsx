import { useEffect, useState } from 'react';
import {FavoriteContext} from './favoriteContext';
import { useUser } from '../userContext';

function FavoriteContextProvider({children}) {
  const storedFavorites = JSON.parse(localStorage.getItem('favorite')) || [];

    const [selectedFavoriteItems, setSelectedFavoriteItems] = useState({
      favorite: storedFavorites
    });
    const {auth} = useUser();

    useEffect(() =>{
      if(auth.user){
        localStorage.setItem('favorite', JSON.stringify(selectedFavoriteItems.favorite));
      }
    },[auth.user, selectedFavoriteItems.favorite])
    
  return (
    <FavoriteContext.Provider value={{selectedFavoriteItems, setSelectedFavoriteItems}}>
      {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteContextProvider
