import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchVal: string;
}
const initialState: SearchState = {
  searchVal: '',
};

const searchReducer = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<SearchState>) => {
      state.searchVal = action.payload.searchVal;
    },
    clearSearch: (state) => {
      state.searchVal = '';
    },
  },
});

export const { setSearch, clearSearch } = searchReducer.actions;

export default searchReducer.reducer;
