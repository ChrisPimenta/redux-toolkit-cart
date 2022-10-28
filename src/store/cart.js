import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
    isCartShown: false,
    cartItems: [
        {
            id: 1,
            title: 'Test Item',
            quantity: 3,
            price: 6,
            total: 18
        }
    ]
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        toggleCart(state) {
            state.isCartShown = !state.isCartShown;
        },
        addToCart(state, action) {
            // Loop through state and see if it exists.
            const foundIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            // Index does not exist
            if (foundIndex === -1) {
                // Add new cart item
                state.cartItems.push(
                    {
                        id: action.payload.id,
                        title: action.payload.title,
                        quantity: 1,
                        price: action.payload.price,
                        total: action.payload.price
                    }
                )
            } else {
                // Edit existing cart item
                console.log('I found an index');
                const foundElement = state.cartItems[foundIndex];
                foundElement.quantity++;
                foundElement.total += foundElement.price;
            }
        },
        removeFromCart(state, action) {
            // Loop through state and see if it exists.
            const foundIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            // Index does not exist
            if (state.cartItems[foundIndex].quantity === 1) {
                // Remove Completely
                state.cartItems.splice(foundIndex, 1);
            } else {
                // Decrement quanitity
                state.cartItems[foundIndex].quantity--;
            }
        }
    },
})

export const cartActions = cartSlice.actions;
export default cartSlice;