// uiSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface UiState {
    isCheckoutPopupVisible: boolean;
}

const initialState: UiState = {
    isCheckoutPopupVisible: false,
};

const checkoutPopupReducer = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        showCheckoutPopup(state) {
            state.isCheckoutPopupVisible = true;
        },
        hideCheckoutPopup(state) {
            state.isCheckoutPopupVisible = false;
        },
    },
});

export const { showCheckoutPopup, hideCheckoutPopup } = checkoutPopupReducer.actions;
export default checkoutPopupReducer.reducer;
