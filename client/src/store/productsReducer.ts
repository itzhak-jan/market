import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductModel } from '../Models/Product.Model';

interface ProductsState {
  products: ProductModel[];
}

const initialState: ProductsState = {
  products: []
};

const productsReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductsState>) => {
      state.products = action.payload.products;
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const { setProducts, clearProducts } = productsReducer.actions;

export default productsReducer.reducer;
