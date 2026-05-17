import { createSlice } from '@reduxjs/toolkit';

const categoryFiltersSlice = createSlice({
    name: 'categoryFilters',
    initialState:{
        categoryFilterActive: 'default',
        currentPage: 1,
        searchQuery: '',
    },
    reducers: {
        setCategoryFilterActive: (state, action) => {
            state.categoryFilterActive = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.currentPage = 1;
            state.categoryFilterActive = 'default';
        },
        resetSearch: (state) => {
            state.searchQuery = '';
        }
    },
});

export const {
    setCategoryFilterActive,
    setCurrentPage,
    setSearchQuery,
    resetSearch,
} = categoryFiltersSlice.actions;
export default categoryFiltersSlice.reducer;