import { createSlice } from '@reduxjs/toolkit';

const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState: {
        isLoginModalOpen: false,
    },
    reducers: {
        toggleLoginModal: (state, action) => {
            state.isLoginModalOpen = action.payload; // передаем true или false
        }
    },
});

export const { toggleLoginModal } = uiSlice.actions;
export default uiSlice.reducer;