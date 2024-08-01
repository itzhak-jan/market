// uiSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface UiState {
    isAddProductPopupVisible: boolean;
}

const initialState: UiState = {
    isAddProductPopupVisible: false,
};

const addProductPopupReducer = createSlice({
    name: 'addProductPopup',
    initialState,
    reducers: {
        showAddProductPopup(state) {
            state.isAddProductPopupVisible = true;
        },
        hideAddProductPopup(state) {
            state.isAddProductPopupVisible = false;
        },
    },
});

export const { showAddProductPopup, hideAddProductPopup } = addProductPopupReducer.actions;
export default addProductPopupReducer.reducer;
