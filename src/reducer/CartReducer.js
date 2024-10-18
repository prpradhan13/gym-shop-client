export default function CartReducer(state, action) {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return { ...state, cartItems: action.payload };

    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item._id === action.payload._id
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          )
          .concat(
            state.cartItems.some((item) => item._id === action.payload._id)
              ? []
              : { ...action.payload, cartQuantity: 1 }
          ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
            item._id === action.payload.id && item.cartQuantity < item.quantity // Compare with available quantity
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        )
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload && item.cartQuantity > 1
            ? { ...item, cartQuantity: item.cartQuantity - 1 }
            : item
        ),
      };

    default:
      return state;
  }
}
