import PropTypes from "prop-types";
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

const initialState = [];

function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={cartState}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}
CartProvider.propTypes = {
  children: PropTypes.element,
};

function useCartContext() {
  return useContext(CartContext);
}
function useCartDispatchContext() {
  return useContext(CartDispatchContext);
}

export default CartProvider;
export { useCartContext, useCartDispatchContext };

function cartReducer(state, action) {
  switch (action.type) {
    case "add-to-cart": {
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.value.id
      );

      if (existingItemIndex !== -1) {
        // If the item already exists, increment its count
        const newState = [...state];
        newState[existingItemIndex] = {
          ...newState[existingItemIndex],
          count: newState[existingItemIndex].count + action.count,
        };
        return newState;
      } else {
        // If the item doesn't exist, add it to the state array
        return [...state, { ...action.value, count: action.count }];
      }
    }
    case "delete-product": {
      const idTodelete = action.product.id;
      const updatedCart = state.filter((product) => product.id !== idTodelete);
      return updatedCart;
    }
  }
  throw Error("Unknown action: " + action.type);
}
