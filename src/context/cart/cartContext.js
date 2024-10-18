import { useContext, createContext } from "react";

export const CartContext = createContext();

// Custom hook to use the Cart context
export const useCart = () => {
    return useContext(CartContext);
};