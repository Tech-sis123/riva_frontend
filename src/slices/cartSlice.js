import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // {id, name, price, quantity}
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload; // {id, name, price}
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    incrementItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) existing.quantity += 1;
    },
    decrementItem: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing && existing.quantity > 1) existing.quantity -= 1;
    },
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing && quantity >= 1) existing.quantity = quantity;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  incrementItem,
  decrementItem,
  setQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
