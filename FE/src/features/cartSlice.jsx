import { createSlice } from "@reduxjs/toolkit";
import { ALL_CATEGORY } from "../enums";

const initialState = {
  isCartOpen: false,
  totalProducts: 0,
  totalPrice: 0,
  category: ALL_CATEGORY,
  items: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: { ...initialState },
  reducers: {
    resetCart: () => {
      return { ...initialState };
    },
    openCart: () => {
      state.isCartOpen = true;
    },
    closeCart: () => {
      state.isCartOpen = false;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    resetCategory: (state) => {
      state.category = ALL_CATEGORY;
    },
    addToCart: (state, action) => {
      const newItem = action.payload; 
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalProducts += newItem.quantity;
      state.totalPrice += newItem.price * newItem.quantity;
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      const selectedItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === selectedItem.id
      );
      if (existingItem) {
        const newItem = state.items.filter(
          (item) => item.id !== selectedItem.id
        );
        state.items = newItem;
        state.totalProducts -= selectedItem.quantity;
        state.totalPrice -= selectedItem.price * selectedItem.quantity;
      }
    },
    lowerItemQuantity: (state, action) => {
      const selectedItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === selectedItem.id
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          existingItem.quantity = 1;
        } else {
          existingItem.quantity--;
        }
        state.totalProducts--;
        state.totalPrice -= selectedItem.price;
      }
    },
    increaseItemQuantity: (state, action) => {
      const selectedItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === selectedItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        state.totalProducts++;
        state.totalPrice += selectedItem.price;
      }
    },
  },
});

export const {
  resetCart,
  openCart,
  closeCart,
  setCategory,
  resetCategory,
  addToCart,
  removeFromCart,
  lowerItemQuantity,
  increaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
