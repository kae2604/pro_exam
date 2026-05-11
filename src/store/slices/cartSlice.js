import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addProductToCart: (state, action) => {
            const newItem = action.payload;
            const existingProduct = state.items.find(item => item.id === newItem.id);
            if (existingProduct) {
                const availableToAdd = existingProduct.stockAmount - existingProduct.quantity;
                const quantityToAdd = Math.min(newItem.quantity, availableToAdd);
                if (quantityToAdd > 0) {
                    existingProduct.quantity += quantityToAdd;
                }  } else {
                state.items.push(newItem);
            }
        },
        increaseProductQuantity: (state, action) => {
            const product = state.items.find(item => item.id === action.payload);
            if (product && product.quantity < product.stockAmount) {
                product.quantity += 1;
            }
        },
        decreaseProductQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        removeProductFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
    },
});
export const {  addProductToCart,
                increaseProductQuantity,
                decreaseProductQuantity,
                removeProductFromCart} = cartSlice.actions;
export default cartSlice.reducer;