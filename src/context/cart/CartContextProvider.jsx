import { useEffect, useReducer } from "react";
import {CartContext} from "../cart/cartContext"
import reducer from "../../reducer/CartReducer";

const initialState = {
    cartItems: [],
}

function CartContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            dispatch({ type: 'SET_CART_ITEMS', payload: JSON.parse(storedCart) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const increaseQuantity = (productId) => {
        const product = state.cartItems.find(item => item._id === productId);
        if (product) {
            dispatch({ type: 'INCREASE_QUANTITY', payload: { id: productId, availableQuantity: product.quantity } });
        }
    };

    const decreaseQuantity = (productId) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
    }

    return (
        <CartContext.Provider value={{cartItems: state.cartItems, 
            addToCart, 
            removeFromCart, 
            increaseQuantity, 
            decreaseQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartContextProvider };