// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartReducer';
import searchReducer from './searchReducer';
import productsReducer from './productsReducer';
import checkoutPopupReducer from './checkoutPopupReducer';
import addProductPopupReducer from './addProductPopupReducer';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    products: productsReducer,
    popup: checkoutPopupReducer,
    addProductPopup: addProductPopupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
