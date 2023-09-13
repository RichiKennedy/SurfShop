import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.products.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.products[itemIndex].quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(item => item.id !== action.payload.itemId);
    },

    resetCart: (state) => {
      state.products = [];
    },

    incrementItemQuantity: (state, action) => {
      const itemIndex = state.products.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.products[itemIndex].quantity += 1;
      }
    },

    decrementItemQuantity: (state, action) => {
      const itemIndex = state.products.findIndex(item => item.id === action.payload.id);

      if (itemIndex !== -1 && state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart, incrementItemQuantity, decrementItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;