import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui';

const initialCartState = {
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
                // Increment existing cart item
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
        },
        incrementCartItem(state, action) {
            // Loop through state and see if it exists.
            const foundIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            const foundElement = state.cartItems[foundIndex];
            foundElement.quantity++;
            foundElement.total += foundElement.price;
        }
    },
})

// Action creator THUNK
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending Cart data'
        }))

        try {
            const response = await fetch('https://react-http2-f5ae2-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //make sure to serialize your JSON body
                body: JSON.stringify(cart)
            })

            if (!response.ok) {
                throw new Error('Failed to send cart data');
            }

            const responseData = await response.json();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Send data successfully'
            }))

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: error.message
            }))
        }
    }
}

export const cartActions = cartSlice.actions;
export default cartSlice;