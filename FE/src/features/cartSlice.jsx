import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  totalProducts: 0,
  totalPrice: 0,
  category: 0,
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
      state.category = -1;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalProducts += newItem.qty;
      state.totalPrice += newItem.price * newItem.qty;
      if (existingItem) {
        existingItem.qty += newItem.qty;
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
        state.totalProducts -= selectedItem.qty;
        state.totalPrice -= selectedItem.price * selectedItem.qty;
      }
    },
    lowerItemQuantity: (state, action) => {
      const selectedItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === selectedItem.id
      );
      if (existingItem) {
        if (existingItem.qty === 1) {
          existingItem.qty = 1;
        } else {
          existingItem.qty--;
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
        existingItem.qty++;
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
