
import { uiActions } from './ui';
import { cartActions, initialCartState } from './cart'

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
                method: 'PUT',
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

export const getCartData = () => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Fetching...',
            message: 'Fetching Cart data'
        }))

        try {
            const response = await fetch('https://react-http2-f5ae2-default-rtdb.europe-west1.firebasedatabase.app/cart.json');

            if (!response.ok) {
                throw new Error('Failed to get cart data');
            }

            let responseData = await response.json();

            // If we have no items in the cart - like initial load then use initial state
            if (!responseData?.hasOwnProperty('cartItems') || !responseData?.cartItems) {
                responseData = initialCartState;
            }

            dispatch(cartActions.setCart(responseData));

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Get data successful'
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