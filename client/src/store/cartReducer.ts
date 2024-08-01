import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartModel } from '../Models/Cart.Model';
import { ProductModel } from '../Models/Product.Model';

const initialState: CartModel = {
  items: [],
};
const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<{ items: { product: ProductModel; quantity: number }[] }>) {
      state.items = action.payload.items;
    },
    addToCart(state, action: PayloadAction<ProductModel>) {
      const existingItem = state.items.find((item) => item.product.id == action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<ProductModel>) {
      const existingItem = state.items.find((item) => item.product.id == action.payload.id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.product.id != action.payload.id);
      }
    },
    deleteFromCart(state, action: PayloadAction<ProductModel>) {
      state.items = state.items.filter((item) => item.product.id != action.payload.id);
    }
  },
});

export const { setCart, addToCart, removeFromCart, deleteFromCart } = cartReducer.actions;

export default cartReducer.reducer;